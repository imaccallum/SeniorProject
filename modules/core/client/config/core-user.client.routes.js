(function () {
  'use strict';

  angular
    .module('core.user.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('user', {
        abstract: true,
        url: '/user',
        template: '<ui-view/>',
        data: {
          roles: ['user']
        }
      });
  }
}());
