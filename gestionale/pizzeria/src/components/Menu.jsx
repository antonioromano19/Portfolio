const menu = {
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

function Menu() {
  return (
    <div style={{ padding: '20px 24px' }}>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <button style={{ padding: '7px 14px', borderRadius: '7px', border: 'none', background: '#C0392B', color: '#fff', fontSize: '12px', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
          + Aggiungi voce
        </button>
        <button style={{ padding: '7px 14px', borderRadius: '7px', border: '1px solid rgba(125,90,60,0.2)', background: '#FFFDF9', fontSize: '12px', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
          Importa da file
        </button>
      </div>

      {Object.entries(menu).map(([categoria, voci]) => (
        <div key={categoria} style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '12px', fontWeight: 500, color: '#7B5E52', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px', paddingBottom: '4px', borderBottom: '1px solid rgba(125,90,60,0.2)' }}>
            {categoria}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {voci.map((p, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '10px 12px', background: '#FDF6EC', borderRadius: '8px', gap: '10px', fontSize: '13px', cursor: 'pointer', border: '1px solid transparent', transition: 'all 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#C0392B'; e.currentTarget.style.background = '#F9EBEA' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.background = '#FDF6EC' }}
              >
                <span style={{ fontSize: '22px' }}>{p.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 500 }}>{p.nome}</div>
                  <div style={{ fontSize: '11px', color: '#7B5E52' }}>{p.desc}</div>
                </div>
                <div style={{ color: '#C0392B', fontWeight: 500 }}>{p.prezzo}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Menu