const experiences = [
  {
    period: '2024 - Presente',
    title: 'Senior Fullstack Engineer',
    company: 'Tech Global Corp',
    desc: 'Lidero el desarrollo de interfaces 3D para visualización de datos masivos. Reducción del tiempo de carga en un 40% mediante optimización de shaders.'
  },
  {
    period: '2021 - 2024',
    title: 'Fullstack Developer',
    company: 'Creative Agency',
    desc: 'Desarrollo de e-commerce interactivos y plataformas SaaS utilizando React, Node.js y bases de datos PostgreSQL.'
  }
]

function Experience() {
  return (
    <section id="experience">
      <div className="content-wrapper reveal-zone">
        <h2 className="section-title"><span className="mono-text">02.</span> Trayectoria</h2>
        <div className="timeline">
          {experiences.map((exp, i) => (
            <div key={i} className="timeline-item glass-panel">
              <div className="timeline-dot"></div>
              <span className="mono-text accent">{exp.period}</span>
              <h3>{exp.title}</h3>
              <h4>{exp.company}</h4>
              <p>{exp.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
