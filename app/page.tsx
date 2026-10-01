"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Database } from "../lib/database.types";

type Lang = "en" | "es";
type Mode = "customer" | "pro";

const copy = {
  en: {
    hello: "Good afternoon", title: "What can we get done?", search: "What do you need help with?",
    near: "Philadelphia, PA", categories: ["Home","Cleaning","Moving","Tech","Painting","Yard"],
    nearby: "Nearby right now", popular: "Popular near you", jobs: "Jobs you might like",
    all: "See all", request: "Post a job", active: "Your request is active",
    viewing: "2 professionals are viewing it", home: "Home", discover: "Discover", post: "Post",
    inbox: "Inbox", activity: "Jobs", mode: "I'm a professional", customer: "I'm hiring",
    today: "Today", tomorrow: "Tomorrow", away: "away", offer: "offers", verified: "Verified",
    budget: "Budget", from: "from", details: "View details", language: "EN / ES",
    job1: "Mount TV + hide cables", job2: "Deep clean 2BR apartment", job3: "Move sofa + boxes",
    job4: "Fix leaking kitchen faucet", pro1: "David T.", pro2: "Maria R.", pro3: "Kevin B.",
    find: "Find help", filter: "Filters", cancel: "Cancel", save: "Save"
  },
  es: {
    hello: "Buenas tardes", title: "¿Qué resolvemos hoy?", search: "¿Qué necesitas?",
    near: "Filadelfia, PA", categories: ["Hogar","Limpieza","Mudanza","Tech","Pintura","Jardín"],
    nearby: "Cerca de ti ahora", popular: "Popular cerca de ti", jobs: "Trabajos para ti",
    all: "Ver todos", request: "Publicar trabajo", active: "Tu solicitud está activa",
    viewing: "2 profesionales la están viendo", home: "Inicio", discover: "Descubrir", post: "Publicar",
    inbox: "Mensajes", activity: "Trabajos", mode: "Soy profesional", customer: "Estoy contratando",
    today: "Hoy", tomorrow: "Mañana", away: "de distancia", offer: "ofertas", verified: "Verificado",
    budget: "Presupuesto", from: "desde", details: "Ver detalles", language: "ES / EN",
    find: "Buscar ayuda", filter: "Filtros", cancel: "Cancelar", save: "Guardar"
  }
} as const;

