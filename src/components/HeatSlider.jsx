import { useRef, useEffect } from 'react';

function getSliderBg(value) {
  const pct = ((value - 1) / 9) * 100;
  return `linear-gradient(to right, #4caf50 0%, #ffeb3b 50%, #e53935 100%)`;
}

export default function HeatSlider({ value, onChange }) {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      const pct = ((value - 1) / 9) * 100;
      ref.current.style.background = `linear-gradient(to right, #4caf50 0%, #ffeb3b 50%, #e53935 100%)`;
    }
  }, [value]);

  return (
    <div className="heat-slider-container">
      <div className="heat-slider-labels">
        <span>Calm</span>
        <span>Boiling</span>
      </div>
      <input
        ref={ref}
        type="range"
        min={1}
        max={10}
        step={1}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="heat-slider"
        style={{ background: getSliderBg(value) }}
      />
      <div className="heat-value">{value}</div>
    </div>
  );
}
