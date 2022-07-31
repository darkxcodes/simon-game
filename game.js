var buttonColors = ["red", "blue", "green", "yellow" ];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function animatePress(currentColor){
 //$('#'+currentColor).addClass('pressed');
 
 $('#'+currentColor).addClass("pressed");
 setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);

}

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function nextSequence() {
    var randomNumber = Math.floor((Math.random()*4));
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $('#'+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    animatePress(randomChosenColor);

    level++;
    $('#level-title').text('level '+level);
}
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        
        if(userClickedPattern.length === gamePattern.length){
        
           setTimeout(nextSequence,1000);
           userClickedPattern=[];
        }
    }
    else {
        playSound('wrong');
        $('body').addClass('game-over');

       setTimeout(function () {
          $("body").removeClass("game-over");
             }, 200);

        $('#level-title').text('Game Over, Click Me to Restart');
        startOver();
    }
    
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern= [];
    started = false;
}


$('.btn').on("click",function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

// $(document).keydown((e)=>{
//     if(started === false){
//         nextSequence();
//         started = true;
//     }
// });

$('h1').click(function(){
    if(started === false){
        nextSequence();
        started = true;
    }
})