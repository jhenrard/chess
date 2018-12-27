import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import board from './board'
import validSquares from './validSquares'
import currentPlayerTurn from './currentPlayerTurn'
import currentPlayer from './currentPlayer'

const reducer = combineReducers({user, board, validSquares, currentPlayerTurn, currentPlayer})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
