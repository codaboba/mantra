const db = require('../db')
const Sequelize = require('sequelize')

module.exports = db.define('keyword', {
  keyword: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isLowercase: true
    }
  }
})
