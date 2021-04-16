async function getUrl(title) {

    let url = "https://en.m.wikipedia.org/w/api.php"

    let params = {
        action: "query",
        format: "json",
        titles: title,
        prop: "info",
        inprop: "url",
        pllimit: 1000
    };

    url = url + "?origin=*";
    Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

    let response = await fetch(url);
    let res = response.json();
    res.then((r) => {
        console.log(r.query.pages[736].fullurl);
        return r.query.pages[736].fullurl
    });
}

export default getUrl;