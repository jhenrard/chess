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

router.get('/:gameId/:action', async (req, res, next) => {
  try {
    const game = await Game.findOne({
      where: {id: req.params.gameId,},
    })
    res.json(game[req.params.action]);
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const game = await Game.create({board: [['{"player": 2, "piece": "Rook"}', '{"player": 2, "piece": "Knight"}', '{"player": 2, "piece": "Bishop"}', '{"player": 2, "piece": "Queen"}', '{"player": 2, "piece": "King"}', '{"player": 2, "piece": "Bishop"}', '{"player": 2, "piece": "Knight"}', '{"player": 2, "piece": "Rook"}'], ['{"player": 2, "piece": "Pawn"}', '{"player": 2, "piece": "Pawn"}', '{"player": 2, "piece": "Pawn"}', '{"player": 2, "piece": "Pawn"}', '{"player": 2, "piece": "Pawn"}', '{"player": 2, "piece": "Pawn"}', '{"player": 2, "piece": "Pawn"}', '{"player": 2, "piece": "Pawn"}'], ['{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}'], ['{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}'], ['{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}'], ['{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}'], ['{"player": 1, "piece": "Pawn"}', '{"player": 1, "piece": "Pawn"}', '{"player": 1, "piece": "Pawn"}', '{"player": 1, "piece": "Pawn"}', '{"player": 1, "piece": "Pawn"}', '{"player": 1, "piece": "Pawn"}', '{"player": 1, "piece": "Pawn"}', '{"player": 1, "piece": "Pawn"}'], ['{"player": 1, "piece": "Rook"}', '{"player": 1, "piece": "Knight"}', '{"player": 1, "piece": "Bishop"}', '{"player": 1, "piece": "Queen"}', '{"player": 1, "piece": "King"}', '{"player": 1, "piece": "Bishop"}', '{"player": 1, "piece": "Knight"}', '{"player": 1, "piece": "Rook"}']], currentPlayerTurn: 1})
    res.json(game)
  } catch (error) {
    next(error)
  }
})

router.put('/:gameId', async (req, res, next) => {
  try {
      const updatedGame = await Game.update({board: req.body.board, currentPlayerTurn: req.body.currentPlayerTurn}, {
        where: {id: req.params.gameId},
        returning: true,
      })
      res.json(updatedGame)
  } catch (error) {
    next(error)
  }
})

router.put('/:gameId/:action', async (req, res, next) => {
  try {
      await Game.update({[req.params.action]: req.body[req.params.action]}, {
        where: {id: req.params.gameId},
      })
      res.sendStatus(201)
  } catch (error) {
    next(error)
  }
})

module.exports = router
