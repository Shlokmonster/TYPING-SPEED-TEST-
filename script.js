// const dropdownBtn = document.getElementById("dropdownBtn");
//         const dropdownMenu = document.getElementById("dropdownMenu");

//         // Toggle dropdown menu
//         dropdownBtn.addEventListener("click", () => {
//             dropdownMenu.classList.toggle("show");
//         });

//         // Select an option
//         function selectOption(option) {
//             dropdownBtn.innerText = option;
//             dropdownMenu.classList.remove("show");
//         }

//         // Close dropdown if clicked outside
//         document.addEventListener("click", (event) => {
//             if (!dropdownBtn.contains(event.target) && !dropdownMenu.contains(event.target)) {
//                 dropdownMenu.classList.remove("show");
//             }
//         });

// //  for time in seconds

// const thirty=document.getElementById("three");
// const one=document.getElementById("one");
// const two = document.getElementById("two");
// const five= document.getElementById("five");
// const time =document.getElementById("time")

// thirty.addEventListener("click",()=>{
//     alert("30 seconds");
//     time.textContent="30s"
// });
// one.addEventListener("click",()=>{
//     alert("60 seconds");
//     time.textContent="60s"
// });
// two.addEventListener("click",()=>{
//     alert("120 seconds");
//     time.textContent="120s"
// });
// five.addEventListener("click",()=>{
//     alert("300 seconds");
//     time.textContent="300s"
// })

// //  building this logic of words and all
// //   from this we would get the random senteces
// const sentences = [
//     "The technology industry continues to evolve at an unprecedented pace,\n with artificial intelligence and machine learning leading the charge \n toward innovation and digital transformation across various sectors.",
//     "The global economy faces numerous challenges and opportunities as \nmarkets adapt to changing consumer behaviors, digital currencies, and \nthe increasing importance of e-commerce platforms.",
//     "Environmental sustainability has become a crucial focus for businesses \n worldwide, as companies implement eco-friendly practices and develop \nrenewable energy solutions to combat climate change.",
//     "Air India is holding off on exercising its outstanding options to buy additional \nBoeing jets until the planemaker has cleared its backlog. This \ndecision comes amid delays in Air India's fleet revamp."
// ];
// let timer, startTime;
// let currentSentence = "";
// const sentenceDisplay = document.getElementById("write");
// const inputField = document.getElementById("input");
// const timeDisplay = document.getElementById("time");
// const speedDisplay = document.getElementById("wmp");
// const restartButton = document.getElementById("reset");

// // 
// function startTest() {
//     currentSentence = sentences[Math.floor(Math.random() * sentences.length)];
//     sentenceDisplay.textContent = currentSentence;
//     inputField.value = "";
//     inputField.disabled = false;
//     inputField.focus();

//     startTime = new Date();
//     timeDisplay.textContent = "0";
//     speedDisplay.textContent = "0";

//     if (timer) clearInterval(timer);
//     timer = setInterval(updateTime, 1000);
// };
// function updateTime() {
//     const elapsedTime = Math.floor((new Date() - startTime) / 1000);
//     timeDisplay.textContent = elapsedTime;

//     const wordsTyped = inputField.value.trim().split(" ").length;
//     const wpm = Math.round((wordsTyped / elapsedTime) * 60) || 0;
//     speedDisplay.textContent = wpm;
// };
// function checkTyping() {
//     if (inputField.value.trim() === currentSentence) {
//         clearInterval(timer);
//         inputField.disabled = true;
//         alert("Test completed! Your speed: " + speedDisplay.textContent + " WPM");
//     }
// }

// restartButton.addEventListener("click", startTest);
// inputField.addEventListener("input", checkTyping);

// Selecting elements
const inputField = document.getElementById("input");
const textDisplay = document.getElementById("write");
const timeDisplay = document.getElementById("time");
const resetButton = document.getElementById("reset");

const wpmDisplay = document.getElementById("wmp");
const accuracyDisplay = document.getElementById("accuracy");
const charDisplay = document.getElementById("char");
const errorDisplay = document.getElementById("error");
const dropdownButtons = document.querySelectorAll(".dropdown-btn");

let timeLeft = 30; 
let timer;
let totalTyped = 0;
let correctTyped = 0;
let errors = 0;
let isTestRunning = false;
let startTime;

