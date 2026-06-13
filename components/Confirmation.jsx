import React from 'react'

function qrCode() {
  return 'MI9-' + Math.random().toString(36).slice(2,6).toUpperCase() + '-' + Date.now().toString(36).slice(-4).toUpperCase()
}

const CODE = qrCode()

export default function Confirmation({ reservation, onHome }) {
  const { table, zone, pm, total, form, addons = [] } = reservation || {}

  return (
    <div style={{ minHeight: '100vh', padding: '100px 40px 80px', background: '#080608' }}>
      <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>

        {/* Success mark */}
        <div style={{
          width: 64, height: 64, borderRadius: '50%', margin: '0 auto 28px',
          background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 28, color: '#22c55e'
        }}>✓</div>

        <p style={{ fontSize: 11, letterSpacing: 4, textTransform: 'uppercase', color: '#C9A84C', marginBottom: 12 }}>Booking Confirmed</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 42, marginBottom: 12 }}>You're all set</h2>
        <p style={{ color: '#8a7f85', fontSize: 14, marginBottom: 48 }}>
          Your reservation is confirmed. Show the QR code at the entrance.
        </p>

        {/* QR ticket */}
        <div style={{
          background: '#0f0c10', border: '0.5px solid rgba(201,168,76,0.2)',
          borderRadius: 12, overflow: 'hidden', marginBottom: 24, textAlign: 'left'
        }}>
          {/* Ticket header */}
          <div style={{
            padding: '24px 28px',
            background: 'linear-gradient(135deg, rgba(139,79,190,0.15) 0%, rgba(192,53,122,0.1) 100%)',
            borderBottom: '0.5px dashed rgba(201,168,76,0.2)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
          }}>
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, color: '#C9A84C', lineHeight: 1 }}>MI9</div>
              <div style={{ fontSize: 10, letterSpacing: 3, color: '#8a7f85', marginTop: 2 }}>HALL · ERBIL</div>
            </div>
            {/* Fake QR grid */}
            <div style={{ width: 72, height: 72, display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 1 }}>
              {Array.from({length: 49}).map((_, i) => (
                <div key={i} style={{
                  background: Math.random() > 0.45 ? '#C9A84C' : 'transparent',
                  borderRadius: 0.5
                }}/>
              ))}
            </div>
          </div>

          {/* Ticket details */}
          <div style={{ padding: '20px 28px' }}>
            {[
              ['Confirmation', CODE],
              ['Table', `${zone?.label || 'VIP'} – Table ${table?.id}`],
              ['Venue', 'MI9 Hall, Erbil'],
              ['Time', 'Doors open 9:00 PM'],
              ['Guests', `${form?.guests || '2'} guests`],
              ['Payment', `$${total} via ${pm?.toUpperCase() || 'FIB'}`],
            ].map(([k, v]) => (
              <div key={k} style={{
                display: 'flex', justifyContent: 'space-between',
                padding: '10px 0', borderBottom: '0.5px solid rgba(201,168,76,0.06)',
                fontSize: 13
              }}>
                <span style={{ color: '#8a7f85' }}>{k}</span>
                <span style={{ color: '#f0eae8', fontWeight: 500, fontFamily: k === 'Confirmation' ? 'monospace' : 'inherit', letterSpacing: k === 'Confirmation' ? '0.1em' : 'normal' }}>{v}</span>
              </div>
            ))}
          </div>

          {/* Bottom strip */}
          <div style={{
            padding: '16px 28px',
            borderTop: '0.5px dashed rgba(201,168,76,0.15)',
            background: 'rgba(201,168,76,0.04)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
          }}>
            <p style={{ fontSize: 11, color: '#8a7f85' }}>Confirmation sent to {form?.email || 'your email'}</p>
            <span style={{ fontSize: 10, letterSpacing: 2, color: '#22c55e', border: '0.5px solid rgba(34,197,94,0.3)', padding: '3px 8px', borderRadius: 2 }}>CONFIRMED</span>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={onHome} style={{
            flex: 1, padding: '13px', background: 'transparent', color: '#8a7f85',
            border: '0.5px solid rgba(138,127,133,0.3)', borderRadius: 2,
            fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer'
          }}>Back to home</button>
          <button onClick={() => window.print()} style={{
            flex: 2, padding: '13px', background: '#C9A84C', color: '#080608',
            border: 'none', borderRadius: 2, fontSize: 11, letterSpacing: 2,
            textTransform: 'uppercase', fontWeight: 500, cursor: 'pointer'
          }}>Download ticket</button>
        </div>

        <p style={{ marginTop: 24, fontSize: 12, color: '#8a7f85' }}>
          Need help? Contact us at <span style={{ color: '#C9A84C' }}>reservations@mi9hall.com</span> or call +964 750 000 0000
        </p>
      </div>
    </div>
  )
}
