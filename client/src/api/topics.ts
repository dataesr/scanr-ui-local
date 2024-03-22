import { topicsURL } from "../config/api";

export async function getTopics(id) {
  const res = await fetch(`${topicsURL}/${id}`);
  return res.json();
}