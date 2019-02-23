/// SERVER ///

module.exports = io => {

  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('joinPlayer', function (gameId) {
      io.of('/').in(gameId).clients((err, clients) => {
        if (err) throw err
        console.log(clients)
        if (clients.length === 0) {
          socket.emit('player', 1, gameId)
        } else if (clients.length === 1) {
          socket.emit('player', 2, gameId)
        } else {
          socket.emit('player', 0, gameId)
        }
      })
      console.log(`${socket.id} has joined game #${gameId}`)
      socket.join(gameId)
    })

    socket.on('drop', function (board, currentPlayerTurn, gameId) {
      socket.in(gameId).broadcast.emit('movedPiece', board, currentPlayerTurn)
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has disconnected`)
    })
  })
}
