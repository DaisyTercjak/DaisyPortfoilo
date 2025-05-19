// Thomas GIA Test Questions
const questions = [
    {
        question: "Which word is the odd one out?",
        options: ["Happy", "Joyful", "Elated", "Melancholy", "Delighted"],
        answer: 3
    },
    {
        question: "Complete the analogy: Book is to reading as fork is to...",
        options: ["Writing", "Eating", "Cooking", "Cutting", "Speaking"],
        answer: 1
    },
    {
        question: "Which word does not belong with the others?",
        options: ["Apple", "Banana", "Orange", "Carrot", "Grape"],
        answer: 3
    },
    {
        question: "What is the opposite of 'Generous'?",
        options: ["Kind", "Stingy", "Friendly", "Happy", "Sad"],
        answer: 1
    },
    {
        question: "If all Bloops are Razzies and all Razzies are Lazzies, are all Bloops definitely Lazzies?",
        options: ["Yes", "No", "Maybe", "Not enough information", "None of the above"],
        answer: 0
    },
    {
        question: "Which word is similar in meaning to 'Benevolent'?",
        options: ["Angry", "Kind", "Small", "Quick", "Loud"],
        answer: 1
    },
    {
        question: "Rearrange the following letters to make a meaningful word: R A C E T",
        options: ["Cater", "React", "Trace", "Crate", "Care"],
        answer: 3
    },
    {
        question: "What is the next number in this sequence: 2, 4, 8, 16, ...?",
        options: ["18", "20", "24", "32", "64"],
        answer: 3
    },
    {
        question: "Which of these is not a synonym for 'Fast'?",
        options: ["Quick", "Rapid", "Speedy", "Slow", "Swift"],
        answer: 3
    },
    {
        question: "If some Winks are Wonks and some Wonks are Wanks, which statement must be true?",
        options: [
            "Some Winks are Wanks",
            "All Winks are Wanks",
            "No Winks are Wanks",
            "Some Wanks are Winks",
            "None of the above must be true"
        ],
        answer: 4
    }
];

let currentQuestion = 0;
let score = 0;
let selectedOption = null;
let timeLeft = 300; // 5 minutes in seconds
let timer;
let testStarted = false;
let userAnswers = [];

// DOM elements
let questionText, optionsContainer, nextBtn, finishBtn, timerElement, resultsContainer, scoreText, timeTaken, progressBar, testContainer, resetBtn;

function showQuestion() {
    const question = questions[currentQuestion];
    questionText.textContent = `${currentQuestion + 1}. ${question.question}`;
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.onclick = () => selectOption(index);
        if (userAnswers[currentQuestion] === index) {
            optionElement.classList.add('selected');
            selectedOption = index;
        }
        optionsContainer.appendChild(optionElement);
    });
    progressBar.style.width = `${(currentQuestion / questions.length) * 100}%`;
    nextBtn.style.display = currentQuestion < questions.length - 1 ? 'inline-block' : 'none';
    finishBtn.style.display = currentQuestion === questions.length - 1 ? 'inline-block' : 'none';
}

function selectOption(index) {
    const options = document.querySelectorAll('.option');
    options.forEach(option => option.classList.remove('selected'));
    options[index].classList.add('selected');
    selectedOption = index;
    userAnswers[currentQuestion] = index;
}

function nextQuestion() {
    if (selectedOption !== null) {
        currentQuestion++;
        selectedOption = null;
        showQuestion();
    } else {
        alert('Please select an answer before proceeding.');
    }
}

function finishTest() {
    clearInterval(timer);
    calculateScore();
    showResults();
}

function calculateScore() {
    score = 0;
    for (let i = 0; i < questions.length; i++) {
        if (userAnswers[i] === questions[i].answer) {
            score++;
        }
    }
}

function showResults() {
    const minutes = Math.floor((300 - timeLeft) / 60);
    const seconds = (300 - timeLeft) % 60;
    testContainer.style.display = 'none';
    resultsContainer.style.display = 'block';
    scoreText.textContent = `You scored ${score} out of ${questions.length} (${Math.round((score / questions.length) * 100)}%)`;
    timeTaken.textContent = `Time taken: ${minutes}m ${seconds}s`;
}

function resetTest() {
    currentQuestion = 0;
    score = 0;
    selectedOption = null;
    timeLeft = 300;
    userAnswers = [];
    testContainer.style.display = 'block';
    resultsContainer.style.display = 'none';
    timerElement.textContent = '05:00';
    progressBar.style.width = '0%';
    initTest();
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            finishTest();
        }
    }, 1000);
}

function initTest() {
    showQuestion();
    startTimer();
    testStarted = true;
}

window.addEventListener('DOMContentLoaded', () => {
    questionText = document.getElementById('questionText');
    optionsContainer = document.getElementById('optionsContainer');
    nextBtn = document.getElementById('nextBtn');
    finishBtn = document.getElementById('finishBtn');
    timerElement = document.getElementById('timer');
    resultsContainer = document.getElementById('resultsContainer');
    scoreText = document.getElementById('scoreText');
    timeTaken = document.getElementById('timeTaken');
    progressBar = document.getElementById('progressBar');
    testContainer = document.getElementById('testContainer');
    resetBtn = document.getElementById('resetBtn');
    nextBtn.onclick = nextQuestion;
    finishBtn.onclick = finishTest;
    resetBtn.onclick = resetTest;
    initTest();
}); 