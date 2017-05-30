colorArray = ["red", "green", "blue", "black", "hotpink", "orange", "tomato", "orchid", "mediumspringgreen", "indigo", "dimgray", "chocolate"];

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateCanvas(canvas, data) {
	var w = 330,
		h = 330;

    $(canvas).addClass("canvas");

	var canvasLocal = d3.select(canvas)
		.append("svg:svg")
		.attr('width', w)
		.attr('height', h);

	var nodes = d3.layout.pack()
		.value(function(d) { return d.size; })
		.size([w, h])
		.nodes(data);

	nodes.shift();

	var enterEl = canvasLocal.selectAll('circles')
		.data(nodes)
		.enter().append("g");

		enterEl.append('svg:circle')
			.attr('cx', function(d) { return d.x; })
			.attr('cy', function(d) { return d.y; })
			.attr('r', function(d) { return d.r; })
			.attr('fill', 'white')
			.attr('stroke', 'white');

		enterEl.append('text')
			.text(function(d){ return d.label })
			.style("fill", function() { return colorArray[getRandomInt(0, 11)] })
			.style("font-size", function(d) { return Math.min(2 * d.r, (2 * d.r - 8) / this.getComputedTextLength() * 15) + "px"; })
			.attr("dy", ".35em").attr('transform', function(d, i){
				var distance = d.r-5;

				Math.radians = function(degrees) {
					return degrees * Math.PI / 180;
				};

				var degrees = getRandomInt(45, 165)*(-i);
				var xText = d.x - Math.cos(Math.radians(degrees))*distance;
				var yText = d.y - Math.sin(Math.radians(degrees))*distance;

				return "translate(" +xText + "," + yText + ") rotate(" + (degrees)+ ")";
			});
}
