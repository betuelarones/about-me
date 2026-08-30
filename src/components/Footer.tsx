import { useTranslation } from 'react-i18next'

function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="site-footer">
      <div className="content-wrapper footer-inner">
        <p>{t('footer.copyright')}</p>
        <p className="mono-text accent">{t('common.footerNote')}</p>
      </div>
    </footer>
  )
}

export default Footer
