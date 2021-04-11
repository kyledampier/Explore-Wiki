let nodeFill = "rgb(235, 238, 240)";
let nodeOutline = "rgb(235, 238, 240)";
let nodeHover = "rgb(29, 68, 242)";
let nodeHoverBg = "rgb(255, 255, 255)";

let nodes = new vis.DataSet([
    {
        id: 1, 
        label: "Node 1", 
        color: { 
            background: nodeFill, 
            border: nodeOutline, 
            highlight: { background: nodeHoverBg, border: nodeHover },
            hover: { background: nodeHoverBg, border: nodeHover },
        },
    }, 
    {
        id: 2, 
        label: "Node 2", 
        color: { 
            background: nodeFill, 
            border: nodeOutline, 
            highlight: { background: nodeHoverBg, border: nodeHover },
            hover: { background: nodeHoverBg, border: nodeHover },
        },
    },
    {
        id: 3, 
        label: "Node 3", 
        color: { 
            background: nodeFill, 
            border: nodeOutline, 
            highlight: { background: nodeHoverBg, border: nodeHover },
            hover: { background: nodeHoverBg, border: nodeHover }
        },
    },
    {
        id: 4, 
        label: "Node 4", 
        color: { 
            background: nodeFill, 
            border: nodeOutline, 
            highlight: { background: nodeHoverBg, border: nodeHover },
            hover: { background: nodeHoverBg, border: nodeHover }
        },
    },
    {
        id: 5, 
        label: "Node 5", 
        color: { 
            background: nodeFill, 
            border: nodeOutline, 
            highlight: { background: nodeHoverBg, border: nodeHover },
            hover: { background: nodeHoverBg, border: nodeHover }
        },
    },
]);

let edges = new vis.DataSet([
    { from: 1, to: 3 },
    { from: 1, to: 2 },
    { from: 2, to: 4 },
    { from: 2, to: 5 },
    { from: 3, to: 3 },
]);

let container = document.getElementById("graph-area");
let data = {nodes: nodes, edges: edges};
let options = {interaction: { hover: true }, nodes: {margin: 10, widthConstraint: {minimum: 40}, heightConstraint: {minimum: 40}}};

let network = new vis.Network(container, data, options);