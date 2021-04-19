import getCategories from './GetCategories';
import getLinks from './GetLinks';
import getUrl from './GetUrl';
import WikiNode from '../DataStructres/WikiNode';

async function findPath(start, end) {
    let root = new WikiNode(start, getUrl(start), start);
    root.path = [start];
    var searched = {};
    var searchQueue = [];
    searchQueue.push(root);

    // INITIAL CHILDREN
    let currentRoot = searchQueue.shift();
    let links = await getLinks(currentRoot.title);
    // get current path
    for (var i = 0; i < links.length; i++)
        currentRoot.addChildWithPath(new WikiNode(links[i], getUrl(links[i]), links[i][1]), currentRoot.path);

    for (var i = 0; i < currentRoot.children.length; i++)
    {
        let child = currentRoot.children[i];
        if (child.node && !searched[child.node.title])
        searchQueue.push(child.node);
    }
    // INITIAL CHILDREN

    while (searchQueue.length > 0)
    {
      let currentRoot = searchQueue.shift();

      if (end == currentRoot.title)
        return currentRoot.path;
      else
      {
        searched[currentRoot] = true;
        console.log("SEARCHED", currentRoot.path, currentRoot.path.length, searchQueue.length);
        // GET CHILDREN
        if (searchQueue.length > 10000) {
            getLinks(currentRoot.title).then((links) => {
                // get current path
                for (var i = 0; i < links.length; i++) {
                    let tempNode = new WikiNode(links[i], getUrl(links[i]), links[i]);
                    currentRoot.addChildWithPath(tempNode, currentRoot.path);
                }
    
                for (var i = 0; i < currentRoot.children.length; i++)
                {
                    let child = currentRoot.children[i];
                    if (child.node && !searched[child.node.title])
                    searchQueue.push(child.node);
                }
            });
        } else {
            let links = await getLinks(currentRoot.title);
            // get current path
            for (var i = 0; i < links.length; i++) {
                let tempNode = new WikiNode(links[i], getUrl(links[i]), links[i]);
                currentRoot.addChildWithPath(tempNode, currentRoot.path);
            }

            for (var i = 0; i < currentRoot.children.length; i++)
            {
                let child = currentRoot.children[i];
                if (child.node && !searched[child.node.title])
                searchQueue.push(child.node);
            }
        }
         
        // GET CHILDREN

      }
    }
}

export default findPath;