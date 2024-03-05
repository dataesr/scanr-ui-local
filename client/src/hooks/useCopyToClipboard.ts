import { useEffect, useState } from 'react';

export default function useCopyToClipboard(resetTimeout = 1500) {
  const [copyStatus, setCopyStatus] = useState<0 | 1 | 2>(0);
  
  const copy = (text: string) => 
    navigator.clipboard.writeText(text)
      .then(() => setCopyStatus(1))
      .catch(() => setCopyStatus(2));
    
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    if (copyStatus) {
      timeoutId = setTimeout(() => setCopyStatus(0), resetTimeout);
    }
    return () => clearTimeout(timeoutId);
  }, [copyStatus, resetTimeout]);

  return {copyStatus, copy};
}