
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

		if (typeof players[socket.id] == 'undefined') {
			players[socket.id] = {};
		}
		if (typeof players[socket.id]['x'] == 'undefined') {
			players[socket.id]['x'] = 0.0;
			players[socket.id]['y'] = 0.0;
			players[socket.id]['r'] = 0.0;
		}

    });

	socket.on('setName', function(message) {
		var auth = true;
//		for(var p in players) {
//			if (players[p]['name'] = message) {
//				auth = false;
//			}
//		}
//		if (auth) {
//			players[socket.id]['name'] = message;
//		} else {
//			socket.emit('alreadyConnected', message);
//		}
		players[socket.id]['name'] = message;
		socket.emit('message', 'START');
		sendPlayers();
	});

	socket.on('setPicture', function(message) {
		var s = message.replace("_n","_t");
		players[socket.id]['picture'] = s;
	});

	setInterval(function updatePos() {
		for(var p in players) {
			if (players[p]['right']) {
		 		players[p]['r'] += 0.01;
		 	}
		 	if (players[p]['left']) {
		 		players[p]['r'] -= 0.01;
		 	}
		 	if (players[p]['up']) {
		 		players[p]['x'] += Math.cos(players[p]['r']);
        		players[p]['y'] += Math.sin(players[p]['r']);
		 	}
		 	if (players[p]['down']) {
		 		players[p]['x'] -= Math.cos(players[p]['r']);
        		players[p]['y'] -= Math.sin(players[p]['r']);
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
  		socket.broadcast.emit('deco', socket.id);
  	});
});
