import React from 'react'
import {DropTarget} from 'react-dnd'
import {Pawn} from './Pieces'

const squareTarget = {
  drop(props, monitor) {
    const piece = monitor.getItem()
    console.log(piece)
    const fromX = piece.x
    const fromY = piece.y
    piece.x = props.x
    piece.y = props.y
    const newComponent = <Pawn piece={{piece: piece.piece, x: piece.x, y: piece.y, player: piece.player}} />
    props.dropPiece(newComponent, {x: fromX, y: fromY}, {x: piece.x, y: piece.y})
  }
}

function collect (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

const Square = (props) => {

  return props.connectDropTarget(
    <div className={props.colorClass}>{props.children}</div>
    // <div style={{
    //   position: 'relative',
    // }}>
    //   <div>{props.children}</div>
    //   {props.isOver &&
    //     <div style={{
    //       position: 'absolute',
    //       top: 0,
    //       left: 0,
    //       height: '100%',
    //       width: '100%',
    //       zIndex: 1,
    //       opacity: 0.5,
    //       backgroundColor: 'yellow',
    //     }} />
    //   }
    // </div>
  )
}

export default DropTarget('Pawn', squareTarget, collect)(Square)
