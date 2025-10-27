(function () {
  const routes = new Map();
  let current = null;

  function register(path, handler) {
    routes.set(path, handler);
  }

  function resolve() {
    const hash = window.location.hash || '#/';
    const path = hash.replace(/^#/, '');
    const handler = routes.get(path) || routes.get('/');
    if (handler && handler !== current) {
      current = handler;
      handler();
    } else if (handler) {
      handler();
    }
    document.querySelectorAll('.nav a').forEach((link) => {
      const route = link.getAttribute('data-route');
      if (route === path) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  window.Router = {
    register,
    init() {
      window.addEventListener('hashchange', resolve);
      resolve();
    }
  };
})();
