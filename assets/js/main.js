/* ==========================================================
   Movers Rankers — shared layout + interactions
   Header, footer and repeated sections are rendered from here
   so every page stays in sync. Works from file:// too.
========================================================== */
(function () {
  "use strict";

  /* ---------- Data ---------- */
  const SERVICES = [
    { slug: "ai-review-management", icon: "star", name: "AI Review Management", short: "Build customer confidence before the first call.", long: "Build trust with reviews that reflect the quality of your moving services. Strengthen your reputation so customers feel confident before they ever pick up the phone." },
    { slug: "ai-voice-assistant", icon: "mic", name: "AI Voice Assistant", short: "Keep inquiries coming in while your crew moves out.", long: "Keep customer inquiries moving while your crew is busy on the job. Give every caller a helpful first response and guide them toward requesting an estimate." },
    { slug: "ai-search-optimization", icon: "search", name: "AI Search Optimization", short: "Strengthen your presence where customers search.", long: "Get noticed where customers are searching for moving services — from Google to AI assistants — so people discover your business when they plan a move." },
    { slug: "website-design-development", icon: "monitor", name: "Website Design & Development", short: "Turn website visits into moving estimate requests.", long: "Turn visitors into estimate requests with a fast, modern website built around your services and a clear path from browsing to booking." },
    { slug: "ai-local-service-ads", icon: "megaphone", name: "AI Local Service Ads", short: "Reach people who are ready to plan their move.", long: "Put your moving services in front of local audiences who are ready to book, and turn ad spend into qualified estimate requests." },
    { slug: "ai-dispatch", icon: "truck", name: "AI Dispatch", short: "Coordinate moving jobs and dispatch crews efficiently.", long: "Bring clarity to your schedule with smarter job and crew coordination, keeping your team organized from pickup to delivery." }
  ];

  const SOLUTIONS = [
    { slug: "missed-call-recovery", icon: "phone", name: "Missed Call Recovery", short: "Follow up on calls you could not answer." },
    { slug: "crm-automation", icon: "users", name: "CRM Automation", short: "Keep leads and customer follow-ups organized." },
    { slug: "revenue-dashboard", icon: "chart", name: "Revenue Dashboard", short: "See how your moving business is performing." },
    { slug: "quotes-and-invoices", icon: "file", name: "Quotes & Invoices", short: "Make estimates and billing easier to manage." },
    { slug: "job-management", icon: "calendar", name: "Job Management", short: "Coordinate move dates, job details, and updates." },
    { slug: "staff-management", icon: "team", name: "Staff Management", short: "Keep your people, roles, and schedules aligned." }
  ];

  const RESOURCES = [
    { href: "about.html", icon: "info", name: "About Movers Rankers", short: "Meet your moving business growth partner." },
    { href: "contact.html", icon: "mail", name: "Contact Us", short: "Let's discuss where you want to grow." },
    { href: "contact.html#review-link", icon: "star", name: "Google Review Link", short: "Make sharing customer feedback simpler." },
    { href: "faqs.html", icon: "help", name: "FAQs", short: "Explore answers to common questions." },
    { href: "blog.html", icon: "book", name: "Blog & Insights", short: "Practical ideas for your next stage of growth." },
    { href: "affiliate.html", icon: "handshake", name: "Become an Affiliate", short: "Partner with us and earn on referrals." }
  ];

  const TESTIMONIALS = [
    { name: "Emma Richard", role: "Owner, Lorem Moving Co.", seed: "mr-p1", quote: "Our phone started ringing within weeks. Placeholder testimonial text — the team helped us double our booked jobs in just six months." },
    { name: "David Mont", role: "Marketing Director, Ipsum Movers", seed: "mr-p2", quote: "We've worked with agencies before, but this one stands out. Placeholder copy describing a data-driven approach that gave us an edge locally." },
    { name: "Sophia Lewis", role: "Founder, Dolor Relocation", seed: "mr-p3", quote: "From SEO to paid ads, every part of the campaign was handled. Placeholder copy — traffic climbed and lead quality has never been better." },
    { name: "James Peterson", role: "COO, Sit Amet Van Lines", seed: "mr-p4", quote: "Highly professional and results-oriented. Placeholder copy about building a stronger brand and a steady pipeline of estimate requests." }
  ];

  const svc = (s) => "service-detail.html?s=" + s.slug;
  const sol = (s) => "solution-detail.html?s=" + s.slug;
  const pad = (n) => String(n).padStart(2, "0");
  const img = (seed, w, h) => `https://picsum.photos/seed/${seed}/${w}/${h}`;
  const face = (seed) => `https://i.pravatar.cc/160?u=${seed}`;

  /* ---------- Icon sprite ---------- */
  const ICONS = {
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    "arrow-ur": '<path d="M7 17 17 7M8 7h9v9"/>',
    "arrow-l": '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    star: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
    mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    monitor: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
    megaphone: '<path d="M3 11v2a1 1 0 0 0 1 1h3l6 4V6L7 10H4a1 1 0 0 0-1 1zM17 8a5 5 0 0 1 0 8M20 5a9 9 0 0 1 0 14"/>',
    truck: '<path d="M2 6h11v10H2zM13 9h4l4 4v3h-8z"/><circle cx="6" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>',
    phone: '<path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6"/>',
    chart: '<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 6-7"/>',
    file: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    team: '<circle cx="12" cy="7" r="3"/><circle cx="5" cy="10" r="2"/><circle cx="19" cy="10" r="2"/><path d="M6 20a6 6 0 0 1 12 0M1.5 18a4 4 0 0 1 5-3.5M22.5 18a4 4 0 0 0-5-3.5"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6V14M12 17.5v.5"/>',
    book: '<path d="M4 4h6a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H4zM20 4h-6a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h6z"/>',
    handshake: '<path d="m11 17 2 2a1.5 1.5 0 0 0 2-2M14 14l2.5 2.5a1.5 1.5 0 0 0 2-2L15 11M2 11l5-5 4 1 3-2 8 6-3 3M6 13l3 3"/>',
    pin: '<path d="M12 21s-7-6-7-12a7 7 0 0 1 14 0c0 6-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h10"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    play: '<path d="M7 4v16l13-8z"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    bulb: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z"/>',
    eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    shield: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/>',
    trend: '<path d="m3 17 6-6 4 4 8-8M15 7h6v6"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    sparkle: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>',
    fb: '<path d="M15 3h-2.5A3.5 3.5 0 0 0 9 6.5V9H7v3.5h2V21h3.5v-8.5H15l.5-3.5h-3V7a1 1 0 0 1 1-1H15z"/>',
    ig: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5v.01"/>',
    in: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/>',
    x: '<path d="M4 4l16 16M20 4 4 20"/>',
    yt: '<rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 9 5 3-5 3z"/>'
  };

  function sprite() {
    const symbols = Object.entries(ICONS).map(([id, d]) => `<symbol id="i-${id}" viewBox="0 0 24 24">${d}</symbol>`).join("");
    const wrap = document.createElement("div");
    wrap.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" style="display:none">${symbols}</svg>`;
    document.body.prepend(wrap.firstChild);
  }
  const ic = (name, cls = "ic") => `<svg class="${cls}" aria-hidden="true"><use href="#i-${name}"/></svg>`;
  window.MR = { SERVICES, SOLUTIONS, ic, img, face };

  /* ---------- Header ---------- */
  function header(active) {
    const cur = (key) => (active === key ? ' aria-current="page"' : "");
    const megaHead = (kicker, title, accent, href, label) => `
      <div class="mega-head">
        <div><span class="mega-kicker">${kicker}</span><p class="mega-title">${title} <span>${accent}</span></p></div>
        <a class="mega-overview" href="${href}">${label} ${ic("arrow")}</a>
      </div>`;

    return `
    <header class="site-header">
      <div class="container">
        <div class="hdr-utility">
          <div class="hdr-utility-left">
            <span class="hdr-mark">Made for moving businesses</span>
            <span class="hdr-sep"></span>
            <span>Marketing. AI. Automation.</span>
          </div>
          <div class="hdr-utility-right">
            <a href="contact.html">${ic("phone")} Let's talk growth</a>
            <a href="affiliate.html">${ic("handshake")} Become an affiliate</a>
          </div>
        </div>

        <div class="hdr-frame">
          <a class="hdr-brand" href="index.html" aria-label="Movers Rankers home">
            <img src="assets/img/logo.svg" alt="Movers Rankers" width="148" height="46">
          </a>

          <nav class="hdr-nav" aria-label="Primary">
            <ul class="hdr-list">
              <li><button class="hdr-link" aria-expanded="false" aria-controls="mega-services"${cur("services")}>Services <i class="chev"></i></button></li>
              <li><button class="hdr-link" aria-expanded="false" aria-controls="mega-solutions"${cur("solutions")}>Solutions <i class="chev"></i></button></li>
              <li><a class="hdr-link" href="pricing.html"${cur("pricing")}>Pricing</a></li>
              <li><button class="hdr-link" aria-expanded="false" aria-controls="mega-resources"${cur("resources")}>Resources <i class="chev"></i></button></li>
            </ul>
          </nav>

          <div class="hdr-actions">
            <a class="hdr-cta" href="contact.html">Become Growth Partner <span class="hdr-cta-arrow">${ic("arrow-ur")}</span></a>
            <button class="hdr-burger" aria-label="Open menu" aria-controls="drawer" aria-expanded="false">${ic("menu")}</button>
          </div>

          <div class="mega" id="mega-services" hidden>
            <div class="mega-box">
              ${megaHead("Services", "Your next stage of growth.", "Get seen. Get trusted. Get booked.", "services.html", "All services")}
              <div class="mega-grid">
                ${SERVICES.map((s, i) => `
                  <a class="mega-card" href="${svc(s)}">
                    <span class="mega-card-top"><span class="mega-icon">${ic(s.icon)}</span><span class="mega-num">${pad(i + 1)}</span></span>
                    <span class="mega-name">${s.name}</span>
                    <span class="mega-desc">${s.short}</span>
                  </a>`).join("")}
              </div>
              <div class="mega-strip">
                <span class="mega-strip-caption">Connect the customer journey</span>
                <span class="mega-stages">
                  ${["Search", "Inquiry", "Estimate", "Booked move"].map((t, i) => `<span class="mega-stage"><b>${pad(i + 1)}</b>${t}</span>`).join(ic("arrow", "ic mega-stage-arrow"))}
                </span>
                <a href="contact.html">Find your growth gaps ${ic("arrow")}</a>
              </div>
            </div>
          </div>

          <div class="mega" id="mega-solutions" hidden>
            <div class="mega-box">
              ${megaHead("Solutions", "Bring your business together.", "Less chasing. More moving forward.", "solutions.html", "All solutions")}
              <div class="mega-grid mega-grid--list">
                ${SOLUTIONS.map((s) => `
                  <a class="mega-row" href="${sol(s)}">
                    <span class="mega-icon">${ic(s.icon)}</span>
                    <span><span class="mega-name" style="display:block">${s.name}</span><span class="mega-desc">${s.short}</span></span>
                  </a>`).join("")}
              </div>
              <div class="mega-strip">
                <span><span class="mega-strip-caption">Built around your workflow</span><br>One clearer process, from first call to final box.</span>
                <a href="contact.html">Let's plan your setup ${ic("arrow")}</a>
              </div>
            </div>
          </div>

          <div class="mega" id="mega-resources" hidden>
            <div class="mega-box">
              ${megaHead("Resources", "Explore Movers Rankers.", "Good questions. Clear next steps.", "contact.html", "Talk to our team")}
              <div class="mega-grid mega-grid--list">
                ${RESOURCES.map((r) => `
                  <a class="mega-row" href="${r.href}">
                    <span class="mega-icon">${ic(r.icon)}</span>
                    <span><span class="mega-name" style="display:block">${r.name}</span><span class="mega-desc">${r.short}</span></span>
                  </a>`).join("")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="drawer" id="drawer" hidden>
      <div class="drawer-panel" role="dialog" aria-modal="true" aria-label="Menu">
        <div class="drawer-top">
          <img src="assets/img/logo.svg" alt="Movers Rankers" width="140" height="44">
          <button class="drawer-close" aria-label="Close menu">${ic("close")}</button>
        </div>
        <details><summary>Services</summary>
          <a href="services.html">All services</a>
          ${SERVICES.map((s) => `<a href="${svc(s)}">${s.name}</a>`).join("")}
        </details>
        <details><summary>Solutions</summary>
          <a href="solutions.html">All solutions</a>
          ${SOLUTIONS.map((s) => `<a href="${sol(s)}">${s.name}</a>`).join("")}
        </details>
        <a class="drawer-direct" href="pricing.html">Pricing</a>
        <details><summary>Resources</summary>
          ${RESOURCES.map((r) => `<a href="${r.href}">${r.name}</a>`).join("")}
        </details>
        <div class="drawer-foot">
          <p>Your next growth move</p>
          <h4>Let's put your moving business in motion.</h4>
          <a class="hdr-cta" href="contact.html">Become Growth Partner <span class="hdr-cta-arrow">${ic("arrow-ur")}</span></a>
          <a class="btn btn--ghost" href="affiliate.html">Become an affiliate</a>
        </div>
      </div>
    </div>`;
  }

  /* ---------- Footer ---------- */
  function footer() {
    return `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a href="index.html"><img src="assets/img/logo.svg" alt="Movers Rankers" width="190" height="59"></a>
            <p>Placeholder description — a specialized digital marketing and automation partner for moving companies. SEO, ads, websites and AI tools that help movers win their local market.</p>
            <div class="socials">
              <a href="#" aria-label="Facebook">${ic("fb")}</a>
              <a href="#" aria-label="Instagram">${ic("ig")}</a>
              <a href="#" aria-label="LinkedIn">${ic("in")}</a>
              <a href="#" aria-label="YouTube">${ic("yt")}</a>
            </div>
          </div>
          <div>
            <h5>Quick Links</h5>
            <ul class="footer-links">
              <li><a href="index.html">Home</a></li>
              <li><a href="about.html">About Us</a></li>
              <li><a href="services.html">Services</a></li>
              <li><a href="solutions.html">Solutions</a></li>
              <li><a href="pricing.html">Pricing</a></li>
              <li><a href="blog.html">Blog</a></li>
              <li><a href="contact.html">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h5>Services</h5>
            <ul class="footer-links">
              ${SERVICES.map((s) => `<li><a href="${svc(s)}">${s.name}</a></li>`).join("")}
            </ul>
          </div>
          <div>
            <h5>Contact Info</h5>
            <ul class="footer-links footer-contact">
              <li>${ic("mail")} hello@example.com</li>
              <li>${ic("phone")} +1 (000) 123 4567</li>
              <li>${ic("pin")} 123 Placeholder Street, New York, USA</li>
            </ul>
            <form class="newsletter" onsubmit="event.preventDefault(); this.reset();">
              <input type="email" placeholder="Your email address" aria-label="Email address" required>
              <button aria-label="Subscribe">${ic("arrow")}</button>
            </form>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} Movers Rankers. All rights reserved.</span>
          <nav><a href="#">Privacy Policy</a><a href="#">Terms</a><a href="faqs.html">FAQs</a></nav>
        </div>
        <div class="footer-word" aria-hidden="true">Movers Rankers</div>
      </div>
    </footer>
    <button class="to-top" aria-label="Scroll to top">${ic("arrow")}</button>`;
  }

  /* ---------- Reusable sections ---------- */
  const PARTIALS = {
    reviews: () => `
    <section class="section section--panel-br">
      <div class="container">
        <div class="section-head section-head--center reveal">
          <span class="eyebrow">Reviews</span>
          <h2 class="h2 grad-text">What Moving Companies Say About Us</h2>
          <p class="lead">Placeholder intro — the true impact of our work shows up in the stories of the movers who trust us, from coast to coast.</p>
        </div>
        <div class="reviews-layout">
          <div class="review-stats reveal">
            <div class="proof">
              <div class="avatars">${["mr-a1", "mr-a2", "mr-a3", "mr-a4"].map((s) => `<img src="${face(s)}" alt="" loading="lazy">`).join("")}</div>
              <div><span class="stars">★★★★★</span><strong>2.7k Positive Reviews</strong></div>
            </div>
            <div class="progress"><div class="progress-top"><span>Improved Projects</span><b data-count="98" data-suffix="%">0%</b></div><div class="progress-bar"><i data-width="98%"></i></div></div>
            <div class="progress"><div class="progress-top"><span>New Projects</span><b data-count="85" data-suffix="%">0%</b></div><div class="progress-bar"><i data-width="85%"></i></div></div>
            <div class="pill-row"><span>${ic("trend")} Social Media Growth</span><span>${ic("target")} Performance Marketing</span></div>
          </div>
          <div class="reveal">
            <div class="slider" data-slider>
              <div class="slides">
                ${TESTIMONIALS.map((t) => `
                  <div class="slide"><figure class="quote-card" style="margin:0">
                    <span class="stars">★★★★★</span>
                    <blockquote>“${t.quote}”</blockquote>
                    <figcaption class="quote-person"><img src="${face(t.seed)}" alt="${t.name}" loading="lazy"><span><b>${t.name}</b><small>${t.role}</small></span></figcaption>
                  </figure></div>`).join("")}
              </div>
            </div>
            <div class="slider-nav">
              <button data-prev aria-label="Previous testimonial">${ic("arrow-l")}</button>
              <button data-next aria-label="Next testimonial">${ic("arrow")}</button>
              <div class="slider-dots"></div>
            </div>
          </div>
        </div>
      </div>
    </section>`,

    process: () => `
    <section class="section section--panel">
      <div class="container">
        <div class="section-head section-head--split reveal">
          <div>
            <span class="eyebrow">How It Works</span>
            <h2 class="h2 grad-text">A Simple Path to More Bookings</h2>
          </div>
          <div>
            <p class="lead">Placeholder copy — no complicated marketing jargon, just a clear step-by-step process focused on one outcome: keeping your calendar full.</p>
            <a class="btn btn--primary" href="contact.html">Get Started Now <span class="btn-arrow">${ic("arrow-ur")}</span></a>
          </div>
        </div>
        <div class="process-grid">
          ${[
            ["target", "Discovery & Consultation", "A free strategy call to understand your business, service areas and goals."],
            ["bulb", "Strategy & Planning", "A tailored roadmap that balances quick wins with long-term growth."],
            ["bolt", "Execution & Optimization", "We launch, monitor and refine campaigns continuously for maximum ROI."],
            ["trend", "Results & Growth", "More calls, more leads and more booked jobs — with full transparency."]
          ].map(([icon, title, text], i) => `
            <div class="card step reveal">
              <div class="step-top"><span class="icon-badge">${ic(icon)}</span><span class="step-num">${pad(i + 1)}</span></div>
              <h5>${title}</h5>
              <p>${text}</p>
            </div>`).join("")}
        </div>
      </div>
    </section>`
  };

  /* ---------- Behaviour ---------- */
  function initMega() {
    const triggers = document.querySelectorAll(".hdr-link[aria-controls]");
    const closeAll = (except) => triggers.forEach((t) => {
      if (t === except) return;
      t.setAttribute("aria-expanded", "false");
      document.getElementById(t.getAttribute("aria-controls")).hidden = true;
    });
    triggers.forEach((t) => {
      const panel = document.getElementById(t.getAttribute("aria-controls"));
      t.addEventListener("click", (e) => {
        e.stopPropagation();
        const open = t.getAttribute("aria-expanded") === "true";
        closeAll(t);
        t.setAttribute("aria-expanded", String(!open));
        panel.hidden = open;
      });
      panel.addEventListener("click", (e) => e.stopPropagation());
    });
    document.addEventListener("click", () => closeAll());
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeAll(); });
  }

  function initDrawer() {
    const drawer = document.getElementById("drawer");
    const burger = document.querySelector(".hdr-burger");
    const set = (open) => {
      drawer.hidden = !open;
      burger.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    };
    burger.addEventListener("click", () => set(true));
    drawer.querySelector(".drawer-close").addEventListener("click", () => set(false));
    drawer.addEventListener("click", (e) => { if (e.target === drawer) set(false); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") set(false); });
  }

  function initRotator() {
    document.querySelectorAll("[data-words]").forEach((el) => {
      const words = el.dataset.words.split("|");
      let i = 0;
      el.innerHTML = `<span>${words[0]}</span>`;
      setInterval(() => { i = (i + 1) % words.length; el.innerHTML = `<span>${words[i]}</span>`; }, 2400);
    });
  }

  function countUp(el) {
    const target = +el.dataset.count;
    const suffix = el.dataset.suffix || "";
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / 1600, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  function initObservers() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target;
        if (el.classList.contains("reveal")) el.classList.add("is-in");
        if (el.dataset.count) countUp(el);
        if (el.dataset.width) el.style.width = el.dataset.width;
        io.unobserve(el);
      });
    }, { threshold: 0.15 });
    document.querySelectorAll(".reveal, [data-count], [data-width]").forEach((el) => io.observe(el));
  }

  function initSliders() {
    document.querySelectorAll("[data-slider]").forEach((slider) => {
      const track = slider.querySelector(".slides");
      const count = track.children.length;
      const nav = slider.nextElementSibling;
      const dots = nav.querySelector(".slider-dots");
      let i = 0;
      dots.innerHTML = Array.from({ length: count }, (_, n) => `<button aria-label="Go to slide ${n + 1}"></button>`).join("");
      const go = (n) => {
        i = (n + count) % count;
        track.style.transform = `translateX(-${i * 100}%)`;
        dots.querySelectorAll("button").forEach((d, k) => d.setAttribute("aria-current", String(k === i)));
      };
      nav.querySelector("[data-prev]").addEventListener("click", () => go(i - 1));
      nav.querySelector("[data-next]").addEventListener("click", () => go(i + 1));
      dots.querySelectorAll("button").forEach((d, k) => d.addEventListener("click", () => go(k)));
      let timer = setInterval(() => go(i + 1), 6000);
      slider.parentElement.addEventListener("mouseenter", () => clearInterval(timer));
      slider.parentElement.addEventListener("mouseleave", () => { timer = setInterval(() => go(i + 1), 6000); });
      go(0);
    });
  }

  function initToTop() {
    const btn = document.querySelector(".to-top");
    addEventListener("scroll", () => btn.classList.toggle("is-visible", scrollY > 600), { passive: true });
    btn.addEventListener("click", () => scrollTo({ top: 0 }));
  }

  // Pricing tabs: highlight the panel currently in view
  function initPriceTabs() {
    const tabs = document.querySelectorAll(".price-tab");
    if (!tabs.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        tabs.forEach((t) => t.setAttribute("aria-current", String(t.hash === "#" + en.target.id)));
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll(".price-panel").forEach((p) => io.observe(p));
  }

  /* ---------- Boot ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    sprite();
    const active = document.body.dataset.page || "";
    document.querySelector("[data-header]")?.insertAdjacentHTML("afterend", header(active));
    document.querySelector("[data-header]")?.remove();
    document.querySelector("[data-footer]")?.insertAdjacentHTML("afterend", footer());
    document.querySelector("[data-footer]")?.remove();
    document.querySelectorAll("[data-partial]").forEach((el) => {
      el.outerHTML = PARTIALS[el.dataset.partial]();
    });
    // Page-level renderers (e.g. service-detail) hook in here
    document.dispatchEvent(new CustomEvent("mr:ready"));

    initMega();
    initDrawer();
    initRotator();
    initSliders();
    initObservers();
    initToTop();
    initPriceTabs();
  });
})();
