(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('articles.user')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'user', {
      title: 'Manage Articles',
      state: 'user.articles.list'
    });
  }
}());
