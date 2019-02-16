import React from 'react'
import {DropTarget} from 'react-dnd'
import {connect as connectRedux} from 'react-redux'
import {compose} from 'redux'
import Square from './Square'
import {createServerBoard, dropPiece, checkSquare} from '../gamelogic'
import {setPlayerTurn} from '../store/currentPlayerTurn'
import {updateBoard} from '../store/board'

const squareTarget = {
  drop(props, monitor) {
    // props.removeAllSquares()
    const piece = monitor.getItem()
    console.log('piece in SquareContainer drop: ', piece)
    const fromX = (props.currentPlayer === 2) ? 7 - piece.x : piece.x
    const fromY = (props.currentPlayer === 2) ? 7 - piece.y : piece.y
    if (piece.player === props.currentPlayerTurn) {
      // const newComponent = <Piece piece={{piece: piece.piece, x: props.x, y: props.y, player: piece.player}} />
      const newBoard = dropPiece(piece, {x: fromX, y: fromY}, {x: props.x, y: props.y}, props.board)
      const nextPlayer = (piece.player === 1) ? 2 : 1

      props.togglecurrentPlayerTurn(nextPlayer)
      // props.setPlayer(nextPlayer)

      // CREATE SERVER PIECES NOW HAS TO JSON STRINGIFY OBJECTS FOR DB

      props.updateBoard(createServerBoard(newBoard), nextPlayer, props.currentPlayer)
    }
  },
  canDrop(props, monitor) {
    const piece = monitor.getItem()
    console.log('canDrop piece: ', piece)
    const fromX = (props.currentPlayer === 2) ? 7 - piece.x : piece.x
    const fromY = (props.currentPlayer === 2) ? 7 - piece.y : piece.y
console.log('canDrop props.currentPlayer: ', props)
    const answer = checkSquare(piece, {x: fromX, y: fromY}, {x: props.x, y: props.y}, props.board, props.currentPlayer)
    console.log('canDrop answer: ', answer)
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

class SquareContainer extends React.Component {
  render () {
    const {x, y, canDrop, validSquares, connectDropTarget} = this.props
    // const squareNum = (x * 8 + y)
    // const validMove = validSquares.includes(x * 8 + y)
    const colorClass = ((x + y) % 2) === 0 ? 'white-square' : 'brown-square'

    return connectDropTarget(
      <div className="square-container">
        <div className={colorClass}>
          <Square x={x} y={y} />
        </div>
        {
          (canDrop || validSquares.includes(x * 8 + y)) &&
          <div className="square-highlight" />
        }
      </div>
      )
  }
}

const mapStateToProps = state => {
  return {
    board: state.board,
    validSquares: state.validSquares,
    currentPlayerTurn: state.currentPlayerTurn,
    currentPlayer: state.currentPlayer,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    togglecurrentPlayerTurn: (player) => dispatch(setPlayerTurn(player)),
    updateBoard: (newBoard, currentPlayerTurn, currentPlayer) => dispatch(updateBoard(1, newBoard, currentPlayerTurn, currentPlayer)),
  }
}

// const connectedSquare = connectRedux(mapStateToProps)(SquareContainer)
// export default DropTarget('Piece', squareTarget, collect)(connectedSquare)

export default compose(connectRedux(mapStateToProps, mapDispatchToProps), DropTarget('Piece', squareTarget, collect))(SquareContainer)
