async function getLinks(title) {
    var url = "https://en.wikipedia.org/w/api.php"; 

    var params = {
        action: "query",
        format: "json",
        titles: title,
        prop: "links",
        pllimit: 1000
    };

    url = url + "?origin=*";
    Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

    var array = [];
    let response0 = await fetch(url);
    let response = await response0.json();
    console.log(response);
    if (response.query){
        var pages = response.query.pages;
        for (var p in pages) {
            for (var l of pages[p].links) {
                console.log(l.title);
                array.push(l.title);
            }
        }
    }
    return array;
}

export default getLinks;
