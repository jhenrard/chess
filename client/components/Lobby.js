import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {createGame, gotGame} from '../store/game'
import socket from '../socket';

class Lobby extends React.Component {
  constructor () {
    super ()
    this.createGame = this.createGame.bind(this)
    this.joinGame = this.joinGame.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      gameId: 0,
    }
  }

  handleChange (event) {
    this.setState({[event.target.name]: event.target.value})
  }

  createGame () {
    this.props.createGame()
  }

  joinGame (event) {
    event.preventDefault()
    // console.log(this.state.gameId)
    socket.emit('joinPlayer', this.state.gameId)
    this.props.joinGame(this.state.gameId)
  }

  render () {
    const {gameId} = this.props

    if (gameId) {
      // socket.emit('joinPlayer', this.props.gameId)
      return (
        <Redirect to={`/games/${gameId}`} />
      )
    }

    return (
      <div>
        <button type="button" onClick={this.createGame}>Create Game</button>
        <br />
        <br />
        <form onSubmit={this.joinGame}>
          <input name="gameId" placeholder="Enter game id" onChange={this.handleChange} />
          <button type="submit">Join Game</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    gameId: state.game
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createGame: () => dispatch(createGame()),
    joinGame: gameId => dispatch(gotGame(gameId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lobby)
