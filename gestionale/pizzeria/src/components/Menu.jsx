import { useState } from 'react'

const menu_iniziale = {
  'Pizze Classiche': [
    { emoji: '🍕', nome: 'Margherita', desc: 'Pomodoro, mozzarella, basilico', prezzo: '€ 9' },
    { emoji: '🍕', nome: 'Marinara', desc: 'Pomodoro, aglio, origano', prezzo: '€ 7' },
    { emoji: '🍕', nome: 'Diavola', desc: 'Pomodoro, mozzarella, salame piccante', prezzo: '€ 11' },
    { emoji: '🍕', nome: 'Capricciosa', desc: 'Funghi, prosciutto, carciofi, olive', prezzo: '€ 12' },
    { emoji: '🍕', nome: '4 Stagioni', desc: 'Quattro gusti in uno', prezzo: '€ 13' },
    { emoji: '🍕', nome: 'Bufalina', desc: 'Pomodoro, mozzarella di bufala DOP', prezzo: '€ 14' },
  ],
  'Pizze Speciali': [
    { emoji: '⭐', nome: 'Nduja e Stracciatella', desc: 'Piccante calabrese, stracciatella, miele', prezzo: '€ 15' },
    { emoji: '⭐', nome: 'Pistacchio e Mortadella', desc: 'Crema di pistacchio, mortadella IGP', prezzo: '€ 16' },
    { emoji: '⭐', nome: 'Porcini e Salsiccia', desc: 'Crema di porcini, salsiccia, scamorza', prezzo: '€ 15' },
  ],
  'Bevande': [
    { emoji: '🍺', nome: 'Birra artigianale', desc: 'Chiara, rossa o scura', prezzo: '€ 5' },
    { emoji: '🍷', nome: 'Vino della casa', desc: 'Rosso o bianco, calice o bottiglia', prezzo: '€ 4' },
    { emoji: '🥤', nome: 'Coca-Cola / Acqua', desc: '', prezzo: '€ 2,50' },
  ],
  'Dolci': [
    { emoji: '🍮', nome: 'Tiramisù', desc: 'Ricetta della nonna', prezzo: '€ 5' },
    { emoji: '🍋', nome: 'Delizia al limone', desc: 'Dolce napoletano al limone', prezzo: '€ 5' },
  ],
}

const categorie = ['Pizze Classiche', 'Pizze Speciali', 'Bevande', 'Dolci']
const emoji_opzioni = ['🍕', '⭐', '🍺', '🍷', '🥤', '🍮', '🍋', '🥗', '🍗', '🧀']

