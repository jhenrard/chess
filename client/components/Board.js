import React from 'react'
import {connect} from 'react-redux'
import Square from './Square'
import {fetchBoard, updateBoard} from '../store/board'
import {removeAllSquares} from '../store/validSquares'

class Board extends React.Component {

  async componentDidMount () {
    this.props.fetchBoard()
  }

  render () {
    const board = this.props.board
    const squares = []
    if (!board[0]) { return null }
    for (let i = 0; i < 64; i++) {
      const row = Math.floor(i / 8)
      const col = (i % 8)
      squares.push(<Square key={i} x={row} y={col} {...this.props} colorClass={(((row + col) % 2) === 0) ? 'white-square' : 'brown-square'}>{board[row][col]}</Square>) //refactor Square.js to import store. should not pass {...this.props}. can also calculate color class in Square component
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
    removeAllSquares: () => dispatch(removeAllSquares()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)
