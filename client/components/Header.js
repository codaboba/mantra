import React from 'react'
import {withRouter} from 'react-router-dom'
import CardContent from '@material-ui/core/CardContent'
import Card from '@material-ui/core/Card'
import {withStyles} from '@material-ui/core/styles'

const styles = {
  root: {
    boxShadow: '0 0 0 0',
    borderRadius: '0',
    paddingBottom: '0',
    textAlign: 'center'
  },
  card: {
    paddingBottom: 0
  }
}

class Header extends React.Component {
  constructor() {
    super()
    this.state = {
      header: ''
    }
  }

  componentDidMount() {
    const {location} = this.props
    if (location.pathname > 1) {
      let header
      if (location.pathname === '/mod') {
        header = 'Mantra of the Day'
      } else {
        const initialCaps = location.pathname.slice(1)[0].toUpperCase()
        header = initialCaps + location.pathname.slice(2)
      }
      this.setState({header})
    }
  }

  componentDidUpdate(pastProps) {
    const {location} = this.props
    if (location !== pastProps.location) {
      let header
      if (location.pathname === '/mod') {
        header = 'Mantra of the Day'
      } else {
        const initialCaps = location.pathname.slice(1)[0].toUpperCase()
        header = initialCaps + location.pathname.slice(2)
      }
      this.setState({header})
    }
  }

  render() {
    const {classes} = this.props
    return (
      <div className="header">
        <Card className={classes.root}>
          <CardContent className={classes.card}>
            {this.state.header}
          </CardContent>
        </Card>
      </div>
    )
  }
}

export default withRouter(withStyles(styles)(Header))
