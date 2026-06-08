/* ============================================================
   DATALYZER · CHARTS
   Lightweight canvas SPC + sparkline renderer.
============================================================ */

(function () {
  // Read CSS var from doc root with fallback
  function cssVar(name, fallback) {
    const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return v || fallback;
  }

  // ── SPC CONTROL CHART ──────────────────────────
  function initSPCChart(canvas) {
    const ctx = canvas.getContext("2d");
    let dpr = Math.max(1, window.devicePixelRatio || 1);
    let w = 0, h = 0;
    const points = [];     // {y, t, oos}
    const maxPts = 36;
    const mean = 50, sigma = 6;
    let lastSample = null;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    new ResizeObserver(resize).observe(canvas);

    // Box-Muller for normal-ish samples
    function randn() {
      let u = 0, v = 0;
      while (u === 0) u = Math.random();
      while (v === 0) v = Math.random();
      return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    }
    function sample() {
      // Mostly in-control, occasionally drifty for visual interest
      const drift = (Math.sin(performance.now() / 11000) * 1.2);
      const y = mean + drift + randn() * sigma * 0.55;
      return Math.max(20, Math.min(80, y));
    }

    // Pre-fill
    for (let i = 0; i < maxPts; i++) points.push({ y: sample(), oos: false });

    function step() {
      const y = sample();
      const oos = y > mean + 3 * sigma || y < mean - 3 * sigma;
      points.push({ y, oos });
      while (points.length > maxPts) points.shift();
    }

    let nextTick = 0;
    const interval = 900; // ms

    function draw(ts) {
      if (!ts) ts = performance.now();
      if (ts > nextTick) { step(); nextTick = ts + interval; }

      ctx.clearRect(0, 0, w, h);

      const accent = cssVar("--accent", "#FF1A56");
      const ink = cssVar("--ink", "#0a0a0a");
      const ink3 = cssVar("--ink-3", "#86868b");
      const ink4 = cssVar("--ink-4", "#9a9a96");
      const surface = cssVar("--surface", "#ffffff");
      const grid = cssVar("--grid", "rgba(10,10,10,0.06)");
      const bad = cssVar("--bad", "#b91c1c");

      const padL = 38, padR = 14, padT = 16, padB = 22;
      const cw = w - padL - padR;
      const ch = h - padT - padB;

      const yMin = 20, yMax = 80;
      const yToPx = (y) => padT + (1 - (y - yMin) / (yMax - yMin)) * ch;

      // Grid horizontal
      ctx.strokeStyle = grid;
      ctx.lineWidth = 1;
      for (let i = 0; i <= 4; i++) {
        const yy = padT + (i / 4) * ch;
        ctx.beginPath(); ctx.moveTo(padL, yy); ctx.lineTo(w - padR, yy); ctx.stroke();
      }

      // Y labels (mono)
      ctx.fillStyle = ink3;
      ctx.font = "10px 'Geist Mono', ui-monospace, monospace";
      ctx.textBaseline = "middle";
      ctx.textAlign = "right";
      [yMax, mean + sigma, mean, mean - sigma, yMin].forEach(v => {
        ctx.fillText(v.toFixed(0), padL - 8, yToPx(v));
      });

      // ── Control band (μ ± 1σ shaded)
      ctx.fillStyle = accent + "12";
      ctx.fillRect(padL, yToPx(mean + sigma), cw, yToPx(mean - sigma) - yToPx(mean + sigma));

      // UCL / LCL dashed (μ ± 3σ)
      ctx.strokeStyle = ink4;
      ctx.setLineDash([4, 6]);
      ctx.lineWidth = 1;
      [mean + 3 * sigma, mean - 3 * sigma].forEach(v => {
        ctx.beginPath(); ctx.moveTo(padL, yToPx(v)); ctx.lineTo(w - padR, yToPx(v)); ctx.stroke();
      });
      ctx.setLineDash([]);

      // Centerline
      ctx.strokeStyle = ink + "60";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(padL, yToPx(mean)); ctx.lineTo(w - padR, yToPx(mean));
      ctx.stroke();

      // Series line
      const n = points.length;
      const stepX = cw / (maxPts - 1);
      ctx.beginPath();
      points.forEach((p, i) => {
        const x = padL + i * stepX;
        const y = yToPx(p.y);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.strokeStyle = accent;
      ctx.lineWidth = 1.6;
      ctx.lineJoin = "round";
      ctx.stroke();

      // Area fill under line (subtle)
      ctx.lineTo(padL + (n - 1) * stepX, padT + ch);
      ctx.lineTo(padL, padT + ch);
      ctx.closePath();
      ctx.fillStyle = accent + "10";
      ctx.fill();

      // Points
      points.forEach((p, i) => {
        const x = padL + i * stepX;
        const y = yToPx(p.y);
        ctx.fillStyle = surface;
        ctx.strokeStyle = p.oos ? bad : accent;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.arc(x, y, i === n - 1 ? 4 : 2.4, 0, Math.PI * 2);
        ctx.fill(); ctx.stroke();
        if (i === n - 1) {
          // pulse ring on latest point
          const phase = (ts % 1600) / 1600;
          const r = 4 + phase * 12;
          ctx.strokeStyle = accent;
          ctx.globalAlpha = 1 - phase;
          ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.stroke();
          ctx.globalAlpha = 1;
        }
      });

      // X axis tick labels at bottom (sample numbers)
      ctx.fillStyle = ink3;
      ctx.font = "10px 'Geist Mono', ui-monospace, monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      for (let i = 0; i < n; i += 9) {
        ctx.fillText("n" + (i + 1), padL + i * stepX, padT + ch + 6);
      }

      // Live KPI broadcast (CpK, Mean) on element if needed
      const last = points[n - 1];
      lastSample = last.y;
      canvas.dataset.last = last.y.toFixed(2);

      requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);

    return {
      getLast: () => lastSample,
    };
  }

  // ── SPARKLINE ──────────────────────────────────
  function initSparkline(svg) {
    const w = 100, h = 32;
    svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
    svg.setAttribute("preserveAspectRatio", "none");
    const points = JSON.parse(svg.dataset.points || "[]");
    if (!points.length) {
      for (let i = 0; i < 20; i++) points.push(50 + Math.random() * 40 - 20);
    }
    const max = Math.max(...points), min = Math.min(...points);
    const sx = w / (points.length - 1);
    const sy = (v) => h - ((v - min) / (max - min || 1)) * (h - 4) - 2;
    let d = "";
    points.forEach((v, i) => { d += (i === 0 ? "M" : "L") + (i * sx).toFixed(2) + "," + sy(v).toFixed(2); });
    const trend = svg.dataset.trend || "down"; // down=mejora
    const color = trend === "down" ? "var(--good)" : "var(--bad)";
    svg.innerHTML =
      `<path d="${d} L${w},${h} L0,${h} Z" fill="${color}" fill-opacity="0.08"/>` +
      `<path d="${d}" stroke="${color}" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` +
      `<circle cx="${(points.length - 1) * sx}" cy="${sy(points[points.length - 1])}" r="2.4" fill="${color}"/>`;
  }

  // ── LIVE KPI ROTATION ──────────────────────────
  function initLiveKpis(container) {
    const items = container.querySelectorAll("[data-live-kpi]");
    const targets = [
      { v: "1.42", l: "Cpk Proceso", d: "+0.08" },
      { v: "49.8", l: "Media (μ)", d: "stable" },
      { v: "5.7σ", l: "Desv. estd.", d: "-0.3" },
      { v: "99.3%", l: "Yield", d: "+0.4" },
    ];
    items.forEach((el, i) => {
      const t = targets[i % targets.length];
      el.querySelector("[data-v]").textContent = t.v;
      el.querySelector("[data-l]").textContent = t.l;
      el.querySelector("[data-d]").textContent = t.d;
    });
    // gentle live jitter on the values
    const jitterTargets = container.querySelectorAll("[data-v]");
    setInterval(() => {
      jitterTargets.forEach((el) => {
        const raw = parseFloat(el.textContent);
        if (isNaN(raw)) return;
        const next = raw + (Math.random() - 0.5) * 0.15;
        const decimals = el.textContent.includes(".") ? (el.textContent.split(".")[1].replace(/[^0-9]/g,"").length || 1) : 0;
        const suffix = el.textContent.replace(/[\d.,-]/g, "");
        el.textContent = next.toFixed(decimals) + suffix;
      });
    }, 1600);
  }

  // ── BOOTSTRAP ──────────────────────────────────
  function boot() {
    document.querySelectorAll("[data-spc-chart]").forEach(initSPCChart);
    document.querySelectorAll("[data-spark]").forEach(initSparkline);
    document.querySelectorAll("[data-live-kpis]").forEach(initLiveKpis);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else { boot(); }

  window.DLZ = window.DLZ || {};
  window.DLZ.initSPCChart = initSPCChart;
  window.DLZ.initSparkline = initSparkline;
})();
