(function () {

    'use strict';

    var mod = angular.module('quoteApp');

    mod.service('validationUtils', function () {

        var service = {
            setDirty: function (form) {
                angular.forEach(form, function (value, key) {
                    if (value == null) {
                        return;
                    }
                    if (value.hasOwnProperty('$setDirty')) {
                        value.$setDirty();
                    }
                });
            },

            setPristine: function (form) {
                service.setClean(form);
            },

            setClean: function (form) {
                angular.forEach(form, function (value, key) {
                    if (value == null) {
                        return;
                    }
                    if (value.hasOwnProperty('$setPristine')) {
                        value.$setPristine();
                    }
                });
            }

        };

        return service;
    });

})();