import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.VITE_ANTHROPIC_API_KEI });

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { s1text, s1tags, s2who, s3text, s3tags, s4pattern, s5text } = req.body;

  const userMessage = `What set them off: ${s1text || '(not provided)'}
Feelings: ${s1tags?.join(', ') || 'none'}
Who: ${s2who || '(not provided)'}
What they believe it means: ${s3text || '(not provided)'}
Belief tags: ${s3tags?.join(', ') || 'none'}
Pattern: ${s4pattern || '(not provided)'}
What they feel like doing: ${s5text || '(not provided)'}`;

  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 200,
      system: `You are Defuse, a conflict clarity tool. Your job is to strip the user's situation down to observable facts only. Remove every assumption, assigned motive, and judgment. State only what actually happened — what was said, what was done, what is verifiably true. One to three sentences maximum. No softening language. No hedging. No therapy-speak. Plain, direct, factual.`,
      messages: [{ role: 'user', content: userMessage }],
    });
    res.status(200).json({ text: response.content[0].text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
