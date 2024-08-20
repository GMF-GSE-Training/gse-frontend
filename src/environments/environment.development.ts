export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000',
  endpoints: {
    auth: {
      login: 'auth/login',
      current: 'auth/current',
    },
    user: {
      register: 'users/register',
      get: '/users',
    },
    role: {
      get: '/roles',
    }
  }
};