function Menu() {
  const [menu, setMenu] = useState(() => {
    try {
      const saved = localStorage.getItem('pizzeria_menu')
      return saved ? JSON.parse(saved) : menu_iniziale
    } catch { return menu_iniziale }
  })

  const [mostraForm, setMostraForm] = useState(false)
  const [nuova, setNuova] = useState({ nome: '', desc: '', prezzo: '', categoria: 'Pizze Classiche', emoji: '🍕' })
  const [errore, setErrore] = useState('')

  const salvaMenu = (nuovoMenu) => {
    setMenu(nuovoMenu)
    localStorage.setItem('pizzeria_menu', JSON.stringify(nuovoMenu))
  }

  const aggiungiVoce = () => {
    if (!nuova.nome.trim()) { setErrore('Inserisci il nome della pizza!'); return }
    if (!nuova.prezzo.trim()) { setErrore('Inserisci il prezzo!'); return }
    setErrore('')
    const nuovoMenu = { ...menu }
    if (!nuovoMenu[nuova.categoria]) nuovoMenu[nuova.categoria] = []
    nuovoMenu[nuova.categoria] = [...nuovoMenu[nuova.categoria], {
      emoji: nuova.emoji,
      nome: nuova.nome,
      desc: nuova.desc,
      prezzo: nuova.prezzo.startsWith('€') ? nuova.prezzo : `€ ${nuova.prezzo}`
    }]
    salvaMenu(nuovoMenu)
    setNuova({ nome: '', desc: '', prezzo: '', categoria: 'Pizze Classiche', emoji: '🍕' })
    setMostraForm(false)
  }

  const eliminaVoce = (categoria, idx) => {
    if (!window.confirm('Eliminare questa voce dal menu?')) return
    const nuovoMenu = { ...menu }
    nuovoMenu[categoria] = nuovoMenu[categoria].filter((_, i) => i !== idx)
    salvaMenu(nuovoMenu)
  }

  return (
    <div style={{ padding: '20px 24px' }}>

      {/* BOTTONI AZIONE */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        <button
          onClick={() => setMostraForm(!mostraForm)}
          style={{ padding: '8px 16px', borderRadius: '7px', border: 'none', background: '#2E6B6B', color: '#fff', fontSize: '13px', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}
        >
          {mostraForm ? '✕ Annulla' : '+ Aggiungi voce'}
        </button>
        <button
          onClick={() => { if (window.confirm('Ripristinare il menu originale?')) salvaMenu(menu_iniziale) }}
          style={{ padding: '8px 16px', borderRadius: '7px', border: '1px solid rgba(180,160,130,0.3)', background: '#F5F0EB', fontSize: '13px', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', color: '#9A8878' }}
        >
          🔄 Ripristina originale
        </button>
      </div>

      {/* FORM AGGIUNTA */}
      {mostraForm && (
        <div style={{ background: '#FDFAF7', border: '2px solid #2E6B6B', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
          <div style={{ fontWeight: 500, marginBottom: '16px', fontSize: '15px' }}>➕ Nuova voce menu</div>

          {errore && <div style={{ background: '#F3E5F5', color: '#6A1B9A', padding: '8px 12px', borderRadius: '6px', fontSize: '13px', marginBottom: '12px' }}>{errore}</div>}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
            <div>
              <div style={{ fontSize: '12px', color: '#9A8878', marginBottom: '4px' }}>Categoria</div>
              <select value={nuova.categoria} onChange={e => setNuova({ ...nuova, categoria: e.target.value })}
                style={{ width: '100%', padding: '8px 10px', borderRadius: '7px', border: '1px solid rgba(180,160,130,0.3)', background: '#F5F0EB', fontFamily: 'inherit', fontSize: '13px' }}>
                {categorie.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#9A8878', marginBottom: '4px' }}>Emoji</div>
              <select value={nuova.emoji} onChange={e => setNuova({ ...nuova, emoji: e.target.value })}
                style={{ width: '100%', padding: '8px 10px', borderRadius: '7px', border: '1px solid rgba(180,160,130,0.3)', background: '#F5F0EB', fontFamily: 'inherit', fontSize: '13px' }}>
                {emoji_opzioni.map(e => <option key={e} value={e}>{e}</option>)}
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '12px' }}>
            <div style={{ fontSize: '12px', color: '#9A8878', marginBottom: '4px' }}>Nome *</div>
            <input value={nuova.nome} onChange={e => setNuova({ ...nuova, nome: e.target.value })}
              placeholder="es. Bufala e Pistacchio"
              style={{ width: '100%', padding: '8px 10px', borderRadius: '7px', border: '1px solid rgba(180,160,130,0.3)', background: '#F5F0EB', fontFamily: 'inherit', fontSize: '13px' }} />
          </div>

          <div style={{ marginBottom: '12px' }}>
            <div style={{ fontSize: '12px', color: '#9A8878', marginBottom: '4px' }}>Descrizione</div>
            <input value={nuova.desc} onChange={e => setNuova({ ...nuova, desc: e.target.value })}
              placeholder="es. Mozzarella di bufala, crema di pistacchio"
              style={{ width: '100%', padding: '8px 10px', borderRadius: '7px', border: '1px solid rgba(180,160,130,0.3)', background: '#F5F0EB', fontFamily: 'inherit', fontSize: '13px' }} />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '12px', color: '#9A8878', marginBottom: '4px' }}>Prezzo * (es. 12 oppure € 12)</div>
            <input value={nuova.prezzo} onChange={e => setNuova({ ...nuova, prezzo: e.target.value })}
              placeholder="€ 12"
              style={{ width: '200px', padding: '8px 10px', borderRadius: '7px', border: '1px solid rgba(180,160,130,0.3)', background: '#F5F0EB', fontFamily: 'inherit', fontSize: '13px' }} />
          </div>

          <button onClick={aggiungiVoce}
            style={{ padding: '10px 24px', background: '#2E6B6B', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
            ✓ Aggiungi al menu
          </button>
        </div>
      )}

      {/* MENU */}
      {Object.entries(menu).map(([categoria, voci]) => (
        <div key={categoria} style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '12px', fontWeight: 500, color: '#9A8878', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px', paddingBottom: '4px', borderBottom: '1px solid rgba(180,160,130,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {categoria}
            <span style={{ fontSize: '11px', color: 'rgba(180,160,130,0.6)' }}>{voci.length} voci</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {voci.map((p, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '10px 12px', background: '#F5F0EB', borderRadius: '8px', gap: '10px', fontSize: '13px', border: '1px solid transparent', transition: 'all 0.15s', position: 'relative' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#2E6B6B'; e.currentTarget.style.background = '#EAF0F0' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.background = '#F5F0EB' }}
              >
                <span style={{ fontSize: '22px' }}>{p.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 500 }}>{p.nome}</div>
                  <div style={{ fontSize: '11px', color: '#9A8878' }}>{p.desc}</div>
                </div>
                <div style={{ color: '#2E6B6B', fontWeight: 500 }}>{p.prezzo}</div>
                <button onClick={() => eliminaVoce(categoria, i)}
                  style={{ position: 'absolute', top: '6px', right: '6px', background: 'rgba(180,160,130,0.2)', border: 'none', borderRadius: '50%', width: '18px', height: '18px', cursor: 'pointer', fontSize: '10px', color: '#9A8878', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.opacity = 1}
                  onMouseLeave={e => e.currentTarget.style.opacity = 0}
                >×</button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Menu