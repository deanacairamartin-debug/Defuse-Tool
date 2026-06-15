const FEELINGS = [
  'Confused', 'Hurt', 'Angry', 'Embarrassed', 'Defensive',
  'Dismissed', 'Guilty', 'Anxious', 'Numb'
];

export default function FeelingTags({ selected, onChange }) {
  function toggle(feeling) {
    if (selected.includes(feeling)) {
      onChange(selected.filter(f => f !== feeling));
    } else {
      onChange([...selected, feeling]);
    }
  }

  return (
    <div className="feeling-tags">
      {FEELINGS.map(f => (
        <button
          key={f}
          className={`feeling-tag ${selected.includes(f) ? 'selected' : ''}`}
          onClick={() => toggle(f)}
          type="button"
        >
          {f}
        </button>
      ))}
    </div>
  );
}
