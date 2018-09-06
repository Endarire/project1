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
    }, {
            maxResults: 5
        }),
    dataType: 'json',
    type: 'GET',
    timeout: 5000,
    url: 'https://www.googleapis.com/youtube/v3/search'

}).done(function (data) {
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
    $("#connected-viewers").text("Online: " + snap.numChildren());
});

//--------------------------------------------------------------------------------------------------

database.ref("/commentsD2").on("value", function (snapshot) {
    $("#comments-display").empty();

    for (var i = 0; i < 5; i++) {
        var x = $("<div>");
        $(x).text(snapshot.val().users[i] + ": " + snapshot.val().com[i]);
        $("#comments-display").append(x);
    }

    // If any errors are experienced, log them to console.
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

$("#submit-comment").on("click", function () {
    event.preventDefault();

    var userName = $("#user-name").val().trim();
    var userComment = $("#user-comment").val().trim();

    if (userName === "" || userComment === "") {
        return;
    } else {
        var commentList = [];
        var userList = [];

        database.ref("/commentsD2/com").on('value', function (snap) { commentList = snap.val(); });
        database.ref("/commentsD2/users").on('value', function (snap) { userList = snap.val(); });

        commentList.splice(0, 1);
        userList.splice(0, 1);

        commentList.push(userComment);
        userList.push(userName);

        database.ref("/commentsD2/com").set(commentList);
        database.ref("/commentsD2/users").set(userList);

        $("#user-comment").val("");

    }
});