var thinky = require('../thinky')

var AppState = thinky.createModel('AppState', {
  initial_crawl_complete: Boolean,
  last_updated: Number
})

module.exports = AppState
