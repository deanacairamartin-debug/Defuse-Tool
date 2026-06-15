import React from 'react'
import ProgressDots from '../components/ProgressDots'
import Spinner from '../components/Spinner'

function parseMovesText(text) {
  if (!text) return []
  const moves = []
  const regex = /Move\s+\d+:\s*([^\n]+)\n([\s\S]*?)(?=Move\s+\d+:|$)/gi
  let match
  while ((match = regex.exec(text)) !== null) {
    moves.push({ title: match[1].trim(), body: match[2].trim() })
  }
  if (moves.length === 0) {
    return [{ title: '', body: text }]
  }
  return moves
}

export default function Step11ThreeMoves({ movesText, loading, error, onRestart }) {
  const moves = parseMovesText(movesText)

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <div style={{ width: '100%', maxWidth: '560px', padding: '0 20px 120px' }}>
        <ProgressDots current={10} />

        <div style={{ paddingTop: '32px' }}>
          <p style={{
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#e85d26',
            marginBottom: '12px',
          }}>
            Three possible moves
          </p>

          <h2 style={{ fontSize: '22px', fontWeight: 700, lineHeight: 1.3, marginBottom: '28px' }}>
            Here's where you go from here.
          </h2>

          {loading && !movesText && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', color: '#888' }}>
              <Spinner size={22} />
              <span style={{ fontSize: '14px' }}>Working out your options…</span>
            </div>
          )}

          {error && (
            <div style={{
              background: '#1e0e0e',
              border: '1.5px solid #e85d2640',
              borderRadius: 'var(--radius)',
              padding: '16px',
              color: '#e85d26',
              fontSize: '14px',
            }}>
              Something went wrong. Check your API key and try again.
            </div>
          )}

          {moves.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {moves.map((move, i) => (
                <div
                  key={i}
                  className="fade-in"
                  style={{
                    background: '#181818',
                    border: '1.5px solid #2e2e2e',
                    borderRadius: 'var(--radius)',
                    padding: '20px 22px',
                    animationDelay: `${i * 0.1}s`,
                    animationFillMode: 'both',
                  }}
                >
                  {move.title && (
                    <p style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: '#e85d26',
                      marginBottom: '8px',
                    }}>
                      Move {i + 1} — {move.title}
                    </p>
                  )}
                  <p style={{
                    fontSize: '15px',
                    lineHeight: 1.7,
                    color: '#f0ede8',
                    whiteSpace: 'pre-wrap',
                  }}>
                    {move.body}
                  </p>
                </div>
              ))}

              {loading && (
                <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '8px' }}>
                  <Spinner size={18} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {!loading && (
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '20px',
          background: 'linear-gradient(to top, #0e0e0e 60%, transparent)',
          display: 'flex',
          justifyContent: 'center',
        }}>
          <button
            onClick={onRestart}
            style={{
              padding: '14px 32px',
              borderRadius: 'var(--radius)',
              fontSize: '14px',
              fontWeight: 500,
              background: 'transparent',
              color: '#888',
              cursor: 'pointer',
              border: '1.5px solid #2e2e2e',
            }}
          >
            Start over
          </button>
        </div>
      )}
    </div>
  )
}
