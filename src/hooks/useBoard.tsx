import React, { useContext, useState, useEffect } from 'react'
import { Board } from '../models/Board'
import { Colors } from '../models/Colors'
import { Player } from '../models/Player'

type BoardContextProps = {
  children: React.ReactNode
}

export interface IBoardContext {
  board: Board
  whitePlayer: Player
  blackPlayer: Player
  currentPlayer: Player | null
  swapPlayer: () => void
  setBoard: (board: Board) => void
  restart: () => void
  setCurrentPlayer: (player: Player) => void
}

const BoardContext = React.createContext<IBoardContext | null>(null)

export const useBoard = () => {
  return useContext(BoardContext) as IBoardContext
}

export const BoardProvider = ({ children }: BoardContextProps) => {
  const [board, setBoard] = useState(new Board())
  const [whitePlayer] = useState(new Player(Colors.WHITE))
  const [blackPlayer] = useState(new Player(Colors.BLACK))
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
    <BoardContext.Provider
      value={{
        board,
        setBoard,
        whitePlayer,
        blackPlayer,
        currentPlayer,
        swapPlayer,
        restart,
        setCurrentPlayer
      }}
    >
      {children}
    </BoardContext.Provider>
  )
}
