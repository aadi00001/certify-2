// Final verification script (no QR code implementation)
// - Clicking the home-page link navigates to /page/qr-verification (Netlify _redirects -> verify.html)
// - The verify page reads ?id= to prefill the input, user clicks Verify
// - On correct code, redirect to: https://certificate-id-pro
// WARNING: client-side verification is not secure (demo only).

<<<<<<< HEAD
const SITE_B = "https://certificate-id-pro.netlify.app"; 
const SITE_A = "https://certificate-id-verify.netlify.app/page/qr-verification";
=======
const VERIFY_ROUTE = "/page/qr-verification";
const SUCCESS_REDIRECT = "https://certificate-id-pro";
const DEMO_CORRECT_CODE = "08202569364";
>>>>>>> c4655b5d411f1793cef3e96b1b51091bb22ab6f0

// Home page button/link handler
const goVerify = document.getElementById("goVerify");
if (goVerify) {
  goVerify.addEventListener("click", (e) => {
    if (goVerify.tagName.toLowerCase() === "a" && goVerify.getAttribute("href")) {
      return;
    }
    window.location.href = VERIFY_ROUTE;
  });
}

function flashButton(btn, text, ms = 1400) {
  if (!btn) return;
  const prev = btn.textContent;
  btn.textContent = text;
  setTimeout(() => { btn.textContent = prev; }, ms);
}

function doVerify(value) {
  const btn = document.getElementById("verifyBtn");
  const val = (value || "").trim();

  if (!val) {
    flashButton(btn, "Enter code");
    return;
  }

  if (val === DEMO_CORRECT_CODE) {
    window.location.href = SUCCESS_REDIRECT;
  } else {
    flashButton(btn, "Invalid Code!");
  }
}

const verifyBtn = document.getElementById("verifyBtn");
const codeInput = document.getElementById("codeInput");
if (verifyBtn) {
  verifyBtn.addEventListener("click", () => doVerify(codeInput ? codeInput.value : ""));
}
if (codeInput && verifyBtn) {
  codeInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") verifyBtn.click();
  });
}

// Prefill from ?id= but do not auto-verify
(function prefillFromQuery() {
  try {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (id && codeInput) codeInput.value = id;
  } catch (err) { }
})();
