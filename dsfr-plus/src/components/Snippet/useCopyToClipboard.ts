import { useEffect, useState } from 'react';

export default function useCopyToClipboard(resetTimeout = 1500) {
  const [copyStatus, setCopyStatus] = useState<number>(0);

  async function copyToClipboard(text: string) {
    if ('clipboard' in navigator) return navigator.clipboard.writeText(text);
    return document.execCommand('copy', true, text);
  }

  const copy = (text: string) => {
    copyToClipboard(text)
      .then(() => { setCopyStatus(1); })
      .catch(() => { setCopyStatus(2); });
  };
  useEffect(() => {
    let timeoutId = 0;
    if (copyStatus) {
      timeoutId = setTimeout(() => setCopyStatus(0), resetTimeout);
    }
    return () => clearTimeout(timeoutId);
  }, [copyStatus, resetTimeout]);

  return [copyStatus, copy];
}