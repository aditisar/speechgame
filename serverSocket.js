//var session = require('../models/user.js');
//var users = [];

var serialport = require('serialport'),// include the library
    SerialPort = require("serialport").SerialPort;

var p1Port = new SerialPort('/dev/tty.usbmodem1411', {
   baudRate: 9600,
   // look for return and newline at the end of each data packet:
   parser: serialport.parsers.readline("\r\n")
 });

function showError(error) {
	console.log('Serial port error: ' + error);
}

p1Port.on('error', showError);


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
		socket.on('updateLED', function(data){
    		p1Port.write(Buffer([data.score]));
    		console.log('Wrote '+data.score + ' to serial.')
		});
		
		
		socket.on('disconnect', function(){
		    console.log("Someone just left");
		    currentlyOpen--;
		    console.log("currentlyOpen = "+currentlyOpen);
		    console.log("currentUsers = "+currentUsers);

		});		

		function showPortOpen() {
		   console.log('port open. Data rate: ' + p1Port.options.baudRate);
		}
		function showPortClose() {
		   console.log('port closed.');
		}
		function parseP1Data(data) {
		  //console.log(data);
		  if (data == 100) {
		    console.log("Buzzer 1 pressed!")
		    //Send a request to the client side to click buzzer 1.
		    socket.emit('pressb1'); 
		  }  
		
		  if (data == 200) {
		    console.log("Buzzer 2 pressed!");
		    //Send a request to the client side to click buzzer 2. 
		    // This might be moved to parseP2Data when we add another arduino connected to diff serial port
		  }
		}
		
		p1Port.on('open', showPortOpen);
		p1Port.on('close', showPortClose);
		p1Port.on('data', parseP1Data);		



	});


}

