const synaptic = require('synaptic')
const axios = require('axios')

const Trainer = synaptic.Trainer,
  Architect = synaptic.Architect

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
  } catch (err) {
    console.error(err)
  }
}

const saveTrainer = async trainer => {
  console.log('before hitting /trainer route')
  const PORT = process.env.PORT || 8080
  try {
    await axios({
      method: 'post',
      url: `http://localhost:${PORT}/api/quotes/trainer`,
      data: {trainer}
    })
    console.log('Trainer successfully saved')
  } catch (err) {
    console.error(err)
  }
}

const train = async () => {
  const trainingSet = async likeOrDislike => {
    try {
      const data = await fetchQuote(likeOrDislike)
      let {quote, feature, sentimentScore} = data
      console.log('** QUOTE **', quote)
      await updateQuote(quote.id)

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

  for (let i = 0; i < 25; i++) {
    const likeTrainingSet = trainingSet('like')
    const dislikeTrainingSet = trainingSet('dislike')

    const inputLength = async () => {
      try {
        const data = await fetchQuote('like')
        let {feature} = data
        return feature.length
      } catch (err) {
        console.error(err)
      }
    }

    const input = await inputLength
    myNetwork = new Architect.Perceptron(input, 6, 1)
    const trainer = new Trainer(myNetwork)
    const options = {rate: 0.05, iterations: 200}
    trainer.train(await likeTrainingSet, options)
    const likeError = trainer.test(await likeTrainingSet).error
    console.log(`Training error ---> Like Error: ${likeError}`)

    trainer.train(await dislikeTrainingSet, options)
    const dislikeError = trainer.test(await dislikeTrainingSet).error
    console.log(`Training error ---> Dislike Error: ${dislikeError}`)
  }

  const trainedNetwork = myNetwork.toJSON()
  // await saveTrainer(trainedNetwork)
  return trainedNetwork
}

const trainedNetwork = train().then(data => data)

// console.log('** TRAINED NETWORK **', trainedNetwork)

module.exports = trainedNetwork
