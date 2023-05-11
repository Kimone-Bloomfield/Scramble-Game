let PlayersData = [];
var correctAnswers = 0;
var totalQuestions = 0;
let Useranswer;

const playArea = document.getElementById("play-area");
const acceptButton = document.getElementById("check-answer-btn");
const endButton = document.getElementById("end-btn");
const nextButton = document.getElementById("next-round-btn");
const percentageButton = document.getElementById("percentage-btn");
const userInput = document.getElementById("answer-input");

//TASK 6
function checkAnswer() {
  let GetcurrentPlayerInArray =
    PlayersData.length > 1 ? PlayersData.length - 1 : 0;

  let answer = document.getElementById("answer-input").value.trim().toLowerCase();
  if (answer === "")
   {
    alert("Please enter your answer.");
  }
  if (answer === Useranswer) 
  {
    alert("Awesome !! The Word Is Correct");
    document.getElementById("answer-input").value = "";
    playGame();
    PlayersData[GetcurrentPlayerInArray].correct += 1;
    PlayersData[GetcurrentPlayerInArray].totalQuestions += 1;
  } 
  else 
  {
    alert("Wrong!");
  }

  showAll();
}

//TASK 2 and 3-Register Function
function Register() {
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  const dob = document.getElementById("dob");
  const age = document.getElementById("age");
  let gender = document.getElementById("gender").value;
  let email = document.getElementById("email").value;

  if (firstName.length < 3) {
    alert("First name must be at least 3 characters long.");
    return false;
  }

  if (lastName.length < 3) {
    alert("Last name must be at least 3 characters long.");
    return false;
  }

  if (age < 8 || age > 12) {
    alert("Age must be between 8 and 12 inclusive.");
    return false;
  }

  if (!email.endsWith("@gmail.com")) {
    alert("Email address must end with '@gmail.com'.");
    return false;
  }

  let player = {
    firstName: firstName,
    lastName: lastName,
    dob: dob.value,
    age: age.value,
    gender: gender,
    email: email,
    correct: 0,
    wrong: 0,
    percentage: 0,
    scrambledWord: 0,
    totalQuestions: 0,
  };

  PlayersData.push(player);
  console.log(PlayersData);

  alert("Registration successful!");
  //creates a blank form
  document.getElementById("firstName").value = "";
  document.getElementById("lastName").value = "";
  document.getElementById("dob").value = "";
  document.getElementById("age").value = "";
  document.getElementById("gender").value = "";
  document.getElementById("email").value = "";

  // Disable all form fields and the Register button
  document.getElementById("firstName").disabled = true;
  document.getElementById("lastName").disabled = true;
  document.getElementById("dob").disabled = true;
  document.getElementById("gender").disabled = true;
  document.getElementById("email").disabled = true;
  document.getElementById("age").disabled = true;
  document.getElementById("RegisterBtn").disabled = true;

  // Enable the End, Start & Accept buttons
  document.getElementById("StartBtn").disabled = false;

  playGame();
}

function calculateAge() {
  const dobInput = document.getElementById("dob");
  const ageOutput = document.getElementById("age");
  let GetcurrentPlayerInArray =
    PlayersData.length > 1 ? PlayersData.length - 1 : 0;

  dobInput.addEventListener("input", () => {
    const dob = new Date(dobInput.value);

    PlayersData[GetcurrentPlayerInArray].dob = dob;

    const ageInYears = Math.floor(
      (Date.now() - dob) / (365.25 * 24 * 60 * 60 * 1000)
    );
    if (ageInYears < 8 || ageInYears > 12) {
      ageOutput.value = "";
      dobInput.setCustomValidity("Age must be between 8 and 12 years old.");
    } else {
      ageOutput.value = ageInYears;
      dobInput.setCustomValidity("");
      PlayersData[GetcurrentPlayerInArray].age = ageInYears;
    }

    return ageInYears;
  });
}
calculateAge();

