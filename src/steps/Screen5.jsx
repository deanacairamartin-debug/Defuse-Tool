import SlamTitle from '../components/SlamTitle.jsx';

export default function Screen5({ data, onChange, onNext }) {
  return (
    <div className="screen">
      <div className="screen-eyebrow" style={{ color: 'var(--screen-accent)' }}>READY TO BLOW IT UP</div>
      <SlamTitle flashColor="rgba(90,70,60,0.22)">READY TO BLOW IT UP?</SlamTitle>
      <p className="screen-subtitle">What do you feel like doing right now?</p>

      <textarea
        value={data.s5text || ''}
        onChange={e => onChange('s5text', e.target.value)}
        placeholder="I'm about to send a 2 a.m. rage text, screenshot our chats, and post him on 'Are We Dating the Same Guy?'"
        rows={6}
      />

      <button
        className="btn btn-primary"
        onClick={onNext}
        disabled={!data.s5text?.trim()}
      >Continue</button>
    </div>
  );
}
