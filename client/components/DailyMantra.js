import React from 'react'
import Zoom from '@material-ui/core/Zoom'
import LikeDislike from './LikeDislike'

const DailyMantra = props => {
  return (
    <div>
      <Zoom in={true} style={{transitionDelay: 500}} mountOnEnter unmountOnExit>
        <div className="mantra-hero">
          <h4>QUOTE OF THE DAY</h4>
          <p>We found a quote we think you will like</p>
          <h1>No one can make you feel inferior without your consent.</h1>
          <p>&mdash; Eleanor Roosevelet</p>
          <LikeDislike />
        </div>
      </Zoom>
    </div>
  )
}

export default DailyMantra
