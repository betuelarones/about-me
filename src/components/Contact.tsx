import { type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'

function Contact() {
  const { t } = useTranslation()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    alert(t('contact.success'))
  }

  return (
    <section id="contact" className="fullscreen">
      <div className="content-wrapper glass-panel reveal-zone text-center">
        <h2 className="section-title"><span className="mono-text">04.</span> {t('contact.title')}</h2>
        <p className="contact-lead">{t('contact.description')}</p>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="name">{t('contact.ariaName')}</label>
          <input id="name" type="text" placeholder={t('contact.name')} required aria-label={t('contact.ariaName')} />
          <label className="sr-only" htmlFor="email">{t('contact.ariaEmail')}</label>
          <input id="email" type="email" placeholder={t('contact.email')} required aria-label={t('contact.ariaEmail')} />
          <label className="sr-only" htmlFor="message">{t('contact.ariaMessage')}</label>
          <textarea id="message" rows={5} placeholder={t('contact.message')} required aria-label={t('contact.ariaMessage')}></textarea>
          <button type="submit" className="btn-primary">{t('common.send')}</button>
        </form>
        <div className="social-links">
          <p className="mono-text social-title">{t('common.findMe')}</p>
          <div className="social-row">
            <a href="https://github.com/betuelarones" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="GitHub">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" />
              <span>GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/betuel-jesus-arones-silva/" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="LinkedIn">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" alt="LinkedIn" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
