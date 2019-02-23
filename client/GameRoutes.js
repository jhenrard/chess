import React from 'react'
import {Router, Route, Switch} from 'react-router-dom'
import history from './history'
import Lobby from './components/Lobby'
import MainPage from './components/MainPage'

class GameRoutes extends React.Component {
  render () {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Lobby} />
          <Route path="/games/:gameId" component={MainPage} />
        </Switch>
      </Router>
    )
  }
}

export default GameRoutes
