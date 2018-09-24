import React from 'react'
import FavoriteIcon from '@material-ui/icons/FavoriteBorder'
import ClearIcon from '@material-ui/icons/Clear'
import Button from '@material-ui/core/Button'
import {withStyles} from '@material-ui/core/styles'
import {userTesting} from '../network'

const style = {
  button: {
    height: '70px',
    width: '70px',
    background: 'linear-gradient(45deg, #6bcffe 30%, #8e5fff 90%)',
    color: 'white',
    boxShadow: '0 3px 5px 2px rgba(188, 188, 188, 0.3)'
  }
}

class LikeDislike extends React.Component {
  constructor(props) {
    super(props)
    this.handleLike = this.handleLike.bind(this)
    this.handleDislike = this.handleDislike.bind(this)
  }

  handleLike(event) {
    const {feature, sentimentScore} = this.props
    userTesting({feature, sentimentScore, response: 1})
  }

  handleDislike(event) {
    const {feature, sentimentScore} = this.props
    userTesting({feature, sentimentScore, response: 0})
  }

  render() {
    const {classes} = this.props
    return (
      <div
        className="like-dislike"
        style={{display: 'flex', justifyContent: 'space-around'}}
      >
        <Button
          variant="fab"
          value={0}
          onClick={this.handleDislike}
          className={classes.button}
        >
          <ClearIcon fontSize="large" />
        </Button>
        <Button
          variant="fab"
          valuee={1}
          onClick={this.handleLike}
          className={classes.button}
        >
          <FavoriteIcon fontSize="large" />
        </Button>
      </div>
    )
  }
}

export default withStyles(style)(LikeDislike)
