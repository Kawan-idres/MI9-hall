import React from 'react'

export default function Nav({ onHome, onContact, onReserve }) {
  return (
    <nav className="nav-bar">
      {/* Brand logo */}
      <div 
        onClick={onHome}
        style={{
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer',
          userSelect: 'none'
        }}
      >
        <span style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '28px',
          fontWeight: 600,
          color: '#C9A84C',
          letterSpacing: '2px',
          lineHeight: '1'
        }}>MI9</span>
        <span style={{
          fontSize: '9px',
          letterSpacing: '3px',
          color: '#8a7f85',
          marginTop: '2px',
          textTransform: 'uppercase'
        }}>Hall · Erbil</span>
      </div>

      {/* Nav Menu */}
      <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
        {['Home', 'Contact'].map((item) => (
          <span 
            key={item}
            onClick={item === 'Home' ? onHome : onContact}
            style={{
              fontSize: '11px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: '#8a7f85',
              cursor: 'pointer',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#C9A84C'} 
            onMouseLeave={e => e.currentTarget.style.color = '#8a7f85'}
          >
            {item}
          </span>
        ))}
      </div>

      {/* Action Button */}
      <button 
        onClick={onReserve}
        style={{
          background: 'transparent',
          border: '0.5px solid #C9A84C',
          padding: '8px 20px',
          borderRadius: '2px',
          fontSize: '10px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: '#C9A84C',
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = '#C9A84C'
          e.currentTarget.style.color = '#080608'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'transparent'
          e.currentTarget.style.color = '#C9A84C'
        }}
      >
        Reserve
      </button>
    </nav>
  )
}
