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
    vm.remove = remove;
    vm.getItemTotalPrice = getItemTotalPrice;
    vm.getSubTotal = getSubTotal;
    vm.getVatTotal = getVatTotal;
    vm.getTotal = getTotal;

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

    function getItemTotalPrice(item) {
      // console.log("getItemTotals() ", item);

      var total = 0;
      if (item.unitPrice != undefined && item.qty != undefined) {
        total = item.unitPrice*item.qty;
      }
      return total;
    }

    function getSubTotal() {
      var total = 0;

      for (var i = vm.quote.items.length - 1; i >= 0; i--) {
        var unitTotal = getItemTotalPrice(vm.quote.items[i]);
        total += unitTotal;
      };

      return total;
    }

    function getVatTotal() {
      var total = 0;

      total = getSubTotal() * 0.14;

      return total;
    }

    function getTotal() {
      var total = 0;

      total = getSubTotal() + getVatTotal();

      return total;
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



      //Generate the js pdf
      var doc = new jsPDF();

      doc.setTextColor(10, 10, 200);
      doc.setFontSize(22);
      doc.text(10, 20, 'JayCee Quote');

      doc.setFontSize(16);
      doc.setTextColor(0);
      doc.text(100, 20, 'EXCEPTIONAL SERVICE SINCE 1979');

      addDocHeader(doc);

      for (var i = 0; i < vm.quote.items.length; i++) {
        var item = vm.quote.items[i];
        addDocRow(doc, item, i);
      };

      doc.save('Quote.pdf');


      $location.path( "/");

    }

    function addDocHeader(doc) {

      var spacing = 8;

      doc.setTextColor(0);
      doc.setFontSize(10);
      doc.text(10, 30 + (count * spacing), "WINDOW");
      doc.text(50, 30 + (count * spacing), "SIZE (B X H)");
      doc.text(90, 30 + (count * spacing), "QTY");
      doc.text(110, 30 + (count * spacing), "DESCRIPTION");
      doc.text(210, 30 + (count * spacing), "UNIT PRICE");
      doc.text(260, 30 + (count * spacing), "TOTAL PRICE");

    }

    function addDocRow(doc, item, count) {

      var spacing = 8;

      doc.setTextColor(0);
      doc.setFontSize(89);
      doc.text(10, 60 + (count * spacing), item.name);

      doc.text(30, 60 + (count * spacing), item.unitPrice + "");

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

      vm.quote.items.push(item);

    }

    function remove(item) {
      console.log("Remove item from quote ", item);
      if (vm.quote.items.length > 1) {
        var index = vm.quote.items.indexOf(item);
        vm.quote.items.splice(index, 1);
      }

    }

  }

})();
