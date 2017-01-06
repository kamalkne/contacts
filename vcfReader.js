var vcfReader = angular.module('vcfReader', []);

vcfReader.controller('vcfCtrl', ['$http', '$scope', function($http, $scope) {
    $http.get('vcfJson.json')
        .then(function(data) {
            $scope.contact = data.data;
        });
}])
