var welcomeScreen = document.getElementById('welcome-screen');
var instructionsScreen = document.getElementById('instructions-screen');
var gameScreen = document.getElementById('game-screen');
var gameOverScreen = document.getElementById('game-over-screen'); // Added for game over screen
var howToPlayBtn = document.getElementById('how-to-play-btn');
var startGameBtn = document.getElementById('start-game-btn');
var resetGameBtn = document.getElementById('reset-game-btn');

howToPlayBtn.addEventListener('click', function() {
    welcomeScreen.classList.remove('active');
    instructionsScreen.classList.add('active');
});

startGameBtn.addEventListener('click', function() {
    instructionsScreen.classList.remove('active');
    gameScreen.classList.add('active');
});

resetGameBtn.addEventListener('click', function() {
    gameScreen.classList.remove('active');
    welcomeScreen.classList.add('active');
});

var canvas = document.getElementById('factors-game-canvas');
canvas.width = window.innerWidth * 2;
canvas.height = (window.innerHeight * .8) * 2;
var game = FactorsGame.init(canvas, { changeDocumentTextColor: true });

function resetForNextLevel() {
    // Reset actions for the next level (if any)
}

game.onEnd = function() {
    // Hide the game screen and display the game over screen with the image
    gameScreen.classList.remove('active');
    gameOverScreen.classList.add('active');
    
    var winnerSound = document.getElementById('winner-sound');
    setTimeout(function() {
        winnerSound.play();
    }, 3000);

    // Display final stats on the game over screen
    // (If you need to display something else, update this section)
};

game.start();

var slideSound = document.getElementById('slide-sound');
var clickSoundVolumeControl = document.getElementById('click-sound-volume');
var winnerSoundVolumeControl = document.getElementById('winner-sound-volume');
var lastPlayed = 0; 
var debounceTime = 500; 

var cellSize = 50; 
var isDragging = false; 

function isInsideCell(x, y) {
    var cellX = Math.floor(x / cellSize);
    var cellY = Math.floor(y / cellSize);
    return true;
}

clickSoundVolumeControl.addEventListener('input', function() {
    slideSound.volume = clickSoundVolumeControl.value;
});

winnerSoundVolumeControl.addEventListener('input', function() {
    var winnerSound = document.getElementById('winner-sound');
    winnerSound.volume = winnerSoundVolumeControl.value;
});

canvas.addEventListener('mousedown', function (event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    if (isInsideCell(x, y)) {
        isDragging = true; 
    }
});

canvas.addEventListener('mouseup', function () {
    if (isDragging) {
        isDragging = false; 
    }
});

canvas.addEventListener('mousemove', function (event) {
    if (isDragging) {
        var rect = canvas.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;

        if (isInsideCell(x, y)) {
            var currentTime = new Date().getTime();
            if (currentTime - lastPlayed > debounceTime) {
                slideSound.play();
                lastPlayed = currentTime;
            }
        }
    }
});


