import React from 'react'
import StepShell from '../components/StepShell'
import Spinner from '../components/Spinner'

export default function Step8CameraCheck({ cameraCheck, loading, error, onNext }) {
  return (
    <StepShell
      step={7}
      label="Camera check"
      onNext={!loading && !error && cameraCheck ? onNext : undefined}
      nextLabel="That's what happened →"
    >
      <h2 style={{ fontSize: '22px', fontWeight: 700, lineHeight: 1.3, marginBottom: '8px' }}>
        Here's what actually happened.
      </h2>
      <p style={{ color: '#888', fontSize: '14px', marginBottom: '28px' }}>
        No spin. No blame. Just the facts.
      </p>

      {loading && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', color: '#888' }}>
          <Spinner size={22} />
          <span style={{ fontSize: '14px' }}>Reading the situation clearly…</span>
        </div>
      )}

      {error && (
        <div style={{
          background: '#1e0e0e',
          border: '1.5px solid #e85d2640',
          borderRadius: 'var(--radius)',
          padding: '16px',
          color: '#e85d26',
          fontSize: '14px',
        }}>
          Something went wrong. Check your API key and try again.
        </div>
      )}

      {cameraCheck && !loading && (
        <div
          className="fade-in"
          style={{
            background: '#181818',
            border: '1.5px solid #2e2e2e',
            borderRadius: 'var(--radius)',
            padding: '22px 24px',
            fontSize: '16px',
            lineHeight: 1.7,
            color: '#f0ede8',
          }}
        >
          {cameraCheck}
        </div>
      )}
    </StepShell>
  )
}
