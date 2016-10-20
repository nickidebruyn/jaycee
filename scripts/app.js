(function() {
  'use strict';

  var quoteApp = angular.module('quoteApp', ['ngCookies', 'ngRoute', 'ngMessages']);

    quoteApp.config(function($routeProvider) {
            $routeProvider
                    .otherwise({
                        redirectTo: '/'
                    });
        });


    quoteApp.run(run);

    run.$inject = ['$location'];
    function run($location) {
      $location.path("/");
    }


})();