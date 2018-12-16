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
    this.onDrag = this.onDrag.bind(this)
    this.onDrop = this.onDrop.bind(this)
    this.onDragOver = this.onDragOver.bind(this)
    this.onDragStart = this.onDragStart.bind(this)
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

  onDragStart (event) {
    event.target.className = 'drag'
  }

  onDrag (event, square) {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
    event.target.className = 'drag'

    this.setState({selectedPiece: square})

  }

  onDragOver (event) {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
    if (event.target.nodeName !== 'IMG') {
      event.target.style.backgroundColor = '#ffff99'
    }
    // event.target.style.backgroundColor = "yellow"
    // event.target.style.width = "60px"
    // event.target.style.height = "60px"
    // event.dataTransfer.effectAllowed = 'none'
  }

  onDrop (event, rowIdx, col) {
    let newBoard = [...this.state.board]
    newBoard[rowIdx][col] = this.state.selectedPiece
    this.setState({board: newBoard, selectedPiece: ''})
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
                      return <td className={((rowIdx + col) % 2 === 0) ? "white-square" : "brown-square"}
                      key={col} onDragLeave={event.preventDefault} onDrop={event => this.onDrop(event, rowIdx, col)} onDragOver={event => this.onDragOver(event)}>{square.length > 0 && <img className="grab" onDragStart={this.onDragStart} onClick={() => this.handleSelect(rowIdx, col)} onDrag={event => this.onDrag(event, square)} src={`/${square}.png`} />}</td>
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
