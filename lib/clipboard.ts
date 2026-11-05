export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof window === "undefined") return false;

  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fallback below
    }
  }

  // Fallback using textarea
  try {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand("copy");
    textArea.remove();
    return successful;
  } catch (err) {
    console.error("Failed to copy using fallback:", err);
    return false;
  }
}

// Confirmed Nusuk deep link template (verified: https://services.nusuk.sa/app?p=27&id=NG-CXEVbXwR)
const NUSUK_DEEP_LINK_DEFAULT_TEMPLATE = "https://services.nusuk.sa/app?p=27&id={code}";

export function getNusukDeepLink(code: string): string | null {
  // 1. Prefer env variable (overrides default — set in Vercel for custom schemes)
  const template =
    process.env.NEXT_PUBLIC_NUSUK_DEEP_LINK_TEMPLATE ||
    process.env.NUSUK_DEEP_LINK_TEMPLATE ||
    NUSUK_DEEP_LINK_DEFAULT_TEMPLATE;

  if (!template || !template.trim()) {
    return null;
  }

  if (template.includes("{code}")) {
    return template.replace("{code}", encodeURIComponent(code));
  }

  // Fallback: if template is a URL without placeholder, append ?p=27&id= or &id=
  if (template.includes("id=")) {
    return `${template}${encodeURIComponent(code)}`;
  }
  const separator = template.includes("?") ? "&" : "?";
  return `${template}${separator}p=27&id=${encodeURIComponent(code)}`;
}
