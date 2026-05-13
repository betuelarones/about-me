import { useState } from 'react'

const CORE = '{CORE}'
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="hud-nav">
      <div className="logo">DEV_<span>{CORE}</span></div>

      <button
        className={`hamburger ${menuOpen ? 'active' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <li><a href="#about" onClick={() => setMenuOpen(false)}>01. Sobre Mí</a></li>
        <li><a href="#experience" onClick={() => setMenuOpen(false)}>02. Experiencia</a></li>
        <li><a href="#projects" onClick={() => setMenuOpen(false)}>03. Proyectos</a></li>
        <li><a href="#contact" onClick={() => setMenuOpen(false)}>04. Contacto</a></li>
      </ul>

      <div className="status">STATUS: <span className="blink">ONLINE</span></div>
    </nav>
  )
}

export default Navbar
