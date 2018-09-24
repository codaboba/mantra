const synaptic = require('synaptic')
const axios = require('axios')
const fs = require('fs')

const Network = synaptic.Network,
  Trainer = synaptic.Trainer,
  Architect = synaptic.Architect

const fetchQuoteById = async quoteId => {
  const PORT = process.env.PORT || 8080
  try {
    const {data} = await axios({
      method: 'get',
      url: `http://localhost:${PORT}/api/quotes/${quoteId}`
    })
    return data
  } catch (err) {
    console.error(err)
  }
}

const fetchQuote = async route => {
  const PORT = process.env.PORT || 8080
  try {
    const {data} = await axios({
      method: 'get',
      url: `http://localhost:${PORT}/api/quotes/${route}`
    })
    return data
  } catch (err) {
    console.error(err)
  }
}

const updateQuote = async quoteId => {
  const PORT = process.env.PORT || 8080
  try {
    const {data} = await axios({
      method: 'put',
      url: `http://localhost:${PORT}/api/quotes/${quoteId}`
    })
    console.log('Quote has been used:', data.quote)
  } catch (err) {
    console.error(err)
  }
}

const saveTrainer = async trainer => {
  console.log('before hitting /trainer route')
  const PORT = process.env.PORT || 8080
  try {
    const savedTrainer = await axios({
      method: 'post',
      headers: {'content-type': 'application/json'},
      url: `http://localhost:${PORT}/api/quotes/trainer`,
      data: {trainer}
    })
    console.log('Trainer successfully saved')
    return savedTrainer
  } catch (err) {
    console.error(err)
  }
}

const trainNetwork = async () => {
  const trainingSet = async likeOrDislike => {
    try {
      const data = await fetchQuote(likeOrDislike)
      let {quote, feature, sentimentScore} = data
      // await updateQuote(quote.id)

      return [
        {
          input: [...feature, sentimentScore.score],
          output: [quote.likeBool]
        }
      ]
    } catch (err) {
      console.error(err)
    }
  }

  let myNetwork

  for (let i = 0; i < 10; i++) {
    const likeTrainingSet = trainingSet('like')
    const dislikeTrainingSet = trainingSet('dislike')

    const inputLength = async () => {
      try {
        const data = await fetchQuote('like')
        let {feature} = data
        return feature.length + 1
      } catch (err) {
        console.error(err)
      }
    }

    const input = await inputLength

    myNetwork =
      Network.fromJSON(require('./myNetwork.json')) ||
      new Architect.Perceptron(input, 6, 1)

    const trainer = new Trainer(myNetwork)
    const options = {rate: 0.05, iterations: 20}
    trainer.train(await likeTrainingSet, options)
    const likeError = trainer.test(await likeTrainingSet).error
    console.log(`Training error ---> Like Error: ${likeError}`)

    trainer.train(await dislikeTrainingSet, options)
    const dislikeError = trainer.test(await dislikeTrainingSet).error
    console.log(`Training error ---> Dislike Error: ${dislikeError}`)
  }

  fs.writeFile('myNetwork.json', JSON.stringify(myNetwork.toJSON()), err => {
    if (err) throw err
    console.log('The file has been saved!')
  })
}

// const userTesting = ({feature, sentimentScore, response}) => {
//   const learningRate = 0.05
//   const myNetwork = synaptic.Network.fromJSON(require('./myNetwork.json'))
//   const network = Network.fromJSON(myNetwork)

//   const beforeBackprop = network.activate([...feature, sentimentScore])
//   network.propagate(learningRate, [response])
//   console.log('** OUTPUT BEFORE BACKPROPAGATION **', beforeBackprop)

//   const afterBackprop = network.activate([...feature, sentimentScore])
//   console.log('** OUTPUT AFTER BACKPROP**', afterBackprop)
//   fs.writeFile('myNetwork.json', JSON.stringify(myNetwork.toJSON()), err => {
//     if (err) throw err
//     console.log('The file has been saved!')
//   })
// }

// trainNetwork()

module.exports = {
  trainNetwork,
  fetchQuote,
  fetchQuoteById,
  updateQuote
  // userTesting
}
