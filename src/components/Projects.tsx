const projects = [
  {
    title: 'Simulador Cuántico 3D',
    desc: 'Una aplicación web interactiva que visualiza estados cuánticos en tiempo real utilizando WebGL y aceleración por GPU.',
    tech: ['Three.js', 'React', 'GLSL'],
    featured: true
  },
  {
    title: 'Neural Dashboard',
    desc: 'Panel de control para monitorizar modelos de IA. Incluye gráficos dinámicos y conexiones por WebSockets.',
    tech: ['Vue.js', 'Node.js', 'Socket.io'],
    featured: true
  },
  {
    title: 'E-Commerce 3D',
    desc: 'Plataforma de comercio electrónico con visualización 3D de productos y carrito de compras en tiempo real.',
    tech: ['React', 'Node.js', 'MongoDB'],
    featured: false
  },
  {
    title: 'Mobile Fitness App',
    desc: 'Aplicación móvil para seguimiento de ejercicios con gráficos interactivos y sincronización en la nube.',
    tech: ['Flutter', 'Dart', 'Firebase'],
    featured: false
  }
]

function Projects() {
  return (
    <section id="projects">
      <div className="content-wrapper reveal-zone">
        <h2 className="section-title"><span className="mono-text">03.</span> Proyectos Destacados</h2>
        <div className="projects-grid">
          {projects.map((proj, i) => (
            <div key={i} className="project-card glass-panel">
              <div className="project-content">
                {proj.featured && <span className="mono-text accent">Proyecto Destacado</span>}
                <h3>{proj.title}</h3>
                <p>{proj.desc}</p>
                <ul className="project-tech mono-text">
                  {proj.tech.map((t, j) => <li key={j}>{t}</li>)}
                </ul>
                <div className="project-links">
                  <a href="#">GitHub</a> <a href="#">Live Demo</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
