import React from 'react'
import {connect} from 'react-redux'
import {fetchPlayerTurn} from '../store/currentPlayerTurn';

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

    let meColor = 'an Observer'
    if (this.props.currentPlayer === 1) {
      meColor = 'White'
    } else if (this.props.currentPlayer === 2) {
      meColor = 'Black'
    }

    const currentPlayerTurnColor = (this.props.currentPlayerTurn === 1) ? 'White' : 'Black'

    return (
      <div className='player-info'>
        <div>You are {meColor}</div>
        <div style={{paddingTop: "10px"}}>It is currently {(currentPlayerTurnColor === meColor) ? <span>your turn</span> : <span>{currentPlayerTurnColor}'s turn</span>}</div>
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
