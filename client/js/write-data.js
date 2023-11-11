$("#Submit").click(function () {
  var shoe_name = $("#shoe_name").val();
  var year_released = $("#year_released").val();
  var shoe_type = $("#shoe_type").val();
  var brand = $("#brand").val();
  var price = $("#price").val();
  var color = $("#color").val();

  var jsonObject = {
    shoe_name: shoe_name,
    year_released: year_released,
    shoe_type: shoe_type,
    brand: brand,
    price: price,
    color: color,
  };

  $.ajax({
    url: "http://localhost:5000" + "/write-record",
    type: "post",
    data: jsonObject,
    success: function (response) {
      var data = JSON.parse(response);
      if (data.msg === "SUCCESS") {
        alert("Data successfully saved");
      } else {
        console.log(data.msg);
      }
    },
    error: function (err) {
      console.log(err);
    },
  });
});

$("#clear").click(function () {
  $("shoe_name").val("");
  $("year_released").val("");
  $("shoe_type").val("");
  $("brand").val("");
  $("price").val("");
  $("color").val("");
});
