import React from 'react'
import {connect} from 'react-redux'
import {Board, PlayerInfo} from '../components'
import {gotGame} from '../store/game'
import socket from '../socket'

class MainPage extends React.Component {

  componentDidMount () {
    socket.emit('joinPlayer', this.props.match.params.gameId)
    this.props.setGame(Number(this.props.match.params.gameId))
  }

  render () {
    return (
      <div>
        <PlayerInfo />
        <Board />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setGame: gameId => dispatch(gotGame(gameId)),
  }
}

export default connect(null, mapDispatchToProps)(MainPage)
