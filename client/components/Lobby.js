import React from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios'

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
        <button type="button" onClick={this.createGame} className="lobby-button">Create Game</button>
        <br />
        <br />
        <form onSubmit={this.joinGame}>
          <input name="gameId" placeholder="Enter game id" onChange={this.handleChange} />
          <button type="submit" className="lobby-button">Join Game</button>
        </form>
      </div>
    )
  }
}

export default Lobby
