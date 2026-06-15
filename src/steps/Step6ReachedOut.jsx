import React from 'react'
import StepShell from '../components/StepShell'
import SingleSelect from '../components/SingleSelect'

const OPTIONS = ['Yes', 'No', 'Too soon to tell', 'We have not spoken']

export default function Step6ReachedOut({ data, update, onNext }) {
  return (
    <StepShell
      step={5}
      label="Have they reached out since"
      onNext={onNext}
      nextDisabled={!data.reachedOut}
    >
      <h2 style={{ fontSize: '22px', fontWeight: 700, lineHeight: 1.3, marginBottom: '6px' }}>
        Have they reached out since this happened?
      </h2>
      <SingleSelect
        options={OPTIONS}
        value={data.reachedOut}
        onChange={v => update({ reachedOut: v })}
      />
    </StepShell>
  )
}
