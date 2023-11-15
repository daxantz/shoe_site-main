//var data = '[{"Name":"Nike SB Dunk Low", "Released": "09/01/2020", "Type": "sneaker", "Brand": "Nike", "Price": "$95", "Color": "Red/White"},{"Name":"Ultra Boost", "Released": "11/30/2022", "Type": "running", "Brand": "Adidas", "Price": "$200", "Color": "Black"}, {"Name":"Jordan 1", "Released": "08/31/2019", "Type": "high-top", "Brand": "Nike", "Price": "$160", "Color": "Obsidian Blue"},{"Name":"Yeezy Boost 350 v2", "Released": "03/21/2022", "Type": "runner", "Brand": "Adidas", "Price": "$230", "Color": "Bone"}, {"Name":"J Balvin Medellin Sunset", "Released": "09/23/2023", "Type": "sneaker", "Brand": "Nike", "Price": "$250", "Color": "Multi-Color"}]';

// var jsonObject = JSON.parse(data);

$(document).ready(function () {
  getData();
})



// function main() {
//   //   console.log(data);
//   console.log(jsonObject);
//   showTable();
// }

function getData() {
  
  $.ajax({
    url: "http://localhost:5000" + "/get-records",
    type: "get",
    success: function (response) {
      var data = JSON.parse(response);
      console.log(data);

      if (data.msg === "SUCCESS") {
        console.log(response);
        showTable(data);
      } else {
        console.log(data.msg);
      }
    },
    error: function (err) {
      console.log(err);
    },
  });
}

function showTable(data) {
  var htmlString = "";
  for (var i = 0; i < data.closetData.length; i++) {
    htmlString += "<tr>";
    htmlString += "<td>" + data.closetData[i].shoe_name + "</td>";
    htmlString += "<td>" + data.closetData[i].year_released + "</td>";
    htmlString += "<td>" + data.closetData[i].shoe_type + "</td>";
    htmlString += "<td>" + data.closetData[i].brand + "</td>";
    htmlString += "<td>" + data.closetData[i].price + "</td>";
    htmlString += "<td>" + data.closetData[i].color + "</td>";
    htmlString += "<td>" + "<button class='btn btn-sm edit_btn delete-button' " + "data-id='" + data.closetData[i].id + "'>DELETE</button>" + "</td>";

    htmlString += "</tr>";
    console.log("ID: " + data.closetData[i].id )
  }
  
    
  $("#table_body").html(htmlString);
}

function deleteRecord(shoeId){
  $.ajax({
    url: "http://localhost:5000" + "/delete-records",
    type: "delete",
    data: {id: shoeId},
    success: function (response) {
      var data = JSON.parse(response);
      console.log(deleteID);

      if (data.msg === "SUCCESS") {
        console.log("Record deleted");
      } else {
        console.log(data.msg);
      }
    },
    error: function (err) {
      console.log(err);
    },
  });
}

$(".delete-button").click(function(){
  var deleteID = this.getAttribute("data-id");
  deleteRecord(deleteID);
})
