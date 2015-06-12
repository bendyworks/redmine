console.log('im alive');

var issuesApp = angular.module('issuesApp', ['ngResource']);

// create the controller and inject Angular's $scope
issuesApp.controller('mainController', ['$resource', function($resource) {
  var ApiIssue = $resource('/issues/:issueId', {issueId: '@id'});

  this.issues = [{title: 'hello'}, {title: 'yep'}];

  this.apiIssues = function() {
    return ApiIssue.query();
  };
}]);
