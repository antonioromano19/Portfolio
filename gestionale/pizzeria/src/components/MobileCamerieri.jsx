import { useState } from 'react'

const menuVeloce = [
  { emoji: '🍕', nome: 'Margherita', prezzo: 9 },
  { emoji: '🍕', nome: 'Marinara', prezzo: 7 },
  { emoji: '🍕', nome: 'Diavola', prezzo: 11 },
  { emoji: '🍕', nome: 'Capricciosa', prezzo: 12 },
  { emoji: '🍕', nome: '4 Stagioni', prezzo: 13 },
  { emoji: '🍕', nome: 'Bufalina', prezzo: 14 },
  { emoji: '⭐', nome: 'Nduja e Stracciatella', prezzo: 15 },
  { emoji: '⭐', nome: 'Pistacchio e Mortadella', prezzo: 16 },
  { emoji: '🍺', nome: 'Birra artigianale', prezzo: 5 },
  { emoji: '🍷', nome: 'Vino della casa', prezzo: 4 },
  { emoji: '🥤', nome: 'Coca-Cola / Acqua', prezzo: 2.5 },
  { emoji: '🍮', nome: 'Tiramisù', prezzo: 5 },
  { emoji: '🍋', nome: 'Delizia al limone', prezzo: 5 },
]

const tavoli_iniziali = Array.from({ length: 15 }, (_, i) => ({
  n: i + 1,
  stato: ['libero', 'occupato', 'libero', 'occupato', 'conto', 'libero', 'occupato', 'libero', 'occupato', 'libero', 'occupato', 'conto', 'libero', 'occupato', 'libero'][i],
}))

const ordini_cucina = [
  { id: '#033', tavolo: 4, items: 'Margherita ×2, Birra ×2', stato: 'preparazione', time: '5 min' },
  { id: '#032', tavolo: 7, items: 'Diavola, Capricciosa', stato: 'pronto', time: '12 min' },
  { id: '#031', tavolo: 9, items: 'Bufalina ×2, Birra ×2', stato: 'preparazione', time: '8 min' },
  { id: '#029', tavolo: 5, items: 'Diavola ×2, Capricciosa ×2', stato: 'pronto', time: '18 min' },
  { id: '#028', tavolo: 14, items: '4 Stagioni ×3, Coca ×3', stato: 'preparazione', time: '6 min' },
]

const statoColori = {
  libero: { bg: '#E8F5E9', color: '#2E7D32', border: '#A5D6A7' },
  occupato: { bg: '#FFF3E0', color: '#E65100', border: '#FFCC80' },
  conto: { bg: '#F9EBEA', color: '#C0392B', border: '#FFAB91' },
}

