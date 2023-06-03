import React , {useState, useEffect}from 'react'
import GameBoardPc from "../components/gameBoardPc";
import GameBoardUser from "../components/gameBoardUser"



function Home() {

    const [playerSelection, setPlayerSelection] = useState(0);
    const [pcSelection, setPcSelection] = useState(0);
    const [conta, setConta] = useState(0);
    const [playerTurn, setPlayerTurn] = useState(true);
    


    const handlePlayerSelection = (tiro)=>{
        if (playerTurn){
        setPlayerSelection(tiro);
       setPlayerTurn(false);
        }
    };
   
    const handlePcSelection = (row,cell)=>{
        if (!playerTurn){
        setPcSelection([row,cell]);
        setPlayerTurn(true);
        }
    };
 
    console.log(playerTurn);
    console.log(pcSelection);
  return (
    
      <div className="d-flex p-4 justify-content-evenly">
        <div>
            <h1>Tablero Jugador</h1>
        <GameBoardUser onCellClick={handlePcSelection} playerTurn={playerTurn} />
        </div>
        <div>
            <h1>Tablero Pc</h1>
        <GameBoardPc onCellClick={handlePlayerSelection} />
        </div>
      </div>
    
  );
}

export default Home;
