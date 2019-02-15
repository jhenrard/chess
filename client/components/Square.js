import React from 'react'
import {connect} from 'react-redux'
import Piece from './Piece'

class Square extends React.Component {
  render () {
    const {x, y, board} = this.props

    return (
      <div>
        {
          board.length > 0 && JSON.parse(board[x][y]).player &&
            <Piece player={JSON.parse(board[x][y]).player} x={x} y={y} piece={JSON.parse(board[x][y]).piece} />
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    board: state.board
  }
}

export default connect(mapStateToProps)(Square)
