export async function getReality(inputs) {
  const res = await fetch('/api/reality', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inputs),
  });
  if (!res.ok) throw new Error(`reality API failed: ${res.status}`);
  const data = await res.json();
  return data.text;
}

export async function getTruth(inputs) {
  const res = await fetch('/api/truth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inputs),
  });
  if (!res.ok) throw new Error(`truth API failed: ${res.status}`);
  const data = await res.json();
  return data.text;
}

export async function getNextMove(inputs, onChunk) {
  const res = await fetch('/api/next-move', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inputs),
  });
  if (!res.ok) throw new Error(`next-move API failed: ${res.status}`);

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop();
    for (const line of lines) {
      if (!line.startsWith('data: ')) continue;
      const payload = line.slice(6).trim();
      if (payload === '[DONE]') return;
      try {
        const parsed = JSON.parse(payload);
        if (parsed.error) throw new Error(parsed.error);
        if (parsed.text) onChunk(parsed.text);
      } catch (e) {
        if (e.message.includes('JSON')) continue;
        throw e;
      }
    }
  }
}
