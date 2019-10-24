$(document).ready(function(){

	document.getElementById("search-button").addEventListener("keydown", function(e) {
    // Enter is pressed
    if (e.keyCode == 13) { searchWeather(); }
}, false);

});


//Use a service to get the latitude and longitude by searching for a city
//Add weather images for 5 day forecast, 10 day forecast
//Add hourly weather data
//convert current time to unix time

function getLocation(city) {

	$('.error-message').text('');
	$('.city').text('');
	$('.location').text('');
	$('div.current div.label').text('');
	$('.temp').text('');
	$('.weather').text('');
	$('div.current div.current-icon').text('');
	$('#day-list div.row').text('');


	//var url = "https://api.darksky.net/forecast/"+darkSkyApiKey+"/"+lat+","+long;

	var url = "https://us1.locationiq.com/v1/search.php?key="+geoApiKey+"&q="+city+"&format=json";

	$.ajax(url,{success: function(data){
		console.log(data);
		$('.city').text('Location: ' + data[0].display_name);
		$('.location').text('Coordinates: ' + data[0].lat+','+data[0].lon);	
		getWeather(data[0].lat,data[0].lon)
	}, error: function(error){
		$('.error-message').text('An error occurred. Try entering a new location.')
		
	}})

}
 

function getWeather(lat,lon) {

	//var url = "https://api.darksky.net/forecast/"+darkSkyApiKey+"/"+lat+","+lon;
    var url = "/weather?q="+lat+","+lon+'&a='+darkSkyApiKey;
	$.ajax(url,{success: function(data){
		console.log(data);
		//$('div.current div.label').append("Currently");
		//$('div.current div.current-icon').append("<img class='img-fluid' src='https://darksky.net/images/weather-icons/" + data.currently.icon + ".png'>");
		//$('div.current div.temp').append("<h4>" + Math.round(data.currently.temperature) + '°F</h4>');
		//$('div.current div.weather').append('<h4>' + data.currently.summary + '</h4>');
		$('#day-list .row').text('');

		for(let day in data.daily.data){
			let month = new Array();
			month[0] = "Jan";
			month[1] = "Feb";
			month[2] = "Mar";
			month[3] = "Apr";
			month[4] = "May";
			month[5] = "Jun";
			month[6] = "Jul";
			month[7] = "Aug";
			month[8] = "Sep";
			month[9] = "Oct";
			month[10] = "Nov";
			month[11] = "Dec";
			let dayName = new Array();
			dayName[0] = "Sunday";
			dayName[1] = "Monday";
			dayName[2] = "Tuesday";
			dayName[3] = "Wednesday";
			dayName[4] = "Thursday";
			dayName[5] = "Friday";
			dayName[6] = "Saturday";
			
	  		let dayWeather = data.daily.data[day];
	  		let dayDate = new Date(dayWeather.time * 1000)
	  		let dayMonth = dayDate.getMonth();
	  		let dayDay = dayDate.getDate();
	  		let dayTitle = dayDate.getDay();

	  		$("#day-list div.row").append("<div class='day-" + day +" col-sm'><div class='day-name'><strong>" + dayName[dayTitle] + "</strong>, " + month[dayMonth] + ' ' + dayDay + "</div><div class='icon'><img class='img-fluid' src='https://darksky.net/images/weather-icons/" + dayWeather.icon + ".png'></div><div class='temperature'>"+ Math.round(dayWeather.temperatureMin) + " - " + Math.round(dayWeather.temperatureMax) + "°F </div><hr><div class='details'><div class='day-summary'>" + dayWeather.summary + "</div><div class='units'><div><strong>PRECIP:</strong> "+Math.round(dayWeather.precipProbability * 100) +"%</div><div><strong>WIND:</strong> "+ dayWeather.windSpeed + " mph</div><div><strong>SUNRISE:</strong> "+ getTime(dayWeather.sunriseTime) + "</div><div><strong>SUNSET:</strong> " + getTime(dayWeather.sunsetTime) + "</div></div></div></div>");


	  }

	  $(".day-0").addClass('col-3');
	  $(".day-0").removeClass('col-sm');

			
	}, error: function(error){
		$('.error-message').text('An error occurred. Please enter a new location.')
		
	}})



}




function searchWeather() {

	let searchQuery = $(".search").val();
	getLocation(searchQuery);
}

function getTime(x){

	let date = new Date(x*1000);
	// Hours part from the timestamp
	let hours = date.getHours();
	// Minutes part from the timestamp
	let minutes = date.getMinutes();
	if(minutes < 10){minutes = "0" + minutes;}
	// Seconds part from the timestamp
	let midDay = "AM";
	if(hours > 11){midDay = "PM"; hours-=12;}
	if(hours == 0){hours = 12};


	return hours + ":" + minutes + " " + midDay;

}