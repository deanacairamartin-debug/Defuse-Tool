import { useState, useEffect, useCallback } from 'react';
import ProgressDots from './components/ProgressDots.jsx';
import Step0 from './steps/Step0.jsx';
import Step1 from './steps/Step1.jsx';
import Step2 from './steps/Step2.jsx';
import Step3 from './steps/Step3.jsx';
import Step4 from './steps/Step4.jsx';
import Step5 from './steps/Step5.jsx';
import Step6 from './steps/Step6.jsx';
import Step7 from './steps/Step7.jsx';
import Step8 from './steps/Step8.jsx';
import Step9 from './steps/Step9.jsx';
import Step10 from './steps/Step10.jsx';
import { getCameraCheck } from './api.js';

const TOTAL_STEPS = 11;

const initialData = {
  whatHappened: '',
  heatLevel: 5,
  relationship: '',
  myFeelings: [],
  myFeelingsNote: '',
  familiarity: '',
  theirFeelings: [],
  theirFeelingsNote: '',
  reachedOut: '',
  whatMatters: '',
  desiredOutcome: '',
};

export default function App() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState(initialData);
  const [cameraCheck, setCameraCheck] = useState('');
  const [cameraCheckLoading, setCameraCheckLoading] = useState(false);
  const [cameraCheckError, setCameraCheckError] = useState(false);

  function handleChange(key, value) {
    setFormData(prev => ({ ...prev, [key]: value }));
  }

  function nextStep() {
    setStep(s => s + 1);
  }

  useEffect(() => {
    if (step === 6) {
      setCameraCheckLoading(true);
      setCameraCheckError(false);
      getCameraCheck(formData)
        .then(result => {
          setCameraCheck(result);
          setCameraCheckLoading(false);
        })
        .catch(err => {
          console.error(err);
          setCameraCheckError(true);
          setCameraCheckLoading(false);
        });
    }
  }, [step]);

  function handleRestart() {
    setStep(0);
    setFormData(initialData);
    setCameraCheck('');
    setCameraCheckLoading(false);
    setCameraCheckError(false);
  }

  const step6Next = useCallback(() => {
    setStep(7);
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <span className="app-logo">Defuse</span>
      </header>

      <ProgressDots current={step} total={TOTAL_STEPS} />

      {step === 0 && <Step0 data={formData} onChange={handleChange} onNext={nextStep} />}
      {step === 1 && <Step1 data={formData} onChange={handleChange} onNext={nextStep} />}
      {step === 2 && <Step2 data={formData} onChange={handleChange} onNext={nextStep} />}
      {step === 3 && <Step3 data={formData} onChange={handleChange} onNext={nextStep} />}
      {step === 4 && <Step4 data={formData} onChange={handleChange} onNext={nextStep} />}
      {step === 5 && <Step5 data={formData} onChange={handleChange} onNext={nextStep} />}
      {step === 6 && <Step6 onNext={step6Next} />}
      {step === 7 && <Step7 cameraCheck={cameraCheck} loading={cameraCheckLoading} error={cameraCheckError} onNext={nextStep} />}
      {step === 8 && <Step8 data={formData} onChange={handleChange} onNext={nextStep} />}
      {step === 9 && <Step9 data={formData} onChange={handleChange} onNext={nextStep} />}
      {step === 10 && (
        <Step10
          data={formData}
          cameraCheck={cameraCheck}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}
