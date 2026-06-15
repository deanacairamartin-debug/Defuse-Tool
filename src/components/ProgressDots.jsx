import React from 'react'

const TOTAL_STEPS = 11

export default function ProgressDots({ current }) {
  return (
    <div style={{
      display: 'flex',
      gap: '6px',
      justifyContent: 'center',
      paddingTop: '24px',
      paddingBottom: '8px',
    }}>
      {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
        <div
          key={i}
          style={{
            width: i === current ? '20px' : '6px',
            height: '6px',
            borderRadius: '3px',
            background: i < current
              ? '#e85d26'
              : i === current
              ? '#e85d26'
              : '#333',
            opacity: i < current ? 0.5 : 1,
            transition: 'all 0.3s ease',
          }}
        />
      ))}
    </div>
  )
}
