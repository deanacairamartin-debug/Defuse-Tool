export default function SlamTitle({ children, flashColor }) {
  const words = String(children).split(' ');
  return (
    <div className="screen-title-wrap">
      {flashColor && (
        <div
          className="screen-title-flash"
          style={{ background: `radial-gradient(circle at 20% 50%, ${flashColor}, transparent 65%)` }}
        />
      )}
      <h1 className="screen-title">
        {words.map((word, i) => (
          <span
            key={i}
            className="df-word"
            style={{ animationDelay: `${i * 0.09}s`, marginRight: i < words.length - 1 ? '0.24em' : 0 }}
          >
            {word}
          </span>
        ))}
      </h1>
    </div>
  );
}
