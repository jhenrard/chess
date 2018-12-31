import React from 'react'
import {connect} from 'react-redux'
import Square from './Square'
import {fetchBoard, updateBoard} from '../store/board'
import {removeAllSquares} from '../store/validSquares'
import {setPlayerTurn, fetchPlayerTurn} from '../store/currentPlayerTurn'
import {setPlayer} from '../store/currentPlayer'

class Board extends React.Component {

  async componentDidMount () {
    this.props.fetchBoard()
    await this.props.fetchcurrentPlayerTurn()
    // this.props.setPlayer(this.props.currentPlayerTurn) //temporary. setting currentplayer equal to currentplayerturn until game is truly 2 player
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
    currentPlayerTurn: state.currentPlayerTurn,
    currentPlayer: state.currentPlayer,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchBoard: () => dispatch(fetchBoard(1)),
    fetchcurrentPlayerTurn: () => dispatch(fetchPlayerTurn(1)),
    updateBoard: (newBoard, currentPlayerTurn) => dispatch(updateBoard(1, newBoard, currentPlayerTurn)),
    removeAllSquares: () => dispatch(removeAllSquares()),
    togglecurrentPlayerTurn: (player) => dispatch(setPlayerTurn(player)),
    setPlayer: (player) => dispatch(setPlayer(player)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)
