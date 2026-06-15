import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
  dangerouslyAllowBrowser: true,
})

const CAMERA_CHECK_SYSTEM = `You are a conflict clarity tool. Your job is to strip emotion and framing from a situation and give back only what actually happened — the observable facts.

You will receive details about a personal conflict: what happened, how heated it is, who it's with, what feelings were involved, whether it's a pattern, what the other person seemed to feel, and whether they've reached out.

Before you write your response, privately consider (do NOT include this in output):
- Is there any safety or danger dimension here?
- What's already done vs. what's still reversible?
- Whose move is it next, logically?
- What does continuing this conflict actually cost both people?
- If this is a pattern, what does that pattern tell you?
- What might the other person's perspective or constraints be, charitably?

Then write ONLY a neutral, facts-only restatement of what happened. 3-5 sentences. No intent-reading. No emotional language. No therapy-speak. No hedging phrases like "it seems" or "perhaps." No bot-speak. Just what happened, as a clear-eyed observer would describe it.

Voice: direct, blunt, warm, conversational. Like a smart friend who doesn't take sides but sees clearly.`

const THREE_MOVES_SYSTEM = `You are a conflict clarity tool. You've already given someone a facts-only restatement of their conflict. Now you're giving them three concrete next moves.

You will receive: the original situation details, the facts-only restatement you gave, what matters most to them right now, and what outcome they actually want.

Use everything — including your internal read of the situation — to generate three distinct, actionable next moves. Each move should be 2-4 sentences. Short. Concrete. Something they can actually do.

Default bias: toward productive resolution or no interaction at all. Do NOT suggest moves that escalate or inflame.

If what the person says they want conflicts with what the facts actually show — name it. One of the three moves must directly address the gap: explain why their stated want might not get them what they're actually after, without being harsh or preachy.

Format exactly like this:
Move 1: [Short title]
[2-4 sentences]

Move 2: [Short title]
[2-4 sentences]

Move 3: [Short title]
[2-4 sentences]

Voice: direct, blunt, warm, conversational. No therapy-speak. No hedging. No bot-speak.`

export async function getCameraCheck(formData) {
  const userContent = buildCameraCheckPrompt(formData)

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 400,
    system: CAMERA_CHECK_SYSTEM,
    messages: [{ role: 'user', content: userContent }],
  })

  return message.content[0].text
}

export async function getThreeMoves(formData, cameraCheck, onChunk) {
  const userContent = buildThreeMovesPrompt(formData, cameraCheck)

  const stream = await client.messages.stream({
    model: 'claude-sonnet-4-6',
    max_tokens: 700,
    system: THREE_MOVES_SYSTEM,
    messages: [{ role: 'user', content: userContent }],
  })

  for await (const chunk of stream) {
    if (
      chunk.type === 'content_block_delta' &&
      chunk.delta.type === 'text_delta'
    ) {
      onChunk(chunk.delta.text)
    }
  }
}

function buildCameraCheckPrompt(d) {
  return `What happened: ${d.whatHappened}

Heat level: ${d.heatLevel}/10

This conflict is with: ${d.relationship}

How the person feels: ${d.userFeelingsText || '(not described)'}
Feeling tags selected: ${d.userFeelingTags.length ? d.userFeelingTags.join(', ') : 'none'}

Does this feel familiar: ${d.pattern}

How the other person seemed to feel: ${d.theirFeelingsText || '(not described)'}
Their feeling tags: ${d.theirFeelingTags.length ? d.theirFeelingTags.join(', ') : 'none'}

Have they reached out since: ${d.reachedOut}`
}

function buildThreeMovesPrompt(d, cameraCheck) {
  return `ORIGINAL SITUATION:
${buildCameraCheckPrompt(d)}

FACTS-ONLY RESTATEMENT (your prior analysis):
${cameraCheck}

What matters most to them right now: ${d.whatMatters}

What outcome they actually want: ${d.desiredOutcome}`
}
