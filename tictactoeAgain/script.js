function GameView() {
  const squares = document.querySelectorAll(".square");
  const gameMsg = document.querySelector(".gameMsg");
  const body = document.querySelector("body");

  gameMsg.textContent = `É a vez de ${game.getFirstPlayer().getPlayerName()}`;

  const changeGameMsg = () => {
    gameMsg.textContent =
      gameMsg.textContent ==
      `É a vez de ${game.getFirstPlayer().getPlayerName()}`
        ? `É a vez de ${game.getSecondPlayer().getPlayerName()}`
        : `É a vez de ${game.getFirstPlayer().getPlayerName()}`;
  };

  const showWinnerMsg = (playerName) => {
    gameMsg.textContent = `${playerName} ganhou!`;
  };

  const showDrawMsg = () => {
    gameMsg.textContent = "Deu Velha!";
  };

  // Função para mostrar os marcadores no tabuleiro
  const showMarkers = () => {
    squares.forEach((square, index) => {
      const linha = Math.floor(index / 3);
      const coluna = index % 3;

      switch (game.getGridArray()[linha][coluna]) {
        case 3:
          square.textContent = game.getFirstPlayer().getPlayerMarker();
          break;
        case 5:
          square.textContent = game.getSecondPlayer().getPlayerMarker();
          break;
        case 0:
          square.textContent = "";
      }
    });
  };

  // Função para mostrar o botão de reiniciar
  const showResetButton = () => {
    const resetBtn = document.createElement("button");
    resetBtn.classList.add("resetBtn");
    resetBtn.textContent = "Reiniciar";

    body.appendChild(resetBtn);
    resetBtn.addEventListener("click", () => {
      game.reset();
      gameMsg.textContent = `É a vez de ${game
        .getFirstPlayer()
        .getPlayerName()}`;
      showMarkers();
      body.removeChild(resetBtn);
    });
  };

  // Função para inicializar os event listeners nos quadrados
  const initEventListeners = () => {
    squares.forEach((square) => {
      square.addEventListener("mouseover", () => {
        if (!game.getGameIsOver() && square.textContent == "") {
          square.textContent = game.getCurrentMarker();
          square.style.color = "rgb(102, 102, 102)";
        }
      });

      square.addEventListener("mouseout", () => {
        if (square.style.color == "rgb(102, 102, 102)") {
          square.textContent = "";
        }
      });

      square.addEventListener("click", () => {
        if (
          !game.getGameIsOver() &&
          square.style.color == "rgb(102, 102, 102)"
        ) {
          square.style.color = "rgb(0, 0, 0)";
          game.wasClicked(square);
          showMarkers();
        }
      });
    });
  };

  return {
    changeGameMsg,
    showWinnerMsg,
    showDrawMsg,
    showMarkers,
    showResetButton,
    initEventListeners,
  };
}

function Game(player1, player2) {
  const gridArray = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  let gameIsOver = false;

  const firstPlayer = player1;
  const secondPlayer = player2;

  let currentMarker = player1.getPlayerMarker();
  let currentMarkerNumber = 3;

  const changeMarker = () => {
    currentMarkerNumber = currentMarkerNumber == 3 ? 5 : 3;
    currentMarker =
      currentMarker == firstPlayer.getPlayerMarker()
        ? secondPlayer.getPlayerMarker()
        : firstPlayer.getPlayerMarker();
  };

  const wasClicked = (square) => {
    if (gameIsOver) {
      return;
    }

    const linha = Math.floor(Number(square.id) / 3);
    const coluna = Number(square.id) % 3;

    gridArray[linha][coluna] = currentMarkerNumber;
    const result = checkSituation();

    switch (result) {
      case 3:
        gameIsOver = true;
        gameView.showWinnerMsg(firstPlayer.getPlayerName());
        gameView.showResetButton();
        break;
      case 5:
        gameIsOver = true;
        gameView.showWinnerMsg(secondPlayer.getPlayerName());
        gameView.showResetButton();
        break;
      case 0:
        changeMarker();
        gameView.changeGameMsg();
        break;
      case -1:
        gameIsOver = true;
        gameView.showDrawMsg();
        gameView.showResetButton();
        break;
    }
  };

  const checkSituation = () => {
    const linhas = [];
    const colunas = [];

    for (let i = 0; i < 3; i++) {
      linhas.push(gridArray[i]);
      colunas.push([gridArray[0][i], gridArray[1][i], gridArray[2][i]]);
    }

    const diagonalPrincipal = [
      gridArray[0][0],
      gridArray[1][1],
      gridArray[2][2],
    ];
    const diagonalSecundaria = [
      gridArray[0][2],
      gridArray[1][1],
      gridArray[2][0],
    ];

    for (let i = 0; i < 3; i++) {
      let somaLinha = linhas[i][0] + linhas[i][1] + linhas[i][2];
      let somaColuna = colunas[i][0] + colunas[i][1] + colunas[i][2];

      if (somaLinha == 9 || somaColuna == 9) {
        return 3;
      } else if (somaLinha == 15 || somaColuna == 15) {
        return 5;
      }
    }

    const somaDiagonalPrincipal =
      diagonalPrincipal[0] + diagonalPrincipal[1] + diagonalPrincipal[2];
    const somaDiagonalSecundaria =
      diagonalSecundaria[0] + diagonalSecundaria[1] + diagonalSecundaria[2];

    if (somaDiagonalPrincipal == 9 || somaDiagonalSecundaria == 9) {
      return 3;
    } else if (somaDiagonalPrincipal == 15 || somaDiagonalSecundaria == 15) {
      return 5;
    }

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (gridArray[i][j] == 0) {
          return 0;
        }
      }
    }

    return -1;
  };

  const reset = () => {
    gridArray.forEach((row, i) => row.fill(0)); // zera a gridArray
    gameIsOver = false;
    currentMarker = firstPlayer.getPlayerMarker();
    currentMarkerNumber = 3;
  };

  const getGridArray = () => gridArray;
  const getGameIsOver = () => gameIsOver;
  const getFirstPlayer = () => firstPlayer;
  const getSecondPlayer = () => secondPlayer;
  const getCurrentMarker = () => currentMarker;
  const getCurrentMarkerNumber = () => currentMarkerNumber;

  return {
    changeMarker,
    wasClicked,
    checkSituation,
    reset,
    getGridArray,
    getGameIsOver,
    getFirstPlayer,
    getSecondPlayer,
    getCurrentMarker,
    getCurrentMarkerNumber,
  };
}

function Player(marker, name) {
  const playerMarker = marker;
  const playerName = name;

  const getPlayerMarker = () => playerMarker;
  const getPlayerName = () => playerName;

  return { getPlayerMarker, getPlayerName };
}

const player1 = Player("$", "John");
const player2 = Player("#", "Mary");

const game = Game(player1, player2);
const gameView = GameView();

// Inicializar event listeners
gameView.initEventListeners();
