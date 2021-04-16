function getUrl(title) {
    let urlTitle = title.replace(" ", "_");
    let url = "http://en.m.wikipedia.org/wiki/"+urlTitle;
    return url;
}

export default getUrl;