// DIFFICULTEIS OF SENTENCE
const sentences = {
    easy: [
        "The cat sat on the mat.",
        "I love coding.",
        "JavaScript is fun!",
        "Hello world!",
        "The sun is bright today."
    ],
    medium: [
        "The quick brown fox jumps over the lazy dog.",
        "Typing fast requires practice and patience.",
        "JavaScript powers interactive web applications."
    ],
    hard: [
        "Artificial intelligence is shaping the future of technology.",
        "Efficient algorithms optimize computational performance.",
        "Understanding closures in JavaScript is crucial for developers."
    ]
};

// gets a random sentece
function generateSentence(difficulty =()=>{
    const randomIndex = Math.floor(Math.random*selectedSentences.length)
    return selectedSentences[randomIndex];
}) {
    const selectedSentences = sentences[difficulty];
    const randomIndex = Math.floor(Math.random() * selectedSentences.length);
    textDisplay.innerText = selectedSentences[randomIndex];
}

// Update the timer
function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeDisplay.innerText = timeLeft + "s";
    } else {
        clearInterval(timer);
        endTest(); // Auto-end when timer reaches 0
    }
}

// Start the test
function startTest() {
    if (isTestRunning) return; 

    isTestRunning = true;
    startTime = new Date(); 
    totalTyped = 0;
    correctTyped = 0;
    errors = 0;

    inputField.disabled = false;
    inputField.value = "";
    inputField.focus();

    generateSentence("medium"); 
    timeDisplay.innerText = timeLeft + "s";

    timer = setInterval(updateTimer, 1000);
}

//  stop when completde
function endTest() {
    clearInterval(timer);
    isTestRunning = false;
    inputField.disabled = true;
    calculateResults();
}

// Calculate WPM, accuracy, and errors
function calculateResults() {
    let totalElapsedTime = (new Date() - startTime) / 60000; 

    if (totalElapsedTime <= 0) totalElapsedTime = 1 / 60; 

    let wpm = Math.round((correctTyped / 5) / totalElapsedTime);
    let accuracy = totalTyped > 0 ? Math.round((correctTyped / totalTyped) * 100) : 100;

    wpmDisplay.innerText = wpm > 0 ? wpm : 0;
    accuracyDisplay.innerText = accuracy + "%";
    charDisplay.innerText = totalTyped;
    errorDisplay.innerText = errors;
}

// Event listener for typing input
inputField.addEventListener("input", function () {
    if (!isTestRunning) startTest(); 

    let typedText = inputField.value;
    let originalText = textDisplay.innerText;

    totalTyped = typedText.length;

    let correctCount = 0;
    errors = 0;

    for (let i = 0; i < typedText.length; i++) {
        if (typedText[i] === originalText[i]) {
            correctCount++;
        } else {
            errors++;
        }
    }

    correctTyped = correctCount;
// if done earLY
    if (typedText === originalText) {
        endTest();
    }

    // get result
    charDisplay.innerText = totalTyped;
    errorDisplay.innerText = errors;
});

resetButton.addEventListener("click", function () {
    clearInterval(timer);
    isTestRunning = false;
    timeLeft = 30; // Reset to default
    timeDisplay.innerText = "30s";
    inputField.value = "";
    inputField.disabled = false;

    wpmDisplay.innerText = "0";
    accuracyDisplay.innerText = "100%";
    charDisplay.innerText = "0";
    errorDisplay.innerText = "0";

    generateSentence("medium");
    startTest();
});


// Handling dropdown selection for time & difficulty
dropdownButtons.forEach((button) => {
    button.addEventListener("click", function () {
        let dropdownMenu = this.nextElementSibling;
        dropdownMenu.classList.toggle("show");

        let options = dropdownMenu.querySelectorAll("a");
        options.forEach((option) => {
            option.addEventListener("click", function (e) {
                e.preventDefault();
                let selectedValue = this.innerText;
                button.innerText = selectedValue;

                if (selectedValue.includes("sec") || selectedValue.includes("minute")) {
                    timeLeft = parseInt(selectedValue) * (selectedValue.includes("minute") ? 60 : 1);
                    timeDisplay.innerText = timeLeft + "s";
                } else {
                    generateSentence(selectedValue.toLowerCase());
                }
            });
        });
    });
});

// Close dropdown when clicking outside
window.addEventListener("click", function (e) {
    if (!e.target.matches(".dropdown-btn")) {
        let dropdowns = document.querySelectorAll(".dropdown-menu");
        dropdowns.forEach((menu) => {
            menu.classList.remove("show");
        });
    }
});
