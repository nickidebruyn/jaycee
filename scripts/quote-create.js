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

    vm.cancel = cancel;
    vm.save = save;

    vm.quote = {
      clientName: "Test client",
      clientAddress: "Test client",
      clientTel: 1223424,
      clientCell: 1223424,
      clientFax: 1223424,
      clientContact: "bla bla",
      clientDetails: ""


    }


    function cancel() {
      $location.path( "/");
    }

    function save() {
      // validationUtils.setDirty(vm.form);

      if (!vm.form.$valid) {
        return;
      }


    }

  }

})();
