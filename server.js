let express = require('express'),
    app = express(),
    fs = require('fs');

const serverConfig = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem'),
};


let https = require('https').Server(serverConfig, app),
    io = require('socket.io')(https);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendfile('index.html');
});
https.listen(8080, function() {
    console.log('https listening on port 8080');
})