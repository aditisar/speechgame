$(document).ready(function() {

	//use this for local testing
	var socket = io.connect(':33333/');
		

    //this is called when we're waiting for another player
    socket.on('press buzz 1', function(){
    	//press appropriate buttoons
    });


	$('#p1buzzer').click(function(){
		//fix
		socket.emit('startTimer');
	});



});

