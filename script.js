// Final verification script for your required flow
// - Clicking the home-page link navigates to /page/qr-verification (Netlify _redirects -> verify.html)
// - The verify page reads ?id= to prefill the input, user clicks Verify
// - On correct code, redirect to: https://certificate-id-pro
// WARNING: client-side verification is not secure — OK for demo.

// Config
const VERIFY_ROUTE = "/page/qr-verification";
const SUCCESS_REDIRECT = "https://certificate-id-pro"; // EXACT value you requested
const DEMO_CORRECT_CODE = "08202569364"; // demo code (insecure on client-side)

// Home page: if goVerify is a button, handle click; if it's an <a> with href, browser uses it
const goVerify = document.getElementById("goVerify");
if (goVerify) {
  goVerify.addEventListener("click", (e) => {
    // if anchor has href, allow default navigation
    if (goVerify.tagName.toLowerCase() === "a" && goVerify.getAttribute("href")) {
      return;
    }
    window.location.href = VERIFY_ROUTE;
  });
}

// Utility to briefly show a temporary label on the button
function flashButton(btn, text, ms = 1400) {
  if (!btn) return;
  const prev = btn.textContent;
  btn.textContent = text;
  setTimeout(() => { btn.textContent = prev; }, ms);
}

// Verify handler (client-side)
function doVerify(value) {
  const btn = document.getElementById("verifyBtn");
  const val = (value || "").trim();

  if (!val) {
    flashButton(btn, "Enter code");
    return;
  }

  if (val === DEMO_CORRECT_CODE) {
    // success: redirect to the external URL you specified (certificate-id-pro)
    window.location.href = SUCCESS_REDIRECT;
  } else {
    flashButton(btn, "Invalid Code!");
  }
}

// Hook verify button and Enter key
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
  } catch (err) {
    // ignore
  }
})();
