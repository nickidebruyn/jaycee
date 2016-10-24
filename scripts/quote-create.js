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
      addQuoteTable(doc, 72);
      addDocumentFooter(doc, 115 + (vm.quote.items.length * 6));

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
      doc.text(120, startY + 10, 'EXCEPTIONAL SERVICE \n       SINCE 1979');      

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

      doc.text(140, startY + 4, 'DATE:');

      doc.setFontType("helvetica");
      doc.text(40, startY + 4, vm.quote.clientAddress);
      doc.text(40, startY + 8, vm.quote.clientName);
      doc.text(40, startY + 12, '' + vm.quote.clientTel);
      doc.text(40, startY + 16, '' + vm.quote.clientFax);
      doc.text(40, startY + 20, '' + vm.quote.clientCell);
      doc.text(40, startY + 24, vm.quote.clientContact);
      doc.text(40, startY + 28, vm.quote.clientDetails);


      var today = new Date();
      today.toISOString().substring(0, 10);

      doc.text(150, startY + 4, "" + today);

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

      doc.rect(10, startY-5, 190, startY + (vm.quote.items.length * spacing)-40);

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

    function addDocumentFooter(doc, startY) {

      doc.setTextColor(0);
      doc.setFontSize(10);
      doc.setFontType("bold");
      doc.text(10, startY , "Quote Checked By :_____________________________");
      doc.text(143, startY , 
        "Quote Accepted:___________________");
      doc.text(143, startY + 6 , 
        "Date:_____________________________");

      doc.setFontSize(8);
      doc.text(10, startY + 12 , "50% ON ACCEPTANCE OF ORDER");
      doc.text(10, startY + 16 , "40% ON DELIVERY OF FIRST WINDOWS");
      doc.text(10, startY + 20 , "10% ON COMPLETION DAY");

      doc.text(10, startY + 26 , "THIS QUOTE MAY CHANGE AT ANY TIME WITHOUT PRIOR NOTICE AND IS SUBJECT TO THE STANDARD\n"+
        "JAYCEE GLASS & ALUMINIUM TERMS AND CONDITIONS OF TRADE AVAILABLE UPON REQUEST, AND WILL ONLY BE\n"+
        "VALID ONCE THE DEPOSIT OF 50% HAS BEEN PAID.");

      doc.text(10, startY + 38 , "THANK YOU FOR YOUR MOST VALUED ENQUIRY. ");      

      doc.text(50, startY + 46 , "(CREDIT CARDS ACCEPTED. 5% will be added if payment is made by credit card.)");      

      var signData = 'data:image/jpeg;base64,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';
      doc.addImage(signData, 'JPEG', 2, startY + 52, 30, 26);

      doc.text(10, startY + 54 , "REGARDS");
      doc.text(143, startY + 54 , "STD BANK GEZINA");
      doc.text(143, startY + 58 , "ACC: 011 787295");
      doc.text(143, startY + 62 , "BRANCH: 014845");

      doc.setFontType("helvetica");
      doc.text(10, startY + 58 , "Jan Clemons");
      doc.text(10, startY + 62 , "082 775 0156");



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
