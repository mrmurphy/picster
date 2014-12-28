var thinky = require('../thinky')

var PlItem = thinky.createModel("PlItem", {
  id: String,
  media_type: String,
  format: String,
  original_file_name: String,
  user_id: String,
  created_at: Number,
  updated_at: Number,
  taken_at: Number,
  width: Number,
  height: Number,
  orientation: Number,
  time_zone_offset: Number,
  time_zone: String,
  hidden: Boolean,
  visible: Boolean,
  filesize: Number,
  version: Number,
  bucket_id: Number
})

module.exports = PlItem
