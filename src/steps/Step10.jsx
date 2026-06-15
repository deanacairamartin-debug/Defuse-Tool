import { useEffect, useState } from 'react';
import { getThreeMoves } from '../api.js';
import Spinner from '../components/Spinner.jsx';

function parseMoves(text) {
  // Parse "Move N: Title\nBody" format
  const moveRegex = /Move (\d+):\s*([^\n]+)\n([\s\S]*?)(?=Move \d+:|$)/g;
  const moves = [];
  let match;
  while ((match = moveRegex.exec(text)) !== null) {
    moves.push({
      number: match[1],
      title: match[2].trim(),
      body: match[3].trim(),
    });
  }
  return moves;
}

export default function Step10({ data, cameraCheck, onRestart }) {
  const [streamedText, setStreamedText] = useState('');
  const [done, setDone] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      try {
        await getThreeMoves(data, cameraCheck, (chunk) => {
          if (!cancelled) setStreamedText(prev => prev + chunk);
        });
        if (!cancelled) setDone(true);
      } catch (e) {
        if (!cancelled) setError(e.message || 'Something went wrong.');
      }
    }
    run();
    return () => { cancelled = true; };
  }, []);

  const moves = done ? parseMoves(streamedText) : [];

  return (
    <div className="step-container">
      <div className="step-label">Three possible moves</div>
      <h1 className="step-title">Here is what you can do.</h1>
      <p className="step-subtitle">Pick the one that fits where you actually are right now.</p>

      {error && (
        <div style={{ color: '#e53935', marginBottom: 24 }}>
          Error: {error}
        </div>
      )}

      {!done && !error && (
        <div>
          <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
            <Spinner />
            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Working through this...</span>
          </div>
          {streamedText && (
            <div className="streaming-text">{streamedText}</div>
          )}
        </div>
      )}

      {done && moves.length > 0 && (
        <div className="moves-container">
          {moves.map(move => (
            <div key={move.number} className="move-card">
              <div className="move-label">Move {move.number}</div>
              <div className="move-title">{move.title}</div>
              <div className="move-body">{move.body}</div>
            </div>
          ))}
        </div>
      )}

      {done && moves.length === 0 && streamedText && (
        <div className="streaming-text">{streamedText}</div>
      )}

      {(done || error) && (
        <button className="btn btn-ghost" onClick={onRestart}>
          Start over
        </button>
      )}
    </div>
  );
}
