import React, { useState } from 'react'

// MI9 Hall layout: stage top-center, front tables, upper terrace (back elevated area), 2 entrances
const ZONE_DEFS = {
  stage:   { label: 'Stage', color: '#C9A84C', bg: 'rgba(201,168,76,0.08)', border: '#C9A84C' },
  vip:     { label: 'VIP Front', color: '#8B4FBE', bg: 'rgba(139,79,190,0.12)', border: '#8B4FBE' },
  main:    { label: 'Main Floor', color: '#4a9eff', bg: 'rgba(74,158,255,0.08)', border: '#4a9eff' },
  terrace: { label: 'Upper Terrace', color: '#C0357A', bg: 'rgba(192,53,122,0.12)', border: '#C0357A' },
}

// Status Colors
const STATUS_COLORS = {
  available: '#22c55e',
  reserved: '#ef4444',
  selected: '#f59e0b',
}

// Tables: { id, zone, row, num, x%, y%, capacity, price, reserved, angle }
function buildTables() {
  const tables = []
  const stageX = 50, stageY = 10
  
  // VIP front row — circular layout around the stage (center: 50%, 10%)
  const r1 = 28
  const angles = [35, 57, 79, 101, 123, 145]
  angles.forEach((deg, i) => {
    const rad = (deg * Math.PI) / 180
    const x = stageX + r1 * Math.cos(rad)
    const y = stageY + r1 * Math.sin(rad)
    tables.push({ id: `V${i+1}`, zone: 'vip', x, y, capacity: 6, price: 350, reserved: [1,3].includes(i), angle: deg - 90 })
  })

  // Row 2 (behind Row 1)
  const r2 = 38
  angles.forEach((deg, i) => {
    const rad = (deg * Math.PI) / 180
    const x = stageX + r2 * Math.cos(rad)
    const y = stageY + r2 * Math.sin(rad)
    tables.push({ id: `V${i+7}`, zone: 'vip', x, y, price: 350, reserved: [0,4].includes(i), angle: deg - 90 })
  })

  // Set default capacity
  tables.forEach(t => {
    if (t.zone === 'vip') t.capacity = 6
  })

  // Main floor — 3 rows of 6 tables
  const mainXs = [9, 22, 36, 50, 63, 76, 88]
  ;[58, 66, 74].forEach((y, ri) => {
    mainXs.forEach((x, ci) => {
      tables.push({ id: `M${ri * 7 + ci + 1}`, zone: 'main', x, y, capacity: 4, price: 180, reserved: Math.random() < 0.3 })
    })
  })
  // Upper terrace — 2 rows scattered
  const terXs = [12, 27, 42, 57, 72, 87]
  ;[84, 91].forEach((y, ri) => {
    terXs.forEach((x, ci) => {
      tables.push({ id: `T${ri * 6 + ci + 1}`, zone: 'terrace', x, y, capacity: 8, price: 250, reserved: Math.random() < 0.25 })
    })
  })
  return tables
}

const ALL_TABLES = buildTables()

