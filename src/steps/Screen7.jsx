import SlamTitle from '../components/SlamTitle.jsx';

const PATTERN_LINE = {
  'Happens sometimes': 'This isn’t the first time. Note that.',
  'This is a pattern': 'You called it a pattern. You were right.',
  'They always do this': 'You said they always do this. Believe your own data.',
};

export default function Screen7({ truth, loading, error, s4pattern, onNext }) {
  const patternLine = PATTERN_LINE[s4pattern] || null;

  return (
    <div className="screen">
      <div className="screen-eyebrow" style={{ color: 'var(--screen-accent)' }}>CLEAR-EYED READ</div>
      <SlamTitle flashColor="rgba(30,70,140,0.3)">THE TRUTH.</SlamTitle>
      <p className="screen-subtitle">Most likely what’s actually going on here.</p>

      {loading && (
        <div className="output-loading">
          <div className="spinner" />
          <span>Working it out...</span>
        </div>
      )}

      {error && <div className="output-error">Couldn’t load. Check your connection and try again.</div>}

      {truth && !loading && (
        <div className="output-block">
          {patternLine && (
            <>
              <div className="pattern-badge">PATTERN NOTED</div>
              <p className="pattern-line">{patternLine}</p>
            </>
          )}
          {truth}
        </div>
      )}

      {!loading && !error && truth && (
        <button className="btn btn-primary" onClick={onNext}>Show me my moves</button>
      )}
    </div>
  );
}
