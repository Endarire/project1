$(document).ready(function(){
    $('.sidenav').sidenav(); /* Mobile Navbar function */
    $(".dropdown-trigger").dropdown(); /* Navbar Dropdown Function */
});




// var searchTerm = "";
// var queryURL = "https://api.pandascore.co/some-url?token=iIL2VGDwuu3SQfGMmhMxzGz7XKHFeqqkze5tdQromM2a5VC_f04";

// $.ajax({
//     url: queryURL,
//     method: "GET"
//   }).then(function(response) {
//     console.log(response);
//   });

var queryURL = "https://liquipedia.net/leagueoflegends/api.php?action=query&prop=revisions&rvprop=content&format=jsonfm&formatversion=2&titles=Main%20Page"


$.ajax({
    url: queryURL,
    data: {
        format: 'json'
    },
    dataType: 'jsonp'
}).done( function ( data ) {
    console.log(data);
} );