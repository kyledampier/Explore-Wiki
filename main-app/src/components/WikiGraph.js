import React from "react";
import ReactDOM from "react-dom";
import WikiNode from "../DataStructres/WikiNode";
import Graph from "react-graph-vis";

// import "./styles.css";
// need to import the vis network css in order to show tooltip
// import "./network.css";

function WikiGraph() {
  var root = new WikiNode("JavaScript", "", 0);
  let n1 = new WikiNode("Programmng Languages", "", 1);
  root.addChild(n1);
  let n2 = new WikiNode("Python", "", 2);
  root.addChild(n2);
  let n3 = new WikiNode("HTTP", "", 3); 
  root.addChild(n3);
  let n4 = new WikiNode("CSS", "", 4);
  n3.addChild(n4);
  let n5 = new WikiNode("HTML", "", 5);
  n3.addChild(n5);

  const graph = {
    nodes: root.getNodes(),
    edges: root.getEdges(),
  };

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
    }
  };
  return (
    <Graph
      graph={graph}
      options={options}
      events={events}
      getNetwork={network => {
        //  if you want access to vis.js network api you can set the state in a parent component using this property
      }}
    />
  );
}

export default WikiGraph;