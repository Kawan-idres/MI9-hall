import React, { useState } from 'react'

const PAYMENT_METHODS = [
  { id: 'fib',    label: 'FIB',        icon: '🏦', desc: 'First Iraqi Bank',         color: '#00A651' },
  { id: 'super',  label: 'Super App',  icon: '💎', desc: 'Supercel / Key Card',      color: '#0066CC' },
  { id: 'visa',   label: 'Visa',       icon: '💳', desc: 'Credit or debit card',     color: '#1A1F71' },
  { id: 'master', label: 'Mastercard', icon: '🔴', desc: 'Credit or debit card',     color: '#EB001B' },
]

const ADDONS = [
  { id: 'bottle', label: 'Bottle service', price: 120, desc: 'Premium selection' },
  { id: 'hookah', label: 'Hookah setup', price: 50, desc: 'Flavours of choice' },
  { id: 'platter', label: 'Fruit platter', price: 40, desc: 'Seasonal selection' },
  { id: 'host', label: 'Private host', price: 150, desc: 'Dedicated table host' },
]

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: 'block', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: '#8a7f85', marginBottom: 8 }}>{label}</label>
      {children}
    </div>
  )
}

const inputStyle = {
  width: '100%', padding: '12px 14px',
  background: '#160f18', border: '0.5px solid rgba(201,168,76,0.2)',
  color: '#f0eae8', fontSize: 14, borderRadius: 4, outline: 'none',
  transition: 'border-color 0.2s'
}

