// [['ACCOUNT', 'AH K AW N T'], ['ACT', 'AE K T'], ['ADDITION', 'AH D IH SH AH N'], .... ]
//statecapitals is the name of the dictionary
var score = 0;
var expectedAnswer = "";

function pickRandomState(){
	var pair = statecapitals[Math.floor(Math.random()*statecapitals.length)];
	$('#currentState').html(pair[0]);
	$('#hint').html("The answer is "+pair[1])
	expectedAnswer = pair[1];
	return pair[1]; //returns the answer
}

function answeredCorrect(){
	score = score +1; 
	$('#score').html(score)
	expectedAnswer = pickRandomState()
}

function newGame(){
	score = 0
	$('#score').html(score)
	expectedAnswer = pickRandomState()
}

function showGame(){
	$('#homeView').hide();
	$('#promptView').show();
	$('#outputView').show();
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