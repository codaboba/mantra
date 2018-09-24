import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import SettingsIcon from '@material-ui/icons/Settings'
import HelpIcon from '@material-ui/icons/Help'

const styles = theme => ({
  root: {
    width: '100%'
  }
})

const Account = props => {
  const {classes} = props
  return (
    <div className={classes.root}>
      <List component="nav">
        <ListItem button>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <HelpIcon />
          </ListItemIcon>
          <ListItemText primary="Help" />
        </ListItem>
      </List>
    </div>
  )
}

export default withStyles(styles)(Account)
