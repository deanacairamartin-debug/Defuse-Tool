import React from 'react'

export default function SingleSelect({ options, value, onChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
      {options.map(opt => {
        const active = value === opt
        return (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            style={{
              width: '100%',
              padding: '16px 20px',
              borderRadius: 'var(--radius)',
              fontSize: '15px',
              fontWeight: active ? 600 : 400,
              textAlign: 'left',
              border: `1.5px solid ${active ? '#e85d26' : '#2e2e2e'}`,
              background: active ? '#e85d2612' : '#181818',
              color: active ? '#f0ede8' : '#888',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            {opt}
          </button>
        )
      })}
    </div>
  )
}
