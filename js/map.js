var width = 960, height = 500, centered;

var vehicleCounts = d3.map();

var projection = d3.geo.albersUsa()
    .scale(width)
    .translate([width / 2, height / 2]);

var path = d3.geo.path().projection(projection);

queue()
    .defer(d3.json, "data/us.json")
    .defer(d3.csv, "data/employment-fip.csv", function(d) { vehicleCounts.set(d.fips, +d.data); })
    .await(ready);

var map, legend, g, legendTitle = "# of motorcycles for sale";

function ready(error, us) {
  $("#huge-map").html("");
  map = d3.select("#huge-map").append("svg")
      .attr("width", width)
      .attr("height", height);

  map.append("rect")
      .attr("class", "background")
      .attr("width", width)
      .attr("height", height)
      .on("click", mapClick);

  legend = d3.select("#huge-map").append("svg")
      .attr("id", "legend")
      .attr("width", "100%")
      .attr("height", 50);

  g = map.append("g");

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
      .on("mouseover", function() {
        var element = d3.select(this);
        var elementClass = element.attr("class");
        if (elementClass !== "states zoomed") {
          element.attr("class", "states active");
        }
      })
      .on("mouseout", function() {
        var element = d3.select(this);
        var elementClass = element.attr("class");
        if (elementClass !== "states zoomed") {
          element.attr("class", centered ? "states inactive" : "states");
        }
      });

  g.append("path")
      .datum(topojson.mesh(us, us.objects.states))
      .attr("class", "state-borders")
      .attr("d", path);

  colorlegend("#legend", vehicleCountColor, "log", {title: legendTitle});

  if ($('#collapse-data-more').is(':visible')) {
      generateChart();
  }
}

function mapClick(d) {
  var x, y, k;

  if (d && centered !== d) {
    var centroid = path.centroid(d), bounds = path.bounds(d);
    x = centroid[0];
    y = centroid[1];
    k = 0.75 / Math.max((bounds[1][0] - bounds[0][0]) / width, (bounds[1][1] - bounds[0][1]) / height);
    centered = d;
    d3.selectAll(".states").attr("class", "states inactive");
    d3.select(this).attr("class", "states zoomed");
  } else {
    x = width / 2;
    y = height / 2;
    k = 1;
    centered = null;
    d3.selectAll(".states").attr("class", "states");
  }

  g.transition()
      .duration(750)
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")");
}
