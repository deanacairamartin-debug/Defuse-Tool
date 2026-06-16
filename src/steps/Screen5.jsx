export default function Screen5({ data, onChange, onNext }) {
  return (
    <div className="screen">
      <div className="screen-title">Ready to blow it up?</div>
      <div className="screen-subtitle">What do you feel like doing right now?</div>

      <textarea
        value={data.s5text || ''}
        onChange={e => onChange('s5text', e.target.value)}
        placeholder={"I'm about to send a 2 a.m. rage text, screenshot our chats, and post him on the 'Are We Dating the Same Guy?' page."}
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
