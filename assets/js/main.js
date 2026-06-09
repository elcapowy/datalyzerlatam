/* ============================================================
   DATALYZER · MAIN
   Fade-in observer + nav scroll state.
============================================================ */

(function () {
  // Fade-up on scroll
  function initFadeUp() {
    const els = document.querySelectorAll(".fade-up");
    if (!els.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.05 });
    els.forEach(el => io.observe(el));
  }

  // Tabs (dash-tabs)
  function initTabs() {
    document.querySelectorAll("[data-tabs]").forEach(group => {
      const tabs = group.querySelectorAll("[data-tab]");
      tabs.forEach(t => {
        t.addEventListener("click", () => {
          tabs.forEach(x => x.classList.remove("is-active"));
          t.classList.add("is-active");
        });
      });
    });
  }

  // Smooth-scroll padding offset is in CSS already via scroll-margin-top on sections.

  // Hamburger mobile nav
  function initHamburger() {
    const btn = document.querySelector('.nav-hamburger');
    const menu = document.querySelector('.nav-mobile');
    if (!btn || !menu) return;
    btn.addEventListener('click', () => {
      const open = menu.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // Close on link click
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        menu.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Floating CTA — aparece al salir del hero, se oculta en #contacto
  function initFloatCTA() {
    const btn = document.getElementById('float-cta');
    const hero = document.querySelector('.hero, .v-hero');
    const contact = document.getElementById('contacto');
    if (!btn || !hero) return;
    const showIO = new IntersectionObserver(entries => {
      entries.forEach(e => btn.classList.toggle('is-visible', !e.isIntersecting));
    }, { threshold: 0 });
    showIO.observe(hero);
    if (contact) {
      const hideIO = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) btn.classList.remove('is-visible'); });
      }, { threshold: 0.3 });
      hideIO.observe(contact);
    }
  }

  function boot() {
    initFadeUp();
    initTabs();
    initHamburger();
    initFloatCTA();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
