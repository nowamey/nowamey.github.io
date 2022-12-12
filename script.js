async function mainEvent(){
    //queryselectors for relevant elements to the page
    const form = document.querySelector('.division_form');
    const divisionOne = document.querySelector('#division1');//const submit = document.querySelector('#comp_divs');
    const divisionTwo = document.querySelector('#division2');
    const submit = document.querySelector('#comp_divs');
    const chartTarget = document.querySelector('#myChart');
    const results = await getData();

    const myChart = initChart(chartTarget,results)

    let rankings = getRankings(results,10);
    injectHTML(rankings)
    injectConf(results)
    
    let option1 = 'Atlantic';
    let option2 = 'Atlantic';
    console.log(results);
    divisionOne.addEventListener('change', (changeEvent) => {
        changeEvent.preventDefault();
        console.log(divisionOne.selectedIndex)
        option1 = divisionOne[divisionOne.selectedIndex].value
        console.log(option1)
    });
    divisionTwo.addEventListener('change', (changeEvent) => {
        changeEvent.preventDefault();
        console.log(divisionTwo.selectedIndex);
        option2 = divisionTwo[divisionTwo.selectedIndex].value
        console.log(option2)
    });
   
    
    form.addEventListener('submit', (submitEvent) =>{
        submitEvent.preventDefault();
        const filteredStandings = filterstandings(results,option1,option2);
        comparison = getTotals(filteredStandings,option1,option2);
        //updates chart in line with new comparison.
        compareChart(myChart,comparison);
    });
}

function filterstandings(results,divisionOne,divisionTwo){
    //filters list to pare down all results to just the relevant teams of the divisions submitted to compare
    
    divisionOne = divisionOne.toLowerCase();
    divisionTwo = divisionTwo.toLowerCase();
    let filteredStandings = results.filter((team) => team.division.name === divisionOne || team.division.name === divisionTwo);
    console.log(filteredStandings)
    return filteredStandings;
}
function getTotals(teams,divisionOne,divisionTwo){
    teams = filterstandings(teams,divisionOne,divisionTwo); 
    
    divisionOne = divisionOne.toLowerCase();
    divisionTwo = divisionTwo.toLowerCase();
    div1 = teams.filter((team) => team.division.name === divisionOne);
    div2 = teams.filter((team) => team.division.name === divisionTwo);

    let div1Wins = 0
    let div2Wins = 0

    div1.forEach((team) => {
        div1Wins += team.win.total 
    });
    div2.forEach((team) => {
        div2Wins += team.win.total
    });
    console.log(divisionOne);
    console.log(divisionTwo);

    let totals = [divisionOne,divisionTwo,div1Wins,div2Wins]
    console.log(totals)
    return totals
}
async function getData(){   
    //boilerplate api call for now to make sure we are hooked up to the api
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '1ad20185f4msh490da773eec2f88p1da196jsn25ab0f4382b6',
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
        }
    };
    
    const data =await fetch('https://api-nba-v1.p.rapidapi.com/standings?league=standard&season=2022', options)
    const json =await data.json();

    return json.response;
    

    
    
}
function initChart(chart,teams){
        const ranked = (getRankings(teams,10));
        ;
        const labels = ranked.map((key) => key.team.name);
        const info = ranked.map((key) => key.win.total);
        const data = {
          labels: labels,
          datasets: [{
            label: 'Total Wins',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: info,
          }]
        };
      
        const config = {
          type: 'bar',
          data: data,
          options: {}
        };
      
        return new Chart(
          chart,
          config
        );
}

function compareChart(chart,compResults){
    const labels = [compResults[0],compResults[1]];
    const info = [compResults[2],compResults[3]];

    console.log(labels);
    console.log(info);
    chart.data.labels = labels;
    chart.data.datasets.forEach((set) => {
        set.data = info;
        return set;
    })
    chart.update();
}

function injectHTML(list){
    //inject to html the current winning division or conference based on the comp of totals.
    console.log('fired injectHTML');
    const target = document.querySelector("#rankings");
      
    target.innerHTML = '';
      
    const listEl = document.createElement('ol');
    target.appendChild(listEl);
    list.forEach((item) => {
        const el = document.createElement('li');
        el.innerText = item.team.name + ' ('+item.win.total+' wins)'
        listEl.appendChild(el);
    });
}
function getRankings(results,teamsToRank){
    function compareMethod(team1,team2){
        return team2.win.total - team1.win.total;
    }
    const ranked  = results.sort(compareMethod)
    console.log(ranked)
    return ranked.slice(0,teamsToRank);
}
function injectConf(results){
    const east = results.filter((team) => team.conference.name === 'east');
    const west = results.filter((team) => team.conference.name === 'west');
    let conf = ''
    let eastWins = 0;
    let westWins = 0;

    east.forEach((team) => eastWins+=team.win.total);
    west.forEach((team) => westWins+=team.win.total);
    console.log(eastWins);
    console.log(westWins);
    
    if(eastWins > westWins){
        conf ='The East is the stronger conference with '+(eastWins - westWins)+' more wins than the West!'
    }else if(westWins>eastWins){
        conf = 'The West is the stronger conference with '+(westWins-eastWins)+' more wins than the East!'
    }else{
        conf = 'Both conferences are currently equal in strength!'; 
    }
    console.log(conf)
    const confTarget = document.querySelector('#conf');
    const node = document.createTextNode(conf)
    let answer = document.createElement('p')
    answer.appendChild(node);
    console.log(confTarget)
    confTarget.appendChild(answer);
    
} 
document.addEventListener('DOMContentLoaded', async () => mainEvent());


