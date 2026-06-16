import { useEffect } from 'react';

export default function ScreenBreath({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 5000);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="screen">
      <div className="breath-screen">
        <div className="breath-title">Hold up.</div>
        <div className="breath-sub">Let that breathe for a second.</div>
        <div className="spinner" style={{ marginTop: 8 }} />
      </div>
    </div>
  );
}