export default function MobileCamera() {
  const [schermata, setSchermata] = useState('tavoli')
  const [tavoli, setTavoli] = useState(tavoli_iniziali)
  const [tavoloSel, setTavoloSel] = useState(null)
  const [ordine, setOrdine] = useState([])
  const [messaggio, setMessaggio] = useState('')

  const mostraMsg = (msg) => {
    setMessaggio(msg)
    setTimeout(() => setMessaggio(''), 2000)
  }

  const selezionaTavolo = (t) => {
    setTavoloSel(t)
    setOrdine([])
    setSchermata('ordine')
  }

  const aggiungiVoce = (voce) => {
    const ex = ordine.find(x => x.nome === voce.nome)
    if (ex) {
      setOrdine(ordine.map(x => x.nome === voce.nome ? { ...x, qty: x.qty + 1 } : x))
    } else {
      setOrdine([...ordine, { ...voce, qty: 1 }])
    }
  }

  const rimuoviVoce = (nome) => {
    setOrdine(ordine.filter(x => x.nome !== nome))
  }

  const inviaOrdine = () => {
    if (ordine.length === 0) return
    const nuovi = tavoli.map(t => t.n === tavoloSel.n ? { ...t, stato: 'occupato' } : t)
    setTavoli(nuovi)
    mostraMsg('Ordine inviato in cucina! ✅')
    setTimeout(() => {
      setOrdine([])
      setSchermata('tavoli')
    }, 1500)
  }

  const totale = ordine.reduce((s, x) => s + x.prezzo * x.qty, 0)

  return (
    <div style={{
      width: '100%', maxWidth: '390px', margin: '0 auto',
      height: '100vh', background: '#FDF6EC', display: 'flex',
      flexDirection: 'column', fontFamily: 'DM Sans, sans-serif',
      position: 'relative', overflow: 'hidden'
    }}>

      {/* HEADER */}
      <div style={{ background: '#922B21', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
        {schermata !== 'tavoli' && (
          <button onClick={() => setSchermata('tavoli')} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            ←
          </button>
        )}
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', color: '#fff' }}>
            {schermata === 'tavoli' && '🍕 Cameriere'}
            {schermata === 'ordine' && `Tavolo ${tavoloSel?.n}`}
            {schermata === 'cucina' && '👨‍🍳 Stato Cucina'}
          </div>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)' }}>
            {schermata === 'tavoli' && 'Seleziona un tavolo'}
            {schermata === 'ordine' && 'Aggiungi voci all\'ordine'}
            {schermata === 'cucina' && 'Ordini in tempo reale'}
          </div>
        </div>
      </div>

      {/* MESSAGGIO */}
      {messaggio && (
        <div style={{ background: '#2C1810', color: '#fff', padding: '10px 16px', fontSize: '13px', textAlign: 'center', flexShrink: 0 }}>
          {messaggio}
        </div>
      )}

      {/* SCHERMATA TAVOLI */}
      {schermata === 'tavoli' && (
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            {tavoli.map(t => {
              const c = statoColori[t.stato]
              return (
                <div key={t.n} onClick={() => selezionaTavolo(t)} style={{
                  background: c.bg, border: `2px solid ${c.border}`,
                  borderRadius: '12px', padding: '16px 8px', textAlign: 'center', cursor: 'pointer'
                }}>
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', fontWeight: 700, color: c.color }}>{t.n}</div>
                  <div style={{ fontSize: '11px', fontWeight: 500, color: c.color, marginTop: '2px' }}>
                    {t.stato === 'libero' ? 'Libero' : t.stato === 'occupato' ? 'Occupato' : 'Conto'}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* SCHERMATA ORDINE */}
      {schermata === 'ordine' && (
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          {/* Riepilogo ordine */}
          {ordine.length > 0 && (
            <div style={{ background: '#FFFDF9', borderBottom: '1px solid rgba(125,90,60,0.2)', padding: '12px 16px', flexShrink: 0 }}>
              {ordine.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', fontSize: '13px', padding: '4px 0' }}>
                  <span style={{ flex: 1 }}>{item.emoji} {item.nome}</span>
                  <span style={{ color: '#7B5E52', marginRight: '8px' }}>×{item.qty}</span>
                  <span style={{ fontWeight: 500, marginRight: '8px' }}>€{(item.prezzo * item.qty).toFixed(2)}</span>
                  <button onClick={() => rimuoviVoce(item.nome)} style={{ background: '#F9EBEA', border: 'none', color: '#C0392B', width: '22px', height: '22px', borderRadius: '50%', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
                </div>
              ))}
              <div style={{ borderTop: '1px solid rgba(125,90,60,0.2)', marginTop: '8px', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', fontWeight: 500, fontSize: '14px' }}>
                <span>Totale</span>
                <span>€ {totale.toFixed(2)}</span>
              </div>
            </div>
          )}

          {/* Menu veloce */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px' }}>
            {menuVeloce.map((v, i) => (
              <div key={i} onClick={() => aggiungiVoce(v)} style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '14px 12px', background: '#FFFDF9',
                borderRadius: '10px', marginBottom: '8px', cursor: 'pointer',
                border: '1px solid rgba(125,90,60,0.2)', active: { background: '#F9EBEA' }
              }}>
                <span style={{ fontSize: '24px' }}>{v.emoji}</span>
                <span style={{ flex: 1, fontWeight: 500, fontSize: '14px' }}>{v.nome}</span>
                <span style={{ color: '#C0392B', fontWeight: 500 }}>€ {v.prezzo}</span>
                <div style={{ width: '28px', height: '28px', background: '#C0392B', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '18px', flexShrink: 0 }}>+</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SCHERMATA CUCINA */}
      {schermata === 'cucina' && (
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
          {ordini_cucina.map((o, i) => (
            <div key={i} style={{
              background: '#FFFDF9', border: `2px solid ${o.stato === 'pronto' ? '#A5D6A7' : '#FFCC80'}`,
              borderRadius: '12px', padding: '14px', marginBottom: '10px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', fontWeight: 700 }}>Tavolo {o.tavolo}</span>
                <span style={{
                  fontSize: '11px', fontWeight: 500, padding: '4px 10px', borderRadius: '20px',
                  background: o.stato === 'pronto' ? '#E8F5E9' : '#FFF3E0',
                  color: o.stato === 'pronto' ? '#2E7D32' : '#E65100'
                }}>
                  {o.stato === 'pronto' ? '✅ Pronto' : '⏳ In prep.'}
                </span>
              </div>
              <div style={{ fontSize: '13px', color: '#7B5E52' }}>{o.items}</div>
              <div style={{ fontSize: '11px', color: '#7B5E52', marginTop: '4px' }}>⏱ {o.time}</div>
            </div>
          ))}
        </div>
      )}

      {/* BOTTOM BAR */}
      <div style={{ background: '#FFFDF9', borderTop: '1px solid rgba(125,90,60,0.2)', padding: '12px 16px', flexShrink: 0 }}>
        {schermata === 'ordine' ? (
          <button onClick={inviaOrdine} style={{
            width: '100%', padding: '14px', background: ordine.length > 0 ? '#C0392B' : '#ccc',
            color: '#fff', border: 'none', borderRadius: '12px', fontSize: '15px',
            fontWeight: 500, cursor: ordine.length > 0 ? 'pointer' : 'default', fontFamily: 'inherit'
          }}>
            {ordine.length > 0 ? `Invia ordine — € ${totale.toFixed(2)}` : 'Aggiungi voci all\'ordine'}
          </button>
        ) : (
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => setSchermata('tavoli')} style={{
              flex: 1, padding: '12px', borderRadius: '12px', border: 'none',
              background: schermata === 'tavoli' ? '#C0392B' : '#F5E6CC',
              color: schermata === 'tavoli' ? '#fff' : '#7D5A3C',
              fontSize: '13px', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit'
            }}>🪑 Tavoli</button>
            <button onClick={() => setSchermata('cucina')} style={{
              flex: 1, padding: '12px', borderRadius: '12px', border: 'none',
              background: schermata === 'cucina' ? '#C0392B' : '#F5E6CC',
              color: schermata === 'cucina' ? '#fff' : '#7D5A3C',
              fontSize: '13px', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit'
            }}>👨‍🍳 Cucina</button>
          </div>
        )}
      </div>
    </div>
  )
}