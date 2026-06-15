import SingleSelect from '../components/SingleSelect.jsx';

const OPTIONS = ['Yes', 'No', 'Too soon to tell', 'We have not spoken'];

export default function Step5({ data, onChange, onNext }) {
  return (
    <div className="step-container">
      <div className="step-label">Step 6 of 11</div>
      <h1 className="step-title">Have they reached out since?</h1>
      <p className="step-subtitle">After the situation, did they make contact?</p>
      <SingleSelect
        options={OPTIONS}
        value={data.reachedOut}
        onChange={val => onChange('reachedOut', val)}
      />
      <button
        className="btn btn-primary"
        onClick={onNext}
        disabled={!data.reachedOut}
      >
        Continue
      </button>
    </div>
  );
}
