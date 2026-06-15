import HeatSlider from '../components/HeatSlider.jsx';

export default function Step0({ data, onChange, onNext }) {
  return (
    <div className="step-container">
      <div className="step-label">Step 1 of 11</div>
      <h1 className="step-title">What happened?</h1>
      <p className="step-subtitle">Tell it like you would tell a friend. No need to organize it.</p>
      <textarea
        placeholder="Start wherever it makes sense..."
        value={data.whatHappened || ''}
        onChange={e => onChange('whatHappened', e.target.value)}
        rows={6}
      />
      <HeatSlider
        value={data.heatLevel || 5}
        onChange={val => onChange('heatLevel', val)}
      />
      <button
        className="btn btn-primary"
        onClick={onNext}
        disabled={!data.whatHappened?.trim()}
      >
        Continue
      </button>
    </div>
  );
}
