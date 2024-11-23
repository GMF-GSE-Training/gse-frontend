export const environment = {
  production: false,
  qrCodeLink: `${window.location.protocol}//${window.location.hostname}:${window.location.port}/participants/{id}/detail`,
  apiUrl: `http://${window.location.hostname}:3000`,
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
      search: 'participants/search/result',
      isComplete: 'participants/check-data-complete'
    },
    capability: {
      base: 'capability',
      list: 'capability/list/result',
      search: 'capability/search/result',
    },
    curriculumSyllabus: {
      base: 'curriculum-syllabus',
      list: 'curriculum-syllabus/list/result',
    },
    cot: {
      base: 'cot',
      list: 'cot/list/result',
      search: 'cot/search/result',
      participanCot: 'cot/participant-cot',
      unregisteredParticipants: 'unregistered/result'
    },
    eSign: {
      base: 'e-sign',
      list: 'e-sign/list/result',
    }
  },
};
