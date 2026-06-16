import Spinner from '../components/Spinner.jsx';

export default function Step7({ cameraCheck, loading, error, onNext }) {
  if (loading || (!cameraCheck && !error)) {
    return (
      <div className="step-container">
        <div className="pause-screen">
          <p className="pause-message">Getting a clear read on this...</p>
          <Spinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="step-container">
        <div className="step-label">Camera check</div>
        <h1 className="step-title">Something went wrong.</h1>
        <p className="step-subtitle">
          Couldn't reach the API. Check your connection or API key and try again.
        </p>
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
        That's accurate — keep going
      </button>
    </div>
  );
}
