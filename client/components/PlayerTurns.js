import React from 'react'

class PlayerTurns extends React.Component {
  constructor (props) {
    super (props)
    this.meColor = this.setColor(this.props.currentPlayer)
  }

  setColor = currentPlayer => {
    if (currentPlayer === 1) {
      return 'White'
    } else if (currentPlayer === 2) {
      return 'Black'
    } else {
      return 'an Observer'
    }
  }

  render () {
    const currentPlayerTurnColor = (this.props.currentPlayerTurn === 2) ? 'Black' : 'White'

    return (
      <div className="player-info">

           <div style={{padding: "10px 0px"}}>You are {this.meColor}</div>
           <div>It is {(currentPlayerTurnColor === this.meColor) ? <span>your turn</span> : <span>{currentPlayerTurnColor}'s turn</span>}</div>

      </div>
    )
  }
}

export default PlayerTurns
