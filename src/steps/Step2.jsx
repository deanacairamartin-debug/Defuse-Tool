import FeelingTags from '../components/FeelingTags.jsx';

export default function Step2({ data, onChange, onNext }) {
  return (
    <div className="step-container">
      <div className="step-label">Step 3 of 11</div>
      <h1 className="step-title">Your feelings</h1>
      <p className="step-subtitle">What are you actually feeling right now? Pick everything that applies.</p>
      <FeelingTags
        selected={data.myFeelings || []}
        onChange={val => onChange('myFeelings', val)}
      />
      <textarea
        placeholder="Anything else going on that's hard to name?"
        value={data.myFeelingsNote || ''}
        onChange={e => onChange('myFeelingsNote', e.target.value)}
        rows={3}
        style={{ minHeight: '80px' }}
      />
      <button
        className="btn btn-primary"
        onClick={onNext}
        disabled={(data.myFeelings || []).length === 0 && !data.myFeelingsNote?.trim()}
      >
        Continue
      </button>
    </div>
  );
}
