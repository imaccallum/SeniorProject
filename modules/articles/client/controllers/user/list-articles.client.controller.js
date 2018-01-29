(function () {
  'use strict';

  angular
    .module('articles.user')
    .controller('ArticlesUserListController', ArticlesUserListController);

  ArticlesUserListController.$inject = ['ArticlesService'];

  function ArticlesUserListController(ArticlesService) {
    var vm = this;

    vm.articles = ArticlesService.query();
  }
}());
