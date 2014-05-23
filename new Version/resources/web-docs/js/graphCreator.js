/*
 * Document initialization.
 */
$(document).ready(function () 
{

	
});

//The current JSON file
var JSONData; 
//The informations for the iterations
var iterationIds = new Array();
var iterationGraphs = new Array();
var iterationWidths = new Array();
var iterationHeights = new Array();

//Renders and draws the graph
function drawGraph(data, svgID){
	JSONData = data;
	
	//First step: precompute all iteration graphs
	//find all iterations
	iterationNodes = searchForIterationNodes();
	
	//add the graphs and the sizes to the arrays
	if (iterationNodes != null) {
		for (var i in iterationNodes) {
			var itNode = iterationNodes[i];
			iterationIds.push(itNode.id);
			var g0 = loadJsonToDagre(itNode);
			iterationGraphs.push(g0);
		    var r = new dagreD3.Renderer();
		   	var l = dagreD3.layout()
		                 .nodeSep(20)
		                 .rankDir("LR");
		    l = r.layout(l).run(g0, d3.select("#svg-main"));
		
		   	iterationWidths.push(l._value.width);
			iterationHeights.push(l._value.height);
			
			//Clean svg
			$("#svg-main g").empty();
		}
	}
		
	//Continue normal
	var g = loadJsonToDagre(data);
	var selector = svgID + " g";
	var renderer = new dagreD3.Renderer();
	var layout = dagreD3.layout()
	                    .nodeSep(20)
	                    .rankDir("LR");
	
	//new solution (with selection of id)
	var svgElement = d3.select(selector);
	layout = renderer.layout(layout).run(g, svgElement);
	
	//old solution (working) TODO remove when not needed anymore
//	layout = renderer.layout(layout).run(g, d3.select("svg g"));
	
	 var svg = d3.select("#svg-main")
	 	//.attr("width", layout.graph().width + 40)
	 	.attr("width", $(document).width() - 15)
	 	//.attr("height", layout.graph().height + 40)
	 	.call(d3.behavior.zoom("#svg-main").on("zoom", function() {
     		var ev = d3.event;
     		svg.select("#svg-main g")
     			.attr("transform", "translate(" + ev.translate + ") scale(" + ev.scale + ")");
  		}));
  		
  	//TODO search for svgs and draw graphs, in this case id=19 --> Change
  		// This should now draw the precomputed graphs in the svgs... . 
  		var workset = searchForNode(19);
  		g = loadJsonToDagre(workset);
  		renderer = new dagreD3.Renderer();
  		layout = dagreD3.layout()
	                    .nodeSep(20)
	                    .rankDir("LR");
	    selector = "#svg-19 g";
	    svgElement = d3.select(selector);
	    layout = renderer.layout(layout).run(g, svgElement);
  	
  	activateClickEvents();
  	
  	}
  	
function activateClickEvents() {
	$("#myPanel").on("click", function() {
		alert("You clicked" + $(this).attr("data"));
	});	
}

//Creates the dagreD3 graph object
//Responsible for adding nodes and edges
function loadJsonToDagre(data){
	var g = new dagreD3.Digraph();
	if (data.nodes != null) {
		console.log("Normal Json Data");
		for (var i in data.nodes) {
			var el = data.nodes[i];
			
			g.addNode(el.id, { label: createLabelNode(el) } );
			if (el.predecessors != null) {
				for (var j in el.predecessors) {
					g.addEdge(null, el.predecessors[j].id, el.id, { label: createLabelEdge(el.predecessors[j]) });	
				}
			}
		}
	} else {
		console.log("Iteration Json Data");
		for (var i in data.step_function) {
			var el = data.step_function[i];
			
			g.addNode(el.id, { label: createLabelNode(el) } );
			if (el.predecessors != null) {
				for (var j in el.predecessors) {
					g.addEdge(null, el.predecessors[j].id, el.id, { label: createLabelEdge(el.predecessors[j]) });	
				}
			}
		}
	}
	
	return g;
}

//create a label of an edge
function createLabelEdge(el) {
	var labelValue = "<div style=\"font-size: 120%; border:2px solid\">";
	if (el.ship_strategy != null) {
		labelValue += el.ship_strategy;
	} 
	if (el.local_strategy != undefined) {
		labelValue += ", " + el.local_strategy;
	}
	labelValue += "</div>";
	return labelValue;
}

//creates the label of a node
function createLabelNode(el) {
	
	var labelValue = "<div>";
	//set color of panel
	if (el.pact == "Data Source") {
		labelValue += "<div class=\"panel panel-success\">";
	} else if (el.pact == "Data Sink") {
		labelValue += "<div class=\"panel panel-warning\">";
	} else {
		labelValue += "<div class=\"panel panel-info\">";
	}
	//Nodename
	labelValue += "<div class=\"panel-heading\"><a class=\"clickLabel\" nodeID=\""+el.id+"\" href=\"#\"><h4 style=\"text-align: center\">" + el.pact + "</h4></a>";
	if (el.contents == "") {
		labelValue += "</div>";
	} else {
		var stepName = el.contents;
		//clean stepName
		stepName = shortenString(stepName);
	 	labelValue += "<h5 style=\"text-align: center\">" + stepName + "</h5></div>";
	}
	
	//If this node is a "workset" we need a different panel-body
	if (el.workset != null) {
		labelValue += extendLabelNodeForIteration(el.id);
		return labelValue;
	}
	
	//Table
	labelValue += "<div class=\"panel-body\"><table class=\"table\"></tr>";

	if (el.parallelism != "") {
		labelValue += tableRow("Parallelism", el.parallelism);
	}

	if (el.driver_strategy != undefined) {
		labelValue += tableRow("Driver Strategy", el.driver_strategy);
	}
		
	labelValue += "</table></div>";
	
	//close panel
	labelValue += "</div></div>";
	return labelValue;
}

