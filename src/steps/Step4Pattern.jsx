import React from 'react'
import StepShell from '../components/StepShell'
import SingleSelect from '../components/SingleSelect'

const OPTIONS = ['First time', 'Happens sometimes', 'This is a pattern']

export default function Step4Pattern({ data, update, onNext }) {
  return (
    <StepShell
      step={3}
      label="Does this feel familiar"
      onNext={onNext}
      nextDisabled={!data.pattern}
    >
      <h2 style={{ fontSize: '22px', fontWeight: 700, lineHeight: 1.3, marginBottom: '6px' }}>
        Has this happened before?
      </h2>
      <p style={{ color: '#888', fontSize: '14px', marginBottom: '4px' }}>
        Be honest with yourself here.
      </p>
      <SingleSelect
        options={OPTIONS}
        value={data.pattern}
        onChange={v => update({ pattern: v })}
      />
    </StepShell>
  )
}
