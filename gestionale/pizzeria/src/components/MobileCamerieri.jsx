import { useState } from 'react'
import OrderSuccess from './OrderSuccess'

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

const statoColori = {
  libero: { bg: '#E8F5E9', color: '#2E7D32', border: '#A5D6A7' },
  occupato: { bg: '#FFF3E0', color: '#E65100', border: '#FFCC80' },
  conto: { bg: '#F3E5F5', color: '#6A1B9A', border: '#CE93D8' },
}

function CategoriaMenu({ categoria, voci, aggiungiVoce }) {
  const [aperta, setAperta] = useState(false)

  return (
    <div style={{ marginBottom: '10px' }}>
      <div
        onClick={() => setAperta(!aperta)}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 14px', background: aperta ? '#2E6B6B' : '#FDFAF7',
          borderRadius: aperta ? '10px 10px 0 0' : '10px',
          border: '1px solid rgba(180,160,130,0.3)',
          cursor: 'pointer', transition: 'all 0.2s'
        }}
      >
        <span style={{ fontWeight: 600, fontSize: '14px', color: aperta ? '#fff' : '#2C2C2C' }}>
          {categoria}
        </span>
        <span style={{ color: aperta ? '#fff' : '#9A8878', fontSize: '18px', transition: 'transform 0.2s', transform: aperta ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          ▾
        </span>
      </div>

      {aperta && (
        <div style={{ background: '#FDFAF7', border: '1px solid rgba(180,160,130,0.3)', borderTop: 'none', borderRadius: '0 0 10px 10px', overflow: 'hidden' }}>
          {voci.map((v, i) => (
            <div key={i} onClick={() => aggiungiVoce(v)} style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '12px 14px', cursor: 'pointer',
              borderBottom: i < voci.length - 1 ? '1px solid rgba(180,160,130,0.15)' : 'none',
              background: '#FDFAF7', transition: 'background 0.15s'
            }}
              onMouseEnter={e => e.currentTarget.style.background = '#EAF0F0'}
              onMouseLeave={e => e.currentTarget.style.background = '#FDFAF7'}
            >
              <span style={{ fontSize: '22px' }}>{v.emoji}</span>
              <span style={{ flex: 1, fontWeight: 500, fontSize: '14px' }}>{v.nome}</span>
              <span style={{ color: '#2E6B6B', fontWeight: 500, fontSize: '13px' }}>€ {v.prezzo}</span>
              <div style={{ width: '26px', height: '26px', background: '#2E6B6B', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '16px', flexShrink: 0 }}>+</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function MobileCamera({ tavoli, setTavoli, ordini, setOrdini }) {
  const [schermata, setSchermata] = useState('tavoli')
  const [tavoloSel, setTavoloSel] = useState(null)
  const [ordine, setOrdine] = useState([])
  const [messaggio, setMessaggio] = useState('')
  const [successo, setSuccesso] = useState(false)
  const [msgSuccesso, setMsgSuccesso] = useState('')

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
  
  const nuoviTavoli = tavoli.map(t => 
    t.n === tavoloSel.n ? { 
      ...t, 
      stato: 'occupato',
      ordine: ordine.map(x => x.qty > 1 ? `${x.nome} ×${x.qty}` : x.nome)
    } : t
  )
  setTavoli(nuoviTavoli)

  const nuovoOrdine = {
    id: '#' + String(Date.now()).slice(-3),
    tavolo: tavoloSel.n,
    stato: 'preparazione',
    items: ordine.map(x => x.qty > 1 ? `${x.nome} ×${x.qty}` : x.nome).join(', '),
    time: 'adesso',
    total: ordine.reduce((s, x) => s + x.prezzo * x.qty, 0)
  }
  setOrdini([nuovoOrdine, ...ordini])

  setMsgSuccesso('Ordine inviato in cucina!')
  setSuccesso(true)
  setTimeout(() => {
    setOrdine([])
    setSchermata('tavoli')
  }, 2600)
}
  const totale = ordine.reduce((s, x) => s + x.prezzo * x.qty, 0)
  const ordiniCucina = ordini ? ordini.filter(o => o.stato === 'preparazione' || o.stato === 'pronto') : []

  return (
    <div style={{
      width: '100%', maxWidth: '100%', 
      height: '100vh', background: '#F5F0EB', display: 'flex',
      flexDirection: 'column', fontFamily: 'DM Sans, sans-serif',
      position: 'relative', overflow: 'hidden'
    }}>
      {successo && <OrderSuccess messaggio={msgSuccesso} onFinish={() => setSuccesso(false)} />}

      {/* HEADER */}
      <div style={{ background: '#2E6B6B', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
        {schermata !== 'tavoli' && (
          <button onClick={() => setSchermata('tavoli')} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            ←
          </button>
        )}
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', color: '#fff' }}>
            {schermata === 'tavoli' && '🍕 Sangio Bistrot'}
            {schermata === 'ordine' && `Tavolo ${tavoloSel?.n}`}
            {schermata === 'cucina' && '👨‍🍳 Stato Cucina'}
          </div>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)' }}>
            {schermata === 'tavoli' && 'Seleziona un tavolo'}
            {schermata === 'ordine' && "Aggiungi voci all'ordine"}
            {schermata === 'cucina' && 'Ordini in tempo reale'}
          </div>
        </div>
      </div>

      {/* MESSAGGIO */}
      {messaggio && (
        <div style={{ background: '#245858', color: '#fff', padding: '10px 16px', fontSize: '13px', textAlign: 'center', flexShrink: 0 }}>
          {messaggio}
        </div>
      )}

      {/* SCHERMATA TAVOLI */}
      {schermata === 'tavoli' && (
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            {tavoli && tavoli.map(t => {
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
          {ordine.length > 0 && (
            <div style={{ background: '#FDFAF7', borderBottom: '1px solid rgba(180,160,130,0.3)', padding: '12px 16px', flexShrink: 0 }}>
              {ordine.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', fontSize: '13px', padding: '4px 0' }}>
                  <span style={{ flex: 1 }}>{item.emoji} {item.nome}</span>
                  <span style={{ color: '#9A8878', marginRight: '8px' }}>×{item.qty}</span>
                  <span style={{ fontWeight: 500, marginRight: '8px' }}>€{(item.prezzo * item.qty).toFixed(2)}</span>
                  <button onClick={() => rimuoviVoce(item.nome)} style={{ background: '#EDE8E0', border: 'none', color: '#2E6B6B', width: '22px', height: '22px', borderRadius: '50%', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
                </div>
              ))}
              <div style={{ borderTop: '1px solid rgba(180,160,130,0.3)', marginTop: '8px', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', fontWeight: 500, fontSize: '14px' }}>
                <span>Totale</span>
                <span>€ {totale.toFixed(2)}</span>
              </div>
            </div>
          )}
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px' }}>
            {/* Menu veloce con categorie */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px' }}>
               {Object.entries({
                '🍕 Pizze Classiche': menuVeloce.filter(v => ['Margherita','Marinara','Diavola','Capricciosa','4 Stagioni','Bufalina'].includes(v.nome)),
                '⭐ Pizze Speciali': menuVeloce.filter(v => ['Nduja e Stracciatella','Pistacchio e Mortadella'].includes(v.nome)),
                '🍺 Bevande': menuVeloce.filter(v => ['Birra artigianale','Vino della casa','Coca-Cola / Acqua'].includes(v.nome)),
                '🍮 Dolci': menuVeloce.filter(v => ['Tiramisù','Delizia al limone'].includes(v.nome)),
                }).map(([categoria, voci]) => (
                <CategoriaMenu key={categoria} categoria={categoria} voci={voci} aggiungiVoce={aggiungiVoce} />
               ))}
            </div>
          </div>
        </div>
      )}

      {/* SCHERMATA CUCINA */}
      {schermata === 'cucina' && (
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
          {ordiniCucina.length === 0 && (
            <div style={{ textAlign: 'center', color: '#9A8878', marginTop: '40px', fontSize: '14px' }}>
              Nessun ordine in cucina 🍕
            </div>
          )}
          {ordiniCucina.map((o, i) => (
            <div key={i} style={{
              background: '#FDFAF7', border: `2px solid ${o.stato === 'pronto' ? '#A5D6A7' : '#FFE082'}`,
              borderRadius: '12px', padding: '14px', marginBottom: '10px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', fontWeight: 700 }}>Tavolo {o.tavolo}</span>
                <span style={{
                  fontSize: '11px', fontWeight: 500, padding: '4px 10px', borderRadius: '20px',
                  background: o.stato === 'pronto' ? '#E8F5E9' : '#FFF8E1',
                  color: o.stato === 'pronto' ? '#2E7D32' : '#F57F17'
                }}>
                  {o.stato === 'pronto' ? '✅ Pronto' : '⏳ In prep.'}
                </span>
              </div>
              <div style={{ fontSize: '13px', color: '#9A8878' }}>{o.items}</div>
              <div style={{ fontSize: '11px', color: '#9A8878', marginTop: '4px' }}>⏱ {o.time}</div>
            </div>
          ))}
        </div>
      )}

      {/* BOTTOM BAR */}
      <div style={{ background: '#FDFAF7', borderTop: '1px solid rgba(180,160,130,0.3)', padding: '12px 16px', flexShrink: 0 }}>
        {schermata === 'ordine' ? (
          <button onClick={inviaOrdine} style={{
            width: '100%', padding: '14px',
            background: ordine.length > 0 ? '#2E6B6B' : '#ccc',
            color: '#fff', border: 'none', borderRadius: '12px', fontSize: '15px',
            fontWeight: 500, cursor: ordine.length > 0 ? 'pointer' : 'default', fontFamily: 'inherit'
          }}>
            {ordine.length > 0 ? `Invia ordine — € ${totale.toFixed(2)}` : "Aggiungi voci all'ordine"}
          </button>
        ) : (
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => setSchermata('tavoli')} style={{
              flex: 1, padding: '12px', borderRadius: '12px', border: 'none',
              background: schermata === 'tavoli' ? '#2E6B6B' : '#F5F0EB',
              color: schermata === 'tavoli' ? '#fff' : '#9A8878',
              fontSize: '13px', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit'
            }}>🪑 Tavoli</button>
            <button onClick={() => setSchermata('cucina')} style={{
              flex: 1, padding: '12px', borderRadius: '12px', border: 'none',
              background: schermata === 'cucina' ? '#2E6B6B' : '#F5F0EB',
              color: schermata === 'cucina' ? '#fff' : '#9A8878',
              fontSize: '13px', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit'
            }}>👨‍🍳 Cucina</button>
          </div>
        )}
      </div>
    </div>
  )
}