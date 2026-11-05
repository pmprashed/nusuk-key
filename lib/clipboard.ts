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

export function getNusukDeepLink(code: string): string | null {
  const template =
    process.env.NEXT_PUBLIC_NUSUK_DEEP_LINK_TEMPLATE ||
    process.env.NUSUK_DEEP_LINK_TEMPLATE;

  if (!template || !template.trim()) {
    return null;
  }

  return template.replace("{code}", encodeURIComponent(code));
}
