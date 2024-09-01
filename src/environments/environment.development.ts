export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000',
  endpoints: {
    auth: {
      base: 'auth/current',
      login: 'auth/login',
      register: 'auth/register'
    },
    user: {
      base: 'users',
      list: 'users/list',
      search: 'users/search/result'
    },
    role: '/roles',
    participant: {
      base: 'participants',
      list: 'participants/list/result',
      search: 'participants/search/result'
    }
  }
};
