var cityName = "";
var cities = [];
function getApi() {
  console.log("hit");
  // fetch request gets a list of all the repos for the node.js organization
  var requestUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityName +
    "&appid=e967a440a143ceff5c2a57cc190f7809";

  // Promises - returns us a Promise object

  // synchronous vs asynchronous code

  // JS by default is synchronous

  fetch(requestUrl)
    .then(function (response) {
      //   console.log(response);
      // the json() method of the body mix in takes a response stream and reads it to completion. It returns a promise which fesolves with a Javascript object that is the result of parsing the body text as JSON

      // Note that despite the method being named json(), the result is not JSON but is instead the result of taking JSON as input and parsing it to produce a Javascript object

      // the Fetch API allows you to asynchronously request for a resource. Use the fetch() method to return a promise that resolves into a Response object e.g., text() or json().

      return response.json();
    })
    .then(function (data) {
      var longitude = data.city.coord.lon;
      var latitude = data.city.coord.lat;
      console.log(longitude);
      console.log(latitude);

      console.log(data); // this is the data that was returned
      //Loop over the data to generate a table, each table row will have a link to the repo url
      var oneCall =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&exclude=hourly,minutely&appid=e967a440a143ceff5c2a57cc190f7809";
      fetch(oneCall)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
        }); // anything we are doing with the data will be stored in curly brackets
      // temp is in K, take temp and subtract 273.15 (temp - 273.15) * 1.8 + 32
      for (var i = 0; i < data.length; i++) {
        // data.length represents the number of objects in the array (30)
        // Creating elements, tablerow, tabledata, and anchor
        var createTableRow = document.createElement("tr");
        var tableData = document.createElement("td");
        var link = document.createElement("a");

        // Setting the text of link and the href of the link
        link.textContent = data[i].html_url;
        link.href = data[i].html_url;

        // Appending the link to the tabledata and then appending the tabledata to the tablerow
        // The tablerow then gets appended to the tablebody
        tableData.appendChild(link);
        createTableRow.appendChild(tableData);
        tableBody.appendChild(createTableRow);
      }
    });
}
var fetchButton = document.getElementById("search");
fetchButton.addEventListener("click", getApi);

localStorage.setItem("cities", JSON.stringify(array)); // keyName = probably cities
var cities = [];
if (JSON.parse(localStorage.getItem("cities"))) {
  cities = JSON.parse(localStorage.getItem("lastCity"));
}
// when the user types in a city
// listen to the search button
// when it is hit get the value from the input field and put in a variable
// check to see if that value exists in the city's array .indexOf(variable) === -1
// if it doesn't exist then cities.push(thenewcity)

// create a function that would create the history of the cities inputted and call if after the .push and whenever the page is loaded
// looping over the cities array
// create the array[i]
// and creating an element (maybe a button) with the text of the city
// append it to a div before the next iteration
