const request = require('request')

request('http://stackabuse.com', function(err, res, body) {
  if (err) console.error(err)
  console.log(body)
})
