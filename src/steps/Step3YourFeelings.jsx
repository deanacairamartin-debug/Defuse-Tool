import React from 'react'
import StepShell from '../components/StepShell'
import FeelingTags from '../components/FeelingTags'

export default function Step3YourFeelings({ data, update, onNext }) {
  const hasAnything = data.userFeelingsText.trim() || data.userFeelingTags.length > 0

  return (
    <StepShell
      step={2}
      label="Your feelings"
      onNext={onNext}
      nextDisabled={!hasAnything}
    >
      <h2 style={{ fontSize: '22px', fontWeight: 700, lineHeight: 1.3, marginBottom: '20px' }}>
        What are you feeling right now?
      </h2>

      <textarea
        value={data.userFeelingsText}
        onChange={e => update({ userFeelingsText: e.target.value })}
        placeholder="Say more if you want to. Optional."
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

      <p style={{ fontSize: '13px', color: '#666', marginTop: '20px', marginBottom: '0' }}>
        Select everything that applies.
      </p>
      <FeelingTags
        selected={data.userFeelingTags}
        onChange={tags => update({ userFeelingTags: tags })}
      />
    </StepShell>
  )
}
