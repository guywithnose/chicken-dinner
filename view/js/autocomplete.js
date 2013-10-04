$(function() {
    var issueData;
    $.ajax({
        url: 'data/issues.json',
        dataType: 'json',
        success: function(data){
            issueData = data;
            var availableTags = [
            ];

            for (var i in data) {
                for (var j in data[i]) {
                    availableTags.push(i + ' ' + j);
                }
            }

            $( "#keyword" ).autocomplete({
                source: availableTags,
                select: function(event, ui) {
                    console.log(ui.item.value);
                    var value = ui.item.value;
                    if (value.search(' ') != -1) {
                        var className = value.substr(0, value.search(' '));
                        var make = value.substr(value.search(' ') + 1);
                        if (issueData[className] && issueData[className][make]) {
                            $('#huge-map').html('<div class="loading">&nbsp;</div>');
                            vehicleCounts = d3.map();
                            queue().defer(d3.json, "data/us.json")
                                .defer(d3.csv, "cyclemake.php?class=" + className + "&make=" + make, function(d) { vehicleCounts.set(d.fips, +d.data); })
                                .await(ready);
                        }
                    }
                }
            });
        }
    });
});
