import React, { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setSubmitted(true)
  }

  const inputStyle = {
    width: '100%',
    padding: '14px',
    background: '#160f18',
    border: '0.5px solid rgba(201,168,76,0.2)',
    color: '#f0eae8',
    fontSize: '14px',
    borderRadius: '4px',
    outline: 'none',
    transition: 'border-color 0.2s',
    marginBottom: '20px',
  }

  return (
    <div style={{ minHeight: '100vh', padding: '120px 40px 80px', background: '#080608' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <p style={{ fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '12px', fontWeight: 600 }}>Get in Touch</p>
          <h2 style={{ fontSize: '48px', marginBottom: '16px', fontFamily: "'Cormorant Garamond', serif" }}>Contact Us</h2>
          <p style={{ color: '#8a7f85', fontSize: '15px', maxWidth: '500px', margin: '0 auto', lineHeight: '1.6' }}>
            Have questions about our events, VIP reservations, or booking the hall? Send us a message and our team will get back to you shortly.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '48px' }}>
          {/* Contact Form */}
          <div style={{ background: '#0f0c10', border: '0.5px solid rgba(201,168,76,0.12)', borderRadius: '8px', padding: '32px' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <span style={{ fontSize: '48px', display: 'block', marginBottom: '20px' }}>✉️</span>
                <h3 style={{ fontSize: '24px', marginBottom: '12px', color: '#C9A84C', fontFamily: "'Cormorant Garamond', serif" }}>Message Sent Successfully</h3>
                <p style={{ color: '#8a7f85', fontSize: '14px', lineHeight: '1.6' }}>Thank you for reaching out, {form.name}. We will review your message and reply via {form.email} as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <label style={{ display: 'block', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#8a7f85', marginBottom: '8px' }}>Your Name</label>
                <input 
                  type="text" 
                  value={form.name} 
                  onChange={e => setForm({ ...form, name: e.target.value })} 
                  placeholder="Full name" 
                  required 
                  style={inputStyle} 
                />

                <label style={{ display: 'block', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#8a7f85', marginBottom: '8px' }}>Email Address</label>
                <input 
                  type="email" 
                  value={form.email} 
                  onChange={e => setForm({ ...form, email: e.target.value })} 
                  placeholder="name@example.com" 
                  required 
                  style={inputStyle} 
                />

                <label style={{ display: 'block', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#8a7f85', marginBottom: '8px' }}>Message</label>
                <textarea 
                  rows="5"
                  value={form.message} 
                  onChange={e => setForm({ ...form, message: e.target.value })} 
                  placeholder="How can we help you?" 
                  required 
                  style={{ ...inputStyle, height: '120px', resize: 'none' }} 
                />

                <button 
                  type="submit" 
                  style={{
                    width: '100%', padding: '14px', background: '#C9A84C', color: '#080608',
                    border: 'none', borderRadius: '4px', fontSize: '11px', letterSpacing: '2px',
                    textTransform: 'uppercase', fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#E8C97A'}
                  onMouseLeave={e => e.currentTarget.style.background = '#C9A84C'}
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Details / Address sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <div>
              <h4 style={{ color: '#C9A84C', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px', fontWeight: 600 }}>Location</h4>
              <p style={{ color: '#f0eae8', fontSize: '14px', lineHeight: '1.6' }}>
                MI9 Hall<br />
             
facing Sami Abdulrahman Park Behind Mariana Hotel              </p>
            </div>

            <div>
              <h4 style={{ color: '#C9A84C', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px', fontWeight: 600 }}>Phone Reservations</h4>
              <p style={{ color: '#f0eae8', fontSize: '14px' }}>+964 750 000 0000</p>
              <p style={{ color: '#8a7f85', fontSize: '12px', marginTop: '4px' }}>Daily 12:00 PM – 2:00 AM</p>
            </div>

            <div>
              <h4 style={{ color: '#C9A84C', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px', fontWeight: 600 }}>Email Inquiries</h4>
              <p style={{ color: '#f0eae8', fontSize: '14px' }}>reservations@mi9hall.com</p>
            </div>

            {/* Visual placeholder for map linking to Google Maps */}
            <a 
              href="https://maps.app.goo.gl/rsigD6mZ7tkUuJhF7" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                textDecoration: 'none',
                display: 'block',
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div style={{
                height: '150px',
                borderRadius: '8px',
                border: '0.5px solid rgba(201,168,76,0.2)',
                background: 'radial-gradient(circle at center, #1b121e 0%, #0c080e 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '8px',
                fontSize: '11px',
                color: '#8a7f85',
                letterSpacing: '1px'
              }}>
                <span style={{ fontSize: '24px' }}>📍</span>
                <span style={{ color: '#C9A84C', fontWeight: 600 }}>View on Google Maps ↗</span>
                <span>Erbil, Kurdistan Region</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
