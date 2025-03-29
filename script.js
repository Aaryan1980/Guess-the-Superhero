let playerName = "";
let currentQuestionIndex = 0;
let score = 0;
const leaderboardKey = "superheroQuizLeaderboard";

const questions = [
    { hints: ["I am a billionaire.", "I have a high-tech suit.", "I am part of the Avengers."], options: ["Batman", "Iron Man", "Superman", "Flash"], answer: "Iron Man" },
    { hints: ["I am from Krypton.", "I wear a red cape.", "I have super strength."], options: ["Hulk", "Thor", "Superman", "Doctor Strange"], answer: "Superman" },
    { hints: ["I am the God of Thunder.", "I have a powerful hammer.", "I am from Asgard."], options: ["Loki", "Thor", "Hulk", "Aquaman"], answer: "Thor" },
    { hints: ["I can shrink and grow.", "I have a suit that manipulates size.", "I work with the Wasp."], options: ["Iron Man", "Ant-Man", "Spider-Man", "Doctor Strange"], answer: "Ant-Man" },
    { hints: ["I am the Sorcerer Supreme.", "I can manipulate time.", "I wear a Cloak of Levitation."], options: ["Doctor Strange", "Loki", "Scarlet Witch", "Thor"], answer: "Doctor Strange" },
    { hints: ["I am an anti-hero.", "I have healing abilities.", "I love breaking the fourth wall."], options: ["Deadpool", "Wolverine", "Punisher", "Venom"], answer: "Deadpool" }
];

function startGame() {
    playerName = document.getElementById("player-name").value.trim();
    if (playerName === "") {
        alert("Please enter your name to start the game!");
        return;
    }
    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("quiz-container").classList.remove("hidden");
    document.getElementById("player-greeting").textContent = `Good luck, ${playerName}!`;
    loadQuestion();
}

function loadQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById("hint1").textContent = question.hints[0];
    document.getElementById("hint2").textContent = question.hints[1];
    document.getElementById("hint3").textContent = question.hints[2];
    
    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";
    question.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => checkAnswer(option);
        optionsDiv.appendChild(button);
    });
}

function checkAnswer(selectedOption) {
    const question = questions[currentQuestionIndex];
    if (selectedOption === question.answer) {
        score += 10;
        document.getElementById("result").textContent = "Correct!";
        document.getElementById("result").style.color = "#00ff00";
    } else {
        document.getElementById("result").textContent = "Wrong! The correct answer was " + question.answer;
        document.getElementById("result").style.color = "#ff0000";
    }
    document.getElementById("next-btn").classList.remove("hidden");
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        document.getElementById("result").textContent = "";
        document.getElementById("next-btn").classList.add("hidden");
        loadQuestion();
    } else {
        saveScore();
    }
}

function saveScore() {
    let leaderboard = JSON.parse(localStorage.getItem(leaderboardKey)) || [];
    leaderboard.push({ name: playerName, score });
    leaderboard.sort((a, b) => b.score - a.score);
    localStorage.setItem(leaderboardKey, JSON.stringify(leaderboard));
    displayLeaderboard(leaderboard);
}

function displayLeaderboard(leaderboard) {
    document.getElementById("quiz-container").classList.add("hidden");
    document.getElementById("leaderboard").classList.remove("hidden");
    let leaderboardList = document.getElementById("leaderboard-list");
    leaderboardList.innerHTML = leaderboard.map(entry => `<li>${entry.name}: ${entry.score} points</li>`).join('');
}

function restartGame() {
    location.reload();
}