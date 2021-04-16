async function getCategories(title) {
    var url = "https://en.wikipedia.org/w/api.php"; 

    var params = {
        action: "query",
        format: "json",
        titles: title,
        prop: "categories",
        cllimit: 1000
    };

    url = url + "?origin=*";
    Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

    var array = [];
    let response0 = await fetch(url);
    let response = await response0.json();
    console.log(response);
    var pages = response.query.pages;
    for (var p in pages) {
        for (var cat of pages[p].categories) {
            console.log(cat.title);
            array.push(cat.title);
        }
    }
    return array;
}

export default getCategories;