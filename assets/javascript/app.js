var play, questions, curQuestion, curCat, counter, 
counterInterval, ansTimeout, holdThis;


var triviagame = {
	//counter: 0, 
	//counterInterval: null,
	correct: 0,
	incorrect: 0,
	unanswered: 0,
	isTimedOut: null,
	userSelection: null,
	//Object to store categories of trivia questions
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
	
	//Initialize variables for each round of the game
	gameInitialize: function(){
		console.log('in gm initialize');
		counterInterval=null;
		ansTimeout=null;
		counter=0;
		questions=Object.keys(curCat);
		curQuestion=null;
		curQuestion= curCat[questions.pop()];
		this.correct=0;
		this.incorrect=0;
		this.unanswered=0;
		this.curQuestionInitialize();
	},

	//To display the start page with Category buttons
	displayStartPg: function(){
		holdThis=this;
		questions=null;
		$('#js-question').html('Select a Category');
		$('#js-answer').empty();
		$('#js-answer').append('<button class=\'btn js-gmbtn\' value=\'cat1\'>Entertainment'+'</button>');		
		$('#js-answer').append('<button class=\'btn js-gmbtn\' value=\'cat2\'>Technology'+'</button>');		
		$('#js-answer').on('click', '.js-gmbtn', function(){
			curCat=holdThis.gameQuestions[$(this).attr('value')];
			holdThis.gameInitialize();
		});
	},

	/*This is to initialize and display the Question 
	and options*/
	curQuestionInitialize: function(){
		console.log('in curquest initialize');
		clearTimeout(ansTimeout);
		clearInterval(counterInterval);
		counterInterval=null;
		ansTimeout=null;
		counter=30; 
		this.isTimedOut=false;
		counterInterval=setInterval(holdThis.startCounter, 1000);
		$('#js-question').html(curQuestion.question);
		$('#js-answer').empty();
		for (i=0; i<4; i++){
			$('#js-answer').append('<p class=\'js-options\' value='+i+'>'+curQuestion.options[i]+'</p>');			
		}
	},
	
	/*To display the answer page after each question 
	is answered or timesout*/
	calcNdisplay: function(){
		console.log('in calc n display');
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

	/*To set timeout on the answers page and to call 
	the function to display the next question*/

	changeQuestion: function(){
		if(questions.length>0)
		{
			console.log('in chng question next que');
			curQuestion=curCat[questions.pop()];
			ansTimeout=setTimeout(function(){
				console.log('i am in');
				holdThis.curQuestionInitialize();
			}, 5000);
		}
		else{
			console.log('in chng question gameover');
			ansTimeout=setTimeout(function(){
				holdThis.gameOver();
			}, 5000);
		}
	},


	//To display the final score screen after the end of a round
	gameOver: function(){
		console.log('in gm over');
		clearInterval(counterInterval);
		clearTimeout(ansTimeout);
		$('#js-question').html('Thanks for Playing!! Your scores are:');
		$('#js-answer').empty();
		$('#js-answer').append('<p class=\'anstxt\'>Correct Answers: '+this.correct+'</p>');		
		$('#js-answer').append('<p class=\'anstxt\'>Incorrect Answers: '+this.incorrect+'</p>');		
		$('#js-answer').append('<p class=\'anstxt\'>Unanswered Answers: '+this.unanswered+'</p>');		
		$('#js-answer').append('<button class=\'btn js-agnbtn\'>Play Again'+'</button>');		
	},


	//to decrease the counter and update time display
	startCounter: function (){
		console.log('in startcounter');
		$('#js-countdn').html(counter);
		counter--;
		console.log((counter<0))
		if(counter<0){
			holdThis.stopCounter();
		}
	},

	//to stop the counter once user answers or timed out
	stopCounter: function (){
		clearInterval(counterInterval);
		console.log('cleared interval');
		if (counter<=0)
		{
			holdThis.isTimedOut=true;
			console.log('timeout'+holdThis.isTimedOut);
		}
		holdThis.calcNdisplay();
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
		//play.calcNdisplay();
		i++;
	});

	$('#js-answer').on('click', '.js-agnbtn', function(){
		play=triviagame;
		play.displayStartPg();
	});


});