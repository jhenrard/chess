import React from 'react'
import { DragSource } from 'react-dnd'
import { connect as connectRedux } from 'react-redux'
import { addSquare, removeAllSquares } from '../store/validSquares'
import { findDestinationsForPiece } from '../gamelogic'
import store from '../store'

const pieceSource = {
  beginDrag(props) {
    return {
      x: props.piece.x,
      y: props.piece.y,
      player: props.piece.player,
      piece: props.piece.piece,
    }
  },
  endDrag() {
    store.dispatch({type: 'REMOVE_ALL_SQUARES'})
  }
}

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  }
}

class Piece extends React.Component {

  handleMouseDown (props) {
    let x = (props.currentPlayer === 2) ? 7 - props.piece.x : props.piece.x
    let y = (props.currentPlayer === 2) ? 7 - props.piece.y : props.piece.y

    // if (props.currentPlayer === 2) {
    //   x = 7 - x
    //   y = 7 - y
    // }

    if (props.piece.player === props.currentPlayer) {
      const validSquares = findDestinationsForPiece(props.piece.piece, {x, y}, props.board, props.currentPlayer) // returns potential move cells
      props.addSquares(validSquares) // set validSquares on state
    }
  }

  handleMouseUp (props) {
    if (props.piece.player === props.currentPlayer) {
      props.removeAllSquares()
    }
  }

  render () {
    const props = this.props
    const img = new Image()
    img.src = `/P${props.piece.player}_${props.piece.piece}.png`
    props.connectDragPreview(img)

    return props.connectDragSource(
        <img onMouseDown={() => this.handleMouseDown(props)} onMouseUp={() => this.handleMouseUp(props)} src={`/P${props.piece.player}_${props.piece.piece}.png`} />
      )
  }
}

const mapStateToProps = (state) => {
  return {
    validSquares: state.validSquares,
    board: state.board,
    currentPlayer: state.currentPlayer,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addSquares: (square) => dispatch(addSquare(square)),
    removeAllSquares: () => dispatch(removeAllSquares()),
  }
}

const connectedPiece = connectRedux(mapStateToProps, mapDispatchToProps)(Piece)
export default DragSource('Piece', pieceSource, collect)(connectedPiece)
