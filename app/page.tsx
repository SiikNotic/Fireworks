"use client";

import { FormEvent, useEffect, useState } from "react";

type Lang = "en" | "es";
type Modal = "job" | "account" | null;

const i18n = {
  en: {
    nav: ["How it works", "Find work", "Services"],
    login: "Log in", start: "Get started", kicker: "A service marketplace built around getting things done",
    title: "The fastest way to find help.", sub: "Post a job. See real people. Compare offers. Choose who gets it done.",
    search: "What do you need help with?", find: "Find a pro", rating: "4.9/5 average rating",
    trust: "12,000+ jobs completed • Secure payments • English & Spanish",
    live: "LIVE OFFERS", task: "Install a ceiling fan", place: "South Philly • 2 hours", offers: "6 offers",
    compare: "Compare offers", verified: "VERIFIED", top: "TOP RATED",
    customerK: "FOR CUSTOMERS", customerTitle: "Need a job done?", customerText: "Describe the task once and let qualified people come to you with clear offers.",
    professionalK: "FOR PROFESSIONALS", professionalTitle: "Work on your terms.", professionalText: "Browse nearby jobs, send your price, and fill your schedule with work that fits.",
    week: "THIS WEEK", earnings: "$1,284", jobs: "8 jobs completed • 4.98 rating",
    catK: "POPULAR CATEGORIES", catTitle: "Start with a service.",
    cats: [["Home repairs","2.4k pros"],["Cleaning","1.8k pros"],["Moving","940 pros"],["Painting","760 pros"],["Lawn & garden","620 pros"],["Tech help","510 pros"]],
    handoff: "THE HANDOFF", handoffTitle: "Three moves. No endless back-and-forth.",
    steps: [["POST","Tell us what needs to happen.","A few details. No complicated forms."],["CHOOSE","Compare people, not promises.","Price, ratings, availability and chat in one place."],["DONE","Get it handled and close it out.","Pay securely, then leave a verified review."]],
    ctaTitle: "Whatever needs doing. Start here.", ctaText: "A modern marketplace for people who need help and people ready to help.",
    cta: "Get started", free: "Free to join • English & Spanish",
    jobModal: "Post a job", accountModal: "Create your account", need: "What do you need?", where: "Where?", budget: "Budget", email: "Email",
    continue: "Continue", cancel: "Cancel", accountText: "Your job draft is saved. Real authentication and marketplace data connect here when the backend is enabled.",
    proNote: "For professionals: create a profile, send offers and build verified reviews."
  },
  es: {
    nav: ["Cómo funciona", "Buscar trabajo", "Servicios"],
    login: "Iniciar sesión", start: "Comenzar", kicker: "Un marketplace de servicios creado para resolver",
    title: "La forma rápida de encontrar ayuda.", sub: "Publica el trabajo. Mira personas reales. Compara ofertas. Elige quién lo hace.",
    search: "¿Qué necesitas?", find: "Buscar profesional", rating: "4.9/5 de calificación promedio",
    trust: "12,000+ trabajos • Pagos seguros • Inglés y español",
    live: "OFERTAS EN VIVO", task: "Instalar un abanico de techo", place: "South Philly • 2 horas", offers: "6 ofertas",
    compare: "Comparar ofertas", verified: "VERIFICADO", top: "MEJOR VALORADO",
    customerK: "PARA CLIENTES", customerTitle: "¿Necesitas un trabajo?", customerText: "Describe la tarea una vez y recibe ofertas claras de personas calificadas.",
    professionalK: "PARA PROFESIONALES", professionalTitle: "Trabaja a tu manera.", professionalText: "Busca trabajos cercanos, envía tu precio y llena tu horario con trabajos que encajen.",
    week: "ESTA SEMANA", earnings: "$1,284", jobs: "8 trabajos • 4.98 de calificación",
    catK: "CATEGORÍAS POPULARES", catTitle: "Empieza con un servicio.",
    cats: [["Reparaciones","2.4k pros"],["Limpieza","1.8k pros"],["Mudanzas","940 pros"],["Pintura","760 pros"],["Jardín","620 pros"],["Ayuda técnica","510 pros"]],
    handoff: "EL CAMBIO DE MANOS", handoffTitle: "Tres pasos. Sin conversaciones eternas.",
    steps: [["PUBLICA","Dinos qué tiene que pasar.","Unos detalles. Sin formularios complicados."],["ELIGE","Compara personas, no promesas.","Precio, calificaciones, disponibilidad y chat en un solo lugar."],["LISTO","Hazlo y ciérralo.","Paga seguro y deja una reseña verificada."]],
    ctaTitle: "Lo que necesites. Empieza aquí.", ctaText: "Un marketplace moderno para quienes necesitan ayuda y quienes están listos para ayudar.",
    cta: "Comenzar", free: "Gratis • Inglés y español",
    jobModal: "Publicar trabajo", accountModal: "Crear tu cuenta", need: "¿Qué necesitas?", where: "¿Dónde?", budget: "Presupuesto", email: "Correo",
    continue: "Continuar", cancel: "Cancelar", accountText: "Tu borrador quedó guardado. La autenticación y los datos reales del marketplace se conectarán aquí al activar el backend.",
    proNote: "Para profesionales: crea tu perfil, envía ofertas y construye reseñas verificadas."
  }
} as const;

