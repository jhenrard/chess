const Sequelize = require('sequelize')
const db = require('../db')

// database will hold games. each game will get an ID and will have the board layout with each square as blank or a piece object id

const Game = db.define('game', {
  board: Sequelize.ARRAY(Sequelize.ARRAY(Sequelize.STRING)),
  currentPlayerTurn: Sequelize.INTEGER,
  checkmate: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  }
})

module.exports = Game
