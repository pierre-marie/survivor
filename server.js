//DEBUG
var io = require('socket.io').listen(8081);
//var io = require('socket.io').listen(8081, { log: false });

io.sockets.on('connection', function (socket) {

	var correspondance = {};

	console.log(socket.id + ' connect');
	socket.emit('message', 'Vous êtes bien connecté !');

	socket.join('justin bieber fans');
    socket.broadcast.to('justin bieber fans').emit('new fan');

	socket.on('message', function(message) {
    });

	socket.on('MY_ID', function(pId) {
		if (typeof correspondance[socket.id] == 'undefined') {
			correspondance[socket.id] = {};
		}
		correspondance[socket.id]['playerId'] = pId;
		socket.join(pId);
		//socket.broadcast.to('justin bieber fans').emit('new fan');
	});

	//Receive a shoot to broadcast
	socket.on('SHOOT', function(pId) {
		socket.broadcast.emit('INCOMING_SHOOT', pId);
	});

	//Receive an updated player to broadcast
	socket.on('SEND_PLAYER', function(p) {
		socket.broadcast.emit('UPDATE_PLAYER', p);
		//socket.emit('UPDATE_PLAYER', p);
	});

  	socket.on('disconnect', function () { 
		if (typeof correspondance[socket.id] != 'undefined') {
  			console.log(socket.id + ' disconnect');
  			socket.broadcast.emit('DECO', correspondance[socket.id]['playerId']);
  			delete correspondance[socket.id];
  		}
  	});
});
