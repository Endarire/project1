var vidIdNum;
var searchString = 'league of legends na lcs 2017 finals'

$.ajax({
    cache: false,
    data: $.extend({
        key: 'AIzaSyB-v9METQVhHGLIMj_NF_lNJBizORFDG1s',
        q: searchString,
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

database.ref("/comments").on("value", function (snapshot) {
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

        database.ref("/comments/com").on('value', function (snap) { commentList = snap.val(); });
        database.ref("/comments/users").on('value', function (snap) { userList = snap.val(); });

        commentList.splice(0, 1);
        userList.splice(0, 1);

        commentList.push(userComment);
        userList.push(userName);

        database.ref("/comments/com").set(commentList);
        database.ref("/comments/users").set(userList);

        $("#user-comment").val("");

    }
});

$(document).ready(function () {
    $('.sidenav').sidenav(); /* Mobile Navbar function */
    $(".dropdown-trigger").dropdown(); /* Navbar Dropdown Function */
});

function displayLOLInfo() {
    var searchTerm = $(this).attr("LOL-search-term");
    let queryURL = "https://cors.io/?https://api.pandascore.co/" + "lol/tournaments" + ".json?token=45Y1oJ2gHMQDAL-KuPfNsuypkLd360qcCP7uDf0djuwGmcVByRw";

    $.ajax
        ({
            url: queryURL,
            method: "GET"
        })
        // After data comes back from the request
        .then(function (response) {
            console.log("QUERY URL: " + queryURL);
            console.log("STRING RESPONSE: ", response);
            response = JSON.parse(response); //Needed to make the data an object instead of a string!
            console.log("OBJECT RESPONSE: ", response);

            // storing the data from the AJAX request in the results variable
            var results = response.data; //Useful?
            //LOL Teams
            let SamsungGalaxy = {};
            let SKTelecom = {};
            //DOTA 2 Teams
            let OG = {};
            let PSGLGD = {};
            //Overwatch Teams
            let TeamCanada = {};
            let TeamSouthKorea = {};
            //console.log("SamsungGalaxyLogoURL: " + SamsungGalaxyLogoURL);

            //response[a].teams[b].image_url
            //SK Telecom 1 Image URL: https://cdn.pandascore.co/images/team/image/100/sktelecom-t1-3mpugoym.png
            for (let a = 0; a < response.length; a++) {
                console.log("response[a]: ", response[a]);
                //LOL Data
                if (response[a].teams !== null) //Check if the field exists!
                {
                    for (let b = 0; b < response[a].teams.length; b++) {
                        console.log("response[a].teams[b]", response[a].teams[b]);

                        //DOTA 2 Teams
                        if (response[a].teams[b].name.toUpperCase() === "OG".toUpperCase()) {
                            OG.name = response[a].teams[b].name;
                            OG.acronym = response[a].teams[b].acronym;
                            OG.image_url = response[a].teams[b].image_url;
                            console.log("OG: ", OG);
                        }
                        if (response[a].teams[b].name.toUpperCase() === "PSG.LGD".toUpperCase() || response[a].teams[b].name.toUpperCase() === "PSG LGD".toUpperCase()) {
                            PSGLGD.name = response[a].teams[b].name;
                            PSGLGD.acronym = response[a].teams[b].acronym;
                            PSGLGD.image_url = response[a].teams[b].image_url;
                            console.log("PSGLGD: ", PSGLGD);
                        }
                        //LOL Teams
                        if (response[a].teams[b].name.toUpperCase() === "Samsung Galaxy".toUpperCase()) {
                            SamsungGalaxy.name = response[a].teams[b].name;
                            SamsungGalaxy.acronym = response[a].teams[b].acronym;
                            SamsungGalaxy.image_url = response[a].teams[b].image_url;
                            console.log("SAMSUNG GALAXY: ", SamsungGalaxy);
                            $("#team1").text(SamsungGalaxy.name);
                            $("#team1").append("<div>" + SamsungGalaxy.acronym + "</div>");
                        }
                        if (response[a].teams[b].name.toUpperCase() === "SK telecom T1".toUpperCase()) {
                            SKTelecom.name = response[a].teams[b].name;
                            SKTelecom.acronym = response[a].teams[b].acronym;
                            SKTelecom.image_url = response[a].teams[b].image_url;
                            console.log("SK TELECOM T1: ", SKTelecom);
                            $("#team2").text(SKTelecom.name);
                            $("#team2").append("<div>" + SKTelecom.acronym + "</div>");
                        }
                        //Overwatch Teams
                        if (response[a].teams[b].name.toUpperCase() === "South_Korea".toUpperCase() || response[a].teams[b].name.toUpperCase() === "South Korea".toUpperCase()) {
                            TeamSouthKorea.name = response[a].teams[b].name;
                            TeamSouthKorea.acronym = response[a].teams[b].acronym;
                            TeamSouthKorea.image_url = response[a].teams[b].image_url;
                            console.log("Team South Korea: ", TeamSouthKorea);
                            $("#team1").text(TeamSouthKorea);
                        }
                        if (response[a].teams[b].name.toUpperCase() === "Canada".toUpperCase()) {
                            TeamCanada.name = response[a].teams[b].name;
                            TeamCanada.acronym = response[a].teams[b].acronym;
                            TeamCanada.image_url = response[a].teams[b].image_url;
                            console.log("Team Canada: ", TeamCanada);
                            $("#team2").text(TeamCanada.name);
                        }
                    }
                }
            }
        });
    }

    displayLOLInfo();
