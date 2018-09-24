import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import Zoom from '@material-ui/core/Zoom'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

const styles = {
  card: {
    minWidth: 275
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
}

const MyMantras = ({classes}) => {
  return (
    <div>
      {/* lists that expand into card and shows the date of the quote */}
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary">
            September 1, 2018
          </Typography>
          <Typography component="p">
            Life is the childhood of our immortality.
          </Typography>
        </CardContent>
      </Card>
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary">
            September 1, 2018
          </Typography>
          <Typography component="p">
            Life is the childhood of our immortality.
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export default withStyles(styles)(MyMantras)
