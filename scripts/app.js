(function() {
  'use strict';

  var quoteApp = angular.module('quoteApp', ['ngRoute']);

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