export default function VenueMap({ onBook }) {
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('all')

  const table = ALL_TABLES.find(t => t.id === selected)
  const visible = ALL_TABLES.filter(t => filter === 'all' || t.zone === filter)

  function tableColor(t) {
    if (t.id === selected) return STATUS_COLORS.selected
    if (t.reserved) return STATUS_COLORS.reserved
    return STATUS_COLORS.available
  }

  return (
    <div style={{ minHeight: '100vh', padding: '100px 40px 60px', background: '#080608' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <p style={{ fontSize: 11, letterSpacing: 4, textTransform: 'uppercase', color: '#C9A84C', marginBottom: 12 }}>Interactive Floor Plan</p>
        <h2 style={{ fontSize: 48, marginBottom: 16 }}>Choose Your Table</h2>
        <p style={{ color: '#8a7f85', fontSize: 14 }}>Select a table to view details. Browse by zone or filter options.</p>
      </div>

      {/* Zone filter */}
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 32 }}>
        {[['all', 'All Zones'], ...Object.entries(ZONE_DEFS).filter(([k]) => k !== 'stage').map(([k, v]) => [k, v.label])].map(([key, label]) => (
          <button key={key} onClick={() => setFilter(key)} style={{
            padding: '8px 20px', borderRadius: 2, fontSize: 11, letterSpacing: 2,
            textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s',
            background: filter === key ? ZONE_DEFS[key]?.color || '#C9A84C' : 'transparent',
            color: filter === key ? '#080608' : '#8a7f85',
            border: `0.5px solid ${filter === key ? ZONE_DEFS[key]?.color || '#C9A84C' : 'rgba(138,127,133,0.3)'}`
          }}>{label}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24, maxWidth: 1200, margin: '0 auto' }}>
        {/* MAP */}
        <div style={{
          position: 'relative', background: '#0f0c10',
          border: '0.5px solid rgba(201,168,76,0.15)', borderRadius: 8,
          overflow: 'hidden', aspectRatio: '4/3'
        }}>
          {/* Ceiling lights decorative */}
          <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '20%', pointerEvents: 'none', zIndex: 1 }}
            viewBox="0 0 900 120" preserveAspectRatio="none">
            <g stroke="#C9A84C" strokeWidth="0.5" opacity="0.35" fill="none">
              <line x1="0" y1="8" x2="900" y2="8"/>
              <line x1="0" y1="20" x2="900" y2="20" strokeDasharray="6 10" opacity="0.5"/>
              {[100,200,300,400,500,600,700,800].map(x => (
                <line key={x} x1={x} y1="0" x2={x} y2="120" strokeDasharray="4 16" opacity="0.3"/>
              ))}
              <polygon points="720,10 760,2 800,10 800,50 760,58 720,50" strokeWidth="1" opacity="0.6"/>
              <polygon points="740,12 770,4 800,12 800,44 770,52 740,44" strokeWidth="0.5" opacity="0.3"/>
            </g>
          </svg>

          {/* Entrance labels - Left and Right Center */}
          <div style={{
            position: 'absolute', top: '50%', left: '1%', transform: 'translate(-50%, -50%) rotate(-90deg)',
            background: 'rgba(52,211,153,0.12)', borderBottom: '2.5px solid rgba(52,211,153,0.4)',
            padding: '4px 16px', borderRadius: '4px 4px 0 0', fontSize: 10, letterSpacing: 3,
            textTransform: 'uppercase', color: '#34d399', zIndex: 3, backdropFilter: 'blur(2px)'
          }}>Entrance A</div>
          <div style={{
            position: 'absolute', top: '50%', right: '1%', transform: 'translate(50%, -50%) rotate(90deg)',
            background: 'rgba(52,211,153,0.12)', borderBottom: '2.5px solid rgba(52,211,153,0.4)',
            padding: '4px 16px', borderRadius: '4px 4px 0 0', fontSize: 10, letterSpacing: 3,
            textTransform: 'uppercase', color: '#34d399', zIndex: 3, backdropFilter: 'blur(2px)'
          }}>Entrance B</div>

          {/* STAGE */}
          <div style={{
            position: 'absolute', top: '5%', left: '10%', width: '80%', height: '16%',
            background: 'linear-gradient(180deg, rgba(201,168,76,0.15) 0%, rgba(139,79,190,0.2) 100%)',
            border: '0.5px solid rgba(201,168,76,0.4)', borderRadius: 4, zIndex: 2,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 4
          }}>
            <span style={{ fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: '#C9A84C', opacity: 0.9 }}>Stage / DJ Booth</span>
            {/* LED curtain hints */}
            <div style={{ display: 'flex', gap: 3 }}>
              {Array.from({length: 20}).map((_, i) => (
                <div key={i} style={{
                  width: 2, height: 10, background: '#C9A84C',
                  opacity: 0.3 + Math.random() * 0.5,
                  animation: `shimmer ${1 + Math.random()}s ease-in-out infinite`
                }}/>
              ))}
            </div>
          </div>

          {/* VIP zone label */}
          <div style={{
            position: 'absolute', top: '23%', left: '3%',
            fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: '#8B4FBE', zIndex: 1, opacity: 0.7
          }}>VIP Front</div>

          {/* Upper terrace elevated indicator */}
          <div style={{
            position: 'absolute', top: '78%', left: '3%', right: '3%', height: '18%',
            background: 'rgba(192,53,122,0.05)',
            border: '0.5px dashed rgba(192,53,122,0.3)', borderRadius: 4, zIndex: 1
          }}>
            <span style={{
              position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)',
              fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: '#C0357A', opacity: 0.7
            }}>Upper Terrace ↑</span>
          </div>

          {/* Tables */}
          {ALL_TABLES.map(t => {
            const isFiltered = filter !== 'all' && t.zone !== filter
            const isSelected = t.id === selected
            const color = tableColor(t)
            return (
              <button
                key={t.id}
                onClick={() => !t.reserved && setSelected(t.id === selected ? null : t.id)}
                title={t.reserved ? 'Reserved' : `${t.id} – ${ZONE_DEFS[t.zone].label}`}
                style={{
                  position: 'absolute',
                  left: `${t.x}%`, top: `${t.y}%`,
                  transform: `translate(-50%, -50%) ${t.angle ? `rotate(${t.angle}deg)` : ''}`,
                  width: t.zone === 'vip' ? 36 : t.zone === 'terrace' ? 32 : 28,
                  height: t.zone === 'vip' ? 14 : 12,
                  background: t.reserved ? 'rgba(239,68,68,0.15)' : isSelected ? 'rgba(245,158,11,0.2)' : `${color}18`,
                  border: `1px solid ${color}`,
                  borderRadius: 2,
                  cursor: t.reserved ? 'not-allowed' : 'pointer',
                  opacity: isFiltered ? 0.15 : 1,
                  zIndex: isSelected ? 5 : 2,
                  transition: 'all 0.15s',
                  outline: isSelected ? `2px solid ${color}` : 'none',
                  outlineOffset: 2,
                  boxShadow: isSelected ? `0 0 12px ${color}55` : 'none'
                }}
              />
            )
          })}
        </div>

        {/* SIDEBAR */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Legend */}
          <div style={{
            background: '#0f0c10', border: '0.5px solid rgba(201,168,76,0.1)',
            borderRadius: 8, padding: '16px 20px'
          }}>
            <p style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#8a7f85', marginBottom: 14 }}>Legend</p>
            {[
              { color: '#22c55e', label: 'Available' },
              { color: '#ef4444', label: 'Reserved' },
              { color: '#f59e0b', label: 'Selected' },
            ].map(l => (
              <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <div style={{ width: 28, height: 10, background: `${l.color}20`, border: `1px solid ${l.color}`, borderRadius: 1 }}/>
                <span style={{ fontSize: 12, color: '#8a7f85' }}>{l.label}</span>
              </div>
            ))}
            <div style={{ borderTop: '0.5px solid rgba(201,168,76,0.1)', marginTop: 12, paddingTop: 12 }}>
              {Object.entries(ZONE_DEFS).filter(([k]) => k !== 'stage').map(([k, v]) => (
                <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: v.color }}/>
                  <span style={{ fontSize: 12, color: '#8a7f85' }}>{v.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Table detail card */}
          {table ? (
            <div style={{
              background: '#0f0c10', border: `0.5px solid ${ZONE_DEFS[table.zone].color}44`,
              borderRadius: 8, padding: '20px', animation: 'fadeUp 0.2s ease'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, marginBottom: 4 }}>
                    {table.zone === 'vip' ? 'VIP ' : table.zone === 'terrace' ? 'Terrace ' : ''}Table {table.id}
                  </h3>
                  <span style={{
                    fontSize: 10, padding: '3px 8px', borderRadius: 2, letterSpacing: 2,
                    background: `${ZONE_DEFS[table.zone].color}18`,
                    color: ZONE_DEFS[table.zone].color,
                    border: `0.5px solid ${ZONE_DEFS[table.zone].color}44`
                  }}>{ZONE_DEFS[table.zone].label.toUpperCase()}</span>
                </div>
                <div style={{
                  width: 10, height: 10, borderRadius: '50%',
                  background: '#22c55e', marginTop: 4
                }}/>
              </div>

              {[
                ['Capacity', `${table.capacity} guests`],
                ['Min. Spend', `$${table.price}`],
                ['Zone', ZONE_DEFS[table.zone].label],
                ['Distance', table.zone === 'vip' ? 'Front of stage' : table.zone === 'terrace' ? 'Upper terrace view' : 'Mid-floor'],
              ].map(([k, v]) => (
                <div key={k} style={{
                  display: 'flex', justifyContent: 'space-between',
                  padding: '8px 0', borderBottom: '0.5px solid rgba(201,168,76,0.08)',
                  fontSize: 13
                }}>
                  <span style={{ color: '#8a7f85' }}>{k}</span>
                  <span style={{ color: '#f0eae8', fontWeight: 500 }}>{v}</span>
                </div>
              ))}

              <button onClick={() => onBook({ table, zone: ZONE_DEFS[table.zone] })} style={{
                width: '100%', marginTop: 20, padding: '13px',
                background: '#C9A84C', color: '#080608',
                border: 'none', borderRadius: 2,
                fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 500,
                cursor: 'pointer', transition: 'background 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#E8C97A'}
              onMouseLeave={e => e.currentTarget.style.background = '#C9A84C'}
              >Reserve This Table →</button>
            </div>
          ) : (
            <div style={{
              background: '#0f0c10', border: '0.5px solid rgba(201,168,76,0.1)',
              borderRadius: 8, padding: '32px 20px', textAlign: 'center'
            }}>
              <div style={{ fontSize: 32, marginBottom: 12, opacity: 0.3 }}>⬛</div>
              <p style={{ color: '#8a7f85', fontSize: 13 }}>Select an available table on the map to see details and pricing.</p>
            </div>
          )}

          {/* Availability summary */}
          <div style={{
            background: '#0f0c10', border: '0.5px solid rgba(201,168,76,0.1)',
            borderRadius: 8, padding: '16px 20px'
          }}>
            <p style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#8a7f85', marginBottom: 12 }}>Availability</p>
            {Object.entries(ZONE_DEFS).filter(([k]) => k !== 'stage').map(([k, v]) => {
              const total = ALL_TABLES.filter(t => t.zone === k).length
              const avail = ALL_TABLES.filter(t => t.zone === k && !t.reserved).length
              return (
                <div key={k} style={{ marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 12, color: '#8a7f85' }}>{v.label}</span>
                    <span style={{ fontSize: 11, color: v.color }}>{avail}/{total} free</span>
                  </div>
                  <div style={{ height: 2, background: 'rgba(255,255,255,0.05)', borderRadius: 1, overflow: 'hidden' }}>
                    <div style={{ width: `${(avail/total)*100}%`, height: '100%', background: v.color, borderRadius: 1 }}/>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
