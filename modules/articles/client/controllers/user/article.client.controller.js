(function () {
  'use strict';

  angular
    .module('articles.user')
    .controller('ArticlesUserController', ArticlesUserController);

  ArticlesUserController.$inject = ['$scope', '$state', '$window', 'articleResolve', 'Authentication', 'Notification'];

  function ArticlesUserController($scope, $state, $window, article, Authentication, Notification) {
    var vm = this;

    vm.article = article;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.pullFromGitHub = pullFromGitHub;
    vm.save = save;

    // Remove existing Article
    function pullFromGitHub(showMarkOrHTML,url){

      // Create a new article, or update the current instance
      vm.article.pullMarkdownForUrl(url)
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        document.getElementById("contentt").innerHTML = res;
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Article save error!' });
      }



        // if(showMarkOrHTML){
        //   //show HTML

        //   const body = {
        //     url: url
        //   };

        //   if(url==null){
        //   // /apis/articles/md




        //  document.getElementById("contentt").innerHTML = "<h1>Put in correct URL</h1>";
        //   }
        //   else{
        //  document.getElementById("contentt").innerHTML = "<h1>Rendered HTML!</h1><p>Cool body text"+url+"</p>";
        //   }
        // }
        // else{
        //  //Show original Markdown
        //   if(url==null){
        //         document.getElementById("contentt").innerHTML = "<h1>Put in correct URL</h1>";
        //     }
        //   else{
        //       document.getElementById("contentt").innerHTML = "<p>#Lame Markdown body text"+url+"</p>";
        //   }
        // }
        // GET from Github

        //get download link from GET

        //Use download link

        //Parse .md to html string

        //change content below to string

    }
    // Remove existing Article
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.article.$remove(function () {
          $state.go('user.articles.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Article deleted successfully!' });
        });
      }
    }

    // Save Article
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.articleForm');
        return false;
      }

      // Create a new article, or update the current instance
      vm.article.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('user.articles.list'); // should we send the User to the list or the updated Article's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Article saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Article save error!' });
      }
    }
  }
}());
