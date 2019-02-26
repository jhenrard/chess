import React from 'react'
import {connect} from 'react-redux'
import SquareContainer from './SquareContainer';

class Board extends React.Component {

  render () {

    if (!this.props.board.length) return (
        <div className='board'>
          <div className='loader'/>
        </div>
      )

    return (
        <div className='board'>
          {
            this.props.board.length > 0 &&
            [...Array(64)].map((square, i) => {
              const x = Math.floor(i / 8)
              const y = i % 8
              return (<div key={x*8+y} ><SquareContainer x={x} y={y} /></div>)
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
