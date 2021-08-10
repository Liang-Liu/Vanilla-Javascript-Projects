const questions = [
	{
		question: "What is the speed of sound?",
		a: "260mph",
		b: "560mph",
		c: "760mph",
		correctAnswer: "c",
	},
	{
		question: "	How many letters in the Greek alphabet? ",
		a: "16",
		b: "24",
		c: "28",
		correctAnswer: "b",
	},
	{
		question: "Where does Edam cheese come from?",
		a: "France",
		b: "Netherlands",
		c: "Italy",
		correctAnswer: "b",
	},
	{
		question: "	A Saluki is a type of?",
		a: "Cat",
		b: "Rabbit",
		c: "Dog",
		correctAnswer: "c",
	},
	{
		question: "The X-Box games console is made by which company?",
		a: "Microsoft",
		b: "Nintendo",
		c: "Sony",
		correctAnswer: "a",
	},
];

let questionCounter = 0;
let score = 0;
let selected = undefined;

const questionEl = document.querySelector("h1");
const label_aEl = document.getElementById("label_a");
const label_bEl = document.getElementById("label_b");
const label_cEl = document.getElementById("label_c");
const buttonEl = document.getElementById("submitBtn");

const allOptionsEl = document.getElementById("allOptions");

const answerEls = document.querySelectorAll('input[name="answer"]');

document.getElementById("submitBtn").addEventListener("click", nestQuestion);

function loadQuestions() {
	questionEl.innerHTML = questions[questionCounter].question;
	label_aEl.innerHTML = questions[questionCounter].a;
	label_bEl.innerHTML = questions[questionCounter].b;
	label_cEl.innerHTML = questions[questionCounter].c;
}

function checkAnswer() {
	const answerElsArr = Array.from(answerEls);
	selected = answerElsArr.filter((ele) => ele.checked);
	if (selected.length) {
		if (selected[0].id === questions[questionCounter].correctAnswer) {
			score++;
		}
	} else {
		return;
	}
}

function showResult() {
	questionEl.innerHTML = "Thanks for completing the quiz!";
	allOptionsEl.innerHTML = `<h3>your total score is </h3><br><p> ${score}/${questions.length}</p>`;
	buttonEl.innerHTML = "Restart";
	buttonEl.addEventListener("click", () => {
		location.reload();
	});
}

function nestQuestion() {
	checkAnswer();

	if (!selected.length) {
		return;
	}

	questionCounter++;

	if (questionCounter > questions.length - 1) {
		showResult();
	} else {
		loadQuestions();
	}

	selected[0].checked = false;
}

loadQuestions();
