redis = require("redis")

client = redis.createClient()

showItem = (error, item) ->
  console.log "Results: "+item
  # client.lpop "results"

makeList = (error,len) ->
  client.lindex "results", len, showItem while len-- > 0

client.llen("results", makeList)
