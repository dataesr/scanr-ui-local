import { useCallback, useEffect, useState } from "react";
import { Publication } from "../../types/publication";
// import { useParams } from "react-router-dom";

export default function useSuggestionList(key: string, initialValue: Publication[] = []) {

  const readValue = useCallback((): Publication[] => {
    // Prevent build error "window is undefined" but keeps working
    if (typeof window === 'undefined') {
      return initialValue
    }

    try {
      const item = window.localStorage.getItem(key)
      return item ? (parseJSON(item) as Publication[]) : initialValue
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error)
      return initialValue
    }
  }, [initialValue, key])
  
  const [items, setItems] = useState<Array<Publication>>(readValue);

  useEffect(() => {
    setItems(readValue())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const addItem = useCallback((item) => {
    if (items.find((el) => el.id === item.id)) return;
    const newList = [...items, item];
    window.localStorage.setItem(key, JSON.stringify(newList))
    setItems(newList);
  }, [key, items, setItems])

  const deleteAllItems = useCallback(() => {
    window.localStorage.removeItem(key);
    setItems([]);
  }, [key, setItems])
  
  const removeItem = useCallback((item) => {
    const newList = items.filter((el) => el.id !== item.id);
    window.localStorage.setItem(key, JSON.stringify(newList))
    setItems(newList);
  }, [key, items, setItems])
  
  return {
    items,
    addItem,
    removeItem,
    deleteAllItems,
  };
}

// A wrapper for "JSON.parse()"" to support "undefined" value
function parseJSON<T>(value: string | null): T | undefined {
  try {
    return value === 'undefined' ? undefined : JSON.parse(value ?? '')
  } catch {
    console.error('parsing error on', { value })
    return undefined
  }
}