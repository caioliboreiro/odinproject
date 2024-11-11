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
  const board = Gameboard();
  let counter = 0;

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

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer()}'s turn.`);
  };

  const playRound = (row, column) => {
    counter++;
    console.log(
      `Putting the ${getActivePlayer().name}'s ${
        getActivePlayer().symbol
      } on row ${row} column ${column}`
    );
    board.putObject(row, column, getActivePlayer().number);

    // Checking if there was an winner
    checkWinner(board, counter);

    switchPlayerTurn();
    printNewRound();
  };

  const checkWinner = (board, counter) => {
    // Checking the rows of our board
    for (linha of board) {
      soma_linha = sum(...linha);
      if (soma_linha == 9 || soma_linha == 15) {
        let result = [true, soma_linha / 3];
        return result;
      }
    }

    // Checking the columns of our board
    for (let i = 0; i < 3; i++) {
      let column = [];

      for (row of board) {
        column.push(row[i]);
      }
      let columnSum = sum(...column);

      if (columnSum == 9 || columnSum == 15) {
        let result = [true, columnSum / 3];
        return result;
      }
    }

    // Checking the diagonals of our board
    // Main Diagonal
    const mainDiag = [board[0][0], board[1][1], board[2][2]];

    let mainDiagSum = sum(...mainDiag);

    if (mainDiagSum == 9 || mainDiagSum == 15) {
      let result = [true, mainDiagSum / 3];
      return result;
    }

    // Secondary Diagonal
    const secDiag = [board[0][2], board[1][1], board[2][0]];

    let secDiagSum = sum(...secDiag);

    if (secDiagSum == 9 || secDiagSum == 15) {
      let result = [true, secDiagSum / 3];
      return result;
    }

    // Checking if there was a draw
    if (counter == 9) {
      let result = [false, -1];
      return result;
    }

    // There wasn't a winner nor there was a draw
    else {
      let result = [false, 0];
      return result;
    }
  };

  function sum(...cells) {
    let sum = 0;
    for (cell of cells) {
      sum += cell.getValue();
    }
    return sum;
  }
}

const game = GameController();

console.log(game);
