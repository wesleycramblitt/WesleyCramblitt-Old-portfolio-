var MongoClient = require('mongodb').MongoClient

var state = {
  db: null,
}

exports.connect = function(done) {
  if (state.db) return done()

  MongoClient.connect("mongodb://localhost:27017/", function(err, client) {
    if (err) return done(err)

    state.db = client.db("bloggingEngine");
    done()
  })
}

exports.get = function() {
  return state.db
}

exports.close = function(done) {
  if (state.db) {
    state.db.close(function(err, result) {
      state.db = null
      state.mode = null
      done(err)
    })
  }
}