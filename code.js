/*
   Duck Chase is a simple clicker game that makes ducks appear around the player's screen. The goal of the game
   is to tap as many ducks as you can within 30 seconds. When the ducks are clicked it adds to the player's 
   score.
  */

var score = 0;
var highScore = 0;

setProperty("homeScreen", "background-color", rgb(72, 209, 204));
onEvent("playButton", "click", function( ) {
  playSound("assets/category_animals/duck.mp3", false);
  setScreen("howToScreen");
});
onEvent("button1", "click", function( ) {
  level1();
});
onEvent("backButton", "click", function( ) {
  setScreen("homeScreen");
});


// sets a thirty second timer 
function setTimer(){
  var seconds = 31;
  //the timed loop subtract from the number of seconds for every 1000 milliseconds (1000 miliseconds = 1 second)
  timedLoop(1000, function() {
    seconds = seconds - 1;
    setText("timer",seconds);
    //changes the numbers of the timer to red when the seconds are less than or equal to 10
    if(seconds <= 10){
      setProperty("timer", "text-color", "red");
    }
    
    if(seconds == 0) {
      stopTimedLoop();
      /* 
      When the second reach zero, two buttons appear. The "homeButton" take thes player back to the home page 
      and the "endButton" restarts the game. 
    
      */
      showElement("endButton");
      showElement("homeButton");
      onEvent("endButton", "click", function( ) {
        setScreen("level1");
        hideElement("endButton");
        hideElement("homeButton");
        level1();
      });
      onEvent("homeButton", "click", function( ) {
        setScreen("homeScreen");
        hideElement("endButton");
        hideElement("homeButton");
      });
      
    }
    //The console.log displays the amount of seconds left in the code.
    console.log(seconds + " seconds are left");
  });
}

function addPoints(item){
  //the purple duck adds 10 points to the player's scpre
  if(item == "superDuck"){
    score += 10;
    setText("currentScore",score);
  }else {
    //Clicking the yellow duck only adds five points
    score += 5;
    setText("currentScore", score);
  }
   /*
    This calculates the player's high score. If the score is higher than the current high score, the high score
    will be set to that score.
    */
  if(score > highScore){
    highScore = score;
  }
}

//This function sets the ducks at a random position around the screen
function addDucks(){
  setPosition("duck1", randomNumber(45,125), randomNumber(115,185));
  setPosition("duck3", randomNumber(155,215), randomNumber(115,185));
  setPosition("duck2", randomNumber(50,215), randomNumber(230,265));
  setPosition("duck4", randomNumber(45,110), randomNumber(310,355));
  setPosition("duck5", randomNumber(145,215), randomNumber(310,355));
}

//This function makes the purple "super duck" appear in the game
//I found the example for a timeout command nested in an interval in the documentation of App Lab 
function addSuperDuck(){
  var x = setInterval(function() {
    showElement("superDuck");
    //the position of the duck is set to randomize each time
    setPosition("superDuck", randomNumber(50,215),randomNumber(115, 360));
      setTimeout(function() {
        //the super duck is set to only appear for half a second and then disappear
        hideElement("superDuck");
      }, 1500);
      //clearing the interval prevents the timeout from repeatedly operating
      clearInterval(x);
  }, 1000);
}

/*
  This function make the duck image disappear and then reappear when clicked. It works similar to the 
  "addSuperDuck" function.
 */  
//I found the example for a timeout command nested in an interval in the documentation of App Lab
function duckEffect(item){
  onEvent( item , "click", function( ) {
    var y = setInterval(function() {
      hideElement(item);
        setTimeout(function(){
          showElement(item);
        },500);
       clearInterval(y);
    },250);
    playSound("assets/category_achievements/bubbly_game_achievement_sound.mp3");
    /*
      Each time the duck is clicked points are added to the player's score. The "item" which is the duck image,
      goes through a function called "addPoints".
     */
    addPoints(item);
  });
}

function level1(){
  setScreen("level1");
  //Each time the game is played, the score is reset to zero.
  score = 0;
  setNumber("currentScore", score);
  setNumber("highscore", highScore );
 
  setTimer();
  timedLoop(250,function(){
    for(var i=1; i<=6; i++){
      //this function is called to add the duck to the screen at random coordinates
      addDucks();
    }
  });
  hideElement("superDuck");
  /*
    Every 10 seconds the purple ducks appear onto the screen so the player has the opportunity to gain extra
    points.
  */
  timedLoop(10000,function(){
    addSuperDuck();
  });
  
  /*
    This function adds points and plays a sound each time a yellow duck is clicked. It also makes the duck
    disappear and then reappear.
  */
  duckEffect("duck1");
  duckEffect("duck2");
  duckEffect("duck3");
  duckEffect("duck4");
  duckEffect("duck5");
    
}

