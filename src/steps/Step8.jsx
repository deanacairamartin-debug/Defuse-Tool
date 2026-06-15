import SingleSelect from '../components/SingleSelect.jsx';

const OPTIONS = ['Being right', 'Being heard', 'Fixing this', 'Just moving on'];

export default function Step8({ data, onChange, onNext }) {
  return (
    <div className="step-container">
      <div className="step-label">Step 9 of 11</div>
      <h1 className="step-title">Right now, what matters more?</h1>
      <p className="step-subtitle">Be honest. There is no wrong answer.</p>
      <SingleSelect
        options={OPTIONS}
        value={data.whatMatters}
        onChange={val => onChange('whatMatters', val)}
      />
      <button
        className="btn btn-primary"
        onClick={onNext}
        disabled={!data.whatMatters}
      >
        Continue
      </button>
    </div>
  );
}
