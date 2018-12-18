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
    const updatedGame = await Game.update({board: req.body}, {
      where: {id: req.params.gameId},
      returning: true,
    })
    console.log('router.put updatedGame', updatedGame)
    res.json(updatedGame)
  } catch (error) {
    next(error)
  }
})

module.exports = router
