import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const CORE = '{CORE}'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { t, i18n } = useTranslation()

  return (
    <nav className="hud-nav" aria-label="Main navigation">
      <div className="logo" aria-label="Betuel home">DEV_<span>{CORE}</span></div>

      <button
        type="button"
        className={`hamburger ${menuOpen ? 'active' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <li><a href="#about" onClick={() => setMenuOpen(false)}>{t('nav.about')}</a></li>
        <li><a href="#experience" onClick={() => setMenuOpen(false)}>{t('nav.experience')}</a></li>
        <li><a href="#projects" onClick={() => setMenuOpen(false)}>{t('nav.projects')}</a></li>
        <li><a href="#contact" onClick={() => setMenuOpen(false)}>{t('nav.contact')}</a></li>
      </ul>

      <div className="nav-actions">
        <div className="language-selector" aria-label={t('common.language')}>
          <button
            type="button"
            className={i18n.language === 'es' ? 'active' : ''}
            onClick={() => i18n.changeLanguage('es')}
            aria-label="Cambiar a español"
          >
            ES
          </button>
          <button
            type="button"
            className={i18n.language === 'en' ? 'active' : ''}
            onClick={() => i18n.changeLanguage('en')}
            aria-label="Switch to English"
          >
            EN
          </button>
        </div>
        <div className="status">{t('common.status')}: <span className="blink">{t('common.online')}</span></div>
      </div>
    </nav>
  )
}

export default Navbar
