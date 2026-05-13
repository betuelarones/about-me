import { useEffect, useState } from 'react'

function Preloader() {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 10) + 5
        if (next >= 100) {
          clearInterval(interval)
          setTimeout(() => setVisible(false), 800)
          return 100
        }
        return next
      })
    }, 100)
    return () => clearInterval(interval)
  }, [])

  if (!visible) return null

  return (
    <div id="preloader" style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      background: '#030305', zIndex: 9999,
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
      opacity: progress >= 100 ? 0 : 1,
      transition: 'opacity 0.8s ease'
    }}>
      <div className="loader-text" style={{
        fontFamily: "'JetBrains Mono', monospace",
        color: '#00ffcc', marginBottom: '20px', fontSize: '1.2rem'
      }}>
        INICIANDO ENTORNO VIRTUAL... <span>{progress}%</span>
      </div>
      <div className="loader-bar" style={{ width: '300px', height: '2px', background: '#222' }}>
        <div style={{
          height: '100%', background: '#00ffcc', width: `${progress}%`,
          boxShadow: '0 0 10px rgba(0, 255, 204, 0.3)'
        }}></div>
      </div>
    </div>
  )
}

export default Preloader
