import SlamTitle from '../components/SlamTitle.jsx';

export default function Screen6({ reality, loading, error, onNext }) {
  return (
    <div className="screen">
      <div className="screen-eyebrow" style={{ color: 'var(--screen-accent)' }}>JUST THE FACTS</div>
      <SlamTitle flashColor="rgba(40,65,110,0.3)">JUST THE FACTS.</SlamTitle>
      <p className="screen-subtitle">What actually happened — no story, no spin.</p>

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
        <button className="btn btn-primary" onClick={onNext}>Keep going</button>
      )}
    </div>
  );
}
