const { VITE_API_URL: API_URL, VITE_API_KEY: API_KEY } = import.meta.env;

// Headers
export const headers = { Authorization: `Basic ${API_KEY}` };
export const postHeaders = { ...headers, 'Content-Type': 'application/json' };

// Indices
export const publicationsIndex = `${API_URL}/scanr-publications-20230912`;
export const authorsIndex = `${API_URL}/scanr-persons-20230912`;