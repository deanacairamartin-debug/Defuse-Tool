import SingleSelect from '../components/SingleSelect.jsx';

const OPTIONS = ['Partner or spouse', 'Family', 'Work or client', 'Friend', 'Other'];

export default function Step1({ data, onChange, onNext }) {
  return (
    <div className="step-container">
      <div className="step-label">Step 2 of 11</div>
      <h1 className="step-title">Who is this with?</h1>
      <p className="step-subtitle">Pick the one that fits best.</p>
      <SingleSelect
        options={OPTIONS}
        value={data.relationship}
        onChange={val => onChange('relationship', val)}
      />
      <button
        className="btn btn-primary"
        onClick={onNext}
        disabled={!data.relationship}
      >
        Continue
      </button>
    </div>
  );
}
