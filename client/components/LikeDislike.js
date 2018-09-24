import React from 'react'
import FavoriteIcon from '@material-ui/icons/FavoriteBorder'
import ClearIcon from '@material-ui/icons/Clear'
import Button from '@material-ui/core/Button'

const LikeDislike = props => {
  return (
    <div className="like-dislike">
      <Button variant="fab">
        <FavoriteIcon />
      </Button>
      <Button variant="fab">
        <ClearIcon />
      </Button>
    </div>
  )
}

export default LikeDislike
