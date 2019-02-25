import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {Board, PlayerInfo, GameNotFound} from '../components'
import {gotGame} from '../store/game'
import socket from '../socket'

class MainPage extends React.Component {
  constructor () {
    super()
    this.state = {
      notFound: false,
      loading: true,
    }
  }

  async componentDidMount () {
    const res = await axios.get(`/api/games/${this.props.match.params.gameId}`)
    const {data: game} = res

    if (game) {
      socket.emit('joinPlayer', this.props.match.params.gameId)
      this.props.setGame(Number(this.props.match.params.gameId))
    } else {
      this.setState({notFound: true})
    }
    this.setState({loading: false})
  }

  render () {
    if (this.state.loading) {
      return (
        <div className='loader'/>
      )
    }

    if (this.state.notFound) {
      return <GameNotFound />
    }

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
