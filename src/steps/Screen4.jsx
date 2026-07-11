import SlamTitle from '../components/SlamTitle.jsx';

const OPTIONS = ['First time', 'Happens sometimes', 'This is a pattern', 'They always do this'];

export default function Screen4({ data, onChange, onNext }) {
  return (
    <div className="screen">
      <div className="screen-eyebrow" style={{ color: 'var(--screen-accent)' }}>PATTERN CHECK</div>
      <SlamTitle flashColor="rgba(130,65,50,0.25)">BEEN HERE BEFORE?</SlamTitle>
      <p className="screen-subtitle">Be honest.</p>

      <div className="single-select">
        {OPTIONS.map(opt => (
          <button
            key={opt}
            type="button"
            className={`single-select-btn${data.s4pattern === opt ? ' selected' : ''}`}
            onClick={() => onChange('s4pattern', opt)}
          >{opt}</button>
        ))}
      </div>

      <button
        className="btn btn-primary"
        onClick={onNext}
        disabled={!data.s4pattern}
      >Continue</button>
    </div>
  );
}
