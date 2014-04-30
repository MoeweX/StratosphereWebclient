/*
 * Document initialization.
 */
$(document).ready(function () 
{

	//var g = loadJsonToDagre(exampleJson1());
	var g = loadJsonToDagre(exampleJson2());
	//var g = useExample();
	
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
	
});

function useExample() {
	var g = new dagreD3.Digraph();
	g.addNode(0,  { label: "<div style='padding: 10px;'>A <span style='font-size:32px'>Big</span> <span style='color:red;'>HTML</span> Source!</div>" });
	g.addNode(1,  { label: "S", });
	g.addNode(2,  { label: "NP", });
	g.addNode(3,  { label: "DT",        nodeclass: "type-DT" });
	g.addNode(4,  { label: "This",      nodeclass: "type-TK" });
	g.addNode(5,  { label: "VP",        nodeclass: "type-VP" });
	g.addNode(6,  { label: "VBZ",       nodeclass: "type-VBZ" });
	g.addNode(7,  { label: "is",        nodeclass: "type-TK" });
	g.addNode(8,  { label: "NP",        nodeclass: "type-NP" });
	g.addNode(9,  { label: "DT",        nodeclass: "type-DT" });
	g.addNode(10, { label: "an",        nodeclass: "type-TK" });
	g.addNode(11, { label: "NN",        nodeclass: "type-NN" });
	g.addNode(12, { label: "example",   nodeclass: "type-TK" });
	g.addNode(13, { label: ".",         nodeclass: "type-." });
	g.addNode(14, { label: "sentence",  nodeclass: "type-TK" });
	
	g.addEdge(null, 3, 4);
	g.addEdge(null, 2, 3);
	g.addEdge(null, 1, 2);
	g.addEdge(null, 6, 7);
	g.addEdge(null, 5, 6);
	g.addEdge(null, 9, 10);
	g.addEdge(null, 8, 9);
	g.addEdge(null, 11,12);
	g.addEdge(null, 8, 11);
	g.addEdge(null, 5, 8);
	g.addEdge(null, 1, 5);
	g.addEdge(null, 13,14);
	g.addEdge(null, 1, 13);
	g.addEdge(null, 0, 1)
	return g;
}

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

function exampleJson1() {
		
	return {
	"nodes": [

	{
		"id": 3,
		"type": "source",
		"pact": "Data Source",
		"contents": "file:///path/to/input",
		"parallelism": "1",
		"subtasks_per_instance": "1"
	},
	{
		"id": 2,
		"type": "pact",
		"pact": "Map",
		"contents": "tokenize lines",
		"parallelism": "1",
		"subtasks_per_instance": "1",
		"predecessors": [
			{"id": 3}
		]
	},
	{
		"id": 1,
		"type": "pact",
		"pact": "Reduce",
		"contents": "count words",
		"parallelism": "1",
		"subtasks_per_instance": "1",
		"predecessors": [
			{"id": 2}
		]
	},
	{
		"id": 0,
		"type": "sink",
		"pact": "Data Sink",
		"contents": "file:///path/to/output",
		"parallelism": "1",
		"subtasks_per_instance": "1",
		"predecessors": [
			{"id": 1}
		]
	}
	]
};
}

