const statoColori = {
  libero: { bg: '#E8F5E9', color: '#2E7D32', border: '#A5D6A7' },
  occupato: { bg: '#FFF8E1', color: '#F57F17', border: '#FFE082' },
  conto: { bg: '#F3E5F5', color: '#6A1B9A', border: '#CE93D8' },
}

const statoLabel = {
  libero: 'Libero',
  occupato: 'Occupato',
  conto: 'Conto',
}

function Tavoli({ tavoli, setTavoli }) {
  const [selezionato, setSelezionato] = useState(null)

  const cambiaSato = (idx, nuovoStato) => {
    const nuovi = [...tavoli]
    nuovi[idx] = { 
      ...nuovi[idx], 
      stato: nuovoStato,
      pax: nuovoStato === 'libero' ? 0 : nuovi[idx].pax || 2,
      ordine: nuovoStato === 'libero' ? [] : nuovi[idx].ordine
    }
    setTavoli(nuovi)
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
                border: `2px solid ${selezionato === i ? '#2E6B6B' : colori.border}`,
                borderRadius: '10px', padding: '12px 8px', textAlign: 'center',
                cursor: 'pointer', transition: 'all 0.15s',
                boxShadow: selezionato === i ? '0 0 0 3px rgba(46,107,107,0.2)' : 'none'
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
        <div style={{ background: '#FDFAF7', border: '1px solid rgba(180,160,130,0.3)', borderRadius: '10px', padding: '16px' }}>
          <div style={{ fontWeight: 500, marginBottom: '12px', fontSize: '15px' }}>Tavolo {tavolo.n}</div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {tavolo.stato !== 'occupato' && (
              <button onClick={() => cambiaSato(selezionato, 'occupato')} style={{ padding: '8px 16px', background: '#2E6B6B', color: '#fff', border: 'none', borderRadius: '7px', cursor: 'pointer', fontSize: '13px', fontFamily: 'inherit' }}>
                🪑 Occupa
              </button>
            )}
            {tavolo.stato !== 'conto' && tavolo.stato !== 'libero' && (
              <button onClick={() => cambiaSato(selezionato, 'conto')} style={{ padding: '8px 16px', background: '#6A1B9A', color: '#fff', border: 'none', borderRadius: '7px', cursor: 'pointer', fontSize: '13px', fontFamily: 'inherit' }}>
                💳 Richiedi conto
              </button>
            )}
            {tavolo.stato !== 'libero' && (
              <button onClick={() => cambiaSato(selezionato, 'libero')} style={{ padding: '8px 16px', background: '#F5F0EB', color: '#2C2C2C', border: '1px solid rgba(180,160,130,0.3)', borderRadius: '7px', cursor: 'pointer', fontSize: '13px', fontFamily: 'inherit' }}>
                ✓ Libera tavolo
              </button>
            )}
          </div>
          {tavolo.ordine.length > 0 && (
            <div style={{ marginTop: '12px', fontSize: '13px', color: '#9A8878' }}>
              <strong>Ordine:</strong> {tavolo.ordine.join(', ')}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

import { useState } from 'react'
export default Tavoli