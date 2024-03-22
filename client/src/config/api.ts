const { VITE_API_URL: API_URL, VITE_API_KEY: API_KEY, VITE_TOPICS_URL: TOPICS_URL } = import.meta.env;

// Headers
export const headers = API_KEY ? { Authorization: `Basic ${API_KEY}` } : {};
export const postHeaders = { ...headers, "Content-Type": "application/json" };

// Indices
export const publicationsIndex = `${API_URL}/scanr-publications`;
export const authorsIndex = `${API_URL}/scanr-persons`;
export const organizationsIndex = `${API_URL}/scanr-organizations`;
export const projectsIndex = `${API_URL}/scanr-projects`;
export const patentsIndex = `${API_URL}/scanr-patents`;
export const localisationIndex = `${API_URL}/scanr-localisations`;
export const topicsURL = TOPICS_URL ? `${TOPICS_URL}/topics` : '/topics';
