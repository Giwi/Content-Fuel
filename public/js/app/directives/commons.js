angular.module('contentfuel.commonsDirectives', [])



/**
 * Directive pour mesurer le niveau de sécurité d'un mot de passe
 *
 * @author Xavier MARIN
 * @class ContentFuelApp.directives.checkStrength
 * @copyright <b>ContentFuelApp</b>.
 */
    .directive('checkStrength', function () {
        'use strict';
        return {
            restrict: 'EAC',
            scope: {
                check: "="
            },
            link: function (scope, iElement) {
                var strength = {
                    colors: ['#F00', '#F90', '#FF0', '#9F0', '#0F9D58'],
                    mesureStrength: function (p) {
                        if (!angular.isDefined(p) || p === null) {
                            p = '';
                        }
                        var _force = 0;
                        var _regex = /[$-/:-?{-~!"^_`\[\]]/g;
                        var _lowerLetters = /[a-z]+/.test(p);
                        var _upperLetters = /[A-Z]+/.test(p);
                        var _numbers = /[0-9]+/.test(p);
                        var _symbols = _regex.test(p);

                        var _flags = [_lowerLetters, _upperLetters, _numbers, _symbols];
                        var _passedMatches = $.grep(_flags, function (el) {
                            return el === true;
                        }).length;
                        _force += 2 * p.length + (p.length >= 10 ? 1 : 0);
                        _force += _passedMatches * 10;
                        // penality (short password)
                        _force = p.length <= 6 ? Math.min(_force, 10) : _force;
                        // penality (poor variety of characters)
                        _force = _passedMatches == 1 ? Math.min(_force, 10) : _force;
                        _force = _passedMatches == 2 ? Math.min(_force, 20) : _force;
                        _force = _passedMatches == 3 ? Math.min(_force, 40) : _force;
                        return _force;

                    },
                    getColor: function (s) {
                        var idx = 0;
                        if (s <= 10) {
                            idx = 0;
                        } else if (s <= 20) {
                            idx = 1;
                        } else if (s <= 30) {
                            idx = 2;
                        } else if (s <= 40) {
                            idx = 3;
                        } else {
                            idx = 4;
                        }
                        return {
                            idx: idx + 1,
                            col: this.colors[idx]
                        };

                    }
                };
                scope.$watch('check', function (newValue) {
                    if (angular.isUndefined(newValue) || newValue === '') {
                        iElement.css({
                            "display": "none"
                        });
                    } else {
                        var c = strength.getColor(strength.mesureStrength(newValue));
                        iElement.css({
                            "display": "inline"
                        });
                        iElement.children('li').css({
                            "background": "#DDD"
                        }).slice(0, c.idx).css({
                            "background": c.col
                        });
                    }
                }, true);

            },
            template: '<li class="point"></li><li class="point"></li><li class="point"></li><li class="point"></li><li class="point"></li>'
        };
    })

    .directive('uiDate', function ($filter) {
        'use strict';
        return {
            require: '?ngModel',
            scope: {
                dateOption: '='
            },
            link: function ($scope, elem, attrs, ngModel) {
                ngModel.$setValidity('uiDate', true);
                $scope.dateOption.dateFormat = $filter('translate')('date.format');
                if (elem.val() !== "") {
                    ngModel.$setValidity('uiDate', true);
                }

                elem.mask($scope.dateOption.dateFormat.replace(/\w/gi, "9"), {
                    completed: function () {
                        var val = moment(this.val(), $scope.dateOption.dateFormat.toUpperCase()).valueOf();
                        $scope.dateOption.val = val;
                        $scope.$apply(function () {
                            if (($scope.dateOption.minDate < val) && ($scope.dateOption.maxDate > val)) {
                                ngModel.$setValidity('uiDate', true);
                            } else {
                                ngModel.$setValidity('uiDate', false);
                            }
                        });
                        ngModel.$setViewValue(val);
                    }
                });
            }
        };
    })

/**
 * Directive pour vérifier que deux mots de passe sont identiques
 *
 * @author Xavier MARIN
 * @class ContentFuelApp.directives.passwdCheck
 * @copyright <b>ContentFuelApp</b>.
 */
    .directive('passwdCheck', function () {
        'use strict';
        return {
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                var firstPassword = '#' + attrs.passwdCheck;
                elem.add(firstPassword).on('keyup', function () {
                    scope.$apply(function () {
                        var v = elem.val() === $(firstPassword).val();
                        ctrl.$setValidity('pwmatch', v);
                    });
                });
            }
        };
    })

//
;