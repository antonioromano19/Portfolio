const voci = [
  { id: 'dashboard', icona: '📊', label: 'Dashboard' },
  { id: 'tavoli', icona: '🪑', label: 'Tavoli' },
  { id: 'ordini', icona: '📋', label: 'Ordini' },
  { id: 'menu', icona: '📖', label: 'Menu' },
  { id: 'cassa', icona: '💰', label: 'Cassa' },
  { id: 'statistiche', icona: '📈', label: 'Statistiche' },
]

function Sidebar({ paginaAttiva, setPaginaAttiva }) {
  return (
    <nav style={{
      width: '200px', background: '#2E6B6B', display: 'flex',
      flexDirection: 'column', flexShrink: 0
    }}>
      <div style={{ padding: '20px 16px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', color: '#fff' }}>
          🍕 Sangio Bistrot
        </div>
        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>
          Gestionale Pizzeria
        </div>
      </div>

      <div style={{ padding: '8px 0', flex: 1 }}>
        {voci.map(v => (
          <div
            key={v.id}
            onClick={() => setPaginaAttiva(v.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '12px 16px', cursor: 'pointer', fontSize: '13px',
              fontWeight: 500, color: paginaAttiva === v.id ? '#fff' : 'rgba(255,255,255,0.7)',
              background: paginaAttiva === v.id ? 'rgba(255,255,255,0.15)' : 'transparent',
              borderLeft: paginaAttiva === v.id ? '3px solid #C8B89A' : '3px solid transparent',
              transition: 'all 0.15s'
            }}
          >
            <span style={{ fontSize: '16px' }}>{v.icona}</span>
            {v.label}
          </div>
        ))}
      </div>

      <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>
        Turno: 18:00 — 23:00
      </div>
    </nav>
  )
}

export default Sidebar