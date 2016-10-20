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
    vm.add = add;

    vm.quote = {
      clientName: "",
      clientAddress: "",
      clientTel: null,
      clientCell: null,
      clientFax: null,
      clientContact: "",
      clientDetails: "",
      items: [{        
        name: "",
        size: 0,
        qty: 1,
        description: "",
        unitPrice: 0
      }
      ]

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

    function add() {
      console.log("Add item to quote ", vm.quote);

      var item = {        
        name: "",
        size: 0,
        qty: 1,
        description: "",
        unitPrice: 0
      };

      vm.quote.push(item);

    }

  }

})();
