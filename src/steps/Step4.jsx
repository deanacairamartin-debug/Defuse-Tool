import FeelingTags from '../components/FeelingTags.jsx';

export default function Step4({ data, onChange, onNext }) {
  return (
    <div className="step-container">
      <div className="step-label">Step 5 of 11</div>
      <h1 className="step-title">Their feelings, as you saw them</h1>
      <p className="step-subtitle">What did they seem to be feeling? Best guess is fine.</p>
      <FeelingTags
        selected={data.theirFeelings || []}
        onChange={val => onChange('theirFeelings', val)}
      />
      <textarea
        placeholder="What did you notice, even if you're not sure what it meant?"
        value={data.theirFeelingsNote || ''}
        onChange={e => onChange('theirFeelingsNote', e.target.value)}
        rows={3}
        style={{ minHeight: '80px' }}
      />
      <button className="btn btn-primary" onClick={onNext}>
        Continue
      </button>
    </div>
  );
}
