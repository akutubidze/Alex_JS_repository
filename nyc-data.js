let nycMap;
nycMap = L.map("map");


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(nycMap);

nycMap.setView([40.7128, -74.0060], 16);

L.geoJSON(nyc, {
    style: function (feature) {
        return {
            color: "blue",
            fillColor: "yellow",
            fillOpacity: 0.5
        };
    },

    onEachFeature: function (feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.borough + "</h3> <hr> <h3>" + feature.properties.neighborhood + "</h3>");
    }
}).addTo(nycMap);

$("#pan-to-flatbush").click(function () {

    let flatbush = nyc.features.find(function (feature) {
        return feature.properties.neighborhood === "Flatbush";
    });
    console.log(flatbush);


    let coordinates = nyc.features.find(function (feature) {
        return feature.properties.neighborhood === "Flatbush";
    }).geometry.coordinates;
    console.log(coordinates);
    nycMap.panTo(new L.LatLng(coordinates[0][0][1], coordinates[0][0][0]));
});


let neighborhoods = nyc.features.map(function (feature) {
    return feature.properties.neighborhood;
}).filter(function (neighborhood) {
    return neighborhood !== "";
}).sort();
console.log(neighborhoods);


neighborhoods.forEach(function (neighborhood) {
    $("#neighborhoods").append("<a href ='#'><li>" + neighborhood + "</li></a>");

    if (neighborhoods.indexOf(neighborhood) % 4 === 0) {
        $("#neighborhoods").append("<br>");
    }
});


$("#neighborhoods").on("click", "li", function () {
    let neighborhoodText = $(this).text();
    let coordinates = nyc.features.find(function (feature) {
        return feature.properties.neighborhood === neighborhoodText;
    }).geometry.coordinates;
    nycMap.panTo(new L.LatLng(coordinates[0][0][1], coordinates[0][0][0]));

    nycMap.setZoom(16);

    L.marker(new L.LatLng(coordinates[0][0][1], coordinates[0][0][0])).addTo(nycMap);

    L.marker(new L.LatLng(coordinates[0][0][1], coordinates[0][0][0])).bindPopup("<h3>" + neighborhoodText + "</h3>").addTo(nycMap);
});