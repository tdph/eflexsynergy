var app = angular
    .module("app", [])
    .controller("myController", ['$scope', function($scope) {
        $scope.toggle = function() {
            $('.header').toggleClass('isshow');
        };
    }]);
