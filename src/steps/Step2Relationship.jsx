import React from 'react'
import StepShell from '../components/StepShell'
import SingleSelect from '../components/SingleSelect'

const OPTIONS = ['Partner or spouse', 'Family', 'Work or client', 'Friend', 'Other']

export default function Step2Relationship({ data, update, onNext }) {
  return (
    <StepShell
      step={1}
      label="Who is this with"
      onNext={onNext}
      nextDisabled={!data.relationship}
    >
      <h2 style={{ fontSize: '22px', fontWeight: 700, lineHeight: 1.3, marginBottom: '6px' }}>
        Who is this person to you?
      </h2>
      <p style={{ color: '#888', fontSize: '14px', marginBottom: '4px' }}>
        Pick the one that fits best.
      </p>
      <SingleSelect
        options={OPTIONS}
        value={data.relationship}
        onChange={v => update({ relationship: v })}
      />
    </StepShell>
  )
}
