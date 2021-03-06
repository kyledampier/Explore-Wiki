async function getLinks(title, limit=500) {
    var url = "https://en.wikipedia.org/w/api.php"; 

    var params = {
        action: "query",
        format: "json",
        titles: title,
        prop: "links",
        pllimit: limit
    };

    url = url + "?origin=*";
    Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

    var array = [];
    let response0 = await fetch(url);
    let response = await response0.json();
    try {
        if (response.query){
            var pages = response.query.pages;
            // console.log(pages);
            for (var p in pages) {
                for (var l of pages[p].links) {
                    // console.log(l.title);
                    array.push(l.title);
                }
            }
        }
    } catch (e) {
        console.log("ERROR", e);
    }

    return array;
}

export default getLinks;
