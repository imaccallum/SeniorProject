(function (app) {
  'use strict';

  app.registerModule('users');
  app.registerModule('users.user');
  app.registerModule('users.user.routes', ['ui.router', 'core.routes', 'users.user.services']);
  app.registerModule('users.user.services');
  app.registerModule('users.routes', ['ui.router', 'core.routes']);
  app.registerModule('users.services');
}(ApplicationConfiguration));
