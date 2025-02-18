declare const window: any;
export const environment = {
  production: false,
  apiUrl: window.__env?.BASE_URL || `http://${window.location.hostname}:3000`,
  endpoints: {
    auth: {
      base: 'auth/current',
      login: 'auth/login',
      register: 'auth/register',
      refreshToken: 'auth/token',
      resetPasswordRequest: 'auth/request-reset-password',
      accountVerificationRequest: 'auth/resend-verification',
      resetPassword: 'auth/reset-password',
      updateEmailRequest: 'auth/update-email',
      updatePassword: 'auth/update-password',
    },
  },
};