const metriche = [
  { label: 'Incasso oggi', valore: '€ 847', sub: '↑ +12% vs ieri', accent: true },
  { label: 'Ordini totali', valore: '34', sub: '↑ +5 vs ieri' },
  { label: 'Tavoli occupati', valore: '8 / 15', sub: '53% occupazione' },
  { label: 'Scontrino medio', valore: '€ 24,9', sub: '↑ +€2 vs ieri' },
]

const ultimiOrdini = [
  { tavolo: 'Tav. 4', stato: 'preparazione', items: 'Margherita ×2, Birra ×2', time: '5 min', total: '€ 28' },
  { tavolo: 'Tav. 7', stato: 'pronto', items: 'Diavola, Capricciosa', time: '12 min', total: '€ 21' },
  { tavolo: 'Tav. 2', stato: 'nuovo', items: '4 Stagioni ×2, Tiramisù', time: '1 min', total: '€ 35' },
  { tavolo: 'Tav. 11', stato: 'servito', items: 'Marinara, Vino rosso', time: '22 min', total: '€ 19' },
]

const topPizze = [
  { nome: 'Margherita', count: 28, pct: 90 },
  { nome: 'Diavola', count: 22, pct: 70 },
  { nome: 'Capricciosa', count: 17, pct: 55 },
  { nome: '4 Stagioni', count: 13, pct: 42 },
  { nome: 'Bufalina', count: 9, pct: 28 },
]

const badgeColori = {
  nuovo: { bg: '#E3F2FD', color: '#1565C0' },
  preparazione: { bg: '#FFF3E0', color: '#E65100' },
  pronto: { bg: '#E8F5E9', color: '#2E7D32' },
  servito: { bg: '#F3E5F5', color: '#6A1B9A' },
}

const badgeLabel = {
  nuovo: 'Nuovo',
  preparazione: 'In prep.',
  pronto: 'Pronto',
  servito: 'Servito',
}

function Dashboard() {
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
            <div style={{ fontSize: '26px', fontFamily: 'Playfair Display, serif', color: m.accent ? '#fff' : '#2C1810' }}>
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
          <div style={{ fontWeight: 500, marginBottom: '12px' }}>🧾 Ultimi ordini</div>
          {ultimiOrdini.map((o, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', background: '#FDF6EC', borderRadius: '8px', fontSize: '13px', marginBottom: '6px' }}>
              <span style={{ fontWeight: 500, minWidth: '55px' }}>{o.tavolo}</span>
              <span style={{ fontSize: '10px', fontWeight: 500, padding: '3px 8px', borderRadius: '20px', background: badgeColori[o.stato].bg, color: badgeColori[o.stato].color }}>
                {badgeLabel[o.stato]}
              </span>
              <span style={{ flex: 1, color: '#7B5E52' }}>{o.items}</span>
              <span style={{ fontSize: '11px', color: '#7B5E52' }}>{o.time}</span>
              <span style={{ fontWeight: 500 }}>{o.total}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#FFFDF9', border: '1px solid rgba(125,90,60,0.2)', borderRadius: '10px', padding: '16px' }}>
          <div style={{ fontWeight: 500, marginBottom: '12px' }}>🏆 Top pizze oggi</div>
          {topPizze.map((p, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: '1px solid rgba(125,90,60,0.2)', fontSize: '13px' }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#C0392B', color: '#fff', fontSize: '10px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {i + 1}
              </div>
              <span style={{ flex: 1, fontWeight: 500 }}>{p.nome}</span>
              <div style={{ flex: 2, height: '6px', background: '#F5E6CC', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: `${p.pct}%`, height: '100%', background: '#C0392B', borderRadius: '3px' }} />
              </div>
              <span style={{ fontSize: '12px', color: '#7B5E52', minWidth: '25px', textAlign: 'right' }}>{p.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard