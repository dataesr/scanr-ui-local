import { useEffect, useState } from 'react';

export default function useCopyToClipboard(resetTimeout = 1500) {
  const [copyStatus, setCopyStatus] = useState<string>("");
  
  const copy = (text: string) => 
    navigator.clipboard.writeText(text)
      .then(() => setCopyStatus("Copié"))
      .catch(() => setCopyStatus("Erreur"));
    
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    if (copyStatus) {
      timeoutId = setTimeout(() => setCopyStatus(""), resetTimeout);
    }
    return () => clearTimeout(timeoutId);
  }, [copyStatus, resetTimeout]);

  return {copyStatus, copy};
}