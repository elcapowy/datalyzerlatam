/* ============================================================
   DATALYZER · ROI CALCULATOR
   Computes annual savings + payback from form inputs.
============================================================ */

(function () {
  function fmtCurrency(v) {
    if (!isFinite(v)) return "—";
    if (Math.abs(v) >= 1e6) return (v / 1e6).toFixed(2).replace(/\.?0+$/, "") + "M";
    if (Math.abs(v) >= 1e3) return Math.round(v / 1e3).toLocaleString("es-AR") + "k";
    return Math.round(v).toLocaleString("es-AR");
  }
  function fmtPct(v) { return (v * 100).toFixed(0) + "%"; }

  function initROI(root) {
    const vertical = root.dataset.vertical || "default";
    // Per-vertical defaults (reduction targets and value-per-batch baseline)
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
    const batchEl = get("[data-roi-batches]");
    const valueEl = get("[data-roi-value]");
    const rejectEl = get("[data-roi-reject]");
    const rejectOut = get("[data-roi-reject-out]");

    const outSavings = get("[data-roi-savings]");
    const outRecovered = get("[data-roi-recovered]");
    const outExport = get("[data-roi-export]");
    const outPayback = get("[data-roi-payback]");

    // Set defaults from preset
    if (rejectEl) {
      rejectEl.value = Math.round(cfg.rejectFrom * 100);
      rejectOut && (rejectOut.textContent = rejectEl.value + "%");
    }
    if (valueEl && !valueEl.value) valueEl.value = cfg.batchValue;
    if (batchEl && !batchEl.value) batchEl.value = 40;

    function recompute() {
      const batches = Math.max(0, parseFloat(batchEl?.value || 0));   // per month
      const value = Math.max(0, parseFloat(valueEl?.value || 0));     // per batch in USD
      const rejectFromPct = Math.max(0, parseFloat(rejectEl?.value || 0)) / 100;
      const rejectFrom = Math.max(rejectFromPct, cfg.rejectTo);

      const monthlyOutput = batches * value;
      const annualOutput = monthlyOutput * 12;

      const recoveredAnnual = annualOutput * (rejectFrom - cfg.rejectTo);
      const exportLiftAnnual = annualOutput * cfg.exportLift * 0.35; // conservative
      const savingsAnnual = recoveredAnnual + exportLiftAnnual;

      // Cost assumption (license) — illustrative
      const yearlyLicense = 18000;
      const paybackMonths = savingsAnnual > 0 ? (yearlyLicense / (savingsAnnual / 12)) : Infinity;

      outSavings && (outSavings.textContent = "$" + fmtCurrency(savingsAnnual));
      outRecovered && (outRecovered.textContent = "$" + fmtCurrency(recoveredAnnual));
      outExport && (outExport.textContent = "$" + fmtCurrency(exportLiftAnnual));
      outPayback && (outPayback.textContent = paybackMonths > 36 ? "—" : paybackMonths.toFixed(1) + " m");

      if (rejectOut) rejectOut.textContent = Math.round(rejectFromPct * 100) + "%";
    }

    [batchEl, valueEl, rejectEl].forEach(el => {
      if (!el) return;
      el.addEventListener("input", recompute);
    });
    recompute();
  }

  function boot() {
    document.querySelectorAll("[data-roi]").forEach(initROI);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
