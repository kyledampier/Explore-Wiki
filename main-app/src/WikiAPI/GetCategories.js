async function getCategories(title) {
    var url = "https://en.wikipedia.org/w/api.php"; 

    var params = {
        action: "query",
        format: "json",
        titles: title,
        prop: "categories",
        cllimit: 500
    };

    url = url + "?origin=*";
    Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

    var array = [];
    let response0 = await fetch(url, {
        // mode: "no-cors",
        // headers: {
        // "Access-Control-Alow-Origin": "*",
        // "Content-Type": "application/json"
        // }
    });
    let response = await response0.json();
    try {
        if (response.query && response.query.pages) {
            var pages = response.query.pages;
            for (var p in pages) {
                for (var cat of pages[p].categories) {
                    array.push(cat.title);
                }
            }
        }
    } catch (e) {
        console.log("ERROR");
    }

    return array;
}

export default getCategories;