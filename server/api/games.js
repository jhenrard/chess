const router = require('express').Router()
const {Game} = require('../db/models')

router.get('/:gameId', async (req, res, next) => {
  try {
    const game = await Game.findOne({
      where: {id: req.params.gameId,},
    })
    res.json(game);
  } catch (error) {
    next(error)
  }
})

router.put('/:gameId', async (req, res, next) => {
  try {
    const updatedGame = await Game.update({board: req.body.board, currentPlayer: req.body.currentPlayer}, {
      where: {id: req.params.gameId},
      returning: true,
    })
    res.json(updatedGame)
  } catch (error) {
    next(error)
  }
})

module.exports = router
