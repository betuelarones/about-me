import { useTranslation } from 'react-i18next'

function Stats() {
  const { t } = useTranslation()
  
  return (
    <section id="stats">
      <div className="content-wrapper reveal-zone">
        <div className="stats-grid">
          <div className="stat-box">
            <h3>+5</h3>
            <p>{t('stats.years')}</p>
          </div>
          <div className="stat-box">
            <h3>+4</h3>
            <p>{t('stats.stacks')}</p>
          </div>
          <div className="stat-box">
            <h3>100%</h3>
            <p>{t('stats.ownership')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Stats
