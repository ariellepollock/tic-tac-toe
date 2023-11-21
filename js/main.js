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
    null: 'T',
    1: 'X',
    '-1': 'O'
}

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

//////////////////////////////////
// state variables
//////////////////////////////////
let board 
let turn // will be a value of 1 or -1 (1 || -1)
let winner // null || 1 || -1 || 'T'

//////////////////////////////////
// cached DOM elements
//////////////////////////////////
// grab our HTML elements, save them to variables, and use later
const message = document.querySelector('h2');
const playAgainBtn = document.querySelector('button');



//////////////////////////////////
// functions
//////////////////////////////////
function initialize() {
    board = [null, null, null, null, null, null, null, null, null];
    // OR initialize like this:
    // board = new Array(9).fill(null);
    turn = 1;
    winner = null;
    render();
}

initialize()

// function - renderBoard - render the game board
function handleMove(evt) {
    // obtain index of square
    const idx = parseInt(evt.target.id.replace('sq-', ''));
    // Guards
    if (
      // Didn't click <div> in grid
      isNaN(idx) ||
      // Square already taken
      board[idx] ||
      // Game over
      winner
    ) return;
    // Update state (board, turn, winner)
    board[idx] = turn;
    turn *= -1;
    winner = getWinner();
    // Render updated state
    render();
  }

function getWinner() {
    for (let winArr of winningCombos) {
      if (Math.abs(board[0] + board[1] + board[2]) === 3) return board[0];
      if (Math.abs(board[3] + board[4] + board[5]) === 3) return board[3];
      if (Math.abs(board[6] + board[7] + board[8]) === 3) return board[6];
      if (Math.abs(board[0] + board[3] + board[6]) === 3) return board[0];
      if (Math.abs(board[1] + board[4] + board[7]) === 3) return board[1];
      if (Math.abs(board[2] + board[5] + board[8]) === 3) return board[2];
      if (Math.abs(board[0] + board[4] + board[8]) === 3) return board[0];
      if (Math.abs(board[2] + board[4] + board[6]) === 3) return board[2];
    if (board.includes(null)) return null;
    }
    return 'T';
  }

// render -> call all of our render based functions at once
function render() {
    // call renderBoard
    renderBoard()
    // call renderMessage
    renderMessage()
    // Hide/show PLAY AGAIN button
    playAgainBtn.disabled = !winner;
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

function renderMessage() {
    if (winner === 'T') {
      message.innerHTML = 'Rats, another tie!';
    } else if (winner) {
      message.innerHTML = `Congrats <span style="color: ${COLOR_LOOKUP[winner]}">${COLOR_LOOKUP[winner].toUpperCase()}</span>!`;
    } else {
      message.innerHTML = `<span style="color: ${COLOR_LOOKUP[turn]}">${COLOR_LOOKUP[turn].toUpperCase()}</span>'s Turn`;
    }
  }




//////////////////////////////////
// event listeners
//////////////////////////////////
document.getElementById('board').addEventListener('click', handleMove);
playAgainBtn.addEventListener('click', initialize);