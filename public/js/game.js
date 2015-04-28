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

function answeredCorrect(player){
	if (player == 1) {
		console.log('player one scores a point' + p1score)
		p1score = p1score+1;
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

$( document ).ready(function() {
	
	//start with the welcome screen
	$('#promptView').hide();
	$('#outputView').hide();
	$('#debugView').hide();

	$('#startButton').click(function(){
		console.log('dfhksfjl;')
		showGame();
	});

	$('#p1buzzer').click(function(){
		console.log("PLAYER 1 BUZZED " + gameState)

		if (gameState == 0){ //waiting for a buzzer click
			curPlayer=1;
			gameState=1;
			$('#whoseTurn').html('<h3> PLAYER 1 GO</h3>')

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
		score = score - 0.5
		$('#score').html(score)
		expectedAnswer = pickRandomState()
	});

	$('#startBtn').closest('.ui-btn').hide();
	$('#stopBtn').closest('.ui-btn').hide();

 	$('#hint').hide();

});