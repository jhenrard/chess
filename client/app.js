import React from 'react'
import {Provider} from 'react-redux'

import {DragDropContextProvider} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import {Board, PlayerInfo, MainPage} from './components'
import store from './store'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <DragDropContextProvider backend={HTML5Backend}>
        <Provider store={store}>
          <MainPage />
          {/* <PlayerInfo />
          <Board /> */}
        </Provider>
      </DragDropContextProvider>

      {/* // Boilermaker code I don't need for the chess app
      <Navbar />
      <Routes /> */}
    </div>
  )
}

export default App
