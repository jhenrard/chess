class PieceCreator {
  constructor (piece_from_server, row, col) {
    this.player = piece_from_server[1]
    this.piece = piece_from_server.slice(3)
    this.row = row
    this.col = col
  }
}

module.exports = PieceCreator
