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
    if (req.body.player1Id) {
      await Game.update({player1Id: req.body.player1Id}, {
        where: {id: req.params.gameId},
      })
      res.sendStatus(201)
    } else if (req.body.player2Id) {
      await Game.update({player2Id: req.body.player2Id}, {
        where: {id: req.params.gameId},
      })
      res.sendStatus(201)
    } else {
      const updatedGame = await Game.update({board: req.body.board, currentPlayerTurn: req.body.currentPlayerTurn}, {
        where: {id: req.params.gameId},
        returning: true,
      })
      res.json(updatedGame)
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