export default function Payment({ reservation, onConfirm, onBack }) {
  const [step, setStep] = useState(1) // 1=summary+addons 2=payment 3=processing
  const [pm, setPm] = useState('fib')
  const [addons, setAddons] = useState([])
  const [form, setForm] = useState({ name: '', phone: '', email: '', card: '', expiry: '', cvv: '', fib: '', super: '' })
  const [errors, setErrors] = useState({})

  const { table, zone } = reservation || {}
  const basePrice = (table?.price || 200)
  const addonTotal = addons.reduce((s, id) => s + (ADDONS.find(a => a.id === id)?.price || 0), 0)
  const reservationFee = 50
  const total = basePrice + addonTotal + reservationFee

  function toggleAddon(id) {
    setAddons(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  function validate() {
    const e = {}
    if (!form.name) e.name = 'Required'
    if (!form.phone) e.phone = 'Required'
    if (!form.email || !form.email.includes('@')) e.email = 'Valid email required'
    if ((pm === 'visa' || pm === 'master') && !form.card) e.card = 'Required'
    if (pm === 'fib' && !form.fib) e.fib = 'Enter FIB phone number'
    if (pm === 'super' && !form.super) e.super = 'Enter Super App ID'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function pay() {
    if (!validate()) return
    setStep(3)
    setTimeout(() => onConfirm({ table, zone, addons, pm, total, form }), 2200)
  }

  const Card = ({ children, style }) => (
    <div style={{
      background: '#0f0c10', border: '0.5px solid rgba(201,168,76,0.12)',
      borderRadius: 8, padding: '24px', marginBottom: 16, ...style
    }}>{children}</div>
  )

  const SectionLabel = ({ children }) => (
    <p style={{ fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: '#C9A84C', marginBottom: 16 }}>{children}</p>
  )

  if (step === 3) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 20, background: '#080608' }}>
      <div style={{ fontSize: 40, animation: 'spin 1s linear infinite', display: 'inline-block', color: '#C9A84C' }}>◌</div>
      <p style={{ color: '#8a7f85', fontSize: 14, letterSpacing: 2 }}>Processing payment…</p>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', padding: '100px 40px 60px', background: '#080608' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* Step indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 48, justifyContent: 'center' }}>
          {[['1', 'Table'], ['2', 'Details'], ['3', 'Payment'], ['4', 'Confirm']].map(([n, l], i) => (
            <React.Fragment key={n}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 500,
                  background: i < step ? '#C9A84C' : i === step - 1 ? '#C9A84C' : 'transparent',
                  color: i <= step - 1 ? '#080608' : '#8a7f85',
                  border: `1px solid ${i <= step - 1 ? '#C9A84C' : 'rgba(138,127,133,0.3)'}`,
                  transition: 'all 0.3s'
                }}>{n}</div>
                <span style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: i === step - 1 ? '#C9A84C' : '#8a7f85' }}>{l}</span>
              </div>
              {i < 3 && <div style={{ width: 60, height: 0.5, background: 'rgba(201,168,76,0.2)', margin: '0 8px 20px' }}/>}
            </React.Fragment>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24 }}>
          {/* Left — forms */}
          <div>
            {step === 1 && (
              <>
                <Card>
                  <SectionLabel>Your table</SectionLabel>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <div>
                      <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22 }}>
                        {zone?.label || 'VIP'} Table {table?.id}
                      </h3>
                      <p style={{ color: '#8a7f85', fontSize: 13, marginTop: 4 }}>Up to {table?.capacity || 6} guests · {table?.zone === 'vip' ? 'Front of stage' : 'Terrace view'}</p>
                    </div>
                    <span style={{
                      padding: '4px 12px', borderRadius: 2, fontSize: 10, letterSpacing: 2,
                      background: `${zone?.color || '#C9A84C'}18`,
                      color: zone?.color || '#C9A84C',
                      border: `0.5px solid ${zone?.color || '#C9A84C'}44`
                    }}>{(zone?.label || 'VIP').toUpperCase()}</span>
                  </div>
                </Card>

                <Card>
                  <SectionLabel>Guest details</SectionLabel>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
                    <Field label="Full name">
                      <input value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                        placeholder="Your name" style={{...inputStyle, borderColor: errors.name ? '#ef4444' : 'rgba(201,168,76,0.2)'}}/>
                      {errors.name && <span style={{ color: '#ef4444', fontSize: 11 }}>{errors.name}</span>}
                    </Field>
                    <Field label="Phone">
                      <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                        placeholder="+964 …" style={{...inputStyle, borderColor: errors.phone ? '#ef4444' : 'rgba(201,168,76,0.2)'}}/>
                      {errors.phone && <span style={{ color: '#ef4444', fontSize: 11 }}>{errors.phone}</span>}
                    </Field>
                  </div>
                  <Field label="Email">
                    <input value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                      placeholder="email@example.com" style={{...inputStyle, borderColor: errors.email ? '#ef4444' : 'rgba(201,168,76,0.2)'}}/>
                    {errors.email && <span style={{ color: '#ef4444', fontSize: 11 }}>{errors.email}</span>}
                  </Field>
                  <Field label="Number of guests">
                    <select value={form.guests || '2'} onChange={e => setForm({...form, guests: e.target.value})}
                      style={{...inputStyle}}>
                      {Array.from({length: table?.capacity || 6}, (_,i) => i+1).map(n => (
                        <option key={n} value={n}>{n} guest{n > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </Field>
                </Card>

                <Card>
                  <SectionLabel>Add-ons</SectionLabel>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    {ADDONS.map(a => {
                      const on = addons.includes(a.id)
                      return (
                        <button key={a.id} onClick={() => toggleAddon(a.id)} style={{
                          padding: '14px', border: `0.5px solid ${on ? '#C9A84C' : 'rgba(201,168,76,0.15)'}`,
                          background: on ? 'rgba(201,168,76,0.08)' : 'transparent',
                          borderRadius: 4, cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                            <span style={{ fontSize: 13, color: on ? '#C9A84C' : '#f0eae8', fontWeight: 500 }}>{a.label}</span>
                            <span style={{ fontSize: 13, color: '#C9A84C' }}>+${a.price}</span>
                          </div>
                          <p style={{ fontSize: 11, color: '#8a7f85' }}>{a.desc}</p>
                        </button>
                      )
                    })}
                  </div>
                </Card>

                <button onClick={() => setStep(2)} style={{
                  width: '100%', padding: '14px', background: '#C9A84C', color: '#080608',
                  border: 'none', borderRadius: 2, fontSize: 11, letterSpacing: 2,
                  textTransform: 'uppercase', fontWeight: 500, cursor: 'pointer'
                }}>Continue to payment →</button>
              </>
            )}

            {step === 2 && (
              <>
                <Card>
                  <SectionLabel>Payment method</SectionLabel>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 20 }}>
                    {PAYMENT_METHODS.map(m => (
                      <button key={m.id} onClick={() => setPm(m.id)} style={{
                        padding: '14px', border: `0.5px solid ${pm === m.id ? m.color : 'rgba(201,168,76,0.15)'}`,
                        background: pm === m.id ? `${m.color}12` : 'transparent',
                        borderRadius: 4, cursor: 'pointer', transition: 'all 0.15s',
                        display: 'flex', alignItems: 'center', gap: 10
                      }}>
                        <span style={{ fontSize: 20 }}>{m.icon}</span>
                        <div style={{ textAlign: 'left' }}>
                          <div style={{ fontSize: 13, color: pm === m.id ? m.color : '#f0eae8', fontWeight: 500 }}>{m.label}</div>
                          <div style={{ fontSize: 10, color: '#8a7f85' }}>{m.desc}</div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Dynamic payment form */}
                  {pm === 'fib' && (
                    <>
                      <Field label="FIB registered phone">
                        <input value={form.fib} onChange={e => setForm({...form, fib: e.target.value})}
                          placeholder="+964 7XX XXX XXXX" style={{...inputStyle, borderColor: errors.fib ? '#ef4444' : 'rgba(201,168,76,0.2)'}}/>
                        {errors.fib && <span style={{ color: '#ef4444', fontSize: 11 }}>{errors.fib}</span>}
                      </Field>
                      <p style={{ fontSize: 12, color: '#8a7f85', padding: '10px 14px', background: 'rgba(0,166,81,0.08)', borderRadius: 4, border: '0.5px solid rgba(0,166,81,0.2)' }}>
                        You will receive a FIB payment confirmation SMS to approve this transaction.
                      </p>
                    </>
                  )}

                  {pm === 'super' && (
                    <>
                      <Field label="Super App ID / Key Card number">
                        <input value={form.super} onChange={e => setForm({...form, super: e.target.value})}
                          placeholder="SC-XXXXXXXXXX" style={{...inputStyle, borderColor: errors.super ? '#ef4444' : 'rgba(201,168,76,0.2)'}}/>
                        {errors.super && <span style={{ color: '#ef4444', fontSize: 11 }}>{errors.super}</span>}
                      </Field>
                      <p style={{ fontSize: 12, color: '#8a7f85', padding: '10px 14px', background: 'rgba(0,102,204,0.08)', borderRadius: 4, border: '0.5px solid rgba(0,102,204,0.2)' }}>
                        Open your Super App and approve the push notification to complete payment.
                      </p>
                    </>
                  )}

                  {(pm === 'visa' || pm === 'master') && (
                    <>
                      <Field label="Name on card">
                        <input value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                          placeholder="Cardholder name" style={inputStyle}/>
                      </Field>
                      <Field label="Card number">
                        <input value={form.card} onChange={e => {
                          let v = e.target.value.replace(/\D/g,'').slice(0,16)
                          v = v.replace(/(.{4})/g,'$1 ').trim()
                          setForm({...form, card: v})
                        }} placeholder="•••• •••• •••• ••••" style={{...inputStyle, borderColor: errors.card ? '#ef4444' : 'rgba(201,168,76,0.2)'}}/>
                      </Field>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        <Field label="Expiry">
                          <input value={form.expiry} onChange={e => {
                            let v = e.target.value.replace(/\D/g,'').slice(0,4)
                            if (v.length > 2) v = v.slice(0,2) + ' / ' + v.slice(2)
                            setForm({...form, expiry: v})
                          }} placeholder="MM / YY" style={inputStyle}/>
                        </Field>
                        <Field label="CVV">
                          <input value={form.cvv} onChange={e => setForm({...form, cvv: e.target.value.replace(/\D/g,'').slice(0,3)})}
                            placeholder="•••" style={inputStyle}/>
                        </Field>
                      </div>
                    </>
                  )}
                </Card>

                <div style={{ display: 'flex', gap: 12 }}>
                  <button onClick={() => setStep(1)} style={{
                    flex: 1, padding: '13px', background: 'transparent', color: '#8a7f85',
                    border: '0.5px solid rgba(138,127,133,0.3)', borderRadius: 2,
                    fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer'
                  }}>← Back</button>
                  <button onClick={pay} style={{
                    flex: 3, padding: '13px', background: '#C9A84C', color: '#080608',
                    border: 'none', borderRadius: 2, fontSize: 11, letterSpacing: 2,
                    textTransform: 'uppercase', fontWeight: 500, cursor: 'pointer'
                  }}>Pay ${reservationFee} Reservation Fee →</button>
                </div>
              </>
            )}
          </div>

          {/* Right — order summary */}
          <div>
            <Card style={{ position: 'sticky', top: 80 }}>
              <SectionLabel>Order summary</SectionLabel>

              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '0.5px solid rgba(201,168,76,0.08)', fontSize: 13 }}>
                  <span style={{ color: '#8a7f85' }}>Table reservation</span>
                  <span>${basePrice}</span>
                </div>
                {addons.map(id => {
                  const a = ADDONS.find(x => x.id === id)
                  return (
                    <div key={id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '0.5px solid rgba(201,168,76,0.08)', fontSize: 13 }}>
                      <span style={{ color: '#8a7f85' }}>{a.label}</span>
                      <span>+${a.price}</span>
                    </div>
                  )
                })}
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '0.5px solid rgba(201,168,76,0.08)', fontSize: 13 }}>
                  <span style={{ color: '#8a7f85' }}>Booking fee</span>
                  <span>${reservationFee}</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: 12 }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18 }}>Total</span>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, color: '#C9A84C' }}>${total}</span>
              </div>

              <div style={{ marginTop: 20, padding: '12px', background: 'rgba(201,168,76,0.06)', borderRadius: 4, fontSize: 12, color: '#8a7f85', lineHeight: 1.7 }}>
                <p>✓ Instant confirmation</p>
                <p>✓ QR ticket emailed</p>
                <p>✓ Free cancellation 48h before</p>
              </div>

              <div style={{ marginTop: 16, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {PAYMENT_METHODS.map(m => (
                  <span key={m.id} style={{ fontSize: 10, padding: '3px 8px', borderRadius: 2, background: 'rgba(255,255,255,0.04)', color: '#8a7f85', border: '0.5px solid rgba(255,255,255,0.08)' }}>
                    {m.label}
                  </span>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
