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
	 	//.attr("height", layout.graph().height + 40)
	 	.call(d3.behavior.zoom().on("zoom", function() {
     		var ev = d3.event;
     		svg.select("g")
     			.attr("transform", "translate(" + ev.translate + ") scale(" + ev.scale + ")");
  		}));
  	}

//Creates the dagreD3 object
//Responsible for adding nodes and edges
function loadJsonToDagre(data){
	var g = new dagreD3.Digraph();
	for (var i in data.nodes) {
		var el = data.nodes[i];
		
		g.addNode(el.id, { label: createLabelNode(el) } );
		if (el.predecessors != null) {
			for (var j in el.predecessors) {
				g.addEdge(null, el.predecessors[j].id, el.id, { label: createLabelEdge(el.predecessors[j]) });	
			}
		}
	}
	
	return g;
}

function createLabelEdge(el) {
	return el.ship_strategy;
}

function createLabelNode(el) {
		var labelValue = "<div class=\"panel panel-primary\">";
		//Nodename
		if (el.contents == "") {
			labelValue += "<div class=\"panel-heading\">" + el.pact + "</div>";
		} else {
			//make sure that name does not contain a < (because of html)
			var stepName = el.contents
			if (stepName.charAt(0) == "<") {
				stepName = stepName.replace("<", "&lt;");
				stepName = stepName.replace(">", "&gt;");
			}
		 	labelValue += "<div class=\"panel-heading\">" + el.pact + " - " + stepName + "</div>";
		}
		//Table
		labelValue += "<div><table class=\"table\"><tr><th>name</th><th>value</th></tr>";
		
		for (var z in el.global_properties) {
			labelValue += tableRow(el.global_properties[z].name, el.global_properties[z].value);
		}
		
		labelValue += "</table></div>";
		
		//close panel
		labelValue += "</div>";
				
		return labelValue;
}

function tableRow(nameX, valueX) {
	var htmlCode = "";
	htmlCode += "<tr><td>" + nameX + "</td><td>" + valueX + "</td></tr>";
	return htmlCode;
}