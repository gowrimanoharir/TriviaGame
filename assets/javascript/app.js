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
			C1Q1: {
				question: "Which whale has a tusk that can grow upto 10ft?",
				options: ["Beluga", "Narwhal", "Orca", "Sperm"],
				answer: "Narwhal",
				description: "Narwhal is a medium-sized whale that lives-year round in Arctic waters, only the male possess the Tusk" 
			},
			C1Q2: {
				question: "Which of the below is not a marsupial aka mammal without a pouch?",
				options: ["Kangaroo", "Possum", "Koala", "Lemur"],
				answer: "Lemur",
				description: "Lemurs are native to Madagascar popularized by the character of King Julien in the namesake animated movie"
			},
			C1Q3: {
				question: "How many approximate kills does a lion in the wild make?",
				options: ["Twenty", "Seventy", "Fifty Two", "Forty"],
				answer: "Twenty",
				description: "On average, a single lion will kill 15-20 large herbivores a year. Lions hunt in a group mostly in the evening or early morning"
			},
			C1Q4: {
				question: "Snakes are...",
				options: ["Herbivore", "Omnivore", "Carnivore", "Cannibal"],
				answer: "Carnivore",
				description: "all varieties of snakes are strictly carnivores, meaning that they feed only on other animals such as rodents, lizards, and even the eggs of other reptiles"
			},
			C1Q5: {
				question: "Group of Owls are called?",
				options: ["Congress", "Senate", "Parliament", "House"],
				answer: "Parliament",
				description: "They are called a “parliament” as they have long been considered to be of a wise disposition"
			},
			C1Q6: {
				question: "Which is the first domesticated animal by Humans?",
				options: ["Goats", "Dogs", "Cows", "Horses"],
				answer: "Goats",
				description: "Goats were probably the first animals to be domesticated, followed closely by sheep about 10,000 years ago"
			},
			C1Q7: {
				question: "Which of these is a real animal?",
				options: ["Himalayan Yeti", "Chupacabra", "Tasmanian Devil", "Sphynx"],
				answer: "Tasmanian Devil",
				description: "Tasmanian devil is a carnivorous marsupial, once native to mainland Australia and now found in the wild only on the island state of Tasmania"
			},
			C1Q8: {
				question: "Which is the Fastest dog in the World?",
				options: ["Doberman", "Greyhound", "Jack Russel Terrier", "Dalmation"],
				answer: "Greyhound",
				description: "Greyhound's can run upto 43MPH and primarily known for their racing background"
			},
			C1Q9: {
				question: "Which of the below is not an animal?",
				options: ["Sea Pigs", "Sea Cows", "Sea Lions", "Sea Monkeys"],
				answer: "Sea Monkeys",
				description: "Sea Monkeys is a brand name for brine shrimp pet kit"
			},
			C1Q10: {
				question: "Tweety and Big bird from Sesame street is based on which actual bird?",
				options: ["Conure", "Cockatiel", "Canary", "Condor"],
				answer: "Canary",
				description: "Canary is a small songbird in the finch family originating from Macronesian Islands"
			}	

		}, 
		cat2: {
			c2Q1: {
				question: "Who is the worlds first mobile phone manufacturer?",
				options: ["Nokia", "Motorola", "Blackberry", "IBM"],
				answer: "Motorola",
				description: ""
			},
			c2Q2: {
				question: "What programming language is Linux written in?",
				options: ["Perl", "C", "Pascal", "Algol"],
				answer: "C",
				description: ""
			},		
			c2Q3: {
				question: "Why does Twitter has 140 char limit?",
				options: ["Able to view easily in samll screen", "GET method char limit", "Just like that", "To match the SMS"],
				answer: "To match the SMS",
				description: ""
			},
			c2Q4: {
				question: "Who released worlds first Smartphone?",
				options: ["Blackberry", "IBM", "Apple", "Nokia"],
				answer: "IBM",
				description: ""
			},
			c2Q5: {
				question: "What was Jeff Bezos original name idea for Amazon website?",
				options: ["Shazam", "Nile", "Cadabra", "Volga"],
				answer: "Cadabra",
				description: ""
			},
			c2Q6: {
				question: "What did Nintendo orignally manufacture?",
				options: ["Post Cards", "Playing Cards", "Business Cards", "Greeting Cards"],
				answer: "Playing Cards",
				description: ""
			},
			c2Q7: {
				question: "Which bird is mascot for Linux?",
				options: ["Kiwi", "Dove", "Penguin", "Finch"],
				answer: "Penguin",
				description: ""
			},
			c2Q8: {
				question: "1024 Gigabytes in 1 Terabyte, what is 1024 Terabytes?",
				options: ["Xenobyte", "Petabyte", "Jedabyte", "Qesobyte"],
				answer: "Petabyte",
				description: ""
			},	
			c2Q9: {
				question: "First web browser is....",
				options: ["Nexus", "Internet Explorer", "Netscape", "Mosaic"],
				answer: "Nexus",
				description: ""
			},
			c2Q10: {
				question: "World's first programmer is...",
				options: ["Charles Babbage", "Ada Lovelace", "Michael Faraday", "Grace Hopper"],
				answer: "Ada Lovelace",
				description: ""
			}																					

		}, 
		cat3: {
			c3Q1: {
				question: "How many hours is the runtime for longest movie "The cure for Insomnia"",
				options: ["33 Hrs", "12 Hrs", "57 Hrs", "85 Hrs"],
				answer: "85 Hrs",
				description: ""
			},
			c3Q2: {
				question: "Which is the longest running Animated series in TV?",
				options: ["Futurama", "South Park", "The Simpsons", "Family Guy"],
				answer: "The Simpsons",
				description: ""
			},
			c3Q3: {
				question: "What is the full name of Minnie Mouse?",
				options: ["Minalla", "Minerva", "Minette", "Mineko"],
				answer: "Minerva",
				description: ""
			},
			c3Q4: {
				question: "Person who voice for Yoda in Star Wars also voiced for which Muppet?",
				options: ["Kermit the Frog", "Camilla the Chicken", "Miss Piggy", "Fozzi Bear"],
				answer: "Miss Piggy",
				description: ""
			},
			c3Q5: {
				question: "Which of the below movie happen in a fictional country named Sokovia?",
				options: ["Avengers - Age of Ultron", "Guardians of the Galaxy", "Thor Dark World", "Captain America - The Winter Soldier"],
				answer: "Avengers - Age of Ultron",
				description: ""
			},
			c3Q6: {
				question: "Which is the first A Capella group to win Grammy?",
				options: ["Rockapella", " The Filharmonic", "Pentatonix", "Straight No Chasers"],
				answer: "Pentatonix",
				description: ""
			},
			c3Q7: {
				question: "",
				options: [],
				answer: "",
				description: ""
			},												
			c3Q8: {
				question: "",
				options: [],
				answer: "",
				description: ""
			},
			c3Q9: {
				question: "",
				options: [],
				answer: "",
				description: ""
			},
			c3Q10: {
				question: "",
				options: [],
				answer: "",
				description: ""
			},				
		},
		cat4: {
			EQ1: {
				question: "Fquestion 1",
				options: ["D1-opt1", "D1-opt2", "D1-opt3", "D1-opt4"],
				answer: "D1-opt1"
			},
			EQ2: {
				question: "Equestion 2",
				options: ["D2-opt1", "D2-opt2", "D2-opt3", "D2-opt4"],
				answer: "D2-opt1"
			},
			EQ3: {
				question: "Fquestion 3",
				options: ["D3-opt1", "D3-opt2", "D3-opt3", "D3-opt4"],
				answer: "D3-opt1"
			} 
		}
	},
	
	//To display the start page with Category buttons
	displayStartPg: function(){
		this.questions=null;
		$('#js-timetxt').empty();
		$('#js-question').empty();
		$('#js-answer').empty();
		$('#js-answer').append('<button class=\'btn js-gmbtn center-block catbtn\' value=\'cat1\'>Animal World'+'</button>');		
		$('#js-answer').append('<button class=\'btn js-gmbtn center-block catbtn\' value=\'cat2\'>Technology'+'</button>');	
		$('#js-answer').append('<button class=\'btn js-gmbtn center-block catbtn\' value=\'cat3\'>Sports'+'</button>');		
		$('#js-answer').append('<button class=\'btn js-gmbtn center-block catbtn\' value=\'cat4\'>Entertainment'+'</button>');	
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
		$('#js-timetxt').html('Time Remaining: <span id="js-countdn" class="countdn">30</span>');
		
	},

	/*This is to initialize and display the Question 
	and options*/
	curQuestionInitialize: function(){
		clearTimeout(ansTimeout);
		counterInterval=null;
		ansTimeout=null;
		this.counter=30; 
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
			$('#js-answer').append('<p class=\'anstxt unanswered text-center\'>Ran out of time, it is <b>'+this.curQuestion.answer+'</b></p>');
			$('#js-answer').append('<p class=\'text-center ansbk\'>'+this.curQuestion.description+'</p>');
		}
		else if (this.userSelection===this.curQuestion.answer){
			this.correct++;
			$('#js-answer').empty();
			$('#js-answer').append('<p class=\'anstxt correct text-center\'>YES!!! it is <b>'+this.curQuestion.answer+'</b></p>');
			$('#js-answer').append('<p class=\'text-center ansbk\'>'+this.curQuestion.description+'</p>');
		}
		else{
			this.incorrect++;
			$('#js-answer').empty();
			$('#js-answer').append('<p class=\'anstxt incorrect text-center\'>Wrong, it is <b>'+this.curQuestion.answer+'</b></p>');
			$('#js-answer').append('<p class=\'text-center ansbk\'>'+this.curQuestion.description+'</p>');
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
		$('#js-timetxt').html('');
		$('#js-question').html('');
		$('#js-answer').empty();
		$('#js-answer').append('<p class=\'anstxt text-center\'>Correct Answers: '+this.correct+'</p>');		
		$('#js-answer').append('<p class=\'anstxt text-center\'>Incorrect Answers: '+this.incorrect+'</p>');		
		$('#js-answer').append('<p class=\'anstxt text-center\'>Unanswered: '+this.unanswered+'</p>');		
		$('#js-answer').append('<button class=\'btn js-agnbtn center-block agnbtn catbtn\'>Play Again'+'</button>');	
	},


	//to decrease the counter and update time display
	startCounter: function (){
		this.counter--;
		if(this.counter<0){
			this.isTimedOut=true;
			this.calcNdisplay();
			return;
		}

		if(this.counter<10){
			$('#js-countdn').html('0'+this.counter);
		}
		else{
			$('#js-countdn').html(this.counter);
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