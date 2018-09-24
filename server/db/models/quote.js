const db = require('../db')
const keywordExtractor = require('keyword-extractor')
const natural = require('natural')
const dedupe = require('dedupe')
const Keyword = require('./keyword')
const Sequelize = require('sequelize')
const Sentiment = require('sentiment')

const Quote = db.define('quote', {
  quote: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
    unique: true
  },
  author: {
    type: Sequelize.STRING,
    defaultValue: 'Anonymous',
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  likeBool: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 1
    }
  },
  usedBool: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 1
    }
  }
})

Quote.prototype.getSentimentScore = function() {
  const sentiment = new Sentiment()
  return sentiment.analyze(this.getDataValue('quote'))
}

Quote.prototype.getKeywords = function() {
  const keywords = keywordExtractor.extract(this.getDataValue('quote'), {
    language: 'english',
    remove_digits: true,
    return_changed_case: true
  })
  const stemmedKeywords = dedupe(
    keywords.map(word => natural.PorterStemmer.stem(word))
  )
  return stemmedKeywords
}

Quote.prototype.getFeature = async function(keywordsArray) {
  try {
    const allKeywords = await Keyword.findAll({raw: true})
    const feature = []
    for (let i = 0; i < allKeywords.length; i++) {
      const tokenExists = keywordsArray.some(
        keyword => keyword === allKeywords[i].keyword
      )
      const value = tokenExists ? 1 : 0
      feature.push(value)
    }
    return feature
  } catch (err) {
    console.error(err)
  }
}

Quote.afterCreate(async quote => {
  const tokens = await quote.getKeywords()
  for (let i = 0; i < tokens.length; i++) {
    await Keyword.findOrCreate({
      where: {
        keyword: tokens[i]
      }
    })
  }
})

module.exports = Quote