const icons = ["⌂","✦","↗","◈","✳","⌘"];

export default function Home() {
  const [lang,setLang]=useState<Lang>("en");
  const [menu,setMenu]=useState(false);
  const [modal,setModal]=useState<Modal>(null);
  const t=i18n[lang];

  useEffect(()=>{document.documentElement.lang=lang},[lang]);

  function submitJob(e:FormEvent<HTMLFormElement>){
    e.preventDefault();
    const data=Object.fromEntries(new FormData(e.currentTarget).entries());
    localStorage.setItem("jobzapp-draft-job",JSON.stringify(data));
    setModal("account");
  }

  return <main className="site">
    <header className="topbar">
      <a className="logo" href="#top">jobzapp</a>
      <nav className={menu?"nav open":"nav"}>{t.nav.map((x,i)=><a key={x} href={["#how","#work","#services"][i]} onClick={()=>setMenu(false)}>{x}</a>)}</nav>
      <div className="top-actions">
        <button className="lang" onClick={()=>setLang(lang==="en"?"es":"en")}>{lang==="en"?"EN / ES":"ES / EN"}</button>
        <button className="login" onClick={()=>setModal("account")}>{t.login}</button>
        <button className="mini-cta" onClick={()=>setModal("account")}>{t.start} ↗</button>
        <button className="hamburger" onClick={()=>setMenu(!menu)} aria-label="Menu"><i/><i/><i/></button>
      </div>
    </header>

    <section className="hero-v3" id="top">
      <div className="noise"/><div className="hero-grid"/>
      <div className="hero-left reveal">
        <div className="eyebrow"><span className="live-dot"/>{t.kicker}</div>
        <h1>{t.title}</h1>
        <p className="hero-sub">{t.sub}</p>
        <div className="searchbar">
          <span className="search-symbol">⌕</span>
          <span className="search-placeholder">{t.search}</span>
          <button onClick={()=>setModal("job")}>{t.find} <b>→</b></button>
        </div>
        <div className="trust-line"><span>{t.rating}</span><em>•</em><span>{t.trust}</span></div>
      </div>

      <div className="hero-product reveal">
        <div className="product-halo"/>
        <div className="product-window">
          <div className="window-bar"><span>JOBZAPP / MARKETPLACE</span><div><i/><i/><i/></div></div>
          <div className="product-heading">
            <div><span className="live-label">● {t.live}</span><h2>{t.task}</h2><p>{t.place}</p></div>
            <strong>$140</strong>
          </div>
          <div className="offer-row">
            <div className="avatar avatar-a">DT</div><div className="offer-info"><b>David T.</b><span>4.9 ★ • 86 jobs • 12 min away</span></div><span className="price">$125</span>
            <small>{t.verified}</small>
          </div>
          <div className="offer-row">
            <div className="avatar avatar-b">KB</div><div className="offer-info"><b>Kevin B.</b><span>5.0 ★ • 124 jobs • 18 min away</span></div><span className="price">$140</span>
            <small className="purple">{t.top}</small>
          </div>
          <button className="compare" onClick={()=>setModal("account")}>{t.compare} <span>→</span></button>
          <p className="secure">Payment held securely until the job is complete.</p>
        </div>
        <div className="live-toast"><span>✓</span><div><b>New offer received</b><small>Maria sent a $110 offer</small></div><strong>$110</strong></div>
      </div>
    </section>

    <div className="marquee"><div>{[...t.cats.map(c=>c[0]),"Secure payments","Verified people","In-app chat","EN / ES","No hidden fees"].concat([...t.cats.map(c=>c[0])]).map((x,i)=><span key={i}>✦ {x}</span>)}</div></div>

    <section className="duo-section shell" id="work">
      <div className="section-intro reveal"><span>{t.kicker}</span><h2>Built for the moment<br/>you actually need it.</h2><p>{t.customerText}</p></div>
      <div className="duo-grid">
        <article className="side-card customer reveal">
          <div className="card-kicker">{t.customerK}</div><h3>{t.customerTitle}</h3><p>{t.customerText}</p>
          <div className="task-preview"><span className="open-tag">OPEN</span><b>Mount TV + hide cables</b><small>University City • This week</small><strong>$90–$150</strong></div>
        </article>
        <article className="side-card professional reveal">
          <div className="card-kicker">{t.professionalK}</div><h3>{t.professionalTitle}</h3><p>{t.professionalText}</p>
          <div className="earnings"><span>{t.week}</span><b>{t.earnings}</b><small>{t.jobs}</small><strong>↗</strong></div>
        </article>
      </div>
    </section>

    <section className="services shell" id="services">
      <div className="services-head reveal"><div><span>{t.catK}</span><h2>{t.catTitle}</h2></div><button onClick={()=>setModal("job")}>View all →</button></div>
      <div className="service-grid">{t.cats.map((c,i)=><button className="service-card reveal" key={c[0]} onClick={()=>setModal("job")}><span className="service-icon">{icons[i]}</span><div><b>{c[0]}</b><small>{c[1]}</small></div><strong>→</strong></button>)}</div>
    </section>

    <section className="handoff" id="how">
      <div className="shell handoff-inner">
        <div className="reveal"><span className="violet-kicker">{t.handoff}</span><h2>{t.handoffTitle}</h2></div>
        <div className="step-list">{t.steps.map((s,i)=><article className="step reveal" key={s[0]}><span className="step-no">0{i+1}</span><div><b>{s[0]}</b><h3>{s[1]}</h3><p>{s[2]}</p></div></article>)}</div>
      </div>
    </section>

    <section className="final-cta shell reveal">
      <div className="cta-orb"/><span>JOBZAPP</span><h2>{t.ctaTitle}</h2><p>{t.ctaText}</p><button onClick={()=>setModal("job")}>{t.cta} <b>→</b></button><small>{t.free}</small>
    </section>

    <footer className="footer shell"><a className="logo" href="#top">jobzapp</a><span>© 2026 Jobzapp</span><div><button onClick={()=>setModal("account")}>Privacy</button><button onClick={()=>setModal("account")}>Terms</button><button onClick={()=>setModal("account")}>Help</button></div></footer>

    {modal&&<div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)setModal(null)}}><div className="modal">
      <button className="close" onClick={()=>setModal(null)}>×</button><span>JOBZAPP</span>
      {modal==="job"?<><h2>{t.jobModal}</h2><form onSubmit={submitJob}><label>{t.need}<input name="title" required placeholder={lang==="en"?"Fix a leaking faucet":"Reparar una llave"}/></label><label>{t.where}<input name="location" required placeholder={lang==="en"?"City or ZIP":"Ciudad o código postal"}/></label><label>{t.budget}<input name="budget" placeholder="$100"/></label><button>{t.continue} →</button></form><button className="cancel" onClick={()=>setModal(null)}>{t.cancel}</button></>:<><h2>{t.accountModal}</h2><p>{t.accountText}</p><p>{t.proNote}</p><label>{t.email}<input type="email" placeholder="you@example.com"/></label><button onClick={()=>setModal(null)}>{t.continue} →</button></>}
    </div></div>}
  </main>;
}
