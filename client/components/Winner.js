import React from 'react'

class Winner extends React.Component {
  render () {
    const winner = (this.props.winner === 1) ? 'White' : 'Black'
    return (
        <div className='player-info'>
        {
          (this.props.currentPlayer > 2) ?
            (<div style={{padding: "10px 0px"}}>{winner} won.</div>) :
            (<div style={{padding: "10px 0px"}}>{(this.props.winner === this.props.currentPlayer) ? 'You won!' : 'You lost.'}</div>)
        }
        </div>
    )
  }
}

export default Winner
