import { useEffect, useState } from 'react';

export default function useCopyToClipboard(resetTimeout = 1500): [string | null, (text: string) => void] {
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  async function copyToClipboard(text: string) {
    if ('clipboard' in navigator) return navigator.clipboard.writeText(text);
    return document.execCommand('copy', true, text);
  }

  const copy = (text: string) => {
    copyToClipboard(text)
      .then(() => { setCopyStatus('Copié!'); })
      .catch(() => { setCopyStatus('Erreur'); });
  };
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    if (copyStatus) {
      timeoutId = setTimeout(() => setCopyStatus(null), resetTimeout);
    }
    return () => clearTimeout(timeoutId);
  }, [copyStatus, resetTimeout]);

  return [copyStatus, copy];
}