import React from 'react'
import {connect} from 'react-redux'
import {fetchPlayerTurn} from '../store/currentPlayerTurn';

class PlayerInfo extends React.Component {

  componentDidMount () {
    if (this.props.gameId > 0) {
      this.props.fetchcurrentPlayerTurn(this.props.gameId)
    }
  }

  render () {

    let meColor = 'an Observer'
    if (this.props.currentPlayer === 1) {
      meColor = 'Player 1 - White'
    } else if (this.props.currentPlayer === 2) {
      meColor = 'Player 2 - Black'
    }

    const currentPlayerTurnColor = (this.props.currentPlayerTurn === 1) ? 'White' : 'Black'

    return (
      <div className='player-info'>
        <span>You are {meColor}. </span>
        <span>It is currently {currentPlayerTurnColor}'s turn.</span>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentPlayer: state.currentPlayer,
    currentPlayerTurn: state.currentPlayerTurn,
    gameId: state.game,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchcurrentPlayerTurn: (gameId) => dispatch(fetchPlayerTurn(gameId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerInfo)
