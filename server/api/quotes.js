const router = require('express').Router()
const iterateGetQuote = require('../services')
const {Quote, Trainer} = require('../db/models')

module.exports = router

router.get('/like', async (req, res, next) => {
  try {
    const quote = await Quote.findOne({
      where: {likeBool: 1, usedBool: 0}
    })
    const keywords = quote.getKeywords()
    const feature = await quote.getFeature(keywords)
    const sentimentScore = quote.getSentimentScore()
    res.send({quote, keywords, feature, sentimentScore})
  } catch (err) {
    next(err)
  }
})

router.get('/dislike', async (req, res, next) => {
  try {
    const quote = await Quote.findOne({
      where: {likeBool: 0, usedBool: 0}
    })
    const keywords = quote.getKeywords()
    const feature = await quote.getFeature(keywords)
    const sentimentScore = quote.getSentimentScore()
    res.json({quote, keywords, feature, sentimentScore})
  } catch (err) {
    next(err)
  }
})

router.post('/trainer', async (req, res, next) => {
  try {
    const savedTrainer = await Trainer.create(req.body.trainer)
    res.status(201).json(savedTrainer)
  } catch (err) {
    next(err)
  }
})

router.get('/:quoteId', async (req, res, next) => {
  try {
    const quote = await Quote.findById(req.params.quoteId)
    const keywords = quote.getKeywords()
    const feature = await quote.getFeature(keywords)
    const sentimentScore = quote.getSentimentScore()
    res.json({quote, keywords, feature, sentimentScore})
  } catch (err) {
    next(err)
  }
})

router.put('/like/:quoteId', async (req, res, next) => {
  try {
    const [, quote] = await Quote.update(
      {usedBool: 1, likeBool: 1},
      {
        where: {
          id: req.params.quoteId
        },
        returning: true,
        plain: true
      }
    )
    res.json(quote)
  } catch (err) {
    next(err)
  }
})

router.put('/:quoteId', async (req, res, next) => {
  try {
    const [, quote] = await Quote.update(
      {usedBool: 1},
      {
        where: {
          id: req.params.quoteId
        },
        returning: true,
        plain: true
      }
    )
    res.json(quote)
  } catch (err) {
    next(err)
  }
})

router.get('/populate/:num', async (req, res, next) => {
  try {
    await iterateGetQuote(Number(req.params.num))
    res.status(200).send(`${req.params.num} request(s) successful!`)
  } catch (err) {
    console.error('Error caught while making API requests to TheySaidSo')
    next(err)
  }
})
