/*
 * Document initialization.
 */
$(document).ready(function () 
{

	
});

//The current JSON file
var JSONData; 

//Renders and draws the graph
function drawGraph(data){
	JSONData = data;
	var g = loadJsonToDagre(data);

	var renderer = new dagreD3.Renderer()
	var layout = dagreD3.layout()
	                    .nodeSep(20)
	                    .rankDir("LR");
	layout = renderer.layout(layout).run(g, d3.select("svg g"));
	
	 var svg = d3.select("svg")
	 	//.attr("width", layout.graph().width + 40)
	 	.attr("width", $(document).width() - 10)
	 	//.attr("height", layout.graph().height + 40)
	 	.call(d3.behavior.zoom().on("zoom", function() {
     		var ev = d3.event;
     		svg.select("g")
     			.attr("transform", "translate(" + ev.translate + ") scale(" + ev.scale + ")");
  		}));
  		
  	activateClickEvents();
  	}
  	
function activateClickEvents() {
	$("#myPanel").on("click", function() {
		alert("You clicked" + $(this).attr("data"));
	});	
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

//create a label of an edge
function createLabelEdge(el) {
	var labelValue = el.ship_strategy;
	if (el.local_strategy != undefined) {
		labelValue += ", " + el.local_strategy;
	}
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
	//Table
	labelValue += "<div><table class=\"table\"><tr><th>name</th><th>value</th></tr>";

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

//presents properties for a given nodeID in the propertyCanvas
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