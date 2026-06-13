import React from 'react'

export default function Hero({ onReserve }) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'radial-gradient(circle at center, #1b121e 0%, #080608 100%)',
      padding: '0 20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative background grid and lighting effect */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'radial-gradient(rgba(201, 168, 76, 0.05) 1px, transparent 0)',
        backgroundSize: '40px 40px',
        opacity: 0.6
      }} />

      {/* Decorative vertical lines */}
      <div style={{
        position: 'absolute',
        left: '10%',
        top: 0,
        bottom: 0,
        width: '1px',
        background: 'linear-gradient(180deg, transparent, rgba(201, 168, 76, 0.1), transparent)',
      }} />
      <div style={{
        position: 'absolute',
        right: '10%',
        top: 0,
        bottom: 0,
        width: '1px',
        background: 'linear-gradient(180deg, transparent, rgba(201, 168, 76, 0.1), transparent)',
      }} />

      {/* Content wrapper */}
      <div style={{
        maxWidth: '800px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 2,
        animation: 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        <p style={{
          fontSize: '12px',
          letterSpacing: '6px',
          textTransform: 'uppercase',
          color: '#C9A84C',
          marginBottom: '24px',
          fontWeight: 500
        }}>An Unparalleled Venue Experience</p>

        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'calc(32px + 3vw)',
          fontWeight: 400,
          color: '#f0eae8',
          lineHeight: '1.1',
          marginBottom: '28px',
          letterSpacing: '1px'
        }}>
          Elevate Your Night at <br />
          <span style={{ color: '#C9A84C', fontStyle: 'italic' }}>MI9 Hall</span>
        </h1>

        <p style={{
          fontSize: '16px',
          color: '#8a7f85',
          maxWidth: '560px',
          margin: '0 auto 48px',
          lineHeight: '1.8',
          fontWeight: 300
        }}>
          Secure your VIP front row table, main floor access, or upper terrace seating. Experience Erbil's premier nightlife destination with seamless reservation.
        </p>

        <div style={{
          display: 'flex',
          gap: '16px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button 
            onClick={onReserve}
            style={{
              padding: '16px 36px',
              background: '#C9A84C',
              color: '#080608',
              border: 'none',
              borderRadius: '2px',
              fontSize: '12px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(201, 168, 76, 0.2)',
              transition: 'all 0.3s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#E8C97A'
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 6px 24px rgba(201, 168, 76, 0.3)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#C9A84C'
              e.currentTarget.style.transform = 'none'
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(201, 168, 76, 0.2)'
            }}
          >
            Book A Table
          </button>
          
          <button 
            onClick={onReserve}
            style={{
              padding: '16px 36px',
              background: 'transparent',
              color: '#f0eae8',
              border: '0.5px solid rgba(240, 234, 232, 0.3)',
              borderRadius: '2px',
              fontSize: '12px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#f0eae8'
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(240, 234, 232, 0.3)'
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.transform = 'none'
            }}
          >
            View Floor Plan
          </button>
        </div>
      </div>

      {/* Decorative Bottom Spotlight Effect */}
      <div style={{
        position: 'absolute',
        bottom: '-150px',
        width: '500px',
        height: '300px',
        background: 'radial-gradient(ellipse at center, rgba(139, 79, 190, 0.1) 0%, transparent 70%)',
        filter: 'blur(40px)',
        pointerEvents: 'none'
      }} />
    </div>
  )
}
