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
	//Object to store categories of trivia questions & answers
	gameQuestions: 
	{	cat1: {
			C1Q1: {
				question: "Which whale has a tusk that can grow upto 10ft?",
				options: ["Beluga", "Narwhal", "Orca", "Sperm"],
				answer: "Narwhal",
				description: "Narwhal is a medium-sized whale that lives year-round in Arctic waters, only the male possess the Tusk" 
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
				description: "All varieties of snakes are strictly carnivores, meaning that they feed only on other animals such as rodents, reptiles, etc"
			},
			C1Q5: {
				question: "Group of Owls are called?",
				options: ["Congress", "Senate", "Parliament", "House"],
				answer: "Parliament",
				description: "They are called a “Parliament” as they have long been considered to be of wise disposition"
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
				description: "Greyhounds can run upto 43MPH and primarily known for their racing background"
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
				description: "The first mobile phone was demonstrated by Motorola in 1973, using a handset weighing 4.4 lbs (2 kg). In 1983, the DynaTAC 8000x was the first commercially available mobile phone."
			},
			c2Q2: {
				question: "What programming language is Linux kernel written in?",
				options: ["Perl", "C", "Pascal", "Algol"],
				answer: "C",
				description: "The Linux kernel is written in C programming language, together with short sections of code written in the assembly language"
			},		
			c2Q3: {
				question: "Why does Twitter has 140 char limit?",
				options: ["To fit in small screens", "GET method char limit", "Duh! its micro blogging", "To match the SMS length"],
				answer: "To match the SMS length",
			description: "Twitter was designed in 2006 to be used via wireless carriers’ text-messaging services which are limited to 160 characters. 20 chars was left for username and 140 for the message"
			},
			c2Q4: {
				question: "Who released worlds first Smartphone?",
				options: ["Blackberry", "IBM", "Apple", "Nokia"],
				answer: "IBM",
				description: "Simon released in 1994 by IBM was the first device that could be referred to as a \"smartphone\", although it was not called that in 1994"
			},
			c2Q5: {
				question: "What was Jeff Bezos original name idea for Amazon website?",
				options: ["Shazam", "Nile", "Cadabra", "Volga"],
				answer: "Cadabra",
				description: "Amazon was very nearly called \"Cadabra,\" as in \"abracadabra\". Jeff Bezos renamed it when his lawyer misheard the word as \"cadaver\" "
			},
			c2Q6: {
				question: "What did Nintendo orignally manufacture?",
				options: ["Post Cards", "Playing Cards", "Business Cards", "Greeting Cards"],
				answer: "Playing Cards",
				description: "Nintendo was known as a Japanese toy and playing card manufacturer, in 1983 they released their first console called Famicom"
			},
			c2Q7: {
				question: "Which bird is mascot for Linux?",
				options: ["Kiwi", "Dove", "Penguin", "Finch"],
				answer: "Penguin",
				description: "The concept of the Linux mascot being a penguin came from Linus Torvalds, the creator of Linux. Tux was created by Larry Ewing in 1996"
			},
			c2Q8: {
				question: "1024 Gigabytes is 1 Terabyte, what is 1024 Terabytes?",
				options: ["Xenobyte", "Petabyte", "Jedabyte", "Qesobyte"],
				answer: "Petabyte",
				description: "The prefix peta indicates the fifth power of 1000 (i.e) 10<sup><small>15</small></sup>. The unit symbol for the petabyte is PB"
			},	
			c2Q9: {
				question: "First web browser is....",
				options: ["Nexus", "Internet Explorer", "Netscape", "Mosaic"],
				answer: "Nexus",
				description: "The first web browser was invented in 1990 by Sir Tim Berners-Lee. His browser was called WorldWideWeb and later renamed to Nexus"
			},
			c2Q10: {
				question: "World's first programmer is...",
				options: ["Charles Babbage", "Ada Lovelace", "Michael Faraday", "Grace Hopper"],
				answer: "Ada Lovelace",
				description: "Ada Lovelace was the first to recognize that the machine had applications beyond calculations, and created the first algorithm"
			}																					
		}, 
		cat3: {
			c3Q1: {
				question: "Which actor has the most nominations for Oscars?",
				options: ["Laurence Olivier", "Jack Nicholson", "Paul Newman", "Spencer Tracy"],
				answer: "Jack Nicholson",
				description: "He has 12 nominations with 3 wins"
			},
			c3Q2: {
				question: "Which is the longest running Animated series in TV?",
				options: ["Futurama", "South Park", "The Simpsons", "Family Guy"],
				answer: "The Simpsons",
				description: "The Simpsons debuted in 1989 in FOX network and is still running"
			},
			c3Q3: {
				question: "What was the name of Nirvana's first album released in 1989?",
				options: ["Bleach", "In Utero", "Nevermind", "Unplugged"],
				answer: "Bleach",
				description: "Since its release in 1989, Bleach has sold more than 1,900,000 copies in the United States alone"				
			},
			c3Q4: {
				question: "Person who voice for Yoda in Star Wars also voiced for which Muppet?",
				options: ["Kermit the Frog", "Camilla the Chicken", "Miss Piggy", "Scooter"],
				answer: "Miss Piggy",
				description: "Frank Oz is a puppeteer, who has also voiced for  Fozzie Bear, Animal, and Sam Eagle in The Muppets"
			},
			c3Q5: {
				question: "Which of the below movie has a battle in the fictional country named Sokovia?",
				options: ["Avengers Age of Ultron", "Guardians of the Galaxy", "Thor Dark World", "Captain America Civil War"],
				answer: "Avengers - Age of Ultron",
				description: "Sokovia has a secret underground compound established by HYDRA and Avengers battle Ultron to prevent the place from becoming a Meteor"
			},
			c3Q6: {
				question: "Which is the first A Capella group to win Grammy?",
				options: ["Rockapella", " The Filharmonic", "Pentatonix", "Straight No Chasers"],
				answer: "Pentatonix",
				description: "Pentatonix (PTX) is a 5 member A Capella group from Arlington, TX"
			},
			c3Q7: {
				question: "What is the last name of Bruce Wayne/Batman's butler Alfred?",
				options: ["Nichols", "Moneypenny", "Pound", "Pennyworth"],
				answer: "Pennyworth",
				description: "Nothing to see here"
			},												
			c3Q8: {
				question: "Which was the first animated film to be nominated for an Oscar?",
				options: ["The Lion King", "Beauty and the Beast", "The Little Mermaid", "Toy Story"],
				answer: "Beauty and the Beast",
				description: "Animated films can be nominated for other categories, but have rarely done; Beauty and the Beast (1991) was the first animated film ever nominated for Best Picture."
			},
			c3Q9: {
				question: "What is the full name of Minnie Mouse?",
				options: ["Minalla", "Minerva", "Minette", "Mineko"],
				answer: "Minerva",
				description: "Though she was first drawn in 1928, she was given her full name only in 1942"
			},
			c3Q10: {
				question: "What song by Michael Jackson contains the lyrics \'Annie are you OK\'",
				options: ["Black or White", "Smooth Criminal", "Thriller", "Beat It"],
				answer: "Smooth Criminal",
				description: "The lyrics is about a woman named Annie, who has been violently attacked in her apartment by a \"smooth\" assailant"
			}				
		},
		cat4: {
			c4Q1: {
				question: "Who were the champions in the first season of NHL?",
				options: ["Toronto Arenas", "Montreal Canadiens", "New York Rangers", "Chicago Black Hawks"],
				answer: "Toronto Arenas",
				description: "Toronto Arenas won the championship against Vancouver Millionaires in 1918"
			},
			c4Q2: {
				question: "What is the world's second most popular winter sport?",
				options: ["Ice Hockey", "Luge", "Bandy", "Figure Skating"],
				answer: "Bandy",
				description: "Bandy is considered a form of hockey and has a common background with association football, ice hockey and field hockey"
			},
			c4Q3: {
				question: "How long is a standard Soccer game played for?",
				options: ["60 mins", "45 mins", "90 mins", "120 mins"],
				answer: "90 mins",
				description: "Soccer game consists of two periods of 45 minutes each, known as halves with usually a 15-minute half-time break"
			},
			c4Q4: {
				question: "In Soccer the phrase \'hand of god\' gained popularity due to which player?",
				options: ["D.Maradona", "L.Messi", "Pele", "T.Miller"],
				answer: "D.Maradona",
				description: "\"Hand of God goal\", was scored by Maradona using his hand in 1986 FIFA world cup between Argentina & England"
			},
			c4Q5: {
				question: "Which team has won the most Super Bowl championships?",
				options: ["Patriots", "Packers", "Steelers", "Giants"],
				answer: "Steelers",
				description: "Pittsburgh Steelers have won the most Super Bowls with six championships"
			},	
			c4Q6: {
				question: "Which team is the one of the oldest franchise in NFL?",
				options: ["Jets", "Lions", "Packers", "Cardinals"],
				answer: "Cardinals",
				description: "Only two teams currently in the NFL, the Decatur Staleys (now the Chicago Bears) and the Chicago Cardinals (now the Arizona Cardinals), are founding members"
			},
			c4Q7: {
				question: "Who was the runners up in the FIFA Women's world cup finals in 2015?",
				options: ["USA", "Japan", "Germany", "Norway"],
				answer: "Japan",
				description: "Nothing to see here"
			},
			c4Q8: {
				question: "Which country has the highest wins in FIFA Women's world cup?",
				options: ["USA", "Japan", "Germany", "Norway"],
				answer: "USA",
				description: "Nothing to see here"
			},
			c4Q9: {
				question: "Birdie is the phrase used in which sports?",
				options: ["Badminton", "Ping Pong", "Croquet", "Cricket"],
				answer: "Badminton",
				description: "A birdie (also called a bird or shuttlecock) is a high-drag projectile used in the sport of badminton"
			},	
			c4Q10: {
				question: "Who did Cubs win against the world series last before the 2016 season?",
				options: ["White Sox", "Red Sox", "Giants", "Tigers"],
				answer: "Tigers",
				description: "Prior to 2016 win, the Cubs won the world series in 1907 & 1908 both times against Detroit Tigers"
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
		$('#js-answer').append('<button class=\'btn js-gmbtn center-block catbtn\' value=\'cat3\'>Entertainment'+'</button>');		
		$('#js-answer').append('<button class=\'btn js-gmbtn center-block catbtn\' value=\'cat4\'>Sports'+'</button>');	
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
		$('#js-timetxt').html('Time Remaining: <span id="js-countdn" class="countdn">20</span>');
		
	},

	/*Initialize and display the Question and options*/
	curQuestionInitialize: function(){
		clearTimeout(ansTimeout);
		counterInterval=null;
		ansTimeout=null;
		this.counter=20; 
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
	is answered or timedout*/
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
			}.bind(this), 6000);
		}
		else{
			ansTimeout=setTimeout(function(){
				this.gameOver();
			}.bind(this), 6000);
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