var countryControllers = angular.module('countryControllers', []);

countryControllers.controller('CountryListCtrl', function ($scope, countries){
  countries.list(function(countries) {
    $scope.countries = countries;
  });
});

countryControllers.controller('CountryDetailCtrl', function ($scope, $routeParams, countries){
  countries.list($routeParams.countryId, function(countries) {
    $scope.countries = countries;
  });
});
