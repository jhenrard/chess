import React from 'react'
import {connect} from 'react-redux'
import {fetchPlayerTurn} from '../store/currentPlayerTurn';
import {fetchWinner} from '../store/winner';

class PlayerInfo extends React.Component {
  constructor () {
    super()
    this.state = {
      loading: true,
    }
    this.meColor = 'an Observer'
  }

  setColor () {
    if (this.props.currentPlayer === 1) {
      this.meColor = 'White'
    } else if (this.props.currentPlayer === 2) {
      this.meColor = 'Black'
    }
  }

  componentDidMount () {
    if (this.props.gameId > 0) {
      this.props.fetchcurrentPlayerTurn(this.props.gameId)
      this.props.fetchWinner(this.props.gameId)
    }
  }

  componentDidUpdate () {
    if (this.props.currentPlayerTurn >= 0 && this.props.currentPlayer > 0 && this.state.loading) {
      this.setState({loading: false})
    }
  }

  render () {
    if (this.state.loading) {
      return (
        <div style={{textAlign: "center"}}>Loading...</div>
      )
    }

    if (this.props.winner > 0) {
      const winner = (this.props.winner === 1) ? 'White' : 'Black'
      return (
        <div className='player-info'>
        {
          (this.props.currentPlayer > 2) ?
            (<div style={{padding: "10px 0px"}}>{winner} wins!</div>) :
            (<div style={{padding: "10px 0px"}}>{(this.props.winner === this.props.currentPlayer) ? 'You win!' : 'You lose.'}</div>)
        }
        </div>
      )
    }

    const currentPlayerTurnColor = (this.props.currentPlayerTurn === 1) ? 'White' : 'Black'

    return (
      <div className='player-info'>
        <div style={{padding: "10px 0px"}}>You are {this.meColor}</div>
        <div>It is {(currentPlayerTurnColor === this.meColor) ? <span>your turn</span> : <span>{currentPlayerTurnColor}'s turn</span>}</div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentPlayer: state.currentPlayer,
    currentPlayerTurn: state.currentPlayerTurn,
    gameId: state.game,
    status: state.gameStatus,
    winner: state.winner
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchcurrentPlayerTurn: (gameId) => dispatch(fetchPlayerTurn(gameId)),
    fetchWinner: (gameId) => dispatch(fetchWinner(gameId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerInfo)
