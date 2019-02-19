import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {createGame} from '../store/game'

class Lobby extends React.Component {
  constructor () {
    super ()
    this.createGame = this.createGame.bind(this)
  }

  createGame () {
    this.props.createGame()
  }

  render () {
    if (this.props.gameId) {
      return (
        <Redirect to={`/games/${this.props.gameId}`} />
      )
    }

    return (
      <div>
        <button type="button" onClick={this.createGame}>Create Game</button>
        <br />
        <br />
        <input name="gameId" placeholder="Enter game id" />
        <button type="button" onClick={this.joinGame}>Join Game</button>
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
    createGame: () => dispatch(createGame())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lobby)
