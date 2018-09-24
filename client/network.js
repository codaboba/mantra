import myNetwork from '../myNetwork.json'
const synaptic = require('synaptic')
const learningRate = 0.05

export const userTesting = ({feature, sentimentScore, response}) => {
  const Network = synaptic.Network
  const network = Network.fromJSON(myNetwork)
  const beforeBackprop = network.activate([...feature, sentimentScore])
  network.propagate(learningRate, [response])
  console.log('** OUTPUT BEFORE BACKPROPAGATION **', beforeBackprop)

  const afterBackprop = network.activate([...feature, sentimentScore])
  console.log('** OUTPUT AFTER BACKPROP**', afterBackprop)
}
