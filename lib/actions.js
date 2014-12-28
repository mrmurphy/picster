var bb = require('bluebird')
var axios = require('axios')

var PlItem = require('./models').PlItem
var SyncItem = require('./models').SyncItem
var config = require('./config')

module.exports = {
  createItem: function(jsonItem) {
    var newPlItem = new PlItem(jsonItem) 
    var newSyncItem = new SyncItem({pl_id: newPlItem.id})
    return bb.join(newPlItem.save(), newSyncItem.save())
  },

  createItems: function(listOfJsonItems) {
    var self = this
    var promiseList = []
    listOfJsonItems.forEach(function(item) {
      promiseList.push(self.createItem(item))
    })
    return bb.all(promiseList)
  },

  fetchEntirePlIndex: function(items, offset) {
    var self = this
    items = items || []

    function success(resp) {
      resp = resp.data
      if (String(resp.status)[0] !== "2") {
        return bb.reject(resp.error)
      }
      var media = resp.media
      var count = (resp.offset + 1) * resp.limit
      console.log("Fetched items " + (count - config.chunkSize) + " to " + count)
      if (count <= resp.total) {
        items.push.apply(items, media)
      } else if (count > resp.total) {
        items.push.apply(items, media.slice(0, resp.total % config.chunkSize))
      }
      console.log("Items list is now " + items.length + " items long")
      if (count < resp.total) {
        console.log('Not finished, looping with offset of ' + (resp.offset + 1))
        return self.fetchEntirePlIndex(items, resp.offset + 1)
      } else {
        console.log('Finished. Returning list of ' + items.length + ' items.')
        return items
      }
    }

    return axios({
      url: 'https://api.picturelife.com/medias/index/',
      params: {
        'access_token': config.plApiKey,
        'limit': config.chunkSize,
        'offset': offset || 0
      }
    }).then(success)
  },
}
