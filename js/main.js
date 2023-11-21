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

// function - renderBoard - render the game board
function renderBoard() {
    // loop over our array that represents the board
    // apply a background color for each element
    board.forEach((colArr, colIdx) => {
        // colArr is the column, colIdx is the id within the array
        // console.log('colArr', colArr)
        // console.log('colIdx', colIdx)
        colArr.forEach((cellVal, rowIdx) => {
            // console.log('cellVal', cellVal)
            // console.log('rowIdx', rowIdx)
            // determine the id of the element
            const cellId = `c${colIdx}r${rowIdx}`
            // I could have done this, but it's a lil clunky and old school
            // const cellId2 = 'c' + colIdx + 'r' + rowIdx
            // console.log('cellId', cellId)

            const cellEl = document.getElementById(cellId)
            // console.log('cellEl', cellEl)

            cellEl.style.backgroundColor = colors[cellVal]
            
        })
    })
}

// render controls -> changes the visibility of the play again button
function renderControls() {
    // change initial vis of the playAgain button
    // this uses a ternary operator
    // ask a question ? if true, do this : if false do that
    playAgainButton.style.visibility = winner ? 'visible' : 'hidden'
    // change vis of our marker buttons
    markerEls.forEach((markerEl, colIdx) => {
        // if all board spaces are full (no 0's left) (means a tie)
        // OR if we have a winner (winner is a truthy value (not null))
        const hideMarker = !board[colIdx].includes(0) || winner
        // if either of those conditions is truthy, hide the markers
        // otherwise play can continue
        markerEl.style.visibility = hideMarker ? 'hidden' : 'visible'
    })
}

// render message -> display whose turn it is
function renderMessage() {
    // message a tie
    if (winner === 'T') {
        messageEl.innerText = "WOWEE, You tied!"
    // message a winner
    } else if (winner) {
        messageEl.innerHTML = `
            <span style="color: ${colors[winner]}">
                ${colors[winner].toUpperCase()}
            </span> Wins!
        `
    // or the current turn
    } else {
        messageEl.innerHTML = `
            <span style="color: ${colors[turn]}">
                ${colors[turn].toUpperCase()}
            </span>'s Turn!
        `
    }
}

// render -> call all of our render based functions at once
function render() {
    // call renderBoard
    renderBoard()
    // call renderMessage
    renderMessage()
    // call renderControls
    renderControls()
}


//////////////////////////////////
// event listeners
//////////////////////////////////