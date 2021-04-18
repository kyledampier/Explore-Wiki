import React from "react";
import ReactDOM from "react-dom";
import WikiNode from "../DataStructres/WikiNode";
import Grid from '@material-ui/core/Grid';
import getLinks from "../WikiAPI/GetLinks";
import getUrl from "../WikiAPI/GetUrl";
import getCategories from "../WikiAPI/GetCategories";
import getSearchResults from "../WikiAPI/GetSearchResults";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Iframe from 'react-iframe';
import Graph from "react-graph-vis";
import { Button } from "@material-ui/core";

function WikiGraph() {
  var root = new WikiNode("JavaScript", "https://en.m.wikipedia.org/wiki/JavaScript", 69);
  
  const [selectedUrl, setSelectedUrl] = React.useState(root.url);
  const [graph, setGraph] = React.useState({ nodes: [], edges: [] });
  const [searchTerm, setSearchTerm] = React.useState('');
  const [availableTerms, setSearchTerms] = React.useState([]);
  const [selectedRootTerm, setSelectedRootTerm] = React.useState(null);

  async function newSearchTermFound(event) {
    let title = selectedRootTerm.target.defaultValue;
    let root = new WikiNode(title, getUrl(title), title);
    let requests = await root.getChildren();
    Promise.allSettled(requests)
      .then((resp) => {
        console.log(root.getNodes());
        setGraph({
          nodes: root.getNodes(), 
          edges: root.getEdges() 
        });
      })
      .catch((e) => { console.error(e); });
  };


  const options = {
    // layout: {
    //   hierarchical: true
    // },
    edges: {
      color: "#000000"
    },
    height: "700px"
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
          for (var i = 0; i < Object.keys(currentRoot.children).length; i++)
          {
            if (!searched[currentRoot.children[i].node.id])
              searchQueue.push(currentRoot.children[i].node);
          }
        }
      }
    }
  };

  return (
    <div>
    <Autocomplete
      id="search-box"
      options={availableTerms}
      getOptionLabel={(option) => option.title}
      style={{ width: 500, marginLeft: "1rem", marginBottom: "1rem", marginTop: "1rem" }}
      autoHighlight
      onSelect={setSelectedRootTerm}
      renderInput={(params) => 
        <div>
        <TextField {...params} 
          label="Search" 
          variant="outlined"
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);
            try {
              getSearchResults(event.target.value).then((response) => {
                setSearchTerms(response);
              })
            } catch (e) {
              console.error(e);
            }
          }} />
        <Button 
        onClick={newSearchTermFound}
        variant="outlined"
        > 
        Search
        </Button>
        </div>
      }
    />



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
  </div>
  );
}

export default WikiGraph;
