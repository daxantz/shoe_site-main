var shoes = [];
var activeShoe = 0;

var app = angular.module("browseDataApp", []);

app.controller("browseDataController", function ($scope, $http) {
  $scope.obj = [];

  $scope.getRecords = function () {
    $http({
      method: "get",
      url: "http://localhost:5000" + "/get-records",
    }).then(
      function (response) {
        if (response.data.msg === "SUCCESS") {
          shoes = response.data.closetData;
          console.log(shoes);
          $scope.obj = shoes[activeShoe];
          
          $scope.showHide();
        } else {
          console.log(response.data.msg);
        }
      },
      function (response) {
        console.log(response);
      }
    );
  };

  $scope.getRecords();

  $scope.changeShoe = function (direction) {
    activeShoe += direction;
    $scope.obj = shoes[activeShoe];
    $scope.showHide();
  };

  $scope.showHide = function () {
    $scope.hidePrev = activeShoe === 0 ? true : false;
    $scope.hideNext = activeShoe === shoes.length - 1 ? true : false;
  };
});
