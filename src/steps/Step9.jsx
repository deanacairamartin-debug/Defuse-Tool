export default function Step9({ data, onChange, onNext }) {
  return (
    <div className="step-container">
      <div className="step-label">Step 10 of 11</div>
      <h1 className="step-title">What do you want to happen?</h1>
      <p className="step-subtitle">Forget the heat of the moment. What outcome are you actually after?</p>
      <textarea
        placeholder="Be specific if you can. What does good look like here?"
        value={data.desiredOutcome || ''}
        onChange={e => onChange('desiredOutcome', e.target.value)}
        rows={5}
      />
      <button
        className="btn btn-primary"
        onClick={onNext}
        disabled={!data.desiredOutcome?.trim()}
      >
        Show me my moves
      </button>
    </div>
  );
}
