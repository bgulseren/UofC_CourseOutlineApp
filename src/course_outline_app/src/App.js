import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

import { ReactComponent as Logo } from './UCalgary.svg'
import Instructor from './components/Instructor'
import './components/App.css'

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <div container className='App-header' spacing={1}>
          <Logo className='logo' />
          <h3>Course Outline Application</h3>
        </div>

        <Typography component='div' style={{ height: '100vh' }}>
          <p></p>
          <Instructor />
          <p> </p>
          <p> </p>
        </Typography>
      </Container>
    </React.Fragment>
  )
}

export default App
