import { useEffect, useState } from 'react'

export default function OrderSuccess({ messaggio, onFinish }) {
  const [fase, setFase] = useState('entrata')

  useEffect(() => {
    const t1 = setTimeout(() => setFase('visibile'), 100)
    const t2 = setTimeout(() => setFase('uscita'), 1800)
    const t3 = setTimeout(() => onFinish(), 2600)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(46,107,107,0.92)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      zIndex: 9999, transition: 'opacity 0.6s ease',
      opacity: fase === 'entrata' ? 0 : fase === 'uscita' ? 0 : 1,
    }}>
      <div style={{
        textAlign: 'center',
        transform: fase === 'entrata' ? 'scale(0.8)' : fase === 'uscita' ? 'scale(1.1)' : 'scale(1)',
        transition: 'all 0.5s ease',
      }}>
        <div style={{
          width: '80px', height: '80px', borderRadius: '50%',
          background: '#fff', display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: '40px', margin: '0 auto 20px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
        }}>
          ✅
        </div>
        <div style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '28px', fontWeight: 700,
          color: '#fff', marginBottom: '8px'
        }}>
          {messaggio || 'Ordine eseguito!'}
        </div>
        <div style={{
          fontSize: '14px', color: 'rgba(255,255,255,0.75)',
          letterSpacing: '0.05em'
        }}>
          Sangio Bistrot 🍕
        </div>
      </div>
    </div>
  )
}