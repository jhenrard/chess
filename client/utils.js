// Stringify piece objects to store on server

export const convertToJSON = board => board.map( (row) => {
  return row.map( (pieceObj) => {
    return JSON.stringify(pieceObj)
  })
})

// parse JSON from server

export const convertFromJSON = board => board.map(row => {
  return row.map(piece => {return JSON.parse(piece)})
})

// flip board for player 2.

export const flipBoard = (board) => {
  const flippedPartial = board.map(row => row.reverse())
  return flippedPartial.reverse()
}
