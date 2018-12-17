import React from 'react'

import {Navbar, Player1Board, Square, Board} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Board />
      {/* <Player1Board /> */}

      {/* // Boilermaker code I don't need for the chess app
      <Navbar />
      <Routes /> */}
    </div>
  )
}

export default App
