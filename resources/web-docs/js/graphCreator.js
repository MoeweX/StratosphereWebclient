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
	var labelValue = "<div class\"myPanel\" data=\"" + el.id + "\">";
	//set color of panel
	if (el.pact == "Data Source") {
		labelValue += "<div class=\"panel panel-success\">";
	} else if (el.pact == "Data Sink") {
		labelValue += "<div class=\"panel panel-warning\">";
	} else {
		labelValue += "<div class=\"panel panel-info\">";
	}
	//Nodename
	if (el.contents == "") {
		labelValue += "<div class=\"panel-heading\"><h4 style=\"text-align: center\">" + el.pact + "</h4></div>";
	} else {
		var stepName = el.contents;
		//shorten name to <= 30 letters
		if (stepName.length > 30) {
			stepName = shortenString(stepName);
		}
		//make sure that name does not contain a < (because of html)
		if (stepName.charAt(0) == "<") {
			stepName = stepName.replace("<", "&lt;");
			stepName = stepName.replace(">", "&gt;");
		}
	 	labelValue += "<div class=\"panel-heading\"><h4 style=\"text-align: center\">" + el.pact + "</h4><h5 style=\"text-align: center\">" + stepName + "</h5></div>";
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
	return s;
}