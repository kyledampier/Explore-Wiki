import React from "react";
import ReactDOM from "react-dom";
import WikiNode from "../DataStructres/WikiNode";
import Grid from '@material-ui/core/Grid';
import getLinks from "../WikiAPI/GetLinks";
import getUrl from "../WikiAPI/GetUrl";
import getCategories from "../WikiAPI/GetCategories";
import DFS from '../DataStructres/DFS';
import getSearchResults from "../WikiAPI/GetSearchResults";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography';
import Iframe from 'react-iframe';
import Graph from "react-graph-vis";
import { Button } from "@material-ui/core";

function WikiGraph() {

  const numToKeep = 5;

  const [root, setRoot] = React.useState(null);
  const [selectedUrl, setSelectedUrl] = React.useState("https://wikipedia.com");
  const [graph, setGraph] = React.useState({ nodes: [], edges: [] });
  const [searchTerm, setSearchTerm] = React.useState('');
  const [availableTerms, setSearchTerms] = React.useState([]);
  const [selectedRootTerm, setSelectedRootTerm] = React.useState(null);
  const [network, setNetwork] = React.useState(null);

  async function newSearchTermFound(event) {
    let title = selectedRootTerm.target.defaultValue;
    var newRoot = new WikiNode(title, getUrl(title), title);
    let [requests, sortableArray] = await newRoot.getChildren();
    Promise.allSettled(requests).then((_) => {
      sortableArray.sort((a,b) => b[0] - a[0]);
      for (var i = 0; i < numToKeep; i++)
        newRoot.addChild(new WikiNode(sortableArray[i][1], getUrl(sortableArray[i][1]), sortableArray[i][1]), sortableArray[i][0]);
      if (network) {
        network.body.data.nodes.update(newRoot.getNodes());
        network.body.data.edges.update(newRoot.getEdges());
      }
      setRoot(newRoot);
    });
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

      if (nodes)
      {
        let result = DFS(root, nodes[0]);
        if (result && result.url != undefined)
          setSelectedUrl(result.url);
      }
    },
    doubleClick: async function (event) {
      var {nodes, edges} = event;
      let result = DFS(root, nodes[0]);
      console.log("DOUBLE CLICK", result.title);

      let [requests, sortableArray] = await result.getChildren();
      Promise.allSettled(requests).then((_) => {
        sortableArray.sort((a,b) => b[0] - a[0]);
        
        for (var i = 0; i < numToKeep; i++)
          result.addChild(new WikiNode(sortableArray[i][1], getUrl(sortableArray[i][1]), sortableArray[i][1]), sortableArray[i][0]);

        if (network) {
          network.body.data.nodes.update(result.getNodes());
          network.body.data.edges.update(result.getEdges());
        }
      });

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

      {!root && 
      <Grid container>
        <Grid item>
          <Typography variant="h4" component="h1">
            Enter a search term
          </Typography>
        </Grid>
      </Grid>
      }
    {root &&
    <Grid container direction="row">
      <Grid item md={12} lg={7}>
        <Graph
        graph={graph}
        options={options}
        events={events}
        getNetwork={network => {
          //  if you want access to vis.js network api you can set the state in a parent component using this property
          setNetwork(network);
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
    </Grid>}
  </div>
  );
}

export default WikiGraph;
