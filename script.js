async function mainEvent(){
    const form = document.querySelector('.division_form');
    const divisionOne = document.querySelector('#division1');//const submit = document.querySelector('#comp_divs');
    const divisionTwo = document.querySelector('#division2');
    const submit = document.querySelector('#comp_divs');
    const results = await getData();

    let option1,option2 = 'Atlantic'
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
        console.log("submitted!")
        submitEvent.preventDefault();
        const filteredStandings = filterstandings(results,option1,option2);
       
    });
}

function filterstandings(results,divisionOne,divisionTwo){
    //filters list to pare down all results to just the relevant teams of the divisions submitted to compare
    console.log(results);
    divisionOne = divisionOne.toLowerCase();
    divisionTwo = divisionTwo.toLowerCase();
    let filteredStandings = results.filter((team) => team.division.name === divisionOne || team.division.name === divisionTwo);
    console.log(filteredStandings)
    return filteredStandings;
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
document.addEventListener('DOMContentLoaded', async () => mainEvent());