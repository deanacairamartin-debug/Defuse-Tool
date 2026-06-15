import React from 'react'
import StepShell from '../components/StepShell'
import FeelingTags from '../components/FeelingTags'

export default function Step5TheirFeelings({ data, update, onNext }) {
  return (
    <StepShell
      step={4}
      label="Their feelings, as you saw them"
      onNext={onNext}
    >
      <h2 style={{ fontSize: '22px', fontWeight: 700, lineHeight: 1.3, marginBottom: '8px' }}>
        What did they seem to be feeling?
      </h2>
      <p style={{ color: '#888', fontSize: '14px', marginBottom: '20px' }}>
        Not what you think they should feel — what you actually observed.
      </p>

      <textarea
        value={data.theirFeelingsText}
        onChange={e => update({ theirFeelingsText: e.target.value })}
        placeholder="Describe what you noticed. Optional."
        rows={3}
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

      <p style={{ fontSize: '13px', color: '#666', marginTop: '20px' }}>
        Select what seemed true for them.
      </p>
      <FeelingTags
        selected={data.theirFeelingTags}
        onChange={tags => update({ theirFeelingTags: tags })}
      />
    </StepShell>
  )
}
