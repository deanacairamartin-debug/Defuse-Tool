import React from 'react'
import StepShell from '../components/StepShell'
import SingleSelect from '../components/SingleSelect'

const OPTIONS = ['Being right', 'Being heard', 'Fixing this', 'Just moving on']

export default function Step9WhatMatters({ data, update, onNext }) {
  return (
    <StepShell
      step={8}
      label="Right now, what matters more"
      onNext={onNext}
      nextDisabled={!data.whatMatters}
    >
      <h2 style={{ fontSize: '22px', fontWeight: 700, lineHeight: 1.3, marginBottom: '8px' }}>
        Right now, what matters most to you?
      </h2>
      <p style={{ color: '#888', fontSize: '14px', marginBottom: '4px' }}>
        Be honest. There's no wrong answer.
      </p>
      <SingleSelect
        options={OPTIONS}
        value={data.whatMatters}
        onChange={v => update({ whatMatters: v })}
      />
    </StepShell>
  )
}
