// $(document).ready(function(){
//     $('.sidenav').sidenav(); /* Mobile Navbar function */
//     $(".dropdown-trigger").dropdown(); /* Navbar Dropdown Function */
// });

// var queryURL = "https://liquipedia.net/leagueoflegends/api.php?action=query&prop=revisions&rvprop=content&format=jsonfm&formatversion=2&titles=Main%20Page"

$.ajax({
    cache: false,
    data: $.extend({
        key: 'AIzaSyB-v9METQVhHGLIMj_NF_lNJBizORFDG1s',
        q: 'overwatch world cup 2017 final',
        part: 'snippet'
    }, {maxResults:20,pageToken:$("#pageToken").val()}),
    dataType: 'json',
    type: 'GET',
    timeout: 5000,
    url: 'https://www.googleapis.com/youtube/v3/search'
})
.done(function(data) {
    console.log(data);
    console.log(data.items[0].id.videoId);
});

// $.ajax({
//     url: 'https://liquipedia.net/overwatch/api.php?format=jsonty&action=query&meta=siteinfo',
//     data: {
//         format: 'json'
//     },
//     dataType: 'jsonp'
// }).done( function ( data ) {
//     console.log(data);
// } );
