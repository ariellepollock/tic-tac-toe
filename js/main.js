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
    0: 'white',
    1: 'purple',
    '-1': 'green'
}

//////////////////////////////////
// state variables
//////////////////////////////////
let board
let turn
let winner

//////////////////////////////////
// cached DOM elements
//////////////////////////////////

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