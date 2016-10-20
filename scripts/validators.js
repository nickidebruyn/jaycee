(function () {

    'use strict';

    var mod = angular.module('quoteApp');

    var INTEGER_REGEXP = /^\-?\d+$/;
    mod.directive('integer', function () {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function (viewValue) {
                    if (viewValue === '' || INTEGER_REGEXP.test(viewValue)) {
                        // it is valid

                        ctrl.$setValidity('integer', true);
                        return viewValue;
                    } else {
                        // it is invalid, return undefined (no model update)
                        ctrl.$setValidity('integer', false);
                        return undefined;
                    }
                });
            }
        };
    });

    mod.directive('max', function () {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {

                var maxValue = attrs.max;

                ctrl.$parsers.unshift(function (viewValue) {

                    viewValue = parseFloat(viewValue);
                    if (viewValue == isNaN) {
                        ctrl.$setValidity('max', true);
                        return viewValue;
                    }

                    if (viewValue === '' || viewValue <= maxValue) {
                        // it is valid

                        ctrl.$setValidity('max', true);
                        return viewValue;
                    } else {
                        // it is invalid, return undefined (no model update)
                        ctrl.$setValidity('max', false);
                        return viewValue;
                    }
                });
            }
        };
    });

    mod.directive('min', function () {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {

                var minValue = attrs.min;

                ctrl.$parsers.unshift(function (viewValue) {

                    viewValue = parseFloat(viewValue);
                    if (viewValue == isNaN) {
                        ctrl.$setValidity('min', true);
                        return viewValue;
                    }

                    if (viewValue === '' || viewValue >= minValue) {
                        // it is valid

                        ctrl.$setValidity('min', true);
                        return viewValue;
                    } else {
                        // it is invalid, return undefined (no model update)
                        ctrl.$setValidity('min', false);
                        return viewValue;
                    }
                });
            }
        };
    });

    mod.directive('fixedlength', function () {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {

                var lengthValue = attrs.fixedlength;

                ctrl.$parsers.unshift(function (viewValue) {
                    //
                    //if (viewValue == isNaN) {
                    //    ctrl.$setValidity('fixedlength', true);
                    //    return viewValue;
                    //}

                    if (viewValue === '' || viewValue.length == lengthValue) {
                        // it is valid
                        ctrl.$setValidity('fixedlength', true);
                        return viewValue;
                    } else {
                        // it is invalid, return undefined (no model update)
                        ctrl.$setValidity('fixedlength', false);
                        return viewValue;
                    }
                });
            }
        };
    });


    var FLOAT_REGEXP = /^\-?\d+((\.|\,)\d+)?$/;
    mod.directive('smartFloat', function () {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function (viewValue) {
                    if (FLOAT_REGEXP.test(viewValue)) {
                        ctrl.$setValidity('float', true);
                        return parseFloat(viewValue.replace(',', '.'));
                    } else {
                        ctrl.$setValidity('float', false);
                        return undefined;
                    }
                });
            }
        };
    });

    function validateFormat(dateVal) {

        if (dateVal == null)
            return false;

        //var validatePattern = /^(\d{4})(-)(\d{1,2})(-)(\d{1,2})$/;
        var validatePattern = /^(\d{4})(\/)(\d{1,2})(\/)(\d{1,2})$/;

        var dateValues = dateVal.match(validatePattern);
        return dateValues;
    }

    function validateDate(dateValues) {

        var dtYear = dateValues[1];
        var dtMonth = dateValues[3];
        var dtDay = dateValues[5];

        if (dtMonth < 1 || dtMonth > 12)
            return false;
        else if (dtDay < 1 || dtDay > 31)
            return false;
        else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31)
            return false;
        else if (dtMonth == 2) {
            var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
            if (dtDay > 29 || (dtDay == 29 && !isleap))
                return false;
        }

        return true;
    }

    mod.directive('date', function () {

        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function (viewValue) {
                    var result = validateFormat(viewValue);
                    if (result === null) {
                        // not right format
                        ctrl.$setValidity('dateFormat', false);
                        return undefined;

                    } else {

                        ctrl.$setValidity('dateFormat', true);

                        // validate date itself
                        var valid = validateDate(result);

                        if (valid) {
                            ctrl.$setValidity('date', true);
                            return viewValue;

                        } else {
                            ctrl.$setValidity('date', false);
                            return undefined;

                        }
                    }
                });
            }
        };
    });

    mod.directive('validTime', function () {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function (viewValue) {

                    var valid = true;
                    ctrl.$setValidity('legalHours', true);
                    ctrl.$setValidity('legalMinutes', true);
                    ctrl.$setValidity('legalSeconds', true);

                    if (INTEGER_REGEXP.test(viewValue.hours)) {
                        if (parseInt(viewValue.hours) < 0) {
                            ctrl.$setValidity('legalHours', false);
                            valid = false;
                        }
                    }
                    else {
                        ctrl.$setValidity('legalHours', false);
                        valid = false;
                    }

                    if (INTEGER_REGEXP.test(viewValue.minutes)) {
                        if (parseInt(viewValue.minutes) < 0 || parseInt(viewValue.minutes) > 59) {
                            ctrl.$setValidity('legalMinutes', false);
                            valid = false;
                        }
                    }
                    else {
                        ctrl.$setValidity('legalMinutes', false);
                        valid = false;
                    }

                    if (INTEGER_REGEXP.test(viewValue.seconds)) {
                        if (parseInt(viewValue.seconds) < 0 || parseInt(viewValue.seconds) > 59) {
                            ctrl.$setValidity('legalSeconds', false);
                            valid = false;
                        }
                    }
                    else {
                        ctrl.$setValidity('legalSeconds', false);
                        valid = false;
                    }


                    if (valid) {
                        return viewValue;
                    }
                    else {
                        return undefined;
                    }


                    //return undefined;
//                if (INTEGER_REGEXP.test(viewValue)) {
//                    // it is valid
//                    ctrl.$setValidity('time', true);
//                    return viewValue;
//                } else {
//                    // it is invalid, return undefined (no model update)
//                    ctrl.$setValidity('time', false);
//                    return undefined;
//                }
                });
            }
        };
    });

})();