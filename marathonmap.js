/**
 * @file 
 * Reads marathon data from a public google spreadsheet and transforms
 * it into a geochart.
 *
 */

/* Globals */
var chartData = [['State', 'Completed']];
var us_states = {
  'AL': 'Alabama',
  'AK': 'Alaska',
  'AZ': 'Arizona',
  'AR': 'Arkansas',
  'CA': 'California',
  'CO': 'Colorado',
  'CT': 'Connecticut',
  'DE': 'Delaware',
  'FL': 'Florida',
  'GA': 'Georgia',
  'HI': 'Hawaii',
  'ID': 'Idaho',
  'IL': 'Illinois',
  'IN': 'Indiana',
  'IA': 'Iowa',
  'KS': 'Kansas',
  'KY': 'Kentucky',
  'LA': 'Louisiana',
  'ME': 'Maine',
  'MD': 'Maryland',
  'MA': 'Massachusetts',
  'MI': 'Michigan',
  'MN': 'Minnesota',
  'MS': 'Mississippi',
  'MO': 'Missouri',
  'MT': 'Montana',
  'NE': 'Nebraska',
  'NV': 'Nevada',
  'NH': 'New Hampshire',
  'NJ': 'New Jersey',
  'NM': 'New Mexico',
  'NY': 'New York',
  'NC': 'North Carolina',
  'ND': 'North Dakota',
  'OH': 'Ohio',
  'OK': 'Oklahoma',
  'OR': 'Oregon',
  'PA': 'Pennsylvania',
  'RI': 'Rhode Island',
  'SC': 'South Carolina',
  'SD': 'South Dakota',
  'TN': 'Tennessee',
  'TX': 'Texas',
  'UT': 'Utah',
  'VT': 'Vermont',
  'VA': 'Virginia',
  'WA': 'Washington',
  'WV': 'West Virginia',
  'WI': 'Wisconsin',
  'WY': 'Wyoming'
}
var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1HQEdDuUNbra9mGGUl390EaJlZ5wktay3XixThP09fQ8/pubhtml';
var runner_name = "Sue Hrabchak";
var stateData = {};

/* Retrieve data from Google Sheets */

function parseStateData(race_log, races) {
  for (var i = 0; i < us_states.length; i++) {
  }
}

function transformToChartData() {
}

function populateData(data) {
  parseStateData(data.race_log, data.races);
  transformToChartData();
}

/* GeoChart Setup */

function drawRegionsMap() {

  var data = google.visualization.arrayToDataTable(chartData);

  var options = {
    region: 'US',
    resolution: 'provinces',
    legend: 'none'
  };
  var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
  chart.draw(data, options);
}

/* main */
function initStateData() {

  for (var i = 0; i < us_states.length; i++) {
    var state_abbr = us_states[i].key();
    var new_obj = {state_abbr: []};
    stateData.push(new_obj);
  }

}


function main() {
  initStateData();
  Tabletop.init( { key: public_spreadsheet_url,
                          callback: populateData,
                          simpleSheet: false } );

  google.charts.load('current', {'packages': ['geochart']});
  google.charts.setOnLoadCallback(drawRegionsMap);
}

main();
