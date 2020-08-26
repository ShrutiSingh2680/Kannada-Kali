const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer=document.querySelector(".answers-indicator");
const homeBox=document.querySelector(".home-box");
const quizBox=document.querySelector(".question-box");
const resultBox=document.querySelector(".result-box");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers=0;
let attempt=0;

//push questions into availableQuestions array
function setavailableQuestions(){
	const totalQuestion = quiz.length;
	for(let i=0; i<totalQuestion; i++)
	{
		availableQuestions.push(quiz[i])
	}
}

function getNewQuestion(){
	//set question no
	questionNumber.innerHTML = "Question " + (questionCounter + 1) + " of " + quiz.length;
	//set question text
	//get random question
	const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
	currentQuestion = questionIndex;
	questionText.innerHTML = currentQuestion.q;
	
	//get the position of 'question index' from the availableQuestions Array;
	const index1=availableQuestions.indexOf(questionIndex);

	//remove the 'questionIndex' from the array so no repitition of questions
	availableQuestions.splice(index1,1);
	
	//set options
	//get the length of options
	const optionLen=currentQuestion.options.length;
	//push options into available options array
	for(let i=0;i<optionLen;i++){
		availableOptions.push(i)
	}
	optionContainer.innerHTML=''; 
	let animationDelay = 0.1; 

	//create options in html
	for(let i=0 ; i<optionLen ; i++){
		//random option
		const optonIndex=availableOptions[Math.floor(Math.random()*availableOptions.length)];
		//get the option index from availableOptions
		const index2=availableOptions.indexOf(optonIndex);
		//remove option index so option does not repeat
		availableOptions.splice(index2,1); 
		const option=document.createElement("div");
		option.innerHTML=currentQuestion.options[optonIndex];
		option.id=optonIndex;
		option.style.animationDelay=animationDelay+'s';
		animationDelay=animationDelay+0.1 ;
		option.className="option";
		optionContainer.appendChild(option)
		option.setAttribute("onclick","getResult(this)");
	}

	questionCounter++
}

//get the result of current attempt question
function getResult(element){
	const id=parseInt(element.id);
	//get the answer by comparing id of clicked option
	if(id===currentQuestion.answer){
		//set green color to the correct option 
		element.classList.add("correct");
		//add indicator to correct mark
		updateAnswersIndicator("correct");
		correctAnswers++;
	}
	else{
		//set red color to the wrong option
		element.classList.add("wrong");
		//add indicator to wrong mark
		updateAnswersIndicator("wrong");

		//if the answer is wrong show correct option by adding green color to correct option
		const optionLen=optionContainer.children.length;
		for(let i=0;i<optionLen;i++){
			if(parseInt(optionContainer.children[i].id)===currentQuestion.answer){
				optionContainer.children[i].classList.add("correct");
			}
		}
	}
	attempt++;
	unclickableOptions();
}
//make all other options unclickable after one is chosen
function unclickableOptions(){
	const optionLen=optionContainer.children.length;
	for(let i=0;i<optionLen;i++){
		optionContainer.children[i].classList.add("already-answered");
	}
}

function answersIndicator(){
	answersIndicatorContainer.innerHTML='';
	const totalQuestion=quiz.length;
	for(let i=0;i<totalQuestion;i++){
		const indicator=document.createElement("div");
		answersIndicatorContainer.appendChild(indicator); 
	}
}

function updateAnswersIndicator(markType){
	answersIndicatorContainer.children[questionCounter-1].classList.add(markType);
}

function next(){
	if(questionCounter === quiz.length){
		quizOver();
	}
	else{
		getNewQuestion();
	}
}

function quizOver(){
	//hide quiz box
	quizBox.classList.add("hide");
	//show result box
	resultBox.classList.remove("hide");
	quizResult();
}

function quizResult(){
	resultBox.querySelector(".total-question").innerHTML=quiz.length;
	resultBox.querySelector(".total-correct").innerHTML=correctAnswers;
	resultBox.querySelector(".total-wrong").innerHTML=attempt-correctAnswers;
	const percentage=(correctAnswers/quiz.length)*100;
	resultBox.querySelector(".total-percentage").innerHTML=percentage.toFixed(2)+"%";
	resultBox.querySelector(".total-score").innerHTML=correctAnswers+" / "+quiz.length;
}

function resetQuiz(){
	 questionCounter=0;
	 correctAnswers=0;
	 attempt=0;
}

function goToDashboard(){
	//hide result box
	resultBox.classList.add("hide");
	//show home box
	homeBox.classList.remove("hide");
	resetQuiz();
}

//starting point
function startQuiz(){
	//hide home-box
	homeBox.classList.add("hide");
	//show quiz box
	quizBox.classList.remove("hide");


	//first set question in available array
	setavailableQuestions();
	//then call getNewQuestion
	getNewQuestion();
	//to create ans of indicators
	answersIndicator();
}

window.onload=function(){
	homeBox.querySelector(".total-question").innerHTML=quiz.length;
}