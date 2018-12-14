import React from 'react'
import axios from 'axios'

class Player1Board extends React.Component {
  constructor () {
    super()
    this.state = {
      board: [],
      selectedPiece: '',
    }
    this.handleSelect = this.handleSelect.bind(this)
  }

  async componentDidMount () {
    const response = await axios.get('/api/games/1')
    const {data: board} = response
    this.setState({id: board.id, board: board.board})
  }

  handleSelect (row, col) {
    const selectedPiece = this.state.board[row][col]
    this.setState({selectedPiece})
    console.log(selectedPiece)
  }

  render () {
    const board = this.state.board
    return (
      <div>
        <table>
          <tbody>
            {
              board.map( (row, rowIdx) => {
                return (
                  <tr key={rowIdx}>
                    {
                      row.map( (square, col) => {
                      return <td onClick={() => this.handleSelect(rowIdx, col)} className={((rowIdx + col) % 2 === 0) ? "white-square" : "brown-square"}
                      key={col}>{square.length > 0 && <img src={`/${square}.png`} />}</td>
                    })
                    }
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
}


export default Player1Board
