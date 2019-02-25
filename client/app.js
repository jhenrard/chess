import React from 'react'
import {DragDropContextProvider} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div className="app-container">
      <DragDropContextProvider backend={HTML5Backend}>
          <Navbar />
          <Routes />
      </DragDropContextProvider>
    </div>
  )
}

export default App
