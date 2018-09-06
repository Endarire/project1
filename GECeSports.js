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

//SEARCH FIRST FOR OVERWATCH DETAILS
let searchTerm = "";

let queryURL = "https://api.pandascore.co/" + + "?token=iIL2VGDwuu3SQfGMmhMxzGz7XKHFeqqkze5tdQromM2a5VC_f04";


$.ajax({
    url: queryURL,
    data: {
        format: 'json'
    },
    dataType: 'jsonp'
}).done( function ( data ) {
    console.log(data);
} );