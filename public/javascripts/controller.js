angular.module('myApp', [])
    .controller('MyController', ['$scope', '$http', function ($scope, $http) {
        $scope.onclick = function () {
            $http({
                method: 'GET',
                url: '/ips/api/v1/ec2-list'
            }).success(function (data, status, headers, config) {
                $scope.ec2Results = data.Reservations;
            }).error(function (data, status, headers, config) {
                console.log(status);
            });
            $http({
                method: 'GET',
                url: '/ips/api/v1/rds-list'
            }).success(function (data, status, headers, config) {
                $scope.rdsResults = data.Reservations;
            }).error(function (data, status, headers, config) {
                console.log(status);
            });
        };
    }]);