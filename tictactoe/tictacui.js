// updateScreen that will basically empty the board and then show the results updated
// clickHandlerBoard that will be an event based function that will be executed whenever a click one of the columns
// both the updateScreen and the clickHandlerBoard will be functions of the a ScreenController function

// Console version of the tictactoe game
function Gameboard() {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];

    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  // This will be used by our ScreenController
  const getBoard = () => board;

  const putObject = (row, column, playerNumber) => {
    // In case the board is already filled in that position, we don't want to do anything
    if (board[row][column].getValue() != 0) {
      return;
    }

    board[row][column].setValue(playerNumber);
  };

  const printBoard = () => {
    for (let row of board) {
      const cellValues = row.map((cell) => cell.getValue());
      console.log(cellValues);
    }
  };
}

function Cell() {
  let value = 0;

  getValue = () => value;

  setValue = (val) => (value = val);
}

function GameController() {
  // Defining the players
  const players = [
    {
      name: "Player1",
      number: 3,
      symbol: "X",
    },
    {
      name: "Player2",
      number: 5,
      symbol: "O",
    },
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer.number === 3
      ? (activePlayer = players[1])
      : (activePlayer = players[0]);
  };

  const getActivePlayer = () => activePlayer;
}

function ScreenController() {
  const updateScreen = () => {};

  const clickHandlerBoard = () => {};
}
