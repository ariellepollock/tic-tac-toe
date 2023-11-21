// game displays rows and columns of cells
// player is notified of whose turn it is
// player clicks a button to make a move
// the player's move is displayed on the board
// the turn switches from p1 to p2
// p2 can select a move with the same process
// at the end of a game, announce the winner
// allow the opportunity to play again

//////////////////////////////////
// constants
//////////////////////////////////
const colors = {
    0: 'almond',
    1: 'purple',
    '-1': 'green'
}

//////////////////////////////////
// state variables
//////////////////////////////////
let board // an array of 3 nested arrays
let turn // will be a value of 1 or -1 (1 || -1)
let winner // null || 1 || -1 || 'T'

//////////////////////////////////
// cached DOM elements
//////////////////////////////////
// grab our HTML elements, save them to variables, and use later
const messageEl = document.querySelector('h2')
const playAgainButton = document.querySelector('button')
// we want to grab our marker elements and save them to an array
// because we used array brackets, the spread operator is grabbing the items in the nodelist and pushing them into a new array
const markerEls = [...document.querySelectorAll('#markers > div')]
console.log('markerEls \n', markerEls)

//////////////////////////////////
// functions
//////////////////////////////////
function init() {
    turn = 1
    winner = null

    board = [
        [0, 0, 0], // col 0
        [0, 0, 0], // col 1
        [0, 0, 0], // col 2
    ]

    // CALL THE RENDER FUNCTION ONCE THE RENDER FUNCTION IS BUILT
    render()
}

init()

//////////////////////////////////
// event listeners
//////////////////////////////////