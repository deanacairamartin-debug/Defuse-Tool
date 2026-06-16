import { useState, useEffect, useCallback, useRef } from 'react';
import Screen1 from './steps/Screen1.jsx';
import Screen2 from './steps/Screen2.jsx';
import Screen3 from './steps/Screen3.jsx';
import Screen4 from './steps/Screen4.jsx';
import Screen5 from './steps/Screen5.jsx';
import ScreenBreath from './steps/ScreenBreath.jsx';
import Screen6 from './steps/Screen6.jsx';
import Screen7 from './steps/Screen7.jsx';
import Screen8 from './steps/Screen8.jsx';
import { getReality, getTruth, getNextMove } from './api.js';

// screens: 1-5 input, 'breath', 6-8 output
const SCREENS = ['1','2','3','4','5','breath','6','7','8'];
const TOTAL = SCREENS.length;

const init = {
  s1text: '', s1tags: [],
  s2who: '',
  s3text: '', s3tags: [],
  s4pattern: '',
  s5text: '',
};

export default function App() {
  const [screenIdx, setScreenIdx] = useState(0);
  const [data, setData] = useState(init);

  const [reality, setReality] = useState('');
  const [realityLoading, setRealityLoading] = useState(false);
  const [realityError, setRealityError] = useState(false);

  const [truth, setTruth] = useState('');
  const [truthLoading, setTruthLoading] = useState(false);
  const [truthError, setTruthError] = useState(false);

  const [movesText, setMovesText] = useState('');
  const [movesLoading, setMovesLoading] = useState(false);
  const [movesError, setMovesError] = useState(false);

  const firedRef = useRef({ reality: false, truth: false, moves: false });

  function change(key, val) {
    setData(d => ({ ...d, [key]: val }));
  }

  function next() {
    setScreenIdx(i => i + 1);
    window.scrollTo(0, 0);
  }

  const handleBreathDone = useCallback(() => {
    if (!firedRef.current.reality) {
      firedRef.current.reality = true;
      setRealityLoading(true);
      setRealityError(false);
      getReality(data)
        .then(text => { setReality(text); setRealityLoading(false); })
        .catch(() => { setRealityError(true); setRealityLoading(false); });
    }
    next();
  }, [data]);

  function handleScreen6Next() {
    if (!firedRef.current.truth) {
      firedRef.current.truth = true;
      setTruthLoading(true);
      setTruthError(false);
      getTruth({ ...data, reality })
        .then(text => { setTruth(text); setTruthLoading(false); })
        .catch(() => { setTruthError(true); setTruthLoading(false); });
    }
    next();
  }

  function handleScreen7Next() {
    if (!firedRef.current.moves) {
      firedRef.current.moves = true;
      setMovesLoading(true);
      setMovesError(false);
      getNextMove({ ...data, reality, truth }, chunk => {
        setMovesText(t => t + chunk);
      })
        .then(() => setMovesLoading(false))
        .catch(() => { setMovesError(true); setMovesLoading(false); });
    }
    next();
  }

  function restart() {
    setScreenIdx(0);
    setData(init);
    setReality(''); setRealityLoading(false); setRealityError(false);
    setTruth(''); setTruthLoading(false); setTruthError(false);
    setMovesText(''); setMovesLoading(false); setMovesError(false);
    firedRef.current = { reality: false, truth: false, moves: false };
    window.scrollTo(0, 0);
  }

  const screen = SCREENS[screenIdx];
  const isBreath = screen === 'breath';
  const dotCount = TOTAL;

  return (
    <div className="app">
      <header className="app-header">
        <span className="app-logo">Defuse</span>
      </header>

      <div className="progress-dots">
        {Array.from({ length: dotCount }).map((_, i) => (
          <div
            key={i}
            className={`progress-dot ${i === screenIdx ? 'active' : i < screenIdx ? 'done' : ''}`}
          />
        ))}
      </div>

      {screen === '1' && <Screen1 data={data} onChange={change} onNext={next} />}
      {screen === '2' && <Screen2 data={data} onChange={change} onNext={next} />}
      {screen === '3' && <Screen3 data={data} onChange={change} onNext={next} />}
      {screen === '4' && <Screen4 data={data} onChange={change} onNext={next} />}
      {screen === '5' && <Screen5 data={data} onChange={change} onNext={next} />}
      {screen === 'breath' && <ScreenBreath onDone={handleBreathDone} />}
      {screen === '6' && (
        <Screen6
          reality={reality}
          loading={realityLoading}
          error={realityError}
          onNext={handleScreen6Next}
        />
      )}
      {screen === '7' && (
        <Screen7
          truth={truth}
          loading={truthLoading}
          error={truthError}
          onNext={handleScreen7Next}
        />
      )}
      {screen === '8' && (
        <Screen8
          movesText={movesText}
          loading={movesLoading}
          error={movesError}
          onRestart={restart}
        />
      )}
    </div>
  );
}
