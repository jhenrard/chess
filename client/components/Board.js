import React from 'react'
import {connect} from 'react-redux'
import {fetchBoard, updateBoard} from '../store/board'
import {removeAllSquares} from '../store/validSquares'
import {setPlayerTurn} from '../store/currentPlayerTurn'
import {setPlayer} from '../store/currentPlayer'
import SquareContainer from './SquareContainer';

class Board extends React.Component {

  componentDidMount () {
    // this.props.fetchBoard(this.props.currentPlayer)
    // this.props.fetchcurrentPlayerTurn()
    // this.props.setPlayer(this.props.currentPlayerTurn) //temporary. setting currentplayer equal to currentplayerturn until game is truly 2 player
  }

  render () {
    // const board = this.props.board
    // const squares = []
    // if (!board[0]) { return null }
    // for (let i = 0; i < 64; i++) {
    //   const row = Math.floor(i / 8)
    //   const col = (i % 8)
    //   squares.push(<Square key={i} x={row} y={col} {...this.props} colorClass={(((row + col) % 2) === 0) ? 'white-square' : 'brown-square'}>{board[row][col]}</Square>) //refactor Square.js to import store. should not pass {...this.props}. can also calculate color class in Square component
    // }
// flatmap board array and map each component to Square

    if (!this.props.board.length) return (
        <div id='board'>
          <div className='loader'/>
        </div>
      )

    return (
        <div id='board'>
          {
            this.props.board.length > 0 &&
            [...Array(64)].map((square, i) => {
              const x = Math.floor(i / 8)
              const y = i % 8
              return <SquareContainer key={i} x={x} y={y} />
            })
            // board.length > 0 && board.flat().map((square, i) => {
            //   const x = Math.floor(i / 8)
            //   const y = i % 8
            //   return <SquareContainer key={i} x={x} y={y} />
            // })
          }
          {/* { squares } */}
        </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    board: state.board,
    // currentPlayerTurn: state.currentPlayerTurn,
    currentPlayer: state.currentPlayer,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchBoard: (currentPlayer) => dispatch(fetchBoard(1, currentPlayer)),
    // fetchcurrentPlayerTurn: () => dispatch(fetchPlayerTurn(1)),
    updateBoard: (newBoard, currentPlayerTurn, currentPlayer) => dispatch(updateBoard(1, newBoard, currentPlayerTurn, currentPlayer)),
    removeAllSquares: () => dispatch(removeAllSquares()),
    togglecurrentPlayerTurn: (player) => dispatch(setPlayerTurn(player)),
    setPlayer: (player) => dispatch(setPlayer(player)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)
