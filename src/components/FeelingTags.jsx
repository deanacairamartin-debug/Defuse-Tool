import React from 'react'

const ALL_TAGS = [
  'Confused', 'Hurt', 'Angry', 'Embarrassed', 'Defensive',
  'Dismissed', 'Guilty', 'Anxious', 'Numb',
]

export default function FeelingTags({ selected, onChange }) {
  function toggle(tag) {
    if (selected.includes(tag)) {
      onChange(selected.filter(t => t !== tag))
    } else {
      onChange([...selected, tag])
    }
  }

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      marginTop: '16px',
    }}>
      {ALL_TAGS.map(tag => {
        const active = selected.includes(tag)
        return (
          <button
            key={tag}
            onClick={() => toggle(tag)}
            style={{
              padding: '7px 16px',
              borderRadius: '100px',
              fontSize: '14px',
              fontWeight: 500,
              border: `1.5px solid ${active ? '#e85d26' : '#333'}`,
              background: active ? '#e85d2618' : 'transparent',
              color: active ? '#e85d26' : '#888',
              transition: 'all 0.15s ease',
              cursor: 'pointer',
            }}
          >
            {tag}
          </button>
        )
      })}
    </div>
  )
}
