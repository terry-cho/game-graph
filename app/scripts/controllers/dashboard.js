'use strict';

/**
 * @ngdoc function
 * @name gameGraphApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the gameGraphApp
 */
angular.module('gameGraphApp')
    .controller('DashboardCtrl', function ($scope, $routeParams, $q, dashboard) {
        $scope.params = $routeParams;
        dashboard.getCharts($scope.params.gameId, $scope.params.type)
            .success(function(data) {
                $scope.charts = data;
                angular.forEach(data, function (value, index) {
                    getGraphData(value, index);
                });
            })
            .error(function(data) {
                alert(data);
            });

        var getGraphData = function(data, graphId) {
            //console.log(data);
            var graphOption = {};
            angular.copy(globalGraphOption, graphOption)
            graphOption.title.text = data.title;

            var series = [];

            $q.all(dashboard.getChartsList(data.urls)).then(function(_data) {
                //console.log(_data);
                angular.forEach(_data, function (value, index) {
                    series[index] = {
                        name: data.names[index],
                        data: value.data
                    };
                });
                graphOption.series = series;
                $('#chart' + graphId).highcharts('StockChart', graphOption);
            });
        };

        var globalGraphOption = {
            chart: {
                borderWidth: 1,
                borderRadius: 5
            },
            credits: {
                enabled: false
            },
            rangeSelector: {
                buttons: [{
                    type: 'week',
                    count: 1,
                    text: '1w'
                }, {
                    type: 'month',
                    count: 1,
                    text: '1m'
                }, {
                    type: 'month',
                    count: 2,
                    text: '2m'
                }, {
                    type: 'month',
                    count: 3,
                    text: '3m'
                }, {
                    type: 'month',
                    count: 6,
                    text: '6m'
                }, {
                    type: 'year',
                    count: 1,
                    text: '1y'
                }, {
                    type: 'all',
                    text: 'All'
                }],
                selected: 0
            },
            legend : {
                enabled: true
            },
            title : {
                text:""
            },
            tooltip: {
                valueDecimals: 0
            },
            xAxis : {
                gridLineWidth : 1
            },
            yAxis : {
                floor : 0
            }
        };
    });
