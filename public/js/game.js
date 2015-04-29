// [['ACCOUNT', 'AH K AW N T'], ['ACT', 'AE K T'], ['ADDITION', 'AH D IH SH AH N'], .... ]
//statecapitals is the name of the dictionary
var p1score = 0;
var p2score = 0;
var curPlayer = 0; //1 means player 1, 2 means player 2

//STATE VARIABLE
// 0 = waiting for a buzzer click
// 1 = someone buzzed and is trying to answer 
// 2 = other person is given chance for right answer
var gameState = 0; 

var expectedAnswer = "";

function enableStartButton(){
	$('#startButton').removeAttr('disabled');
}

function pickRandomState(){
	var pair = statecapitals[Math.floor(Math.random()*statecapitals.length)];
	$('#currentState').html(pair[0]);
	$('#hint').html("The answer is "+pair[1])
	expectedAnswer = pair[1];
	$('#colorBlock').css('background-color', expectedAnswer)
	return pair[1]; //returns the answer
}

//So jank
function convertToArduinoPoints(points, player){
	if (points==10 && player==1) return 110;
	if (points==10 && player==2) return 210;
	if (player==1) return points+10;
	if (player==2) return points+20;
}


function answeredCorrect(player){
	if (player == 1) {
		console.log('player one scores a point' + p1score)
		p1score = p1score+1;
		serialConvert = convertToArduinoPoints(p1score,1)
		socket.emit('updateLED', {score:serialConvert});
 
		$('#p1score').html(p1score)
		$('#output').html('')
		$('#whoseTurn').html('')
	}
	
	if (player == 2) {
		p2score = p2score+1; 
		$('#p2score').html(p2score)
		$('#output').html('')
		$('#whoseTurn').html('')

	}
	expectedAnswer = pickRandomState()
}

function newGame(){
	p1score = 0
	p2score = 0

	$('#p1score').html(p1score)
	$('#p2score').html(p2score)
	expectedAnswer = pickRandomState()
}

function showGame(){
	$('#homeView').hide();
	$('#promptView').show();
	$('#outputView').show();
	$('#debugView').show();

}


function countdown() {
  seconds = $('#countdown').html();
  seconds = parseInt(seconds);
  if (seconds == 0) {
    stopBtn.click();
    gameState=0; //return to anyone buzzes once 3 secs are up
    $('#countdown').hide();
    $('#whoseTurn').html('');
    window.clearTimeout(a);
    a=0;
  }
  seconds--;
  $('#countdown').html(seconds);
  a = setTimeout(countdown, 1000);
} 

$( document ).ready(function() {
	//why doesn't this work???
	var socket = io.connect(':33333/');
//start with the welcome screen
	$('#promptView').hide();
	$('#outputView').hide();
	$('#debugView').hide();

	$('#startButton').click(function(){
		showGame();
		$('#countdown').hide();

	});



    socket.on('pressb1', function(){
    	$('#p1buzzer').click();
    });

	$('#p1buzzer').click(function(){
		console.log("PLAYER 1 BUZZED " + gameState)

		if (gameState == 0){ //waiting for a buzzer click
			curPlayer=1;
			gameState=1;
			$('#whoseTurn').html('<h3> PLAYER 1 GO</h3>')
			$('#countdown').show();
			$('#countdown').html('3');
			countdown();
			startBtn.click();
		}
		else if(gameState == 1){ //someone buzzed and is trying to answer 
			console.log("Stop tryna buzz p1")
		} 
		else if(gameState == 2){ //other person is given chance for right answer

		}
	});

	$('#p2buzzer').click(function(){
		console.log("PLAYER 2 BUZZED " + gameState)
		if (gameState == 0){ //waiting for a buzzer click
			curPlayer=2;
			gameState=1;
			$('#whoseTurn').html('<h3> PLAYER 2 GO</h3>')
			$('#countdown').show();
			$('#countdown').html('3');
			countdown();
			startBtn.click();
		}
		else if(gameState == 1){ //someone buzzed and is trying to answer 
			console.log("Stop tryna buzz p2")
		} 
		else if(gameState == 2){ //other person is given chance for right answer
			
		}
	});


	$('#hintButton').click(function(){
		$('#hint').toggle();
	});

	$('#skip').click(function(){
		expectedAnswer = pickRandomState();
	});

	$('#startBtn').closest('.ui-btn').hide();
	$('#stopBtn').closest('.ui-btn').hide();

 	$('#hint').hide();

});