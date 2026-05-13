
function Hero() {
  return (
    <section id="hero" className="fullscreen">
      <div className="content-wrapper reveal-zone hero-layout">
        <div className="hero-text">
          <h3 className="mono-text accent">Hola, mi nombre es</h3>
          <h1 className="mega-title">Betuel.</h1>
          <h1 className="mega-title subtitle">Construyo experiencias<br/><span className="mega-title">digitales.</span></h1>
          <p className="hero-desc">
            Soy un Desarrollador Fullstack especializado en crear aplicaciones web robustas y escalables, combinando backend eficiente con interfaces modernas y experiencias de usuario excepcionales.
          </p>
          <div className="hero-buttons">
            <a href="#projects" className="btn-primary">Explorar Sistema</a>
            <a href="/CV-Betuel.pdf" className="btn-primary" download="CV-Betuel.pdf">⬇️ Descargar CV</a>
          </div>
        </div>
          <div className="hero-image">
          <img src="/profile.jpg" alt="Betuel" className="profile-photo" />
        </div>
      </div>
    </section>
  )
}

export default Hero
