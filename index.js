/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)


// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    for (let i = 0; i < games.length ; i++) {
        const gameinfo = document.createElement("div");
        gameinfo.classList.add("game-card");

        const display = `

        <img src="${games[i].img}" class="game-img">
        <p> The game's name is ${games[i].name} </p>
        <p> The game's goal is ${games[i].goal} </p>

        `;

        gameinfo.innerHTML = display;

        gamesContainer.append(gameinfo)


    }


        // create a new div element, which will become the game card


        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container

}

addGamesToPage(GAMES_JSON)
// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce( (acc, game) => {
    return acc + game.backers;
}, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas

contributionsCard.innerHTML = ` 

 ${totalContributions.toLocaleString('en-US')}

`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalraised = GAMES_JSON.reduce( (acc, game) => {
    return acc + game.pledged;
}, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `

$${totalraised.toLocaleString('en-US')}

`;


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

const totalGames = GAMES_JSON.reduce( (acc, game) => {
    return acc + 1;
}, 0);

gamesCard.innerHTML = `

${totalGames}

`;



/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let UnfundedGames = GAMES_JSON.filter( (game) => {
        return game.pledged < game.goal;
    });
    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(UnfundedGames)

    return UnfundedGames;
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let FundedGames = GAMES_JSON.filter ( (game) => {
        return game.pledged >= game.goal;
    });

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(FundedGames);
    return FundedGames;
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    addGamesToPage(GAMES_JSON);

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button

unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games

const notFunded = GAMES_JSON.reduce( (acc, game) => {
   return game.pledged < game.goal ? acc+1 : acc;
}, 0);


// create a string that explains the number of unfunded games using the ternary operator
const displayStr = ` 
A total of $${totalraised.toLocaleString('en-US')} has been raised 
for ${totalGames} ${totalGames==1 ? "game" : "games"}. 
Currently, ${notFunded} ${totalGames==1 ? "game" : "games"} ${totalGames==1 ? "remains" : "remain"}
unfunded. We need your help to fund ${totalGames==1 ? "this" : "these"} amazing ${totalGames==1 ? "game" : "games"}!
`;

// create a new DOM element containing the template string and append it to the description container

let element1=document.createElement("p");
element1.innerHTML = displayStr;
descriptionContainer.appendChild(element1);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
let [firstgame, secondgame, ... restgames] = sortedGames;

const {name: Game1Name , pledged: Game1Pledged} = firstgame

const {name: Game2Name , pledged: Game2Pledged} = secondgame
// create a new element to hold the name of the top pledge game, then append it to the correct element

let topfunded = '';
let secondfunded = '';
Game1Pledged > Game2Pledged ? topfunded = Game1Name : topfunded = Game2Name;
Game1Pledged < Game2Pledged ? secondfunded = Game1Name : secondfunded = Game2Name;


firstGameContainer.innerHTML = topfunded;
secondGameContainer.innerHTML = secondfunded;

// do the same for the runner up item

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-btn");

// add event listeners for the "Search" button and the Enter key
searchButton.addEventListener("click", handleSearch);
searchInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        handleSearch();
    }
});

function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const matchedGames = GAMES_JSON.filter(game => game.name.toLowerCase().includes(searchTerm));

    deleteChildElements(gamesContainer);
    addGamesToPage(matchedGames);
}