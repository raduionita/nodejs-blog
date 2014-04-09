'use strict';

// directive
angular.module('article.directives', []).directive('appVersion', ['version', function(version) {
  return function(scope, elem, attrs) {
    elem.text(version);
  };
}]);

// filters
angular.module('article.filters', []).filter('interpolate', ['version', function(version) {
  return function(text) {
    return String(text).replace('/\%VERSION\%/mg', version);
  };
}]);

// services
angular.module('article.services', []).value('version', '0.0.1');

// app
angular.module('article', ['article.filters', 'article.services', 'article.directives'])
       .config(['$routeProvider', '$locationProvider'], function($routeProvider, $locationProvider) {
  $routeProvider.
    when('/admin/articles', { 
      templateUrl: 'partials/list',
      controller : function($scope, $http) {
        $http.get('/admin/articles').success(function(data, status, headers, config) {
          $scope.articles = data.articles;
        });
      }
    }).
    when('/admin/articles#add', {
      templateUrl: 'partials/add',
      controller : function($scope, $http, $location) {
        $scope.form = {};
        $scope.add = function() {
          $http.post('/admin/articles', $scope.form).success(function(data) {
            $location.path('/admin/articles/'+ data.key);
          });
        };
      }
    }).
    when('/admin/articles/:key#view', {
      templateUrl: 'partials/view',
      controller : function($scope, $http, $routeParams) {
        $http.get('/admin/articles/'+ $routeParams.key).success(function(data) {
          $scope.article = data.article
        });
      }
    }).
    when('/admin/articles/:key#edit', {
      templateUrl: 'partials/edit',
      controller : function($scope, $http, $location, $routeParams) {
        $scope.form = {};
        $http.get('/admin/articles/'+ $routeParams.key).success(function(data) {
          $scope.form = data.articles;
        });
        $scope.edit = function() {
          $http.put('/admin/articles/'+ $routeParams.key, $scope.form).success(function(data) {
            // $location.url('/admin/articles/'+ $routeParams.key)
            // $http.get('/admin/articles/'+ $routeParams.key)...
          });
        };
      }
    }).
    when('/admin/articles/:key#delete', {
      templateUrl: 'partials/delete',
      controller : function($scope, $http, $location, $routeParams) {
        $http.get('/admin/articles/'+ $routeParams.key).success(function(data) {
          $scope.articles = data.articles;
        });
        $scope.delete = function() {
          $http.delete('/admin/articles/'+ $routeParams.key).success(function(data) {
            $location.url('/admin/articles');
          });
        };
        $scope.home = function() {
          $location.url('/admin/articles');
        };
      }
    }).
    otherwise({
      redirectTo: '/'
    });
  $locationProvider.html5Mode(true);
});
