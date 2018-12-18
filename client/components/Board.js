import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import Square from './Square'
import {fetchBoard, updateBoard} from '../store/board'
import Piece from './Piece'

class Board extends React.Component {
  // constructor() {
  //   super()
  //   this.state = {
  //     board: [],
  //   }
  //   this.dropPiece = this.dropPiece.bind(this)
  // }

  async componentDidMount () {
    // const response = await axios.get('/api/games/1')
    // const {data: board} = response
    // const componentBoard = this.createPieceObjects(board.board)
    // this.setState({id: board.id, board: componentBoard})
    this.props.fetchBoard()
  }

  // dropPiece (newComponent, piece, from, to) {
  //   const newBoard = [...this.state.board]

  //   if (piece.piece === 'Pawn') {
  //     const fromX = from.x, fromY = from.y, toX = to.x, toY = to.y
  //     const forward = (toX - fromX === -1) && (toY === fromY)
  //     const diagonal = (toX - fromX === -1) && (Math.abs(toY - fromY) === 1)
  //     const opponentPieceToTake = this.state.board[toX][toY] && this.state.board[toX][toY].props.piece.player === 2 // REMEMBER TO REFACTOR FOR PLAYER 2 VIEW
  //     if ((forward && !opponentPieceToTake) || (diagonal && opponentPieceToTake)) {
  //       newBoard[from.x][from.y] = ''
  //       newBoard[to.x][to.y] = newComponent
  //     }
  //   }

  //   this.setState({board: newBoard})
  // }

  // createPieceObjects (serverBoard) {
  //   const componentBoard = serverBoard.map( (row, rowIdx) => {
  //     return row.map( (serverPiece, col) => {
  //       const player = Number(serverPiece[1])
  //       const piece = serverPiece.slice(3)
  //       if (piece.length) {
  //         return <Piece piece={{player, x: rowIdx, y: col, piece}} />
  //       } else {
  //         return ''
  //       }
  //     })
  //   })
  //   return componentBoard
  // }

  // dropPiece={this.dropPiece}

  render () {
    const board = this.props.board
    const squares = []
    if (!board[0]) { return null }
    for (let i = 0; i < 64; i++) {
      const row = Math.floor(i / 8)
      const col = (i % 8)
      squares.push(<Square key={i} x={row} y={col} {...this.props}
        colorClass={(((row + col) % 2) === 0) ? 'white-square' : 'brown-square'}>{board[row][col]}</Square>)
    }

    return (
        <div id='board'>
        { squares }
        </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    board: state.board,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchBoard: () => dispatch(fetchBoard(1)),
    updateBoard: (newBoard) => dispatch(updateBoard(1, newBoard)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)
