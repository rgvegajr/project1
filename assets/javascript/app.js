$(document).ready(function() {
    // Initialize Firebase
    // Your web app's Firebase configuration
    var firebaseConfig = { //db for production
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

    let item = "hats";
    let zip = "33172";
    let radius = 10000;
    let storeNum = 5;
    let storeName = "";
    let storeAdd = "";
    let storeDist = "";
    let storePhone = "";
    let submitcount = 0;

    //clear database upon get started click

    M.AutoInit(); //moved over from index.html
    $(".modal").modal();

    //display base map. 
    L.mapquest.key = 'lYrP4vF3Uk5zgTiGGuEzQGwGIVDGuy24';

    let map = L.mapquest.map('map', {
        center: [25.74, -80.29],
        layers: L.mapquest.tileLayer('map'),
        zoom: 11
    });



    $("#download-button").on("click", function(event) {
        database.ref("/search").remove(); //remove previous search from realtime db
    });

    // Capture Button Click to search for items
    $("#submitButton").on("click", function(event) {
        // Don't refresh the page!
        event.preventDefault();
        $('.modal').modal("close"); //moved over from index.html
        item = $("#searchItem").val().trim();
        zip = $("#zipCode").val().trim();
        radius = Math.round(($("#radius").val().trim() * 1609.34));
        storeNum = $("#storeNum").val().trim();
        console.log(item);
        console.log(zip);
        console.log(radius);
        console.log(storeNum);

        submitcount++

        console.log(item);
        console.log(zip);
        console.log(radius);
        console.log(storeNum);

        // if check deletes previous tables if user does more than one search.
        if (submitcount >= 1) {
            $("#zipCode").val("");
            $("#searchItem").val("");
            $(".tables").empty();
            $(".text-marker").empty();

        }

        //prepare api key and query url for ajax call

        let apikey = "q1OFvftbUw9yLkYlGeg8md7bDcT0Z35v9n_DP_qQFjUzHcLHKJ87k3b7MWe35-4NNrGQ_gPOQm9WBXuTl785tf8a55k3sRNL_ItoMCZu1jkyXLWNs0OI_NydhyK6XXYx";
        let queryurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=" + item + "&location=" + zip + "&radius=" + radius + "&limit=" + storeNum;

        // ajax call to yelp fusion api
        $.ajax({
            url: queryurl,
            headers: {
                "Authorization": "Bearer " + apikey,
            },
            method: 'GET',
            dataType: 'json'
        }).then(function(response) {
            console.log("Ajax response object=" + response);
            let base = response.businesses;
            console.log("base object =" + base);
            console.log("stringified base object =" + JSON.stringify(base));
            //write to the firebase realtime db
            for (let i = 0; i < base.length; i++) {
                storeName = base[i].name;
                lat = base[i].coordinates.latitude;
                long = base[i].coordinates.longitude;
                storeAdd = base[i].location.display_address;
                storePhone = base[i].display_phone;
                storeDist = base[i].distance;
                database.ref("/search").push({ //try with /search
                    item: item,
                    zip: zip,
                    radius: radius,
                    storeNum: storeNum,
                    storeName: storeName,
                    storeAdd: storeAdd,
                    storeDist: storeDist,
                    lat: lat,
                    long: long,
                    storePhone: storePhone,
                    dateAdded: firebase.database.ServerValue.TIMESTAMP

                });


            };
        });
    });
    // retrieve stores from database and create rows and display in table
    database.ref("/search").on("child_added", function(childSnapshot) { //try with /search
        console.log("db call for table=" + childSnapshot.val());
        let newStore = $("<tr class='tables'>").append(
            $("<td>").text(item),
            $("<td>").text(childSnapshot.val().storeName),
            $("<td>").text(childSnapshot.val().storeAdd),
            $("<td>").text(Math.round((childSnapshot.val().storeDist) / 1609.344)),
            $("<td>").text(childSnapshot.val().storePhone)
        );

        $("#table").append(newStore);

        //plot store locations on map

        L.mapquest.textMarker([childSnapshot.val().lat, childSnapshot.val().long], {
            text: childSnapshot.val().storeName,
            subtext: childSnapshot.val().storeAdd,
            draggable: false,
            position: 'right',
            type: 'marker',
            icon: {
                primaryColor: '#333333',
                secondaryColor: '#333333',
                size: 'sm'
            }
        }).addTo(map);

    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });

    // });//move to above table for testing

});