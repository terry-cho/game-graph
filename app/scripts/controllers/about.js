'use strict';

/**
 * @ngdoc function
 * @name gameGraphApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the gameGraphApp
 */
angular.module('gameGraphApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
