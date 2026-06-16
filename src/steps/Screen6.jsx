export default function Screen6({ reality, loading, error, onNext }) {
  return (
    <div className="screen">
      <div className="screen-eyebrow">Reality check</div>
      <div className="screen-title">Reality.</div>
      <div className="screen-subtitle">What actually happened — no story, no spin.</div>

      {loading && (
        <div className="output-loading">
          <div className="spinner" />
          <span>Reading the situation...</span>
        </div>
      )}

      {error && <div className="output-error">Couldn't load. Check your connection and try again.</div>}

      {reality && !loading && (
        <div className="output-block">{reality}</div>
      )}

      {!loading && !error && reality && (
        <button className="btn btn-primary" onClick={onNext}>Keep going →</button>
      )}
    </div>
  );
}
