/*
 * Document initialization.
 */
$(document).ready(function () 
{

	
});

//Renders and draws the graph
function drawGraph(data){
	var g = loadJsonToDagre(data);

	var renderer = new dagreD3.Renderer()
	var layout = dagreD3.layout()
	                    .nodeSep(20)
	                    .rankDir("LR");
	                    
	layout = renderer.layout(layout).run(g, d3.select("svg g"));
	 var svg = d3.select("svg")
	 	.attr("width", layout.graph().width + 40)
	 	.attr("height", layout.graph().height + 40)
	 	.call(d3.behavior.zoom().on("zoom", function() {
     		var ev = d3.event;
     		svg.select("g")
     			.attr("transform", "translate(" + ev.translate + ") scale(" + ev.scale + ")");
  		}));
  		console.log("finished with graph");
	
}

//Creates the dagreD3 object
//Responsible for adding nodes and edges
function loadJsonToDagre(data){
	var g = new dagreD3.Digraph();
		
	for (var i in data.nodes) {
		var el = data.nodes[i];
		g.addNode(el.id, { label: el.pact } );
		if (el.predecessors != null) {
			for (var j in el.predecessors) {
				g.addEdge(null, el.predecessors[j].id, el.id);	
			}
		}
	}
	
	return g;
}