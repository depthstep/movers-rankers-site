/* ==========================================================
   Movers Rankers — shared layout + interactions
   Header, footer and repeated sections are rendered from here
   so every page stays in sync. Works from file:// too.
========================================================== */
(function () {
  "use strict";

  /* ---------- Site data (edit here, every page updates) ---------- */
  const CONTACT = {
    phone: "(000) 555-0142",
    email: "hello@example.com",
    address: "100 Example Avenue, Suite 200, Austin, TX"
  };

  const SERVICES = [
    { slug: "ai-review-management", icon: "star", name: "AI Review Management", short: "Turn happy customers into five-star proof.", long: "Automatically ask every customer for a review at the right moment, reply to feedback quickly, and show off your rating where new customers will see it." },
    { slug: "ai-voice-assistant", icon: "mic", name: "AI Voice Assistant", short: "An answer on every ring, even mid-move.", long: "A friendly AI receptionist picks up when your crew can't, answers common questions, collects move details, and books estimate calls into your calendar." },
    { slug: "ai-search-optimization", icon: "search", name: "AI Search Optimization", short: "Show up in Google and AI answers.", long: "Structure your content, listings and reputation so search engines and AI assistants recommend your company when people ask who to hire." },
    { slug: "website-design-development", icon: "monitor", name: "Website Design & Development", short: "A site that turns visits into quotes.", long: "Fast, mobile-first websites with instant-quote forms, service-area pages, and clear calls to action designed around how people actually book movers." },
    { slug: "ai-local-service-ads", icon: "megaphone", name: "AI Local Service Ads", short: "Pay for leads, not just clicks.", long: "Launch and manage Google Local Services Ads so your company appears at the very top of local searches, with spend tuned toward booked jobs." },
    { slug: "ai-dispatch", icon: "truck", name: "AI Dispatch", short: "Smarter schedules for every crew.", long: "Assign crews and trucks automatically based on job size, distance and availability, and keep everyone updated as the day changes." }
  ];

  const SOLUTIONS = [
    { slug: "missed-call-recovery", icon: "phone", name: "Missed Call Recovery", short: "Instant text-back when a call goes unanswered." },
    { slug: "crm-automation", icon: "users", name: "CRM Automation", short: "Every lead tracked, every follow-up on time." },
    { slug: "revenue-dashboard", icon: "chart", name: "Revenue Dashboard", short: "Bookings, revenue and ad spend in one view." },
    { slug: "quotes-and-invoices", icon: "file", name: "Quotes & Invoices", short: "Send estimates and get paid faster." },
    { slug: "job-management", icon: "calendar", name: "Job Management", short: "Move dates, inventories and notes in one place." },
    { slug: "staff-management", icon: "team", name: "Staff Management", short: "Shifts, roles and payroll hours made simple." }
  ];

  const RESOURCES = [
    { href: "about.html", icon: "info", name: "About Us", short: "Who we are and how we work." },
    { href: "blog.html", icon: "book", name: "Blog", short: "Growth tips written for movers." },
    { href: "faqs.html", icon: "help", name: "FAQs", short: "Quick answers before you call." },
    { href: "contact.html#review-link", icon: "star", name: "Leave a Review", short: "Share feedback about working with us." },
    { href: "affiliate.html", icon: "handshake", name: "Referral Program", short: "Earn for introducing moving companies." },
    { href: "contact.html", icon: "mail", name: "Contact", short: "Talk with a growth specialist." }
  ];

  // SAMPLE reviews — invented placeholders. Replace with real, permissioned client reviews before launch.
  const REVIEWS = [
    { name: "Marcus Hale", role: "Owner, Sample Moving Co.", quote: "Sample review: within the first couple of months our phones were busier than they'd been in years, and we finally knew which ads were paying off." },
    { name: "Priya Natarajan", role: "Operations Lead, Example Relocations", quote: "Sample review: the missed-call text-back alone won us jobs we used to lose. Setup was quick and the team explained everything in plain English." },
    { name: "Tom Becker", role: "Founder, Placeholder Van Lines", quote: "Sample review: our new website looks sharp on phones and quote requests come in with all the details we need to price the move." }
  ];

  const svc = (s) => "service-detail.html?s=" + s.slug;
  const sol = (s) => "solution-detail.html?s=" + s.slug;
  const pad = (n) => String(n).padStart(2, "0");
  const AVATAR_COLORS = ["#f25c1f", "#1a9e8f", "#0f1a2e", "#c98a00", "#5b6ee1"];
  const avatar = (name, i = 0) => {
    const initials = name.split(" ").map((w) => w[0]).slice(0, 2).join("");
    return `<span class="avatar" style="background:${AVATAR_COLORS[i % AVATAR_COLORS.length]}" aria-hidden="true">${initials}</span>`;
  };

  /* ---------- Icon sprite ---------- */
  const ICONS = {
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
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
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    bulb: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z"/>',
    eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    shield: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/>',
    trend: '<path d="m3 17 6-6 4 4 8-8M15 7h6v6"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    route: '<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8a3 3 0 0 0 0-6H8a3 3 0 0 1 0-6h8"/>',
    fb: '<path d="M15 3h-2.5A3.5 3.5 0 0 0 9 6.5V9H7v3.5h2V21h3.5v-8.5H15l.5-3.5h-3V7a1 1 0 0 1 1-1H15z"/>',
    ig: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5v.01"/>',
    in: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/>',
    yt: '<rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 9 5 3-5 3z"/>'
  };

  function sprite() {
    const symbols = Object.entries(ICONS).map(([id, d]) => `<symbol id="i-${id}" viewBox="0 0 24 24">${d}</symbol>`).join("");
    const wrap = document.createElement("div");
    wrap.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" style="display:none">${symbols}</svg>`;
    document.body.prepend(wrap.firstChild);
  }
  const ic = (name, cls = "ic") => `<svg class="${cls}" aria-hidden="true"><use href="#i-${name}"/></svg>`;
  window.MR = { SERVICES, SOLUTIONS, CONTACT, ic, avatar };

  /* ---------- Header ---------- */
  function header(active) {
    const cur = (key) => (active === key ? ' aria-current="page"' : "");
    const links = (items, hrefFn) => items.map((x) => `
      <a class="mega-link" href="${hrefFn(x)}">
        <span class="icon-badge">${ic(x.icon)}</span>
        <span><b>${x.name}</b><span>${x.short}</span></span>
      </a>`).join("");
    const promo = (eyebrow, title, text, href, label) => `
      <div class="mega-promo">
        <div><span class="eyebrow">${eyebrow}</span><h4>${title}</h4><p>${text}</p></div>
        <a class="btn btn--primary" href="${href}">${label} ${ic("arrow")}</a>
      </div>`;

    return `
    <div class="topbar">
      <div class="container">
        <span>Free growth audit for moving companies — <a href="contact.html">Claim yours ${ic("arrow")}</a></span>
        <div class="topbar-right">
          <a href="affiliate.html">Referral program</a>
          <a href="blog.html">Blog</a>
          <a href="mailto:${CONTACT.email}">${CONTACT.email}</a>
        </div>
      </div>
    </div>
    <header class="site-header">
      <div class="container hdr">
        <a class="hdr-brand" href="index.html" aria-label="Movers Rankers home">
          <img src="assets/img/logo.svg" alt="Movers Rankers" width="176" height="44">
        </a>

        <nav class="hdr-nav" aria-label="Primary">
          <ul class="hdr-list">
            <li><button class="hdr-link" aria-expanded="false" aria-controls="mega-services"${cur("services")}>Services <i class="chev"></i></button></li>
            <li><button class="hdr-link" aria-expanded="false" aria-controls="mega-solutions"${cur("solutions")}>Solutions <i class="chev"></i></button></li>
            <li><a class="hdr-link" href="pricing.html"${cur("pricing")}>Pricing</a></li>
            <li><button class="hdr-link" aria-expanded="false" aria-controls="mega-resources"${cur("resources")}>Company <i class="chev"></i></button></li>
          </ul>
        </nav>

        <div class="hdr-actions">
          <a class="hdr-phone" href="tel:${CONTACT.phone.replace(/\D/g, "")}">
            <span class="icon-badge">${ic("phone")}</span>
            <span><small>Talk to a specialist</small>${CONTACT.phone}</span>
          </a>
          <a class="btn btn--primary" href="contact.html">Get a Free Audit</a>
          <button class="hdr-burger" aria-label="Open menu" aria-controls="drawer" aria-expanded="false">${ic("menu")}</button>
        </div>

        <div class="mega" id="mega-services" hidden>
          <div class="mega-box">
            <div class="mega-links">${links(SERVICES, svc)}</div>
            ${promo("Services", "Not sure where to start?", "We'll review your search presence, website and reviews and show you the quickest wins.", "services.html", "View all services")}
          </div>
        </div>

        <div class="mega" id="mega-solutions" hidden>
          <div class="mega-box">
            <div class="mega-links">${links(SOLUTIONS, sol)}</div>
            ${promo("Solutions", "Run the office on autopilot", "Connect calls, quotes, jobs and crews so less falls through the cracks.", "solutions.html", "View all solutions")}
          </div>
        </div>

        <div class="mega" id="mega-resources" hidden>
          <div class="mega-box">
            <div class="mega-links">${links(RESOURCES, (r) => r.href)}</div>
            ${promo("Company", "Built only for movers", "We focus on one industry so every playbook fits your business.", "about.html", "Our story")}
          </div>
        </div>
      </div>
    </header>

    <div class="drawer" id="drawer" hidden>
      <div class="drawer-panel" role="dialog" aria-modal="true" aria-label="Menu">
        <div class="drawer-top">
          <img src="assets/img/logo.svg" alt="Movers Rankers" width="150" height="38">
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
        <details><summary>Company</summary>
          ${RESOURCES.map((r) => `<a href="${r.href}">${r.name}</a>`).join("")}
        </details>
        <div class="drawer-foot">
          <a class="btn btn--primary" href="contact.html">Get a Free Audit ${ic("arrow")}</a>
          <a class="btn btn--ghost" href="tel:${CONTACT.phone.replace(/\D/g, "")}">${ic("phone")} ${CONTACT.phone}</a>
        </div>
      </div>
    </div>`;
  }

  /* ---------- Footer ---------- */
  function footer() {
    return `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-cta">
          <h3>Ready to fill next month's calendar? Let's find your quickest wins.</h3>
          <a class="btn btn--primary" href="contact.html">Get a Free Audit ${ic("arrow")}</a>
        </div>
        <div class="footer-grid">
          <div class="footer-brand">
            <a href="index.html"><img src="assets/img/logo-light.svg" alt="Movers Rankers" width="190" height="48"></a>
            <p>Marketing, AI and automation built only for moving companies — so you can spend less time chasing leads and more time moving customers.</p>
            <div class="socials">
              <a href="#" aria-label="Facebook">${ic("fb")}</a>
              <a href="#" aria-label="Instagram">${ic("ig")}</a>
              <a href="#" aria-label="LinkedIn">${ic("in")}</a>
              <a href="#" aria-label="YouTube">${ic("yt")}</a>
            </div>
          </div>
          <div>
            <h5>Company</h5>
            <ul class="footer-links">
              <li><a href="about.html">About</a></li>
              <li><a href="services.html">Services</a></li>
              <li><a href="solutions.html">Solutions</a></li>
              <li><a href="pricing.html">Pricing</a></li>
              <li><a href="blog.html">Blog</a></li>
              <li><a href="affiliate.html">Referral Program</a></li>
            </ul>
          </div>
          <div>
            <h5>Services</h5>
            <ul class="footer-links">
              ${SERVICES.map((s) => `<li><a href="${svc(s)}">${s.name}</a></li>`).join("")}
            </ul>
          </div>
          <div>
            <h5>Get in touch</h5>
            <ul class="footer-links footer-contact">
              <li>${ic("phone")} ${CONTACT.phone}</li>
              <li>${ic("mail")} ${CONTACT.email}</li>
              <li>${ic("pin")} ${CONTACT.address}</li>
            </ul>
            <form class="newsletter" onsubmit="event.preventDefault(); this.reset();">
              <input type="email" placeholder="Monthly growth tips" aria-label="Email address" required>
              <button aria-label="Subscribe">${ic("arrow")}</button>
            </form>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} Movers Rankers. All rights reserved.</span>
          <nav><a href="#">Privacy</a><a href="#">Terms</a><a href="faqs.html">FAQs</a></nav>
        </div>
      </div>
    </footer>
    <button class="to-top" aria-label="Back to top">${ic("arrow")}</button>`;
  }

  /* ---------- Reusable sections ---------- */
  const PARTIALS = {
    reviews: () => `
    <section class="section section--alt">
      <div class="container">
        <div class="section-head section-head--split reveal">
          <div>
            <span class="eyebrow">Client stories</span>
            <h2 class="h2">Movers who stopped <span class="hl">guessing</span> about marketing</h2>
          </div>
          <p class="lead">Every business is different, but the goal is always the same: more of the right calls, and a clear view of what's working.</p>
        </div>
        <div class="review-grid">
          ${REVIEWS.map((r, i) => `
            <figure class="card review-card reveal" style="margin:0">
              <div style="display:flex;justify-content:space-between;align-items:center"><span class="stars">★★★★★</span><span class="sample-note">Sample</span></div>
              <blockquote>“${r.quote}”</blockquote>
              <figcaption class="review-person">${avatar(r.name, i)}<span><b>${r.name}</b><small>${r.role}</small></span></figcaption>
            </figure>`).join("")}
        </div>
        <div class="review-summary reveal">
          <span><strong>4.9 / 5</strong> average client rating <span class="sample-note" style="margin-left:8px">Placeholder</span></span>
          <a class="btn btn--light" href="contact.html">Become our next success story ${ic("arrow")}</a>
        </div>
      </div>
    </section>`,

    process: () => `
    <section class="section">
      <div class="container">
        <div class="section-head section-head--center reveal">
          <span class="eyebrow">How we work</span>
          <h2 class="h2">From first call to <span class="hl">full calendar</span> in four steps</h2>
        </div>
        <div class="process-grid">
          ${[
            ["Free audit", "We look at your rankings, reviews, website and ads, then show you exactly where leads are slipping away."],
            ["Custom plan", "You get a short, prioritized plan with clear costs — no long contracts or confusing jargon."],
            ["Launch", "Our team builds and switches everything on, usually within a few weeks, with minimal work on your side."],
            ["Monthly tune-ups", "We review results with you every month and keep adjusting toward more booked moves."]
          ].map(([title, text], i) => `
            <div class="card step reveal">
              <span class="step-num">${i + 1}</span>
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

  function countUp(el) {
    const target = +el.dataset.count;
    const suffix = el.dataset.suffix || "";
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / 1400, 1);
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
        io.unobserve(el);
      });
    }, { threshold: 0.15 });
    document.querySelectorAll(".reveal, [data-count]").forEach((el) => io.observe(el));
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
    initObservers();
    initToTop();
    initPriceTabs();
  });
})();
