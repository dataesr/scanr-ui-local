import { useEffect, useState } from "react";

type Consent = {
  [key: string]: 0 | 1;
}

type UseConsent = {
  consent: Consent;
  setConsent: (newConcent: Consent) => void;
  set: boolean;
  dialogId: string;
}

if (typeof Proxy === "undefined") {
  throw new Error("This browser doesn't support Proxy");
}

const dialogId = 'fr-consent-dialog';
const consentKey = 'consent';

export default function useConsent(defaultConsent: Consent = {}): UseConsent {
  const [set, setSet] = useState<boolean>(false);
  const readValue = (): Consent => {
    const storedConsentString = localStorage.getItem(consentKey);
    const storedConsent = storedConsentString ? JSON.parse(storedConsentString) : null;
    setSet(!!storedConsent);
    return storedConsent || defaultConsent;
  }
  const [innerConsent, setInnerConsent] = useState<Consent>(() => readValue());

  const consent = new Proxy(innerConsent, {
    get: function (target, key) {
      if (typeof key === 'string') {
        return target[key];
      }
      return undefined;
    },
    set: function (target, key, val) {
      if (typeof key === 'string') {
        setInnerConsent({ ...innerConsent, [key]: val });
        target[key] = val;
        return true;
      }
      return false;
    }
  });

  const setConsent = (newConcent) => {
    localStorage.setItem(consentKey, JSON.stringify(newConcent || innerConsent));
    window.dispatchEvent(new StorageEvent('local-storage', { key: consentKey }))
  }

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === consentKey) {
        setInnerConsent(readValue());
      }
    }
    window.addEventListener('local-storage', handleStorage);
    return () => {
      window.removeEventListener('local-storage', handleStorage);
    }
  });


  return { consent, setConsent, set, dialogId };
}