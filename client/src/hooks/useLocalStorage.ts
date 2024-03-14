import { useCallback, useEffect, useState } from "react";



export default function useLocalStorage<T>(key, defaultValue?: T): [T, (newValue: T) => void] {
  const readValue = (): T => {
    const storedString = localStorage.getItem(key);
    
    if (storedString === null && defaultValue !== null) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return readValue();
    }
    return JSON.parse(storedString);
  }
  const [storedValue, setStoredValue] = useState<T>(() => readValue());

  const setValue = useCallback((newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    window.dispatchEvent(new StorageEvent('local-storage', { key }))
  }, [key]);

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === key) {
        setStoredValue(readValue());
      }
    }
    window.addEventListener('local-storage', handleStorage);
    return () => {
      window.removeEventListener('local-storage', handleStorage);
    }
  });


  return [storedValue, setValue];
}