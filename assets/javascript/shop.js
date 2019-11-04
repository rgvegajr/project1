
let searc= ""
let location1 = ""
let apikey = "q1OFvftbUw9yLkYlGeg8md7bDcT0Z35v9n_DP_qQFjUzHcLHKJ87k3b7MWe35-4NNrGQ_gPOQm9WBXuTl785tf8a55k3sRNL_ItoMCZu1jkyXLWNs0OI_NydhyK6XXYx"
let queryurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term="+ search + "&location=" + location;

// $(document).ready(function(){
//     $(‘.modal’).modal();
//     });

let myurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=shoes&location=33157";

$.ajax({
    url: queryurl,
    headers: {
    "Authorization": "Bearer " + apikey,
},
    method: 'GET',
    dataType: 'json',
    success: function(response){
        console.log(response);
    }
});      


window.onload = function() {
    L.mapquest.key = 'lYrP4vF3Uk5zgTiGGuEzQGwGIVDGuy24';

    var map = L.mapquest.map('map', {
        center: [25.74, -80.29],
        layers: L.mapquest.tileLayer('map'),
        zoom: 12
        });

    map.addControl(L.mapquest.control());

    L.marker([25.733721,-80.257201], {
        icon: L.mapquest.icons.marker(),
        draggable: false
    }).bindPopup('Marker').addTo(map);
}


