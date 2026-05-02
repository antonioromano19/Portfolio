import { useState } from 'react'

const statoColori = {
  libero: { bg: '#E8F5E9', border: '#A5D6A7', color: '#2E7D32' },
  occupato: { bg: '#FFF3E0', border: '#FFCC80', color: '#E65100' },
  conto: { bg: '#F9EBEA', border: '#FFAB91', color: '#C0392B' },
}

const statoLabel = {
  libero: 'Libero',
  occupato: 'Occupato',
  conto: 'Conto',
}

const tavoli_iniziali = [
  { n: 1, stato: 'libero', pax: 0, ordine: [] },
  { n: 2, stato: 'occupato', pax: 4, ordine: ['Margherita ×2', '4 Stagioni', 'Tiramisù'] },
  { n: 3, stato: 'libero', pax: 0, ordine: [] },
  { n: 4, stato: 'occupato', pax: 2, ordine: ['Margherita ×2', 'Birra ×2'] },
  { n: 5, stato: 'conto', pax: 6, ordine: ['Diavola ×2', 'Capricciosa ×2', 'Vino ×1'] },
  { n: 6, stato: 'libero', pax: 0, ordine: [] },
  { n: 7, stato: 'occupato', pax: 3, ordine: ['Diavola', 'Capricciosa', 'Acqua'] },
  { n: 8, stato: 'libero', pax: 0, ordine: [] },
  { n: 9, stato: 'occupato', pax: 2, ordine: ['Bufalina ×2', 'Birra ×2'] },
  { n: 10, stato: 'libero', pax: 0, ordine: [] },
  { n: 11, stato: 'occupato', pax: 2, ordine: ['Marinara', 'Vino'] },
  { n: 12, stato: 'conto', pax: 4, ordine: ['Margherita ×3', 'Tiramisù ×2'] },
  { n: 13, stato: 'libero', pax: 0, ordine: [] },
  { n: 14, stato: 'occupato', pax: 5, ordine: ['4 Stagioni ×3', 'Coca ×3'] },
  { n: 15, stato: 'libero', pax: 0, ordine: [] },
]

function Tavoli() {
  const [tavoli, setTavoli] = useState(tavoli_iniziali)
  const [selezionato, setSelezionato] = useState(null)

  const occupaTavolo = (idx) => {
    const nuovi = [...tavoli]
    nuovi[idx] = { ...nuovi[idx], stato: 'occupato', pax: 2 }
    setTavoli(nuovi)
    setSelezionato(idx)
  }

  const tavolo = selezionato !== null ? tavoli[selezionato] : null

  return (
    <div style={{ padding: '20px 24px' }}>
      <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', alignItems: 'center', fontSize: '12px' }}>
        {Object.entries(statoColori).map(([stato, colori]) => (
          <span key={stato} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: colori.bg, border: `1px solid ${colori.border}`, display: 'inline-block' }} />
            {statoLabel[stato]}
          </span>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', marginBottom: '16px' }}>
        {tavoli.map((t, i) => {
          const colori = statoColori[t.stato]
          return (
            <div
              key={t.n}
              onClick={() => setSelezionato(i)}
              style={{
                background: colori.bg,
                border: `2px solid ${selezionato === i ? '#C0392B' : colori.border}`,
                borderRadius: '10px', padding: '12px 8px', textAlign: 'center',
                cursor: 'pointer', transition: 'all 0.15s',
                boxShadow: selezionato === i ? '0 0 0 3px rgba(192,57,43,0.15)' : 'none'
              }}
            >
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '22px', fontWeight: 700, color: colori.color }}>
                {t.n}
              </div>
              <div style={{ fontSize: '10px', fontWeight: 500, color: colori.color }}>
                {statoLabel[t.stato]}
              </div>
              <div style={{ fontSize: '11px', marginTop: '4px', color: colori.color, opacity: 0.8 }}>
                {t.pax > 0 ? `${t.pax} pax` : '—'}
              </div>
            </div>
          )
        })}
      </div>

      {tavolo && (
        <div style={{ background: '#FFFDF9', border: '1px solid rgba(125,90,60,0.2)', borderRadius: '10px', padding: '16px' }}>
          <div style={{ fontWeight: 500, marginBottom: '8px' }}>Tavolo {tavolo.n}</div>
          {tavolo.stato === 'libero' ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#2E7D32' }}>
              Tavolo libero
              <button
                onClick={() => occupaTavolo(selezionato)}
                style={{ padding: '6px 14px', background: '#C0392B', color: '#fff', border: 'none', borderRadius: '7px', cursor: 'pointer', fontSize: '12px' }}
              >
                Occupa tavolo
              </button>
            </div>
          ) : (
            <div style={{ fontSize: '13px', color: '#7B5E52' }}>
              <strong>{tavolo.pax} pax</strong> — {tavolo.ordine.join(', ')}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Tavoli