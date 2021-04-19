async function getSearchResults(title) {
    var url = "https://en.wikipedia.org/w/api.php"; 

    var params = {
        action: "query",
        format: "json",
        srsearch: title,
        list: "search",
        srlimit: 20
    };

    url = url + "?origin=*";
    Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

    var array = [];
    let response0 = await fetch(url);
    let response = await response0.json();
    // console.log(response);
    if (response.query) {
        for (var i = 0; i < response.query.search.length; i++) {
            array.push(response.query.search[i]);
            // console.log(response.query.search[i]);
        }
    }


    return array;
}

export default getSearchResults;