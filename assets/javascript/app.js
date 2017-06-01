var play, questions, curQuestion, curCat;


var triviagame = {
	counter: 0, 
	counterInterval: null,
	correct: 0,
	incorrect: 0,
	unanswered: 0,
	isTimedOut: null,
	userSelection: null,
	gameQuestions: 
	{	cat1: {
			CQ1: {
				question: "Cquestion 1",
				options: ["C1-opt1", "C1-opt2", "C1-opt3", "C1-opt4"],
				answer: "C1-opt1"
			},
			CQ2: {
			question: "Cquestion 2",
			options: ["C2-opt1", "C2-opt2", "C2-opt3", "C2-opt4"],
			answer: "C2-opt1"
			},
			CQ3: {
			question: "Cquestion 3",
			options: ["C3-opt1", "C3-opt2", "C3-opt3", "C3-opt4"],
			answer: "C3-opt1"
			} 
		}, 
		cat2: {
			DQ1: {
				question: "Dquestion 1",
				options: ["D1-opt1", "D1-opt2", "D1-opt3", "D1-opt4"],
				answer: "D1-opt1"
			},
			DQ2: {
			question: "Dquestion 2",
			options: ["D2-opt1", "D2-opt2", "D2-opt3", "D2-opt4"],
			answer: "D2-opt1"
			},
			DQ3: {
			question: "question 3",
			options: ["D3-opt1", "D3-opt2", "D3-opt3", "D3-opt4"],
			answer: "D3-opt1"
			} 
		}, 
	},
	
	gameInitialize: function(){
		questions=Object.keys(curCat);
		curQuestion=null;
		curQuestion= curCat[questions.pop()];
		this.correct=0;
		this.incorrect=0;
		this.unanswered=0;
		this.curQuestionInitialize();
	},

	displayStartPg: function(){
		$('#js-question').html('Select to a Category');
		$('#js-answer').empty();
		$('#js-answer').append('<button class=\'btn js-gmbtn\' value=\'cat1\'>Entertainment'+'</button>');		
		$('#js-answer').append('<button class=\'btn js-gmbtn\' value=\'cat2\'>Technology'+'</button>');		
		$('#js-answer').on('click', '.js-gmbtn', function(){
			curCat=play.gameQuestions[$(this).attr('value')];
			play.gameInitialize();
		});
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
			curQuestion=curCat[questions.pop()];
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
	play.displayStartPg();
	


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
		play.displayStartPg();
	});


});