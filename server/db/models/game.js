const Sequelize = require('sequelize')
const db = require('../db')

const Game = db.define('game', {
  board: Sequelize.ARRAY(Sequelize.ARRAY(Sequelize.STRING)),
  currentPlayerTurn: Sequelize.INTEGER,
  winner: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  started: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  }
})

module.exports = Game
