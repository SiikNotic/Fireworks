const categories = [
  { icon: "🔧", name: "Home repairs", count: "2.4k pros" },
  { icon: "🧹", name: "Cleaning", count: "1.8k pros" },
  { icon: "🚚", name: "Moving", count: "940 pros" },
  { icon: "🎨", name: "Painting", count: "760 pros" },
  { icon: "🌿", name: "Lawn & garden", count: "620 pros" },
  { icon: "💻", name: "Tech help", count: "510 pros" },
];

const jobs = [
  { title: "Fix a leaking kitchen faucet", place: "Center City", price: "$80–$140", time: "Today", tag: "Plumbing", avatar: "JR" },
  { title: "Deep clean a 2-bedroom apartment", place: "Fishtown", price: "$120–$180", time: "Tomorrow", tag: "Cleaning", avatar: "AM" },
  { title: "Mount TV + hide cables", place: "University City", price: "$90–$150", time: "This week", tag: "Handyman", avatar: "SK" },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  return (
    <main>
      <nav className="nav shell">
        <a className="brand" href="#"><span className="brandMark">J</span><span>jobzapp</span></a>
        <div className="navLinks">
          <a href="#how">How it works</a>
          <a href="#jobs">Find work</a>
          <a href="#categories">Services</a>
        </div>
        <div className="navActions">
          <button className="lang">EN / ES</button>
          <a className="login" href="#">Log in</a>
          <a className="button buttonSmall" href="#">Get started</a>
        </div>
      </nav>

      <section className="hero shell">
        <div className="heroCopy">
          <div className="eyebrow"><span className="pulse" /> Trusted local help, without the hassle</div>
          <h1>Get the right person<br /><em>for the job.</em></h1>
          <p className="heroText">Post what you need. Compare real offers. Chat, schedule, and pay securely — all in one place.</p>
          <div className="heroActions">
            <a className="button" href="#post">Post a job <Arrow /></a>
            <a className="textButton" href="#jobs">Browse jobs <Arrow /></a>
          </div>
          <div className="trustRow">
            <div className="avatars"><span>MR</span><span>LC</span><span>TA</span><span>+</span></div>
            <div><strong>4.9/5</strong><small>from 12,000+ completed jobs</small></div>
          </div>
        </div>

        <div className="heroVisual" aria-label="Marketplace preview">
          <div className="glow" />
          <div className="floating floatingTop"><span className="miniIcon green">✓</span><div><b>Job accepted</b><small>Maria accepted your offer</small></div></div>
          <div className="appCard">
            <div className="appTop"><span className="tiny">JOBZAPP</span><span className="dots">•••</span></div>
            <div className="jobHeader"><div><span className="status">● Open for offers</span><h3>Install a ceiling fan</h3><p>South Philly · 2 hours</p></div><b className="amount">$140</b></div>
            <div className="offer"><div className="person"><span className="personAvatar">DT</span><div><b>David T.</b><small>4.9 ★ · 86 jobs</small></div></div><span className="verified">Verified</span></div>
            <div className="offer"><div className="person"><span className="personAvatar alt">KB</span><div><b>Kevin B.</b><small>5.0 ★ · 124 jobs</small></div></div><span className="offerPrice">$125</span></div>
            <button className="cardButton">Compare 6 offers <Arrow /></button>
          </div>
          <div className="floating floatingBottom"><span className="miniIcon gold">$</span><div><b>Payment protected</b><small>Released after the job is done</small></div></div>
        </div>
      </section>

      <section className="ticker"><div className="shell tickerInner"><span>✓ Verified professionals</span><span>✓ Secure payments</span><span>✓ In-app messaging</span><span>✓ No hidden fees</span><span>✓ English & Spanish</span></div></section>

      <section className="section shell" id="categories">
        <div className="sectionHead"><div><span className="kicker">Explore services</span><h2>Whatever you need,<br /><span>there’s someone for it.</span></h2></div><a className="textButton" href="#">View all services <Arrow /></a></div>
        <div className="categoryGrid">{categories.map((c) => <a className="category" href="#" key={c.name}><span className="categoryIcon">{c.icon}</span><div><b>{c.name}</b><small>{c.count}</small></div><Arrow /></a>)}</div>
      </section>

      <section className="section jobsSection" id="jobs">
        <div className="shell">
          <div className="sectionHead"><div><span className="kicker">For professionals</span><h2>Work that fits<br /><span>your schedule.</span></h2></div><a className="button buttonLight" href="#">Find jobs <Arrow /></a></div>
          <div className="jobGrid">{jobs.map((job) => <article className="jobCard" key={job.title}><div className="jobMeta"><span className="tag">{job.tag}</span><span>{job.time}</span></div><h3>{job.title}</h3><p>📍 {job.place}</p><div className="jobBottom"><strong>{job.price}</strong><span className="jobAvatar">{job.avatar}</span></div><div className="jobAction">View job <Arrow /></div></article>)}</div>
        </div>
      </section>

      <section className="how shell" id="how">
        <div className="howIntro"><span className="kicker">Simple by design</span><h2>From “I need help”<br />to <span>“done.”</span></h2><p>Every step is designed to keep both sides in control — clear offers, clear expectations, clear payments.</p></div>
        <div className="steps"><div><span>01</span><h3>Describe it</h3><p>Tell us what you need, when, and where.</p></div><div><span>02</span><h3>Compare offers</h3><p>Review prices, profiles, ratings, and availability.</p></div><div><span>03</span><h3>Get it done</h3><p>Chat, schedule, pay, and review — all inside Jobzapp.</p></div></div>
      </section>

      <section className="cta shell" id="post"><div><span className="kicker">Ready when you are</span><h2>Your next job starts<br /><em>here.</em></h2></div><div><p>Join thousands of customers and professionals already getting more done.</p><a className="button" href="#">Create your free account <Arrow /></a></div></section>

      <footer className="footer shell"><a className="brand" href="#"><span className="brandMark">J</span><span>jobzapp</span></a><span>© 2026 Jobzapp</span><div><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Help</a></div></footer>
    </main>
  );
}