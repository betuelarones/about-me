import { useTranslation } from 'react-i18next'

const projectThumbs = ['/profile.jpg', '/profile.jpg', '/profile.jpg']

function Projects() {
  const { t } = useTranslation()
  const projects = t('projects.cards', { returnObjects: true }) as Array<{
    name: string
    description: string
    tech: string[]
    github: string
    demo: string
  }>

  return (
    <section id="projects">
      <div className="content-wrapper reveal-zone">
        <h2 className="section-title"><span className="mono-text">03.</span> {t('projects.title')}</h2>
        <div className="projects-grid">
          {projects.map((proj, index) => (
            <article key={`${proj.name}-${index}`} className="project-card glass-panel">
              <div className="project-image-box">
                <img src={projectThumbs[index % projectThumbs.length]} alt={proj.name} />
                <span className="project-badge mono-text">{index === 0 ? t('projects.featured') : 'Case study'}</span>
              </div>
              <div className="project-content">
                <h3>{proj.name}</h3>
                <p>{proj.description}</p>
                <div className="project-tech-list">
                  {proj.tech.map((tech, techIndex) => (
                    <span key={`${tech}-${techIndex}`} className="tech-pill mono-text">{tech}</span>
                  ))}
                </div>
                <div className="project-links">
                  <a href={proj.github} target="_blank" rel="noreferrer noopener">{t('common.github')}</a>
                  <a href={proj.demo} target="_blank" rel="noreferrer noopener">{t('common.liveDemo')}</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
