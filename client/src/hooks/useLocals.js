import { useEffect, useState } from "react";


export default function useLocals(path) {
  const lang = "fr";
  const [messages, setMessages] = useState()
  const localePath = `../locales/${path}/${lang}.json`;
  useEffect(() => {
    const f = async (localePath) => import(localePath);
    f(localePath).then(({ default: m }) => setMessages(m));
  }, [localePath])
  return messages;
}