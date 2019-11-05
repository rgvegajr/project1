//  $(document).ready(function() {
// Initialize Firebase
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCVG0EbnjHGxAlJfNRPnppdsbVGoeAR_0A",
    authDomain: "project1-419db.firebaseapp.com",
    databaseURL: "https://project1-419db.firebaseio.com",
    projectId: "project1-419db",
    storageBucket: "project1-419db.appspot.com",
    messagingSenderId: "78571791945",
    appId: "1:78571791945:web:a3fb18f06a4d5be02dc198"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Create a variable to reference the database function
let database = firebase.database();

let item = "";
let zip = "";
let store = "";
let radius = 10000;
let storeNum = 5;
let storesArray = [];

// Capture Button Click to search for items
$("#item").on("click", function(event) {
    // Don't refresh the page!
    event.preventDefault();
    item = "shoes";
    // item = $("#searchItem").val().trim();
    // zip = $("#zipCode").val().trim();
    zip = 33173;
    radius = 10000;
    storeNum = 5;
    // radius = $("#radius-input").val().trim();
    // storeNum = $("#storeNum-input").val().trim();
    console.log(item);
    console.log(zip);
    console.log(radius);
    console.log(storeNum);
});

//insert code to query yelp and return response object
//ajax

let search = "shoes"
let location1 = "33157"
let apikey = "q1OFvftbUw9yLkYlGeg8md7bDcT0Z35v9n_DP_qQFjUzHcLHKJ87k3b7MWe35-4NNrGQ_gPOQm9WBXuTl785tf8a55k3sRNL_ItoMCZu1jkyXLWNs0OI_NydhyK6XXYx"
let queryurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=" + search + "&location=" + location1;

$.ajax({
    url: queryurl,
    headers: {
        "Authorization": "Bearer " + apikey,
    },
    method: 'GET',
    dataType: 'json',
    success: function(response) {
        console.log(response);


    }
});

//  const queryURL = "https://api.yelp.com/v3/businesses/search?term=" + item + "&location=" + zip + "&radius=" + (radius / 1609.344) + "&limit=" + storeNum; //ajax call to yelp.  Limit to 10 (via api)

// var settings = {
//     // "async": true,
//     // "crossDomain": true,
//     url: "https://api.yelp.com/v3/businesses/search?term=shoes&location=33173&radius=5000&limit=5",
//     method: "GET",
//     headers: {
//         "Authorization": "Bearer q1OFvftbUw9yLkYlGeg8md7bDcT0Z35v9n_DP_qQFjUzHcLHKJ87k3b7MWe35-4NNrGQ_gPOQm9WBXuTl785tf8a55k3sRNL_ItoMCZu1jkyXLWNs0OI_NydhyK6XXYx"
//             // "User-Agent": "PostmanRuntime/7.19.0",
//             // "Accept": "*/*",
//             // "Cache-Control": "no-cache",
//             // "Postman-Token": "6cea46c1-dbc2-4e32-88c0-c2b72de32b0f,ebfbd941-93fc-4619-8251-a867922f3d99",
//             // "Host": "api.yelp.com",
//             // "Accept-Encoding": "gzip, deflate",
//             // "Connection": "keep-alive",
//             // "cache-control": "no-cache"
//     }
// }

// $.ajax(settings).done(function(response) {
//     console.log(response);
// });

// let search = ""
// let location1 = ""

// let apikey = "q1OFvftbUw9yLkYlGeg8md7bDcT0Z35v9n_DP_qQFjUzHcLHKJ87k3b7MWe35-4NNrGQ_gPOQm9WBXuTl785tf8a55k3sRNL_ItoMCZu1jkyXLWNs0OI_NydhyK6XXYx"

// // let queryurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=" + search + "&location=" + location1;
// let queryurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=" + item + "&location=" + zip;

// // $(document).ready(function(){
// //     $(‘.modal’).modal();
// //     });

// // let myurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=shoes&location=33157";

// $.ajax({
//     url: queryurl,
//     headers: {
//         "Authorization": "Bearer " + apikey,
//     },
//     method: 'GET',
//     dataType: 'json',
//     success: function(response) {
//         console.log(response);
//     }
// });


//  $.ajax({
//      url: queryURL,
//      method: "GET"
//  }).then(function(response) {
//      let results = response.data; //var to hold ajax response data
//      console.log(response);


//           GET /v3/businesses/search?term=shoes&amp; location=33173&amp; radius=5000&amp; limit=5 HTTP/1.1
// Host: api.yelp.com
// Authorization: Bearer,Bearer q1OFvftbUw9yLkYlGeg8md7bDcT0Z35v9n_DP_qQFjUzHcLHKJ87k3b7MWe35-4NNrGQ_gPOQm9WBXuTl785tf8a55k3sRNL_ItoMCZu1jkyXLWNs0OI_NydhyK6XXYx
// cache-control: no-cache
// Postman-Token: e4b060db-b330-4ad3-bec7-cea381b79fa2



// //push to database

//     database.ref().push({
//         item: item,
//         zip: zip,
//         radius: radius,
//         storeNum: storeNum,
//         storeArray: storeArray,
//         dateAdded: firebase.database.ServerValue.TIMESTAMP
//     });

//     alert("Search added!");

// });

// database.ref().on("child_added", function(childSnapshot) {
//     console.log(childSnapshot.val());

//     let newStore = $("<tr>").append(
//         $("<td>").text(childSnapshot.val().item),
//         $("<td>").text(childSnapshot.val().zip),
//         $("<td>").text(childSnapshot.val().radius),
//         $("<td>").text(childSnapshot.val().storeNum),
//     );
//     $("#new-store").append(newStore);
// }, function(errorObject) {
//     console.log("Errors handled: " + errorObject.code);
// });



//  });

//sample code for ajax call
//  $("button").on("click", function() { //function to return gifs upon button click
//     const dog = $(this).attr("data-dog"); // creates var to hold data-dog value of the btn clicked by user and returned by ajax call
//     console.log("Dog button clicked: " + dog);
//     const queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
//         dog + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10"; //ajax call to giphy with dog value.  Limit to 10 (via api)
//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).then(function(response) {
//         let results = response.data; //var to hold ajax response data
//         console.log(response);
//         $("#dog-view").empty(); //clears the div from any existing gifs
//         for (let i = 0; i < results.length; i++) { //for length of results (10), create divs to hold and display ratings and images 
//             const gifDiv = $("<div>");
//             const rating = results[i].rating;
//             const p = $("<p>").text("Rating: " + rating);
//             const dogImage = $("<img>");
//             const dogImageStillUrl = results[i].images.fixed_height_still.url;
//             const dogImageAnimateUrl = results[i].images.fixed_height.url;
//             dogImage.attr("src", results[i].images.fixed_height_still.url); //up date img src with returned value
//             dogImage.attr("data-still", dogImageStillUrl);
//             dogImage.attr("data-animate", dogImageAnimateUrl);
//             dogImage.attr("data-state", "still");
//             dogImage.attr("id", "gif");
//             console.log("dog gif element created");
//             // dogImage.addClass("gif");
//             // dogImage.attr("id", ("dogBtn-" + i));
//             // dogImage.attr("id", ("dogBtn-" + i));
//             gifDiv.prepend(p); //add rating to div
//             gifDiv.append(dogImage); //add image to div
//             $("#dog-view").prepend(gifDiv); //add completed div to placeholder in html
//         };
//     });
// });