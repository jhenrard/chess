import React from 'react'
import Square from './Square'
import axios from 'axios'

class Board extends React.Component {
  constructor() {
    super()
    this.state = {
      board: [],
      selectedPiece: '',
    }
  }

  async componentDidMount () {
    const response = await axios.get('/api/games/1')
    const {data: board} = response
    const componentBoard = this.createPieceObjects(board.board)
    this.setState({id: board.id, board: componentBoard})
  }

  createPieceObjects (serverBoard) {
    const componentBoard = serverBoard.map( (row, rowIdx) => {
      return row.map( (piece, col) => {
        const player = piece[1]
        const type = piece.slice(3)
        return {
          piece: type,
          player,
          row: rowIdx,
          col,
          image: ``
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
      const col = Math.floor(i % 8)
      squares.push(<Square key={i} chessman={this.state.board[row][col]}
        colorClass={(((row + col) % 2) === 0) ? 'white-square' : 'brown-square'} />)
    }

    return (
      <div id='board'>
      { squares }
    </div>
    )
  }
}

export default Board

