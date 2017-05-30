var triviagame = {
	counter: 0, 
	counterInterval: null, 
	gameQuestions: {
		Q1: {
			question: "question 1",
			options: ["1-opt1", "1-opt2", "1-opt3", "1-opt4"],
			answer: "1-opt1"
		},
		Q2: {
		question: "question 2",
		options: ["2-opt1", "2-opt2", "2-opt3", "2-opt4"],
		answer: "2-opt1"
		},
		Q3: {
		question: "question 3",
		options: ["3-opt1", "3-opt2", "3-opt3", "3-opt4"],
		answer: "3-opt1"
		}
	},
	userSelection: null,
	curQuestionInitialize: function(){
		counter=30; 
		counterInterval=setInterval(triviagame.startCounter, 1000);
	},

	startCounter: function (){
		$('#js-countdn').html(counter);
		counter--;
		if(counter<0){
			triviagame.stopCounter();
		}
	},

	stopCounter: function (){
		clearInterval(counterInterval);
	}
};

$(document).ready(function(){
var play=triviagame;
play.curQuestionInitialize();
$('#js-question').html(play.gameQuestions.Q1.question);
for (i=0; i<4; i++){
	$('#js-answer').append('<p class=\'js-options\' value='+i+'>'+play.gameQuestions.Q1.options[i]+'</p>');

}
$('.js-options').on('click', function(){
	play.userSelection=$(this).attr('value');
	console.log(tmp);
	play.stopCounter();
});
});