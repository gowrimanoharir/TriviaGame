var play, questions, curQuestion;


var triviagame = {
	counter: 0, 
	counterInterval: null,
	correct: 0,
	incorrect: 0,
	unanswered: 0,
	isTimedOut: null,
	userSelection: null,
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
	
	gameInitialize: function(){
		questions=Object.keys(this.gameQuestions);
		curQuestion=null;
		curQuestion= this.gameQuestions[questions.pop()];
		this.correct=0;
		this.incorrect=0;
		this.unanswered=0;
		this.curQuestionInitialize();
	},

	displayStartPg: function(){
		$('#js-question').html('Select to a Category');
	},

	curQuestionInitialize: function(){
		counter=30; 
		this.isTimedOut=false;
		counterInterval=setInterval(triviagame.startCounter, 1000);
		$('#js-question').html(curQuestion.question);
		$('#js-answer').empty();
		for (i=0; i<4; i++){
			$('#js-answer').append('<p class=\'js-options\' value='+i+'>'+curQuestion.options[i]+'</p>');			
		}
	},
	
	calcNdisplay: function(){
		if (this.isTimedOut){
			this.unanswered++;
			$('#js-answer').empty();
			$('#js-answer').append('<p class=\'anstxt\'>You ran out of time, it is '+curQuestion.answer+'</p>');
			$('#js-answer').append('<img class=\'ansimg\'src=\'assets/images/wait.jpg\'>');
		}
		else if (this.userSelection===curQuestion.answer){
			this.correct++;
			$('#js-answer').empty();
			$('#js-answer').append('<p class=\'anstxt\'>You are correct, it is '+curQuestion.answer+'</p>');
			$('#js-answer').append('<img class=\'ansimg\'src=\'assets/images/win.gif\'>');
		}
		else{
			this.incorrect++;
			$('#js-answer').empty();
			$('#js-answer').append('<p class=\'anstxt\'>You are incorrect it is '+curQuestion.answer+'</p>');
			$('#js-answer').append('<img class=\'ansimg\'src=\'assets/images/lose.jpg\'>');
		}
		this.changeQuestion();
		
	},

	changeQuestion: function(){
		if(questions.length>0)
		{
			curQuestion=this.gameQuestions[questions.pop()];
			setTimeout(function(){
				console.log('i am in');
				triviagame.curQuestionInitialize();
			}, 5000);
		}
		else{
			setTimeout(function(){
				triviagame.gameOver();
			}, 5000);
		}
	},

	gameOver: function(){
		$('#js-question').html('Thanks for Playing!! Your scores are:');
		$('#js-answer').empty();
		$('#js-answer').append('<p class=\'anstxt\'>Correct Answers: '+this.correct+'</p>');		
		$('#js-answer').append('<p class=\'anstxt\'>Incorrect Answers: '+this.incorrect+'</p>');		
		$('#js-answer').append('<p class=\'anstxt\'>Unanswered Answers: '+this.unanswered+'</p>');		
		$('#js-answer').append('<button class=\'btn js-agnbtn\'>Play Again'+'</button>');		
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
	var i=1;
	
	play=triviagame;
	play.gameInitialize();

	$('#js-answer').on('click', '.js-options', function(){
		console.log("this is click "+i);
		play.userSelection=curQuestion.options[$(this).attr('value')];
		console.log(play.userSelection);
		play.stopCounter();
		play.calcNdisplay();
		i++;
	});

	$('#js-answer').on('click', '.js-agnbtn', function(){
		play=triviagame;
		play.gameInitialize();
	});
});