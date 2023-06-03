import React, { useState } from "react";

export default function GameBoardPc({ onCellClick, playerTurn }) {
  const initialGameBoard = [
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


  const [gameBoard, setGameBoard] = useState(initialGameBoard);
  const [conta, setConta] = useState(0);
  const [button, setButton] = useState(false);

  // disparos del usuario al tablero del pc
  const handleCellClick = (rowIndex, cellIndex) => {
    
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
        if (conta > 12) {
          alert("Ganaste");
        }
      }
    } else {
      alert("Ya has disparado ahi");
    }
  
  };
  // generacion de barcos aleatorios
  const generateRandomShips = () => {
    const updatedGameBoard = [...gameBoard];
    const shipLengths = [5, 4, 3, 2]; // Longitudes de los barcos
  
    for (const length of shipLengths) {
      let validPosition = false;
      let rowIndex, cellIndex, orientation;
  
      while (!validPosition) {
        rowIndex = Math.floor(Math.random() * 10);
        cellIndex = Math.floor(Math.random() * 10);
        orientation = Math.random() < 0.5 ? "horizontal" : "vertical";
  
        if (checkValidPosition(updatedGameBoard, rowIndex, cellIndex, orientation, length)) {
          validPosition = true;
        }
      }
  
      if (orientation === "horizontal") {
        for (let i = 0; i < length; i++) {
          updatedGameBoard[rowIndex][cellIndex + i] = 1;
        }
      } else if (orientation === "vertical") {
        for (let i = 0; i < length; i++) {
          updatedGameBoard[rowIndex + i][cellIndex] = 1;
        }
      }
    }
  
    setGameBoard(updatedGameBoard);
    setButton(true);
  };
  
  //validacion de posicion de barcos
  const checkValidPosition = (board, rowIndex, cellIndex, orientation, length) => {
    if (orientation === "horizontal") {
      if (cellIndex + length > board[rowIndex].length) {
        return false;
      }
  
      for (let i = 0; i < length; i++) {
        if (board[rowIndex][cellIndex + i] !== 0) {
          return false;
        }
      }
    } else if (orientation === "vertical") {
      if (rowIndex + length > board.length) {
        return false;
      }
  
      for (let i = 0; i < length; i++) {
        if (board[rowIndex + i][cellIndex] !== 0) {
          return false;
        }
      }
    }
  
    return true;
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
                onClick={() => handleCellClick(rowIndex, cellIndex)}
              >
                
              </div>
            );
          })}
        </div>
      ))}
      <div>
        <button
        className="btn btn-primary"
        onClick={() => generateRandomShips()}
        disabled={button}
        >
           Posicionar barcos enemigos
        </button>
      </div>
    </div>
  );
}
