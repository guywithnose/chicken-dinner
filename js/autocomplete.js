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
                    }
                }
            }

            $('.input-group-btn').click(function(){
                autoSelect($("#keyword").val());
            });
        }
    });
});
