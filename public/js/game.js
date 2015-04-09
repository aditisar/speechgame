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






$( document ).ready(function() {
	$('#hintButton').click(function(){
		$('#hint').toggle();
	});

 	$('#hint').hide();

});