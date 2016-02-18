var http = require("http");

var server = http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end("Hello World");
});
server.listen(process.env.PORT, process.env.IP, 50, function(err, data) {
  if (err) throw err
  console.log("Listening on: "+process.env.IP+":"+process.env.PORT)
});