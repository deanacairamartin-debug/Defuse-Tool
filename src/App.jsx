import React, { useState, useCallback, useRef } from 'react'
import { getCameraCheck, getThreeMoves } from './api'

import Step1WhatHappened from './steps/Step1WhatHappened'
import Step2Relationship from './steps/Step2Relationship'
import Step3YourFeelings from './steps/Step3YourFeelings'
import Step4Pattern from './steps/Step4Pattern'
import Step5TheirFeelings from './steps/Step5TheirFeelings'
import Step6ReachedOut from './steps/Step6ReachedOut'
import Step7Pause from './steps/Step7Pause'
import Step8CameraCheck from './steps/Step8CameraCheck'
import Step9WhatMatters from './steps/Step9WhatMatters'
import Step10DesiredOutcome from './steps/Step10DesiredOutcome'
import Step11ThreeMoves from './steps/Step11ThreeMoves'

const initialData = {
  whatHappened: '',
  heatLevel: 5,
  relationship: '',
  userFeelingsText: '',
  userFeelingTags: [],
  pattern: '',
  theirFeelingsText: '',
  theirFeelingTags: [],
  reachedOut: '',
  whatMatters: '',
  desiredOutcome: '',
}

export default function App() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState(initialData)
  const [cameraCheck, setCameraCheck] = useState('')
  const [cameraLoading, setCameraLoading] = useState(false)
  const [cameraError, setCameraError] = useState(false)
  const [movesText, setMovesText] = useState('')
  const [movesLoading, setMovesLoading] = useState(false)
  const [movesError, setMovesError] = useState(false)
  const cameraFiredRef = useRef(false)

  const update = useCallback(patch => setData(d => ({ ...d, ...patch })), [])

  function next() {
    setStep(s => s + 1)
    window.scrollTo(0, 0)
  }

  function handlePauseDone() {
    if (!cameraFiredRef.current) {
      cameraFiredRef.current = true
      setCameraLoading(true)
      setCameraError(false)
      getCameraCheck(data)
        .then(result => {
          setCameraCheck(result)
          setCameraLoading(false)
        })
        .catch(() => {
          setCameraError(true)
          setCameraLoading(false)
        })
    }
    next()
  }

  function handleStartMoves() {
    setMovesText('')
    setMovesLoading(true)
    setMovesError(false)
    setStep(10)
    window.scrollTo(0, 0)

    getThreeMoves(data, cameraCheck, chunk => {
      setMovesText(t => t + chunk)
    })
      .then(() => setMovesLoading(false))
      .catch(() => {
        setMovesError(true)
        setMovesLoading(false)
      })
  }

  function restart() {
    setStep(0)
    setData(initialData)
    setCameraCheck('')
    setCameraError(false)
    setMovesText('')
    setMovesError(false)
    cameraFiredRef.current = false
    window.scrollTo(0, 0)
  }

  switch (step) {
    case 0: return <Step1WhatHappened data={data} update={update} onNext={next} />
    case 1: return <Step2Relationship data={data} update={update} onNext={next} />
    case 2: return <Step3YourFeelings data={data} update={update} onNext={next} />
    case 3: return <Step4Pattern data={data} update={update} onNext={next} />
    case 4: return <Step5TheirFeelings data={data} update={update} onNext={next} />
    case 5: return <Step6ReachedOut data={data} update={update} onNext={next} />
    case 6: return <Step7Pause onDone={handlePauseDone} />
    case 7: return (
      <Step8CameraCheck
        cameraCheck={cameraCheck}
        loading={cameraLoading}
        error={cameraError}
        onNext={next}
      />
    )
    case 8: return <Step9WhatMatters data={data} update={update} onNext={next} />
    case 9: return (
      <Step10DesiredOutcome
        data={data}
        update={update}
        onNext={handleStartMoves}
      />
    )
    case 10: return (
      <Step11ThreeMoves
        movesText={movesText}
        loading={movesLoading}
        error={movesError}
        onRestart={restart}
      />
    )
    default: return null
  }
}
