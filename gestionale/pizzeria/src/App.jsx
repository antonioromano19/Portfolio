import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import Tavoli from './components/Tavoli'
import Ordini from './components/Ordini'
import Menu from './components/Menu'
import Cassa from './components/Cassa'
import Statistiche from './components/Statistiche'
import './index.css'

function App() {
  const [paginaAttiva, setPaginaAttiva] = useState('dashboard')

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
        {renderPagina()}
      </main>
    </div>
  )
}

export default App