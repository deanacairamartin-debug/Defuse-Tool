import React from 'react'
import StepShell from '../components/StepShell'

export default function Step10DesiredOutcome({ data, update, onNext }) {
  return (
    <StepShell
      step={9}
      label="What do you want to happen"
      onNext={onNext}
      nextDisabled={!data.desiredOutcome.trim()}
      nextLabel="Show me my moves →"
    >
      <h2 style={{ fontSize: '22px', fontWeight: 700, lineHeight: 1.3, marginBottom: '8px' }}>
        What outcome are you actually after?
      </h2>
      <p style={{ color: '#888', fontSize: '14px', marginBottom: '20px' }}>
        Forget the heat of the moment. What do you actually want from this?
      </p>

      <textarea
        value={data.desiredOutcome}
        onChange={e => update({ desiredOutcome: e.target.value })}
        placeholder="Write it out. Be specific if you can."
        rows={5}
        style={{
          width: '100%',
          background: '#181818',
          border: '1.5px solid #2e2e2e',
          borderRadius: 'var(--radius)',
          color: 'var(--text)',
          fontSize: '15px',
          lineHeight: 1.6,
          padding: '14px 16px',
          resize: 'vertical',
          outline: 'none',
        }}
        onFocus={e => e.target.style.borderColor = '#e85d26'}
        onBlur={e => e.target.style.borderColor = '#2e2e2e'}
      />
    </StepShell>
  )
}
