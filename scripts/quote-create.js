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
      id: Math.floor((Math.random() * 10000) + 1),
      clientName: "xxxxxxx",
      clientAddress: "xxxx",
      clientTel: 2222222,
      clientCell: 3333333,
      clientFax: 444444,
      clientContact: "ffffffffffffffffff",
      clientDetails: "sdfsdfsdfsdf",
      items: [{        
        name: "window1",
        size: "222x300",
        qty: 1,
        description: "bla bgasdvsd svsw",
        unitPrice: 220
      }
      ]

    };

    console.log("New Quote: ", vm.quote);

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


      addDocumentHeader(doc, 10);
      addClientDetails(doc, 35);
      addQuoteTable(doc, 70);

      doc.save('Quote-' + vm.quote.id + '.pdf');


      $location.path( "/");

    }

    function addDocumentHeader(doc, startY) {
      var imgData = 'data:image/jpeg;base64,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';

      doc.addImage(imgData, 'JPEG', 10, startY, 52, 13);

      doc.setTextColor(0);
      doc.setFontSize(10);
      doc.setFontType("bold");
      doc.text(10, startY + 20, 'TEL: 012 800 11 69/8  FAX: 012 800 1772');

      doc.setFontSize(16);
      doc.setTextColor(0);
      doc.setFontType("bold");
      doc.text(120, startY + 10, 'EXCEPTIONAL SERVICE \n     SINCE 1979');      

      doc.line(10, startY + 21, 200, startY + 21);

      doc.setTextColor(0);
      doc.setFontSize(8);
      doc.setFontType("helvetica");
      doc.text(10, startY + 24, 'CC/BK 88/11665/23  VAT/BTW 4320107081');

      doc.setTextColor(0);
      doc.setFontSize(8);
      doc.setFontType("bold");
      doc.text(170, startY + 24, 'QUOTE NR: ' + vm.quote.id);      

    }

    function addClientDetails(doc, startY) {

      doc.line(10, startY, 200, startY);

      doc.setTextColor(0);
      doc.setFontSize(8);
      doc.setFontType("bold");
      doc.text(10, startY + 4, 'ADDRESS:');
      doc.text(10, startY + 8, 'CLIENT:');
      doc.text(10, startY + 12, 'TEL:');
      doc.text(10, startY + 16, 'FAX:');
      doc.text(10, startY + 20, 'CELL:');
      doc.text(10, startY + 24, 'CONTACT:');
      doc.text(10, startY + 28, 'DETAIL:');



    }

    function addQuoteTable(doc, startY) {

      var spacing = 6;

      addTableHeader(doc, startY);

      for (var i = 0; i < vm.quote.items.length; i++) {
        var item = vm.quote.items[i];
        addDocRow(doc, item, i, startY + 5, spacing);
      };

      addSubTotalsFooter(doc, startY + 10, spacing);
      addVatTotalsFooter(doc, startY + 16, spacing);
      addTotalsFooter(doc, startY + 22, spacing);

      doc.rect(10, startY-5, 190, startY + (vm.quote.items.length * spacing)-30);

    }

    function addTableHeader(doc, startY) {

      var posY = startY;

      doc.setTextColor(0);
      doc.setFontSize(10);
      doc.setFontType("bold");
      doc.text(12, posY , "WINDOW");
      doc.text(50, posY , "SIZE (B X H)");
      doc.text(75, posY , "QTY");
      doc.text(90, posY , "DESCRIPTION");
      doc.text(140, posY , "UNIT PRICE");
      doc.text(170, posY , "TOTAL PRICE");

      doc.line(10, posY+1, 200, posY+1);

    }

    function addDocRow(doc, item, count, startY, spacing) {

      var posY = startY;

      doc.setTextColor(0);
      doc.setFontSize(8);
      doc.setFontType("helvetica");
      doc.text(12, posY + (count * spacing), item.name);
      doc.text(50, posY + (count * spacing), item.size);
      doc.text(75, posY + (count * spacing), item.qty + "");
      doc.text(90, posY + (count * spacing), item.description);
      doc.text(140, posY + (count * spacing), "R " + item.unitPrice.toFixed(2));
      doc.text(170, posY + (count * spacing), "R " + getItemTotalPrice(item).toFixed(2));

    }

    function addSubTotalsFooter(doc, startY, spacing) {

      var posY = startY + (vm.quote.items.length * spacing);

      doc.setTextColor(0);
      doc.setFontSize(11);
      doc.setFontType("bold");
      doc.text(140, posY , "SUB TOTAL");
      doc.text(170, posY , "R " + getSubTotal().toFixed(2));

      doc.line(10, posY-5, 200, posY-5);

    }

    function addVatTotalsFooter(doc, startY, spacing) {

      var posY = startY + (vm.quote.items.length * spacing);

      doc.setTextColor(0);
      doc.setFontSize(11);
      doc.setFontType("bold");
      doc.text(140, posY , "VAT");
      doc.text(170, posY , "R " + getVatTotal().toFixed(2));

    }

    function addTotalsFooter(doc, startY, spacing) {

      var posY = startY + (vm.quote.items.length * spacing);

      doc.setTextColor(0);
      doc.setFontSize(11);
      doc.setFontType("bold");
      doc.text(140, posY , "TOTAL");
      doc.text(170, posY , "R " + getTotal().toFixed(2));

    }

    function add() {
      console.log("Add item to quote ", vm.quote);

      var item = {        
        name: "",
        size: "",
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
