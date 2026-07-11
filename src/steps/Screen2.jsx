import SlamTitle from '../components/SlamTitle.jsx';

const OPTIONS = ['Partner', 'Family', 'Friend', 'Work', 'Stranger', 'Other'];

export default function Screen2({ data, onChange, onNext }) {
  return (
    <div className="screen">
      <div className="screen-eyebrow" style={{ color: 'var(--screen-accent)' }}>SAY WHO</div>
      <SlamTitle flashColor="rgba(200,60,40,0.28)">SAY WHO.</SlamTitle>
      <p className="screen-subtitle">Who's got you like this?</p>

      <div className="single-select">
        {OPTIONS.map(opt => (
          <button
            key={opt}
            type="button"
            className={`single-select-btn${data.s2who === opt ? ' selected' : ''}`}
            onClick={() => onChange('s2who', opt)}
          >{opt}</button>
        ))}
      </div>

      <button
        className="btn btn-primary"
        onClick={onNext}
        disabled={!data.s2who}
      >Continue</button>
    </div>
  );
}
