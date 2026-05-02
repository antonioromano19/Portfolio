function CircleChart({ pct, color, size = 80, strokeWidth = 8, label, value }) {
  const r = (size - strokeWidth) / 2
  const circ = 2 * Math.PI * r
  const offset = circ - (pct / 100) * circ
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
      <svg width={size} height={size}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#EDE8E0" strokeWidth={strokeWidth} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={strokeWidth}
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round" transform={`rotate(-90 ${size/2} ${size/2})`} />
        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize="13" fontWeight="600" fill="#2C2C2C">{pct}%</text>
      </svg>
      <div style={{ fontSize: '11px', color: '#9A8878', textAlign: 'center' }}>{label}</div>
      <div style={{ fontSize: '13px', fontWeight: 600, color: '#2C2C2C' }}>{value}</div>
    </div>
  )
}

const badgeColori = {
  nuovo: { bg: '#E3F2FD', color: '#1565C0' },
  preparazione: { bg: '#FFF8E1', color: '#F57F17' },
  pronto: { bg: '#E8F5E9', color: '#2E7D32' },
  servito: { bg: '#F3E5F5', color: '#6A1B9A' },
}

const badgeLabel = {
  nuovo: 'Nuovo',
  preparazione: 'In prep.',
  pronto: 'Pronto',
  servito: 'Servito',
}

const topPizze = [
  { nome: 'Margherita', count: 28, pct: 90 },
  { nome: 'Diavola', count: 22, pct: 70 },
  { nome: 'Capricciosa', count: 17, pct: 55 },
  { nome: '4 Stagioni', count: 13, pct: 42 },
  { nome: 'Bufalina', count: 9, pct: 28 },
]

