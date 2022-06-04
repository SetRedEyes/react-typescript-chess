import { useEffect, useState } from 'react'
import BoardComponent from './components/BoardComponent'
import { Board } from './models/Board'
import './App.scss'
import { Player } from './models/Player'
import { Colors } from './models/Colors'
import LostFigures from './components/LostFigures'

const App = () => {
  const [board, setBoard] = useState(new Board())
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE))
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK))
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)

  useEffect(() => {
    restart()
    setCurrentPlayer(whitePlayer)
  }, [])

  const restart = () => {
    const newBoard = new Board()
    newBoard.initCells()
    newBoard.addFigures()
    setBoard(newBoard)
  }

  const swapPlayer = () => {
    setCurrentPlayer((prevPlayer) =>
      prevPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer
    )
  }

  return (
    <div className='app'>
      <BoardComponent board={board} setBoard={setBoard} currentPlayer={currentPlayer} swapPlayer={swapPlayer} /> 
      <div>
        <LostFigures title='Black figures' figures={board.lostBlackFigures}/>
        <LostFigures title='White figures' figures={board.lostWhiteFigures}/>
      </div>
    </div>
  )
}

export default App
