import React from 'react'
import {connect} from 'react-redux'

const PlayerInfo = (props) => {
  let currentPlayerColor = 'an Observer'
  if (props.currentPlayer === 1) {
    currentPlayerColor = 'Player 1 - White'
  } else if (props.currentPlayer === 2) {
    currentPlayerColor = 'Player 2 - Black'
  }

  const currentPlayerTurnColor = (props.currentPlayerTurn === 1) ? 'White' : 'Black'

  return (
    <div className='player-info'>
      <span>You are {currentPlayerColor}. </span>
      <span>It is currently {currentPlayerTurnColor}'s turn.</span>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    currentPlayer: state.currentPlayer,
    currentPlayerTurn: state.currentPlayerTurn,
  }
}

export default connect(mapStateToProps)(PlayerInfo)
