
<h1>NBA Strength Calculator<h1>

This project is being hosted on nowamey.github.io

Our target browsers google chrome, and the project has support for mobile resolution and can be navigated on 
safari

Javascript Documentation:

async function mainEvent():
Async function run once domain content has been loaded. mainEvent has calls for API data from getData()
,and has two main event listeners for changes to dropdown menus, and submission of the division form.  

function filterstandings(results,divisionOne,divisionTwo):
Recieves the results data, and the two divisions the user has chosen.

This method then filters the standings down to only the two divisions in question, and returns the filtered standings

function getTotals(teams,divisionOne,divisionTwo):
Recieves the teams data(from filterstandings), as well as the two current divisions being compared, and totals the wins\
from the two divisions. 

Returns an array to be parsed in the compareChart method. 

async function getData():
Get data function calls a fetch on the NBA API for the standings of all teams for the current season. Using this data,
The function returns the response to be used in the main event.

function initChart(chart,teams):
Using chart.js, initchart takes in teams data and sets up a chart accordingly. 

Labels: Team names
info: total wins per team
returns the chart to be used in the main event function.


function compareChart(chart,compResults):
comparechart adjustst the chart based on the division comparisons and recreates it to compare the aggregate wins
of the divisions.

calls updatechart, changing the chart displayed.


 Inject HTML function 
THis injects to html the current winning division or conference based on the comp of totals. 

 Get rankings Function

THis sorts the rankings of the teams and then returns it sliced

 COnference wins Function 

THis figures out which of the conferences is stronger and then displays that, or a message showing that there was a tie in conference strength. 

 CSS documenation 
Standard CSS framework utilized in the other labs, with 2 specific sections being added to create the parrelax effect on the main site and the banner redirect screen on the landing page

