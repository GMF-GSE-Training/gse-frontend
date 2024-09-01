export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000',
  endpoints: {
    auth: {
      login: 'auth/login',
      current: 'auth/current',
      register: 'auth/register'
    },
    user: {
      get: '/users',
    },
    role: {
      get: '/roles',
    },
    participant: {
      get: '/participants',
    },
  }
};
