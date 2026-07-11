import { useEffect, useState } from 'react';
import SlamTitle from '../components/SlamTitle.jsx';

export default function ScreenBreath({ onDone }) {
  const [phase, setPhase] = useState('IN');

  useEffect(() => {
    const interval = setInterval(() => setPhase(p => p === 'IN' ? 'OUT' : 'IN'), 4000);
    const timer = setTimeout(onDone, 16000);
    return () => { clearInterval(interval); clearTimeout(timer); };
  }, [onDone]);

  return (
    <div className="screen">
      <div className="screen-eyebrow" style={{ color: 'var(--screen-accent)' }}>TAKE A BREATH</div>
      <SlamTitle flashColor="rgba(60,70,90,0.22)">TAKE A BREATH.</SlamTitle>

      <div className="breath-screen">
        <div className="breath-circle">
          <span className="breath-label">{phase}</span>
        </div>
        <div className="breath-title">Hold up.</div>
        <div className="breath-sub">Let that breathe for a second.</div>
      </div>
    </div>
  );
}
