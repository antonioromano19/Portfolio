import { useState } from 'react'
import OrderSuccess from './OrderSuccess'

const prezzi = {
  'Margherita': 9, 'Marinara': 7, 'Diavola': 11, 'Capricciosa': 12,
  '4 Stagioni': 13, 'Bufalina': 14, 'Nduja e Stracciatella': 15,
  'Pistacchio e Mortadella': 16, 'Porcini e Salsiccia': 15,
  'Birra artigianale': 5, 'Vino della casa': 4, 'Coca-Cola / Acqua': 2.5,
  'Tiramisù': 5, 'Delizia al limone': 5,
}

function parseOrdine(ordineStrings) {
  return ordineStrings.map(str => {
    const match = str.match(/^(.+?)(?:\s×(\d+))?$/)
    const nome = match[1].trim()
    const qty = match[2] ? parseInt(match[2]) : 1
    const prezzo = prezzi[nome] || 0
    return { nome, qty, prezzo }
  }).filter(x => x.prezzo > 0)
}

function Cassa({ tavoli, setTavoli, ordini, setOrdini, incassato, setIncassato, incassatoSettimana, setIncassatoSettimana, incassatoMese, setIncassatoMese, pizzeVendute, setPizzeVendute }) {
  const tavoliOccupati = tavoli.filter(t => t.stato !== 'libero')
  const [tavoloSel, setTavoloSel] = useState(tavoliOccupati[0]?.n || null)
  const [voceSel, setVoceSel] = useState('')
  const [extraItems, setExtraItems] = useState({})
  const [messaggio, setMessaggio] = useState('')
  const [successo, setSuccesso] = useState(false)
  const [msgSuccesso, setMsgSuccesso] = useState('')

  const mostraMessaggio = (msg) => {
    setMessaggio(msg)
    setTimeout(() => setMessaggio(''), 2500)
  }

  const tavolo = tavoli.find(t => t.n === tavoloSel)
  const baseItems = tavolo ? parseOrdine(tavolo.ordine) : []
  const extra = extraItems[tavoloSel] || []
  const items = [...baseItems, ...extra]

  const aggiungi = () => {
    if (!voceSel) return
    const existing = extra.find(x => x.nome === voceSel)
    if (existing) {
      setExtraItems({
        ...extraItems,
        [tavoloSel]: extra.map(x => x.nome === voceSel ? { ...x, qty: x.qty + 1 } : x)
      })
    } else {
      setExtraItems({
        ...extraItems,
        [tavoloSel]: [...extra, { nome: voceSel, qty: 1, prezzo: prezzi[voceSel] }]
      })
    }
    setVoceSel('')
    mostraMessaggio(voceSel + ' aggiunto al conto!')
  }

  const rimuovi = (nome) => {
    setExtraItems({
      ...extraItems,
      [tavoloSel]: extra.filter(x => x.nome !== nome)
    })
  }

  const subtotale = items.reduce((s, x) => s + x.prezzo * x.qty, 0)
  const iva = subtotale * 0.1
  const totale = subtotale + iva

 const paga = (metodo) => {
    const nuoviTavoli = tavoli.map(t =>
      t.n === tavoloSel ? { ...t, stato: 'libero', pax: 0, ordine: [] } : t
    )
    setTavoli(nuoviTavoli)
    setIncassato(incassato + totale)
    setIncassatoSettimana(incassatoSettimana + totale)
    setIncassatoMese(incassatoMese + totale)
    const nuovePizze = { ...pizzeVendute }
    items.forEach(item => {
      nuovePizze[item.nome] = (nuovePizze[item.nome] || 0) + item.qty
    })
    setPizzeVendute(nuovePizze)
    const nuoviOrdini = ordini.filter(o => o.tavolo !== tavoloSel)
    setOrdini(nuoviOrdini)
    setExtraItems({ ...extraItems, [tavoloSel]: [] })
    mostraMessaggio(`Pagamento € ${totale.toFixed(2)} con ${metodo} completato! Tavolo liberato ✅`)
    setMsgSuccesso(`Pagamento € ${totale.toFixed(2)} completato!`)
    setSuccesso(true)
    const prossimo = tavoliOccupati.find(t => t.n !== tavoloSel)
    if (prossimo) setTavoloSel(prossimo.n)
  }

  return (
    <div style={{ padding: '20px 24px' }}>
     {successo && <OrderSuccess messaggio={msgSuccesso} onFinish={() => setSuccesso(false)} />}
      {messaggio && (
        <div style={{ background: '#2E6B6B', color: '#fff', padding: '10px 16px', borderRadius: '8px', fontSize: '13px', marginBottom: '16px' }}>
          {messaggio}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '16px' }}>
        <div style={{ background: '#FDFAF7', border: '1px solid rgba(180,160,130,0.3)', borderRadius: '10px', padding: '16px' }}>
          <div style={{ fontWeight: 500, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🧾 Conto — Tavolo
            <select
              value={tavoloSel || ''}
              onChange={e => setTavoloSel(Number(e.target.value))}
              style={{ fontFamily: 'inherit', fontSize: '13px', border: '1px solid rgba(180,160,130,0.3)', background: '#F5F0EB', borderRadius: '6px', padding: '2px 6px' }}
            >
              {tavoliOccupati.map(t => <option key={t.n} value={t.n}>Tavolo {t.n}</option>)}
            </select>
          </div>

          {items.length === 0 && (
            <div style={{ fontSize: '13px', color: '#9A8878', padding: '12px 0' }}>Nessuna voce nel conto.</div>
          )}

          {items.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', borderBottom: '1px solid rgba(180,160,130,0.2)', fontSize: '13px' }}>
              <span style={{ flex: 1 }}>{item.nome}</span>
              <span style={{ color: '#9A8878' }}>×{item.qty}</span>
              <span style={{ fontWeight: 500, minWidth: '55px', textAlign: 'right' }}>€ {(item.prezzo * item.qty).toFixed(2)}</span>
              {extra.find(x => x.nome === item.nome) && (
                <button onClick={() => rimuovi(item.nome)} style={{ width: '24px', height: '24px', background: '#F3E5F5', border: 'none', borderRadius: '4px', cursor: 'pointer', color: '#6A1B9A', fontWeight: 700 }}>×</button>
              )}
            </div>
          ))}

          <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
            <select
              value={voceSel}
              onChange={e => setVoceSel(e.target.value)}
              style={{ flex: 1, fontFamily: 'inherit', fontSize: '13px', padding: '7px 10px', border: '1px solid rgba(180,160,130,0.3)', borderRadius: '7px', background: '#F5F0EB' }}
            >
              <option value=''>Aggiungi voce...</option>
              {Object.entries(prezzi).map(([nome, p]) => (
                <option key={nome} value={nome}>{nome} — € {p}</option>
              ))}
            </select>
            <button onClick={aggiungi} style={{ padding: '7px 14px', background: '#2E6B6B', color: '#fff', border: 'none', borderRadius: '7px', cursor: 'pointer', fontSize: '12px', fontWeight: 500, fontFamily: 'inherit' }}>
              Aggiungi
            </button>
          </div>
        </div>

        <div style={{ background: '#FDFAF7', border: '1px solid rgba(180,160,130,0.3)', borderRadius: '10px', padding: '16px' }}>
          <div style={{ fontWeight: 500, marginBottom: '12px' }}>💳 Riepilogo</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '4px 0', color: '#9A8878' }}>
            <span>Subtotale</span><span>€ {subtotale.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '4px 0', color: '#9A8878' }}>
            <span>IVA 10%</span><span>€ {iva.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontFamily: 'Playfair Display, serif', padding: '10px 0 0', marginTop: '6px', borderTop: '1px solid rgba(180,160,130,0.3)' }}>
            <span>Totale</span><span>€ {totale.toFixed(2)}</span>
          </div>
          <button onClick={() => paga('contanti')} style={{ width: '100%', padding: '12px', background: '#2E6B6B', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', marginTop: '16px' }}>
            💵 Paga in contanti
          </button>
          <button onClick={() => paga('carta')} style={{ width: '100%', padding: '12px', background: '#F5F0EB', color: '#2C2C2C', border: '1px solid rgba(180,160,130,0.3)', borderRadius: '8px', fontSize: '14px', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', marginTop: '8px' }}>
            💳 Paga con carta
          </button>
          <button onClick={() => mostraMessaggio('Scontrino stampato!')} style={{ width: '100%', padding: '12px', background: '#F5F0EB', color: '#2C2C2C', border: '1px solid rgba(180,160,130,0.3)', borderRadius: '8px', fontSize: '14px', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', marginTop: '8px' }}>
            🖨 Stampa scontrino
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cassa