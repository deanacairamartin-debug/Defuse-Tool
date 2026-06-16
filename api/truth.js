import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.VITE_ANTHROPIC_API_KEI });

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { reality, s1text, s1tags, s2who, s3text, s3tags, s4pattern, s5text } = req.body;

  const userMessage = `Facts of the situation: ${reality}

What set them off: ${s1text || '(not provided)'}
Feelings: ${s1tags?.join(', ') || 'none'}
Who: ${s2who || '(not provided)'}
What they believe it means: ${s3text || '(not provided)'}
Belief tags: ${s3tags?.join(', ') || 'none'}
Pattern: ${s4pattern || '(not provided)'}
What they feel like doing: ${s5text || '(not provided)'}`;

  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 250,
      system: `You are Defuse. Based on the facts only, name what is likely actually happening in this situation. Be honest even if it is not what the user wants to hear. No false hope. No catastrophizing. No blame. Just a clear-eyed read on the most probable reality. Two to three sentences maximum. Direct, warm, unsentimental.`,
      messages: [{ role: 'user', content: userMessage }],
    });
    res.status(200).json({ text: response.content[0].text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
