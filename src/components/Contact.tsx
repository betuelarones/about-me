function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Mensaje enviado correctamente!')
  }

  return (
    <section id="contact" className="fullscreen">
      <div className="content-wrapper glass-panel reveal-zone text-center">
        <h2 className="section-title"><span className="mono-text">04.</span> ¿Iniciamos un proyecto?</h2>
        <p style={{ marginBottom: '30px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
          Mi bandeja de entrada está abierta. Ya sea que tengas una pregunta o simplemente quieras saludar, ¡haré todo lo posible para responderte!
        </p>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Nombre de usuario" required />
          <input type="email" placeholder="Email de enlace" required />
          <textarea rows={5} placeholder="Cuerpo del mensaje..." required></textarea>
          <button type="submit" className="btn-primary">Enviar Transmisión</button>
        </form>
        <div className="social-links" style={{ marginTop: '40px', paddingTop: '30px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <p className="mono-text" style={{ color: 'var(--text-muted)', marginBottom: '20px', fontSize: '0.9rem' }}>ENCUÉNTRAME EN</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '30px' }}>
            <a href="https://github.com/betuelarones" target="_blank" rel="noopener noreferrer" className="social-icon-link">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" style={{ width: '32px', height: '32px', filter: 'invert(1)' }} />
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px', display: 'block' }}>GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/betuel-jesus-arones-silva/" target="_blank" rel="noopener noreferrer" className="social-icon-link">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" alt="LinkedIn" style={{ width: '32px', height: '32px' }} />
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px', display: 'block' }}>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
