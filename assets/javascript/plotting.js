
let search= "shoes"
let location1 = "33157"
let apikey = "q1OFvftbUw9yLkYlGeg8md7bDcT0Z35v9n_DP_qQFjUzHcLHKJ87k3b7MWe35-4NNrGQ_gPOQm9WBXuTl785tf8a55k3sRNL_ItoMCZu1jkyXLWNs0OI_NydhyK6XXYx"
let queryurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term="+ search + "&location=" + location1;
let lat = []
let long = []
let names = []
let address = []
let phone_number = []
let distance = []
let rounded = []


$.ajax({
    url: queryurl,
    headers: {
    "Authorization": "Bearer " + apikey,
},
    method: 'GET',
    dataType: 'json',
    success: function(response){

        console.log(response)

        let base = response.businesses

        // console.log(base)

        for (let i = 0; i < base.length; i++) {
            lat.push(base[i].coordinates.latitude)
            long.push(base[i].coordinates.longitude)
            names.push(base[i].name)
            address.push(base[i].location.display_address)
            phone_number.push(base[i].display_phone)
            distance.push(base[i].distance)
            }

        for (let i = 0; i < distance.length; i++) {
            rounded.push(Math.round(distance[i]) + " Meters")
            }

        L.mapquest.key = 'lYrP4vF3Uk5zgTiGGuEzQGwGIVDGuy24';

        let map = L.mapquest.map('map', {
            center: [25.74, -80.29],
            layers: L.mapquest.tileLayer('map'),
            zoom: 12
            });

        for (let i = 0; i < lat.length; i++) {
            L.mapquest.textMarker([lat[i], long[i]], {
            text: names[i],
            subtext: address[i],
            draggable: false,
            position: 'right',
            type: 'marker',
            icon: {
            primaryColor: '#333333',
            secondaryColor: '#333333',
            size: 'sm'
                }
            }).addTo(map);     
            }

    }

});      








// Old marker code
// map.addControl(L.mapquest.control());
// L.marker([lat[i], long[i]], {
// icon: L.mapquest.icons.marker(),
// draggable: false,
// }).bindPopup('Marker').addTo(map);
