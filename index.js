let express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendfile('index.html');
});


io.on('connection', function(socket) {
    console.log('a user connected');

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });

    socket.on('message', function(message) {
        console.log('message', message);
        socket.broadcast.emit('message', message);
    });

    //join
    socket.on('joined', function(room) {
        console.log('room', room);
        var clientsInRoom = io.sockets.adapter.rooms[room];
        var numClients = clientsInRoom ? Object.keys(clientsInRoom.sockets).length : 0;
        if (numClients === 0) {
            socket.join(room);
            //log('Client ID ' + socket.id + ' created room ' + room);
            socket.emit('created', room, socket.id);

        } else if (numClients >= 1) {

            //log('Client ID ' + socket.id + ' joined room ' + room);
            socket.join(room);

            socket.emit('joined', room, socket.id);

        } else { // max two clients
            //socket.emit('full', room);
        }
    });

    //全部都准备完毕
    socket.on('ready', function(room) {
        io.sockets.in(room).emit('ready', room);
    });


});

http.listen(8080, function() {
    console.log('listening on port 8080');
})