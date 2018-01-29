'use strict';

/**
 * Module dependencies
 */
var userPolicy = require('../policies/user.server.policy'),
  user = require('../controllers/user.server.controller');

module.exports = function (app) {
  // User route registration first. Ref: #713
  require('./users.server.routes.js')(app);

  // Users collection routes
  app.route('/api/users')
    .get(userPolicy.isAllowed, user.list);

  // Single user routes
  app.route('/api/users/:userId')
    .get(userPolicy.isAllowed, user.read)
    .put(userPolicy.isAllowed, user.update)
    .delete(userPolicy.isAllowed, user.delete);

  // Finish by binding the user middleware
  app.param('userId', user.userByID);
};
