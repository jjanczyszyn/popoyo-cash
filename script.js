/* Cash Delivery Popoyo — single-page logic */

const WHATSAPP_NUMBER = "50589750052"; // Karen — Popoyo, NI
const FEE_RATE = 0.05;

const PAYMENT_CONFIG = {
  venmo:        { handle: "@justina-lydia", url: "https://venmo.com/u/justina-lydia" },
  zelle:        { phone: "+1 646 934 0781", recipient: "Justyna Janczyszyn" },
  paypal:       { url: "https://paypal.me/JustinaLydia", note: "Friends & Family preferred" },
  apple_pay:    { url: "https://revolut.me/justynshx", note: "Tap Apple Pay on the hosted page" },
  apple_cash:   { phone: "+1 646 934 0781" },
  bizum:        { phone: "+34 600 000 000", note: "Confirm number on WhatsApp before sending" },
  bank_transfer:{
    name: "Justyna Janczyszyn",
  },
};

const I18N = {
  en: {
    "brand": "Cash Popoyo",
    "hero.title": "Get Cash Delivered",
    "hero.sub": "Pay digitally. Receive cash.",
    "fee": "5% fee",
    "cta": "Get Cash",
    "methods": "Venmo · Zelle · PayPal · Apple Pay · Apple Cash · Bizum · Bank Transfer",
    "form.amount": "Amount (USD)",
    "form.name": "Name",
    "form.whatsapp": "WhatsApp",
    "form.location": "Location (or Maps link)",
    "form.method": "Payment method",
    "form.method.bank": "Bank transfer",
    "form.submit": "Send Request",
    "steps.step1": "1. Send payment",
    "steps.step2": "2. We confirm on WhatsApp",
    "steps.step3": "3. Cash delivered",
    "openWhatsApp": "Open WhatsApp",
    "receive": (n) => `You receive $${n}`,
    "pay.send": "Send to",
    "pay.handle": "Handle",
    "pay.phone": "Phone",
    "pay.email": "Email",
    "pay.recipient": "Recipient",
    "pay.link": "Link",
    "pay.name": "Beneficiary",
    "pay.note": "Note",
    "pay.amount": "Amount",
    "pay.bank.note": "We'll share account details on WhatsApp.",
    "wa.message": (a, m, l) => `I want $${a} cash. I will pay via ${m}. Location: ${l}`,
    "method.venmo": "Venmo",
    "method.zelle": "Zelle",
    "method.paypal": "PayPal",
    "method.apple_pay": "Apple Pay",
    "method.apple_cash": "Apple Cash",
    "method.bizum": "Bizum",
    "method.bank_transfer": "Bank transfer",
  },
  es: {
    "brand": "Cash Popoyo",
    "hero.title": "Recibe efectivo a domicilio",
    "hero.sub": "Paga digital. Recibe efectivo.",
    "fee": "5% comisión",
    "cta": "Recibir efectivo",
    "methods": "Venmo · Zelle · PayPal · Apple Pay · Apple Cash · Bizum · Transferencia",
    "form.amount": "Monto (USD)",
    "form.name": "Nombre",
    "form.whatsapp": "WhatsApp",
    "form.location": "Ubicación (o enlace de Maps)",
    "form.method": "Método de pago",
    "form.method.bank": "Transferencia bancaria",
    "form.submit": "Enviar solicitud",
    "steps.step1": "1. Envía el pago",
    "steps.step2": "2. Confirmamos por WhatsApp",
    "steps.step3": "3. Entrega de efectivo",
    "openWhatsApp": "Abrir WhatsApp",
    "receive": (n) => `Recibes $${n}`,
    "pay.send": "Enviar a",
    "pay.handle": "Usuario",
    "pay.phone": "Teléfono",
    "pay.email": "Correo",
    "pay.recipient": "Beneficiario",
    "pay.link": "Enlace",
    "pay.name": "Beneficiario",
    "pay.note": "Nota",
    "pay.amount": "Monto",
    "pay.bank.note": "Te enviamos los datos de la cuenta por WhatsApp.",
    "wa.message": (a, m, l) => `Quiero $${a} en efectivo. Pagaré con ${m}. Ubicación: ${l}`,
    "method.venmo": "Venmo",
    "method.zelle": "Zelle",
    "method.paypal": "PayPal",
    "method.apple_pay": "Apple Pay",
    "method.apple_cash": "Apple Cash",
    "method.bizum": "Bizum",
    "method.bank_transfer": "Transferencia",
  },
};

/* Language */
function detectLang() {
  const stored = localStorage.getItem("lang");
  if (stored === "en" || stored === "es") return stored;
  return (navigator.language || "en").toLowerCase().startsWith("es") ? "es" : "en";
}

let LANG = detectLang();

function t(key) {
  return I18N[LANG][key] ?? I18N.en[key] ?? key;
}

