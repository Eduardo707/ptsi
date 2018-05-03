
function AppCtrl($scope, $http) {
    console.log("Hello World from controller");


  $http.get('/tests').success(function(response) {
    console.log("I got the data I requested");
    $scope.tests = response;
 //   $scope.contact =response;
  });
};
/*
refresh();

$scope.addContact = function() {
  console.log($scope.contact);
  $http.post('/tests', $scope.contact).success(function(response) {
    console.log(response);
    refresh();
  });
};

$scope.remove = function(id) {
  console.log(id);
  $http.delete('/tests/' + id).success(function(response) {
    refresh();
  });
};

$scope.edit = function(id) {
  console.log(id);
  $http.get('/tests/' + id).success(function(response) {
    $scope.contact = response;
  });
};  

$scope.update = function() {
  console.log($scope.contact._id);
  $http.put('/tests/' + $scope.contact._id, $scope.contact).success(function(response) {
    refresh();
  })
};

$scope.deselect = function() {
  $scope.contact = "";
}
*/
}]);