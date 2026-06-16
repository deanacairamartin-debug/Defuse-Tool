import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.VITE_ANTHROPIC_API_KEI });

const SYSTEM = `You are a conflict strategist for Defuse. You help people figure out their next move in a heated situation — before they do something they'll regret.

You have a factual read of the situation plus the person's stated priority and desired outcome. Use your internal assessment to generate 3 concrete, actionable next moves.

Rules:
- Default toward productive interaction or no interaction. Avoid anything that escalates.
- If the person's stated "want" is unrealistic or contradicts the facts, ONE of the three moves must name that conflict directly and clearly — not harshly, just honestly.
- Each move should be practical. Not "communicate better." Tell them what to actually do.
- Brand voice: direct, blunt, warm. Conversational. No therapy-speak, no hedging, no bot-speak.

Output format — exactly this structure:
Move 1: [Short Title]
[2-4 sentences describing this move concretely]

Move 2: [Short Title]
[2-4 sentences describing this move concretely]

Move 3: [Short Title]
[2-4 sentences describing this move concretely]`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { formData, cameraCheck } = req.body;

  const userMessage = `Factual situation summary:
${cameraCheck}

What they said happened: ${formData.whatHappened || '(not provided)'}
Relationship: ${formData.relationship || '(not provided)'}
Their feelings: ${(formData.myFeelings || []).join(', ') || '(not specified)'}
Other person's apparent feelings: ${(formData.theirFeelings || []).join(', ') || '(not specified)'}
Familiarity: ${formData.familiarity || '(not provided)'}
Other person reached out: ${formData.reachedOut || '(not provided)'}

Right now, what matters most to them: ${formData.whatMatters || '(not provided)'}
What outcome they actually want: ${formData.desiredOutcome || '(not provided)'}

Give them 3 concrete next moves.`;

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    const stream = await client.messages.stream({
      model: 'claude-sonnet-4-6',
      max_tokens: 800,
      system: SYSTEM,
      messages: [{ role: 'user', content: userMessage }],
    });

    for await (const chunk of stream) {
      if (
        chunk.type === 'content_block_delta' &&
        chunk.delta.type === 'text_delta'
      ) {
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
