$(document).ready(function() {
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
    let storeName = "";
    let storeAdd = "";
    let storeDist = "";
    let storePhone = "";

    // Capture Button Click to search for items
    $("#submitButton").on("click", function(event) {
        // Don't refresh the page!
        event.preventDefault();
        item = $("#searchItem").val().trim();
        zip = $("#zipCode").val().trim();
        // radius = $("#radius-input").val().trim();
        // storeNum = $("#storeNum-input").val().trim();
        console.log(item);
        console.log(zip);
        console.log(radius);
        console.log(storeNum);



        let apikey = "q1OFvftbUw9yLkYlGeg8md7bDcT0Z35v9n_DP_qQFjUzHcLHKJ87k3b7MWe35-4NNrGQ_gPOQm9WBXuTl785tf8a55k3sRNL_ItoMCZu1jkyXLWNs0OI_NydhyK6XXYx";
        let queryurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=" + item + "&location=" + zip + "&radius=" + radius + "&limit=" + storeNum;
        // let lat = [];
        // let long = [];
        // let names = [];
        // let address = [];
        // let phone_number = [];
        // let distance = [];

        $.ajax({
            url: queryurl,
            headers: {
                "Authorization": "Bearer " + apikey,
            },
            method: 'GET',
            dataType: 'json'
        }).then(function(response) {
            console.log(response)
            let base = response.businesses
            console.log(base)

            for (let i = 0; i < base.length; i++) {
                // lat.push(base[i].coordinates.latitude);
                // long.push(base[i].coordinates.longitude);
                // names.push(base[i].name);
                // address.push(base[i].location.display_address);
                // phone_number.push(base[i].display_phone);
                // distance.push(base[i].distance + " Meters");
                storeName = base[i].name;
                lat = base[i].coordinates.latitude;
                long = base[i].coordinates.longitude;
                storeAdd = base[i].location.display_address;
                storePhone = base[i].display_phone;
                storeDist = base[i].distance;
                database.ref().push({
                    item: item,
                    zip: zip,
                    radius: radius,
                    storeNum: storeNum,
                    storeName: storeName,
                    storeAdd: storeAdd,
                    storeDist: storeDist,
                    storePhone: storePhone,
                    dateAdded: firebase.database.ServerValue.TIMESTAMP

                });


                // database.ref().push({ base: base });

                // for (let i = 0; i < storeNum; i++) {
                //     const storeName = results[i].name;
                //     const storeAdd = results[i].location.display_address;
                //     const storeDist = results[i].distance;
                //     const storePhone = results[i].phone;
                //     database.ref().push({
                //         item: item,
                //         zip: zip,
                //         radius: raidus,
                //         storeNum: storeNum,
                //         storeName: storeName,
                //         storeAdd: storeAdd,
                //         storeDist: storeDist,
                //         storePhone: storePhone,
                //         dateAdded: firebase.database.ServerValue.TIMESTAMP
                //     });
                // };
            };
        });



        $("#table").empty();
        database.ref().on("child_added", function(childSnapshot) {
            console.log("db call for table=" + childSnapshot.val());
            let newStore = $("<tr>").append(
                $("<td>").text(item),
                $("<td>").text(childSnapshot.val().storeName),
                $("<td>").text(childSnapshot.val().storeAdd),
                $("<td>").text(Math.round((childSnapshot.val().storeDist) / 1609.344)),
                $("<td>").text(childSnapshot.val().storePhone),
                $("<td>").text("Show on map"),
                $("<td>").text("Favorite")

            );
            $("#table").append(newStore);
        }, function(errorObject) {
            console.log("Errors handled: " + errorObject.code);
        });

    });

});