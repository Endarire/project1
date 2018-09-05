var vidIdNum;
var searchString = [
    'overwatch world cup 2017 final',
    'league of legends na lcs 2017 finals',
    'dota 2 2018 international grand final'
]

$.ajax({
    cache: false,
    data: $.extend({
        key: 'AIzaSyB-v9METQVhHGLIMj_NF_lNJBizORFDG1s',
        q: searchString[x],
        part: 'snippet'
    }, { maxResults: 20, pageToken: $("#pageToken").val() }),
    dataType: 'json',
    type: 'GET',
    timeout: 5000,
    url: 'https://www.googleapis.com/youtube/v3/search'
})
    .done(function (data) {
        vidIdNum = data.items[0].id.videoId;

        // Load the IFrame Player API code asynchronously.
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/player_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    });

var player;
function onYouTubePlayerAPIReady() {
    player = new YT.Player('ytplayer', {
        height: '360',
        width: '640',
        videoId: vidIdNum
    });
}

//------------------------------------------------------------------------------------------------
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBBKW14J04JIcp5ccJH7V2ev-O8S3B-8PE",
    authDomain: "yess-dbbea.firebaseapp.com",
    databaseURL: "https://yess-dbbea.firebaseio.com",
    projectId: "yess-dbbea",
    storageBucket: "yess-dbbea.appspot.com",
    messagingSenderId: "117320373877"
};
firebase.initializeApp(config);

var database = firebase.database();

//--------------------------------------------------------------------------------------------------

var connectionsRef = database.ref("/connections");

// '.info/connected' is a special location provided by Firebase that is updated
// every time the client's connection state changes.
// '.info/connected' is a boolean value, true if the client is connected and false if they are not.
var connectedRef = database.ref(".info/connected");

// When the client's connection state changes...
connectedRef.on("value", function (snap) {

    // If they are connected..
    if (snap.val()) {

        // Add user to the connections list.
        var con = connectionsRef.push(true);
        // Remove user from the connection list when they disconnect.
        con.onDisconnect().remove();
    }
});

// When first loaded or when the connections list changes...
connectionsRef.on("value", function (snap) {

    // Display the viewer count in the html.
    // The number of online users is the number of children in the connections list.
    $("#connected-viewers").text("Viewers: " + snap.numChildren());
});

//--------------------------------------------------------------------------------------------------

database.ref("/comments").on("value", function (snapshot) {

    for (var i = 0; i < 5; i++) {
        var x = $("<div>");
        $(x).text(snapshot.val().users[i] + ": " + snapshot.val().com[i]);
        $("#comments-display").append(x);
    }

    // // If Firebase has a highPrice and highBidder stored (first case)
    // if (snapshot.child("omments").exists() && snapshot.child("highPrice").exists()) {

    //     // Set the local variables for highBidder equal to the stored values in firebase.
    //     highBidder = snapshot.val().highBidder;
    //     highPrice = parseInt(snapshot.val().highPrice);

    //     // change the HTML to reflect the newly updated local values (most recent information from firebase)
    //     $("#highest-bidder").text(snapshot.val().highBidder);
    //     $("#highest-price").text("$" + snapshot.val().highPrice);
    // }

    // // Else Firebase doesn't have a highPrice/highBidder, so use the initial local values.
    // else {

    //     // Change the HTML to reflect the local value in firebase
    //     $("#highest-bidder").text(highBidder);
    //     $("#highest-price").text("$" + highPrice);

    //     // Print the local data to the console.
    //     console.log("local High Price");
    //     console.log(highBidder);
    //     console.log(highPrice);
    // }

    // If any errors are experienced, log them to console.
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});