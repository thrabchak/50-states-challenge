google.charts.load('current', {
  'packages': ['geochart']
});
google.charts.setOnLoadCallback(drawRegionsMap);

function drawRegionsMap() {

  var data = google.visualization.arrayToDataTable([
    ['State', 'Value'],
  ]);

  var options = {
    region: 'US',
    resolution: 'provinces',
    legend: 'none'
  };
  var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
  chart.draw(data, options);
}
