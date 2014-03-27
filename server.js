
var players = {};
var playersUpdated = false;
var io = require('socket.io').listen(8081);

io.sockets.on('connection', function (socket) {

	console.log(socket.id + ' connect');
	socket.emit('message', 'Vous êtes bien connecté !');

	function sendPlayers() {
		socket.emit('allPlayers', JSON.stringify(players));
		socket.broadcast.emit('allPlayers', JSON.stringify(players));
	}

	sendPlayers();
	socket.on('message', function(message) {
        console.log(socket.id + ' a envoye : ' + message);

		var res = message.split("/");
		if (typeof players[socket.id] == 'undefined') {
			players[socket.id] = {};
		}
		if (typeof players[socket.id]['x'] == 'undefined') {
			players[socket.id]['x'] = 0.0;
			players[socket.id]['y'] = 0.0;
		}

    });

	socket.on('setName', function(message) {
		players[socket.id]['name'] = message;
	});

	socket.on('setPicture', function(message) {
		players[socket.id]['picture'] = message;
	});

	setInterval(function updatePos() {
		for(var p in players) {
			if (players[p]['right']) {
		 		players[p]['x'] += 1;
		 	}
		 	if (players[p]['left']) {
		 		players[p]['x'] -= 1;
		 	}
		 	if (players[p]['up']) {
		 		players[p]['y'] -= 1;
		 	}
		 	if (players[p]['down']) {
		 		players[p]['y'] += 1;
		 	}
		}
//		if (playersUpdated) {
			sendPlayers();
//			playersUpdated = false;
//		}
	}, 20);

	socket.on('keyboardPress', function(keys){
		if (keys.right) {
			players[socket.id]['right'] = true;
		}
		if (keys.left) {
			players[socket.id]['left'] = true;
		}
		if (keys.up) {
			players[socket.id]['up'] = true;
		}
		if (keys.down) {
			players[socket.id]['down'] = true;
		}
		playersUpdated = true;
	});
	
	socket.on('keyboardRelease', function(keys){
		if (keys.right != true) {
			players[socket.id]['right'] = false;
		}
		if (keys.left != true) {
			players[socket.id]['left'] = false;
		}
		if (keys.up != true) {
			players[socket.id]['up'] = false;
		}
		if (keys.down != true) {
			players[socket.id]['down'] = false;
		}
		playersUpdated = true;
	});

  	socket.on('disconnect', function () { 
  		console.log(socket.id + 'diconnect');
  		delete players[socket.id];
  	});
});
