$(function() {
    var issueData;
    $.ajax({
        url: 'data/issues.json',
        dataType: 'json',
        success: function(data){
            issueData = data;
            var availableTags = [];
            var tagToLegendMap = {};
            var vehicleMapper = function(type) { return function() { return '# of ' + type + ' for sale'; }; };
            var classToTypeMap = {
              'Trucks': vehicleMapper('trucks'),
              'Equipment': vehicleMapper('equipment'),
              'RV': vehicleMapper('rvs'),
              'Aircraft': vehicleMapper('aircraft'),
              'Motorcycle': vehicleMapper('motorcycles'),
              'ATV': vehicleMapper('atvs'),
              'PWC': vehicleMapper('pwcs'),
              'Snowmobile': vehicleMapper('snowmobiles'),
              'Jobs': function() {return '# of jobs available';}
            };

            var incomeRanges = ["0-10k","10-15k","15-20k","20-25k","25-30k","30-35k","35-40k","40-45k","45-50k","50-60k","60-75k","75-100k","100-125k","125-150k","150-200k"];
            var rentRanges = ["0-100","100-150","150-200","200-250","250-300","300-350","350-400","400-450","450-500","500-550","550-600","600-650","650-700","700-750","750-800","800-900","900-1000","1000-1250","1250-1500","1500-2000","2000+"];

            for (var i in incomeRanges) {
                availableTags.push('Households that make $' + incomeRanges[i]);
            }

            for (var i in rentRanges) {
                availableTags.push('Rental fees of $' + rentRanges[i]);
            }

            availableTags.push('Population Density');

            for (var i in data) {
                for (var j in data[i]) {
                    var legendText = '# of ' + i + ' for sale';
                    if (classToTypeMap[i]) {
                      legendText = classToTypeMap[i](j);
                    }

                    availableTags.push(i + ' ' + j);
                    tagToLegendMap[i + ' ' + j] = legendText;
                }
            }

            $("#keyword").autocomplete({
                source: availableTags,
                select: function(event, ui) {
                    var value = ui.item.value;
                    autoSelect(value);
                }
            });

            function autoSelect(value) {
                if (value.search(' ') != -1) {
                    var className = value.substr(0, value.search(' '));
                    var make = value.substr(value.search(' ') + 1);
                    legendTitle = tagToLegendMap[value];
                    if (issueData[className] && issueData[className][make]) {
                        $('#huge-map').html('<div class="loading">&nbsp;</div>');
                        vehicleCounts = d3.map();
                        queue().defer(d3.json, "data/us.json")
                            .defer(d3.csv, "cyclemake.php?class=" + className + "&make=" + make, function(d) { vehicleCounts.set(d.fips, +d.data); })
                            .await(ready);
                    } else {
                        if (value == 'Population Density') {
                            legendTitle = '# of households';
                            $('#huge-map').html('<div class="loading">&nbsp;</div>');
                            vehicleCounts = d3.map();
                            queue().defer(d3.json, "data/us.json")
                                .defer(d3.csv, "data/income-fips.csv", function(d) { vehicleCounts.set(d.fips, +d['Total Households']); })
                                .await(ready);
                        } else if (value.search('Households that make \\$') != -1) {
                            var incomeRange = value.replace('Households that make $', '');
                            legendTitle = '# of households that make $' + incomeRange;
                            $('#huge-map').html('<div class="loading">&nbsp;</div>');
                            vehicleCounts = d3.map();
                            queue().defer(d3.json, "data/us.json")
                                .defer(d3.csv, "data/income-fips.csv", function(d) { vehicleCounts.set(d.fips, +d[incomeRange]); })
                                .await(ready);
                        } else if (value.search('Rental fees of \\$') != -1) {
                            var rentalRange = value.replace('Rental fees of $', '');
                            legendTitle = '# of households with rental fees of $' + rentalRange;
                            $('#huge-map').html('<div class="loading">&nbsp;</div>');
                            vehicleCounts = d3.map();
                            queue().defer(d3.json, "data/us.json")
                                .defer(d3.csv, "data/rent-fips.csv", function(d) { vehicleCounts.set(d.fips, +d[rentalRange]); })
                                .await(ready);
                        }
                    }
                }
            }

            $('.input-group-btn').click(function(){
                autoSelect($("#keyword").val());
            });
        }
    });
});
