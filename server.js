var client, fs, haml, http, redis, tmpl;
http = require("http");
redis = require("redis");
haml = require("haml");
fs = require("fs");
client = redis.createClient();
client.on("error", function(err) {
  return console.log("Error " + err);
});
tmpl = fs.readFileSync("index.haml", "utf8");
http.createServer(function(request, response) {
  var args, re, res, type;
  args = require("url").parse(request.url);
  re = /^\/?(\d+)/;
  res = re.exec(args.pathname);
  if (res != null) {
    console.log("ID: " + res[1]);
    response.writeHead(200, {
      "Content-Type": "text/html"
    });
    response.end("ID: " + res[1]);
    return client.rpush("results", res[1]);
  } else {
    re = /([^\/]+(\.js|\.css|\.png))$/;
    res = re.exec(args.pathname);
    if (res != null) {
      type = 'text/html';
      if (res[2] === '.js') {
        type = "text/javascript";
      } else if (res[2] === '.css') {
        type = "text/css";
      } else {
        type = "image/png";
      }
      console.log("Sending: " + type + ": " + res[1]);
      response.writeHead(200, {
        "Content-Type": type
      });
      try {
        return response.end(fs.readFileSync(res[1], "utf8"));
      } catch (e) {
        return console.log(e);
      }
    } else {
      console.log("Sending: index.haml");
      response.writeHead(200, {
        "Content-Type": "text/html"
      });
      return response.end(haml.render(tmpl));
    }
  }
}).listen(8124);
console.log("Server running at http://127.0.0.1:8124/");