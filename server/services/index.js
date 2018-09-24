const axios = require('axios')
const {Quote} = require('../db/models')

const url = `http://quotes.rest/quote/search.json?api_key=${
  process.env.THEY_SAID_SO_KEY
}&maxlength=255&category=life`

const getQuote = async () => {
  try {
    const {data} = await axios({
      method: 'get',
      url
    })
    const {quote, author} = data.contents
    await Quote.create({quote, author})
  } catch (err) {
    console.error(err)
  }
}

const iterateGetQuote = async num => {
  for (let i = 0; i < num; i++) {
    await getQuote()
  }
}

module.exports = iterateGetQuote