function exampleJson2() {
		
	return {
	"nodes": [

	{
		"id": 6,
		"type": "source",
		"pact": "Data Source",
		"contents": "/home/twalthr/repo/test/stratosphere-fulltest/TPC-H/generated_SF0.001/orders.tbl",
		"parallelism": "1",
		"subtasks_per_instance": "1",
		"global_properties": [
			{ "name": "Partitioning", "value": "RANDOM" },
			{ "name": "Partitioning Order", "value": "(none)" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"local_properties": [
			{ "name": "Order", "value": "(none)" },
			{ "name": "Grouping", "value": "not grouped" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"estimates": [
			{ "name": "Est. Output Size", "value": "(unknown)" },
			{ "name": "Est. Cardinality", "value": "(unknown)" },
			{ "name": "Est. Cardinality/fields", "value": "(unknown)" }		],
		"costs": [
			{ "name": "Network", "value": "0 B" },
			{ "name": "Disk I/O", "value": "(unknown)" },
			{ "name": "CPU", "value": "0 " },
			{ "name": "Cumulative Network", "value": "0 B" },
			{ "name": "Cumulative Disk I/O", "value": "(unknown)" },
			{ "name": "Cumulative CPU", "value": "0 " }
		],
		"compiler_hints": [
			{ "name": "Cardinality", "value": "(none)" },
			{ "name": "Avg. Records/StubCall", "value": "(none)" },
			{ "name": "Avg. Values/Distinct fields", "value": "(none)" },
			{ "name": "Avg. Width (bytes)", "value": "(none)" }		]
	},
	{
		"id": 5,
		"type": "pact",
		"pact": "Map",
		"contents": "<Unnamed Mapper>",
		"parallelism": "1",
		"subtasks_per_instance": "1",
		"predecessors": [
			{"id": 6, "ship_strategy": "Forward"}
		],
		"driver_strategy": "Map",
		"global_properties": [
			{ "name": "Partitioning", "value": "RANDOM" },
			{ "name": "Partitioning Order", "value": "(none)" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"local_properties": [
			{ "name": "Order", "value": "(none)" },
			{ "name": "Grouping", "value": "not grouped" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"estimates": [
			{ "name": "Est. Output Size", "value": "(unknown)" },
			{ "name": "Est. Cardinality", "value": "(unknown)" },
			{ "name": "Est. Cardinality/fields", "value": "(unknown)" }		],
		"costs": [
			{ "name": "Network", "value": "0 B" },
			{ "name": "Disk I/O", "value": "0 B" },
			{ "name": "CPU", "value": "0 " },
			{ "name": "Cumulative Network", "value": "0 B" },
			{ "name": "Cumulative Disk I/O", "value": "(unknown)" },
			{ "name": "Cumulative CPU", "value": "0 " }
		],
		"compiler_hints": [
			{ "name": "Cardinality", "value": "(none)" },
			{ "name": "Avg. Records/StubCall", "value": "(none)" },
			{ "name": "Avg. Values/Distinct fields", "value": "(none)" },
			{ "name": "Avg. Width (bytes)", "value": "(none)" }		]
	},
	{
		"id": 4,
		"type": "pact",
		"pact": "Reduce",
		"contents": "<Unnamed Reducer>",
		"parallelism": "1",
		"subtasks_per_instance": "1",
		"predecessors": [
			{"id": 5, "ship_strategy": "Forward"}
		],
		"driver_strategy": "Group all into a single group",
		"global_properties": [
			{ "name": "Partitioning", "value": "RANDOM" },
			{ "name": "Partitioning Order", "value": "(none)" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"local_properties": [
			{ "name": "Order", "value": "(none)" },
			{ "name": "Grouping", "value": "not grouped" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"estimates": [
			{ "name": "Est. Output Size", "value": "(unknown)" },
			{ "name": "Est. Cardinality", "value": "(unknown)" },
			{ "name": "Est. Cardinality/fields", "value": "(unknown)" }		],
		"costs": [
			{ "name": "Network", "value": "0 B" },
			{ "name": "Disk I/O", "value": "0 B" },
			{ "name": "CPU", "value": "0 " },
			{ "name": "Cumulative Network", "value": "0 B" },
			{ "name": "Cumulative Disk I/O", "value": "(unknown)" },
			{ "name": "Cumulative CPU", "value": "0 " }
		],
		"compiler_hints": [
			{ "name": "Cardinality", "value": "(none)" },
			{ "name": "Avg. Records/StubCall", "value": "(none)" },
			{ "name": "Avg. Values/Distinct fields", "value": "(none)" },
			{ "name": "Avg. Width (bytes)", "value": "(none)" }		]
	},
	{
		"id": 9,
		"type": "source",
		"pact": "Data Source",
		"contents": "file:///home/twalthr/repo/test/stratosphere-fulltest/TPC-H/generated_SF0.001/orders.tbl",
		"parallelism": "1",
		"subtasks_per_instance": "1",
		"global_properties": [
			{ "name": "Partitioning", "value": "RANDOM" },
			{ "name": "Partitioning Order", "value": "(none)" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"local_properties": [
			{ "name": "Order", "value": "(none)" },
			{ "name": "Grouping", "value": "not grouped" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"estimates": [
			{ "name": "Est. Output Size", "value": "162.33 KB" },
			{ "name": "Est. Cardinality", "value": "1.78 K" },
			{ "name": "Est. Cardinality/fields", "value": "(unknown)" }		],
		"costs": [
			{ "name": "Network", "value": "0 B" },
			{ "name": "Disk I/O", "value": "0 B" },
			{ "name": "CPU", "value": "0 " },
			{ "name": "Cumulative Network", "value": "0 B" },
			{ "name": "Cumulative Disk I/O", "value": "0 B" },
			{ "name": "Cumulative CPU", "value": "0 " }
		],
		"compiler_hints": [
			{ "name": "Cardinality", "value": "(none)" },
			{ "name": "Avg. Records/StubCall", "value": "(none)" },
			{ "name": "Avg. Values/Distinct fields", "value": "(none)" },
			{ "name": "Avg. Width (bytes)", "value": "91.2" }		]
	},
	{
		"id": 8,
		"type": "pact",
		"pact": "Map",
		"contents": "<Unnamed Mapper>",
		"parallelism": "1",
		"subtasks_per_instance": "1",
		"predecessors": [
			{"id": 9, "ship_strategy": "Forward"}
		],
		"driver_strategy": "Map",
		"global_properties": [
			{ "name": "Partitioning", "value": "RANDOM" },
			{ "name": "Partitioning Order", "value": "(none)" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"local_properties": [
			{ "name": "Order", "value": "(none)" },
			{ "name": "Grouping", "value": "not grouped" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"estimates": [
			{ "name": "Est. Output Size", "value": "162.33 KB" },
			{ "name": "Est. Cardinality", "value": "1.78 K" },
			{ "name": "Est. Cardinality/fields", "value": "(unknown)" }		],
		"costs": [
			{ "name": "Network", "value": "0 B" },
			{ "name": "Disk I/O", "value": "0 B" },
			{ "name": "CPU", "value": "0 " },
			{ "name": "Cumulative Network", "value": "0 B" },
			{ "name": "Cumulative Disk I/O", "value": "0 B" },
			{ "name": "Cumulative CPU", "value": "0 " }
		],
		"compiler_hints": [
			{ "name": "Cardinality", "value": "(none)" },
			{ "name": "Avg. Records/StubCall", "value": "(none)" },
			{ "name": "Avg. Values/Distinct fields", "value": "(none)" },
			{ "name": "Avg. Width (bytes)", "value": "(none)" }		]
	},
	{
		"id": 7,
		"type": "pact",
		"pact": "Reduce",
		"contents": "<Unnamed Reducer>",
		"parallelism": "1",
		"subtasks_per_instance": "1",
		"predecessors": [
			{"id": 8, "ship_strategy": "Forward"}
		],
		"driver_strategy": "Group all into a single group",
		"global_properties": [
			{ "name": "Partitioning", "value": "RANDOM" },
			{ "name": "Partitioning Order", "value": "(none)" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"local_properties": [
			{ "name": "Order", "value": "(none)" },
			{ "name": "Grouping", "value": "not grouped" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"estimates": [
			{ "name": "Est. Output Size", "value": "(unknown)" },
			{ "name": "Est. Cardinality", "value": "(unknown)" },
			{ "name": "Est. Cardinality/fields", "value": "(unknown)" }		],
		"costs": [
			{ "name": "Network", "value": "0 B" },
			{ "name": "Disk I/O", "value": "0 B" },
			{ "name": "CPU", "value": "0 " },
			{ "name": "Cumulative Network", "value": "0 B" },
			{ "name": "Cumulative Disk I/O", "value": "0 B" },
			{ "name": "Cumulative CPU", "value": "0 " }
		],
		"compiler_hints": [
			{ "name": "Cardinality", "value": "(none)" },
			{ "name": "Avg. Records/StubCall", "value": "(none)" },
			{ "name": "Avg. Values/Distinct fields", "value": "(none)" },
			{ "name": "Avg. Width (bytes)", "value": "(none)" }		]
	},
	{
		"id": 3,
		"type": "pact",
		"pact": "CoGroup",
		"contents": "<Unnamed CoGrouper>",
		"parallelism": "1",
		"subtasks_per_instance": "1",
		"predecessors": [
			{"id": 4, "side": "first", "ship_strategy": "Hash Partition on [0]", "local_strategy": "Sort on [0:ASC]"},
			{"id": 7, "side": "second", "ship_strategy": "Hash Partition on [0]", "local_strategy": "Sort on [0:ASC]"}
		],
		"driver_strategy": "Co-Group",
		"global_properties": [
			{ "name": "Partitioning", "value": "RANDOM" },
			{ "name": "Partitioning Order", "value": "(none)" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"local_properties": [
			{ "name": "Order", "value": "(none)" },
			{ "name": "Grouping", "value": "not grouped" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"estimates": [
			{ "name": "Est. Output Size", "value": "(unknown)" },
			{ "name": "Est. Cardinality", "value": "(unknown)" },
			{ "name": "Est. Cardinality/fields", "value": "(unknown)" }		],
		"costs": [
			{ "name": "Network", "value": "(unknown)" },
			{ "name": "Disk I/O", "value": "(unknown)" },
			{ "name": "CPU", "value": "(unknown)" },
			{ "name": "Cumulative Network", "value": "(unknown)" },
			{ "name": "Cumulative Disk I/O", "value": "(unknown)" },
			{ "name": "Cumulative CPU", "value": "(unknown)" }
		],
		"compiler_hints": [
			{ "name": "Cardinality", "value": "(none)" },
			{ "name": "Avg. Records/StubCall", "value": "(none)" },
			{ "name": "Avg. Values/Distinct fields", "value": "(none)" },
			{ "name": "Avg. Width (bytes)", "value": "(none)" }		]
	},
	{
		"id": 2,
		"type": "pact",
		"pact": "Reduce",
		"contents": "<Unnamed Reducer>",
		"parallelism": "1",
		"subtasks_per_instance": "1",
		"predecessors": [
			{"id": 3, "ship_strategy": "Forward"}
		],
		"driver_strategy": "Group all into a single group",
		"global_properties": [
			{ "name": "Partitioning", "value": "RANDOM" },
			{ "name": "Partitioning Order", "value": "(none)" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"local_properties": [
			{ "name": "Order", "value": "(none)" },
			{ "name": "Grouping", "value": "not grouped" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"estimates": [
			{ "name": "Est. Output Size", "value": "(unknown)" },
			{ "name": "Est. Cardinality", "value": "(unknown)" },
			{ "name": "Est. Cardinality/fields", "value": "(unknown)" }		],
		"costs": [
			{ "name": "Network", "value": "0 B" },
			{ "name": "Disk I/O", "value": "0 B" },
			{ "name": "CPU", "value": "0 " },
			{ "name": "Cumulative Network", "value": "(unknown)" },
			{ "name": "Cumulative Disk I/O", "value": "(unknown)" },
			{ "name": "Cumulative CPU", "value": "(unknown)" }
		],
		"compiler_hints": [
			{ "name": "Cardinality", "value": "(none)" },
			{ "name": "Avg. Records/StubCall", "value": "(none)" },
			{ "name": "Avg. Values/Distinct fields", "value": "(none)" },
			{ "name": "Avg. Width (bytes)", "value": "(none)" }		]
	},
	{
		"id": 21,
		"type": "source",
		"pact": "Data Source",
		"contents": "file:///home/twalthr/repo/test/stratosphere-fulltest/TPC-H/generated_SF0.001/customer.tbl",
		"parallelism": "1",
		"subtasks_per_instance": "1",
		"global_properties": [
			{ "name": "Partitioning", "value": "RANDOM" },
			{ "name": "Partitioning Order", "value": "(none)" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"local_properties": [
			{ "name": "Order", "value": "(none)" },
			{ "name": "Grouping", "value": "not grouped" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"estimates": [
			{ "name": "Est. Output Size", "value": "24.14 KB" },
			{ "name": "Est. Cardinality", "value": "157 " },
			{ "name": "Est. Cardinality/fields", "value": "(unknown)" }		],
		"costs": [
			{ "name": "Network", "value": "0 B" },
			{ "name": "Disk I/O", "value": "0 B" },
			{ "name": "CPU", "value": "0 " },
			{ "name": "Cumulative Network", "value": "0 B" },
			{ "name": "Cumulative Disk I/O", "value": "0 B" },
			{ "name": "Cumulative CPU", "value": "0 " }
		],
		"compiler_hints": [
			{ "name": "Cardinality", "value": "(none)" },
			{ "name": "Avg. Records/StubCall", "value": "(none)" },
			{ "name": "Avg. Values/Distinct fields", "value": "(none)" },
			{ "name": "Avg. Width (bytes)", "value": "153.8" }		]
	},
	{
		"id": 20,
		"type": "pact",
		"pact": "Map",
		"contents": "<Unnamed Mapper>",
		"parallelism": "1",
		"subtasks_per_instance": "1",
		"predecessors": [
			{"id": 21, "ship_strategy": "Forward"}
		],
		"driver_strategy": "Map",
		"global_properties": [
			{ "name": "Partitioning", "value": "RANDOM" },
			{ "name": "Partitioning Order", "value": "(none)" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"local_properties": [
			{ "name": "Order", "value": "(none)" },
			{ "name": "Grouping", "value": "not grouped" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"estimates": [
			{ "name": "Est. Output Size", "value": "24.14 KB" },
			{ "name": "Est. Cardinality", "value": "157 " },
			{ "name": "Est. Cardinality/fields", "value": "(unknown)" }		],
		"costs": [
			{ "name": "Network", "value": "0 B" },
			{ "name": "Disk I/O", "value": "0 B" },
			{ "name": "CPU", "value": "0 " },
			{ "name": "Cumulative Network", "value": "0 B" },
			{ "name": "Cumulative Disk I/O", "value": "0 B" },
			{ "name": "Cumulative CPU", "value": "0 " }
		],
		"compiler_hints": [
			{ "name": "Cardinality", "value": "(none)" },
			{ "name": "Avg. Records/StubCall", "value": "(none)" },
			{ "name": "Avg. Values/Distinct fields", "value": "(none)" },
			{ "name": "Avg. Width (bytes)", "value": "(none)" }		]
	},
	{
		"step_function": [
	{
		"id": 23,
		"type": "pact",
		"pact": "Workset",
		"contents": "Workset Place Holder",
		"parallelism": "1",
		"subtasks_per_instance": "1",
		"global_properties": [
			{ "name": "Partitioning", "value": "RANDOM" },
			{ "name": "Partitioning Order", "value": "(none)" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"local_properties": [
			{ "name": "Order", "value": "(none)" },
			{ "name": "Grouping", "value": "not grouped" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"estimates": [
			{ "name": "Est. Output Size", "value": "24.14 KB" },
			{ "name": "Est. Cardinality", "value": "157 " },
			{ "name": "Est. Cardinality/fields", "value": "(unknown)" }		],
		"costs": [
			{ "name": "Network", "value": "0 B" },
			{ "name": "Disk I/O", "value": "0 B" },
			{ "name": "CPU", "value": "0 " },
			{ "name": "Cumulative Network", "value": "0 B" },
			{ "name": "Cumulative Disk I/O", "value": "0 B" },
			{ "name": "Cumulative CPU", "value": "0 " }
		],
		"compiler_hints": [
			{ "name": "Cardinality", "value": "(none)" },
			{ "name": "Avg. Records/StubCall", "value": "(none)" },
			{ "name": "Avg. Values/Distinct fields", "value": "(none)" },
			{ "name": "Avg. Width (bytes)", "value": "(none)" }		]
	},
	{
		"id": 26,
		"type": "pact",
		"pact": "Solution Set",
		"contents": "Solution Set Place Holder",
		"parallelism": "1",
		"subtasks_per_instance": "1",
		"global_properties": [
			{ "name": "Partitioning", "value": "HASH_PARTITIONED" },
			{ "name": "Partitioned on", "value": "[0]" },
			{ "name": "Partitioning Order", "value": "(none)" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"local_properties": [
			{ "name": "Order", "value": "(none)" },
			{ "name": "Grouping", "value": "not grouped" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"estimates": [
			{ "name": "Est. Output Size", "value": "24.14 KB" },
			{ "name": "Est. Cardinality", "value": "157 " },
			{ "name": "Est. Cardinality/fields", "value": "(unknown)" }		],
		"costs": [
			{ "name": "Network", "value": "0 B" },
			{ "name": "Disk I/O", "value": "0 B" },
			{ "name": "CPU", "value": "0 " },
			{ "name": "Cumulative Network", "value": "0 B" },
			{ "name": "Cumulative Disk I/O", "value": "0 B" },
			{ "name": "Cumulative CPU", "value": "0 " }
		],
		"compiler_hints": [
			{ "name": "Cardinality", "value": "(none)" },
			{ "name": "Avg. Records/StubCall", "value": "(none)" },
			{ "name": "Avg. Values/Distinct fields", "value": "(none)" },
			{ "name": "Avg. Width (bytes)", "value": "(none)" }		]
	},
	{
		"id": 25,
		"type": "pact",
		"pact": "Join",
		"contents": "<Unnamed Join>",
		"parallelism": "1",
		"subtasks_per_instance": "1",
		"predecessors": [
			{"id": 23, "side": "first", "ship_strategy": "Hash Partition on [0]"},
			{"id": 26, "side": "second", "ship_strategy": "Forward"}
		],
		"driver_strategy": "Hybrid Hash (build: Solution Set Place Holder)",
		"global_properties": [
			{ "name": "Partitioning", "value": "RANDOM" },
			{ "name": "Partitioning Order", "value": "(none)" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"local_properties": [
			{ "name": "Order", "value": "(none)" },
			{ "name": "Grouping", "value": "not grouped" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"estimates": [
			{ "name": "Est. Output Size", "value": "(unknown)" },
			{ "name": "Est. Cardinality", "value": "(unknown)" },
			{ "name": "Est. Cardinality/fields", "value": "(unknown)" }		],
		"costs": [
			{ "name": "Network", "value": "241.46 MB" },
			{ "name": "Disk I/O", "value": "724.38 MB" },
			{ "name": "CPU", "value": "2.89 G" },
			{ "name": "Cumulative Network", "value": "241.46 MB" },
			{ "name": "Cumulative Disk I/O", "value": "724.38 MB" },
			{ "name": "Cumulative CPU", "value": "2.89 G" }
		],
		"compiler_hints": [
			{ "name": "Cardinality", "value": "(none)" },
			{ "name": "Avg. Records/StubCall", "value": "(none)" },
			{ "name": "Avg. Values/Distinct fields", "value": "(none)" },
			{ "name": "Avg. Width (bytes)", "value": "(none)" }		]
	},
	{
		"id": 24,
		"type": "pact",
		"pact": "Reduce",
		"contents": "<Unnamed Reducer>",
		"parallelism": "1",
		"subtasks_per_instance": "1",
		"predecessors": [
			{"id": 25, "ship_strategy": "Forward"}
		],
		"driver_strategy": "Group all into a single group",
		"global_properties": [
			{ "name": "Partitioning", "value": "RANDOM" },
			{ "name": "Partitioning Order", "value": "(none)" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"local_properties": [
			{ "name": "Order", "value": "(none)" },
			{ "name": "Grouping", "value": "not grouped" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"estimates": [
			{ "name": "Est. Output Size", "value": "(unknown)" },
			{ "name": "Est. Cardinality", "value": "(unknown)" },
			{ "name": "Est. Cardinality/fields", "value": "(unknown)" }		],
		"costs": [
			{ "name": "Network", "value": "0 B" },
			{ "name": "Disk I/O", "value": "0 B" },
			{ "name": "CPU", "value": "0 " },
			{ "name": "Cumulative Network", "value": "241.46 MB" },
			{ "name": "Cumulative Disk I/O", "value": "724.38 MB" },
			{ "name": "Cumulative CPU", "value": "2.89 G" }
		],
		"compiler_hints": [
			{ "name": "Cardinality", "value": "(none)" },
			{ "name": "Avg. Records/StubCall", "value": "(none)" },
			{ "name": "Avg. Values/Distinct fields", "value": "(none)" },
			{ "name": "Avg. Width (bytes)", "value": "(none)" }		]
	},
	{
		"id": 22,
		"type": "pact",
		"pact": "CoGroup",
		"contents": "<Unnamed CoGrouper>",
		"parallelism": "1",
		"subtasks_per_instance": "1",
		"predecessors": [
			{"id": 23, "side": "first", "ship_strategy": "Hash Partition on [0]", "local_strategy": "Sort on [0:ASC]"},
			{"id": 24, "side": "second", "ship_strategy": "Hash Partition on [0]", "local_strategy": "Sort on [0:ASC]"}
		],
		"driver_strategy": "Co-Group",
		"global_properties": [
			{ "name": "Partitioning", "value": "RANDOM" },
			{ "name": "Partitioning Order", "value": "(none)" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"local_properties": [
			{ "name": "Order", "value": "(none)" },
			{ "name": "Grouping", "value": "not grouped" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"estimates": [
			{ "name": "Est. Output Size", "value": "(unknown)" },
			{ "name": "Est. Cardinality", "value": "(unknown)" },
			{ "name": "Est. Cardinality/fields", "value": "(unknown)" }		],
		"costs": [
			{ "name": "Network", "value": "(unknown)" },
			{ "name": "Disk I/O", "value": "(unknown)" },
			{ "name": "CPU", "value": "(unknown)" },
			{ "name": "Cumulative Network", "value": "(unknown)" },
			{ "name": "Cumulative Disk I/O", "value": "(unknown)" },
			{ "name": "Cumulative CPU", "value": "(unknown)" }
		],
		"compiler_hints": [
			{ "name": "Cardinality", "value": "(none)" },
			{ "name": "Avg. Records/StubCall", "value": "(none)" },
			{ "name": "Avg. Values/Distinct fields", "value": "(none)" },
			{ "name": "Avg. Width (bytes)", "value": "(none)" }		]
	},
	{
		"id": 30,
		"type": "source",
		"pact": "Data Source",
		"contents": "file:///home/twalthr/repo/test/stratosphere-fulltest/TPC-H/generated_SF0.001/orders.tbl",
		"parallelism": "1",
		"subtasks_per_instance": "1",
		"global_properties": [
			{ "name": "Partitioning", "value": "RANDOM" },
			{ "name": "Partitioning Order", "value": "(none)" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"local_properties": [
			{ "name": "Order", "value": "(none)" },
			{ "name": "Grouping", "value": "not grouped" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"estimates": [
			{ "name": "Est. Output Size", "value": "162.33 KB" },
			{ "name": "Est. Cardinality", "value": "1.78 K" },
			{ "name": "Est. Cardinality/fields", "value": "(unknown)" }		],
		"costs": [
			{ "name": "Network", "value": "0 B" },
			{ "name": "Disk I/O", "value": "0 B" },
			{ "name": "CPU", "value": "0 " },
			{ "name": "Cumulative Network", "value": "0 B" },
			{ "name": "Cumulative Disk I/O", "value": "0 B" },
			{ "name": "Cumulative CPU", "value": "0 " }
		],
		"compiler_hints": [
			{ "name": "Cardinality", "value": "(none)" },
			{ "name": "Avg. Records/StubCall", "value": "(none)" },
			{ "name": "Avg. Values/Distinct fields", "value": "(none)" },
			{ "name": "Avg. Width (bytes)", "value": "91.2" }		]
	},
	{
		"id": 29,
		"type": "pact",
		"pact": "CoGroup",
		"contents": "<Unnamed CoGrouper>",
		"parallelism": "1",
		"subtasks_per_instance": "1",
		"predecessors": [
			{"id": 24, "side": "first", "ship_strategy": "Hash Partition on [0]", "local_strategy": "Sort on [0:ASC]"},
			{"id": 30, "side": "second", "ship_strategy": "Hash Partition on [1]", "local_strategy": "Sort on [1:ASC]", "temp_mode": "CACHED"}
		],
		"driver_strategy": "Co-Group",
		"global_properties": [
			{ "name": "Partitioning", "value": "RANDOM" },
			{ "name": "Partitioning Order", "value": "(none)" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"local_properties": [
			{ "name": "Order", "value": "(none)" },
			{ "name": "Grouping", "value": "not grouped" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"estimates": [
			{ "name": "Est. Output Size", "value": "(unknown)" },
			{ "name": "Est. Cardinality", "value": "(unknown)" },
			{ "name": "Est. Cardinality/fields", "value": "(unknown)" }		],
		"costs": [
			{ "name": "Network", "value": "(unknown)" },
			{ "name": "Disk I/O", "value": "(unknown)" },
			{ "name": "CPU", "value": "(unknown)" },
			{ "name": "Cumulative Network", "value": "(unknown)" },
			{ "name": "Cumulative Disk I/O", "value": "(unknown)" },
			{ "name": "Cumulative CPU", "value": "(unknown)" }
		],
		"compiler_hints": [
			{ "name": "Cardinality", "value": "(none)" },
			{ "name": "Avg. Records/StubCall", "value": "(none)" },
			{ "name": "Avg. Values/Distinct fields", "value": "(none)" },
			{ "name": "Avg. Width (bytes)", "value": "(none)" }		]
	},
	{
		"id": 28,
		"type": "pact",
		"pact": "Map",
		"contents": "<Unnamed Mapper>",
		"parallelism": "1",
		"subtasks_per_instance": "1",
		"predecessors": [
			{"id": 29, "ship_strategy": "Forward"}
		],
		"driver_strategy": "Map",
		"global_properties": [
			{ "name": "Partitioning", "value": "RANDOM" },
			{ "name": "Partitioning Order", "value": "(none)" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"local_properties": [
			{ "name": "Order", "value": "(none)" },
			{ "name": "Grouping", "value": "not grouped" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"estimates": [
			{ "name": "Est. Output Size", "value": "(unknown)" },
			{ "name": "Est. Cardinality", "value": "(unknown)" },
			{ "name": "Est. Cardinality/fields", "value": "(unknown)" }		],
		"costs": [
			{ "name": "Network", "value": "0 B" },
			{ "name": "Disk I/O", "value": "0 B" },
			{ "name": "CPU", "value": "0 " },
			{ "name": "Cumulative Network", "value": "(unknown)" },
			{ "name": "Cumulative Disk I/O", "value": "(unknown)" },
			{ "name": "Cumulative CPU", "value": "(unknown)" }
		],
		"compiler_hints": [
			{ "name": "Cardinality", "value": "(none)" },
			{ "name": "Avg. Records/StubCall", "value": "(none)" },
			{ "name": "Avg. Values/Distinct fields", "value": "(none)" },
			{ "name": "Avg. Width (bytes)", "value": "(none)" }		]
	},
	{
		"id": 27,
		"type": "pact",
		"pact": "Solution-Set Delta",
		"contents": "NoContract",
		"parallelism": "1",
		"subtasks_per_instance": "1",
		"predecessors": [
			{"id": 28, "ship_strategy": "Hash Partition on [0]", "temp_mode": "PIPELINE_BREAKER"}
		],
		"global_properties": [
			{ "name": "Partitioning", "value": "HASH_PARTITIONED" },
			{ "name": "Partitioned on", "value": "[0]" },
			{ "name": "Partitioning Order", "value": "(none)" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"local_properties": [
			{ "name": "Order", "value": "(none)" },
			{ "name": "Grouping", "value": "not grouped" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"estimates": [
			{ "name": "Est. Output Size", "value": "(unknown)" },
			{ "name": "Est. Cardinality", "value": "(unknown)" },
			{ "name": "Est. Cardinality/fields", "value": "(unknown)" }		],
		"costs": [
			{ "name": "Network", "value": "(unknown)" },
			{ "name": "Disk I/O", "value": "0 B" },
			{ "name": "CPU", "value": "0 " },
			{ "name": "Cumulative Network", "value": "(unknown)" },
			{ "name": "Cumulative Disk I/O", "value": "(unknown)" },
			{ "name": "Cumulative CPU", "value": "(unknown)" }
		],
		"compiler_hints": [
			{ "name": "Cardinality", "value": "(none)" },
			{ "name": "Avg. Records/StubCall", "value": "(none)" },
			{ "name": "Avg. Values/Distinct fields", "value": "(none)" },
			{ "name": "Avg. Width (bytes)", "value": "(none)" }		]
	}
		],
		"workset": 23,
		"solution_set": 26,
		"next_workset": 22,
		"solution_delta": 27,
		"id": 19,
		"type": "workset_iteration",
		"pact": "Workset Iteration",
		"contents": "<Unnamed Workset-Iteration>",
		"parallelism": "1",
		"subtasks_per_instance": "1",
		"predecessors": [
			{"id": 20, "side": "first", "ship_strategy": "Hash Partition on [0]"},
			{"id": 20, "side": "second", "ship_strategy": "Forward", "temp_mode": "PIPELINE_BREAKER"}
		],
		"global_properties": [
			{ "name": "Partitioning", "value": "HASH_PARTITIONED" },
			{ "name": "Partitioned on", "value": "[0]" },
			{ "name": "Partitioning Order", "value": "(none)" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"local_properties": [
			{ "name": "Order", "value": "(none)" },
			{ "name": "Grouping", "value": "not grouped" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"estimates": [
			{ "name": "Est. Output Size", "value": "24.14 KB" },
			{ "name": "Est. Cardinality", "value": "157 " },
			{ "name": "Est. Cardinality/fields", "value": "(unknown)" }		],
		"costs": [
			{ "name": "Network", "value": "(unknown)" },
			{ "name": "Disk I/O", "value": "(unknown)" },
			{ "name": "CPU", "value": "(unknown)" },
			{ "name": "Cumulative Network", "value": "(unknown)" },
			{ "name": "Cumulative Disk I/O", "value": "(unknown)" },
			{ "name": "Cumulative CPU", "value": "(unknown)" }
		],
		"compiler_hints": [
			{ "name": "Cardinality", "value": "(none)" },
			{ "name": "Avg. Records/StubCall", "value": "(none)" },
			{ "name": "Avg. Values/Distinct fields", "value": "(none)" },
			{ "name": "Avg. Width (bytes)", "value": "(none)" }		]
	},
	{
		"id": 18,
		"type": "pact",
		"pact": "Map",
		"contents": "<Unnamed Mapper>",
		"parallelism": "1",
		"subtasks_per_instance": "1",
		"predecessors": [
			{"id": 19, "ship_strategy": "Forward"}
		],
		"driver_strategy": "Map",
		"global_properties": [
			{ "name": "Partitioning", "value": "RANDOM" },
			{ "name": "Partitioning Order", "value": "(none)" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"local_properties": [
			{ "name": "Order", "value": "(none)" },
			{ "name": "Grouping", "value": "not grouped" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"estimates": [
			{ "name": "Est. Output Size", "value": "24.14 KB" },
			{ "name": "Est. Cardinality", "value": "157 " },
			{ "name": "Est. Cardinality/fields", "value": "(unknown)" }		],
		"costs": [
			{ "name": "Network", "value": "0 B" },
			{ "name": "Disk I/O", "value": "0 B" },
			{ "name": "CPU", "value": "0 " },
			{ "name": "Cumulative Network", "value": "(unknown)" },
			{ "name": "Cumulative Disk I/O", "value": "(unknown)" },
			{ "name": "Cumulative CPU", "value": "(unknown)" }
		],
		"compiler_hints": [
			{ "name": "Cardinality", "value": "(none)" },
			{ "name": "Avg. Records/StubCall", "value": "(none)" },
			{ "name": "Avg. Values/Distinct fields", "value": "(none)" },
			{ "name": "Avg. Width (bytes)", "value": "(none)" }		]
	},
	{
		"id": 17,
		"type": "pact",
		"pact": "Map",
		"contents": "<Unnamed Mapper>",
		"parallelism": "1",
		"subtasks_per_instance": "1",
		"predecessors": [
			{"id": 18, "ship_strategy": "Forward"}
		],
		"driver_strategy": "Map",
		"global_properties": [
			{ "name": "Partitioning", "value": "RANDOM" },
			{ "name": "Partitioning Order", "value": "(none)" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"local_properties": [
			{ "name": "Order", "value": "(none)" },
			{ "name": "Grouping", "value": "not grouped" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"estimates": [
			{ "name": "Est. Output Size", "value": "24.14 KB" },
			{ "name": "Est. Cardinality", "value": "157 " },
			{ "name": "Est. Cardinality/fields", "value": "(unknown)" }		],
		"costs": [
			{ "name": "Network", "value": "0 B" },
			{ "name": "Disk I/O", "value": "0 B" },
			{ "name": "CPU", "value": "0 " },
			{ "name": "Cumulative Network", "value": "(unknown)" },
			{ "name": "Cumulative Disk I/O", "value": "(unknown)" },
			{ "name": "Cumulative CPU", "value": "(unknown)" }
		],
		"compiler_hints": [
			{ "name": "Cardinality", "value": "(none)" },
			{ "name": "Avg. Records/StubCall", "value": "(none)" },
			{ "name": "Avg. Values/Distinct fields", "value": "(none)" },
			{ "name": "Avg. Width (bytes)", "value": "(none)" }		]
	},
	{
		"id": 34,
		"type": "source",
		"pact": "Data Source",
		"contents": "file:///home/twalthr/repo/test/stratosphere-fulltest/TPC-H/generated_SF0.001/lineitem.tbl",
		"parallelism": "1",
		"subtasks_per_instance": "1",
		"global_properties": [
			{ "name": "Partitioning", "value": "RANDOM" },
			{ "name": "Partitioning Order", "value": "(none)" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"local_properties": [
			{ "name": "Order", "value": "(none)" },
			{ "name": "Grouping", "value": "not grouped" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"estimates": [
			{ "name": "Est. Output Size", "value": "707.86 KB" },
			{ "name": "Est. Cardinality", "value": "5.74 K" },
			{ "name": "Est. Cardinality/fields", "value": "(unknown)" }		],
		"costs": [
			{ "name": "Network", "value": "0 B" },
			{ "name": "Disk I/O", "value": "0 B" },
			{ "name": "CPU", "value": "0 " },
			{ "name": "Cumulative Network", "value": "0 B" },
			{ "name": "Cumulative Disk I/O", "value": "0 B" },
			{ "name": "Cumulative CPU", "value": "0 " }
		],
		"compiler_hints": [
			{ "name": "Cardinality", "value": "(none)" },
			{ "name": "Avg. Records/StubCall", "value": "(none)" },
			{ "name": "Avg. Values/Distinct fields", "value": "(none)" },
			{ "name": "Avg. Width (bytes)", "value": "123.3" }		]
	},
	{
		"id": 33,
		"type": "pact",
		"pact": "Join",
		"contents": "<Unnamed Join>",
		"parallelism": "1",
		"subtasks_per_instance": "1",
		"predecessors": [
			{"id": 34, "side": "first", "ship_strategy": "Forward", "local_strategy": "Sort on [0:ASC]"},
			{"id": 9, "side": "second", "ship_strategy": "Broadcast", "local_strategy": "Sort on [0:ASC]"}
		],
		"driver_strategy": "Merge",
		"global_properties": [
			{ "name": "Partitioning", "value": "RANDOM" },
			{ "name": "Partitioning Order", "value": "(none)" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"local_properties": [
			{ "name": "Order", "value": "(none)" },
			{ "name": "Grouping", "value": "not grouped" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"estimates": [
			{ "name": "Est. Output Size", "value": "(unknown)" },
			{ "name": "Est. Cardinality", "value": "(unknown)" },
			{ "name": "Est. Cardinality/fields", "value": "(unknown)" }		],
		"costs": [
			{ "name": "Network", "value": "162.33 KB" },
			{ "name": "Disk I/O", "value": "1.74 MB" },
			{ "name": "CPU", "value": "6.09 M" },
			{ "name": "Cumulative Network", "value": "162.33 KB" },
			{ "name": "Cumulative Disk I/O", "value": "1.74 MB" },
			{ "name": "Cumulative CPU", "value": "6.09 M" }
		],
		"compiler_hints": [
			{ "name": "Cardinality", "value": "(none)" },
			{ "name": "Avg. Records/StubCall", "value": "(none)" },
			{ "name": "Avg. Values/Distinct fields", "value": "(none)" },
			{ "name": "Avg. Width (bytes)", "value": "(none)" }		]
	},
	{
		"id": 32,
		"type": "pact",
		"pact": "Reduce",
		"contents": "<Unnamed Reducer>",
		"parallelism": "1",
		"subtasks_per_instance": "1",
		"predecessors": [
			{"id": 33, "ship_strategy": "Hash Partition on [0]", "local_strategy": "Sort on [0:ASC]"}
		],
		"driver_strategy": "Ordered Grouping",
		"global_properties": [
			{ "name": "Partitioning", "value": "RANDOM" },
			{ "name": "Partitioning Order", "value": "(none)" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"local_properties": [
			{ "name": "Order", "value": "(none)" },
			{ "name": "Grouping", "value": "not grouped" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"estimates": [
			{ "name": "Est. Output Size", "value": "(unknown)" },
			{ "name": "Est. Cardinality", "value": "(unknown)" },
			{ "name": "Est. Cardinality/fields", "value": "(unknown)" }		],
		"costs": [
			{ "name": "Network", "value": "(unknown)" },
			{ "name": "Disk I/O", "value": "(unknown)" },
			{ "name": "CPU", "value": "(unknown)" },
			{ "name": "Cumulative Network", "value": "(unknown)" },
			{ "name": "Cumulative Disk I/O", "value": "(unknown)" },
			{ "name": "Cumulative CPU", "value": "(unknown)" }
		],
		"compiler_hints": [
			{ "name": "Cardinality", "value": "(none)" },
			{ "name": "Avg. Records/StubCall", "value": "(none)" },
			{ "name": "Avg. Values/Distinct fields", "value": "(none)" },
			{ "name": "Avg. Width (bytes)", "value": "(none)" }		]
	},
	{
		"id": 37,
		"type": "pact",
		"pact": "Cross",
		"contents": "<Unnamed Crosser>",
		"parallelism": "1",
		"subtasks_per_instance": "1",
		"predecessors": [
			{"id": 34, "side": "first", "ship_strategy": "Forward"},
			{"id": 9, "side": "second", "ship_strategy": "Broadcast"}
		],
		"driver_strategy": "Nested Loops (Blocked Outer: lineitem)",
		"global_properties": [
			{ "name": "Partitioning", "value": "RANDOM" },
			{ "name": "Partitioning Order", "value": "(none)" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"local_properties": [
			{ "name": "Order", "value": "(none)" },
			{ "name": "Grouping", "value": "not grouped" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"estimates": [
			{ "name": "Est. Output Size", "value": "2.18 GB" },
			{ "name": "Est. Cardinality", "value": "10.21 M" },
			{ "name": "Est. Cardinality/fields", "value": "(unknown)" }		],
		"costs": [
			{ "name": "Network", "value": "162.33 KB" },
			{ "name": "Disk I/O", "value": "162.33 KB" },
			{ "name": "CPU", "value": "162.33 K" },
			{ "name": "Cumulative Network", "value": "162.33 KB" },
			{ "name": "Cumulative Disk I/O", "value": "162.33 KB" },
			{ "name": "Cumulative CPU", "value": "162.33 K" }
		],
		"compiler_hints": [
			{ "name": "Cardinality", "value": "(none)" },
			{ "name": "Avg. Records/StubCall", "value": "(none)" },
			{ "name": "Avg. Values/Distinct fields", "value": "(none)" },
			{ "name": "Avg. Width (bytes)", "value": "(none)" }		]
	},
	{
		"id": 36,
		"type": "pact",
		"pact": "Map",
		"contents": "<Unnamed Mapper>",
		"parallelism": "1",
		"subtasks_per_instance": "1",
		"predecessors": [
			{"id": 37, "ship_strategy": "Forward"}
		],
		"driver_strategy": "Map",
		"global_properties": [
			{ "name": "Partitioning", "value": "RANDOM" },
			{ "name": "Partitioning Order", "value": "(none)" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"local_properties": [
			{ "name": "Order", "value": "(none)" },
			{ "name": "Grouping", "value": "not grouped" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"estimates": [
			{ "name": "Est. Output Size", "value": "2.18 GB" },
			{ "name": "Est. Cardinality", "value": "10.21 M" },
			{ "name": "Est. Cardinality/fields", "value": "(unknown)" }		],
		"costs": [
			{ "name": "Network", "value": "0 B" },
			{ "name": "Disk I/O", "value": "0 B" },
			{ "name": "CPU", "value": "0 " },
			{ "name": "Cumulative Network", "value": "162.33 KB" },
			{ "name": "Cumulative Disk I/O", "value": "162.33 KB" },
			{ "name": "Cumulative CPU", "value": "162.33 K" }
		],
		"compiler_hints": [
			{ "name": "Cardinality", "value": "(none)" },
			{ "name": "Avg. Records/StubCall", "value": "(none)" },
			{ "name": "Avg. Values/Distinct fields", "value": "(none)" },
			{ "name": "Avg. Width (bytes)", "value": "(none)" }		]
	},
	{
		"id": 35,
		"type": "pact",
		"pact": "Reduce",
		"contents": "<Unnamed Reducer>",
		"parallelism": "1",
		"subtasks_per_instance": "1",
		"predecessors": [
			{"id": 36, "ship_strategy": "Hash Partition on [0]", "local_strategy": "Sort on [0:ASC]"}
		],
		"driver_strategy": "Ordered Grouping",
		"global_properties": [
			{ "name": "Partitioning", "value": "RANDOM" },
			{ "name": "Partitioning Order", "value": "(none)" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"local_properties": [
			{ "name": "Order", "value": "(none)" },
			{ "name": "Grouping", "value": "not grouped" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"estimates": [
			{ "name": "Est. Output Size", "value": "(unknown)" },
			{ "name": "Est. Cardinality", "value": "(unknown)" },
			{ "name": "Est. Cardinality/fields", "value": "(unknown)" }		],
		"costs": [
			{ "name": "Network", "value": "2.18 GB" },
			{ "name": "Disk I/O", "value": "4.37 GB" },
			{ "name": "CPU", "value": "15.30 G" },
			{ "name": "Cumulative Network", "value": "2.18 GB" },
			{ "name": "Cumulative Disk I/O", "value": "4.37 GB" },
			{ "name": "Cumulative CPU", "value": "15.30 G" }
		],
		"compiler_hints": [
			{ "name": "Cardinality", "value": "(none)" },
			{ "name": "Avg. Records/StubCall", "value": "(none)" },
			{ "name": "Avg. Values/Distinct fields", "value": "(none)" },
			{ "name": "Avg. Width (bytes)", "value": "(none)" }		]
	},
	{
		"id": 31,
		"type": "pact",
		"pact": "CoGroup",
		"contents": "<Unnamed CoGrouper>",
		"parallelism": "1",
		"subtasks_per_instance": "1",
		"predecessors": [
			{"id": 32, "side": "first", "ship_strategy": "Hash Partition on [0]", "local_strategy": "Sort on [0:ASC]"},
			{"id": 35, "side": "second", "ship_strategy": "Hash Partition on [0]", "local_strategy": "Sort on [0:ASC]"}
		],
		"driver_strategy": "Co-Group",
		"global_properties": [
			{ "name": "Partitioning", "value": "RANDOM" },
			{ "name": "Partitioning Order", "value": "(none)" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"local_properties": [
			{ "name": "Order", "value": "(none)" },
			{ "name": "Grouping", "value": "not grouped" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"estimates": [
			{ "name": "Est. Output Size", "value": "(unknown)" },
			{ "name": "Est. Cardinality", "value": "(unknown)" },
			{ "name": "Est. Cardinality/fields", "value": "(unknown)" }		],
		"costs": [
			{ "name": "Network", "value": "(unknown)" },
			{ "name": "Disk I/O", "value": "(unknown)" },
			{ "name": "CPU", "value": "(unknown)" },
			{ "name": "Cumulative Network", "value": "(unknown)" },
			{ "name": "Cumulative Disk I/O", "value": "(unknown)" },
			{ "name": "Cumulative CPU", "value": "(unknown)" }
		],
		"compiler_hints": [
			{ "name": "Cardinality", "value": "(none)" },
			{ "name": "Avg. Records/StubCall", "value": "(none)" },
			{ "name": "Avg. Values/Distinct fields", "value": "(none)" },
			{ "name": "Avg. Width (bytes)", "value": "(none)" }		]
	},
	{
		"id": 16,
		"type": "pact",
		"pact": "Union",
		"contents": "",
		"parallelism": "1",
		"subtasks_per_instance": "1",
		"predecessors": [
			{"id": 17, "side": "first", "ship_strategy": "Broadcast"},
			{"id": 31, "side": "second", "ship_strategy": "Broadcast"}
		],
		"global_properties": [
			{ "name": "Partitioning", "value": "RANDOM" },
			{ "name": "Partitioning Order", "value": "(none)" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"local_properties": [
			{ "name": "Order", "value": "(none)" },
			{ "name": "Grouping", "value": "not grouped" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"estimates": [
			{ "name": "Est. Output Size", "value": "(unknown)" },
			{ "name": "Est. Cardinality", "value": "(unknown)" },
			{ "name": "Est. Cardinality/fields", "value": "(unknown)" }		],
		"compiler_hints": [
			{ "name": "Cardinality", "value": "(none)" },
			{ "name": "Avg. Records/StubCall", "value": "(none)" },
			{ "name": "Avg. Values/Distinct fields", "value": "(none)" },
			{ "name": "Avg. Width (bytes)", "value": "(none)" }		]
	},
	{
		"id": 15,
		"type": "pact",
		"pact": "Map",
		"contents": "<Unnamed Mapper>",
		"parallelism": "1",
		"subtasks_per_instance": "1",
		"predecessors": [
			{"id": 17, "ship_strategy": "Broadcast"},
			{"id": 31, "ship_strategy": "Broadcast"}
		],
		"driver_strategy": "Map",
		"global_properties": [
			{ "name": "Partitioning", "value": "RANDOM" },
			{ "name": "Partitioning Order", "value": "(none)" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"local_properties": [
			{ "name": "Order", "value": "(none)" },
			{ "name": "Grouping", "value": "not grouped" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"estimates": [
			{ "name": "Est. Output Size", "value": "(unknown)" },
			{ "name": "Est. Cardinality", "value": "(unknown)" },
			{ "name": "Est. Cardinality/fields", "value": "(unknown)" }		],
		"costs": [
			{ "name": "Network", "value": "0 B" },
			{ "name": "Disk I/O", "value": "0 B" },
			{ "name": "CPU", "value": "0 " },
			{ "name": "Cumulative Network", "value": "(unknown)" },
			{ "name": "Cumulative Disk I/O", "value": "(unknown)" },
			{ "name": "Cumulative CPU", "value": "(unknown)" }
		],
		"compiler_hints": [
			{ "name": "Cardinality", "value": "(none)" },
			{ "name": "Avg. Records/StubCall", "value": "(none)" },
			{ "name": "Avg. Values/Distinct fields", "value": "(none)" },
			{ "name": "Avg. Width (bytes)", "value": "(none)" }		]
	},
	{
		"id": 45,
		"type": "source",
		"pact": "Data Source",
		"contents": "file:///home/twalthr/repo/test/stratosphere-fulltest/TPC-H/generated_SF0.001/nation.tbl",
		"parallelism": "1",
		"subtasks_per_instance": "1",
		"global_properties": [
			{ "name": "Partitioning", "value": "RANDOM" },
			{ "name": "Partitioning Order", "value": "(none)" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"local_properties": [
			{ "name": "Order", "value": "(none)" },
			{ "name": "Grouping", "value": "not grouped" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"estimates": [
			{ "name": "Est. Output Size", "value": "2.30 KB" },
			{ "name": "Est. Cardinality", "value": "27 " },
			{ "name": "Est. Cardinality/fields", "value": "(unknown)" }		],
		"costs": [
			{ "name": "Network", "value": "0 B" },
			{ "name": "Disk I/O", "value": "0 B" },
			{ "name": "CPU", "value": "0 " },
			{ "name": "Cumulative Network", "value": "0 B" },
			{ "name": "Cumulative Disk I/O", "value": "0 B" },
			{ "name": "Cumulative CPU", "value": "0 " }
		],
		"compiler_hints": [
			{ "name": "Cardinality", "value": "(none)" },
			{ "name": "Avg. Records/StubCall", "value": "(none)" },
			{ "name": "Avg. Values/Distinct fields", "value": "(none)" },
			{ "name": "Avg. Width (bytes)", "value": "85.5" }		]
	},
	{
		"id": 44,
		"type": "pact",
		"pact": "Join",
		"contents": "<Unnamed Join>",
		"parallelism": "1",
		"subtasks_per_instance": "1",
		"predecessors": [
			{"id": 21, "side": "first", "ship_strategy": "Forward", "local_strategy": "Sort on [3:ASC]"},
			{"id": 45, "side": "second", "ship_strategy": "Broadcast", "local_strategy": "Sort on [0:ASC]"}
		],
		"driver_strategy": "Merge",
		"global_properties": [
			{ "name": "Partitioning", "value": "RANDOM" },
			{ "name": "Partitioning Order", "value": "(none)" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"local_properties": [
			{ "name": "Order", "value": "(none)" },
			{ "name": "Grouping", "value": "not grouped" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"estimates": [
			{ "name": "Est. Output Size", "value": "(unknown)" },
			{ "name": "Est. Cardinality", "value": "(unknown)" },
			{ "name": "Est. Cardinality/fields", "value": "(unknown)" }		],
		"costs": [
			{ "name": "Network", "value": "2.30 KB" },
			{ "name": "Disk I/O", "value": "52.90 KB" },
			{ "name": "CPU", "value": "185.17 K" },
			{ "name": "Cumulative Network", "value": "2.30 KB" },
			{ "name": "Cumulative Disk I/O", "value": "52.90 KB" },
			{ "name": "Cumulative CPU", "value": "185.17 K" }
		],
		"compiler_hints": [
			{ "name": "Cardinality", "value": "(none)" },
			{ "name": "Avg. Records/StubCall", "value": "(none)" },
			{ "name": "Avg. Values/Distinct fields", "value": "(none)" },
			{ "name": "Avg. Width (bytes)", "value": "(none)" }		]
	},
	{
		"id": 46,
		"type": "source",
		"pact": "Data Source",
		"contents": "file:///home/twalthr/repo/test/stratosphere-fulltest/TPC-H/generated_SF0.001/region.tbl",
		"parallelism": "1",
		"subtasks_per_instance": "1",
		"global_properties": [
			{ "name": "Partitioning", "value": "RANDOM" },
			{ "name": "Partitioning Order", "value": "(none)" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"local_properties": [
			{ "name": "Order", "value": "(none)" },
			{ "name": "Grouping", "value": "not grouped" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"estimates": [
			{ "name": "Est. Output Size", "value": "455 B" },
			{ "name": "Est. Cardinality", "value": "5 " },
			{ "name": "Est. Cardinality/fields", "value": "(unknown)" }		],
		"costs": [
			{ "name": "Network", "value": "0 B" },
			{ "name": "Disk I/O", "value": "0 B" },
			{ "name": "CPU", "value": "0 " },
			{ "name": "Cumulative Network", "value": "0 B" },
			{ "name": "Cumulative Disk I/O", "value": "0 B" },
			{ "name": "Cumulative CPU", "value": "0 " }
		],
		"compiler_hints": [
			{ "name": "Cardinality", "value": "(none)" },
			{ "name": "Avg. Records/StubCall", "value": "(none)" },
			{ "name": "Avg. Values/Distinct fields", "value": "(none)" },
			{ "name": "Avg. Width (bytes)", "value": "91.0" }		]
	},
	{
		"id": 43,
		"type": "pact",
		"pact": "Join",
		"contents": "<Unnamed Join>",
		"parallelism": "1",
		"subtasks_per_instance": "1",
		"predecessors": [
			{"id": 44, "side": "first", "ship_strategy": "Broadcast", "local_strategy": "Sort on [10:ASC]"},
			{"id": 46, "side": "second", "ship_strategy": "Forward", "local_strategy": "Sort on [0:ASC]"}
		],
		"driver_strategy": "Merge",
		"global_properties": [
			{ "name": "Partitioning", "value": "RANDOM" },
			{ "name": "Partitioning Order", "value": "(none)" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"local_properties": [
			{ "name": "Order", "value": "(none)" },
			{ "name": "Grouping", "value": "not grouped" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"estimates": [
			{ "name": "Est. Output Size", "value": "(unknown)" },
			{ "name": "Est. Cardinality", "value": "(unknown)" },
			{ "name": "Est. Cardinality/fields", "value": "(unknown)" }		],
		"costs": [
			{ "name": "Network", "value": "(unknown)" },
			{ "name": "Disk I/O", "value": "(unknown)" },
			{ "name": "CPU", "value": "(unknown)" },
			{ "name": "Cumulative Network", "value": "(unknown)" },
			{ "name": "Cumulative Disk I/O", "value": "(unknown)" },
			{ "name": "Cumulative CPU", "value": "(unknown)" }
		],
		"compiler_hints": [
			{ "name": "Cardinality", "value": "(none)" },
			{ "name": "Avg. Records/StubCall", "value": "(none)" },
			{ "name": "Avg. Values/Distinct fields", "value": "(none)" },
			{ "name": "Avg. Width (bytes)", "value": "(none)" }		]
	},
	{
		"id": 42,
		"type": "pact",
		"pact": "Map",
		"contents": "<Unnamed Mapper>",
		"parallelism": "1",
		"subtasks_per_instance": "1",
		"predecessors": [
			{"id": 43, "ship_strategy": "Forward"}
		],
		"driver_strategy": "Map",
		"global_properties": [
			{ "name": "Partitioning", "value": "RANDOM" },
			{ "name": "Partitioning Order", "value": "(none)" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"local_properties": [
			{ "name": "Order", "value": "(none)" },
			{ "name": "Grouping", "value": "not grouped" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"estimates": [
			{ "name": "Est. Output Size", "value": "(unknown)" },
			{ "name": "Est. Cardinality", "value": "(unknown)" },
			{ "name": "Est. Cardinality/fields", "value": "(unknown)" }		],
		"costs": [
			{ "name": "Network", "value": "0 B" },
			{ "name": "Disk I/O", "value": "0 B" },
			{ "name": "CPU", "value": "0 " },
			{ "name": "Cumulative Network", "value": "(unknown)" },
			{ "name": "Cumulative Disk I/O", "value": "(unknown)" },
			{ "name": "Cumulative CPU", "value": "(unknown)" }
		],
		"compiler_hints": [
			{ "name": "Cardinality", "value": "(none)" },
			{ "name": "Avg. Records/StubCall", "value": "(none)" },
			{ "name": "Avg. Values/Distinct fields", "value": "(none)" },
			{ "name": "Avg. Width (bytes)", "value": "(none)" }		]
	},
	{
		"id": 47,
		"type": "pact",
		"pact": "Map",
		"contents": "<Unnamed Mapper>",
		"parallelism": "1",
		"subtasks_per_instance": "1",
		"predecessors": [
			{"id": 43, "ship_strategy": "Forward"}
		],
		"driver_strategy": "Map",
		"global_properties": [
			{ "name": "Partitioning", "value": "RANDOM" },
			{ "name": "Partitioning Order", "value": "(none)" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"local_properties": [
			{ "name": "Order", "value": "(none)" },
			{ "name": "Grouping", "value": "not grouped" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"estimates": [
			{ "name": "Est. Output Size", "value": "(unknown)" },
			{ "name": "Est. Cardinality", "value": "(unknown)" },
			{ "name": "Est. Cardinality/fields", "value": "(unknown)" }		],
		"costs": [
			{ "name": "Network", "value": "0 B" },
			{ "name": "Disk I/O", "value": "0 B" },
			{ "name": "CPU", "value": "0 " },
			{ "name": "Cumulative Network", "value": "(unknown)" },
			{ "name": "Cumulative Disk I/O", "value": "(unknown)" },
			{ "name": "Cumulative CPU", "value": "(unknown)" }
		],
		"compiler_hints": [
			{ "name": "Cardinality", "value": "(none)" },
			{ "name": "Avg. Records/StubCall", "value": "(none)" },
			{ "name": "Avg. Values/Distinct fields", "value": "(none)" },
			{ "name": "Avg. Width (bytes)", "value": "(none)" }		]
	},
	{
		"id": 48,
		"type": "pact",
		"pact": "Map",
		"contents": "<Unnamed Mapper>",
		"parallelism": "1",
		"subtasks_per_instance": "1",
		"predecessors": [
			{"id": 43, "ship_strategy": "Forward"}
		],
		"driver_strategy": "Map",
		"global_properties": [
			{ "name": "Partitioning", "value": "RANDOM" },
			{ "name": "Partitioning Order", "value": "(none)" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"local_properties": [
			{ "name": "Order", "value": "(none)" },
			{ "name": "Grouping", "value": "not grouped" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"estimates": [
			{ "name": "Est. Output Size", "value": "(unknown)" },
			{ "name": "Est. Cardinality", "value": "(unknown)" },
			{ "name": "Est. Cardinality/fields", "value": "(unknown)" }		],
		"costs": [
			{ "name": "Network", "value": "0 B" },
			{ "name": "Disk I/O", "value": "0 B" },
			{ "name": "CPU", "value": "0 " },
			{ "name": "Cumulative Network", "value": "(unknown)" },
			{ "name": "Cumulative Disk I/O", "value": "(unknown)" },
			{ "name": "Cumulative CPU", "value": "(unknown)" }
		],
		"compiler_hints": [
			{ "name": "Cardinality", "value": "(none)" },
			{ "name": "Avg. Records/StubCall", "value": "(none)" },
			{ "name": "Avg. Values/Distinct fields", "value": "(none)" },
			{ "name": "Avg. Width (bytes)", "value": "(none)" }		]
	},
	{
		"id": 41,
		"type": "pact",
		"pact": "Union",
		"contents": "",
		"parallelism": "1",
		"subtasks_per_instance": "1",
		"predecessors": [
			{"id": 42, "side": "first", "ship_strategy": "Broadcast"},
			{"id": 47, "side": "second", "ship_strategy": "Broadcast"},
			{"id": 48, "side": "second", "ship_strategy": "Forward"}
		],
		"global_properties": [
			{ "name": "Partitioning", "value": "RANDOM" },
			{ "name": "Partitioning Order", "value": "(none)" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"local_properties": [
			{ "name": "Order", "value": "(none)" },
			{ "name": "Grouping", "value": "not grouped" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"estimates": [
			{ "name": "Est. Output Size", "value": "(unknown)" },
			{ "name": "Est. Cardinality", "value": "(unknown)" },
			{ "name": "Est. Cardinality/fields", "value": "(unknown)" }		],
		"compiler_hints": [
			{ "name": "Cardinality", "value": "(none)" },
			{ "name": "Avg. Records/StubCall", "value": "(none)" },
			{ "name": "Avg. Values/Distinct fields", "value": "(none)" },
			{ "name": "Avg. Width (bytes)", "value": "(none)" }		]
	},
	{
		"id": 40,
		"type": "pact",
		"pact": "Map",
		"contents": "<Unnamed Mapper>",
		"parallelism": "1",
		"subtasks_per_instance": "1",
		"predecessors": [
			{"id": 42, "ship_strategy": "Broadcast"},
			{"id": 47, "ship_strategy": "Broadcast"},
			{"id": 48, "ship_strategy": "Forward"}
		],
		"driver_strategy": "Map",
		"global_properties": [
			{ "name": "Partitioning", "value": "RANDOM" },
			{ "name": "Partitioning Order", "value": "(none)" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"local_properties": [
			{ "name": "Order", "value": "(none)" },
			{ "name": "Grouping", "value": "not grouped" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"estimates": [
			{ "name": "Est. Output Size", "value": "(unknown)" },
			{ "name": "Est. Cardinality", "value": "(unknown)" },
			{ "name": "Est. Cardinality/fields", "value": "(unknown)" }		],
		"costs": [
			{ "name": "Network", "value": "0 B" },
			{ "name": "Disk I/O", "value": "0 B" },
			{ "name": "CPU", "value": "0 " },
			{ "name": "Cumulative Network", "value": "(unknown)" },
			{ "name": "Cumulative Disk I/O", "value": "(unknown)" },
			{ "name": "Cumulative CPU", "value": "(unknown)" }
		],
		"compiler_hints": [
			{ "name": "Cardinality", "value": "(none)" },
			{ "name": "Avg. Records/StubCall", "value": "(none)" },
			{ "name": "Avg. Values/Distinct fields", "value": "(none)" },
			{ "name": "Avg. Width (bytes)", "value": "(none)" }		]
	},
	{
		"id": 39,
		"type": "pact",
		"pact": "CoGroup",
		"contents": "<Unnamed CoGrouper>",
		"parallelism": "1",
		"subtasks_per_instance": "1",
		"predecessors": [
			{"id": 21, "side": "first", "ship_strategy": "Hash Partition on [0]", "local_strategy": "Sort on [0:ASC]"},
			{"id": 40, "side": "second", "ship_strategy": "Hash Partition on [0]", "local_strategy": "Sort on [0:ASC]"}
		],
		"driver_strategy": "Co-Group",
		"global_properties": [
			{ "name": "Partitioning", "value": "RANDOM" },
			{ "name": "Partitioning Order", "value": "(none)" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"local_properties": [
			{ "name": "Order", "value": "(none)" },
			{ "name": "Grouping", "value": "not grouped" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"estimates": [
			{ "name": "Est. Output Size", "value": "(unknown)" },
			{ "name": "Est. Cardinality", "value": "(unknown)" },
			{ "name": "Est. Cardinality/fields", "value": "(unknown)" }		],
		"costs": [
			{ "name": "Network", "value": "(unknown)" },
			{ "name": "Disk I/O", "value": "(unknown)" },
			{ "name": "CPU", "value": "(unknown)" },
			{ "name": "Cumulative Network", "value": "(unknown)" },
			{ "name": "Cumulative Disk I/O", "value": "(unknown)" },
			{ "name": "Cumulative CPU", "value": "(unknown)" }
		],
		"compiler_hints": [
			{ "name": "Cardinality", "value": "(none)" },
			{ "name": "Avg. Records/StubCall", "value": "(none)" },
			{ "name": "Avg. Values/Distinct fields", "value": "(none)" },
			{ "name": "Avg. Width (bytes)", "value": "(none)" }		]
	},
	{
		"id": 38,
		"type": "pact",
		"pact": "Map",
		"contents": "<Unnamed Mapper>",
		"parallelism": "1",
		"subtasks_per_instance": "1",
		"predecessors": [
			{"id": 39, "ship_strategy": "Forward"}
		],
		"driver_strategy": "Map",
		"global_properties": [
			{ "name": "Partitioning", "value": "RANDOM" },
			{ "name": "Partitioning Order", "value": "(none)" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"local_properties": [
			{ "name": "Order", "value": "(none)" },
			{ "name": "Grouping", "value": "not grouped" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"estimates": [
			{ "name": "Est. Output Size", "value": "(unknown)" },
			{ "name": "Est. Cardinality", "value": "(unknown)" },
			{ "name": "Est. Cardinality/fields", "value": "(unknown)" }		],
		"costs": [
			{ "name": "Network", "value": "0 B" },
			{ "name": "Disk I/O", "value": "0 B" },
			{ "name": "CPU", "value": "0 " },
			{ "name": "Cumulative Network", "value": "(unknown)" },
			{ "name": "Cumulative Disk I/O", "value": "(unknown)" },
			{ "name": "Cumulative CPU", "value": "(unknown)" }
		],
		"compiler_hints": [
			{ "name": "Cardinality", "value": "(none)" },
			{ "name": "Avg. Records/StubCall", "value": "(none)" },
			{ "name": "Avg. Values/Distinct fields", "value": "(none)" },
			{ "name": "Avg. Width (bytes)", "value": "(none)" }		]
	},
	{
		"id": 14,
		"type": "pact",
		"pact": "CoGroup",
		"contents": "<Unnamed CoGrouper>",
		"parallelism": "1",
		"subtasks_per_instance": "1",
		"predecessors": [
			{"id": 15, "side": "first", "ship_strategy": "Hash Partition on [0]", "local_strategy": "Sort on [0:ASC]"},
			{"id": 38, "side": "second", "ship_strategy": "Hash Partition on [0]", "local_strategy": "Sort on [0:ASC]"}
		],
		"driver_strategy": "Co-Group",
		"global_properties": [
			{ "name": "Partitioning", "value": "RANDOM" },
			{ "name": "Partitioning Order", "value": "(none)" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"local_properties": [
			{ "name": "Order", "value": "(none)" },
			{ "name": "Grouping", "value": "not grouped" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"estimates": [
			{ "name": "Est. Output Size", "value": "(unknown)" },
			{ "name": "Est. Cardinality", "value": "(unknown)" },
			{ "name": "Est. Cardinality/fields", "value": "(unknown)" }		],
		"costs": [
			{ "name": "Network", "value": "(unknown)" },
			{ "name": "Disk I/O", "value": "(unknown)" },
			{ "name": "CPU", "value": "(unknown)" },
			{ "name": "Cumulative Network", "value": "(unknown)" },
			{ "name": "Cumulative Disk I/O", "value": "(unknown)" },
			{ "name": "Cumulative CPU", "value": "(unknown)" }
		],
		"compiler_hints": [
			{ "name": "Cardinality", "value": "(none)" },
			{ "name": "Avg. Records/StubCall", "value": "(none)" },
			{ "name": "Avg. Values/Distinct fields", "value": "(none)" },
			{ "name": "Avg. Width (bytes)", "value": "(none)" }		]
	},
	{
		"id": 13,
		"type": "pact",
		"pact": "Join",
		"contents": "<Unnamed Join>",
		"parallelism": "1",
		"subtasks_per_instance": "1",
		"predecessors": [
			{"id": 14, "side": "first", "ship_strategy": "Broadcast"},
			{"id": 9, "side": "second", "ship_strategy": "Forward", "temp_mode": "PIPELINE_BREAKER"}
		],
		"driver_strategy": "Hybrid Hash (build: <Unnamed CoGrouper>)",
		"global_properties": [
			{ "name": "Partitioning", "value": "RANDOM" },
			{ "name": "Partitioning Order", "value": "(none)" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"local_properties": [
			{ "name": "Order", "value": "(none)" },
			{ "name": "Grouping", "value": "not grouped" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"estimates": [
			{ "name": "Est. Output Size", "value": "(unknown)" },
			{ "name": "Est. Cardinality", "value": "(unknown)" },
			{ "name": "Est. Cardinality/fields", "value": "(unknown)" }		],
		"costs": [
			{ "name": "Network", "value": "(unknown)" },
			{ "name": "Disk I/O", "value": "(unknown)" },
			{ "name": "CPU", "value": "(unknown)" },
			{ "name": "Cumulative Network", "value": "(unknown)" },
			{ "name": "Cumulative Disk I/O", "value": "(unknown)" },
			{ "name": "Cumulative CPU", "value": "(unknown)" }
		],
		"compiler_hints": [
			{ "name": "Cardinality", "value": "(none)" },
			{ "name": "Avg. Records/StubCall", "value": "(none)" },
			{ "name": "Avg. Values/Distinct fields", "value": "(none)" },
			{ "name": "Avg. Width (bytes)", "value": "(none)" }		]
	},
	{
		"id": 50,
		"type": "source",
		"pact": "Data Source",
		"contents": "file:///home/twalthr/repo/test/stratosphere-fulltest/TPC-H/generated_SF0.001/orders.tbl",
		"parallelism": "1",
		"subtasks_per_instance": "1",
		"global_properties": [
			{ "name": "Partitioning", "value": "RANDOM" },
			{ "name": "Partitioning Order", "value": "(none)" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"local_properties": [
			{ "name": "Order", "value": "(none)" },
			{ "name": "Grouping", "value": "not grouped" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"estimates": [
			{ "name": "Est. Output Size", "value": "162.33 KB" },
			{ "name": "Est. Cardinality", "value": "1.78 K" },
			{ "name": "Est. Cardinality/fields", "value": "(unknown)" }		],
		"costs": [
			{ "name": "Network", "value": "0 B" },
			{ "name": "Disk I/O", "value": "0 B" },
			{ "name": "CPU", "value": "0 " },
			{ "name": "Cumulative Network", "value": "0 B" },
			{ "name": "Cumulative Disk I/O", "value": "0 B" },
			{ "name": "Cumulative CPU", "value": "0 " }
		],
		"compiler_hints": [
			{ "name": "Cardinality", "value": "(none)" },
			{ "name": "Avg. Records/StubCall", "value": "(none)" },
			{ "name": "Avg. Values/Distinct fields", "value": "(none)" },
			{ "name": "Avg. Width (bytes)", "value": "91.2" }		]
	},
	{
		"id": 49,
		"type": "pact",
		"pact": "Map",
		"contents": "<Unnamed Mapper>",
		"parallelism": "1",
		"subtasks_per_instance": "1",
		"predecessors": [
			{"id": 50, "ship_strategy": "Forward"}
		],
		"driver_strategy": "Map",
		"global_properties": [
			{ "name": "Partitioning", "value": "RANDOM" },
			{ "name": "Partitioning Order", "value": "(none)" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"local_properties": [
			{ "name": "Order", "value": "(none)" },
			{ "name": "Grouping", "value": "not grouped" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"estimates": [
			{ "name": "Est. Output Size", "value": "162.33 KB" },
			{ "name": "Est. Cardinality", "value": "1.78 K" },
			{ "name": "Est. Cardinality/fields", "value": "(unknown)" }		],
		"costs": [
			{ "name": "Network", "value": "0 B" },
			{ "name": "Disk I/O", "value": "0 B" },
			{ "name": "CPU", "value": "0 " },
			{ "name": "Cumulative Network", "value": "0 B" },
			{ "name": "Cumulative Disk I/O", "value": "0 B" },
			{ "name": "Cumulative CPU", "value": "0 " }
		],
		"compiler_hints": [
			{ "name": "Cardinality", "value": "(none)" },
			{ "name": "Avg. Records/StubCall", "value": "(none)" },
			{ "name": "Avg. Values/Distinct fields", "value": "(none)" },
			{ "name": "Avg. Width (bytes)", "value": "(none)" }		]
	},
	{
		"id": 12,
		"type": "pact",
		"pact": "CoGroup",
		"contents": "<Unnamed CoGrouper>",
		"parallelism": "1",
		"subtasks_per_instance": "1",
		"predecessors": [
			{"id": 13, "side": "first", "ship_strategy": "Hash Partition on [0]", "local_strategy": "Sort on [0:ASC]"},
			{"id": 49, "side": "second", "ship_strategy": "Hash Partition on [0]", "local_strategy": "Sort on [0:ASC]"}
		],
		"driver_strategy": "Co-Group",
		"global_properties": [
			{ "name": "Partitioning", "value": "RANDOM" },
			{ "name": "Partitioning Order", "value": "(none)" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"local_properties": [
			{ "name": "Order", "value": "(none)" },
			{ "name": "Grouping", "value": "not grouped" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"estimates": [
			{ "name": "Est. Output Size", "value": "(unknown)" },
			{ "name": "Est. Cardinality", "value": "(unknown)" },
			{ "name": "Est. Cardinality/fields", "value": "(unknown)" }		],
		"costs": [
			{ "name": "Network", "value": "(unknown)" },
			{ "name": "Disk I/O", "value": "(unknown)" },
			{ "name": "CPU", "value": "(unknown)" },
			{ "name": "Cumulative Network", "value": "(unknown)" },
			{ "name": "Cumulative Disk I/O", "value": "(unknown)" },
			{ "name": "Cumulative CPU", "value": "(unknown)" }
		],
		"compiler_hints": [
			{ "name": "Cardinality", "value": "(none)" },
			{ "name": "Avg. Records/StubCall", "value": "(none)" },
			{ "name": "Avg. Values/Distinct fields", "value": "(none)" },
			{ "name": "Avg. Width (bytes)", "value": "(none)" }		]
	},
	{
		"id": 51,
		"type": "pact",
		"pact": "Map",
		"contents": "<Unnamed Mapper>",
		"parallelism": "1",
		"subtasks_per_instance": "1",
		"predecessors": [
			{"id": 6, "ship_strategy": "Forward"}
		],
		"driver_strategy": "Map",
		"global_properties": [
			{ "name": "Partitioning", "value": "RANDOM" },
			{ "name": "Partitioning Order", "value": "(none)" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"local_properties": [
			{ "name": "Order", "value": "(none)" },
			{ "name": "Grouping", "value": "not grouped" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"estimates": [
			{ "name": "Est. Output Size", "value": "(unknown)" },
			{ "name": "Est. Cardinality", "value": "(unknown)" },
			{ "name": "Est. Cardinality/fields", "value": "(unknown)" }		],
		"costs": [
			{ "name": "Network", "value": "0 B" },
			{ "name": "Disk I/O", "value": "0 B" },
			{ "name": "CPU", "value": "0 " },
			{ "name": "Cumulative Network", "value": "0 B" },
			{ "name": "Cumulative Disk I/O", "value": "(unknown)" },
			{ "name": "Cumulative CPU", "value": "0 " }
		],
		"compiler_hints": [
			{ "name": "Cardinality", "value": "(none)" },
			{ "name": "Avg. Records/StubCall", "value": "(none)" },
			{ "name": "Avg. Values/Distinct fields", "value": "(none)" },
			{ "name": "Avg. Width (bytes)", "value": "(none)" }		]
	},
	{
		"id": 11,
		"type": "pact",
		"pact": "CoGroup",
		"contents": "<Unnamed CoGrouper>",
		"parallelism": "1",
		"subtasks_per_instance": "1",
		"predecessors": [
			{"id": 12, "side": "first", "ship_strategy": "Hash Partition on [0]", "local_strategy": "Sort on [0:ASC]"},
			{"id": 51, "side": "second", "ship_strategy": "Hash Partition on [0]", "local_strategy": "Sort on [0:ASC]"}
		],
		"driver_strategy": "Co-Group",
		"global_properties": [
			{ "name": "Partitioning", "value": "RANDOM" },
			{ "name": "Partitioning Order", "value": "(none)" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"local_properties": [
			{ "name": "Order", "value": "(none)" },
			{ "name": "Grouping", "value": "not grouped" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"estimates": [
			{ "name": "Est. Output Size", "value": "(unknown)" },
			{ "name": "Est. Cardinality", "value": "(unknown)" },
			{ "name": "Est. Cardinality/fields", "value": "(unknown)" }		],
		"costs": [
			{ "name": "Network", "value": "(unknown)" },
			{ "name": "Disk I/O", "value": "(unknown)" },
			{ "name": "CPU", "value": "(unknown)" },
			{ "name": "Cumulative Network", "value": "(unknown)" },
			{ "name": "Cumulative Disk I/O", "value": "(unknown)" },
			{ "name": "Cumulative CPU", "value": "(unknown)" }
		],
		"compiler_hints": [
			{ "name": "Cardinality", "value": "(none)" },
			{ "name": "Avg. Records/StubCall", "value": "(none)" },
			{ "name": "Avg. Values/Distinct fields", "value": "(none)" },
			{ "name": "Avg. Width (bytes)", "value": "(none)" }		]
	},
	{
		"id": 10,
		"type": "pact",
		"pact": "Reduce",
		"contents": "<Unnamed Reducer>",
		"parallelism": "1",
		"subtasks_per_instance": "1",
		"predecessors": [
			{"id": 11, "ship_strategy": "Forward"}
		],
		"driver_strategy": "Group all into a single group",
		"global_properties": [
			{ "name": "Partitioning", "value": "RANDOM" },
			{ "name": "Partitioning Order", "value": "(none)" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"local_properties": [
			{ "name": "Order", "value": "(none)" },
			{ "name": "Grouping", "value": "not grouped" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"estimates": [
			{ "name": "Est. Output Size", "value": "(unknown)" },
			{ "name": "Est. Cardinality", "value": "(unknown)" },
			{ "name": "Est. Cardinality/fields", "value": "(unknown)" }		],
		"costs": [
			{ "name": "Network", "value": "0 B" },
			{ "name": "Disk I/O", "value": "0 B" },
			{ "name": "CPU", "value": "0 " },
			{ "name": "Cumulative Network", "value": "(unknown)" },
			{ "name": "Cumulative Disk I/O", "value": "(unknown)" },
			{ "name": "Cumulative CPU", "value": "(unknown)" }
		],
		"compiler_hints": [
			{ "name": "Cardinality", "value": "(none)" },
			{ "name": "Avg. Records/StubCall", "value": "(none)" },
			{ "name": "Avg. Values/Distinct fields", "value": "(none)" },
			{ "name": "Avg. Width (bytes)", "value": "(none)" }		]
	},
	{
		"id": 1,
		"type": "pact",
		"pact": "CoGroup",
		"contents": "<Unnamed CoGrouper>",
		"parallelism": "1",
		"subtasks_per_instance": "1",
		"predecessors": [
			{"id": 2, "side": "first", "ship_strategy": "Hash Partition on [0]", "local_strategy": "Sort on [0:ASC]"},
			{"id": 10, "side": "second", "ship_strategy": "Hash Partition on [0]", "local_strategy": "Sort on [0:ASC]"}
		],
		"driver_strategy": "Co-Group",
		"global_properties": [
			{ "name": "Partitioning", "value": "RANDOM" },
			{ "name": "Partitioning Order", "value": "(none)" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"local_properties": [
			{ "name": "Order", "value": "(none)" },
			{ "name": "Grouping", "value": "not grouped" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"estimates": [
			{ "name": "Est. Output Size", "value": "(unknown)" },
			{ "name": "Est. Cardinality", "value": "(unknown)" },
			{ "name": "Est. Cardinality/fields", "value": "(unknown)" }		],
		"costs": [
			{ "name": "Network", "value": "(unknown)" },
			{ "name": "Disk I/O", "value": "(unknown)" },
			{ "name": "CPU", "value": "(unknown)" },
			{ "name": "Cumulative Network", "value": "(unknown)" },
			{ "name": "Cumulative Disk I/O", "value": "(unknown)" },
			{ "name": "Cumulative CPU", "value": "(unknown)" }
		],
		"compiler_hints": [
			{ "name": "Cardinality", "value": "(none)" },
			{ "name": "Avg. Records/StubCall", "value": "(none)" },
			{ "name": "Avg. Values/Distinct fields", "value": "(none)" },
			{ "name": "Avg. Width (bytes)", "value": "(none)" }		]
	},
	{
		"id": 0,
		"type": "sink",
		"pact": "Data Sink",
		"contents": "file:///home/twalthr/repo/test/stratosphere-fulltest/out/finalSink.tbl",
		"parallelism": "1",
		"subtasks_per_instance": "1",
		"predecessors": [
			{"id": 1, "ship_strategy": "Forward"}
		],
		"global_properties": [
			{ "name": "Partitioning", "value": "RANDOM" },
			{ "name": "Partitioning Order", "value": "(none)" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"local_properties": [
			{ "name": "Order", "value": "(none)" },
			{ "name": "Grouping", "value": "not grouped" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"estimates": [
			{ "name": "Est. Output Size", "value": "(unknown)" },
			{ "name": "Est. Cardinality", "value": "(unknown)" },
			{ "name": "Est. Cardinality/fields", "value": "(unknown)" }		],
		"costs": [
			{ "name": "Network", "value": "0 B" },
			{ "name": "Disk I/O", "value": "0 B" },
			{ "name": "CPU", "value": "0 " },
			{ "name": "Cumulative Network", "value": "(unknown)" },
			{ "name": "Cumulative Disk I/O", "value": "(unknown)" },
			{ "name": "Cumulative CPU", "value": "(unknown)" }
		],
		"compiler_hints": [
			{ "name": "Cardinality", "value": "(none)" },
			{ "name": "Avg. Records/StubCall", "value": "(none)" },
			{ "name": "Avg. Values/Distinct fields", "value": "(none)" },
			{ "name": "Avg. Width (bytes)", "value": "(none)" }		]
	},
	{
		"id": 52,
		"type": "sink",
		"pact": "Data Sink",
		"contents": "file:///home/twalthr/repo/test/stratosphere-fulltest/out/Test1.tbl",
		"parallelism": "1",
		"subtasks_per_instance": "1",
		"predecessors": [
			{"id": 40, "ship_strategy": "Forward"}
		],
		"global_properties": [
			{ "name": "Partitioning", "value": "RANDOM" },
			{ "name": "Partitioning Order", "value": "(none)" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"local_properties": [
			{ "name": "Order", "value": "(none)" },
			{ "name": "Grouping", "value": "not grouped" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"estimates": [
			{ "name": "Est. Output Size", "value": "(unknown)" },
			{ "name": "Est. Cardinality", "value": "(unknown)" },
			{ "name": "Est. Cardinality/fields", "value": "(unknown)" }		],
		"costs": [
			{ "name": "Network", "value": "0 B" },
			{ "name": "Disk I/O", "value": "0 B" },
			{ "name": "CPU", "value": "0 " },
			{ "name": "Cumulative Network", "value": "(unknown)" },
			{ "name": "Cumulative Disk I/O", "value": "(unknown)" },
			{ "name": "Cumulative CPU", "value": "(unknown)" }
		],
		"compiler_hints": [
			{ "name": "Cardinality", "value": "(none)" },
			{ "name": "Avg. Records/StubCall", "value": "(none)" },
			{ "name": "Avg. Values/Distinct fields", "value": "(none)" },
			{ "name": "Avg. Width (bytes)", "value": "(none)" }		]
	},
	{
		"id": 53,
		"type": "sink",
		"pact": "Data Sink",
		"contents": "file:///home/twalthr/repo/test/stratosphere-fulltest/out/Test2.tbl",
		"parallelism": "1",
		"subtasks_per_instance": "1",
		"predecessors": [
			{"id": 35, "ship_strategy": "Forward"}
		],
		"global_properties": [
			{ "name": "Partitioning", "value": "RANDOM" },
			{ "name": "Partitioning Order", "value": "(none)" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"local_properties": [
			{ "name": "Order", "value": "(none)" },
			{ "name": "Grouping", "value": "not grouped" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"estimates": [
			{ "name": "Est. Output Size", "value": "(unknown)" },
			{ "name": "Est. Cardinality", "value": "(unknown)" },
			{ "name": "Est. Cardinality/fields", "value": "(unknown)" }		],
		"costs": [
			{ "name": "Network", "value": "0 B" },
			{ "name": "Disk I/O", "value": "0 B" },
			{ "name": "CPU", "value": "0 " },
			{ "name": "Cumulative Network", "value": "2.18 GB" },
			{ "name": "Cumulative Disk I/O", "value": "4.37 GB" },
			{ "name": "Cumulative CPU", "value": "15.30 G" }
		],
		"compiler_hints": [
			{ "name": "Cardinality", "value": "(none)" },
			{ "name": "Avg. Records/StubCall", "value": "(none)" },
			{ "name": "Avg. Values/Distinct fields", "value": "(none)" },
			{ "name": "Avg. Width (bytes)", "value": "(none)" }		]
	},
	{
		"id": 54,
		"type": "sink",
		"pact": "Data Sink",
		"contents": "file:///home/twalthr/repo/test/stratosphere-fulltest/out/Test3.tbl",
		"parallelism": "1",
		"subtasks_per_instance": "1",
		"predecessors": [
			{"id": 17, "ship_strategy": "Forward"}
		],
		"global_properties": [
			{ "name": "Partitioning", "value": "RANDOM" },
			{ "name": "Partitioning Order", "value": "(none)" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"local_properties": [
			{ "name": "Order", "value": "(none)" },
			{ "name": "Grouping", "value": "not grouped" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"estimates": [
			{ "name": "Est. Output Size", "value": "24.14 KB" },
			{ "name": "Est. Cardinality", "value": "157 " },
			{ "name": "Est. Cardinality/fields", "value": "(unknown)" }		],
		"costs": [
			{ "name": "Network", "value": "0 B" },
			{ "name": "Disk I/O", "value": "0 B" },
			{ "name": "CPU", "value": "0 " },
			{ "name": "Cumulative Network", "value": "(unknown)" },
			{ "name": "Cumulative Disk I/O", "value": "(unknown)" },
			{ "name": "Cumulative CPU", "value": "(unknown)" }
		],
		"compiler_hints": [
			{ "name": "Cardinality", "value": "(none)" },
			{ "name": "Avg. Records/StubCall", "value": "(none)" },
			{ "name": "Avg. Values/Distinct fields", "value": "(none)" },
			{ "name": "Avg. Width (bytes)", "value": "(none)" }		]
	},
	{
		"id": 55,
		"type": "sink",
		"pact": "Data Sink",
		"contents": "file:///home/twalthr/repo/test/stratosphere-fulltest/out/Test4.tbl",
		"parallelism": "1",
		"subtasks_per_instance": "1",
		"predecessors": [
			{"id": 49, "ship_strategy": "Forward"}
		],
		"global_properties": [
			{ "name": "Partitioning", "value": "RANDOM" },
			{ "name": "Partitioning Order", "value": "(none)" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"local_properties": [
			{ "name": "Order", "value": "(none)" },
			{ "name": "Grouping", "value": "not grouped" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"estimates": [
			{ "name": "Est. Output Size", "value": "162.33 KB" },
			{ "name": "Est. Cardinality", "value": "1.78 K" },
			{ "name": "Est. Cardinality/fields", "value": "(unknown)" }		],
		"costs": [
			{ "name": "Network", "value": "0 B" },
			{ "name": "Disk I/O", "value": "0 B" },
			{ "name": "CPU", "value": "0 " },
			{ "name": "Cumulative Network", "value": "0 B" },
			{ "name": "Cumulative Disk I/O", "value": "0 B" },
			{ "name": "Cumulative CPU", "value": "0 " }
		],
		"compiler_hints": [
			{ "name": "Cardinality", "value": "(none)" },
			{ "name": "Avg. Records/StubCall", "value": "(none)" },
			{ "name": "Avg. Values/Distinct fields", "value": "(none)" },
			{ "name": "Avg. Width (bytes)", "value": "(none)" }		]
	},
	{
		"id": 56,
		"type": "sink",
		"pact": "Data Sink",
		"contents": "file:///home/twalthr/repo/test/stratosphere-fulltest/out/Test5.tbl",
		"parallelism": "1",
		"subtasks_per_instance": "1",
		"predecessors": [
			{"id": 51, "ship_strategy": "Forward"}
		],
		"global_properties": [
			{ "name": "Partitioning", "value": "RANDOM" },
			{ "name": "Partitioning Order", "value": "(none)" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"local_properties": [
			{ "name": "Order", "value": "(none)" },
			{ "name": "Grouping", "value": "not grouped" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"estimates": [
			{ "name": "Est. Output Size", "value": "(unknown)" },
			{ "name": "Est. Cardinality", "value": "(unknown)" },
			{ "name": "Est. Cardinality/fields", "value": "(unknown)" }		],
		"costs": [
			{ "name": "Network", "value": "0 B" },
			{ "name": "Disk I/O", "value": "0 B" },
			{ "name": "CPU", "value": "0 " },
			{ "name": "Cumulative Network", "value": "0 B" },
			{ "name": "Cumulative Disk I/O", "value": "(unknown)" },
			{ "name": "Cumulative CPU", "value": "0 " }
		],
		"compiler_hints": [
			{ "name": "Cardinality", "value": "(none)" },
			{ "name": "Avg. Records/StubCall", "value": "(none)" },
			{ "name": "Avg. Values/Distinct fields", "value": "(none)" },
			{ "name": "Avg. Width (bytes)", "value": "(none)" }		]
	},
	{
		"id": 57,
		"type": "sink",
		"pact": "Data Sink",
		"contents": "file:///home/twalthr/repo/test/stratosphere-fulltest/out/Test6.tbl",
		"parallelism": "1",
		"subtasks_per_instance": "1",
		"predecessors": [
			{"id": 4, "ship_strategy": "Forward"}
		],
		"global_properties": [
			{ "name": "Partitioning", "value": "RANDOM" },
			{ "name": "Partitioning Order", "value": "(none)" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"local_properties": [
			{ "name": "Order", "value": "(none)" },
			{ "name": "Grouping", "value": "not grouped" },
			{ "name": "Uniqueness", "value": "not unique" }
		],
		"estimates": [
			{ "name": "Est. Output Size", "value": "(unknown)" },
			{ "name": "Est. Cardinality", "value": "(unknown)" },
			{ "name": "Est. Cardinality/fields", "value": "(unknown)" }		],
		"costs": [
			{ "name": "Network", "value": "0 B" },
			{ "name": "Disk I/O", "value": "0 B" },
			{ "name": "CPU", "value": "0 " },
			{ "name": "Cumulative Network", "value": "0 B" },
			{ "name": "Cumulative Disk I/O", "value": "(unknown)" },
			{ "name": "Cumulative CPU", "value": "0 " }
		],
		"compiler_hints": [
			{ "name": "Cardinality", "value": "(none)" },
			{ "name": "Avg. Records/StubCall", "value": "(none)" },
			{ "name": "Avg. Values/Distinct fields", "value": "(none)" },
			{ "name": "Avg. Width (bytes)", "value": "(none)" }		]
	}
	]
};
}
