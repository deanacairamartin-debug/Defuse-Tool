import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.VITE_ANTHROPIC_API_KEI });

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { reality, truth, s1text, s1tags, s2who, s3text, s3tags, s4pattern, s5text } = req.body;

  const userMessage = `Facts: ${reality}
Truth: ${truth}

What set them off: ${s1text || '(not provided)'}
Feelings: ${s1tags?.join(', ') || 'none'}
Who: ${s2who || '(not provided)'}
What they believe it means: ${s3text || '(not provided)'}
Belief tags: ${s3tags?.join(', ') || 'none'}
Pattern: ${s4pattern || '(not provided)'}
What they feel like doing: ${s5text || '(not provided)'}`;

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    const stream = await client.messages.stream({
      model: 'claude-sonnet-4-6',
      max_tokens: 300,
      system: `You are Defuse. Give the user three possible moves, ordered by temperature. Each move is one to two sentences, direct and actionable. Conservative: the minimum move that protects their position and self-respect. Moderate: engage but measured — makes a move without escalating. Aggressive: a bold move that addresses the situation head-on, but is still smart — not the nuclear option, not self-destructive. Label them Conservative / Moderate / Aggressive. No preamble, no explanation, just the three moves.`,
      messages: [{ role: 'user', content: userMessage }],
    });

    for await (const chunk of stream) {
      if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
        res.write(`data: ${JSON.stringify({ text: chunk.delta.text })}\n\n`);
      }
    }
    res.write('data: [DONE]\n\n');
    res.end();
  } catch (err) {
    console.error(err);
    res.write(`data: ${JSON.stringify({ error: err.message })}\n\n`);
    res.end();
  }
}
