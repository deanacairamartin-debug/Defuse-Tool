import SlamTitle from '../components/SlamTitle.jsx';

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

function leadLabel(s4pattern) {
  if (!s4pattern || s4pattern === 'First time') return 'Conservative';
  if (s4pattern === 'Happens sometimes') return 'Moderate';
  return 'Aggressive';
}

function orderMoves(moves, lead) {
  const idx = moves.findIndex(m => m.label === lead);
  if (idx <= 0) return moves;
  return [moves[idx], ...moves.slice(0, idx), ...moves.slice(idx + 1)];
}

export default function Screen8({ movesText, loading, error, s4pattern, pickedMove, onPickMove, onNext, onRestart }) {
  const rawMoves = !loading && movesText ? parseMoves(movesText) : [];
  const lead = leadLabel(s4pattern);
  const moves = orderMoves(rawMoves, lead);
  const canContinue = !loading && moves.length > 0 && pickedMove;

  return (
    <div className="screen">
      <div className="screen-eyebrow" style={{ color: 'var(--screen-accent)' }}>YOUR OPTIONS</div>
      <SlamTitle flashColor="rgba(30,79,163,0.28)">YOUR MOVE.</SlamTitle>
      <p className="screen-subtitle">Three options. Pick your temperature.</p>

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
          {moves.map(m => {
            const isLead = m.label === lead;
            const isSelected = pickedMove === m.label;
            return (
              <div
                key={m.label}
                className={`move-card${isLead ? ' move-lead' : ''}${isSelected ? ' move-selected' : ''}`}
                onClick={() => onPickMove(m.label)}
              >
                <div className={`move-label ${isLead ? 'move-label-accent' : 'move-label-muted'}`}>{m.label}</div>
                <div className="move-text">{m.text}</div>
              </div>
            );
          })}
        </div>
      )}

      {!loading && movesText && moves.length === 0 && (
        <div className="output-block">{movesText}</div>
      )}

      {!loading && moves.length > 0 && (
        <button
          className="btn btn-primary"
          onClick={onNext}
          disabled={!canContinue}
        >
          {canContinue ? `Keep this — ${pickedMove}` : 'Pick one to continue'}
        </button>
      )}

      {!loading && (
        <button className="btn btn-ghost" onClick={onRestart}>Start over</button>
      )}
    </div>
  );
}
