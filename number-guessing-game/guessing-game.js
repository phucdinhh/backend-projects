import readline from "readline";
import { performance } from "perf_hooks";
import { DIFFICULT_LEVELS, DIFFICULTIES } from "./constants.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let highScore = {
  [DIFFICULT_LEVELS.EASY]: { name: "", time: Infinity },
  [DIFFICULT_LEVELS.MEDIUM]: { name: "", time: Infinity },
  [DIFFICULT_LEVELS.HARD]: { name: "", time: Infinity },
};

const askQuestion = (question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
};

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getHint = (secret, guess) => {
  const diff = Math.abs(secret - guess);
  if (diff <= 2) {
    return "Very close!";
  } else if (diff <= 5) {
    return "Close!";
  } else if (diff <= 10) {
    return "Not too far!";
  } else {
    return "Far away!";
  }
};

const playGame = async () => {
  console.log(`\nWelcome to the Number Guessing Game!`);
  console.log(`I'm thinking of a number between 1 and 100.`);
  console.log(
    `You have to guess it in limited attempts based on your chosen difficulty level.\n`
  );

  let difficultyLevel;

  while (true) {
    console.log(`Please select the difficulty level:
      1. Easy (10 chances)
      2. Medium (5 chances)
      3. Hard (3 chances)`);
    difficultyLevel = await askQuestion(
      "Choose a difficulty level (1 for Easy, 2 for Medium, 3 for Hard): "
    );

    if (["1", "2", "3"].includes(difficultyLevel)) {
      break;
    } else {
      console.log("Invalid choice. Please choose 1, 2, or 3.");
    }
  }

  const difficulty = DIFFICULTIES[difficultyLevel];
  const secretNumber = getRandomNumber(1, 100);
  let chances = difficulty.chances;
  let attempts = 0;

  console.log(
    `\nGreat! You have selected the ${difficulty.name} difficulty level.`
  );
  console.log(
    `You have ${chances} chances to guess the number.\nLet's start the game!\n`
  );

  const startTime = performance.now();

  while (chances > 0) {
    const guess = parseInt(await askQuestion("Enter your guess: "));

    if (isNaN(guess) || guess < 1 || guess > 100) {
      console.log("Invalid input. Please enter a number between 1 and 100.");
      continue;
    }

    chances--;
    attempts++;

    if (guess === secretNumber) {
      const endTime = performance.now();
      const elapsedTime = (endTime - startTime) / 1000;
      console.log(
        `\nCongratulations! You guessed the number ${secretNumber} in ${
          attempts + 1
        } attempts.`
      );
      console.log(`Your time: ${elapsedTime.toFixed(2)} seconds`);
      if (elapsedTime < highScore[difficulty.name].time) {
        highScore[difficulty.name] = {
          name: "Player",
          time: elapsedTime,
        };
        console.log(`New high score for ${difficulty.name} difficulty!`);
      }
      console.log(
        `High score for ${difficulty.name} difficulty: ${highScore[
          difficulty.name
        ].time.toFixed(2)} seconds`
      );
      break;
    } else {
      const feedback =
        guess < secretNumber ? "The number is higher!" : "The number is lower!";
      console.log(`Wrong guess! Try again. ${feedback}`);

      if (attempts >= 2 && chances <= 2) {
        console.log(`Hint: ${getHint(secretNumber, guess)}`);
      }
    }

    console.log(`You have ${chances} chances left.\n`);
  }

  if (chances === 0) {
    console.log(
      `\nSorry, you've run out of chances. The correct number was ${secretNumber}.`
    );
    if (highScore[difficulty.name].time === Infinity) {
      console.log(
        `No high score yet for ${difficulty.name} difficulty. Try again!`
      );
    } else {
      console.log(
        `High score for ${difficulty.name} difficulty: ${highScore[
          difficulty.name
        ].time.toFixed(2)} seconds`
      );
    }
  }

  const again = await askQuestion("Do you want to play again? (yes/no): ");
  if (again.toLowerCase() === "yes") {
    console.log("\nStarting a new game...\n");
    playGame();
  } else {
    console.log("Thanks for playing! Goodbye!");
    rl.close();
  }
};

export default playGame;
