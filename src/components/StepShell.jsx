import React from 'react'
import ProgressDots from './ProgressDots'

export default function StepShell({ step, label, children, onNext, nextLabel = 'Continue', nextDisabled = false }) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <div style={{ width: '100%', maxWidth: '560px', padding: '0 20px' }}>
        <ProgressDots current={step} />

        <div style={{ paddingTop: '32px', paddingBottom: '120px' }}>
          {label && (
            <p style={{
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#e85d26',
              marginBottom: '12px',
            }}>
              {label}
            </p>
          )}
          {children}
        </div>
      </div>

      {onNext && (
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '20px',
          background: 'linear-gradient(to top, #0e0e0e 60%, transparent)',
          display: 'flex',
          justifyContent: 'center',
        }}>
          <button
            onClick={onNext}
            disabled={nextDisabled}
            style={{
              width: '100%',
              maxWidth: '520px',
              padding: '16px',
              borderRadius: 'var(--radius)',
              fontSize: '15px',
              fontWeight: 600,
              background: nextDisabled ? '#2e2e2e' : '#e85d26',
              color: nextDisabled ? '#555' : '#fff',
              cursor: nextDisabled ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s',
              border: 'none',
            }}
          >
            {nextLabel}
          </button>
        </div>
      )}
    </div>
  )
}