const jobs = [
  { title: "Mount TV + hide cables", es: "Montar TV + ocultar cables", price: "$90–$150", distance: "0.8 mi", time: "Today", icon: "⌂", color: "blue" },
  { title: "Deep clean 2BR apartment", es: "Limpieza profunda 2 habitaciones", price: "$120", distance: "1.2 mi", time: "Tomorrow", icon: "✦", color: "mint" },
  { title: "Move sofa + boxes", es: "Mover sofá + cajas", price: "$75–$110", distance: "2.1 mi", time: "Sat", icon: "↗", color: "violet" },
  { title: "Fix leaking kitchen faucet", es: "Reparar llave de cocina", price: "$65–$95", distance: "1.6 mi", time: "Today", icon: "⚒", color: "orange" }
];

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [mode, setMode] = useState<Mode>("customer");
  const [tab, setTab] = useState("home");
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [sessionUser, setSessionUser] = useState<{ id: string; email?: string } | null>(null);
  const [realJobs, setRealJobs] = useState<Database["public"]["Tables"]["jobs"]["Row"][]>([]);
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authName, setAuthName] = useState("");
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [authMessage, setAuthMessage] = useState("");
  const t = copy[lang];

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setSessionUser(data.session?.user ? { id: data.session.user.id, email: data.session.user.email } : null));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => setSessionUser(session?.user ? { id: session.user.id, email: session.user.email } : null));
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!supabase) return;
    supabase.from("jobs").select("*").eq("status", "open").order("created_at", { ascending: false }).limit(20)
      .then(({ data }) => { if (data) setRealJobs(data); });
  }, [sessionUser]);

  const displayJobs = realJobs.length ? realJobs.map(j => ({ title:j.title, es:j.title, price:j.budget_min != null && j.budget_max != null ? `${j.budget_min}–${j.budget_max}` : j.budget_max != null ? `${j.budget_max}` : "Open", distance:"nearby", time:j.scheduled_for ? new Date(j.scheduled_for).toLocaleDateString() : "Flexible", icon:"✦", color:"blue" })) : jobs;
  const filtered = useMemo(() => displayJobs.filter(j => {
    const text = lang === "en" ? j.title : j.es;
    return !query || text.toLowerCase().includes(query.toLowerCase());
  }), [query, lang, displayJobs]);

  return (
    <main className="app-shell">
      <aside className="desktop-sidebar">
        <div className="brand">jobzapp<span>.</span></div>
        <div className="mode-switch">
          <button className={mode === "customer" ? "selected" : ""} onClick={() => setMode("customer")}>{t.customer}</button>
          <button className={mode === "pro" ? "selected" : ""} onClick={() => setMode("pro")}>{t.mode}</button>
        </div>
        <nav>
          {[[t.home,"⌂","home"],[t.discover,"⌕","discover"],[t.post,"＋","post"],[t.inbox,"▣","inbox"],[t.activity,"◉","jobs"]].map(([label,icon,key]) =>
            <button key={key} className={tab === key ? "active" : ""} onClick={() => setTab(key as string)}><i>{icon}</i><span>{label}</span></button>
          )}
        </nav>
        <div className="sidebar-bottom">
          <button onClick={() => setLang(lang === "en" ? "es" : "en")}>◎ {t.language}</button>
          <button>⚙ Settings</button>
          <div className="profile-mini"><div>SN</div><span><b>Siik</b><small>Personal account</small></span><strong>•••</strong></div>
        </div>
      </aside>

      <section className="app-content">
        <header className="app-header">
          <div className="mobile-brand">jobzapp<span>.</span></div>
          <div className="location"><span>⌖</span><div><small>Location</small><b>{t.near}</b></div><strong>⌄</strong></div>
          <div className="header-actions">
            <button className="language" onClick={() => setLang(lang === "en" ? "es" : "en")}>{t.language}</button>
            <button className="bell">♢<i>2</i></button>
            <button className="avatar" onClick={() => setAuthOpen(true)}>{sessionUser ? "✓" : "SN"}</button>
          </div>
        </header>

        <div className="main-scroll">
          <section className="welcome">
            <div><span>{t.hello}</span><h1>{mode === "customer" ? t.title : (lang === "en" ? "What work fits your day?" : "¿Qué trabajo encaja hoy?")}</h1></div>
            <button className="quick-post" onClick={() => sessionUser ? setModal(true) : setAuthOpen(true)}><b>＋</b>{t.request}</button>
          </section>

          <div className="smart-search">
            <span>⌕</span>
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder={t.search} />
            <button onClick={() => setQuery("")}>⌘ K</button>
          </div>

          <section className="category-row">
            {["All", ...t.categories].map((c, i) =>
              <button key={c} className={(category === c || (category === "All" && i === 0)) ? "cat active" : "cat"} onClick={() => setCategory(c)}>
                <span>{["✦","⌂","✧","↗","⌘","◇","✳"][i]}</span>{c}
              </button>
            )}
          </section>

          <section className="dashboard-grid">
            <div className="map-panel">
              <div className="panel-head"><div><span className="eyebrow">{t.nearby}</span><h2>{t.popular}</h2></div><button>{t.filter} ≡</button></div>
              <div className="fake-map">
                <div className="map-lines one"/><div className="map-lines two"/><div className="map-lines three"/>
                <div className="map-road r1"/><div className="map-road r2"/><div className="map-road r3"/>
                {[["18%","27%","$85"],["51%","20%","$120"],["72%","42%","$65"],["36%","67%","$95"],["78%","72%","$140"]].map((p,i) =>
                  <button className={i===2 ? "map-pin hot" : "map-pin"} style={{left:p[0],top:p[1]}} key={i}><span>✦</span>{p[2]}</button>
                )}
                <div className="you-pin"><span>SN</span><b>YOU</b></div>
                <div className="map-controls"><button>＋</button><button>−</button></div>
                <div className="map-card"><span>LIVE</span><b>18 open jobs</b><small>within 3 miles</small></div>
              </div>
            </div>

            <div className="jobs-panel">
              <div className="panel-head"><div><span className="eyebrow">{t.jobs}</span><h2>{filtered.length} matches</h2></div><button>{t.all} →</button></div>
              <div className="job-list">
                {filtered.slice(0,4).map((j,i) =>
                  <button className="job-card" key={j.title} onClick={() => setModal(true)}>
                    <div className={"job-icon " + j.color}>{j.icon}</div>
                    <div className="job-copy"><b>{lang === "en" ? j.title : j.es}</b><span>{j.distance} {t.away} • <em>{j.time === "Today" ? t.today : j.time === "Tomorrow" ? t.tomorrow : j.time}</em></span><small><strong>{t.budget}</strong> {j.price}</small></div>
                    <strong className="arrow">›</strong>
                  </button>
                )}
              </div>
            </div>
          </section>

          <section className="active-request">
            <div className="active-icon">✓</div>
            <div><span>{t.active}</span><b>{t.viewing}</b></div>
            <div className="progress"><i/><i/><i/></div>
            <button onClick={() => setTab("jobs")}>{t.details} →</button>
          </section>

          <section className="trust-strip">
            <div><b>4.9</b><span>★ average rating</span></div><div><b>12k+</b><span>jobs completed</span></div><div><b>98%</b><span>show-up rate</span></div><div><b>24/7</b><span>support</span></div>
          </section>
        </div>

        <nav className="mobile-nav">
          {[[t.home,"⌂","home"],[t.discover,"⌕","discover"],[t.post,"＋","post"],[t.inbox,"▣","inbox"],[t.activity,"◉","jobs"]].map(([label,icon,key],i) =>
            <button key={key} className={tab === key ? "active" : ""} onClick={() => key === "post" ? setModal(true) : setTab(key as string)}><i>{icon}</i><span>{label}</span></button>
          )}
        </nav>
      </section>

      {modal && <div className="modal-overlay" onMouseDown={e => { if (e.target === e.currentTarget) setModal(false); }}>
        <div className="job-modal">
          <button className="modal-close" onClick={() => setModal(false)}>×</button>
          <span className="modal-kicker">JOBZAPP</span>
          <h2>{t.request}</h2>
          <p>{lang === "en" ? "Tell nearby professionals what you need. You can compare offers before choosing." : "Dile a los profesionales cercanos qué necesitas. Puedes comparar ofertas antes de elegir."}</p>
          <label>{lang === "en" ? "What needs to be done?" : "¿Qué necesitas hacer?"}<input placeholder={lang === "en" ? "Example: assemble a desk" : "Ejemplo: montar un escritorio"} /></label>
          <label>{lang === "en" ? "When?" : "¿Cuándo?"}<div className="modal-options"><button>Today</button><button>Tomorrow</button><button>Choose date</button></div></label>
          <label>{t.budget}<input placeholder="$100" /></label>
          <button className="modal-submit" onClick={async () => { if (!supabase || !sessionUser) { setAuthOpen(true); return; } const title = (document.querySelector(".job-modal label input") as HTMLInputElement)?.value?.trim(); if (!title) return; const { error } = await supabase.from("jobs").insert({ customer_id: sessionUser.id, title, description: title, status: "open" }); if (!error) { setModal(false); const { data } = await supabase.from("jobs").select("*").eq("status","open").order("created_at",{ascending:false}).limit(20); if (data) setRealJobs(data); } }}>{lang === "en" ? "Publish job" : "Publicar trabajo"} →</button>
        </div>
      </div>}
      {authOpen && <div className="modal-overlay" onMouseDown={e => { if (e.target === e.currentTarget) setAuthOpen(false); }}><div className="job-modal"><button className="modal-close" onClick={() => setAuthOpen(false)}>×</button><span className="modal-kicker">JOBZAPP</span><h2>{authMode === "signin" ? (lang === "en" ? "Welcome back" : "Bienvenido") : (lang === "en" ? "Create your account" : "Crea tu cuenta")}</h2><p>{supabase ? (lang === "en" ? "Your account connects you to real Jobzapp jobs." : "Tu cuenta te conecta con trabajos reales de Jobzapp.") : "Supabase is not configured in this build yet."}</p>{authMode === "signup" && <label>{lang === "en" ? "Name" : "Nombre"}<input value={authName} onChange={e=>setAuthName(e.target.value)} /></label>}<label>Email<input type="email" value={authEmail} onChange={e=>setAuthEmail(e.target.value)} /></label><label>Password<input type="password" value={authPassword} onChange={e=>setAuthPassword(e.target.value)} /></label>{authMessage && <p>{authMessage}</p>}<button className="modal-submit" onClick={async()=>{ if(!supabase){setAuthMessage("Connect Supabase environment variables first.");return;} const result=authMode==="signin"?await supabase.auth.signInWithPassword({email:authEmail,password:authPassword}):await supabase.auth.signUp({email:authEmail,password:authPassword,options:{data:{full_name:authName}}}); if(result.error)setAuthMessage(result.error.message); else {setAuthMessage(authMode==="signup"?"Check your email to confirm your account.":"Signed in."); if(authMode==="signin")setAuthOpen(false);}}}>{authMode==="signin"?(lang==="en"?"Sign in":"Entrar"):(lang==="en"?"Create account":"Crear cuenta")}</button><button className="text-button" onClick={()=>setAuthMode(authMode==="signin"?"signup":"signin")}>{authMode==="signin"?(lang==="en"?"Need an account? Sign up":"¿No tienes cuenta? Regístrate"):(lang==="en"?"Already have an account? Sign in":"¿Ya tienes cuenta? Entra")}</button></div></div>}
    </main>
  );
}
