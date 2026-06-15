export default function ProgressDots({ current, total }) {
  return (
    <div className="progress-dots">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`progress-dot ${i === current ? 'active' : i < current ? 'done' : ''}`}
        />
      ))}
    </div>
  );
}
