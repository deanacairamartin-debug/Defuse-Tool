import React from 'react'

export default function Spinner({ size = 32 }) {
  return (
    <div style={{
      width: size,
      height: size,
      border: `2px solid #2e2e2e`,
      borderTopColor: '#e85d26',
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite',
    }} />
  )
}
