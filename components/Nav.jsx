import React from 'react'

export default function Nav({ onHome }) {
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '80px',
      background: 'rgba(8, 6, 8, 0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: '0.5px solid rgba(201, 168, 76, 0.15)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 40px',
      zIndex: 1000
    }}>
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
            onClick={item === 'Home' ? onHome : undefined}
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
        onClick={onHome}
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
