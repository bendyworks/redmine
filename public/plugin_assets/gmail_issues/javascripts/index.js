console.log('im alive');

var issuesApp = angular.module('issuesApp', ['restangular', 'ui.grid']);

// create the controller and inject Angular's $scope
issuesApp.controller('mainController', function($scope, Restangular) {
  // var ApiIssue = $resource('/issues/:issueId.json', {issueId: '@id'});

  this.issues = [];

  this.apiIssues = [];
  $scope.issueData = [];
  $scope.gridOptions = {
    enableFiltering: true,
    columnDefs: [
      {field: 'subject'},
      {field: 'description'},
      {field: 'priority'},
      {field: 'author'},
      {field: 'startDate'},
      {field: 'doneRatio'}
    ],
    data: []
  };

  var cont = this;

  Restangular.addResponseInterceptor(function(data, operation) {
    var extractedData;
    if (operation === 'getList') {
      extractedData = data.issues;
    } else {
      extractedData = data;
    }
    return extractedData;
  });

  Restangular.all('issues.json').getList().then(function(issues) {
    cont.apiIssues = issues;

    $scope.gridOptions.data = _.map(issues, function(i) {
      console.log(i);
      return {
        'subject': i.subject,
        'description': i.description,
        'priority': i.priority.name,
        'author': i.author.name,
        'startDate': i.start_date,
        'doneRatio': i.done_ratio
      };
    });
    console.log($scope.issueData);
  });
});
