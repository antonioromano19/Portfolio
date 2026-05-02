import { useState } from 'react'
import OrderSuccess from './OrderSuccess'

const ordini_iniziali = [
  { id: '#034', tavolo: 'Tav. 2', stato: 'nuovo', items: '4 Stagioni ×2, Tiramisù', time: '1 min', total: '€ 35' },
  { id: '#033', tavolo: 'Tav. 4', stato: 'preparazione', items: 'Margherita ×2, Birra ×2', time: '5 min', total: '€ 28' },
  { id: '#032', tavolo: 'Tav. 7', stato: 'pronto', items: 'Diavola, Capricciosa', time: '12 min', total: '€ 21' },
  { id: '#031', tavolo: 'Tav. 9', stato: 'preparazione', items: 'Bufalina ×2, Birra ×2', time: '8 min', total: '€ 32' },
  { id: '#030', tavolo: 'Tav. 11', stato: 'servito', items: 'Marinara, Vino rosso', time: '22 min', total: '€ 19' },
  { id: '#029', tavolo: 'Tav. 5', stato: 'pronto', items: 'Diavola ×2, Capricciosa ×2', time: '18 min', total: '€ 48' },
  { id: '#028', tavolo: 'Tav. 14', stato: 'preparazione', items: '4 Stagioni ×3, Coca ×3', time: '6 min', total: '€ 42' },
  { id: '#027', tavolo: 'Tav. 12', stato: 'servito', items: 'Margherita ×3, Tiramisù ×2', time: '30 min', total: '€ 51' },
]

const stati = ['nuovo', 'preparazione', 'pronto', 'servito']

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

function Ordini() {
  const [ordini, setOrdini] = useState(ordini_iniziali)
  const [filtro, setFiltro] = useState('tutti')
  const [successo, setSuccesso] = useState(false)
  const [msgSuccesso, setMsgSuccesso] = useState('')

const avanzaStato = (id) => {
  const o = ordini.find(x => x.id === id)
  const i = stati.indexOf(o.stato)
  if (i < stati.length - 1) {
    const nuovoStato = stati[i + 1]
    setOrdini(ordini.map(x => x.id === id ? { ...x, stato: nuovoStato } : x))
    if (nuovoStato === 'servito') {
      setMsgSuccesso('Ordine servito! 🍕')
      setSuccesso(true)
    }
  }
}
  const addOrdine = () => {
    const id = '#0' + (ordini.length + 35)
    setOrdini([{ id, tavolo: 'Tav. 3', stato: 'nuovo', items: 'Margherita, Acqua', time: 'adesso', total: '€ 12' }, ...ordini])
  }

  const ordiniFiltrati = filtro === 'tutti' ? ordini : ordini.filter(o => o.stato === filtro)

  return (
    <div style={{ padding: '20px 24px' }}>
     {successo && <OrderSuccess messaggio={msgSuccesso} onFinish={() => setSuccesso(false)} />}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {['tutti', ...stati].map(f => (
          <button
            key={f}
            onClick={() => setFiltro(f)}
            style={{
              padding: '7px 14px', borderRadius: '7px', border: '1px solid rgba(125,90,60,0.2)',
              background: filtro === f ? '#C0392B' : '#FFFDF9',
              color: filtro === f ? '#fff' : '#2C1810',
              fontSize: '12px', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit'
            }}
          >
            {f === 'tutti' ? 'Tutti' : badgeLabel[f]}
          </button>
        ))}
        <button
          onClick={addOrdine}
          style={{ marginLeft: 'auto', padding: '7px 14px', borderRadius: '7px', border: '1px solid rgba(125,90,60,0.2)', background: '#FFFDF9', fontSize: '12px', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}
        >
          + Aggiungi ordine
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {ordiniFiltrati.map(o => (
          <div key={o.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', background: '#FFFDF9', border: '1px solid rgba(125,90,60,0.2)', borderRadius: '8px', fontSize: '13px' }}>
            <span style={{ fontSize: '11px', color: '#7B5E52', minWidth: '40px' }}>{o.id}</span>
            <span style={{ fontWeight: 500, minWidth: '55px' }}>{o.tavolo}</span>
            <span style={{ fontSize: '10px', fontWeight: 500, padding: '3px 8px', borderRadius: '20px', background: badgeColori[o.stato].bg, color: badgeColori[o.stato].color }}>
              {badgeLabel[o.stato]}
            </span>
            <span style={{ flex: 1, color: '#7B5E52' }}>{o.items}</span>
            <span style={{ fontSize: '11px', color: '#7B5E52' }}>{o.time}</span>
            <span style={{ fontWeight: 500, minWidth: '45px', textAlign: 'right' }}>{o.total}</span>
            <button
              onClick={() => avanzaStato(o.id)}
              style={{ padding: '4px 10px', borderRadius: '6px', border: '1px solid rgba(125,90,60,0.2)', background: '#FDF6EC', fontSize: '11px', cursor: 'pointer', fontFamily: 'inherit' }}
            >
              → Avanza
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Ordini