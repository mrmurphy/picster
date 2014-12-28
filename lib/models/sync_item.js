var thinky = require('../thinky')

var SyncItem = thinky.createModel("SyncItem", {
  id: String,
  pl_id: String,
  original_downloaded: Boolean,
  preview_downloaded: Boolean,
  original_path: String,
  preview_path: String,
  pl_url: String
})

module.exports = SyncItem
