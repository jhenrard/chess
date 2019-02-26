/// SERVER ///

module.exports = io => {

  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('joinPlayer', function (gameId) {
      socket.emit('player', gameId)
      socket.join(gameId)
    })

    socket.on('drop', function (board, currentPlayerTurn, gameId) {
      socket.in(gameId).broadcast.emit('movedPiece', board, currentPlayerTurn)
    })

    socket.on('won', (gameId, winner) => {
      socket.in(gameId).broadcast.emit('winner', winner)
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has disconnected`)
    })
  })
}
