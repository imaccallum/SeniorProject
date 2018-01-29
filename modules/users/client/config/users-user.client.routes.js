(function () {
  'use strict';

  // Setting up route
  angular
    .module('users.user.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('user.users', {
        url: '/users',
        templateUrl: '/modules/users/client/views/user/list-users.client.view.html',
        controller: 'UserListController',
        controllerAs: 'vm'
      })
      .state('user.user', {
        url: '/users/:userId',
        templateUrl: '/modules/users/client/views/user/view-user.client.view.html',
        controller: 'UserController',
        controllerAs: 'vm',
        resolve: {
          userResolve: getUser
        },
        data: {
          pageTitle: '{{ userResolve.displayName }}'
        }
      })
      .state('user.user-edit', {
        url: '/users/:userId/edit',
        templateUrl: '/modules/users/client/views/user/edit-user.client.view.html',
        controller: 'UserController',
        controllerAs: 'vm',
        resolve: {
          userResolve: getUser
        },
        data: {
          pageTitle: '{{ userResolve.displayName }}'
        }
      });

    getUser.$inject = ['$stateParams', 'AdminService'];

    function getUser($stateParams, AdminService) {
      return AdminService.get({
        userId: $stateParams.userId
      }).$promise;
    }
  }
}());
