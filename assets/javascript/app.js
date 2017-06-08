var play, //variable to store game object
counterInterval, //variable to store setInterval 
ansTimeout; //variable to store setTimeout


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
		this.questions=null;
		$('#js-timetxt').html('');
		$('#js-question').html('');
		$('#js-answer').empty();
		$('#js-answer').append('<button class=\'btn js-gmbtn center-block catbtn\' value=\'cat1\'>Entertainment'+'</button>');		
		$('#js-answer').append('<button class=\'btn js-gmbtn center-block catbtn\' value=\'cat2\'>Technology'+'</button>');	
		$('#js-answer').append('<button class=\'btn js-gmbtn center-block catbtn\' value=\'cat3\'>Sports'+'</button>');		
		$('#js-answer').on('click', '.js-gmbtn', function(e){
			this.curCat=this.gameQuestions[e.target.value];
			this.gameInitialize();
		}.bind(this));

	},

	//Initialize variables for each round of the game
	gameInitialize: function(){
		$('#js-answer').off('click', '.js-gmbtn');
		this.counter=0;
		this.questions=Object.keys(this.curCat);
		this.curQuestion=null;
		this.curQuestion= this.curCat[this.questions.pop()];
		this.correct=0;
		this.incorrect=0;
		this.unanswered=0;
		this.curQuestionInitialize();
		$('#js-timetxt').html('Time Remaining: <span id="js-countdn">15</span>');
	},

	/*This is to initialize and display the Question 
	and options*/
	curQuestionInitialize: function(){
		clearTimeout(ansTimeout);
		counterInterval=null;
		ansTimeout=null;
		this.counter=15; 
		this.isTimedOut=false;
		$('#js-countdn').html(this.counter);
		counterInterval=setInterval(function()
			{
				this.startCounter();
			}.bind(this), 1000);
		$('#js-question').html(this.curQuestion.question);
		$('#js-answer').empty();
		for (i=0; i<4; i++){
			$('#js-answer').append('<p class=\'js-options optrow\' value='+i+'>'+this.curQuestion.options[i]+'</p>');			
		}
	},
	
	/*To display the answer page after each question 
	is answered or timesout*/
	calcNdisplay: function(){
		clearInterval(counterInterval);
		if (this.isTimedOut){
			this.unanswered++;
			$('#js-answer').empty();
			$('#js-answer').append('<p class=\'anstxt text-center\'>You ran out of time, it is '+this.curQuestion.answer+'</p>');
			$('#js-answer').append('<img class=\'ansimg center-block\'src=\'assets/images/wait.jpg\'>');
		}
		else if (this.userSelection===this.curQuestion.answer){
			this.correct++;
			$('#js-answer').empty();
			$('#js-answer').append('<p class=\'anstxt text-center\'>You are correct, it is '+this.curQuestion.answer+'</p>');
			$('#js-answer').append('<img class=\'ansimg center-block\'src=\'assets/images/win.gif\'>');
		}
		else{
			this.incorrect++;
			$('#js-answer').empty();
			$('#js-answer').append('<p class=\'anstxt text-center\'>You are incorrect it is '+this.curQuestion.answer+'</p>');
			$('#js-answer').append('<img class=\'ansimg center-block\'src=\'assets/images/lose.jpg\'>');
		}
		this.changeQuestion();
		
	},

	/*To set timeout on the answers page and to call 
	the function to display the next question*/

	changeQuestion: function(){
		if(this.questions.length>0)
		{
			this.curQuestion=this.curCat[this.questions.pop()];
			ansTimeout=setTimeout(function(){
				this.curQuestionInitialize();
			}.bind(this), 5000);
		}
		else{
			ansTimeout=setTimeout(function(){
				this.gameOver();
			}.bind(this), 5000);
		}
	},


	//To display the final score screen after the end of a round
	gameOver: function(){
		$('#js-timetxt').html('Thanks for Playing!!');
		$('#js-question').html('Your scores are:');
		$('#js-answer').empty();
		$('#js-answer').append('<p class=\'anstxt text-center\'>Correct Answers: '+this.correct+'</p>');		
		$('#js-answer').append('<p class=\'anstxt text-center\'>Incorrect Answers: '+this.incorrect+'</p>');		
		$('#js-answer').append('<p class=\'anstxt text-center\'>Unanswered Answers: '+this.unanswered+'</p>');		
		$('#js-answer').append('<button class=\'btn js-agnbtn center-block catbtn\'>Play Again'+'</button>');	
	},


	//to decrease the counter and update time display
	startCounter: function (){
		if(this.counter<10){
			$('#js-countdn').html('0'+this.counter);
		}
		else{
			$('#js-countdn').html(this.counter);
		}
		this.counter--;
		
		if(this.counter<=0){
			this.isTimedOut=true;
			this.calcNdisplay();
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