// var buttonColours = ["red", "blue", "green", "yellow"];

// var gamePattern = [];
// var userClickedPattern = [];

// var started = false;
// var level = 0;

// $(document).keypress(function() {
//   if (!started) {
//     $("#level-title").text("Level " + level);
//     nextSequence();
//     started = true;
//   }
// });

// $(".btn").click(function() {

//   var userChosenColour = $(this).attr("id");
//   userClickedPattern.push(userChosenColour);

//   playSound(userChosenColour);
//   animatePress(userChosenColour);

//   //2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
//   checkAnswer(userClickedPattern.length-1);
// });


// //1. Create a new function called checkAnswer(), it should take one input with the name currentLevel
// function checkAnswer(currentLevel) {

//     //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
//     if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

//       console.log("success");

//       //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
//       if (userClickedPattern.length === gamePattern.length){

//         //5. Call nextSequence() after a 1000 millisecond delay.
//         setTimeout(function () {
//           nextSequence();
//         }, 1000);

//       }

//     } else {

//       console.log("wrong");

//     }

// }

// function nextSequence() {

//   //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
//   userClickedPattern = [];

//   level++;
//   $("#level-title").text("Level " + level);

//   var randomNumber = Math.floor(Math.random() * 4);
//   var randomChosenColour = buttonColours[randomNumber];
//   gamePattern.push(randomChosenColour);

//   $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
//   playSound(randomChosenColour);
// }

// function playSound(name) {
//   var audio = new Audio("sounds/" + name + ".mp3");
//   audio.play();
// }

// function animatePress(currentColor) {
//   $("#" + currentColor).addClass("pressed");
//   setTimeout(function () {
//     $("#" + currentColor).removeClass("pressed");
//   }, 100);
// }


var userClickedPattern = [];

var gamePattern = [];

var buttonColours = ["red" , "blue" , "green" ,"yellow"];

var level = 0;
var started = false;

//Updating h1 inner-text according to level
$(document).keypress(function(){
  if(!started){
    $("#level-title").html("Level "+level);
    nextSequence();
    started = true;
  }
});


//Random colours to array and sound effects to button
function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").html("Level "+level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    animatePress(randomChosenColour);
}

//Pushing user clicked button clour to array and playing sound respectively
$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
   
  checkAnswer(userClickedPattern.length-1);
});

//Change music and colour for WRONG color choice
function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }

  } else {
    console.log("wrong");

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }

}


 //Playing sound effects to buttons
 function  playSound(name){
   var audio = new Audio("./sounds/" + name + ".mp3");
   audio.play();
 }

 //Adding ".pressed" class effect to button 
 function animatePress(currentColor){
      $("#"+currentColor).addClass("pressed");

      setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
      },100);
 }

//Function to start a new game 
function startOver(){
    level = 0 ;
    gamePattern = [];
    started = false;
}