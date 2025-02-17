declare const window: any;
export const environment = {
  production: true,
  apiUrl: window.__env?.API_URL || '/' // Fallback ke proxy
};