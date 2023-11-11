//var data = '[{"Name":"Nike SB Dunk Low", "Released": "09/01/2020", "Type": "sneaker", "Brand": "Nike", "Price": "$95", "Color": "Red/White"},{"Name":"Ultra Boost", "Released": "11/30/2022", "Type": "running", "Brand": "Adidas", "Price": "$200", "Color": "Black"}, {"Name":"Jordan 1", "Released": "08/31/2019", "Type": "high-top", "Brand": "Nike", "Price": "$160", "Color": "Obsidian Blue"},{"Name":"Yeezy Boost 350 v2", "Released": "03/21/2022", "Type": "runner", "Brand": "Adidas", "Price": "$230", "Color": "Bone"}, {"Name":"J Balvin Medellin Sunset", "Released": "09/23/2023", "Type": "sneaker", "Brand": "Nike", "Price": "$250", "Color": "Multi-Color"}]';

// var jsonObject = JSON.parse(data);

getData();

function main() {
  //   console.log(data);
  console.log(jsonObject);
  showTable();
}

function getData() {
  $.ajax({
    url: "http://localhost:5000" + "/get-records",
    type: "get",
    success: function (response) {
      var data = JSON.parse(response);
      console.log("hello");

      if (data.msg === "SUCCESS") {
        console.log(response);
        showTable(data.closetData);
      } else {
        console.log(data.msg);
      }
    },
    error: function (err) {
      console.log(err);
    },
  });
}

function showTable(jsonObject) {
  var htmlString = "";
  for (var i = 0; i < jsonObject.length; i++) {
    htmlString += "<tr>";
    htmlString += "<td>" + jsonObject[i].shoe_name + "</td>";
    htmlString += "<td>" + jsonObject[i].year_released + "</td>";
    htmlString += "<td>" + jsonObject[i].shoe_type + "</td>";
    htmlString += "<td>" + jsonObject[i].brand + "</td>";
    htmlString += "<td>" + jsonObject[i].price + "</td>";
    htmlString += "<td>" + jsonObject[i].color + "</td>";

    htmlString += "</tr>";
  }

  $("#shoe_table").html(htmlString);
}
