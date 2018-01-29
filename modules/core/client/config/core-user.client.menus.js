(function () {
  'use strict';

  angular
    .module('core.user')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'User',
      state: 'user',
      type: 'dropdown',
      roles: ['user']
    });
  }
}());
