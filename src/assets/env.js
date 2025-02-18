(function(window) {
    window._env = window._env || {};
    window.__env = window.__env || {};

    // Variable environment
    window._env.LOCAL_URL = `http://${window.location.hostname}:3000`;
    window.__env.BACKEND_URL = 'https://api.gmf-training.publicvm.com';
    window._env.BASE_URL = window._env.LOCAL_URL;
    window.__env.API_URL = window.__env.BACKEND_URL;
    // window.__env.DEFAULT_LANGUAGE = 'en';
})(this);