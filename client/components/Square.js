import React from 'react'
import {DropTarget} from 'react-dnd'
import {connect as connectRedux} from 'react-redux'
import Piece from './Piece'
import {createServerPieces, dropPiece, checkSquare} from '../gamelogic'
import socket from '../socket';

const squareTarget = {
  drop(props, monitor) {
    props.removeAllSquares()
    const piece = monitor.getItem()

    if (piece.player === props.currentPlayerTurn) {
      const newComponent = <Piece piece={{piece: piece.piece, x: props.x, y: props.y, player: piece.player}} />
      const newBoard = dropPiece(newComponent, piece, {x: piece.x, y: piece.y}, {x: props.x, y: props.y}, props.board)
      const nextPlayer = (piece.player === 1) ? 2 : 1

      props.togglecurrentPlayerTurn(nextPlayer)
      // props.setPlayer(nextPlayer)
      props.updateBoard(createServerPieces(newBoard), nextPlayer) // refactor to import store and use dispatch

      // const newBoard2 = props.fetchBoard()
      // console.log('newBoard2', newBoard2)
      // socket.emit('drop', props.fetchBoard())
    }
  },
  canDrop(props, monitor) {
    const piece = monitor.getItem()
    const answer = checkSquare(piece, {x: piece.x, y: piece.y}, {x: props.x, y: props.y}, props.board, props.currentPlayer) // refactor to get board and currentPlayer from store
    return answer
  }
}

function collect (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }
}

class Square extends React.Component {
  render () {
    const props = this.props
    const squareNum = (props.x * 8 + props.y)
    const validMove = props.validSquares.includes(squareNum)

    return props.connectDropTarget(
      <div className="square-container">
        <div className={props.colorClass}>{props.children}</div>
        {(props.canDrop || validMove) && <div className="square-highlight" />}
      </div>
      )
  }
}

const mapStateToProps = state => {
  return {
    validSquares: state.validSquares,
    currentPlayerTurn: state.currentPlayerTurn
  }
}

const connectedSquare = connectRedux(mapStateToProps)(Square)
export default DropTarget('Piece', squareTarget, collect)(connectedSquare)


// ASK GAEL OR GABE WHY PROPS AREN'T AVAILABLE IN SQUARETARGET? NEED TO PASS THEM FROM BOARD OR IMPORT THE STORE. DOES SQUARETARGET NEED TO BE LOWER?
