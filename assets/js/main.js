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

  function boot() {
    initFadeUp();
    initTabs();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
