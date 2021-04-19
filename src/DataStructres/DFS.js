
import WikiNode from './WikiNode';

export default function DFS(root, targetId) {
    var searched = {};
    var searchQueue = [];
    searchQueue.push(root);

    while (searchQueue.length > 0)
    {
      let currentRoot = searchQueue.shift();

      if (targetId == currentRoot.id)
        return currentRoot;
      else
      {
        searched[currentRoot.id] = true;
        console.log(currentRoot.children);
        for (var i = 0; i < currentRoot.children.length; i++)
        {
          let child = currentRoot.children[i];
          if (child.node && !searched[child.node.id])
            searchQueue.push(child.node);
        }
      }
    }
    return null;
};