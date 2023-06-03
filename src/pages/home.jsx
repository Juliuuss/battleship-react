import React, { useState } from "react";
import GameBoardPc from "../components/gameBoardPc";
import GameBoardUser from "../components/gameBoardUser";

function Home() {
  const [playerSelection, setPlayerSelection] = useState(0);
  const [pcSelection, setPcSelection] = useState(0);
  const [playerTurn, setPlayerTurn] = useState(true);

  const handlePlayerSelection = (tiro) => {
    if (playerTurn) {
      setPlayerSelection(tiro);
      setPlayerTurn(false);
    }
  };

  const handlePcSelection = (row, cell) => {
    if (!playerTurn) {
      setPcSelection([row, cell]);
      setPlayerTurn(true);
    }
  };
  const handleReload = () => {
    window.location.reload();
  };
  return (
    <div className="d-flex p-4 justify-content-evenly">
      <div>
        <h1>Tablero Jugador</h1>
        <GameBoardUser
          onCellClick={handlePcSelection}
          playerTurn={playerTurn}
        />
      </div>
      <div>
        <button className="btn btn-primary" onClick={handleReload}>
          Reinicia el juego
        </button>
      </div>
      <div>
        <h1>Tablero Pc</h1>
        <GameBoardPc onCellClick={handlePlayerSelection} />
      </div>
    </div>
  );
}

export default Home;
