(function () {
  'use strict';

  var mod = angular.module('quoteApp');

  mod.controller('QuoteCreateController', QuoteCreateController);
  mod.config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'scripts/quote-create.html',
      controller: 'QuoteCreateController',
      controllerAs: 'vm'
    });
  }

  QuoteCreateController.$inject = ['$location','$routeParams'];
  function QuoteCreateController ($location, $routeParams) {

    /* jshint validthis: true */
    var vm = this;

    vm.quote = {
      clientName: "Test client",
      clientTel: 1223424,
      clientCell: 1223424,
      clientFax: 1223424,
      clientContact: "bla bla",
      clientDetails: ""


    }


  }

})();
