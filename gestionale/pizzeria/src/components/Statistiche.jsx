const metriche = [
  { label: 'Incasso settimana', valore: '€ 4.230', sub: '↑ +8%' },
  { label: 'Incasso mese', valore: '€ 18.540', sub: '↑ +15%' },
  { label: 'Pizze vendute (mese)', valore: '712', sub: '+34 vs mese scorso' },
  { label: 'Pizza più venduta', valore: 'Margherita', sub: '128 unità', accent: true },
]

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

function Statistiche() {
  return (
    <div style={{ padding: '20px 24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px' }}>
        {metriche.map((m, i) => (
          <div key={i} style={{
            background: m.accent ? '#C0392B' : '#FFFDF9',
            border: `1px solid ${m.accent ? '#922B21' : 'rgba(125,90,60,0.2)'}`,
            borderRadius: '10px', padding: '14px 16px'
          }}>
            <div style={{ fontSize: '11px', color: m.accent ? 'rgba(255,255,255,0.7)' : '#7B5E52', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '4px' }}>
              {m.label}
            </div>
            <div style={{ fontSize: m.accent ? '18px' : '26px', fontFamily: 'Playfair Display, serif', color: m.accent ? '#fff' : '#2C1810' }}>
              {m.valore}
            </div>
            <div style={{ fontSize: '11px', color: m.accent ? 'rgba(255,255,255,0.8)' : '#2E7D32', marginTop: '2px' }}>
              {m.sub}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div style={{ background: '#FFFDF9', border: '1px solid rgba(125,90,60,0.2)', borderRadius: '10px', padding: '16px' }}>
          <div style={{ fontWeight: 500, marginBottom: '16px' }}>📅 Incasso ultimi 7 giorni</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '120px', padding: '0 4px' }}>
            {giorni.map((g, i) => (
              <div key={g} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', height: '100%', justifyContent: 'flex-end' }}>
                <span style={{ fontSize: '10px', fontWeight: 500, color: '#2C1810' }}>
                  €{Math.round(valori[i] / 100) * 100}
                </span>
                <div style={{ width: '100%', background: '#C0392B', borderRadius: '4px 4px 0 0', height: `${Math.round((valori[i] / maxValore) * 100)}px` }} />
                <span style={{ fontSize: '10px', color: '#7B5E52' }}>{g}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#FFFDF9', border: '1px solid rgba(125,90,60,0.2)', borderRadius: '10px', padding: '16px' }}>
          <div style={{ fontWeight: 500, marginBottom: '16px' }}>🕐 Fasce orarie più attive</div>
          {fasce.map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 0', borderBottom: '1px solid rgba(125,90,60,0.2)', fontSize: '13px' }}>
              <span style={{ minWidth: '55px', color: '#7B5E52' }}>{f.ora}</span>
              <div style={{ flex: 1, height: '8px', background: '#F5E6CC', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${f.pct}%`, height: '100%', background: '#C0392B', borderRadius: '4px' }} />
              </div>
              <span style={{ minWidth: '35px', textAlign: 'right', fontSize: '11px', color: '#7B5E52' }}>{f.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Statistiche