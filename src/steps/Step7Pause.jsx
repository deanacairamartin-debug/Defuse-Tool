import React, { useEffect } from 'react'
import ProgressDots from '../components/ProgressDots'
import Spinner from '../components/Spinner'

export default function Step7Pause({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2000)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <div style={{ width: '100%', maxWidth: '560px', padding: '0 20px' }}>
        <ProgressDots current={6} />
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '70vh',
          textAlign: 'center',
          gap: '32px',
        }}>
          <Spinner size={36} />
          <p style={{
            fontSize: '18px',
            lineHeight: 1.6,
            color: '#888',
            maxWidth: '360px',
          }}>
            You said what happened. That part is done.{' '}
            <br /><br />
            Give it a second while this gets looked at clearly — no emotion attached.
          </p>
        </div>
      </div>
    </div>
  )
}
