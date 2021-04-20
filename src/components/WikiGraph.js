import React from "react";
import ReactDOM from "react-dom";
import WikiNode from "../DataStructres/WikiNode";
import Grid from '@material-ui/core/Grid';
import getLinks from "../WikiAPI/GetLinks";
import getUrl from "../WikiAPI/GetUrl";
import Slider from '@material-ui/core/Slider';
import DFS from '../DataStructres/DFS';
import BFS from '../DataStructres/BFS';
import getSearchResults from "../WikiAPI/GetSearchResults";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography';
import Iframe from 'react-iframe';
import Graph from "react-graph-vis";
import { Button } from "@material-ui/core";
import Checkbox from '@material-ui/core/Checkbox';
import Switch from '@material-ui/core/Switch';

function WikiGraph() {

  const [numToKeep, setNumToKeep] = React.useState(5);
  const [root, setRoot] = React.useState(1);
  const [selectedUrl, setSelectedUrl] = React.useState("https://wikipedia.com");
  const [graph, setGraph] = React.useState({ nodes: [], edges: [] });
  const [searchTerm, setSearchTerm] = React.useState('');
  const [availableTerms, setSearchTerms] = React.useState([]);
  const [selectedRootTerm, setSelectedRootTerm] = React.useState(null);
  const [network, setNetwork] = React.useState(null);
  const [options, setOptions] = React.useState({
    layout: {
      hierarchical: {
        enabled: true,
        direction: 'UD',
      }
    },
    edges: {
      color: "#000000"
    },
    height: "700px"
  });

  const handleNumToKeepChange = (_, value) => {
    setNumToKeep(value);
  };

  async function newSearchTermFound(event) {

    console.log(network);

    let title = selectedRootTerm.target.defaultValue;
    var newRoot = new WikiNode(title, getUrl(title), title);
    let [requests, sortableArray] = await newRoot.getChildren();
    Promise.allSettled(requests).then((_) => {
      sortableArray.sort((a,b) => b[0] - a[0]);
      for (var i = 0; i < numToKeep; i++)
        newRoot.addChild(new WikiNode(sortableArray[i][1], getUrl(sortableArray[i][1]), sortableArray[i][1]), sortableArray[i][0]);
      if (network) {
        network.body.data.nodes.clear();
        network.body.data.edges.clear();
        network.body.data.nodes.update(newRoot.getNodes());
        network.body.data.edges.update(newRoot.getEdges());
      }
      setRoot(newRoot);
    });
  };

  const events = {
    select: function(event) {
      var { nodes, edges } = event;

      if (nodes)
      {
        let result;
        if(options.layout.hierarchical.enabled) {
          result = DFS(root, nodes[0]);
        } else {
          result = BFS(root, nodes[0]);
        }
        if (result && result.url != undefined)
          setSelectedUrl(result.url);
      }
    },
    doubleClick: async function (event) {
      var {nodes, edges} = event;
      let result = DFS(root, nodes[0]);
      if (result){
        let [requests, sortableArray] = await result.getChildren();
        Promise.allSettled(requests).then((_) => {
          sortableArray.sort((a,b) => b[0] - a[0]);
          
          if (!(result.children.length > 1)) {
            for (var i = 0; i < numToKeep; i++)
              result.addChild(new WikiNode(sortableArray[i][1], getUrl(sortableArray[i][1]), sortableArray[i][1]), sortableArray[i][0]);
  
            if (network) {
              network.body.data.nodes.update(result.getNodes());
              network.body.data.edges.update(result.getEdges());
            }
          }
        });
      }
    }
  };

  return (
    <div>
      <Grid container spacing={3} alignItems="center" style={{marginLeft: "1rem", marginTop: "1rem"}}>
        <Grid item xs={3}>
          <Autocomplete
            id="search-box"
            options={availableTerms}
            getOptionLabel={(option) => option.title}
            style={{ width: "100%", marginLeft: "1rem", marginBottom: "1rem", marginTop: "1rem" }}
            autoHighlight
            onSelect={setSelectedRootTerm}
            renderInput={(params) => 
              <Grid conatiner> 
                <Grid item>           
                  <TextField {...params} 
                    label="Search Wiki Articles" 
                    variant="outlined"
                    value={searchTerm}
                    display="inline"
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
                  </Grid>
              </Grid>
            }
          />
        </Grid>

        <Grid item>
          <Button onClick={newSearchTermFound} variant="outlined" display="inline">Search</Button>
        </Grid>
        
        <Grid item xs={3}>
          <Typography id="non-linear-slider" gutterBottom>
            Number of children: {numToKeep}
          </Typography>
          <Slider
            value={numToKeep}
            marks
            min={2}
            step={1}
            max={25}
            onChange={handleNumToKeepChange}
            valueLabelDisplay="auto"
            aria-labelledby="num-to-keep-slider"
          />
        </Grid>

        <Grid item>Graph</Grid>
        <Grid item>
            <Switch
            color="primary" 
            checked={options.layout.hierarchical}
            onChange={() => {
              let newOptions = {...options};
              newOptions.layout.hierarchical = !newOptions.layout.hierarchical;
              console.log(network);
              setOptions(newOptions);
            }}
            />
        </Grid>
        <Grid item>Trees</Grid>
      </Grid>
      <Grid container direction="row">
        {/* GRAPH IS hierarchical */}
        {(options.layout.hierarchical && (root != 1)) && (
          <Grid item md={12} lg={7}>
            <Graph
            graph={graph}
            options={options}
            events={events}
            getNetwork={network => {
              //  if you want access to vis.js network api you can set the state in a parent component using this property
              if (network) {
                network.body.data.nodes.clear();
                network.body.data.edges.clear();
                network.body.data.nodes.update(root.getNodes());
                network.body.data.edges.update(root.getEdges());
              }
              setNetwork(network);
            }}
            height="100%"
            />
          </Grid>
        )}

        {/* GRAPH IS NETWORK */}
        {(!options.layout.hierarchical && (root != 1)) && (
          <Grid item md={12} lg={7}>
            <Graph
            graph={graph}
            options={options}
            events={events}
            getNetwork={network => {
              //  if you want access to vis.js network api you can set the state in a parent component using this property
              if (network) {
                network.body.data.nodes.clear();
                network.body.data.edges.clear();
                network.body.data.nodes.update(root.getNodes());
                network.body.data.edges.update(root.getEdges());
              }
              setNetwork(network);
            }}
            height="100%"
            />
          </Grid>
        )}

        {(root != 1) && (
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
        )}

    
    </Grid>
  </div>
  );
}

export default WikiGraph;