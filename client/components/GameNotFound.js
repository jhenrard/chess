import React from 'react'
import {Link} from 'react-router-dom'

class GameNotFound extends React.Component {
  render () {
    return (
      <div>
        <h1>Game Not Found. Please return to <Link to='/'>Lobby</Link> </h1>
      </div>
    )
  }
}

export default GameNotFound
