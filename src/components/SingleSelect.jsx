export default function SingleSelect({ options, value, onChange }) {
  return (
    <div className="single-select">
      {options.map(opt => (
        <button
          key={opt}
          className={`single-select-btn ${value === opt ? 'selected' : ''}`}
          onClick={() => onChange(opt)}
          type="button"
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
