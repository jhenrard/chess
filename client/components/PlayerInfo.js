import React from 'react'
import {connect} from 'react-redux'
import {fetchPlayerTurn} from '../store/currentPlayerTurn';
import {fetchWinner} from '../store/winner';
import PlayerTurns from './PlayerTurns'
import Winner from './Winner';

class PlayerInfo extends React.Component {
  constructor () {
    super()
    this.state = {
      loading: true,
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
        <div className='player-info' style={{padding: "10px 0px"}}>Loading...</div>
      )
    }

    if (this.props.winner > 0) {
      return (
        <Winner winner={this.props.winner} currentPlayer={this.props.currentPlayer} />
      )
    }

    return (
        <PlayerTurns currentPlayer={this.props.currentPlayer} currentPlayerTurn={this.props.currentPlayerTurn} />
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
