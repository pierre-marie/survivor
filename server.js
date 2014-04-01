//DEBUG// var io = require('socket.io').listen(8081);
var io = require('socket.io').listen(8081, { log: false });

io.sockets.on('connection', function (socket) {

	console.log(socket.id + ' connect');
	socket.emit('message', 'Vous êtes bien connecté !');

	socket.on('message', function(message) {

        if (message == 'SHOOT') {
        	socket.broadcast.emit('INCOMING_SHOOT', socket.id);
        }
    });

	//Receive an updated player to broadcast
	socket.on('SEND_PLAYER', function(p) {
		socket.broadcast.emit('UPDATE_PLAYER', p);
		socket.emit('UPDATE_PLAYER', p);
	});

  	socket.on('disconnect', function () { 
  		console.log(socket.id + ' disconnect');
  		socket.broadcast.emit('DECO', socket.id);
  		socket.emit('DECO', socket.id);
  	});
});
