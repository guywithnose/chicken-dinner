var fipsData;
google.load('visualization', '1', {packages:['table']});
$(function() {
    $.ajax({
        url: '/fipsData.json',
        dataType: 'json',
        success: function(data) {
            fipsData = data;
        }
    });
    $('#collapse-data-more').on('shown.bs.collapse', function () {
        generateChart();
    });
});

function generateChart() {
    if (!fipsData) {
        //Wait for fips data to load
        setTimeout(generateChart, 1000);
    } else {
        var data = new google.visualization.DataTable();

        data.addColumn('string', 'State');
        data.addColumn('string', 'County');
        data.addColumn('number', 'Count');
        var rows = [];
        var keys = vehicleCounts.keys();
        for (var i in keys) {
            var key = keys[i];
            var count = vehicleCounts.get(key.replace(/^0*/, ''));
            var fips = fipsData[''+key];
            if (fips) {
                rows.push([fips.State, fips.County, count]);
            } else {
                console.log('Unknown fips: ' + fips);
            }
        }

        data.addRows(rows);

        var table = new google.visualization.Table(document.getElementById('dataTable'));
        table.draw(data, {showRowNumber: false, sort: 'enable', sortColumn: 2, sortAscending: false});
    }
}

