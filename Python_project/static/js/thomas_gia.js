// Thomas GIA Test Game Logic
// All code moved from thomas_gia.html script tag

// Test questions
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

// Test variables
let currentQuestion = 0;
let score = 0;
let selectedOption = null;
let timeLeft = 300; // 5 minutes in seconds
let timer;
let testStarted = false;
let userAnswers = [];

// DOM elements
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const nextBtn = document.getElementById('nextBtn');
const finishBtn = document.getElementById('finishBtn');
const timerElement = document.getElementById('timer');
const resultsContainer = document.getElementById('resultsContainer');
const scoreText = document.getElementById('scoreText');
const timeTaken = document.getElementById('timeTaken');
const progressBar = document.getElementById('progressBar');
const testContainer = document.getElementById('testContainer');

// Initialize the test
function initTest() {
    showQuestion();
    startTimer();
    testStarted = true;
}

// Display current question
function showQuestion() {
    const question = questions[currentQuestion];
    questionText.textContent = `${currentQuestion + 1}. ${question.question}`;

    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.onclick = () => selectOption(index);

        // Highlight if this option was previously selected
        if (userAnswers[currentQuestion] === index) {
            optionElement.classList.add('selected');
            selectedOption = index;
        }

        optionsContainer.appendChild(optionElement);
    });

    // Update progress bar
    progressBar.style.width = `${(currentQuestion / questions.length) * 100}%`;

    // Show/hide next and finish buttons
    nextBtn.style.display = currentQuestion < questions.length - 1 ? 'inline-block' : 'none';
    finishBtn.style.display = currentQuestion === questions.length - 1 ? 'inline-block' : 'none';
}

// Select an option
function selectOption(index) {
    // Remove selected class from all options
    const options = document.querySelectorAll('.option');
    options.forEach(option => option.classList.remove('selected'));

    // Add selected class to clicked option
    options[index].classList.add('selected');
    selectedOption = index;

    // Store the answer
    userAnswers[currentQuestion] = index;
}

// Move to next question
function nextQuestion() {
    if (selectedOption !== null) {
        currentQuestion++;
        selectedOption = null;
        showQuestion();
    } else {
        alert('Please select an answer before proceeding.');
    }
}

// Finish the test
function finishTest() {
    clearInterval(timer);
    calculateScore();
    showResults();
}

// Calculate final score
function calculateScore() {
    score = 0;
    for (let i = 0; i < questions.length; i++) {
        if (userAnswers[i] === questions[i].answer) {
            score++;
        }
    }
}

// Display results
function showResults() {
    const minutes = Math.floor((300 - timeLeft) / 60);
    const seconds = (300 - timeLeft) % 60;

    testContainer.style.display = 'none';
    resultsContainer.style.display = 'block';

    scoreText.textContent = `You scored ${score} out of ${questions.length} (${Math.round((score / questions.length) * 100)}%)`;
    timeTaken.textContent = `Time taken: ${minutes}m ${seconds}s`;
}

// Reset the test
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

// Timer function
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

// Start the test when the page loads
window.onload = initTest; 