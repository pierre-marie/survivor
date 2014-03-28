
var players = {};
var playersUpdated = false;
var io = require('socket.io').listen(8081);

io.sockets.on('connection', function (socket) {

	console.log(socket.id + ' connect');
	socket.emit('message', 'Vous êtes bien connecté !');
	socket.emit('yourId', socket.id);

	socket.on('message', function(message) {
        console.log(socket.id + ' a envoye : ' + message);
        
        if (message == 'SHOOT') {
        	socket.broadcast.emit('INCOMING_SHOOT', socket.id);
        }

		if (typeof players[socket.id] == 'undefined') {
			players[socket.id] = {};
		}
		if (typeof players[socket.id]['x'] == 'undefined') {
			players[socket.id]['x'] = 0.0;
			players[socket.id]['y'] = 0.0;
			players[socket.id]['r'] = 0.0;
		}

    });

	//Receive an updated player to broadcast
	socket.on('SEND_PLAYER', function(p) {
		socket.broadcast.emit('UPDATE_PLAYER', p);
	});

//	setInterval(function updatePos() {
//		var speed = 10;
//		for(var p in players) {
//			if (players[p]['right']) {
//		 		players[p]['r'] += 0.01 * speed;
//		 	}
//		 	if (players[p]['left']) {
//		 		players[p]['r'] -= 0.01 * speed;
//		 	}
//		 	if (players[p]['up']) {
//		 		players[p]['x'] += speed * Math.cos(players[p]['r']);
//        		players[p]['y'] += speed * Math.sin(players[p]['r']);
//		 	}
//		 	if (players[p]['down']) {
//		 		players[p]['x'] -= speed * Math.cos(players[p]['r']);
//        		players[p]['y'] -= speed * Math.sin(players[p]['r']);
//		 	}
//		}
//		sendPlayersIfNeeded();
//	}, 20);

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
