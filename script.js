
// Initializing all the variables needed for the game
let openDoor1;
let openDoor2;
let openDoor3;
let door1 = document.getElementById('door1');
let door2 = document.getElementById('door2');
let door3 = document.getElementById('door3');
let botDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg";
let beachDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg";
let spaceDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg";
let closedDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg";
let numClosedDoors = 3;
let startButton = document.getElementById('start');
let currentlyPlaying = true;
let score = 0;
let highScore = 0;
let currentStreak = document.getElementById('score-number');
let bestStreak = document.getElementById('high-score-number');
currentStreak.innerHTML = score;
bestStreak.innerHTML = highScore;

// Function to check whether the door has been opened or not
const isClicked = (door) => {
    if (door.src === closedDoorPath) {
        return false;
    } else {
        return true;
    }
}

// Function to check if the bot is behind the door or not
const isBot = (door) => {
    if (door.src === botDoorPath) {
        return true;
    } else {
        return false;
    }
}

// function to handle the event when a door is played or opened
const playDoor = (door) => {
    numClosedDoors--;
    if (numClosedDoors === 0) {
        gameOver('win');
    } else if (isBot(door)) {
        gameOver('lose');
    }
}

// Function to generate random doors for every new game
const randomChoreDoorGenerator = () => {
    const choreDoor = Math.floor(Math.random() * 3);
    if (choreDoor === 0) {
        openDoor1 = botDoorPath;
        openDoor2 = beachDoorPath;
        openDoor3 = spaceDoorPath;
    }
    else if (choreDoor === 1) {
        openDoor1 = spaceDoorPath;
        openDoor2 = botDoorPath;
        openDoor3 = beachDoorPath;
    } else {
        openDoor1 = beachDoorPath;
        openDoor2 = spaceDoorPath;
        openDoor3 = botDoorPath;
    }
}


door1.onclick = () => {
    if (!isClicked(door1) && currentlyPlaying) {
        door1.src = openDoor1;
        playDoor(door1);
    }
}

door2.onclick = () => {
    if (!isClicked(door2) && currentlyPlaying) {
        door2.src = openDoor2;
        playDoor(door2);
    }
}

door3.onclick = () => {
    if (!isClicked(door3) && currentlyPlaying) {
        door3.src = openDoor3;
        playDoor(door3);
    }
}


startButton.onclick = () => {
    startRound();
}


const startRound = () => {
    door1.src = closedDoorPath;
    door2.src = closedDoorPath;
    door3.src = closedDoorPath;

    numClosedDoors = 3;

    startButton.innerHTML = 'Good luck!';

    currentlyPlaying = true;
    randomChoreDoorGenerator();
}

const gameOver = (status) => {
    if (status === 'win') {
        startButton.innerHTML = 'You win! Play again?';
        getYourScore();
    } else {
        startButton.innerHTML = 'Game over! Play again?';
        score = 0;
        currentStreak.innerHTML = score;
    }
    currentlyPlaying = false;
}

// Function to keep track of your score
const getYourScore = () => {
    score++;
    currentStreak.innerHTML = score;
    if (score > highScore) {
        highScore = score;
        bestStreak.innerHTML = highScore;
    }
}


startRound();
