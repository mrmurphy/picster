var actions = require('./lib/actions')

actions.fetchEntirePlIndex()
.then(function(index) {
  return actions.createItems(index)
}, function(err) {
  console.error(err.stack)
})
.then(function() {
  console.log("success!")
}, function(err) {
  console.error(err.stack)
}) 
