// [['ACCOUNT', 'AH K AW N T'], ['ACT', 'AE K T'], ['ADDITION', 'AH D IH SH AH N'], .... ]
//statecapitals is the name of the dictionary
var p1score = 0;
var p2score = 0;
var curPlayer = 0; //1 means player 1, 2 means player 2

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
	if (player == 1) 
		p1score = p1score+1;
		$('#p1score').html(p1score)

	if (player == 2) 
		p2score = p2score+1; 
		$('#p2score').html(p2score)

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