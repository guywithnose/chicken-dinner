var width = 960, height = 500, centered;

var vehicleCounts = d3.map();

var projection = d3.geo.albersUsa()
    .scale(width)
    .translate([width / 2, height / 2]);

var path = d3.geo.path().projection(projection);

var map = d3.select("#huge-map").append("svg")
    .attr("width", width)
    .attr("height", height);

map.append("rect")
    .attr("class", "background")
    .attr("width", width)
    .attr("height", height)
    .on("click", mapClick);

var legend = d3.select("#huge-map").append("svg")
    .attr("id", "legend")
    .attr("width", "100%")
    .attr("height", 50);

var g = map.append("g");

queue()
    .defer(d3.json, "us.json")
    .defer(d3.csv, "cyclemake.php?class=Motorcycle&make=Honda", function(d) { vehicleCounts.set(d.zip, +d.data); })
    .await(ready);

function ready(error, us) {
  var vehicleCountColor = d3.scale.log()
      .domain([1, d3.max(vehicleCounts.values())])
      .interpolate(d3.interpolateHsl)
      .nice(10)
      .base(2)
      .range([d3.hsl(210, 1, 0.95), d3.hsl(210, 1, 0.05)]);

  g.append("g")
      .attr("class", "counties")
    .selectAll("path")
      .data(topojson.feature(us, us.objects.counties).features)
    .enter().append("path")
      .style("fill", function(d) { return vehicleCountColor(+vehicleCounts.get(d.id)); })
      .attr("d", path);

  g.append("g")
      .attr("class", "states")
    .selectAll("path")
      .data(topojson.feature(us, us.objects.states).features)
    .enter().append("path")
      .attr("d", path)
      .on("click", mapClick)
      .on("mouseover", function() { d3.select(this).attr("class", "states active"); })
      .on("mouseout", function() { d3.select(this).attr("class", "states"); });

  g.append("path")
      .datum(topojson.mesh(us, us.objects.states))
      .attr("class", "state-borders")
      .attr("d", path);

  colorlegend("#legend", vehicleCountColor, "log", {title: "# of motorcycles for sale"});
}

function mapClick(d) {
  var x, y, k;

  if (d && centered !== d) {
    var centroid = path.centroid(d), bounds = path.bounds(d);
    x = centroid[0];
    y = centroid[1];
    k = 0.75 / Math.max((bounds[1][0] - bounds[0][0]) / width, (bounds[1][1] - bounds[0][1]) / height);
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
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")");
}
