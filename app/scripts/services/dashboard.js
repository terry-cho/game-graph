'use strict';

/**
 * @ngdoc service
 * @name gameGraphApp.dashboard
 * @description
 * # dashboard
 * Factory in the gameGraphApp.
 */
angular.module('gameGraphApp')
    .factory('dashboard', function ($http) {
        var prefixUrl = "http://bi002.vps.phps.kr:8080/bi";

        return {
            getCharts: function(gameId,type) {
                return $http.get(prefixUrl + '/api/charts/' + gameId + '/' + type);
            },
            getChartsList: function(data) {
                var chartsList = [];
                angular.forEach(data, function(value) {
                    chartsList.push($http.get(prefixUrl + '/' + value));
                });
                return chartsList;
            }
        };
    });
