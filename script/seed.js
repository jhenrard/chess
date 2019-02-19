'use strict'

const db = require('../server/db')
const {User, Game} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  // const games = await Promise.all([
  //   Game.create({board: [['P2_Rook', 'P2_Knight', 'P2_Bishop', 'P2_Queen', 'P2_King', 'P2_Bishop', 'P2_Knight', 'P2_Rook'], ['P2_Pawn', 'P2_Pawn', 'P2_Pawn', 'P2_Pawn', 'P2_Pawn', 'P2_Pawn', 'P2_Pawn', 'P2_Pawn'], ['', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', ''], ['P1_Pawn', 'P1_Pawn', 'P1_Pawn', 'P1_Pawn', 'P1_Pawn', 'P1_Pawn', 'P1_Pawn', 'P1_Pawn'], ['P1_Rook', 'P1_Knight', 'P1_Bishop', 'P1_Queen', 'P1_King', 'P1_Bishop', 'P1_Knight', 'P1_Rook']], currentPlayerTurn: 1})
  // ])

  const games = await Promise.all([
    Game.create({board: [['{"player": 2, "piece": "Rook"}', '{"player": 2, "piece": "Knight"}', '{"player": 2, "piece": "Bishop"}', '{"player": 2, "piece": "Queen"}', '{"player": 2, "piece": "King"}', '{"player": 2, "piece": "Bishop"}', '{"player": 2, "piece": "Knight"}', '{"player": 2, "piece": "Rook"}'], ['{"player": 2, "piece": "Pawn"}', '{"player": 2, "piece": "Pawn"}', '{"player": 2, "piece": "Pawn"}', '{"player": 2, "piece": "Pawn"}', '{"player": 2, "piece": "Pawn"}', '{"player": 2, "piece": "Pawn"}', '{"player": 2, "piece": "Pawn"}', '{"player": 2, "piece": "Pawn"}'], ['{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}'], ['{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}'], ['{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}'], ['{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}'], ['{"player": 1, "piece": "Pawn"}', '{"player": 1, "piece": "Pawn"}', '{"player": 1, "piece": "Pawn"}', '{"player": 1, "piece": "Pawn"}', '{"player": 1, "piece": "Pawn"}', '{"player": 1, "piece": "Pawn"}', '{"player": 1, "piece": "Pawn"}', '{"player": 1, "piece": "Pawn"}'], ['{"player": 1, "piece": "Rook"}', '{"player": 1, "piece": "Knight"}', '{"player": 1, "piece": "Bishop"}', '{"player": 1, "piece": "Queen"}', '{"player": 1, "piece": "King"}', '{"player": 1, "piece": "Bishop"}', '{"player": 1, "piece": "Knight"}', '{"player": 1, "piece": "Rook"}']], currentPlayerTurn: 1})
  ])

  // const games = await Promise.all([
  //   Game.create({board: [['{"player": 2, "piece": "Rook"}', '{"player": 2, "piece": "Knight"}', '{"player": 2, "piece": "Bishop"}', '{"player": 2, "piece": "Queen"}', '{"player": 2, "piece": "King"}', '{"player": 2, "piece": "Bishop"}', '{"player": 2, "piece": "Knight"}', '{"player": 2, "piece": "Rook"}'], ['{"player": 2, "piece": "Pawn"}', '{"player": 2, "piece": "Pawn"}', '{"player": 2, "piece": "Pawn"}', '{"player": 2, "piece": "Pawn"}', '{"player": 2, "piece": "Pawn"}', '{"player": 2, "piece": "Pawn"}', '{"player": 2, "piece": "Pawn"}', '{"player": 2, "piece": "Pawn"}'], ['{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}'], ['{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}'], ['{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}'], ['{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}'], ['{"player": 1, "piece": "Pawn"}', '{"player": 1, "piece": "Pawn"}', '{"player": 1, "piece": "Pawn"}', '{"player": 1, "piece": "Pawn"}', '{"player": 1, "piece": "Pawn"}', '{"player": 1, "piece": "Pawn"}', '{"player": 1, "piece": "Pawn"}', '{"player": 1, "piece": "Pawn"}'], ['{"player": 1, "piece": "Rook"}', '{"player": 1, "piece": "Knight"}', '{"player": 1, "piece": "Bishop"}', '{"player": 1, "piece": "Queen"}', '{"player": 1, "piece": "King"}', '{"player": 1, "piece": "Bishop"}', '{"player": 1, "piece": "Knight"}', '{"player": 1, "piece": "Rook"}']], currentPlayerTurn: 1})
  // ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)

  console.log(`seeded ${games.length} games`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
