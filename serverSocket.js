//var session = require('../models/user.js');
//var users = [];
var userSockets = [];

exports.init = function(io) {
	var currentlyOpen = 0; //number of clients
	var currentUsers = 0; //number of players in game
	console.log("currentlyOpen = "+currentlyOpen);
	console.log("currentUsers = "+currentUsers);
  
  // When a new connection is initiated
	io.sockets.on('connection', function (socket) {
		currentlyOpen++;
		console.log("New window opened");
		console.log("currentlyOpen = "+currentlyOpen);
		console.log("currentUsers = "+currentUsers);
		
		
		//Since there is a max of two players at a time, only add new client if there is space
		socket.on('answeredCorrect', function(data){
			//serial.write somthing
			console.log('hi')
		});
		
		
		socket.on('disconnect', function(){
		    console.log("Someone just left");
		    currentlyOpen--;
		    console.log("currentlyOpen = "+currentlyOpen);
		    console.log("currentUsers = "+currentUsers);

		});		

	});


}

