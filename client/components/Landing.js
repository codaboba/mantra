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
  },
  button: {
    background: 'linear-gradient(45deg, #6bcffe 30%, #8e5fff 90%)',
    color: 'white',
    boxShadow: '0 3px 5px 2px rgba(188, 188, 188, 0.3)',
    height: '60px',
    borderRadius: '20px',
    fontSize: '16px'
  }
}

class Landing extends React.Component {
  render() {
    const {classes} = this.props
    return (
      <div className="landing container">
        <Fade in={true} style={{transitionDelay: 300, duration: 1}}>
          <Typography variant="body1" style={{fontSize: '20px'}}>
            Welcome, Phan
          </Typography>
        </Fade>
        <Fade in={true} style={{transitionDelay: 300, duration: 1}}>
          <Typography
            variant="display4"
            style={{textAlign: 'center'}}
            gutterBottom
          >
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
            style={{display: 'block', margin: '0 auto'}}
            className={classes.button}
          >
            Mantra of the Day
          </Button>
        </Slide>
      </div>
    )
  }
}

export default withStyles(styles)(Landing)
