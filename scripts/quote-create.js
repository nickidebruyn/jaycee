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

  QuoteCreateController.$inject = ['$location','$routeParams', 'validationUtils'];
  function QuoteCreateController ($location, $routeParams, validationUtils) {

    /* jshint validthis: true */
    var vm = this;

    vm.cancel = cancel;
    vm.save = save;

    vm.quote = {
      clientName: "",
      clientAddress: "",
      clientTel: null,
      clientCell: null,
      clientFax: null,
      clientContact: "",
      clientDetails: ""


    }


    function cancel() {
      $location.path( "/");
    }

    function save() {
      validationUtils.setDirty(vm.form);

      if (!vm.form.$valid) {
        return;
      }

      console.log("Quote successfully saved: ", vm.quote);

    }

  }

})();
