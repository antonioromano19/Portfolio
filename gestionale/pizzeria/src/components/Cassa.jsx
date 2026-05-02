import { useState } from 'react'

const prezzi = {
  'Margherita': 9, 'Marinara': 7, 'Diavola': 11, 'Capricciosa': 12,
  '4 Stagioni': 13, 'Bufalina': 14, 'Nduja e Stracciatella': 15,
  'Pistacchio e Mortadella': 16, 'Porcini e Salsiccia': 15,
  'Birra artigianale': 5, 'Vino della casa': 4, 'Coca-Cola / Acqua': 2.5,
  'Tiramisù': 5, 'Delizia al limone': 5,
}

const tavoli_occupati = [2, 4, 5, 7, 9, 11, 12, 14]

function Cassa() {
  const [tavoloSel, setTavoloSel] = useState(2)
  const [voceSel, setVoceSel] = useState('')
  const [items, setItems] = useState([
    { nome: 'Margherita', qty: 2, prezzo: 9 },
    { nome: 'Birra artigianale', qty: 2, prezzo: 5 },
  ])
  const [messaggio, setMessaggio] = useState('')

  const mostraMessaggio = (msg) => {
    setMessaggio(msg)
    setTimeout(() => setMessaggio(''), 2500)
  }

  const cambiaQty = (i, d) => {
    setItems(items.map((item, idx) =>
      idx === i ? { ...item, qty: Math.max(1, item.qty + d) } : item
    ))
  }

  const rimuovi = (i) => setItems(items.filter((_, idx) => idx !== i))

  const aggiungi = () => {
    if (!voceSel) return
    const existing = items.find(x => x.nome === voceSel)
    if (existing) {
      setItems(items.map(x => x.nome === voceSel ? { ...x, qty: x.qty + 1 } : x))
    } else {
      setItems([...items, { nome: voceSel, qty: 1, prezzo: prezzi[voceSel] }])
    }
    setVoceSel('')
    mostraMessaggio(voceSel + ' aggiunto al conto!')
  }

  const subtotale = items.reduce((s, x) => s + x.prezzo * x.qty, 0)
  const iva = subtotale * 0.1
  const totale = subtotale + iva

  const paga = (metodo) => {
    mostraMessaggio(`Pagamento di € ${totale.toFixed(2)} con ${metodo} completato!`)
    setItems([])
  }

  return (
    <div style={{ padding: '20px 24px' }}>
      {messaggio && (
        <div style={{ background: '#2C1810', color: '#fff', padding: '10px 16px', borderRadius: '8px', fontSize: '13px', marginBottom: '16px' }}>
          {messaggio}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '16px' }}>
        <div style={{ background: '#FFFDF9', border: '1px solid rgba(125,90,60,0.2)', borderRadius: '10px', padding: '16px' }}>
          <div style={{ fontWeight: 500, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🧾 Conto — Tavolo
            <select
              value={tavoloSel}
              onChange={e => setTavoloSel(Number(e.target.value))}
              style={{ fontFamily: 'inherit', fontSize: '13px', border: '1px solid rgba(125,90,60,0.2)', background: '#FDF6EC', borderRadius: '6px', padding: '2px 6px' }}
            >
              {tavoli_occupati.map(t => <option key={t} value={t}>Tavolo {t}</option>)}
            </select>
          </div>

          {items.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', borderBottom: '1px solid rgba(125,90,60,0.2)', fontSize: '13px' }}>
              <button onClick={() => cambiaQty(i, -1)} style={{ width: '24px', height: '24px', background: '#F9EBEA', border: '1px solid rgba(125,90,60,0.2)', borderRadius: '4px', cursor: 'pointer', color: '#C0392B', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
              <span style={{ minWidth: '18px', textAlign: 'center', fontWeight: 500 }}>{item.qty}</span>
              <button onClick={() => cambiaQty(i, 1)} style={{ width: '24px', height: '24px', background: '#F9EBEA', border: '1px solid rgba(125,90,60,0.2)', borderRadius: '4px', cursor: 'pointer', color: '#C0392B', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
              <span style={{ flex: 1, marginLeft: '8px' }}>{item.nome}</span>
              <span style={{ color: '#7B5E52' }}>€ {(item.prezzo * item.qty).toFixed(2)}</span>
              <button onClick={() => rimuovi(i)} style={{ width: '24px', height: '24px', background: '#F9EBEA', border: '1px solid rgba(125,90,60,0.2)', borderRadius: '4px', cursor: 'pointer', color: '#C0392B', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
            </div>
          ))}

          <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
            <select
              value={voceSel}
              onChange={e => setVoceSel(e.target.value)}
              style={{ flex: 1, fontFamily: 'inherit', fontSize: '13px', padding: '7px 10px', border: '1px solid rgba(125,90,60,0.2)', borderRadius: '7px', background: '#FDF6EC' }}
            >
              <option value=''>Seleziona voce...</option>
              {Object.entries(prezzi).map(([nome, p]) => (
                <option key={nome} value={nome}>{nome} — € {p}</option>
              ))}
            </select>
            <button
              onClick={aggiungi}
              style={{ padding: '7px 14px', background: '#C0392B', color: '#fff', border: 'none', borderRadius: '7px', cursor: 'pointer', fontSize: '12px', fontWeight: 500, fontFamily: 'inherit' }}
            >
              Aggiungi
            </button>
          </div>
        </div>

        <div style={{ background: '#FFFDF9', border: '1px solid rgba(125,90,60,0.2)', borderRadius: '10px', padding: '16px' }}>
          <div style={{ fontWeight: 500, marginBottom: '12px' }}>💳 Riepilogo</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '4px 0', color: '#7B5E52' }}>
            <span>Subtotale</span><span>€ {subtotale.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '4px 0', color: '#7B5E52' }}>
            <span>IVA 10%</span><span>€ {iva.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontFamily: 'Playfair Display, serif', padding: '10px 0 0', marginTop: '6px', borderTop: '1px solid rgba(125,90,60,0.2)' }}>
            <span>Totale</span><span>€ {totale.toFixed(2)}</span>
          </div>
          <button onClick={() => paga('contanti')} style={{ width: '100%', padding: '12px', background: '#C0392B', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', marginTop: '16px' }}>
            💵 Paga in contanti
          </button>
          <button onClick={() => paga('carta')} style={{ width: '100%', padding: '12px', background: '#FDF6EC', color: '#2C1810', border: '1px solid rgba(125,90,60,0.2)', borderRadius: '8px', fontSize: '14px', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', marginTop: '8px' }}>
            💳 Paga con carta
          </button>
          <button onClick={() => mostraMessaggio('Scontrino stampato!')} style={{ width: '100%', padding: '12px', background: '#FDF6EC', color: '#2C1810', border: '1px solid rgba(125,90,60,0.2)', borderRadius: '8px', fontSize: '14px', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', marginTop: '8px' }}>
            🖨 Stampa scontrino
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cassa