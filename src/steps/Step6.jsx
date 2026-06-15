import { useEffect } from 'react';
import Spinner from '../components/Spinner.jsx';

export default function Step6({ onNext }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onNext();
    }, 1500);
    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <div className="step-container">
      <div className="pause-screen">
        <p className="pause-message">
          You said what happened. That part is done. Give it a second while this gets looked at clearly — no emotion attached.
        </p>
        <Spinner />
      </div>
    </div>
  );
}
