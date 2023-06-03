import React, { useEffect, useState } from "react";

export default function GameBoardUser({ onCellClick, playerTurn }) {
  const navGameBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  const [gameBoard, setGameBoard] = useState(navGameBoard);
  const [conta, setConta] = useState(0);
  const [start, setStart] = useState(false);
  const [ships, setShips] = useState(0);
  const [occupiedCells, setOccupiedCells] = useState([]);
  const [shipOrientation, setShipOrientation] = useState("");
  const [shipLength, setShipLength] = useState(0);
  const [selectionComplete, setSelectionComplete] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState({
    destroyer: false,
    submarine: false,
    carrier: false,
    boat: false,
  });
  const resetGame = () => {
    setGameBoard(navGameBoard);
    setConta(0);
    setStart(false);
    setShips(0);
    setShipOrientation("");
    setShipLength(0);
    setSelectionComplete(false);
    setOccupiedCells([]);
    setButtonDisabled({
      destroyer: false,
      submarine: false,
      carrier: false,
      boat: false,
    });
  };
  // poner barcos en el tablero, sin que se superpongan y sin que se salgan del tablero.
  const putNav = (rowIndex, cellIndex) => {
    if (!start && shipLength > 0) {
      const updatedGameBoard = [...gameBoard];

      if (shipOrientation === "horizontal") {
        if (cellIndex + shipLength > gameBoard[rowIndex].length) {
          alert(
            "No hay suficientes celdas para colocar el barco horizontalmente"
          );
          return;
        }

        for (let i = 0; i < shipLength; i++) {
          if (occupiedCells.includes(`${rowIndex},${cellIndex + i}`)) {
            alert("Hay un barco en esa posición");
            return;
          }
        }
        for (let i = 0; i < shipLength; i++) {
          updatedGameBoard[rowIndex][cellIndex + i] = 1;
          setOccupiedCells((prevState) => [
            ...prevState,
            `${rowIndex},${cellIndex + i}`,
          ]);
        }
      } else if (shipOrientation === "vertical") {
        if (rowIndex + shipLength > gameBoard.length) {
          alert(
            "No hay suficientes celdas para colocar el barco verticalmente"
          );
          return;
        }

        for (let i = 0; i < shipLength; i++) {
          if (occupiedCells.includes(`${rowIndex + i},${cellIndex}`)) {
            alert("Hay un barco en esa posición");
            return;
          }
        }
        for (let i = 0; i < shipLength; i++) {
          updatedGameBoard[rowIndex + i][cellIndex] = 1;
          setOccupiedCells((prevState) => [
            ...prevState,
            `${rowIndex + i},${cellIndex}`,
          ]);
        }
      }
      setGameBoard(updatedGameBoard);
      setShipOrientation("");
      setShipLength(0);
    }
  };

  // seleccionar orientacion y longitud de los barcos
  const handleOrientationSelection = (orientation, length, shipType) => {
    setShipOrientation(orientation);
    setShipLength(length);

    setSelectionComplete(false);
    setButtonDisabled((prevState) => ({
      ...prevState,
      [shipType]: true,
    }));
  };

  // seleccion de tiro por parte del PC
  const pcAttack = (rowIndex, cellIndex) => {
    if (
      gameBoard[rowIndex][cellIndex] !== 3 &&
      gameBoard[rowIndex][cellIndex] !== 4
    ) {
      const updatedGameBoard = [...gameBoard];
      updatedGameBoard[rowIndex][cellIndex] =
        gameBoard[rowIndex][cellIndex] === 1 ? 3 : 4;
      setGameBoard(updatedGameBoard);
      onCellClick(gameBoard[rowIndex][cellIndex]);
      if (gameBoard[rowIndex][cellIndex] === 3) {
        setConta(conta + 1);
        console.log(conta);
        if (conta > 14) {
          alert("Gano Pc");
        }
      }
    } else {
      pcAttack(Math.floor(Math.random() * 9), Math.floor(Math.random() * 9));
    }
  };

  useEffect(() => {
    if (playerTurn === false) {
      pcAttack(Math.floor(Math.random() * 9), Math.floor(Math.random() * 9));
    }
  }, [playerTurn]);

  const comienza = () => {
    setStart(true);
  };
  return (
    <div>
      {gameBoard.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex" }}>
          {row.map((cell, cellIndex) => {
            let background = "white";
            if (cell === 0) {
              background = "white";
            } else if (cell === 3) {
              background = "red";
            } else if (cell === 4) {
              background = "blue";
            } else if (cell === 1) {
              background = "green";
            }
            return (
              <div
                key={cellIndex}
                style={{
                  width: "30px",
                  height: "30px",
                  backgroundColor: background,
                  border: "1px solid black",
                }}
                onClick={() => putNav(rowIndex, cellIndex)}
              ></div>
            );
          })}
        </div>
      ))}
      <div>
        <button className="btn btn-success" onClick={() => comienza()}>
          Empezar a jugar
        </button>
        <button className="btn btn-danger" onClick={resetGame}>
          Tablero en blanco
        </button>
        <h3>Barcos</h3>

        <h4>Destructor 5</h4>
        <button
          className="btn btn-primary"
          onClick={() =>
            handleOrientationSelection("horizontal", 5, "destroyer")
          }
          disabled={buttonDisabled.destroyer || selectionComplete}
        >
          Horizontal
        </button>
        <button
          className="btn btn-primary"
          onClick={() => handleOrientationSelection("vertical", 5, "destroyer")}
          disabled={buttonDisabled.destroyer || selectionComplete}
        >
          Vertical
        </button>
        <h4>Submarino 4</h4>
        <button
          className="btn btn-primary"
          onClick={() =>
            handleOrientationSelection("horizontal", 4, "submarine")
          }
          disabled={buttonDisabled.submarine || selectionComplete}
        >
          Horizontal
        </button>
        <button
          className="btn btn-primary"
          onClick={() => handleOrientationSelection("vertical", 4, "submarine")}
          disabled={buttonDisabled.submarine || selectionComplete}
        >
          Vertical
        </button>
        <h4>Portaaviones 3</h4>
        <button
          className="btn btn-primary"
          onClick={() => handleOrientationSelection("horizontal", 3, "carrier")}
          disabled={buttonDisabled.carrier || selectionComplete}
        >
          Horizontal
        </button>
        <button
          className="btn btn-primary"
          onClick={() => handleOrientationSelection("vertical", 3, "carrier")}
          disabled={buttonDisabled.carrier || selectionComplete}
        >
          Vertical
        </button>
        <h4>Lancha 2</h4>
        <button
          className="btn btn-primary"
          onClick={() => handleOrientationSelection("horizontal", 2, "boat")}
          disabled={buttonDisabled.boat || selectionComplete}
        >
          Horizontal
        </button>
        <button
          className="btn btn-primary"
          onClick={() => handleOrientationSelection("vertical", 2, "boat")}
          disabled={buttonDisabled.boat || selectionComplete}
        >
          Vertical
        </button>
      </div>
    </div>
  );
}
