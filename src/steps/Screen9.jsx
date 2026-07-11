import { useState } from 'react';
import SlamTitle from '../components/SlamTitle.jsx';

export default function Screen9({ truth, pickedMove, onRestart }) {
  const [saved, setSaved] = useState(false);

  return (
    <div className="screen">
      <div className="screen-eyebrow" style={{ color: 'var(--screen-accent)' }}>BEFORE YOU GO</div>
      <SlamTitle flashColor="rgba(30,79,163,0.3)">KEEP THIS.</SlamTitle>
      <p className="screen-subtitle">Not the feeling. The read.</p>

      <div className="ending-card">
        <div className="ending-section-label">THE TRUTH, AGAIN</div>
        <p className="ending-truth-text">{truth || '—'}</p>

        <div className="ending-divider" />

        <div className="ending-section-label">THE MOVE YOU PICKED</div>
        <div className="ending-move-row">
          <span className="ending-move-label" style={{ color: 'var(--screen-accent)' }}>
            {pickedMove || '—'}
          </span>
          {pickedMove && (
            <span className="ending-move-text">You chose this. Act on it.</span>
          )}
        </div>
      </div>

      <button
        className="btn btn-primary"
        onClick={() => setSaved(true)}
        disabled={saved}
        style={saved ? { background: '#262a33', color: '#c8c6c2' } : {}}
      >
        {saved ? 'Saved ✓' : 'Save this'}
      </button>

      <button className="btn btn-ghost" onClick={onRestart}>Start over</button>

      <div className="podcast-row">
        <div className="podcast-cover">
          <img
            src="/assets/american-regret-cover.png"
            alt="American Regret"
            onError={e => { e.currentTarget.src = '/assets/american-regret-cover.svg'; }}
          />
        </div>
        <div className="podcast-info">
          <div className="podcast-name">AMERICAN REGRET</div>
          <div className="podcast-desc">Listen to learn more about avoiding regret.</div>
        </div>
        <button className="podcast-listen">Listen</button>
      </div>
    </div>
  );
}
