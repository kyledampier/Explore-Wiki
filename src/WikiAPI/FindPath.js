import getCategories from './GetCategories';
import getLinks from './GetLinks';
import getUrl from './GetUrl';
import WikiNode from '../DataStructres/WikiNode';

async function findPath(start, end) {
    let root = new WikiNode(start, getUrl(start), start);
    var searched = {};
    var searchQueue = [];
    searchQueue.push(root);

    while (searchQueue.length > 0)
    {
      let currentRoot = searchQueue.shift();

      if (end == currentRoot.title)
        return currentRoot;
      else
      {
        searched[currentRoot.title] = true;
        console.log("SEARCHED", currentRoot);
        // GET CHILDREN
        let [requests, allNodes] = await currentRoot.getChildren();

        
        await Promise.allSettled(requests);
        allNodes.sort((a,b) => b[0] - a[0]);
        for (var i = 0; i < allNodes.length; i++)
            currentRoot.addChild(new WikiNode(allNodes[i][1], getUrl(allNodes[i][1]), allNodes[i][1]), allNodes[i][0]);
        for (var i = 0; i < currentRoot.children.length; i++)
        {
            let child = currentRoot.children[i];
            if (child.node && !searched[child.node.title])
            searchQueue.push(child.node);
        }
        // GET CHILDREN

      }
    }
}

export default findPath;