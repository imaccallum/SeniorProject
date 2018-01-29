(function () {
  'use strict';

  angular
    .module('users.user')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  // Configuring the Users module
  function menuConfig(menuService) {
    menuService.addSubMenuItem('topbar', 'user', {
      title: 'Manage Users',
      state: 'user.users'
    });
  }
}());
