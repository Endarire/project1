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
        q: searchString[2],
        part: 'snippet'
    }, { maxResults: 20, pageToken: $("#pageToken").val() }),
    dataType: 'json',
    type: 'GET',
    timeout: 5000,
    url: 'https://www.googleapis.com/youtube/v3/search'
})
    .done(function (data) {
        console.log(data);
        console.log(data.items[0].id.videoId);
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
