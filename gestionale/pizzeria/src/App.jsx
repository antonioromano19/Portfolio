import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import Tavoli from './components/Tavoli'
import Ordini from './components/Ordini'
import Menu from './components/Menu'
import Cassa from './components/Cassa'
import Statistiche from './components/Statistiche'
import MobileCamera from './components/MobileCamerieri'
import './index.css'
import SplashScreen from './components/SplashScreen'

const isMobile = window.innerWidth <= 768

const tavoli_iniziali = Array.from({ length: 15 }, (_, i) => ({
  n: i + 1,
  stato: ['libero','occupato','libero','occupato','conto','libero','occupato','libero','occupato','libero','occupato','conto','libero','occupato','libero'][i],
  pax: [0,4,0,2,6,0,3,0,2,0,2,4,0,5,0][i],
  ordine: [
    [],['Margherita ×2','4 Stagioni','Tiramisù'],[],['Margherita ×2','Birra ×2'],
    ['Diavola ×2','Capricciosa ×2','Vino ×1'],[],['Diavola','Capricciosa','Acqua'],[],
    ['Bufalina ×2','Birra ×2'],[],['Marinara','Vino'],['Margherita ×3','Tiramisù ×2'],
    [],['4 Stagioni ×3','Coca ×3'],[]
  ][i]
}))

const ordini_iniziali = [
  { id: '#034', tavolo: 2, stato: 'nuovo', items: '4 Stagioni ×2, Tiramisù', time: '1 min', total: 35 },
  { id: '#033', tavolo: 4, stato: 'preparazione', items: 'Margherita ×2, Birra ×2', time: '5 min', total: 28 },
  { id: '#032', tavolo: 7, stato: 'pronto', items: 'Diavola, Capricciosa', time: '12 min', total: 21 },
  { id: '#031', tavolo: 9, stato: 'preparazione', items: 'Bufalina ×2, Birra ×2', time: '8 min', total: 32 },
  { id: '#030', tavolo: 11, stato: 'servito', items: 'Marinara, Vino rosso', time: '22 min', total: 19 },
  { id: '#029', tavolo: 5, stato: 'pronto', items: 'Diavola ×2, Capricciosa ×2', time: '18 min', total: 48 },
  { id: '#028', tavolo: 14, stato: 'preparazione', items: '4 Stagioni ×3, Coca ×3', time: '6 min', total: 42 },
  { id: '#027', tavolo: 12, stato: 'servito', items: 'Margherita ×3, Tiramisù ×2', time: '30 min', total: 51 },
]

function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key)
      return saved ? JSON.parse(saved) : defaultValue
    } catch {
      return defaultValue
    }
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

function App() {
  const [splash, setSplash] = useState(true)
  const [paginaAttiva, setPaginaAttiva] = useState('dashboard')
  const [tavoli, setTavoli] = useLocalStorage('pizzeria_tavoli', tavoli_iniziali)
  const [ordini, setOrdini] = useLocalStorage('pizzeria_ordini', ordini_iniziali)
  const [incassato, setIncassato] = useLocalStorage('pizzeria_incassato', 0)
  const [incassatoSettimana, setIncassatoSettimana] = useLocalStorage('pizzeria_incassato_settimana', 3383)
  const [incassatoMese, setIncassatoMese] = useLocalStorage('pizzeria_incassato_mese', 17693)
  const [pizzeVendute, setPizzeVendute] = useLocalStorage('pizzeria_pizze_vendute', {})

  if (splash) return <SplashScreen onFinish={() => setSplash(false)} />
  if (isMobile) return <MobileCamera tavoli={tavoli} setTavoli={setTavoli} ordini={ordini} setOrdini={setOrdini} />

  const resetDati = () => {
    if (window.confirm('Sei sicuro di voler resettare tutti i dati?')) {
      setTavoli(tavoli_iniziali)
      setOrdini(ordini_iniziali)
      setIncassato(0)
    }
  }

  const renderPagina = () => {
    switch(paginaAttiva) {
      case 'dashboard': return <Dashboard tavoli={tavoli} ordini={ordini} incassato={incassato} incassatoSettimana={incassatoSettimana} incassatoMese={incassatoMese} />
      case 'tavoli': return <Tavoli tavoli={tavoli} setTavoli={setTavoli} />
      case 'ordini': return <Ordini ordini={ordini} setOrdini={setOrdini} />
      case 'menu': return <Menu />
      case 'cassa': return <Cassa tavoli={tavoli} setTavoli={setTavoli} ordini={ordini} setOrdini={setOrdini} incassato={incassato} setIncassato={setIncassato} setIncassatoSettimana={setIncassatoSettimana} setIncassatoMese={setIncassatoMese} incassatoSettimana={incassatoSettimana} incassatoMese={incassatoMese} pizzeVendute={pizzeVendute} setPizzeVendute={setPizzeVendute} />
      case 'statistiche': return <Statistiche incassatoSettimana={incassatoSettimana} incassatoMese={incassatoMese} pizzeVendute={pizzeVendute} />
      default: return <Dashboard tavoli={tavoli} ordini={ordini} incassato={incassato} />
    }
  }

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'DM Sans, sans-serif' }}>
      <Sidebar paginaAttiva={paginaAttiva} setPaginaAttiva={setPaginaAttiva} />
      <main style={{ flex: 1, overflowY: 'auto', background: '#F5F0EB' }}>
        <div style={{ padding: '14px 24px', background: '#FDFAF7', borderBottom: '1px solid rgba(180,160,130,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', color: '#2C2C2C' }}>
            {paginaAttiva.charAt(0).toUpperCase() + paginaAttiva.slice(1)}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '12px', color: '#9A8878' }}>Venerdì, 2 Maggio 2026</span>
            <button onClick={resetDati} style={{ fontSize: '11px', padding: '5px 10px', borderRadius: '6px', border: '1px solid rgba(180,160,130,0.3)', background: '#F5F0EB', cursor: 'pointer', color: '#9A8878', fontFamily: 'inherit' }}>
              🔄 Reset dati
            </button>
          </div>
        </div>
        {renderPagina()}
      </main>
    </div>
  )
}



export default App