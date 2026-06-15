import Spinner from '../components/Spinner.jsx';

export default function Step7({ cameraCheck, onNext }) {
  if (!cameraCheck) {
    return (
      <div className="step-container">
        <div className="pause-screen">
          <p className="pause-message">Getting a clear read on this...</p>
          <Spinner />
        </div>
      </div>
    );
  }

  return (
    <div className="step-container">
      <div className="step-label">Camera check</div>
      <h1 className="step-title">Here is what happened.</h1>
      <p className="step-subtitle">No spin. No emotion. Just the facts.</p>
      <div className="camera-check-text">{cameraCheck}</div>
      <button className="btn btn-primary" onClick={onNext}>
        That is accurate — keep going
      </button>
    </div>
  );
}
