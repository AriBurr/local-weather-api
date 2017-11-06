
$(document).ready(function() {

  var degreeSym = String.fromCharCode(176);
  var date = new Date()
  var currentTempCelsius;
  var unixSunrise;
  var unixSunset;
  var desc;

  navigator.geolocation.getCurrentPosition(function(position) {

    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    var api = ("https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + lon);

    $.ajax({
      url: api,
      type: "GET",
      dataType: "JSON",
      success: function(data){
        $("#city").text(data.name + ", ");
        $("#country").text(data.sys.country);
        $("#date").text(date);
        $("#temp").text(Math.round(data.main.temp) + degreeSym + "C");
        unixSunrise = data.sys.sunrise;
        unixSunset = data.sys.sunset;
        $("#sunrise").text(timeConverter(unixSunrise));
        $("#sunset").text(timeConverter(unixSunset));
        currentTempCelsius = Math.round(data.main.temp);
        desc = data.weather[0].main;
        iconGen(desc);
      }
    });
  });

  $("#convert").on("click", function(){
    var currentTempUnit = $("#convert").text();
    if (currentTempUnit == "Fahrenheit") {
      var fahTemp = Math.round(parseInt($("#temp").text()) * 9 / 5 + 32);
      $("#temp").text(fahTemp + degreeSym + "F");
      $("button").text("Celsius");
    } else {
      $("#temp").text(currentTempCelsius + degreeSym + "C");
      $("button").text("Fahrenheit");
    }
  });

  function timeConverter(UNIX_timestamp){
    var date = new Date(UNIX_timestamp * 1000);
    var timestr = date.toLocaleTimeString();
    return timestr;
  }

  function iconGen(desc){
    var desc = desc.toLowerCase()
    switch (desc) {
      case "clear":
        $("i").addClass("wi wi-day-sunny")
      break;
      case "rain":
        $("i").addClass("wi wi-rain")
      break;
      case "drizzle":
        $("i").addClass("wi wi-sprinkle")
      break;
      case "clouds":
        $("i").addClass("wi wi-cloudy")
      break;
      case "snow":
        $("i").addClass("wi wi-snow")
      break;
      case "thunderstorm":
        $("i").addClass("wi wi-thunderstorm")
      break;
      default:
        $("i").addClass("wi wi-cloud");
    }
  }

});
