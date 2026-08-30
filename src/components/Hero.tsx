import { useTranslation } from 'react-i18next'

const cvFileUrl = '/CV_Betuel_Arones_Silva.pdf'
const cvDownloadName = 'Betuel-CV.pdf'

function Hero() {
  const { t } = useTranslation()

  return (
    <section id="hero" className="fullscreen">
      <div className="content-wrapper reveal-zone hero-layout">
        <div className="hero-text">
          <p className="mono-text accent hero-kicker">{t('hero.eyebrow')}</p>
          <h1 className="mega-title">{t('hero.name')}</h1>
          <h2 className="mega-title subtitle">{t('hero.headline')}</h2>
          <p className="hero-specialty mono-text">{t('hero.specialty')}</p>
          <p className="hero-desc">{t('hero.description')}</p>
          <div className="hero-buttons">
            <a href="#projects" className="btn-primary">{t('common.viewProjects')}</a>
            <a href="#contact" className="btn-secondary">{t('common.contactMe')}</a>
            <a href={cvFileUrl} className="btn-primary" download={cvDownloadName}>{t('common.downloadCv')}</a>
          </div>
        </div>
        <div className="hero-image">
          <img src="/profile.jpg" alt="Betuel Arones Silva" className="profile-photo" />
        </div>
      </div>
    </section>
  )
}

export default Hero
