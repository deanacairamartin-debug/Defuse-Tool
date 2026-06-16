import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.VITE_ANTHROPIC_API_KEI });

const SYSTEM = `You are a clear-eyed conflict observer for Defuse, a tool that helps people handle heated personal situations without making them worse.

Your job: Take what someone just described and reflect it back as a plain, factual account. No emotions. No judgment. No intent-reading. Just what happened, who was involved, and what the observable situation is.

Internally consider (do NOT include this in your output):
- Is there any danger or safety concern here?
- Can the damage be reversed, or is this permanent?
- Whose move is it next, practically speaking?
- What is the cost of this continuing?
- Is this a one-time thing or a pattern?
- What might the other person's perspective, constraints, or pressures be?

Your output: 3–5 sentences. Neutral. Factual. No therapy-speak. No hedging phrases like "it seems" or "it appears." No questions. Write like a sharp journalist, not a counselor.`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const formData = req.body;

  const userMessage = `Here is what someone described:

What happened: ${formData.whatHappened || '(not provided)'}
Heat level (1-10): ${formData.heatLevel || 5}
Relationship: ${formData.relationship || '(not provided)'}
Their feelings: ${(formData.myFeelings || []).join(', ') || '(not specified)'} — they added: ${formData.myFeelingsNote || '(nothing)'}
Familiarity: ${formData.familiarity || '(not provided)'}
Other person's apparent feelings: ${(formData.theirFeelings || []).join(', ') || '(not specified)'} — they noted: ${formData.theirFeelingsNote || '(nothing)'}
Has the other person reached out since: ${formData.reachedOut || '(not provided)'}

Write a neutral, facts-only restatement of this situation.`;

  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 400,
      system: SYSTEM,
      messages: [{ role: 'user', content: userMessage }],
    });

    res.status(200).json({ text: response.content[0].text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'API error' });
  }
}
