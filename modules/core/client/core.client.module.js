(function (app) {
  'use strict';

  app.registerModule('core');
  app.registerModule('core.routes', ['ui.router']);
  app.registerModule('core.user', ['core']);
  app.registerModule('core.user.routes', ['ui.router']);
}(ApplicationConfiguration));