//Extends the label of a node with an additional svg Element to present the workset iteration.
function extendLabelNodeForIteration(id) {
	var svgID = "svg-" + id;

	//Find out the position of the iterationElement in the iterationGraphArray
	var index = iterationIds.indexOf(id);
	//Set the size and the width of the svg Element as precomputetd
	var width = iterationWidths[index] + 40;
	var height = iterationHeights[index] + 40;
	
	console.log(height);
	var labelValue = "<div id=\"attach\"><svg id=\""+svgID+"\" width="+width+" height="+height+"><g transform=\"translate(20, 20)\"/></svg></div>";
	return labelValue;
}

//presents properties for a given nodeID in the propertyCanvas
//TODO Check if null (BUG)
function showProperties(nodeID) {
	$("#propertyCanvas").empty();
	node = searchForNode(nodeID);
	var phtml = "<div><h3>Properties of "+ shortenString(node.contents) + " - ID = " + nodeID + "</h3>";
	phtml += "<div class=\"row\">";
	
	phtml += "<div class=\"col-md-2\"><h4>Pact Properties</h4>";
	phtml += "<table class=\"table\"><tr><th>name</th><th>value</th></tr>";
	phtml += tableRow("Operator", (node.driver_strategy == undefined ? "None" : node.driver_strategy));
	phtml += tableRow("Parallelism", (node.parallelism == undefined ? "None" : node.parallelism));
	phtml += tableRow("Subtasks-per-instance", (node.subtasks_per_instance == undefined ? "None" : node.subtasks_per_instance));
	phtml += "</table></div>";
	
	phtml += "<div class=\"col-md-2\"><h4>Global Data Properties</h4>";
	phtml += "<table class=\"table\"><tr><th>name</th><th>value</th></tr>";
	for (var i = 0; i < node.global_properties.length; i++) {
    	var prop = node.global_properties[i];
    	phtml += tableRow((prop.name == undefined ? '(unknown)' : prop.name),(prop.value == undefined ? "(none)" : prop.value));
    }
	phtml += "</table></div>";

	phtml += "<div class=\"col-md-2\"><h4>Local Data Properties</h4>";
	phtml += "<table class=\"table\"><tr><th>name</th><th>value</th></tr>";
	for (var i = 0; i < node.local_properties.length; i++) {
		var prop = node.local_properties[i];
     	phtml += tableRow((prop.name == undefined ? '(unknown)' : prop.name),(prop.value == undefined ? "(none)" : prop.value));
    }
	phtml += "</table></div>";
	
	phtml += "<div class=\"col-md-2\"><h4>Size Estimates</h4>";
	phtml += "<table class=\"table\"><tr><th>name</th><th>value</th></tr>";
	for (var i = 0; i < node.estimates.length; i++) {
		var prop = node.estimates[i];
		phtml += tableRow((prop.name == undefined ? '(unknown)' : prop.name),(prop.value == undefined ? "(none)" : prop.value));
	}
	phtml += "</table></div>";
	
	phtml += "<div class=\"col-md-2\"><h4>Cost Estimates</h4>";	
	phtml += "<table class=\"table\"><tr><th>name</th><th>value</th></tr>";
	for (var i = 0; i < node.costs.length; i++) {
    	var prop = node.costs[i];
    	phtml += tableRow((prop.name == undefined ? '(unknown)' : prop.name),(prop.value == undefined ? "(none)" : prop.value));
	}
	phtml += "</table></div>";
	
	phtml += "</div></div>";
	$("#propertyCanvas").append(phtml);
	
}

//searches in the global JSONData for the node with the given id
function searchForNode(nodeID) {
	for (var i in JSONData.nodes) {
		var el = JSONData.nodes[i];
		if (el.id == nodeID) {
			return el;
		}
	}
}

function searchForIterationNodes() {
	var itN = new Array();
	for (var i in JSONData.nodes) {
		var el = JSONData.nodes[i];
		if (el.step_function != null) {
			itN.push(el);
		}
	}
	return itN;
}

/**
 * More Infos from a job
 */
$(document).on("click", ".clickLabel", function() {
	var id = $(this).attr("nodeID");
	showProperties(id);
});

//creates a row for a table with two collums
function tableRow(nameX, valueX) {
	var htmlCode = "";
	htmlCode += "<tr><td>" + nameX + "</td><td>" + valueX + "</td></tr>";
	return htmlCode;
}

//Shortens a string to be shorter than 30 letters.
//If the string is an URL it shortens it in a way that "looks nice"
function shortenString(s) {
	var lastLength = s.length;
	do {
		lastLength = s.length;
		s = s.substring(s.indexOf("/")+1, s.length);
	} while (s.indexOf("/") != -1 && s.length > 30 && lastLength != s.length)
	//make sure that name does not contain a < (because of html)
	if (s.charAt(0) == "<") {
			s = s.replace("<", "&lt;");
			s = s.replace(">", "&gt;");
	}
	return s;
}