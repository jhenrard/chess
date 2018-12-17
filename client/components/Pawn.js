import React from 'react'

class Pawn extends React.Component {
  constructor() {
    super()
    const pawn = this.props
    this.player = pawn.player
    this.pieceNumber = pawn.pieceNumber
    this.x = pawn.x
    this.y = pawn.y
  }

  render () {
    return (
      <img src={`P${this.player}_Pawn.png`} />
    )
  }
}

export default Pawn
