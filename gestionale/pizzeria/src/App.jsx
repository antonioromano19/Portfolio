import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import Tavoli from './components/Tavoli'
import Ordini from './components/Ordini'
import Menu from './components/Menu'
import Cassa from './components/Cassa'
import Statistiche from './components/Statistiche'
import MobileCamera from './components/MobileCamerieri'
import './index.css'

const isMobile = window.innerWidth <= 768

function App() {
  const [paginaAttiva, setPaginaAttiva] = useState('dashboard')

  if (isMobile) {
    return <MobileCamera />
  }

  const renderPagina = () => {
    switch(paginaAttiva) {
      case 'dashboard': return <Dashboard />
      case 'tavoli': return <Tavoli />
      case 'ordini': return <Ordini />
      case 'menu': return <Menu />
      case 'cassa': return <Cassa />
      case 'statistiche': return <Statistiche />
      default: return <Dashboard />
    }
  }

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'DM Sans, sans-serif' }}>
      <Sidebar paginaAttiva={paginaAttiva} setPaginaAttiva={setPaginaAttiva} />
      <main style={{ flex: 1, overflowY: 'auto', background: '#FDF6EC' }}>
        <div style={{ padding: '14px 24px', background: '#FFFDF9', borderBottom: '1px solid rgba(125,90,60,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px' }}>
            {paginaAttiva.charAt(0).toUpperCase() + paginaAttiva.slice(1)}
          </h2>
          <span style={{ fontSize: '12px', color: '#7B5E52' }}>Venerdì, 2 Maggio 2026</span>
        </div>
        {renderPagina()}
      </main>
    </div>
  )
}

export default App