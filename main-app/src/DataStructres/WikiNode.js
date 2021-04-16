class WikiNode {
    constructor(title, url, id) {
        this.title = title;
        this.url = url;
        this.id = id;
        this.children = new Array();
    }

    addChild(node, numShared) {
        this.children.push({node: node, numShared: numShared});
    }

    removeChild(node) {
        for (var i = 0; i < this.children.length; i++)
            if (this.children[i] == node)
                delete this.children[i];
    }

    getNodes() {
        var output = [];

        // Get this node
        var thisNode = {};
        thisNode['id'] = this.id;
        thisNode['label'] = this.title;
        thisNode['title'] = this.url;
        output.push(thisNode);

        // Get all other nodes
        for (var i = 0; i < this.children.length; i++)
        {
            let node = this.children[i].node;
            let childNodes = node.getNodes();
            for (var j = 0; j < childNodes.length; j++)
                output.push(childNodes[j]);
        }
        return output;
    }

    getEdges() {
        var output = [];
        for (var i = 0; i < this.children.length; i++)
        { 
            var n = {};
            n['from'] = this.id;
            n['to'] = this.children[i].node.id;
            output.push(n);
            var childEdges = this.children[i].node.getEdges();
            for (var j = 0; j < childEdges.length; j++)
            {
                output.push(childEdges[j]);
            }
        }
        return output;
    }

};

export default WikiNode;