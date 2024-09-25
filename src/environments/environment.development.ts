export const environment = {
  production: false,
  apiUrl: `${window.location.protocol}//${window.location.hostname}:3000`,
  endpoints: {
    auth: {
      base: 'auth/current',
      login: 'auth/login',
      register: 'auth/register'
    },
    user: {
      base: 'users',
      list: 'users/list/result',
      search: 'users/search/result'
    },
    role: {
      base: 'roles',
    },
    participant: {
      base: 'participants',
      qr_code: 'qr-code',
      id_card: 'id-card',
      download_id_card: 'id-card/download',
      list: 'participants/list/result',
      search: 'participants/search/result'
    }
  },
};
