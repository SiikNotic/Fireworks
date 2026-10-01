"use client";

import { FormEvent, useEffect, useState } from "react";

type Language = "en" | "es";
type Modal = "job" | "account" | null;

const copy = {
  en: {
    nav: ["How it works", "Find work", "Services"],
    login: "Log in", start: "Get started", eyebrow: "Trusted local help, without the hassle",
    heroA: "Get the right person", heroB: "for the job.",
    heroText: "Post what you need. Compare real offers. Chat, schedule, and pay securely — all in one place.",
    post: "Post a job", browse: "Browse jobs", rating: "from 12,000+ completed jobs",
    accepted: "Job accepted", acceptedSub: "Maria accepted your offer", protected: "Payment protected",
    protectedSub: "Released after the job is done", open: "Open for offers", compare: "Compare 6 offers", verified: "Verified",
    ticker: ["Verified professionals", "Secure payments", "In-app messaging", "No hidden fees", "English & Spanish"],
    services: "Explore services", servicesTitleA: "Whatever you need,", servicesTitleB: "there’s someone for it.",
    allServices: "View all services", professional: "For professionals", workA: "Work that fits", workB: "your schedule.", findJobs: "Find jobs",
    simple: "Simple by design", howA: "From “I need help”", howB: "to “done.”",
    howText: "Every step is designed to keep both sides in control — clear offers, clear expectations, clear payments.",
    steps: [["Describe it", "Tell us what you need, when, and where."], ["Compare offers", "Review prices, profiles, ratings, and availability."], ["Get it done", "Chat, schedule, pay, and review — all inside Jobzapp."]],
    ready: "Ready when you are", ctaA: "Your next job starts", ctaB: "here.",
    ctaText: "Join customers and professionals getting more done with one simple marketplace.", account: "Create your free account",
    footer: ["Privacy", "Terms", "Help"], modalJob: "Post a job", modalAccount: "Create your account",
    titleLabel: "What do you need?", locationLabel: "Where?", budgetLabel: "Budget", emailLabel: "Email",
    titlePlaceholder: "e.g. Fix a leaking faucet", locationPlaceholder: "City or ZIP code", budgetPlaceholder: "$100",
    emailPlaceholder: "you@example.com", continue: "Continue", cancel: "Cancel",
    saved: "Saved locally — connect your account to publish this job.", accountText: "This foundation is ready for authentication and the marketplace backend.",
    professionalNote: "Looking for work? Browse the current marketplace preview and connect your professional profile next."
  },
  es: {
    nav: ["Cómo funciona", "Buscar trabajo", "Servicios"], login: "Iniciar sesión", start: "Comenzar",
    eyebrow: "Ayuda local confiable, sin complicaciones", heroA: "Encuentra a la persona", heroB: "correcta para el trabajo.",
    heroText: "Publica lo que necesitas. Compara ofertas reales. Chatea, programa y paga de forma segura — todo en un solo lugar.",
    post: "Publicar trabajo", browse: "Buscar trabajos", rating: "de más de 12,000 trabajos completados", accepted: "Trabajo aceptado",
    acceptedSub: "María aceptó tu oferta", protected: "Pago protegido", protectedSub: "Se libera cuando termina el trabajo",
    open: "Aceptando ofertas", compare: "Comparar 6 ofertas", verified: "Verificado",
    ticker: ["Profesionales verificados", "Pagos seguros", "Mensajes en la app", "Sin cargos ocultos", "Inglés y español"],
    services: "Explora servicios", servicesTitleA: "Lo que necesites,", servicesTitleB: "hay alguien para hacerlo.",
    allServices: "Ver todos los servicios", professional: "Para profesionales", workA: "Trabajo que se adapta a", workB: "tu horario.", findJobs: "Buscar trabajos",
    simple: "Diseñado para ser simple", howA: "De “necesito ayuda”", howB: "a “listo.”",
    howText: "Cada paso mantiene a ambas partes en control: ofertas claras, expectativas claras y pagos claros.",
    steps: [["Descríbelo", "Dinos qué necesitas, cuándo y dónde."], ["Compara ofertas", "Revisa precios, perfiles, calificaciones y disponibilidad."], ["Hazlo realidad", "Chatea, programa, paga y deja tu reseña dentro de Jobzapp."]],
    ready: "Listo cuando tú lo estés", ctaA: "Tu próximo trabajo comienza", ctaB: "aquí.",
    ctaText: "Únete a clientes y profesionales que hacen más con un solo marketplace.", account: "Crear cuenta gratis",
    footer: ["Privacidad", "Términos", "Ayuda"], modalJob: "Publicar trabajo", modalAccount: "Crear tu cuenta",
    titleLabel: "¿Qué necesitas?", locationLabel: "¿Dónde?", budgetLabel: "Presupuesto", emailLabel: "Correo electrónico",
    titlePlaceholder: "Ej. Reparar una llave que gotea", locationPlaceholder: "Ciudad o código postal", budgetPlaceholder: "$100",
    emailPlaceholder: "tu@ejemplo.com", continue: "Continuar", cancel: "Cancelar",
    saved: "Guardado localmente — conecta tu cuenta para publicar este trabajo.", accountText: "Esta base está lista para autenticación y el backend del marketplace.",
    professionalNote: "¿Buscas trabajo? Explora el marketplace y conecta tu perfil profesional en el siguiente paso."
  }
} as const;

