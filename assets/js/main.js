/* ============================================================
   DATALYZER · MAIN
   Fade-in observer + nav scroll state.
============================================================ */

(function () {
  // Fade-up on scroll
  function initFadeUp() {
    // Enable animation only when JS is running (prevents invisible content in static renderers)
    document.body.classList.add('js-ready');

    var els = document.querySelectorAll('.fade-up');
    if (!els.length) return;

    // Immediately reveal elements already visible in the viewport
    function revealVisible() {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      els.forEach(function(el) {
        var r = el.getBoundingClientRect();
        if (r.top < vh && r.bottom > 0) el.classList.add('is-in');
      });
    }

    // Run immediately + after layout settles
    requestAnimationFrame(function() {
      revealVisible();
      setTimeout(revealVisible, 120);
    });

    var io = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.04 });

    els.forEach(function(el) {
      if (!el.classList.contains('is-in')) io.observe(el);
    });
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

  /* ── Contact form validation + Calendly prefill ── */
  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const fields = {
      nombre: {
        el: document.getElementById('cf-nombre'),
        errEl: document.getElementById('err-nombre'),
        validate: function(val) {
          if (!val.trim()) return 'El nombre es obligatorio';
          if (/\d/.test(val)) return 'El nombre no puede contener números';
          if (val.trim().length < 2) return 'Ingresá al menos 2 caracteres';
          return null;
        }
      },
      tel: {
        el: document.getElementById('cf-tel'),
        errEl: document.getElementById('err-tel'),
        validate: function(val) {
          if (!val.trim()) return 'El teléfono es obligatorio';
          var cleaned = val.replace(/[\s\-\(\)\+]/g, '');
          if (!/^\d{7,15}$/.test(cleaned)) return 'Ingresá un número de teléfono válido';
          return null;
        }
      },
      email: {
        el: document.getElementById('cf-email'),
        errEl: document.getElementById('err-email'),
        validate: function(val) {
          if (!val.trim()) return 'El email es obligatorio';
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return 'Ingresá un email válido';
          return null;
        }
      }
    };

    function applyError(fieldKey, msg) {
      var f = fields[fieldKey];
      if (!f) return;
      var ff = f.el ? f.el.closest('.cf-field') : null;
      if (f.errEl) f.errEl.textContent = msg || '';
      if (ff) {
        ff.classList.toggle('has-error', !!msg);
        ff.classList.toggle('is-valid', !msg && !!(f.el && f.el.value.trim()));
      }
    }

    // Live: clear error on input once field was touched; revalidate on blur
    Object.keys(fields).forEach(function(key) {
      var f = fields[key];
      if (!f.el) return;
      f.el.addEventListener('blur', function() {
        applyError(key, f.validate(f.el.value));
      });
      f.el.addEventListener('input', function() {
        var ff = f.el.closest('.cf-field');
        if (ff && ff.classList.contains('has-error')) {
          applyError(key, f.validate(f.el.value));
        }
      });
    });

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var valid = true;
      Object.keys(fields).forEach(function(key) {
        var err = fields[key].validate(fields[key].el ? fields[key].el.value : '');
        applyError(key, err);
        if (err) valid = false;
      });
      if (!valid) {
        // Focus first error
        var firstErr = form.querySelector('.cf-field.has-error input');
        if (firstErr) firstErr.focus();
        return;
      }

      var nombre  = fields.nombre.el.value.trim();
      var email   = fields.email.el.value.trim();
      var tel     = fields.tel.el.value.trim();
      var empresa = (document.getElementById('cf-empresa') || {}).value || '';

      var url = 'https://calendly.com/mwyler-datalyzer/30min'
        + '?name='  + encodeURIComponent(nombre)
        + '&email=' + encodeURIComponent(email)
        + '&a1='    + encodeURIComponent(tel)
        + '&a2='    + encodeURIComponent(empresa.trim());

      if (window.Calendly && typeof Calendly.initPopupWidget === 'function') {
        Calendly.initPopupWidget({ url: url });
      } else {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    });
  }

  function boot() {
    initFadeUp();
    initTabs();
    initHamburger();
    initFloatCTA();
    initContactForm();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
