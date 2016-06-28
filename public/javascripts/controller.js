angular.module('myApp', [])
    .controller('MyController', ['$scope', '$http', function ($scope, $http) {
        $scope.onclick = function () {
            $http({
                method: 'GET',
                url: '/ips/api/v1/ec2-list'
            }).success(function (data, status, headers, config) {
                
                _.each(data.Reservations, function (element, index, array) {
                    //console.log(element.Instances[0]);
                    _.each(element.Instances[0].Tags, function (elem, idx, arr) {
                        var key = elem['Key'];
                        var value = elem['Value'];
                        data.Reservations[index].Instances[0].Tags[key] = value;
                        //console.log(elem);
                    });
                });
                $scope.ec2Results = data.Reservations;
                console.log(data.Reservations);

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