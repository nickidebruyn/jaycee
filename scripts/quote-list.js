(function () {
  'use strict';

  var mod = angular.module('quoteApp');

  mod.controller('QuoteListController', QuoteListController);
  mod.config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'scripts/quote-list.html',
      controller: 'QuoteListController',
      controllerAs: 'vm'
    });
  }

  QuoteListController.$inject = ['$location','$routeParams'];
  function QuoteListController ($location, $routeParams) {

    /* jshint validthis: true */
    var vm = this;

    vm.quotes = [
    {
      name: 'Quote 1',
      client: 'Jan Smit',
      date: '2016-09-20'
    },
    {
      name: 'Quote 2',
      date: '2016-09-20'
    }
    ];

  }

})();
