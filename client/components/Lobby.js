import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import {gotBoard} from '../store/board'
import {gotPlayer} from '../store/currentPlayer'
import {gotPlayerTurn} from '../store/currentPlayerTurn'

class Lobby extends React.Component {
  constructor () {
    super ()
    this.createGame = this.createGame.bind(this)
    this.joinGame = this.joinGame.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      gameId: 0,
      redirectTo: 0,
    }
  }

  compnentDidMount () {
    this.props.clearBoard()
    this.props.clearCurrentPlayer()
    this.props.clearCurrentPlayerTurn()
  }

  handleChange (event) {
    this.setState({[event.target.name]: event.target.value})
  }

  async createGame () {
    const res = await axios.post('/api/games')
    const {data: game} = res
    this.setState({redirectTo: game.id})
  }

  joinGame (event) {
    event.preventDefault()
    this.setState(prevState => {
      return {redirectTo: prevState.gameId}
    })
  }

  render () {
    const {redirectTo} = this.state

    if (redirectTo > 0) {
      return (
        <Redirect push to={`/games/${redirectTo}`} />
      )
    }

    return (
      <div className="lobby">
        <div className="welcome">
          Welcome to Jeremy's chess game!
        </div>
        <button type="button" onClick={this.createGame} className="lobby-button">Create New Game</button>
        <br />
        <br />
        <form onSubmit={this.joinGame}>
          <input name="gameId" placeholder="Enter game id" onChange={this.handleChange} className="join-game-input" />
          <br />
          <button type="submit" className="lobby-button">Join Game</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clearBoard: dispatch(gotBoard([])),
    clearCurrentPlayer: dispatch(gotPlayer(0)),
    clearCurrentPlayerTurn: dispatch(gotPlayerTurn(0))
  }
}

export default connect(null, mapDispatchToProps)(Lobby)
