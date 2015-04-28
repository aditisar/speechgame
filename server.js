var express = require('express'),
    http = require('http'), 
    morgan  = require('morgan'),
    path = require('path'),
    serialport = require('serialport'),// include the library
    SerialPort = require("serialport").SerialPort,
    sio =require('socket.io'),
    sockets = require('./serverSocket.js');



var p1Port = new SerialPort('/dev/tty.usbmodem1411', {
   baudRate: 9600,
   // look for return and newline at the end of each data packet:
   parser: serialport.parsers.readline("\r\n")
 });


function showPortOpen() {
   console.log('port open. Data rate: ' + p1Port.options.baudRate);
}
function showPortClose() {
   console.log('port closed.');
}
function showError(error) {
   console.log('Serial port error: ' + error);
}
function parseP1Data(data) {
  console.log(data);
  if (data == 100) {
    //Send a request to the client side to click buzzer 1. 
    a = 110;
    p1Port.write(Buffer([a]));
    console.log('asdkjf '+a)

  }  

  if (data == 200) {
    console.log("Buzzer 2 pressed!");
    //Send a request to the client side to click buzzer 2. 
    // This might be moved to parseP2Data when we add another arduino connected to diff serial port
  }
}

p1Port.on('open', showPortOpen);
p1Port.on('close', showPortClose);
p1Port.on('error', showError);
p1Port.on('data', parseP1Data)

//when you get client side data


// Create a class that will be our main application
var SimpleStaticServer = function() {

  // set self to the scope of the class
  var self = this;  
  
  /*  ================================================================  */
  /*  App server functions (main app logic here).                       */
  /*  ================================================================  */

  self.app = express();
  //	self.app.use(connect(connect.basicAuth('j', 'jmjm')))
  self.app.use(morgan('[:date] :method :url :status'));	// Log requests
  self.app.use(express.static(path.join(__dirname, 'public')));	// Process static files

  // Start the server (starts up the sample application).
  self.start = function() {
    /*
     * OpenShift will provide environment variables indicating the IP 
     * address and PORT to use.  If those variables are not available
     * (e.g. when you are testing the application on your laptop) then
     * use default values of localhost (127.0.0.1) and 33333 (arbitrary).
     */
    self.ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
    self.port      = process.env.OPENSHIFT_NODEJS_PORT || 33333;
    var httpServer = http.Server(self.app);
    var io = sio(httpServer);

    //  Start listening on the specific IP and PORT
    httpServer.listen(self.port, self.ipaddress, function() {
      console.log('%s: Node server started on %s:%d ...',
                        Date(Date.now() ), self.ipaddress, self.port);
    });
  sockets.init(io);

  };
}; 


/**
 *  main():  Main code.
 */
var sss = new SimpleStaticServer();
sss.start();





