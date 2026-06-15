import React from 'react'

export default function HeatSlider({ value, onChange }) {
  const pct = ((value - 1) / 9) * 100

  // Interpolate green (#3ecf8e) to red (#e85d26)
  const r = Math.round(62 + (232 - 62) * (pct / 100))
  const g = Math.round(207 + (93 - 207) * (pct / 100))
  const b = Math.round(142 + (38 - 142) * (pct / 100))
  const thumbColor = `rgb(${r},${g},${b})`

  return (
    <div style={{ marginTop: '24px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '10px',
        fontSize: '13px',
        color: '#888',
        fontWeight: 500,
      }}>
        <span style={{ color: '#3ecf8e' }}>Calm</span>
        <span style={{ color: '#e85d26' }}>Boiling</span>
      </div>

      <style>{`
        .heat-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 6px;
          border-radius: 3px;
          outline: none;
          cursor: pointer;
          background: linear-gradient(
            to right,
            #3ecf8e 0%,
            ${thumbColor} ${pct}%,
            #2e2e2e ${pct}%,
            #2e2e2e 100%
          );
        }
        .heat-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: ${thumbColor};
          border: 2px solid #0e0e0e;
          box-shadow: 0 0 0 3px ${thumbColor}44;
          transition: box-shadow 0.2s;
        }
        .heat-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: ${thumbColor};
          border: 2px solid #0e0e0e;
          box-shadow: 0 0 0 3px ${thumbColor}44;
        }
      `}</style>

      <input
        type="range"
        min={1}
        max={10}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="heat-slider"
      />

      <div style={{
        textAlign: 'center',
        marginTop: '10px',
        fontSize: '28px',
        fontWeight: 700,
        color: thumbColor,
        transition: 'color 0.2s',
      }}>
        {value}
      </div>
    </div>
  )
}
