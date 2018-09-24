import React from 'react'
import {Header, Navbar} from './components'
import Routes from './routes'
import CssBaseline from '@material-ui/core/CssBaseline'

const App = () => {
  return (
    <div>
      <CssBaseline />
      <Header />
      <Routes />
      <Navbar />
    </div>
  )
}

export default App
