# Number Guessing Game

Sample solution for the [Number Guessing Game](https://roadmap.sh/projects/number-guessing-game) challenge from [roadmap.sh](https://roadmap.sh/).

## Overview

The Number Guessing Game is a command-line based interactive game where players try to guess a randomly generated number within a specified range. The game offers different difficulty levels, each with a varying number of chances to guess the correct number.

## Features

- Three difficulty levels: Easy, Medium, and Hard.
- High scores tracking based on the fastest completion time.
- Hints provided based on how close the guess is to the target number.
- User-friendly prompts and error handling for invalid inputs.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/number-guessing-game.git
   ```

2. Navigate to the project directory:

   ```bash
   cd number-guessing-game
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

## Usage

To start the game, run:

```bash
node index.js
```

Follow the on-screen instructions to play the game. Select a difficulty level and try to guess the number within the given chances.

## Difficulty Levels

- **Easy**: 10 chances
- **Medium**: 5 chances
- **Hard**: 3 chances

## Development

- The game is written in JavaScript and uses Node.js.
- The main logic is in `guessing-game.js`.
- Constants for difficulty levels are defined in `constants.js`.
- The entry point of the application is `index.js`.

## Contributing

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes.
4. Push your branch and create a pull request.

## License

This project is licensed under the ISC License.
