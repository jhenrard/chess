import React from 'react'
import axios from 'axios'
import Square from './Square'
import Piece from './Piece'

class Board extends React.Component {
  constructor() {
    super()
    this.state = {
      board: [],
      selectedPiece: '',
    }
    this.dropPiece = this.dropPiece.bind(this)
  }

  async componentDidMount () {
    const response = await axios.get('/api/games/1')
    const {data: board} = response
    const componentBoard = this.createPieceObjects(board.board)
    this.setState({id: board.id, board: componentBoard})
  }

  dropPiece = (piece, from, to) => {
    const newBoard = [...this.state.board]
    newBoard[from.x][from.y] = ''
    newBoard[to.x][to.y] = piece
    this.setState({board: newBoard})
  }

  createPieceObjects (serverBoard) {
    const componentBoard = serverBoard.map( (row, rowIdx) => {
      return row.map( (serverPiece, col) => {
        const player = serverPiece[1]
        const piece = serverPiece.slice(3)
        if (piece.length) {
          return <Piece piece={{player, x: rowIdx, y: col, piece}} />
        } else {
          return ''
        }
      })
    })
    return componentBoard
  }

  render () {
    const squares = []
    if (!this.state.board[0]) { return null }
    for (let i = 0; i < 64; i++) {
      const row = Math.floor(i / 8)
      const col = (i % 8)
      squares.push(<Square key={i} x={row} y={col} dropPiece={this.dropPiece}
        colorClass={(((row + col) % 2) === 0) ? 'white-square' : 'brown-square'}>{this.state.board[row][col]}</Square>)
    }

    return (
        <div id='board'>
        { squares }
        </div>
    )
  }
}

export default Board
