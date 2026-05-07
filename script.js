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
    "hero.tagline": "No ATM in Popoyo? No problem. We deliver cash to you.",
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
    "hero.tagline": "¿Sin cajero en Popoyo? No hay problema. Te llevamos efectivo.",
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
  de: {
    "brand": "Cash Popoyo",
    "hero.title": "Bargeld geliefert",
    "hero.tagline": "Kein Geldautomat in Popoyo? Kein Problem. Wir bringen das Bargeld zu dir.",
    "hero.sub": "Digital bezahlen. Bargeld erhalten.",
    "fee": "5% Gebühr",
    "cta": "Bargeld holen",
    "methods": "Venmo · Zelle · PayPal · Apple Pay · Apple Cash · Bizum · Banküberweisung",
    "form.amount": "Betrag (USD)",
    "form.name": "Name",
    "form.whatsapp": "WhatsApp",
    "form.location": "Standort (oder Maps-Link)",
    "form.method": "Zahlungsmethode",
    "form.method.bank": "Banküberweisung",
    "form.submit": "Anfrage senden",
    "steps.step1": "1. Zahlung senden",
    "steps.step2": "2. Wir bestätigen per WhatsApp",
    "steps.step3": "3. Bargeldlieferung",
    "openWhatsApp": "WhatsApp öffnen",
    "receive": (n) => `Du erhältst $${n}`,
    "pay.send": "Senden an",
    "pay.handle": "Benutzer",
    "pay.phone": "Telefon",
    "pay.email": "E-Mail",
    "pay.recipient": "Empfänger",
    "pay.link": "Link",
    "pay.name": "Empfänger",
    "pay.note": "Hinweis",
    "pay.amount": "Betrag",
    "pay.bank.note": "Wir senden dir die Kontodaten per WhatsApp.",
    "wa.message": (a, m, l) => `Ich möchte $${a} Bargeld. Ich zahle per ${m}. Standort: ${l}`,
    "method.venmo": "Venmo",
    "method.zelle": "Zelle",
    "method.paypal": "PayPal",
    "method.apple_pay": "Apple Pay",
    "method.apple_cash": "Apple Cash",
    "method.bizum": "Bizum",
    "method.bank_transfer": "Banküberweisung",
  },
  nl: {
    "brand": "Cash Popoyo",
    "hero.title": "Contant geld bezorgd",
    "hero.tagline": "Geen geldautomaat in Popoyo? Geen probleem. Wij bezorgen contant geld.",
    "hero.sub": "Digitaal betalen. Contant ontvangen.",
    "fee": "5% kosten",
    "cta": "Contant geld",
    "methods": "Venmo · Zelle · PayPal · Apple Pay · Apple Cash · Bizum · Bankoverschrijving",
    "form.amount": "Bedrag (USD)",
    "form.name": "Naam",
    "form.whatsapp": "WhatsApp",
    "form.location": "Locatie (of Maps-link)",
    "form.method": "Betaalmethode",
    "form.method.bank": "Bankoverschrijving",
    "form.submit": "Verzoek versturen",
    "steps.step1": "1. Betaling versturen",
    "steps.step2": "2. We bevestigen via WhatsApp",
    "steps.step3": "3. Contant geld bezorgd",
    "openWhatsApp": "WhatsApp openen",
    "receive": (n) => `Je ontvangt $${n}`,
    "pay.send": "Stuur naar",
    "pay.handle": "Gebruiker",
    "pay.phone": "Telefoon",
    "pay.email": "E-mail",
    "pay.recipient": "Begunstigde",
    "pay.link": "Link",
    "pay.name": "Begunstigde",
    "pay.note": "Opmerking",
    "pay.amount": "Bedrag",
    "pay.bank.note": "We sturen de rekeninggegevens via WhatsApp.",
    "wa.message": (a, m, l) => `Ik wil $${a} contant. Ik betaal via ${m}. Locatie: ${l}`,
    "method.venmo": "Venmo",
    "method.zelle": "Zelle",
    "method.paypal": "PayPal",
    "method.apple_pay": "Apple Pay",
    "method.apple_cash": "Apple Cash",
    "method.bizum": "Bizum",
    "method.bank_transfer": "Bankoverschrijving",
  },
  pt: {
    "brand": "Cash Popoyo",
    "hero.title": "Receba dinheiro entregue",
    "hero.tagline": "Sem caixa eletrônico em Popoyo? Sem problema. Entregamos dinheiro a você.",
    "hero.sub": "Pague digital. Receba em dinheiro.",
    "fee": "5% de taxa",
    "cta": "Receber dinheiro",
    "methods": "Venmo · Zelle · PayPal · Apple Pay · Apple Cash · Bizum · Transferência",
    "form.amount": "Valor (USD)",
    "form.name": "Nome",
    "form.whatsapp": "WhatsApp",
    "form.location": "Localização (ou link do Maps)",
    "form.method": "Método de pagamento",
    "form.method.bank": "Transferência bancária",
    "form.submit": "Enviar solicitação",
    "steps.step1": "1. Envie o pagamento",
    "steps.step2": "2. Confirmamos pelo WhatsApp",
    "steps.step3": "3. Entrega em dinheiro",
    "openWhatsApp": "Abrir WhatsApp",
    "receive": (n) => `Você recebe $${n}`,
    "pay.send": "Enviar para",
    "pay.handle": "Usuário",
    "pay.phone": "Telefone",
    "pay.email": "E-mail",
    "pay.recipient": "Beneficiário",
    "pay.link": "Link",
    "pay.name": "Beneficiário",
    "pay.note": "Observação",
    "pay.amount": "Valor",
    "pay.bank.note": "Enviaremos os dados bancários pelo WhatsApp.",
    "wa.message": (a, m, l) => `Quero $${a} em dinheiro. Vou pagar via ${m}. Localização: ${l}`,
    "method.venmo": "Venmo",
    "method.zelle": "Zelle",
    "method.paypal": "PayPal",
    "method.apple_pay": "Apple Pay",
    "method.apple_cash": "Apple Cash",
    "method.bizum": "Bizum",
    "method.bank_transfer": "Transferência",
  },
  it: {
    "brand": "Cash Popoyo",
    "hero.title": "Contanti consegnati",
    "hero.tagline": "Niente bancomat a Popoyo? Nessun problema. Ti consegniamo i contanti.",
    "hero.sub": "Paga digitale. Ricevi contanti.",
    "fee": "5% commissione",
    "cta": "Ricevi contanti",
    "methods": "Venmo · Zelle · PayPal · Apple Pay · Apple Cash · Bizum · Bonifico",
    "form.amount": "Importo (USD)",
    "form.name": "Nome",
    "form.whatsapp": "WhatsApp",
    "form.location": "Posizione (o link Maps)",
    "form.method": "Metodo di pagamento",
    "form.method.bank": "Bonifico bancario",
    "form.submit": "Invia richiesta",
    "steps.step1": "1. Invia il pagamento",
    "steps.step2": "2. Confermiamo su WhatsApp",
    "steps.step3": "3. Consegna dei contanti",
    "openWhatsApp": "Apri WhatsApp",
    "receive": (n) => `Ricevi $${n}`,
    "pay.send": "Invia a",
    "pay.handle": "Utente",
    "pay.phone": "Telefono",
    "pay.email": "Email",
    "pay.recipient": "Beneficiario",
    "pay.link": "Link",
    "pay.name": "Beneficiario",
    "pay.note": "Nota",
    "pay.amount": "Importo",
    "pay.bank.note": "Ti invieremo i dati del conto su WhatsApp.",
    "wa.message": (a, m, l) => `Voglio $${a} in contanti. Pagherò con ${m}. Posizione: ${l}`,
    "method.venmo": "Venmo",
    "method.zelle": "Zelle",
    "method.paypal": "PayPal",
    "method.apple_pay": "Apple Pay",
    "method.apple_cash": "Apple Cash",
    "method.bizum": "Bizum",
    "method.bank_transfer": "Bonifico",
  },
  fr: {
    "brand": "Cash Popoyo",
    "hero.title": "Cash livré chez vous",
    "hero.tagline": "Pas de distributeur à Popoyo ? Pas de problème. Nous vous livrons du cash.",
    "hero.sub": "Payez en ligne. Recevez du cash.",
    "fee": "5% de frais",
    "cta": "Recevoir du cash",
    "methods": "Venmo · Zelle · PayPal · Apple Pay · Apple Cash · Bizum · Virement",
    "form.amount": "Montant (USD)",
    "form.name": "Nom",
    "form.whatsapp": "WhatsApp",
    "form.location": "Lieu (ou lien Maps)",
    "form.method": "Mode de paiement",
    "form.method.bank": "Virement bancaire",
    "form.submit": "Envoyer la demande",
    "steps.step1": "1. Envoyez le paiement",
    "steps.step2": "2. Nous confirmons par WhatsApp",
    "steps.step3": "3. Cash livré",
    "openWhatsApp": "Ouvrir WhatsApp",
    "receive": (n) => `Vous recevez $${n}`,
    "pay.send": "Envoyer à",
    "pay.handle": "Identifiant",
    "pay.phone": "Téléphone",
    "pay.email": "E-mail",
    "pay.recipient": "Bénéficiaire",
    "pay.link": "Lien",
    "pay.name": "Bénéficiaire",
    "pay.note": "Note",
    "pay.amount": "Montant",
    "pay.bank.note": "Nous vous enverrons les coordonnées bancaires par WhatsApp.",
    "wa.message": (a, m, l) => `Je veux $${a} en cash. Je paie via ${m}. Lieu : ${l}`,
    "method.venmo": "Venmo",
    "method.zelle": "Zelle",
    "method.paypal": "PayPal",
    "method.apple_pay": "Apple Pay",
    "method.apple_cash": "Apple Cash",
    "method.bizum": "Bizum",
    "method.bank_transfer": "Virement",
  },
};

/* Language */
const SUPPORTED_LANGS = ["en", "es", "de", "nl", "pt", "it", "fr"];

function detectLang() {
  const stored = localStorage.getItem("lang");
  if (stored && SUPPORTED_LANGS.includes(stored)) return stored;
  const browser = (navigator.language || "en").toLowerCase().slice(0, 2);
  return SUPPORTED_LANGS.includes(browser) ? browser : "en";
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
  const sel = document.getElementById("langSelect");
  if (sel) sel.value = LANG;
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

  const sel = document.getElementById("langSelect");
  if (sel) sel.addEventListener("change", (e) => setLang(e.target.value));

  document.getElementById("ctaScroll").addEventListener("click", () => {
    document.getElementById("formCard").scrollIntoView({ behavior: "smooth", block: "start" });
    const first = document.querySelector('input[name="amount"]');
    if (first) setTimeout(() => first.focus(), 350);
  });

  document.querySelector('input[name="amount"]').addEventListener("input", updateReceiveLine);

  document.getElementById("requestForm").addEventListener("submit", onSubmit);
});
