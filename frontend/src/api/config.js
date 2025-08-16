export function getApiBaseUrl() {
  return import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
}

export function buildUrl(path) {
  const base = getApiBaseUrl();
  return `${base}${path}`;
}
