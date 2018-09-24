const db = require('../db')
const Sequelize = require('sequelize')

module.exports = db.define('trainer', {
  json: {
    type: Sequelize.JSON,
    allowNull: false
  }
})