function showpercentage() 
{
  let GetcurrentPlayerInArray =
    PlayersData.length > 1 ? PlayersData.length - 1 : 0;
  findPercentageScore();

  const showpercentage = document.querySelector(".showpercentage-container");

  let currentPlayer = PlayersData[GetcurrentPlayerInArray];
  const now = new Date();
  const currentDateTime = now.toLocaleString();

  showpercentage.innerHTML = `<div class="showpercentage-wrapper"> <p> First Name: ${currentPlayer.firstName}</p>
  <p>Last Name: ${currentPlayer.lastName}</p>
   <p>Age: ${currentPlayer.age}</p> 
   <p>Number of Wrong: ${currentPlayer.wrong} </p>
   <p>Question Correct: ${currentPlayer.correct}</p>
   <p>Total Question: ${currentPlayer.totalQuestions}</p>    
   <p>Percentage: ${currentPlayer.percentage}%</p>
   <p>CurrentDate: ${currentDateTime}%</p> </div>
  `;
}

function findPercentageScore() {
  let GetcurrentPlayerInArray =
    PlayersData.length > 1 ? PlayersData.length - 1 : 0;

  let percentage =
    (PlayersData[GetcurrentPlayerInArray].correct /
      PlayersData[GetcurrentPlayerInArray].totalQuestions) *
    100;

  PlayersData[GetcurrentPlayerInArray].percentage = percentage.toFixed(2);
  return percentage.toFixed(2);
}

function EndGame() {
  findPercentageScore();
  showAll();
  showfreq();
  acceptButton.disabled = true;
  endButton.disabled = true;
  nextButton.disabled = true;
  percentageButton.disabled = true;
  userInput.disabled = true;
  document.getElementById("firstName").disabled = false;
  document.getElementById("lastName").disabled = false;
  document.getElementById("dob").disabled = false;
  document.getElementById("gender").disabled = false;
  document.getElementById("email").disabled = false;
  document.getElementById("age").disabled = false;
  document.getElementById("RegisterBtn").disabled = false;
}

//TASK 4
function playGame() {
  acceptButton.disabled = false;
  endButton.disabled = false;
  nextButton.disabled = false;
  percentageButton.disabled = false;
  userInput.disabled = false;

  // Define an array of words with 4 to 6 characters in length
  const words = [
    "apple",
    "banana",
    "cherry",
    "grape",
    "lemon",
    "orange",
    "peach",
  ];

  // Define a function to randomly select a word from the array
  function getRandomWord() {
    const index = Math.floor(Math.random() * words.length);
    return words[index];
  }

  // Call the function to get a random word
  const randomWord = getRandomWord();
  Useranswer = randomWord;

  console.log(Useranswer);
  // Convert the word to an array of letters
  const letters = randomWord.split("");

  // Scramble the letters using the Fisher-Yates shuffle algorithm
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }

  // Convert the scrambled letters back to a word
  const scrambledWord = letters.join("");

  console.log(scrambledWord);

  document.getElementById("answer-input").disabled = false;
  document.getElementById("play-area").textContent = scrambledWord;
}

function nextRound() 
{
  playGame();
  showAll();

  let GetcurrentPlayerInArray =
    PlayersData.length > 1 ? PlayersData.length - 1 : 0;

  console.log(GetcurrentPlayerInArray);
  PlayersData[GetcurrentPlayerInArray].wrong += 1;
  PlayersData[GetcurrentPlayerInArray].totalQuestions += 1;

  console.log(PlayersData);
}

function showAll()
 {
  let showAllPlayersTextarea = document.getElementById("showall");
  let showallcontainer = document.getElementById("showall-container");
  const now = new Date();
  const currentDateTime = now.toLocaleString();

  showallcontainer.innerHTML = "";

  PlayersData.forEach((player) => {
    showallcontainer.innerHTML += `<div class="showpercentage-wrapper">   <p> First Name: ${player.firstName}</p>
    <p>Last Name: ${player.lastName}</p>
     <p>Age: ${player.age}</p> 
     <p>Number of Wrong: ${player.wrong} </p>
     <p>Question Correct: ${player.correct}</p>
     <p>Total Question: ${player.totalQuestions}</p>    
     <p>Percentage: ${player.percentage}%</p>
     <p>CurrentDate: ${currentDateTime}%</p> </div>
    `;
  });
}

