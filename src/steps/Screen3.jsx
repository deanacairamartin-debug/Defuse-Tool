import SlamTitle from '../components/SlamTitle.jsx';

const TAGS = ['Justified', 'Paranoid', 'Confused', 'Certain', 'Spiraling', 'Numb', 'Vindictive'];

export default function Screen3({ data, onChange, onNext }) {
  function toggleTag(t) {
    const cur = data.s3tags || [];
    onChange('s3tags', cur.includes(t) ? cur.filter(x => x !== t) : [...cur, t]);
  }

  return (
    <div className="screen">
      <div className="screen-eyebrow" style={{ color: 'var(--screen-accent)' }}>SPINNING A STORY</div>
      <SlamTitle flashColor="rgba(170,60,40,0.25)">SPINNING A STORY?</SlamTitle>
      <p className="screen-subtitle">What do you believe this means?</p>

      <textarea
        value={data.s3text || ''}
        onChange={e => onChange('s3text', e.target.value)}
        placeholder="He's obviously out with someone else. Probably the same girl he swore was just a 'friend.'"
        rows={5}
      />

      <div className="feeling-tags">
        {TAGS.map(t => (
          <button
            key={t}
            type="button"
            className={`feeling-tag${(data.s3tags || []).includes(t) ? ' selected' : ''}`}
            onClick={() => toggleTag(t)}
          >{t}</button>
        ))}
      </div>

      <button className="btn btn-primary" onClick={onNext}>Continue</button>
    </div>
  );
}
