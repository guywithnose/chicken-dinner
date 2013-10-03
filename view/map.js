var width = 960, height = 500, centered;

var vehicleCounts = d3.map();

var vehicleCountIntensity = d3.scale.linear()
    .domain([0, 600])
    .range([0.9, 0.1]);

var path = d3.geo.path();

var svg = d3.select("#huge-map").append("svg")
    .attr("width", width)
    .attr("height", height);

svg.append("rect")
    .attr("class", "background")
    .attr("width", width)
    .attr("height", height)
    .on("click", mapClick);

var g = svg.append("g");

queue()
    .defer(d3.json, "us.json")
    .defer(d3.csv, "cycle.csv", function(d) { vehicleCounts.set(d.zip, +d.data); })
    .await(ready);

function ready(error, us) {
  g.append("g")
      .attr("class", "counties")
    .selectAll("path")
      .data(topojson.feature(us, us.objects.counties).features)
    .enter().append("path")
      .style("fill", function(d) { return d3.hsl(210, 1, vehicleCountIntensity(vehicleCounts.get(d.id))); })
      .attr("d", path)
      .on("click", mapClick);

  g.append("path")
      .datum(topojson.mesh(us, us.objects.states))
      .attr("class", "states")
      .attr("d", path)
      .on("click", mapClick);
}

function mapClick(d) {
console.log('foo');
console.log(d);
  var x, y, k;

  if (d && centered !== d) {
    var centroid = path.centroid(d);
    x = centroid[0];
    y = centroid[1];
    k = 4;
    centered = d;
  } else {
    x = width / 2;
    y = height / 2;
    k = 1;
    centered = null;
  }

  g.selectAll("path")
      .classed("active", centered && function(d) { return d === centered; });

  g.transition()
      .duration(750)
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
      .style("stroke-width", 1.5 / k + "px");
}
