const db = require('../db')
const keywordExtractor = require('keyword-extractor')
const natural = require('natural')
const Keyword = require('./keyword')
const Sequelize = require('sequelize')
const Sentiment = require('sentiment')

const Quote = db.define('quote', {
  quote: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
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
    type: Sequelize.ENUM,
    defaultValue: 0,
    values: [0, 1]
  },
  usedBool: {
    type: Sequelize.ENUM,
    defaultValue: 0,
    values: [0, 1]
  }
})

Quote.prototype.getSentimentScore = function() {
  const sentiment = new Sentiment()
  this.setDataValue(sentiment.analyze(this.getDataValue('quote')))
}

Quote.prototype.getKeywords = function() {
  const keywords = keywordExtractor.extract(this.getDataValue('quote'), {
    language: 'english',
    remove_digits: true,
    return_changed_case: true,
    remove_duplicates: false
  })
  const stemmedKeywords = keywords.map(word => natural.PorterStemmer.stem(word))
  console.log('Quote has successfully been tokenized:', stemmedKeywords)
  this.setDataValue(stemmedKeywords)
}

Quote.prototype.getFeature = async function(keywordsArray) {
  try {
    const allKeywords = await Keyword.findAll({raw: true})
    const feature = []
    for (let i = 0; i < allKeywords.length; i++) {
      const tokenExists = keywordsArray.some(
        keyword => keyword === allKeywords(i).keyword
      )
      const value = tokenExists ? 1 : 0
      feature.push(value)
    }
    console.log('Feature has been successfully created:', feature)
    return feature
  } catch (err) {
    console.error(err)
  }
}

Quote.afterCreate(async quote => {
  const tokens = quote.getDataValue('keywords')
  for (let i = 0; i < tokens.length; i++) {
    await Keyword.findOrCreate(tokens[i])
  }
})

module.exports = Quote
