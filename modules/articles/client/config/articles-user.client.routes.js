(function () {
  'use strict';

  angular
    .module('articles.user.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('user.articles', {
        abstract: true,
        url: '/me',
        template: '<ui-view/>',
        data: {
          roles: ['user']
        }
      })
      .state('user.articles.list', {
        url: '',
        templateUrl: '/modules/articles/client/views/user/list-articles.client.view.html',
        controller: 'ArticlesUserListController',
        controllerAs: 'vm',
        data: {
          roles: ['user']
        }
      })
      .state('user.articles.create', {
        url: '/create',
        templateUrl: '/modules/articles/client/views/user/form-article.client.view.html',
        controller: 'ArticlesUserController',
        controllerAs: 'vm',
        data: {
          roles: ['user']
        },
        resolve: {
          articleResolve: newArticle
        }
      })
      .state('user.articles.edit', {
        url: '/:articleId/edit',
        templateUrl: '/modules/articles/client/views/user/form-article.client.view.html',
        controller: 'ArticlesUserController',
        controllerAs: 'vm',
        data: {
          roles: ['user'],
          pageTitle: '{{ articleResolve.title }}'
        },
        resolve: {
          articleResolve: getArticle
        }
      });
  }

  getArticle.$inject = ['$stateParams', 'ArticlesService'];

  function getArticle($stateParams, ArticlesService) {
    return ArticlesService.get({
      articleId: $stateParams.articleId
    }).$promise;
  }

  newArticle.$inject = ['ArticlesService'];

  function newArticle(ArticlesService) {
    return new ArticlesService();
  }
}());