function Dashboard({ tavoli, ordini, incassato, incassatoSettimana, incassatoMese }) {
  const tavoliOccupati = tavoli.filter(t => t.stato === 'occupato').length
  const tavoliConto = tavoli.filter(t => t.stato === 'conto').length
  const tavoliLiberi = tavoli.filter(t => t.stato === 'libero').length
  const tavoliTotali = tavoli.length
  const pctOccupati = Math.round((tavoliOccupati / tavoliTotali) * 100)
  const pctConto = Math.round((tavoliConto / tavoliTotali) * 100)
  const pctLiberi = Math.round((tavoliLiberi / tavoliTotali) * 100)

  const ordiniAttivi = ordini.filter(o => o.stato !== 'servito').length
  const ordiniPronti = ordini.filter(o => o.stato === 'pronto').length
  const ordiniPrep = ordini.filter(o => o.stato === 'preparazione').length

  const totaleOrdini = ordini.reduce((s, o) => s + (o.total || 0), 0)
  const incassoTotale = incassato + totaleOrdini
  const scontrinoMedio = ordini.length > 0 ? (incassoTotale / ordini.length).toFixed(0) : 0
  const totSettimana = (incassatoSettimana || 0) + incassoTotale
  const totMese = (incassatoMese || 0) + incassoTotale

  return (
    <div style={{ padding: '20px 24px' }}>

      {/* RIGA 1 - Metriche principali */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '16px' }}>
        {[
          { label: 'Incasso oggi', valore: `€ ${incassoTotale.toFixed(0)}`, sub: '↑ +12% vs ieri', accent: true },
          { label: 'Ordini attivi', valore: ordiniAttivi, sub: `${ordiniPronti} pronti da servire` },
          { label: 'Tavoli occupati', valore: `${tavoliOccupati + tavoliConto} / ${tavoliTotali}`, sub: `${pctOccupati + pctConto}% occupazione` },
          { label: 'Scontrino medio', valore: `€ ${scontrinoMedio}`, sub: '↑ +€2 vs ieri' },
        ].map((m, i) => (
          <div key={i} style={{
            background: m.accent ? '#2E6B6B' : '#FDFAF7',
            border: `1px solid ${m.accent ? '#245858' : 'rgba(180,160,130,0.3)'}`,
            borderRadius: '10px', padding: '14px 16px',
            display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '100px'
          }}>
            <div style={{ fontSize: '11px', color: m.accent ? 'rgba(255,255,255,0.7)' : '#9A8878', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '4px' }}>{m.label}</div>
            <div style={{ fontSize: '26px', fontFamily: 'Playfair Display, serif', color: m.accent ? '#fff' : '#2C2C2C' }}>{m.valore}</div>
            <div style={{ fontSize: '11px', color: m.accent ? 'rgba(255,255,255,0.8)' : '#2E7D32', marginTop: '2px' }}>{m.sub}</div>
          </div>
        ))}
      </div>

      {/* RIGA 2 - Grafici circolari + ordini */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>

        {/* Grafici circolari tavoli */}
        <div style={{ background: '#FDFAF7', border: '1px solid rgba(180,160,130,0.3)', borderRadius: '10px', padding: '16px' }}>
          <div style={{ fontWeight: 500, marginBottom: '16px', color: '#2C2C2C' }}>🪑 Stato tavoli</div>
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
            <CircleChart pct={pctOccupati} color="#F57F17" label="Occupati" value={tavoliOccupati} />
            <CircleChart pct={pctConto} color="#6A1B9A" label="Conto" value={tavoliConto} />
            <CircleChart pct={pctLiberi} color="#2E6B6B" label="Liberi" value={tavoliLiberi} />
          </div>
        </div>

        {/* Grafici circolari ordini */}
        <div style={{ background: '#FDFAF7', border: '1px solid rgba(180,160,130,0.3)', borderRadius: '10px', padding: '16px' }}>
          <div style={{ fontWeight: 500, marginBottom: '16px', color: '#2C2C2C' }}>📋 Stato ordini</div>
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
            <CircleChart pct={ordini.length > 0 ? Math.round((ordini.filter(o=>o.stato==='nuovo').length/ordini.length)*100) : 0} color="#1565C0" label="Nuovi" value={ordini.filter(o=>o.stato==='nuovo').length} />
            <CircleChart pct={ordini.length > 0 ? Math.round((ordiniPrep/ordini.length)*100) : 0} color="#F57F17" label="In prep." value={ordiniPrep} />
            <CircleChart pct={ordini.length > 0 ? Math.round((ordiniPronti/ordini.length)*100) : 0} color="#2E6B6B" label="Pronti" value={ordiniPronti} />
          </div>
        </div>
      </div>

      {/* RIGA 3 - Ultimi ordini + top pizze */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div style={{ background: '#FDFAF7', border: '1px solid rgba(180,160,130,0.3)', borderRadius: '10px', padding: '16px' }}>
          <div style={{ fontWeight: 500, marginBottom: '12px', color: '#2C2C2C' }}>🧾 Ultimi ordini</div>
          {ordini.slice(0, 4).map((o, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', background: '#F5F0EB', borderRadius: '8px', fontSize: '13px', marginBottom: '6px' }}>
              <span style={{ fontWeight: 500, minWidth: '55px' }}>Tav. {o.tavolo}</span>
              <span style={{ fontSize: '10px', fontWeight: 500, padding: '3px 8px', borderRadius: '20px', background: badgeColori[o.stato].bg, color: badgeColori[o.stato].color }}>
                {badgeLabel[o.stato]}
              </span>
              <span style={{ flex: 1, color: '#9A8878' }}>{o.items}</span>
              <span style={{ fontWeight: 500 }}>€ {o.total}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#FDFAF7', border: '1px solid rgba(180,160,130,0.3)', borderRadius: '10px', padding: '16px' }}>
          <div style={{ fontWeight: 500, marginBottom: '12px', color: '#2C2C2C' }}>🏆 Top pizze oggi</div>
          {topPizze.map((p, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: '1px solid rgba(180,160,130,0.2)', fontSize: '13px' }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#2E6B6B', color: '#fff', fontSize: '10px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</div>
              <span style={{ flex: 1, fontWeight: 500 }}>{p.nome}</span>
              <div style={{ flex: 2, height: '6px', background: '#EDE8E0', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: `${p.pct}%`, height: '100%', background: '#2E6B6B', borderRadius: '3px' }} />
              </div>
              <span style={{ fontSize: '12px', color: '#9A8878', minWidth: '25px', textAlign: 'right' }}>{p.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard