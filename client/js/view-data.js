//var data = '[{"Name":"Nike SB Dunk Low", "Released": "09/01/2020", "Type": "sneaker", "Brand": "Nike", "Price": "$95", "Color": "Red/White"},{"Name":"Ultra Boost", "Released": "11/30/2022", "Type": "running", "Brand": "Adidas", "Price": "$200", "Color": "Black"}, {"Name":"Jordan 1", "Released": "08/31/2019", "Type": "high-top", "Brand": "Nike", "Price": "$160", "Color": "Obsidian Blue"},{"Name":"Yeezy Boost 350 v2", "Released": "03/21/2022", "Type": "runner", "Brand": "Adidas", "Price": "$230", "Color": "Bone"}, {"Name":"J Balvin Medellin Sunset", "Released": "09/23/2023", "Type": "sneaker", "Brand": "Nike", "Price": "$250", "Color": "Multi-Color"}]';

// var jsonObject = JSON.parse(data);

var app = angular.module("closetApp", []);

app.controller("closetController", function($scope,$http){
  $scope.shoes = [];
  $scope.types = [];
  $scope.getRecords = function () {
    $http({
      method: "get",
      url: "http://localhost:5000"  + "/get-records",
    }).then(
      function (response) {
        if (response.data.msg === "SUCCESS") {
          $scope.shoes = response.data.closetData;
          
          $scope.types = getTypes(response.data.closetData);
          $scope.selectedType = $scope.types[0];
        } else {
          console.log(response.data.msg);
        }
      },
      function (response) {
        console.log("THE ERROR" + JSON.stringify(response));
      }
    );
  }

  $scope.getRecords();

  $scope.redrawTable = function () {
    var type = $scope.selectedType.value;
    $http({
      method: "get",
      url: "http://localhost:5000"  + "/get-shoesByType",
      params: { type: type },
    }).then(
      function (response) {
        if (response.data.msg === "SUCCESS") {
          console.log(response.data.closetData)
          $scope.shoes = response.data.closetData;
        }
      },
      function (response) {
        console.log(response);
      }
    );
  }

  $scope.editShoe = function (shoeNumber) {
    $scope.name = $scope.shoes[shoeNumber].shoe_name;
    $scope.releaseDate = $scope.shoes[shoeNumber].year_released;
    $scope.type = $scope.shoes[shoeNumber].shoe_type;
    $scope.brand = $scope.shoes[shoeNumber].brand;
    $scope.price = $scope.shoes[shoeNumber].price
    $scope.color = $scope.shoes[shoeNumber].color
    $scope.shoeID = $scope.shoes[shoeNumber]["_id"];

    $scope.hideTable = true;
    $scope.hideForm = false;
  };

  $scope.cancelUpdate = function () {
    $scope.hideTable = false;
    $scope.hideForm = true;
  }

  $scope.updateShoe = function () {
    if ($scope.name === "" || $scope.releaseDate === "" || $scope.type === "" || $scope.brand === "" || $scope.price === "" || $scope.color === "") {
      $scope.addResults = "All fields are required";
      return;
    }

    $http({
      method: "put",
      url: "http://localhost:5000"  + "/update-shoe",
      data: {
        ID: $scope.shoeID,
        name: $scope.name,
        releaseDate: $scope.releaseDate,
        type: $scope.type.toLowerCase(),
        brand: $scope.brand,
        price: $scope.price,
        color: $scope.color
      },
    }).then(
      function (response) {
        console.log(response);
        if (response.data.msg === "SUCCESS") {
          $scope.cancelUpdate();
          $scope.getRecords();
          $scope.name = "";
          $scope.type = "";
          $scope.brand = "";
          $scope.price = "";
          $scope.color = "";
        }
      },
      function (response) {
        console.log(response);
      }
    );
  };

  $scope.deleteShoe = function (shoeID) {
    $http({
      method: "delete",
      url: "http://localhost:5000" + "/delete-shoe",
      params: { shoeID: shoeID },
    }).then(
      function (response) {
        if (response.data.msg === "SUCCESS") {
          $scope.redrawTable();
        } else {
          console.log(response.data.msg);
        }
      },
      function (response) {
        console.log(response);
      }
    );
  };



})

function getTypes(shoesTableData) {
  var typeExists;

  typesArray = [{ value: "", display: "ALL" }];

  for (var i = 0; i < shoesTableData.length; i++) {
    typeExists = typesArray.find(function (element) {
      return element.value === shoesTableData[i].shoe_type;
    });

    if (typeExists) {
      continue;
    } else {
      typesArray.push({
        value: shoesTableData[i].shoe_type,
        display: shoesTableData[i].shoe_type.toUpperCase(),
      });
    }
  }

  return typesArray;
}

// $(document).ready(function () {
//   getData();
// });

// function getData() {
//   $.ajax({
//     url: "http://localhost:5000" + "/get-records",
//     type: "get",
//     success: function (response) {
//       var data = JSON.parse(response);
//       console.log(data);

//       if (data.msg === "SUCCESS") {
//         console.log(response);
//         showTable(data);
//       } else {
//         console.log(data.msg);
//       }
//     },
//     error: function (err) {
//       console.log(err);
//     },
//   });
// }

// function showTable(data) {
//   var htmlString = "";
//   for (var i = 0; i < data.closetData.length; i++) {
//     htmlString += "<tr>";
//     htmlString += "<td>" + data.closetData[i].shoe_name + "</td>";
//     htmlString += "<td>" + data.closetData[i].year_released + "</td>";
//     htmlString += "<td>" + data.closetData[i].shoe_type + "</td>";
//     htmlString += "<td>" + data.closetData[i].brand + "</td>";
//     htmlString += "<td>" + data.closetData[i].price + "</td>";
//     htmlString += "<td>" + data.closetData[i].color + "</td>";
//     htmlString +=
//       "<td>" +
//       "<button class='btn btn-sm edit_btn delete-button' " +
//       "data-id='" +
//       data.closetData[i]["_id"] +
//       "'>DELETE</button>" +
//       "</td>";

//     htmlString += "</tr>";
//   }

//   $("#table_body").html(htmlString);
//   deleteButton();
// }

// function deleteRecord(shoeId) {
//   $.ajax({
//     url: "http://localhost:5000" + "/delete-records",
//     type: "delete",
//     data: { id: shoeId },
//     success: function (response) {
//       var data = JSON.parse(response);

//       if (data.msg === "SUCCESS") {
//         console.log("Record deleted");
//         getData();
//       } else {
//         console.log(data.msg);
//       }
//     },
//     error: function (err) {
//       console.log(err);
//     },
//   });
// }

// function deleteButton() {
//   $(".delete-button").click(function () {
//     var deleteID = this.getAttribute("data-id");
//     deleteRecord(deleteID);
//     location.reload();
//   });
// }
