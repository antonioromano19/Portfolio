function RankList({ items, colore }) {
  if (!items || items.length === 0) {
    return <div style={{ fontSize: '13px', color: '#9A8878', padding: '8px 0' }}>Nessun dato disponibile</div>
  }
  return (
    <div>
      {items.map((p, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: '1px solid rgba(180,160,130,0.2)', fontSize: '13px' }}>
          <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: i === 0 ? '#C8A951' : i === 1 ? '#9A9A9A' : i === 2 ? '#A0674A' : colore, color: '#fff', fontSize: '10px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {i + 1}
          </div>
          <span style={{ flex: 1, fontWeight: 500 }}>{p.nome}</span>
          <div style={{ flex: 2, height: '6px', background: '#EDE8E0', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${p.pct}%`, height: '100%', background: colore, borderRadius: '3px' }} />
          </div>
          <span style={{ fontSize: '12px', color: '#9A8878', minWidth: '35px', textAlign: 'right' }}>{p.count}</span>
        </div>
      ))}
    </div>
  )
}

const giorni = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom']
const valori = [580, 720, 490, 850, 847, 1100, 960]
const maxValore = Math.max(...valori)

const fasce = [
  { ora: '12–14', pct: 40 },
  { ora: '14–17', pct: 15 },
  { ora: '17–19', pct: 25 },
  { ora: '19–21', pct: 90 },
  { ora: '21–23', pct: 100 },
]

function Statistiche({ incassatoSettimana, incassatoMese, pizzeVendute }) {

  const metriche = [
    { label: 'Incasso settimana', valore: `€ ${(incassatoSettimana || 0).toFixed(0)}`, sub: '↑ +8%' },
    { label: 'Incasso mese', valore: `€ ${(incassatoMese || 0).toFixed(0)}`, sub: '↑ +15%' },
    { label: 'Pizze vendute (mese)', valore: Object.values(pizzeVendute || {}).reduce((a, b) => a + b, 0), sub: '+34 vs mese scorso' },
    { label: 'Pizza più venduta', valore: Object.entries(pizzeVendute || {}).sort((a, b) => b[1] - a[1])[0]?.[0] || '—', sub: '🏆', accent: true },
  ]

  const calcolaTop = (dati) => {
    const entries = Object.entries(dati || {})
    if (entries.length === 0) return []
    const sorted = entries.sort((a, b) => b[1] - a[1]).slice(0, 5)
    const max = sorted[0][1]
    return sorted.map(([nome, count]) => ({ nome, count, pct: Math.round((count / max) * 100) }))
  }

  const top = calcolaTop(pizzeVendute)

  return (
    <div style={{ padding: '20px 24px' }}>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px' }}>
        {metriche.map((m, i) => (
          <div key={i} style={{
            background: m.accent ? '#2E6B6B' : '#FDFAF7',
            border: `1px solid ${m.accent ? '#245858' : 'rgba(180,160,130,0.3)'}`,
            borderRadius: '10px', padding: '14px 16px',
            display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '100px'
          }}>
            <div style={{ fontSize: '11px', color: m.accent ? 'rgba(255,255,255,0.7)' : '#9A8878', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '4px' }}>
              {m.label}
            </div>
            <div style={{ fontSize: m.accent ? '16px' : '26px', fontFamily: 'Playfair Display, serif', color: m.accent ? '#fff' : '#2C2C2C' }}>
              {m.valore}
            </div>
            <div style={{ fontSize: '11px', color: m.accent ? 'rgba(255,255,255,0.8)' : '#2E7D32', marginTop: '2px' }}>
              {m.sub}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
        <div style={{ background: '#FDFAF7', border: '1px solid rgba(180,160,130,0.3)', borderRadius: '10px', padding: '16px' }}>
          <div style={{ fontWeight: 500, marginBottom: '16px' }}>📅 Incasso ultimi 7 giorni</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '120px', padding: '0 4px' }}>
            {giorni.map((g, i) => (
              <div key={g} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', height: '100%', justifyContent: 'flex-end' }}>
                <span style={{ fontSize: '10px', fontWeight: 500, color: '#2C2C2C' }}>€{Math.round(valori[i] / 100) * 100}</span>
                <div style={{ width: '100%', background: '#2E6B6B', borderRadius: '4px 4px 0 0', height: `${Math.round((valori[i] / maxValore) * 100)}px` }} />
                <span style={{ fontSize: '10px', color: '#9A8878' }}>{g}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#FDFAF7', border: '1px solid rgba(180,160,130,0.3)', borderRadius: '10px', padding: '16px' }}>
          <div style={{ fontWeight: 500, marginBottom: '16px' }}>🕐 Fasce orarie più attive</div>
          {fasce.map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 0', borderBottom: '1px solid rgba(180,160,130,0.2)', fontSize: '13px' }}>
              <span style={{ minWidth: '55px', color: '#9A8878' }}>{f.ora}</span>
              <div style={{ flex: 1, height: '8px', background: '#EDE8E0', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${f.pct}%`, height: '100%', background: '#2E6B6B', borderRadius: '4px' }} />
              </div>
              <span style={{ minWidth: '35px', textAlign: 'right', fontSize: '11px', color: '#9A8878' }}>{f.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
        <div style={{ background: '#FDFAF7', border: '1px solid rgba(180,160,130,0.3)', borderRadius: '10px', padding: '16px' }}>
          <div style={{ fontWeight: 500, marginBottom: '12px' }}>🏆 Top pizze oggi</div>
          <RankList items={top} colore="#2E6B6B" />
        </div>
        <div style={{ background: '#FDFAF7', border: '1px solid rgba(180,160,130,0.3)', borderRadius: '10px', padding: '16px' }}>
          <div style={{ fontWeight: 500, marginBottom: '12px' }}>📆 Top pizze settimana</div>
          <RankList items={top} colore="#5B8FA8" />
        </div>
        <div style={{ background: '#FDFAF7', border: '1px solid rgba(180,160,130,0.3)', borderRadius: '10px', padding: '16px' }}>
          <div style={{ fontWeight: 500, marginBottom: '12px' }}>📊 Top pizze mese</div>
          <RankList items={top} colore="#8B6BAE" />
        </div>
      </div>
    </div>
  )
}

export default Statistiche