import { useImperativeHandle } from 'react';
import getCategories from '../WikiAPI/GetCategories';
import getLinks from '../WikiAPI/GetLinks';
import getUrl from '../WikiAPI/GetUrl';
import uuid from 'react-uuid';
var currentValue = 0;

class WikiNode {
    constructor(title, url, id) {
      this.title = title;
      this.url = url;
      this.id = currentValue++;
      this.children = new Array();
      this.path = [title];
    }

    addChild(node, numShared) {
      this.children.push({
        node: node, 
        numShared: numShared
      });
    }

    addChildWithPath(node, path) {
      let temp = [...path];
      temp.push(node.title);
      this.path = temp;
      console.log(this.path);
      this.children.push({
        node: node, 
        numShared: 0
      });
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
      thisNode['title'] = this.title;
      output.push(thisNode);

      // Get all other nodes
      for (var i = 0; i < this.children.length; i++)
      {
        let node = this.children[i].node;
        let childNodes = node.getNodes();
        for (var j = 0; j < childNodes.length; j++) {
          childNodes[j]['group'] = this.title;
          output.push(childNodes[j]);
        }
      }

      var seen = new Set();
      const filteredArr = output.filter(el => {
        const duplicate = seen.has(el.id);
        seen.add(el.id);
        return !duplicate;
      });

      return filteredArr;
    }

    async getChildren() {
      let categories = await getCategories(this.title);
      let links = await getLinks(this.title);
      // [<number of shared categories>, <title>]
      var sortableArray = [];

      // map the list of titles into a list of promises
      let requests = links.map((_, i) => {
        return new Promise((resolve)  =>  {
          getCategories(links[i]).then((subcategories) => {
            var tempNumShared = 0;
            // if category from link is in root category increase the number shared
            for (var cat in subcategories) {
              if (cat in categories) {
                tempNumShared++;
              }
            }

            // add tuple to the output of the sortable array with 
            // the number of shared categories in 0 
            // and the title of the category
            var tempTuple = [tempNumShared, links[i]];
            sortableArray.push(tempTuple);

            resolve();
          }).catch((error) => { 
            console.log(error); 
            resolve(); 
          });
        });

      });

      // after mapping all the requests send the 
      // list of promises and sortable array
      return [requests, sortableArray];
    }

    getEdges() {
        var output = [];
        for (var i = 0; i < this.children.length; i++)
        { 
            var n = {};
            n['from'] = this.id;
            n['to'] = this.children[i].node.id;
            output.push(n);
            // recusively call all its children
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