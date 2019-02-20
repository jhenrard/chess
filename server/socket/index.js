/// SERVER ///

module.exports = io => {
  const players = {'1': null, '2': null}

  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    if (!players['1']) { // MOVE TO COMPONENTDIDMOUNT? TO SET PLAYER ONCE IN GAME, NOT ON LOBBY CONNECTION
      players['1'] = socket
      socket.emit('player', 1)
    } else if (!players['2']) {
      players['2'] = socket
      socket.emit('player', 2)
    }

    socket.on('joinPlayer', function (gameId) {
      console.log(`${socket.id} has joined game #${gameId}`)
      socket.join(gameId)
    })

    socket.on('drop', function (board, currentPlayerTurn) {
      socket.broadcast.emit('movedPiece', board, currentPlayerTurn)
    })

    socket.on('disconnect', () => {
      if (players['1'] === socket) {
        players['1'] = null
      } else if (players['2'] === socket) {
        players['2'] = null
      }
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
