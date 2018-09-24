import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'
// import {logout} from '../store'
import {withRouter} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import Bookmark from '@material-ui/icons/Bookmark'
import Person from '@material-ui/icons/Person'
import Search from '@material-ui/icons/Search'
import Home from '@material-ui/icons/Home'
import {getHeader} from '../store'

const styles = {
  stickToBottom: {
    width: '100%',
    position: 'fixed',
    bottom: 0
  }
}

class Navbar extends React.Component {
  state = {
    value: 'home'
  }

  handleChange = (event, value) => {
    this.setState({value})
    this.props.getHeader(value)
    this.props.history.push(`/${value}`)
  }

  render() {
    const {classes} = this.props
    const {value} = this.state
    return (
      <div>
        <BottomNavigation
          value={value}
          onChange={this.handleChange}
          className={classes.stickToBottom}
        >
          <BottomNavigationAction label="Home" value="home" icon={<Home />} />
          <BottomNavigationAction
            label="Discover"
            value="discover"
            icon={<Search />}
          />
          <BottomNavigationAction
            label="Mantras"
            value="mantras"
            icon={<Bookmark />}
          />
          <BottomNavigationAction
            label="Account"
            value="account"
            icon={<Person />}
          />
        </BottomNavigation>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getHeader: value => dispatch(getHeader(value))
})

// const mapStateToProps = state => ({header: state.header})

const StyledNavbar = withRouter(
  withStyles(styles)(connect(null, mapDispatchToProps)(Navbar))
)

// const mapState = state => {
//   return {
//     isLoggedIn: !!state.user.id
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     handleClick() {
//       dispatch(logout())
//     }
//   }
// }

export default StyledNavbar
