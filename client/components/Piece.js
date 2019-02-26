import React from 'react'
import {DragSource} from 'react-dnd'
import {connect as connectRedux} from 'react-redux'
import {addSquare, removeAllSquares} from '../store/validSquares'
import {findDestinationsForPiece} from '../gamelogic'
import store from '../store'

const pieceSource = {
  beginDrag(props) {
    return {
      x: props.x,
      y: props.y,
      player: props.player,
      piece: props.piece,
    }
  },
  endDrag() {
    store.dispatch({type: 'CLEAR_HIGHLIGHT'})
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

    if (props.player === props.currentPlayer) {
      const validSquares = findDestinationsForPiece(props.piece, {x: props.x, y: props.y}, props.board, props.currentPlayer)
      props.addSquares(validSquares)
    }
  }

  handleMouseUp (props) {
    if (props.player === props.currentPlayer) {
      props.removeAllSquares()
    }
  }

  render () {
    const props = this.props
    const img = new Image()
    img.src = `/img/P${props.player}_${props.piece}.png`
    props.connectDragPreview(img)

    return props.connectDragSource(
        <img onMouseDown={() => this.handleMouseDown(props)} onMouseUp={() => this.handleMouseUp(props)} src={`/img/P${props.player}_${props.piece}.png`} />
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
