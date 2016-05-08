/**
 * @file 
 * Reads marathon data from a public google spreadsheet and transforms
 * it into a geochart.
 *
 */

/* Globals */
var chartData = [['State', 'Completed']];
var us_states = ['AL' ,'AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];
var state_names = {
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
var raceData = {};

/* Retrieve data from Google Sheets */

function parseRaceData(races) {
  // Iterate through each entry in races
  for (var i = 0; i < races.elements.length; i++) {
    var race = races.elements[i];
    var raceid = race["RACEID"];
    var state = race["State"];
    var new_obj = {"State": state};

    raceData[raceid] = new_obj;
  }
}

function parseStateData(race_log) {
  // Iterate through each entry in race_log
  for (var i = 0; i < race_log.elements.length; i++) {
    var event = race_log.elements[i];
    var raceid = event["RACEID"];
    var raceObj = raceData[raceid];
    var new_obj = {"RACEID": raceid};

    stateData[raceObj.State].push(new_obj);
  }
}

function transformToChartData() {
  for (var i = 0; i < us_states.length; i++) {
    var state_list = [];
    var state_abbr = us_states[i];
    var state_name = state_names[state_abbr];

    // 1. Add state name
    state_list.push(state_name);

    // 2. Add number of races completed
    var races = stateData[state_abbr];
    state_list.push(races.length);

    // 3. Append to chartData
    chartData.push(state_list);
  }
}

function populateData(data) {
  parseRaceData(data.races);
  parseStateData(data.race_log);
  transformToChartData();
  google.charts.load('current', {'packages': ['geochart']});
  google.charts.setOnLoadCallback(drawRegionsMap);
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
  // Create an empty list for each state
  for (var i = 0; i < us_states.length; i++) {
    var state_abbr = us_states[i];
    stateData[state_abbr] = [];
  }
}


function main() {
  initStateData();
  Tabletop.init( { key: public_spreadsheet_url,
                          callback: populateData,
                          simpleSheet: false } );
}

main();
