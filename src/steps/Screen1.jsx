import SlamTitle from '../components/SlamTitle.jsx';

const TAGS = ['Disrespected', 'Blindsided', 'Used', 'Humiliated', 'Betrayed', 'Ignored', 'Lied to', 'Embarrassed', 'Furious'];

export default function Screen1({ data, onChange, onNext }) {
  function toggleTag(t) {
    const cur = data.s1tags || [];
    onChange('s1tags', cur.includes(t) ? cur.filter(x => x !== t) : [...cur, t]);
  }

  return (
    <div className="screen">
      <div className="screen-eyebrow" style={{ color: 'var(--screen-accent)' }}>WHAT SET YOU OFF</div>
      <SlamTitle flashColor="rgba(229,52,42,0.3)">WHAT SET YOU OFF?</SlamTitle>
      <p className="screen-subtitle">Tell it straight. No filter.</p>

      <textarea
        value={data.s1text || ''}
        onChange={e => onChange('s1text', e.target.value)}
        placeholder="He didn't text back last night. Saw him active on IG. Morning comes — radio silence."
        rows={6}
      />

      <div className="feeling-tags">
        {TAGS.map(t => (
          <button
            key={t}
            type="button"
            className={`feeling-tag${(data.s1tags || []).includes(t) ? ' selected' : ''}`}
            onClick={() => toggleTag(t)}
          >{t}</button>
        ))}
      </div>

      <button
        className="btn btn-primary"
        onClick={onNext}
        disabled={!data.s1text?.trim()}
      >Continue</button>
    </div>
  );
}
