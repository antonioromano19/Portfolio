import { useEffect, useState } from 'react'

export default function SplashScreen({ onFinish }) {
  const [fase, setFase] = useState('entrata')

  useEffect(() => {
    const t1 = setTimeout(() => setFase('nome'), 600)
    const t2 = setTimeout(() => setFase('uscita'), 2200)
    const t3 = setTimeout(() => onFinish(), 3000)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  return (
    <div style={{
      position: 'fixed', inset: 0, background: '#2E6B6B',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      zIndex: 9999, transition: 'opacity 0.8s ease',
      opacity: fase === 'uscita' ? 0 : 1,
    }}>
      <div style={{
        textAlign: 'center',
        transform: fase === 'entrata' ? 'translateY(20px)' : 'translateY(0)',
        opacity: fase === 'entrata' ? 0 : 1,
        transition: 'all 0.8s ease',
      }}>
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>🍕</div>
        <div style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '42px', fontWeight: 700,
          color: '#fff', letterSpacing: '0.02em',
          marginBottom: '8px'
        }}>
          Sangio Bistrot
        </div>
        <div style={{
          fontSize: '14px', color: 'rgba(255,255,255,0.6)',
          letterSpacing: '0.15em', textTransform: 'uppercase'
        }}>
          Gestionale Pizzeria
        </div>
        <div style={{
          marginTop: '40px', display: 'flex', gap: '8px', justifyContent: 'center'
        }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.4)',
              animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
            }} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  )
}