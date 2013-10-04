var width = 960, height = 500, centered;

var vehicleCounts = d3.map(), fipsCodes = d3.map(), stateMap = d3.map();

var projection = d3.geo.albersUsa()
    .scale(width)
    .translate([width / 2, height / 2]);

var path = d3.geo.path().projection(projection);

queue()
    .defer(d3.json, "data/us.json")
    .defer(d3.csv, "data/US_FIPS_Codes.csv", function(d) {
      fipsCodes.set(d.stateNumber.replace(/^0/, '') + d.countyNumber, {
        stateName: d.state,
        stateNumber: d.stateNumber,
        countyName: d.county
      });
    })
    .defer(d3.csv, "cyclemake.php?class=Motorcycle&make=", function(d) { vehicleCounts.set(d.fips, +d.data); })
    .await(ready);

var map, legend, g, legendTitle = "# of motorcycles for sale";

function ready(error, us) {
  us = us[0];
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
      .attr("class", "states")
    .selectAll("path")
      .data(topojson.feature(us, us.objects.states).features)
    .enter().append("path")
      .attr("d", path)
      .attr("stateId", function(d) { stateMap.set(d.id, d); return d.id; });

  g.append("g")
      .attr("class", "counties")
    .selectAll("path")
      .data(topojson.feature(us, us.objects.counties).features)
    .enter().append("path")
      .style("fill", function(d) { return vehicleCountColor(+vehicleCounts.get(d.id)); })
      .attr("d", path)
      .attr("stateId", function(d) {
        var fips = fipsCodes.get(d.id);
        return fips ? fips.stateNumber.replace(/^0/, '') : null;
      })
      .attr("countyId", function(d) { return d.id; })
      .on("click", mapClick)
      .on("mouseover", function() {
        var element = d3.selectAll('[stateId="' + d3.select(this).attr("stateId") + '"]');
        var elementClass = element.attr("class");
        if (elementClass !== "counties stateZoomed") {
          element.attr("class", "counties stateActive");
        }
      })
      .on("mouseout", function() {
        var element = d3.selectAll('[stateId="' + d3.select(this).attr("stateId") + '"]');
        var elementClass = element.attr("class");
        if (elementClass !== "counties stateZoomed") {
          element.attr("class", centered ? "counties stateInactive" : "counties");
        }
      });

  g.append("g")
      .attr("class", "countiesOverlay")
    .selectAll("path")
      .data(topojson.feature(us, us.objects.counties).features)
    .enter().append("path")
      .attr("d", path)
      .attr("stateId", function(d) {
        var fips = fipsCodes.get(d.id);
        return fips ? fips.stateNumber.replace(/^0/, '') : null;
      })
      .attr("countyId", function(d) { return d.id; })
      .on("click", mapClick)
      .on("mouseover", function() {
        var element = d3.selectAll('[stateId="' + d3.select(this).attr("stateId") + '"]');
        var elementClass = element.attr("class");
        if (elementClass !== "counties stateZoomed") {
          element.attr("class", "counties stateActive");
        }
      })
      .on("mouseout", function() {
        var element = d3.selectAll('[stateId="' + d3.select(this).attr("stateId") + '"]');
        var elementClass = element.attr("class");
        if (elementClass !== "counties stateZoomed") {
          element.attr("class", centered ? "counties stateInactive" : "counties");
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
  var stateId = d3.select(this).attr("stateId");
  var state = stateMap.get(stateId);

  if (d && centered !== state) {
    var centroid = path.centroid(state), bounds = path.bounds(state);
    x = centroid[0];
    y = centroid[1];
    k = 0.75 / Math.max((bounds[1][0] - bounds[0][0]) / width, (bounds[1][1] - bounds[0][1]) / height);
    centered = state;
    d3.selectAll('.counties[stateId^="' + stateId + '"]').attr("class", "counties stateInactive");
    d3.selectAll('.counties[stateId="' + stateId + '"]').attr("class", "counties stateZoomed");
  } else {
    x = width / 2;
    y = height / 2;
    k = 1;
    centered = null;
    d3.selectAll(".counties").attr("class", "counties");
  }

  g.transition()
      .duration(750)
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")");
}
