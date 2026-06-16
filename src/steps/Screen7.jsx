export default function Screen7({ truth, loading, error, onNext }) {
  return (
    <div className="screen">
      <div className="screen-eyebrow">Clear-eyed read</div>
      <div className="screen-title">The truth.</div>
      <div className="screen-subtitle">Most likely what's actually going on here.</div>

      {loading && (
        <div className="output-loading">
          <div className="spinner" />
          <span>Working it out...</span>
        </div>
      )}

      {error && <div className="output-error">Couldn't load. Check your connection and try again.</div>}

      {truth && !loading && (
        <div className="output-block">{truth}</div>
      )}

      {!loading && !error && truth && (
        <button className="btn btn-primary" onClick={onNext}>Show me my moves →</button>
      )}
    </div>
  );
}
