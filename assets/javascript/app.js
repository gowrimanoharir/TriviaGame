var triviagame = {
	counter: 0, 
	counterInterval: null,
	correct: 0,
	incorrect: 0,
	unanswered: 0,
	isTimedOut: null,
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

	curQuestionInitialize: function(cq){
		counter=30; 
		this.isTimedOut=false;
		counterInterval=setInterval(triviagame.startCounter, 1000);
		$('#js-question').html(cq.question);
		for (i=0; i<4; i++){
			$('#js-answer').append('<p class=\'js-options\' value='+i+'>'+cq.options[i]+'</p>');			
		}
	},
	
	calcNdisplay: function(cq){
		if (this.isTimedOut){
			this.unanswered++;
			$('#js-answer').empty();
			$('#js-answer').append('<p class=\'anstxt\'>You ran out of time, it is '+cq.answer+'</p>');
			$('#js-answer').append('<img class=\'ansimg\'src=\'assets/images/wait.jpg\'>');
		}
		else if (this.userSelection===cq.answer){
			this.correct++;
			$('#js-answer').empty();
			$('#js-answer').append('<p class=\'anstxt\'>You are correct, it is '+cq.answer+'</p>');
			$('#js-answer').append('<img class=\'ansimg\'src=\'assets/images/win.gif\'>');
		}
		else{
			this.incorrect++;
			$('#js-answer').empty();
			$('#js-answer').append('<p class=\'anstxt\'>You are incorrect it is '+cq.answer+'</p>');
			$('#js-answer').append('<img class=\'ansimg\'src=\'assets/images/lose.jpg\'>');
		}
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
		if (counter<=0)
		{
			this.isTimedOut=true;
			console.log('timeout'+this.isTimedOut);
			this.calcNdisplay();
		}
	}
};



$(document).ready(function(){
	var play=triviagame;
	var questions=Object.keys(play.gameQuestions);
	var curQuestion=play.gameQuestions[questions.pop()];
	play.curQuestionInitialize(curQuestion);
	
	$('.js-options').on('click', function(){
		play.userSelection=curQuestion.options[$(this).attr('value')];
		play.stopCounter();
		play.calcNdisplay(curQuestion);
	});
});