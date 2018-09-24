import React from 'react'
import Typography from '@material-ui/core/Typography'
import {withStyles} from '@material-ui/core/styles'
import Fade from '@material-ui/core/Fade'
import Button from '@material-ui/core/Button'
import Slide from '@material-ui/core/Slide'
import Link from 'react-router-dom'

const styles = {
  root: {
    width: '100%',
    maxWidth: 500
  }
}

class Landing extends React.Component {
  render() {
    return (
      <div className="landing">
        <Fade in={true} style={{transitionDelay: 300, duration: 1}}>
          <p>Welcome, Phan</p>
        </Fade>
        <Fade in={true} style={{transitionDelay: 300, duration: 1}}>
          <Typography variant="display4" gutterBottom>
            mantra
          </Typography>
        </Fade>
        <Slide
          in={true}
          style={{transitionDelay: 2000}}
          direction="up"
          unmountOnExit
        >
          <Button
            variant="contained"
            onClick={() => this.props.history.push('/mod')}
          >
            Mantra of the Day
          </Button>
        </Slide>
      </div>
    )
  }
}

export default Landing
