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

function renderBoard() {
    board.forEach(function(sqVal, idx) {
      const squareEl = document.getElementById(`sq-${idx}`);
      squareEl.style.backgroundColor = colors[sqVal];
      // Add class if square available for hover effect
      squareEl.className = !sqVal ? 'avail' : '';
    });
}

// render message -> display players turn, winner or tie
function renderMessage() {
    if (winner === 'T') {
      message.innerHTML = 'WOWEE, a tie!';
    } else if (winner) {
      message.innerHTML = `<span style="color: ${colors[winner]}">${colors[winner].toUpperCase()}</span> wins!`;
    } else {
      message.innerHTML = `<span style="color: ${colors[turn]}">${colors[turn].toUpperCase()}</span>'s Turn`;
    }
  }

//////////////////////////////////
// event listeners
//////////////////////////////////
document.getElementById('board').addEventListener('click', handleMove);
playAgainBtn.addEventListener('click', initialize);