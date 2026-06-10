/* ============================================================
   DATALYZER · ROI CALCULATOR
   Computes annual savings + payback from form inputs.
   Custom inline validation — no native HTML5 popups.
============================================================ */

(function () {
  function fmtCurrency(v) {
    if (!isFinite(v)) return "—";
    if (Math.abs(v) >= 1e6) return (v / 1e6).toFixed(2).replace(/\.?0+$/, "") + "M";
    if (Math.abs(v) >= 1e3) return Math.round(v / 1e3).toLocaleString("es-AR") + "k";
    return Math.round(v).toLocaleString("es-AR");
  }

  function initROI(root) {
    const vertical = root.dataset.vertical || "default";
    const presets = {
      alimentos:    { rejectFrom: 0.20, rejectTo: 0.05, exportLift: 0.35, batchValue: 18000 },
      quimicos:     { rejectFrom: 0.10, rejectTo: 0.02, exportLift: 0.25, batchValue: 55000 },
      farmaceutica: { rejectFrom: 0.06, rejectTo: 0.005, exportLift: 0.18, batchValue: 95000 },
      aseo:         { rejectFrom: 0.08, rejectTo: 0.01, exportLift: 0.30, batchValue: 22000 },
      manufactura:  { rejectFrom: 0.05, rejectTo: 0.005, exportLift: 0.22, batchValue: 65000 },
      empaque:      { rejectFrom: 0.12, rejectTo: 0.015, exportLift: 0.28, batchValue: 32000 },
      default:      { rejectFrom: 0.12, rejectTo: 0.02, exportLift: 0.25, batchValue: 40000 },
    };
    const cfg = presets[vertical] || presets.default;

    const get = (sel) => root.querySelector(sel);
    const batchEl   = get("[data-roi-batches]");
    const valueEl   = get("[data-roi-value]");
    const rejectEl  = get("[data-roi-reject]");
    const rejectOut = get("[data-roi-reject-out]");

    const outSavings   = get("[data-roi-savings]");
    const outRecovered = get("[data-roi-recovered]");
    const outExport    = get("[data-roi-export]");
    const outPayback   = get("[data-roi-payback]");

    const batchErrEl = get('[data-roi-err="batches"]');
    const valueErrEl = get('[data-roi-err="value"]');

    // Set defaults from preset
    if (rejectEl) {
      rejectEl.value = Math.round(cfg.rejectFrom * 100);
      if (rejectOut) rejectOut.textContent = rejectEl.value + "%";
    }
    if (valueEl && !valueEl.value) valueEl.value = cfg.batchValue;
    if (batchEl && !batchEl.value) batchEl.value = 40;

    /* ── Inline validation helpers ── */
    function setFieldError(inputEl, errEl, msg) {
      const wrap = inputEl ? inputEl.closest(".roi-input-wrap") : null;
      if (wrap) wrap.classList.toggle("has-error", !!msg);
      if (errEl) errEl.textContent = msg || "";
    }

    function validateBatches(raw) {
      if (raw === "" || raw === null) return "Ingresá la cantidad de lotes";
      const n = parseFloat(raw);
      if (isNaN(n))  return "Ingresá un número válido";
      if (n < 0)     return "El valor debe ser mayor a 0";
      return null;
    }

    function validateValue(raw) {
      if (raw === "" || raw === null) return "Ingresá el valor del lote";
      const n = parseFloat(raw);
      if (isNaN(n))  return "Ingresá un número válido";
      if (n < 0)     return "El valor debe ser mayor a 0";
      return null;
    }

    function recompute() {
      const batchRaw  = batchEl  ? batchEl.value  : "";
      const valueRaw  = valueEl  ? valueEl.value  : "";

      const batchErr = validateBatches(batchRaw);
      const valueErr = validateValue(valueRaw);

      setFieldError(batchEl, batchErrEl, batchErr);
      setFieldError(valueEl, valueErrEl, valueErr);

      // Always compute — clamp negatives to 0 silently
      const batches = Math.max(0, parseFloat(batchRaw) || 0);
      const value   = Math.max(0, parseFloat(valueRaw) || 0);
      const rejectFromPct = Math.max(0, parseFloat(rejectEl ? rejectEl.value : 0)) / 100;
      const rejectFrom    = Math.max(rejectFromPct, cfg.rejectTo);

      const annualOutput     = batches * value * 12;
      const recoveredAnnual  = annualOutput * (rejectFrom - cfg.rejectTo);
      const exportLiftAnnual = annualOutput * cfg.exportLift * 0.35;
      const savingsAnnual    = recoveredAnnual + exportLiftAnnual;

      const yearlyLicense  = 18000;
      const paybackMonths  = savingsAnnual > 0
        ? (yearlyLicense / (savingsAnnual / 12))
        : Infinity;

      if (outSavings)   outSavings.textContent   = "$" + fmtCurrency(savingsAnnual);
      if (outRecovered) outRecovered.textContent = "$" + fmtCurrency(recoveredAnnual);
      if (outExport)    outExport.textContent    = "$" + fmtCurrency(exportLiftAnnual);
      if (outPayback)   outPayback.textContent   = paybackMonths > 36 ? "—" : paybackMonths.toFixed(1) + " m";
      if (rejectOut)    rejectOut.textContent    = Math.round(rejectFromPct * 100) + "%";
    }

    // Validate on blur; recompute on every input
    [batchEl, valueEl].forEach(el => {
      if (!el) return;
      el.addEventListener("input", recompute);
      el.addEventListener("blur",  recompute);
    });
    if (rejectEl) rejectEl.addEventListener("input", recompute);

    recompute();
  }

  function boot() {
    document.querySelectorAll("[data-roi]").forEach(initROI);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
