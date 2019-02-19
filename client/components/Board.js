import React from 'react'
import {connect} from 'react-redux'
import SquareContainer from './SquareContainer';

class Board extends React.Component {

  render () {

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
          }
        </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    board: state.board,
  }
}

export default connect(mapStateToProps)(Board)
