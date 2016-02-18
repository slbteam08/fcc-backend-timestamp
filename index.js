var http = require("http");
var url = require("url");
var moment = require("moment");

var server = http.createServer(function(req, res) {
  var info = url.parse(req.url, true);
  
  if (info.pathname == "/") {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end("Please enter a date string or unix timestamp");
  } else {
    var param = decodeURIComponent(info.pathname.substr(1));
    var dateLang = moment(new Date(param));
    var dateUnix = moment.unix(param);
    var result = null;
    
    if (dateUnix.isValid()) {
      result = dateUnix;
    } else if (dateLang.isValid()) {
      result = dateLang;
    }
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    if (result === null) {
      res.end(JSON.stringify({
  	    unix: null,
  	    natural: null
  	  })); 
    } else {
      res.end(JSON.stringify({
  	    unix: result.unix(),
  	    natural: result.format("MMMM D, YYYY")
  	  })); 
    }
  }
});
server.listen(process.env.PORT, process.env.IP, 50, function(err, data) {
  if (err) throw err
  console.log("Listening on: "+process.env.IP+":"+process.env.PORT)
});