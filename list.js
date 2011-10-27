var client, makeList, redis, showItem;
redis = require("redis");
client = redis.createClient();
showItem = function(error, item) {
  return console.log("Results: " + item);
};
makeList = function(error, len) {
  var _results;
  _results = [];
  while (len-- > 0) {
    _results.push(client.lindex("results", len, showItem));
  }
  return _results;
};
client.llen("results", makeList);