let root = document.querySelector(":root");

function showfreq() {
  let male = 0;
  let female = 0;
  let total = 0;

  const gender = PlayersData.map((player) => {
    if (player.gender === "male") {
      male += 1;
    }

    if (player.gender === "female") {
      female += 1;
    }

    total += 1;

    return { male: male, female: female };
  });

  let femalepercentage = (female / total) * 100;
  let malepercentage = (male / total) * 100;

  root.style.setProperty("--female", femalepercentage.toFixed(2) + "%");
  root.style.setProperty("--male", malepercentage.toFixed(2) + "%");

  document.querySelector("#male-percentage").innerHTML =
    "<b>Male</b> " + malepercentage.toFixed(0) + "%";
  document.querySelector("#female-percentage").innerHTML =
    "<b>Female</b> " + femalepercentage.toFixed(0) + "%";

  console.log(femalepercentage, malepercentage);

  let less_fifty = 0;
  let fifty = 0;
  let sixty = 0;
  let seventy = 0;
  let eighty = 0;
  let ninety = 0;
  let hundred = 0;
  let totalpercentage = 0;

  const freq = PlayersData.map((player) => {
    if (player.percentage < 50) {
      less_fifty += 1;
    }

    if (player.percentage >= 50 && player.percentage <= 59) {
      fifty += 1;
    }

    if (player.percentage >= 60 && player.percentage <= 69) {
      sixty += 1;
    }
    if (player.percentage >= 70 && player.percentage <= 79) {
      seventy += 1;
    }
    if (player.percentage >= 80 && player.percentage <= 89) {
      eighty += 1;
    }
    if (player.percentage >= 90 && player.percentage <= 99) {
      ninety += 1;
    }

    if (player.percentage == 100) {
      hundred += 1;
    }
    totalpercentage += 1;

    return { male: male, female: female };
  });

  let less_fiftypercentage = (less_fifty / totalpercentage) * 100;
  let fiftypercentage = (fifty / totalpercentage) * 100;
  let sixtypercentage = (sixty / totalpercentage) * 100;
  let seventypercentage = (seventy / totalpercentage) * 100;
  let eightpercentage = (eighty / totalpercentage) * 100;
  let ninetypercentage = (ninety / totalpercentage) * 100;
  let hundredpercentage = (hundred / totalpercentage) * 100;

  console.log(hundredpercentage);
  console.log(hundred);

  root.style.setProperty(
    "--less_then_fifty",
    less_fiftypercentage.toFixed(2) + "%"
  );
  root.style.setProperty("--fifty", fiftypercentage.toFixed(2) + "%");
  root.style.setProperty("--sixty", sixtypercentage.toFixed(2) + "%");
  root.style.setProperty("--seventy", seventypercentage.toFixed(2) + "%");
  root.style.setProperty("--eighty", eightpercentage.toFixed(2) + "%");
  root.style.setProperty("--ninety", ninetypercentage.toFixed(2) + "%");
  root.style.setProperty("--hundred", hundredpercentage.toFixed(2) + "%");

  document.querySelector(".number50").innerHTML =
    "Player that got 50-59: " + "<b>" + fifty + "<b>";
  document.querySelector(".number60").innerHTML =
    "Player that got 60-69: " + "<b>" + sixty + "<b>";
  document.querySelector(".number70").innerHTML =
    "Player that got 70-79: " + "<b>" + seventy + "<b>";
  document.querySelector(".number80").innerHTML =
    "Player that got 80-89: " + "<b>" + eighty + "<b>";
  document.querySelector(".number90").innerHTML =
    "Player that got 90-99: " + "<b>" + ninety + "<b>";
  document.querySelector(".number100").innerHTML =
    "Player that got 100: " + "<b>" + hundred + "<b>";
  document.querySelector(".number_less_than_50").innerHTML =
    "Player that got less than 50: " + "<b>" + less_fifty + "<b>";
}
