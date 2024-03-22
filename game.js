var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function nextSequence() {

    level = level + 1;
    $("#level-title").html("Level " + level);
    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);
    
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

$(".btn").on("click", function(event) {

    var userChosenColour = event.target.id;

    playSound(userChosenColour);
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
    
})

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    var colourSelected = $("#" + currentColour);
    colourSelected.addClass("pressed");

    setTimeout(function() {
        colourSelected.removeClass("pressed");
    }, 100);
}

$(document).keypress(function () { 
    if (!started) {
        $("#level-title").html("Level " + level);
        nextSequence();
        started = true;
    }
});

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
        
    } else {
        var audioWrong = new Audio("sounds/wrong.mp3");
        audioWrong.play();

        $("body").addClass("game-over");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
}

