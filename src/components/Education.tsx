function Education() {
  return (
    <section id="education">
      <div className="content-wrapper reveal-zone">
        <h2 className="section-title"><span className="mono-text">02.5</span> Educación</h2>
        <div className="education-grid">
          <div className="glass-panel education-card">
            <span className="mono-text accent">Formación académica</span>
            <h3>TECSUP</h3>
            <p>
              Programa técnico en desarrollo y ingeniería de software, con enfoque en desarrollo de aplicaciones web y móviles, bases de datos, computación en la nube, arquitectura de software y prácticas modernas de desarrollo.
            </p>
          </div>
          <div className="glass-panel education-card">
            <span className="mono-text accent">Aprendizaje continuo</span>
            <h3>Proyectos prácticos y buenas prácticas</h3>
            <p>
              Desarrollo de proyectos con Java, Spring Boot, JavaScript, TypeScript, React, Next.js, Node.js, Kotlin, PostgreSQL, MySQL, AWS y Docker, aplicando metodologías ágiles, Scrum, Git, REST APIs y estándares de ingeniería de software.
            </p>
          </div>
        </div>

        <div className="education-mini-grid single-item">
          <div className="education-mini-item glass-panel">
            <img src="/images/tecsup.avif" alt="TECSUP" />
            <div>
              <span className="mono-text accent">Educación</span>
              <strong>TECSUP</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Education