const categories = [["🔧","Home repairs","2.4k pros"],["🧹","Cleaning","1.8k pros"],["🚚","Moving","940 pros"],["🎨","Painting","760 pros"],["🌿","Lawn & garden","620 pros"],["💻","Tech help","510 pros"]];
const jobs = [["Fix a leaking kitchen faucet","Center City","$80–$140","Today","Plumbing","JR"],["Deep clean a 2-bedroom apartment","Fishtown","$120–$180","Tomorrow","Cleaning","AM"],["Mount TV + hide cables","University City","$90–$150","This week","Handyman","SK"]];

function Arrow(){ return <span aria-hidden="true">↗</span>; }

export default function Home(){
  const [language,setLanguage]=useState<Language>("en");
  const [menuOpen,setMenuOpen]=useState(false);
  const [modal,setModal]=useState<Modal>(null);
  const t=copy[language];

  useEffect(()=>{ document.documentElement.lang=language; },[language]);

  function submitJob(e:FormEvent<HTMLFormElement>){
    e.preventDefault();
    const data=new FormData(e.currentTarget);
    localStorage.setItem("jobzapp-draft-job",JSON.stringify(Object.fromEntries(data.entries())));
    setModal("account");
  }

  return <main>
    <nav className="nav shell">
      <a className="brand" href="#top" onClick={()=>setMenuOpen(false)}><span className="brandMark">J</span><span>jobzapp</span></a>
      <div className={`navLinks ${menuOpen?"navLinksOpen":""}`}>
        <a href="#how" onClick={()=>setMenuOpen(false)}>{t.nav[0]}</a><a href="#jobs" onClick={()=>setMenuOpen(false)}>{t.nav[1]}</a><a href="#categories" onClick={()=>setMenuOpen(false)}>{t.nav[2]}</a>
      </div>
      <div className="navActions">
        <button className="lang" onClick={()=>setLanguage(language==="en"?"es":"en")}>{language==="en"?"EN / ES":"ES / EN"}</button>
        <button className="login navButton" onClick={()=>setModal("account")}>{t.login}</button>
        <button className="button buttonSmall" onClick={()=>setModal("account")}>{t.start}</button>
        <button className="menuButton" onClick={()=>setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}><span/><span/><span/></button>
      </div>
    </nav>

    <section className="hero shell" id="top">
      <div className="heroCopy"><div className="eyebrow"><span className="pulse"/>{t.eyebrow}</div>
        <h1>{t.heroA}<br/><em>{t.heroB}</em></h1><p className="heroText">{t.heroText}</p>
        <div className="heroActions"><button className="button" onClick={()=>setModal("job")}>{t.post} <Arrow/></button><a className="textButton" href="#jobs">{t.browse} <Arrow/></a></div>
        <div className="trustRow"><div className="avatars"><span>MR</span><span>LC</span><span>TA</span><span>+</span></div><div><strong>4.9/5</strong><small>{t.rating}</small></div></div>
      </div>
      <div className="heroVisual"><div className="glow"/>
        <div className="floating floatingTop"><span className="miniIcon green">✓</span><div><b>{t.accepted}</b><small>{t.acceptedSub}</small></div></div>
        <div className="appCard"><div className="appTop"><span className="tiny">JOBZAPP</span><span className="dots">•••</span></div>
          <div className="jobHeader"><div><span className="status">● {t.open}</span><h3>Install a ceiling fan</h3><p>South Philly · 2 hours</p></div><b className="amount">$140</b></div>
          <div className="offer"><div className="person"><span className="personAvatar">DT</span><div><b>David T.</b><small>4.9 ★ · 86 jobs</small></div></div><span className="verified">{t.verified}</span></div>
          <div className="offer"><div className="person"><span className="personAvatar alt">KB</span><div><b>Kevin B.</b><small>5.0 ★ · 124 jobs</small></div></div><span className="offerPrice">$125</span></div>
          <button className="cardButton" onClick={()=>setModal("account")}>{t.compare} <Arrow/></button>
        </div>
        <div className="floating floatingBottom"><span className="miniIcon gold">$</span><div><b>{t.protected}</b><small>{t.protectedSub}</small></div></div>
      </div>
    </section>

    <section className="ticker"><div className="shell tickerInner">{t.ticker.map(x=><span key={x}>✓ {x}</span>)}</div></section>
    <section className="section shell" id="categories"><div className="sectionHead"><div><span className="kicker">{t.services}</span><h2>{t.servicesTitleA}<br/><span>{t.servicesTitleB}</span></h2></div><button className="textButton navButton" onClick={()=>setModal("job")}>{t.allServices} <Arrow/></button></div>
      <div className="categoryGrid">{categories.map(([icon,name,count])=><button className="category" onClick={()=>setModal("job")} key={name}><span className="categoryIcon">{icon}</span><div><b>{name}</b><small>{count}</small></div><Arrow/></button>)}</div>
    </section>

    <section className="section jobsSection" id="jobs"><div className="shell"><div className="sectionHead"><div><span className="kicker">{t.professional}</span><h2>{t.workA}<br/><span>{t.workB}</span></h2></div><button className="button buttonLight" onClick={()=>setModal("account")}>{t.findJobs} <Arrow/></button></div>
      <div className="jobGrid">{jobs.map(([title,place,price,time,tag,avatar])=><article className="jobCard" key={title}><div className="jobMeta"><span className="tag">{tag}</span><span>{time}</span></div><h3>{title}</h3><p>📍 {place}</p><div className="jobBottom"><strong>{price}</strong><span className="jobAvatar">{avatar}</span></div><button className="jobAction" onClick={()=>setModal("account")}>View job <Arrow/></button></article>)}</div>
    </div></section>

    <section className="how shell" id="how"><div className="howIntro"><span className="kicker">{t.simple}</span><h2>{t.howA}<br/><span>{t.howB}</span></h2><p>{t.howText}</p></div><div className="steps">{t.steps.map(([title,text],i)=><div key={title}><span>{String(i+1).padStart(2,"0")}</span><h3>{title}</h3><p>{text}</p></div>)}</div></section>

    <section className="cta shell" id="post"><div><span className="kicker">{t.ready}</span><h2>{t.ctaA}<br/><em>{t.ctaB}</em></h2></div><div><p>{t.ctaText}</p><button className="button" onClick={()=>setModal("job")}>{t.account} <Arrow/></button></div></section>
    <footer className="footer shell"><a className="brand" href="#top"><span className="brandMark">J</span><span>jobzapp</span></a><span>© 2026 Jobzapp</span><div>{t.footer.map(x=><button key={x} className="footerButton" onClick={()=>setModal("account")}>{x}</button>)}</div></footer>

    {modal&&<div className="modalBackdrop" role="presentation" onMouseDown={e=>{if(e.currentTarget===e.target)setModal(null)}}>
      <div className="modalCard" role="dialog" aria-modal="true" aria-label={modal==="job"?t.modalJob:t.modalAccount}>
        <button className="modalClose" onClick={()=>setModal(null)} aria-label="Close">×</button>
        {modal==="job"?<><span className="kicker">{t.ready}</span><h2>{t.modalJob}</h2><form onSubmit={submitJob}>
          <label>{t.titleLabel}<input required name="title" placeholder={t.titlePlaceholder}/></label>
          <label>{t.locationLabel}<input required name="location" placeholder={t.locationPlaceholder}/></label>
          <label>{t.budgetLabel}<input name="budget" placeholder={t.budgetPlaceholder}/></label>
          <button className="button modalSubmit">{t.continue} <Arrow/></button>
        </form></>:<><span className="kicker">{t.ready}</span><h2>{t.modalAccount}</h2><p className="modalText">{t.accountText}</p><p className="modalText">{t.professionalNote}</p><label>{t.emailLabel}<input type="email" placeholder={t.emailPlaceholder}/></label><button className="button modalSubmit" onClick={()=>setModal(null)}>{t.continue} <Arrow/></button></>}
        {modal==="job"&&<button className="modalCancel" onClick={()=>setModal(null)}>{t.cancel}</button>}
      </div>
    </div>}
  </main>;
}
