var play, //variable to store game object
counterInterval, //variable to store setInterval 
ansTimeout, //variable to store setTimeout
holdThis; /*variable to store this reference for each game round to 
avoid confusion of this in conjunction with jQuery and setInterval/Timeouts*/

//Define the game object
var triviagame = {
	correct: 0,
	incorrect: 0,
	unanswered: 0,
	counter: 0,
	isTimedOut: null,
	curCat: null,
	questions: null,
	curQuestion: null,
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
		cat3: {
			EQ1: {
				question: "Dquestion 1",
				options: ["D1-opt1", "D1-opt2", "D1-opt3", "D1-opt4"],
				answer: "D1-opt1"
			},
			EQ2: {
				question: "Dquestion 2",
				options: ["D2-opt1", "D2-opt2", "D2-opt3", "D2-opt4"],
				answer: "D2-opt1"
			},
			EQ3: {
				question: "question 3",
				options: ["D3-opt1", "D3-opt2", "D3-opt3", "D3-opt4"],
				answer: "D3-opt1"
			} 
		}
	},
	
	//To display the start page with Category buttons
	displayStartPg: function(){
		holdThis=this;
		holdThis.questions=null;
		$('#js-question').html(' ');
		$('#js-timetxt').html('Select a Category');
		$('#js-answer').empty();
		$('#js-answer').append('<button class=\'btn js-gmbtn\' value=\'cat1\'>Entertainment'+'</button>');		
		$('#js-answer').append('<button class=\'btn js-gmbtn\' value=\'cat2\'>Technology'+'</button>');	
		$('#js-answer').append('<button class=\'btn js-gmbtn\' value=\'cat3\'>Sports'+'</button>');		
		$('#js-answer').on('click', '.js-gmbtn', function(){
			holdThis.curCat=holdThis.gameQuestions[$(this).attr('value')];
			holdThis.gameInitialize();
		});

	},

	//Initialize variables for each round of the game
	gameInitialize: function(){
		$('#js-answer').off('click', '.js-gmbtn');
		holdThis.counter=0;
		holdThis.questions=Object.keys(holdThis.curCat);
		holdThis.curQuestion=null;
		holdThis.curQuestion= holdThis.curCat[holdThis.questions.pop()];
		holdThis.correct=0;
		holdThis.incorrect=0;
		holdThis.unanswered=0;
		holdThis.curQuestionInitialize();
		$('#js-timetxt').html('Time Remaining: <span id="js-countdn"></span>');

	},

	/*This is to initialize and display the Question 
	and options*/
	curQuestionInitialize: function(){
		clearTimeout(ansTimeout);
		counterInterval=null;
		ansTimeout=null;
		holdThis.counter=15; 
		holdThis.isTimedOut=false;
		$('#js-countdn').html(holdThis.counter);
		counterInterval=setInterval(function()
			{
				holdThis.startCounter();
			}, 1000);
		$('#js-question').html(holdThis.curQuestion.question);
		$('#js-answer').empty();
		for (i=0; i<4; i++){
			$('#js-answer').append('<p class=\'js-options\' value='+i+'>'+holdThis.curQuestion.options[i]+'</p>');			
		}
	},
	
	/*To display the answer page after each question 
	is answered or timesout*/
	calcNdisplay: function(){
		clearInterval(counterInterval);
		if (holdThis.isTimedOut){
			holdThis.unanswered++;
			$('#js-answer').empty();
			$('#js-answer').append('<p class=\'anstxt\'>You ran out of time, it is '+holdThis.curQuestion.answer+'</p>');
			$('#js-answer').append('<img class=\'ansimg\'src=\'assets/images/wait.jpg\'>');
		}
		else if (holdThis.userSelection===holdThis.curQuestion.answer){
			holdThis.correct++;
			$('#js-answer').empty();
			$('#js-answer').append('<p class=\'anstxt\'>You are correct, it is '+holdThis.curQuestion.answer+'</p>');
			$('#js-answer').append('<img class=\'ansimg\'src=\'assets/images/win.gif\'>');
		}
		else{
			holdThis.incorrect++;
			$('#js-answer').empty();
			$('#js-answer').append('<p class=\'anstxt\'>You are incorrect it is '+holdThis.curQuestion.answer+'</p>');
			$('#js-answer').append('<img class=\'ansimg\'src=\'assets/images/lose.jpg\'>');
		}
		holdThis.changeQuestion();
		
	},

	/*To set timeout on the answers page and to call 
	the function to display the next question*/

	changeQuestion: function(){
		if(holdThis.questions.length>0)
		{
			holdThis.curQuestion=holdThis.curCat[holdThis.questions.pop()];
			ansTimeout=setTimeout(function(){
				holdThis.curQuestionInitialize();
			}, 5000);
		}
		else{
			ansTimeout=setTimeout(function(){
				holdThis.gameOver();
			}, 5000);
		}
	},


	//To display the final score screen after the end of a round
	gameOver: function(){
		$('#js-timetxt').html('Thanks for Playing!!');
		$('#js-question').html('Your scores are:');
		$('#js-answer').empty();
		$('#js-answer').append('<p class=\'anstxt\'>Correct Answers: '+holdThis.correct+'</p>');		
		$('#js-answer').append('<p class=\'anstxt\'>Incorrect Answers: '+holdThis.incorrect+'</p>');		
		$('#js-answer').append('<p class=\'anstxt\'>Unanswered Answers: '+holdThis.unanswered+'</p>');		
		$('#js-answer').append('<button class=\'btn js-agnbtn\'>Play Again'+'</button>');	
		holdThis=null;	
	},


	//to decrease the counter and update time display
	startCounter: function (){
		if(holdThis.counter<10){
			$('#js-countdn').html('0'+holdThis.counter);
		}
		else{
			$('#js-countdn').html(holdThis.counter);
		}
		holdThis.counter--;
		
		if(holdThis.counter<=0){
			holdThis.isTimedOut=true;
			holdThis.calcNdisplay();
		}
	},

};


$(document).ready(function(){

	play=triviagame;
	play.displayStartPg();

	//Get the user selection and call function to verify the results
	$('#js-answer').on('click', '.js-options', function(){
		play.userSelection=play.curQuestion.options[$(this).attr('value')];
		play.calcNdisplay();
	});

	//If user clicks play again load the start page again
	$('#js-answer').on('click', '.js-agnbtn', function(){
		play.displayStartPg();
	});


});