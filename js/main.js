$(document).ready(function () {



});



$.getJSON("data/data.json", function (response) {
    setData(response);
});

// Google Map

function setData(data) {
    var result = data;
    console.log(result);

    var mapOptions = {
        zoom: 4,
        center: new google.maps.LatLng(37.6, -95.665)
    };

    var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    var marker, contentString;

    // Array of markers
    var markers = [];
    // Array of infowindows
    var infos = [];

    $("#list").append("<div id='names' class='list-group'>");

    for (var i = 0; i < result.artists.length; i++) {

        // Creating the markers
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(result.artists[i].lat, result.artists[i].long),
            map: map,
            title: result.artists[i].artist
        });


        // Generating list of artists
        var names = $("#names").append("<a href='#' class='names list-group-item' id=" + i + ">" + result.artists[i].artist + "</a>");

        // Replacing empty subgenre with 'None'
        var sub = result.artists[i].subgenre;
        if (sub === '') {
            sub = 'None';
        }

        // Content for infowindow
        contentString = '<div class="info">' +
            '<h1>' + result.artists[i].artist + '</h1>' +
            '<div >' +
            '<ul>' +
            '<li><b>Subgenre: </b>' + sub + '</li>' +
            '<li><b>Region: </b>' + result.artists[i].region + '</li>' +
            '<li><b>Origin: </b>' + result.artists[i].origin + '</li>' +
            '<li><b>Entered the game in: </b>' + result.artists[i].active + '</li>' +
            '</ul>' +
            '<p>Listen to ' + result.artists[i].artist + ' on <a href="http://open.spotify.com/artist/' + result.artists[i].spotify + '" target="_blank">Spotify</a></p>' +
            '</div>' +
            '</div>';



        // Creating the infowindow
        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        // Listen for marker click
        google.maps.event.addListener(marker, 'click', function (content) {
            return function () {
                infowindow.setContent(content); //set the content
                infowindow.open(map, this);
            };
        }(contentString));

        // Push info for windows and markers to their arrays
        infos.push(infowindow);
        markers.push(marker);


    } // End of for loop

    // Listen for click of artist name in the list
    $(".names").click(function () {
        $("a.names").removeClass("active");
        var id = $(this).attr('id');
        console.log('id is ' + id);
       
        infowindow.setContent(infos[id].content);
        infowindow.open(map, markers[id]);
        $(this).addClass("active");
    });


    google.maps.event.addListener(map, 'click', function () {
        infowindow.close();
    });


}
// End Google Map