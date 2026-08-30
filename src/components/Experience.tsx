import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

type ExperienceItem = {
  organization: string
  role: string
  dates: string
  description: string
  technologies: string[]
  softSkills: string[]
  badge: string
  current?: boolean
  image: string
  category: string
}

type BookPage =
  | { kind: 'cover'; id: string }
  | { kind: 'experience'; id: string; item: ExperienceItem; index: number }
  | { kind: 'backcover'; id: string }

function Experience() {
  const { t } = useTranslation()
  const items = useMemo(
    () => (t('experience.items', { returnObjects: true }) ?? []) as ExperienceItem[],
    [t, t('experience.items')]
  )

  const pages = useMemo<BookPage[]>(() => {
    const all: BookPage[] = [{ kind: 'cover', id: 'cover' }]
    items.forEach((item, index) => {
      all.push({ kind: 'experience', id: `exp-${item.organization}-${index}`, item, index })
    })
    all.push({ kind: 'backcover', id: 'backcover' })
    return all
  }, [items])

  const [currentPage, setCurrentPage] = useState(0)
  const [selectedItem, setSelectedItem] = useState<ExperienceItem | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState<1 | -1>(1)
  const touchStartX = useRef<number | null>(null)
  const prefersReducedMotion = useRef(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => {
      prefersReducedMotion.current = mediaQuery.matches
    }

    updatePreference()
    mediaQuery.addEventListener?.('change', updatePreference)

    return () => mediaQuery.removeEventListener?.('change', updatePreference)
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedItem(null)
      if (event.key === 'ArrowRight') handlePageChange(currentPage + 1)
      if (event.key === 'ArrowLeft') handlePageChange(currentPage - 1)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentPage, isAnimating])

  const handlePageChange = (nextPage: number) => {
    if (isAnimating || nextPage < 0 || nextPage >= pages.length) return

    setDirection(nextPage > currentPage ? 1 : -1)
    setIsAnimating(true)

    const duration = prefersReducedMotion.current ? 180 : 700

    window.setTimeout(() => {
      setCurrentPage(nextPage)
      window.setTimeout(() => setIsAnimating(false), 80)
    }, duration / 2)
  }

  const currentPageData = pages[currentPage]
  const experienceProgressIndex = currentPageData.kind === 'experience'
    ? String(currentPage).padStart(2, '0')
    : '00'

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0].clientX
  }

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return
    const diff = event.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(diff) > 45) {
      handlePageChange(diff < 0 ? currentPage + 1 : currentPage - 1)
    }
    touchStartX.current = null
  }

  const renderCoverPage = () => (
    <div className="experience-book-page experience-book-cover">
      <div className="experience-book-cover-inner">
        <span className="mono-text experience-cover-kicker">{t('experience.cover.kicker')}</span>
        <div className="experience-cover-title-wrap">
          <h3>{t('experience.cover.title')}</h3>
          <p>{t('experience.cover.subtitle')}</p>
        </div>
        <div className="experience-cover-signature">
          <span>{t('experience.cover.name')}</span>
        </div>
        <div className="experience-cover-footer">
          <span>{t('experience.cover.meta')}</span>
        </div>
      </div>
    </div>
  )

  const renderExperiencePage = (item: ExperienceItem, index: number) => (
    <div className="experience-book-page experience-book-content">
      <div className="experience-book-spine" aria-hidden="true" />

      <div className="experience-book-page-header">
        <span className="mono-text experience-page-label">{t('experience.pageLabel')} {String(index + 1).padStart(2, '0')}</span>
        <div className="experience-brand-mark">
          <img src={item.image} alt={item.organization} />
        </div>
      </div>

      <div className="experience-book-page-body">
        <div className="experience-book-topline">
          <span className="mono-text accent">{item.category}</span>
          {item.current ? <span className="experience-current-pill">{t('experience.currentBadge')}</span> : null}
        </div>

        <h3>{item.role}</h3>
        <h4>{item.organization}</h4>

        <div className="experience-book-divider" />

        <div className="experience-book-summary">
          <p>{item.description}</p>
        </div>

        <div className="experience-book-section">
          <span className="section-mini-label">{t('experience.technologies')}</span>
          <div className="experience-page-tags">
            {item.technologies.slice(0, 4).map((tech) => (
              <span key={`${item.organization}-${tech}`}>{tech}</span>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="experience-detail-button"
          onClick={() => setSelectedItem(item)}
        >
          {t('experience.viewMore')}
        </button>
      </div>

      <div className="experience-book-footer">
        <span>{String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
        <span>{item.dates || '—'}</span>
      </div>
    </div>
  )

  const renderBackCoverPage = () => (
    <div className="experience-book-page experience-book-backcover">
      <div className="experience-book-backcover-content">
        <span className="mono-text experience-cover-kicker">{t('experience.backcover.kicker')}</span>
        <h3>{t('experience.backcover.title')}</h3>
        <p>{t('experience.backcover.description')}</p>
        <div className="experience-book-divider" />
        <div className="experience-cover-footer">
          <span>{t('experience.cover.meta')}</span>
        </div>
      </div>
    </div>
  )

  const renderCurrentPage = () => {
    if (currentPageData.kind === 'cover') return renderCoverPage()
    if (currentPageData.kind === 'backcover') return renderBackCoverPage()
    return renderExperiencePage(currentPageData.item, currentPageData.index)
  }

  return (
    <section id="experience">
      <div className="content-wrapper reveal-zone">
        <h2 className="section-title">
          <span className="mono-text">02.</span> {t('experience.title')}
        </h2>

        <div className="experience-book-shell">
          <div className="experience-book-frame">
            <div
              className={`experience-book-viewport ${isAnimating ? 'is-animating' : ''} ${direction === 1 ? 'turn-next' : 'turn-prev'}`}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div className="experience-book-shadow" aria-hidden="true" />
              {renderCurrentPage()}
            </div>
          </div>

          <div className="experience-book-controls" aria-label={t('experience.navigationLabel')}>
            <button
              type="button"
              className="experience-nav-button"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0 || isAnimating}
              aria-label={t('experience.previous')}
            >
              ← {t('experience.previous')}
            </button>

            <div className="experience-progress-indicator" aria-live="polite">
              {pages.slice(1, -1).map((_, index: number) => {
                const isActive = currentPageData.kind === 'experience' && currentPageData.index === index
                return (
                  <button
                    key={`progress-${index}`}
                    type="button"
                    className={isActive ? 'active' : ''}
                    onClick={() => handlePageChange(index + 1)}
                    aria-label={`${t('experience.page')} ${index + 1}`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </button>
                )
              })}
            </div>

            <button
              type="button"
              className="experience-nav-button"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === pages.length - 1 || isAnimating}
              aria-label={t('experience.next')}
            >
              {t('experience.next')} →
            </button>
          </div>

          <div className="experience-book-footer-status">
            <span>{experienceProgressIndex} / {String(items.length).padStart(2, '0')}</span>
          </div>
        </div>
      </div>

      {selectedItem ? (
        <div className="experience-modal-backdrop" onClick={() => setSelectedItem(null)}>
          <div
            className="experience-modal"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={selectedItem.organization}
          >
            <button
              type="button"
              className="experience-modal-close"
              onClick={() => setSelectedItem(null)}
              aria-label="Cerrar detalle"
            >
              ×
            </button>

            <div className="experience-modal-header">
              <div className="experience-mini-logo large">
                <img src={selectedItem.image} alt={selectedItem.organization} />
              </div>

              <div>
                <span className="experience-role-category">{selectedItem.category}</span>
                <h3>{selectedItem.role}</h3>
                <h4>{selectedItem.organization}</h4>
              </div>
            </div>

            <div className="experience-modal-meta">
              <span>{selectedItem.dates || '—'}</span>
              {selectedItem.current ? <span>{t('experience.currentBadge')}</span> : null}
            </div>

            <div className="experience-modal-section">
              <h5>{t('experience.about')}</h5>
              <p>{selectedItem.description}</p>
            </div>

            {selectedItem.technologies.length > 0 ? (
              <div className="experience-modal-section">
                <h5>{t('experience.technologies')}</h5>
                <div className="experience-page-tags">
                  {selectedItem.technologies.map((tech) => (
                    <span key={`${selectedItem.organization}-${tech}`}>{tech}</span>
                  ))}
                </div>
              </div>
            ) : null}

            {selectedItem.softSkills.length > 0 ? (
              <div className="experience-modal-section">
                <h5>{t('experience.softSkills')}</h5>
                <div className="experience-page-tags muted">
                  {selectedItem.softSkills.map((skill) => (
                    <span key={`${selectedItem.organization}-${skill}`}>{skill}</span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </section>
  )
}

export default Experience
