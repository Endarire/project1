var queryURL = "https://liquipedia.net/leagueoflegends/api.php?action=query&prop=revisions&rvprop=content&format=jsonfm&formatversion=2&titles=Main%20Page"


$.ajax({
    url: 'https://liquipedia.net/overwatch/api.php?format=jsonty&action=query&meta=siteinfo',
    data: {
        format: 'json'
    },
    dataType: 'jsonp'
}).done( function ( data ) {
    console.log(data);
} );