const { VITE_API_URL: API_URL, VITE_API_KEY: API_KEY } = import.meta.env;


// Headers
export const headers = { Authorization: `Basic ${API_KEY}` };
export const postHeaders = { ...headers, 'Content-Type': 'application/json' };

// Indices
export const publicationsIndex = `${API_URL}/scanr-publications`;
export const authorsIndex = `${API_URL}/scanr-persons`;
export const organizationsIndex = `${API_URL}/scanr-organizations`;
export const projectsIndex = `${API_URL}/scanr-projects`;
export const patentsIndex = `${API_URL}/scanr-patents`;