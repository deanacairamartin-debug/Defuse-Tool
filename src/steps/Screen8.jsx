function parseMoves(text) {
  const labels = ['Conservative', 'Moderate', 'Aggressive'];
  const moves = [];
  for (const label of labels) {
    const re = new RegExp(`${label}:\\s*([\\s\\S]*?)(?=Conservative:|Moderate:|Aggressive:|$)`, 'i');
    const match = text.match(re);
    if (match) moves.push({ label, text: match[1].trim() });
  }
  return moves;
}

export default function Screen8({ movesText, loading, error, onRestart }) {
  const moves = !loading && movesText ? parseMoves(movesText) : [];

  return (
    <div className="screen">
      <div className="screen-eyebrow">Your options</div>
      <div className="screen-title">Your next move.</div>
      <div className="screen-subtitle">Three options. Pick your temperature.</div>

      {loading && !movesText && (
        <div className="output-loading">
          <div className="spinner" />
          <span>Calculating your moves...</span>
        </div>
      )}

      {loading && movesText && (
        <div className="streaming-text">{movesText}</div>
      )}

      {error && <div className="output-error">Couldn't load. Check your connection and try again.</div>}

      {!loading && moves.length > 0 && (
        <div className="moves-list">
          {moves.map(m => (
            <div key={m.label} className="move-card">
              <div className="move-label">{m.label}</div>
              <div className="move-text">{m.text}</div>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && movesText && moves.length === 0 && (
        <div className="output-block">{movesText}</div>
      )}

      {!loading && (
        <button className="btn btn-ghost" onClick={onRestart}>Start over</button>
      )}
    </div>
  );
}
