import React from 'react'
import {Link} from 'react-router-dom'

class GameNotFound extends React.Component {
  render () {
    return (
      <div>
        <h2 style={{textAlign: "center"}}>Game Not Found</h2>
        <h2 style={{textAlign: "center"}}>Please return to the <Link to='/'><span style={{color: "blue"}}>Lobby</span></Link></h2>
      </div>
    )
  }
}

export default GameNotFound
