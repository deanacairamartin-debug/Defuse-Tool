import SingleSelect from '../components/SingleSelect.jsx';

const OPTIONS = ['First time', 'Happens sometimes', 'This is a pattern'];

export default function Step3({ data, onChange, onNext }) {
  return (
    <div className="step-container">
      <div className="step-label">Step 4 of 11</div>
      <h1 className="step-title">Does this feel familiar?</h1>
      <p className="step-subtitle">Has this kind of thing happened before with this person?</p>
      <SingleSelect
        options={OPTIONS}
        value={data.familiarity}
        onChange={val => onChange('familiarity', val)}
      />
      <button
        className="btn btn-primary"
        onClick={onNext}
        disabled={!data.familiarity}
      >
        Continue
      </button>
    </div>
  );
}
