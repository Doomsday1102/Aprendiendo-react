import { useState } from "react"

import confetti from 'canvas-confetti'
import { Square } from "./components/Square"
import { TURNS } from "./constants"
import { checkWinner,checkEndGame } from "./logic/board"
import { WinnerModal } from "./components/WinnerModal"
import { resetGameStorage, saveGameToStorage } from "./logic/storage/storage"
function App() {

  const [board, setBoard] = useState(()=>{
    const boardFromStorage= window.localStorage.getItem('board')
     if(boardFromStorage) return JSON.parse(boardFromStorage) 
    return Array(9).fill(null)
  })

  const [turn,setTurn] = useState(()=>{
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })

  const [winner,setWinner] = useState(null)

  

  const resetGame= ()=>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    resetGameStorage()
  }

  const updateBoard= (index) => {

    //no actualizamos si ya esta ocupada la posicion
    if(board[index] || winner) return

    //actualizar el tablero
    const newBoard= [...board]
    newBoard[index]= turn
    setBoard(newBoard)

    //cambiar el turno
    const newTurn = turn=== TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    //guardar partida
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })
    //revisar ganador
    const newWinner=checkWinner(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)
    } else if(checkEndGame(newBoard)){
      setWinner(false)//empate
    }
      
  }

  return (
    <main className='board'>
      <h1>TIC TAC TOE</h1>
      <button onClick={resetGame}>Reset Game</button>
      <section className="game">
      {
          board.map((square, index) => {
            return(
              <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
            >
              {square}
            </Square>
            )
          })
        }
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
      <WinnerModal resetGame={resetGame} winner={winner}></WinnerModal>
    </main>
  )
}

export default App
