$(document).ready(function(){

	//getPosts();
	//getWeather(45,45);
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
		$('div.current div.current-icon').append("<img class='img-fluid' src='https://darksky.net/images/weather-icons/" + data.currently.icon + ".png'>");
		$('div.current div.temp').append("<h4>" + Math.round(data.currently.temperature) + '°F</h4>');
		$('div.current div.weather').append('<h4>' + data.currently.summary + '</h4>');


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

	  		$("#day-list div.row").append("<div class='day-" + day +" col-sm'><div class='day-name'><strong>" + dayName[dayTitle] + "</strong>, " + month[dayMonth] + ' ' + dayDay + "</div><div class='icon'><img class='img-fluid' src='https://darksky.net/images/weather-icons/" + dayWeather.icon + ".png'></div><div class='temperature'>"+ Math.round(dayWeather.temperatureMin) + " - " + Math.round(dayWeather.temperatureMax) + "°F </div><hr><div class='day-summary'>" + dayWeather.summary + "</div></div>");

	  }



			
	}, error: function(error){
		$('.error-message').text('An error occurred. Try entering a new location.')
		
	}})



}




function searchWeather() {

	var searchQuery = $(".search").val();
	getLocation(searchQuery);
}




/* OLD SERVICE


function getWeather(city) {

	$('.error-message').text('');
	$('.city').text('');
	$('.temp').text('');

	var url = "http://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&APPID="+apiKey;
	$.ajax(url,{success: function(data){
		console.log(data);
		$('.city').text(data.name);
		$('.temp').text(data.main.temp);	
	}, error: function(error){
		$('.error-message').text('An error occurred.')
		
	}})

}

function searchWeather() {

	var searchQuery = $(".search").val();
	getWeather(searchQuery);
}
*/

/*


function handleSignIn() {
	var provider = new firebase.auth.GoogleAuthProvider();

	firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  console.log(user.email);
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});

}
*/
/*

function addMessage(postTitle, postBody){

	var postData = {
		title: postTitle,
		body: postBody
	}

	var database = firebase.database().ref("posts");

	var newPostRef = database.push();
	newPostRef.set(postData, function(error) {
    if (error) {
      // The write failed...
    } else {
      window.location.reload();
    }
  });




}

function handleMessageFormSubmit(){

	var postTitle = $("#post-title").val();
	var postBody = $("#post-body").val();
	addMessage(postTitle, postBody);


}


function getPosts(){
	  return firebase.database().ref('posts').once('value').then(function(snapshot) {
	  var posts = snapshot.val();
	  console.log(posts);
	  
	  for(var postKey in posts){
	  		var post = posts[postKey];
	  		$("#post-listings").append("<div>" + post.title + " - " + post.body);

	  }
	 });

}

*/