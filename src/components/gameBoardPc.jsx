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

  const navGameBoard = [
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  const [gameBoard, setGameBoard] = useState(initialGameBoard);
  const [conta, setConta] = useState(0);

  const handleCellClick = (rowIndex, cellIndex) => {
    
    if (
      gameBoard[rowIndex][cellIndex] !== 3 &&
      gameBoard[rowIndex][cellIndex] !== 4
    ) {
      const updatedGameBoard = [...gameBoard];
      updatedGameBoard[rowIndex][cellIndex] =
        navGameBoard[rowIndex][cellIndex] === 1 ? 3 : 4;
      setGameBoard(updatedGameBoard);
      onCellClick(gameBoard[rowIndex][cellIndex]);
      if (gameBoard[rowIndex][cellIndex] === 3) {
        setConta(conta + 1);
        console.log(conta);
        if (conta > 1) {
          alert("Ganaste");
        }
      }
    } else {
      alert("Ya has disparado ahi");
    }
  
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
                {cell}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
