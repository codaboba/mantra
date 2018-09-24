import React from 'react'
import Zoom from '@material-ui/core/Zoom'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import LikeDislike from './LikeDislike'
import {fetchQuote, fetchQuoteById} from '../../quoteTrainer'

class DailyMantra extends React.Component {
  constructor() {
    super()
    this.state = {
      mantra: '',
      keywords: [],
      feature: [],
      sentimentScore: 0,
      positive: [],
      negative: []
    }
  }

  async componentDidMount() {
    const {quote, keywords, feature, sentimentScore} = await fetchQuote('like')
    const {score, positive, negative} = sentimentScore
    this.setState({
      mantra: quote,
      keywords,
      feature,
      sentimentScore: score,
      positive,
      negative
    })

    // const {quote, keywords, feature, sentimentScore} = await fetchQuoteById(541)
    // this.setState({mantra: quote, keywords, feature, sentimentScore})
  }

  render() {
    const {quote, author} = this.state.mantra
    const {keywords, sentimentScore, positive, negative} = this.state
    return (
      <div className="container">
        <Zoom
          in={true}
          style={{transitionDelay: 500}}
          mountOnEnter
          unmountOnExit
        >
          <div className="mantra-hero">
            <h4>MANTRA OF THE DAY</h4>
            <h1>{quote}</h1>
            <p className="author">&mdash; {author}</p>
            <LikeDislike {...this.state} />
            <Card className="demo-details" style={{marginTop: '25px'}}>
              <CardContent>
                <Typography color="textSecondary">Demo</Typography>
                <p>Keywords: {`[ ${keywords.join(', ')} ]`}</p>
                <p>Sentiment Score: {sentimentScore}</p>
                <p>Positive: [ {positive.join(', ')} ]</p>
                <p style={{marginBottom: '0px'}}>Negative: [ {negative} ]</p>
              </CardContent>
            </Card>
          </div>
        </Zoom>
      </div>
    )
  }
}

export default DailyMantra
