var httpDuplex = require('../');
var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req, res) {
    var dup = httpDuplex(req, res);
    console.log(dup.method + ' ' + dup.url);
    
    if (dup.method === 'POST') {
        dup.pipe(process.stdout, { end : false });
    }
    fs.createReadStream(__filename).pipe(dup);
});

server.listen(8484);