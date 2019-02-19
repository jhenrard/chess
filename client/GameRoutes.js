import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Lobby from './components/Lobby'
import MainPage from './components/MainPage'

class GameRoutes extends React.Component {
  render () {
    return (
      <Switch>
        <Route exact path="/" component={Lobby} />
        <Route path="/games/:gameId" component={MainPage} />
      </Switch>
    )
  }
}

export default GameRoutes
