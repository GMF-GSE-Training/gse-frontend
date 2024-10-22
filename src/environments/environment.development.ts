export const environment = {
  production: false,
  apiUrl: `http://localhost:3000`,
  endpoints: {
    auth: {
      base: 'auth/current',
      login: 'auth/login',
      register: 'auth/register',
      requestResetPassword: 'auth/request-reset-password',
      resetPassword: 'auth/reset-password',
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
    },
    capability: {
      base: 'capability',
      list: 'capability/list/result',
      search: 'capability/search/result',
    },
    curriculumSyllabus: {
      base: 'curriculum-syllabus',
      list: 'curriculum-syllabus/list/result',
    }
  },
};
