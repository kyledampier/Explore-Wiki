import React from "react";
import ReactDOM from "react-dom";
import WikiNode from "../DataStructres/WikiNode";
import Grid from '@material-ui/core/Grid';
import getLinks from "../WikiAPI/GetLinks";
import getUrl from "../WikiAPI/GetUrl";
import getCategories from "../WikiAPI/GetCategories";
import getSearchResults from "../WikiAPI/GetSearchResults";
import Iframe from 'react-iframe'
import Graph from "react-graph-vis";

// import "./styles.css";
// need to import the vis network css in order to show tooltip
// import "./network.css";

getUrl("Albert Einstein");

// getCategories("Albert Einstein").then((response) => {
//   console.log(response);
// })

// getSearchResults("Python").then((response) => {
//   console.log(response);
// })


function WikiGraph() {
  var root = new WikiNode("JavaScript", "https://en.m.wikipedia.org/wiki/JavaScript", 0);
  let n1 = new WikiNode("Programmng Languages", "https://en.m.wikipedia.org/wiki/Programming_language", 1);
  root.addChild(n1);
  let n2 = new WikiNode("Python", "https://en.m.wikipedia.org/wiki/Python_(programming_language)", 2);
  root.addChild(n2);
  let n3 = new WikiNode("HTTP", "https://en.m.wikipedia.org/wiki/Hypertext_Transfer_Protocol", 3); 
  root.addChild(n3);
  let n4 = new WikiNode("CSS", "https://en.m.wikipedia.org/wiki/CSS", 4);
  n3.addChild(n4);
  let n5 = new WikiNode("HTML", "https://en.m.wikipedia.org/wiki/HTML", 5);
  n3.addChild(n5);

  const [selectedUrl, setSelectedUrl] = React.useState(root.url);
  const [graph, setGraph] = React.useState({nodes: root.getNodes(), edges: root.getEdges() });

  // React.useEffect(() => {
  //   console.log("USE EFFECT CALLED");
  //   const graph_ = {
  //     nodes: root.getNodes(),
  //     edges: root.getEdges(),
  //   };
  //   setGraph(graph_);
  // });


  const options = {
    // layout: {
    //   hierarchical: true
    // },
    edges: {
      color: "#000000"
    },
    height: "500px"
  };

  const events = {
    select: function(event) {
      var { nodes, edges } = event;
      console.log(nodes);

      var searched = [];
      var searchQueue = [];
      searchQueue.push(root);

      while (searchQueue.length > 0)
      {
        let currentRoot = searchQueue.shift();

        if (nodes[0] == currentRoot.id)
          setSelectedUrl(currentRoot.url);
        else
        {
          searched[currentRoot.id] = true;
          for (var i = 0; i < currentRoot.children.length; i++)
          {
            if (!searched[currentRoot.children[i].id])
              searchQueue.push(currentRoot.children[i]);
          }
        }
      }
    }
  };

  return (
    <Grid container direction="row">
      <Grid item md={12} lg={7}>
        <Graph
        graph={graph}
        options={options}
        events={events}
        getNetwork={network => {
          //  if you want access to vis.js network api you can set the state in a parent component using this property
        }}
        height="100%"
        />
      </Grid>
      <Grid item md={12} lg={5}>
        <Iframe 
          url={selectedUrl}
          position="relative"
          display="block"
          width="100%"
          height="100%"
          id="wikiFrame"
          frameBorder={1}/>
      </Grid>
    </Grid>

  );
}

export default WikiGraph;