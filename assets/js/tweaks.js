/* ============================================================
   DATALYZER · TWEAKS PANEL (vanilla)
   Lets users tweak color mode, density, font pairing, accent.
   Integrates with host edit-mode protocol via postMessage.
============================================================ */

(function () {
  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "theme": "light",
    "density": "cozy",
    "font": "geist",
    "brand": "magenta"
  }/*EDITMODE-END*/;

  // ── State + persistence ────────────────────────
  function loadFromUrl() {
    try {
      const stored = JSON.parse(localStorage.getItem("dlz_tweaks") || "{}");
      return Object.assign({}, TWEAK_DEFAULTS, stored);
    } catch (e) { return Object.assign({}, TWEAK_DEFAULTS); }
  }
  let state = loadFromUrl();

  function persist() {
    try { localStorage.setItem("dlz_tweaks", JSON.stringify(state)); } catch(e) {}
    try {
      window.parent.postMessage({ type: "__edit_mode_set_keys", edits: state }, "*");
    } catch (e) {}
  }

  // ── Apply state to <html> ──────────────────────
  const FONTS = {
    geist: {
      sans: '"Geist", ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      mono: '"Geist Mono", ui-monospace, "SF Mono", Menlo, monospace',
    },
    serif: {
      sans: '"Instrument Serif", "Source Serif Pro", Georgia, serif',
      mono: '"JetBrains Mono", ui-monospace, monospace',
    },
    grotesk: {
      sans: '"Space Grotesk", ui-sans-serif, sans-serif',
      mono: '"JetBrains Mono", ui-monospace, monospace',
    },
  };
  const BRANDS = {
    magenta: { hue: 0,   chroma: 0.22 },
    indigo:  { hue: 270, chroma: 0.18 },
    emerald: { hue: 150, chroma: 0.15 },
    amber:   { hue: 65,  chroma: 0.16 },
  };

  function ensureFontLink() {
    if (document.getElementById("tw-fonts")) return;
    const l = document.createElement("link");
    l.id = "tw-fonts";
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Instrument+Serif&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@400;500;600;700&display=swap";
    document.head.appendChild(l);
  }

  function apply() {
    const root = document.documentElement;
    // Theme
    root.dataset.theme = state.theme;
    // Density
    root.dataset.density = state.density;
    // Font
    ensureFontLink();
    const f = FONTS[state.font] || FONTS.geist;
    root.style.setProperty("--font-sans", f.sans);
    root.style.setProperty("--font-mono", f.mono);
    // Brand (only used if vertical not overriding accent; affects --brand)
    const b = BRANDS[state.brand] || BRANDS.magenta;
    root.style.setProperty("--brand", `oklch(0.62 ${b.chroma} ${b.hue})`);
    root.style.setProperty("--brand-soft", `oklch(0.96 0.04 ${b.hue})`);
    root.style.setProperty("--brand-ring", `oklch(0.62 ${b.chroma} ${b.hue} / 0.18)`);
    // If body has no [data-vertical], --accent = --brand will cascade
    // For verticals (their --accent override stays). To still influence accent on hub:
    if (!document.body.hasAttribute("data-vertical")) {
      root.style.setProperty("--accent", `oklch(0.62 ${b.chroma} ${b.hue})`);
      root.style.setProperty("--accent-soft", `oklch(0.96 0.04 ${b.hue})`);
      root.style.setProperty("--accent-ring", `oklch(0.62 ${b.chroma} ${b.hue} / 0.18)`);
    }
    syncControls();
  }

  // ── Panel UI ───────────────────────────────────
  let panel;
  function buildPanel() {
    panel = document.createElement("div");
    panel.className = "tw-panel";
    panel.innerHTML = `
      <div class="tw-head">
        <div class="tw-title">Tweaks</div>
        <button class="tw-close" aria-label="Cerrar">×</button>
      </div>
      <div class="tw-row" data-key="theme">
        <label>Tema</label>
        <div class="tw-seg">
          <button data-val="light">Claro</button>
          <button data-val="dark">Oscuro</button>
        </div>
      </div>
      <div class="tw-row" data-key="density">
        <label>Densidad</label>
        <div class="tw-seg">
          <button data-val="compact">Compacto</button>
          <button data-val="cozy">Cómodo</button>
          <button data-val="roomy">Amplio</button>
        </div>
      </div>
      <div class="tw-row" data-key="font">
        <label>Tipografía</label>
        <div class="tw-seg">
          <button data-val="geist">Geist</button>
          <button data-val="grotesk">Grotesk</button>
          <button data-val="serif">Serif</button>
        </div>
      </div>
      <div class="tw-row" data-key="brand">
        <label>Color de marca (afecta hub)</label>
        <div class="tw-swatches">
          <button class="tw-sw" data-val="magenta" style="background:oklch(0.62 0.22 0)"  title="Magenta"></button>
          <button class="tw-sw" data-val="indigo"  style="background:oklch(0.55 0.18 270)" title="Indigo"></button>
          <button class="tw-sw" data-val="emerald" style="background:oklch(0.58 0.15 150)" title="Emerald"></button>
          <button class="tw-sw" data-val="amber"   style="background:oklch(0.65 0.16 65)"  title="Amber"></button>
        </div>
      </div>
    `;
    document.body.appendChild(panel);

    panel.querySelector(".tw-close").addEventListener("click", () => {
      panel.classList.remove("is-open");
      try { window.parent.postMessage({ type: "__edit_mode_dismissed" }, "*"); } catch(e) {}
    });

    panel.querySelectorAll(".tw-seg button, .tw-sw").forEach(btn => {
      btn.addEventListener("click", () => {
        const key = btn.closest(".tw-row").dataset.key;
        state[key] = btn.dataset.val;
        apply();
        persist();
      });
    });
  }

  function syncControls() {
    if (!panel) return;
    panel.querySelectorAll(".tw-row").forEach(row => {
      const key = row.dataset.key;
      row.querySelectorAll("button[data-val]").forEach(b => {
        b.classList.toggle("is-active", b.dataset.val === state[key]);
      });
    });
  }

  function open() { panel?.classList.add("is-open"); syncControls(); }
  function close() { panel?.classList.remove("is-open"); }

  // ── Host integration ───────────────────────────
  window.addEventListener("message", (e) => {
    const d = e?.data;
    if (!d || typeof d !== "object") return;
    if (d.type === "__activate_edit_mode") open();
    if (d.type === "__deactivate_edit_mode") close();
  });

  function boot() {
    buildPanel();
    apply();
    try { window.parent.postMessage({ type: "__edit_mode_available" }, "*"); } catch(e) {}
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
