$.ajax({
    cache: false,
    data: $.extend({
        key: 'API_KEY',
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
});