function applyI18n() {
  document.documentElement.lang = LANG;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const val = t(key);
    if (typeof val === "string") el.textContent = val;
  });
  document.querySelectorAll(".lang-btn").forEach((b) => {
    b.classList.toggle("active", b.dataset.lang === LANG);
  });
  updateReceiveLine();
}

function setLang(lang) {
  LANG = lang;
  localStorage.setItem("lang", lang);
  applyI18n();
}

/* Fee calculation */
function updateReceiveLine() {
  const input = document.querySelector('input[name="amount"]');
  const line = document.getElementById("receiveLine");
  if (!input || !line) return;
  const amt = parseFloat(input.value);
  if (!isFinite(amt) || amt <= 0) {
    line.hidden = true;
    return;
  }
  const receives = (amt - amt * FEE_RATE).toFixed(2);
  line.textContent = t("receive")(receives);
  line.hidden = false;
}

/* Payment instructions HTML */
function paymentInstructionsHTML(method, amountToSend) {
  const cfg = PAYMENT_CONFIG[method];
  const label = t(`method.${method}`);
  const row = (lbl, val) =>
    `<div class="row"><span class="label">${lbl}</span><span class="value">${val}</span></div>`;
  const linkRow = (lbl, href, text) =>
    `<div class="row"><span class="label">${lbl}</span><span class="value"><a href="${href}" target="_blank" rel="noopener">${text}</a></span></div>`;

  let body = "";
  switch (method) {
    case "venmo":
      body =
        row(t("pay.amount"), `$${amountToSend}`) +
        linkRow(t("pay.handle"), cfg.url, cfg.handle);
      break;
    case "zelle":
      body =
        row(t("pay.amount"), `$${amountToSend}`) +
        row(t("pay.phone"), cfg.phone) +
        row(t("pay.recipient"), cfg.recipient);
      break;
    case "paypal":
      body =
        row(t("pay.amount"), `$${amountToSend}`) +
        linkRow(t("pay.link"), cfg.url, cfg.url) +
        row(t("pay.note"), cfg.note);
      break;
    case "apple_pay":
      body =
        row(t("pay.amount"), `$${amountToSend}`) +
        linkRow(t("pay.link"), cfg.url, cfg.url) +
        row(t("pay.note"), cfg.note);
      break;
    case "apple_cash":
      body =
        row(t("pay.amount"), `$${amountToSend}`) +
        row(t("pay.phone"), cfg.phone);
      break;
    case "bizum":
      body =
        row(t("pay.amount"), `$${amountToSend}`) +
        row(t("pay.phone"), cfg.phone) +
        row(t("pay.note"), cfg.note);
      break;
    case "bank_transfer":
      body =
        row(t("pay.amount"), `$${amountToSend}`) +
        row(t("pay.name"), cfg.name) +
        row(t("pay.note"), t("pay.bank.note"));
      break;
  }

  return `<div class="row" style="margin-bottom:8px;font-weight:700">${label}</div>${body}`;
}

/* Submit */
function onSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);
  const amount = parseFloat(data.get("amount"));
  const name = String(data.get("name") || "").trim();
  const whatsapp = String(data.get("whatsapp") || "").trim();
  const location = String(data.get("location") || "").trim();
  const method = String(data.get("paymentMethod") || "");

  if (!isFinite(amount) || amount <= 0 || !name || !whatsapp || !location || !method) return;

  const methodLabel = t(`method.${method}`);
  const message = t("wa.message")(amount, methodLabel, location);
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  const formCard = document.getElementById("formCard");
  const insCard = document.getElementById("instructionsCard");
  const ins = document.getElementById("paymentInstructions");
  const waLink = document.getElementById("waLink");

  ins.innerHTML = paymentInstructionsHTML(method, amount.toFixed(2));
  waLink.href = waUrl;
  formCard.hidden = true;
  insCard.hidden = false;
  insCard.scrollIntoView({ behavior: "smooth", block: "start" });

  // Open WhatsApp in a new tab automatically (user gesture flowed from submit).
  window.open(waUrl, "_blank", "noopener");
}

/* Wire up */
document.addEventListener("DOMContentLoaded", () => {
  applyI18n();

  document.querySelectorAll(".lang-btn").forEach((b) => {
    b.addEventListener("click", () => setLang(b.dataset.lang));
  });

  document.getElementById("ctaScroll").addEventListener("click", () => {
    document.getElementById("formCard").scrollIntoView({ behavior: "smooth", block: "start" });
    const first = document.querySelector('input[name="amount"]');
    if (first) setTimeout(() => first.focus(), 350);
  });

  document.querySelector('input[name="amount"]').addEventListener("input", updateReceiveLine);

  document.getElementById("requestForm").addEventListener("submit", onSubmit);
});
