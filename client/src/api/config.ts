const { VITE_API_URL: API_URL, VITE_API_KEY: API_KEY } = import.meta.env;


// Headers
export const headers = { Authorization: `Basic ${API_KEY}` };
export const postHeaders = { ...headers, 'Content-Type': 'application/json' };

// Indices
export const publicationsIndex = `${API_URL}/scanr-publications-dev-20231218`;
export const authorsIndex = `${API_URL}/scanr-persons-20231218`;
export const organizationsIndex = `${API_URL}/scanr-organizations-20231211`;
export const projectsIndex = `${API_URL}/scanr-projects-20231211`;
export const patentsIndex = `${API_URL}/scanr-patents-20231211`;