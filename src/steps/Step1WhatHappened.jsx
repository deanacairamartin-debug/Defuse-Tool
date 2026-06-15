import React from 'react'
import StepShell from '../components/StepShell'
import HeatSlider from '../components/HeatSlider'

export default function Step1WhatHappened({ data, update, onNext }) {
  return (
    <StepShell
      step={0}
      label="What happened"
      onNext={onNext}
      nextDisabled={!data.whatHappened.trim()}
    >
      <h2 style={{ fontSize: '22px', fontWeight: 700, lineHeight: 1.3, marginBottom: '20px' }}>
        Tell it like you would tell a friend.
      </h2>

      <textarea
        value={data.whatHappened}
        onChange={e => update({ whatHappened: e.target.value })}
        placeholder="No need to organize it. Just say what happened."
        rows={6}
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

      <div style={{ marginTop: '32px' }}>
        <p style={{ fontSize: '14px', color: '#888', marginBottom: '4px' }}>
          How heated is this right now?
        </p>
        <HeatSlider value={data.heatLevel} onChange={v => update({ heatLevel: v })} />
      </div>
    </StepShell>
  )
}
