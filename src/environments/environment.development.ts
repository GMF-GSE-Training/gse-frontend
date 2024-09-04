export const environment = {
  production: false,
  link_qr_code: 'http://localhost:4200/participant/{id}/view',
  apiUrl: 'http://localhost:3000',
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
      list: 'participants/list/result',
      search: 'participants/search/result'
    }
  },
};
