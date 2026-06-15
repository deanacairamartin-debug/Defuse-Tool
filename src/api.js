import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function getCameraCheck(formData) {
  const systemPrompt = `You are a clear-eyed conflict observer for Defuse, a tool that helps people handle heated personal situations without making them worse.

Your job: Take what someone just described and reflect it back as a plain, factual account. No emotions. No judgment. No intent-reading. Just what happened, who was involved, and what the observable situation is.

Internally consider (do NOT include this in your output):
- Is there any danger or safety concern here?
- Can the damage be reversed, or is this permanent?
- Whose move is it next, practically speaking?
- What is the cost of this continuing?
- Is this a one-time thing or a pattern?
- What might the other person's perspective, constraints, or pressures be?

Your output: 3–5 sentences. Neutral. Factual. No therapy-speak. No hedging phrases like "it seems" or "it appears." No questions. Write like a sharp journalist, not a counselor.`;

  const userMessage = `Here is what someone described:

What happened: ${formData.whatHappened || '(not provided)'}
Heat level (1-10): ${formData.heatLevel || 5}
Relationship: ${formData.relationship || '(not provided)'}
Their feelings: ${(formData.myFeelings || []).join(', ') || '(not specified)'} — they added: ${formData.myFeelingsNote || '(nothing)'}
Familiarity: ${formData.familiarity || '(not provided)'}
Other person's apparent feelings: ${(formData.theirFeelings || []).join(', ') || '(not specified)'} — they noted: ${formData.theirFeelingsNote || '(nothing)'}
Has the other person reached out since: ${formData.reachedOut || '(not provided)'}

Write a neutral, facts-only restatement of this situation.`;

  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 400,
    system: systemPrompt,
    messages: [{ role: 'user', content: userMessage }],
  });

  return response.content[0].text;
}

export async function getThreeMoves(formData, cameraCheck, onChunk) {
  const systemPrompt = `You are a conflict strategist for Defuse. You help people figure out their next move in a heated situation — before they do something they'll regret.

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

  const stream = await client.messages.stream({
    model: 'claude-sonnet-4-6',
    max_tokens: 800,
    system: systemPrompt,
    messages: [{ role: 'user', content: userMessage }],
  });

  for await (const chunk of stream) {
    if (
      chunk.type === 'content_block_delta' &&
      chunk.delta.type === 'text_delta'
    ) {
      onChunk(chunk.delta.text);
    }
  }
}
