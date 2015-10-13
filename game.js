(function(){
	window.onload = function () {

		//if gamestate is false, the game cannot go on until you reset
		//change the reset button so that user knows to click and reset gamestate
		var gamestate = true;
		var chances = 5;
		var lr = 1;
		var hr = 100;
		var adjustedhr = hr - lr + 1;
		var numr = Math.floor(Math.random()*adjustedhr) + lr;
		alert(numr);
		// given a wrong response, do some quick check to tell if cold or hot.
		//if 20 off in either direction of the generated number, it is bad
		function respondWithCloseness(g) {
			if (Math.abs(numr-g) > 20 ){
				return "you're pretty cold";
			} else {
				return "you're hot, but what's the point?"
			}
			
		}
		//issue if you submit before talking.js completes the text still continues to writes
		function doesNumberToGuessExist() {
			if (gamestate) {
			 	var guess  = parseInt(document.getElementById("number").value, 10);
			 	document.getElementById("myTypingText").innerHTML = "";
				if (guess >= 1 && guess <= 100 ){
			 		if (guess === numr) {
			 			document.getElementById("myTypingText").innerHTML = "big whoop that you guessed it!";
			 			document.getElementById("myTypingText").style.color = "#F9D510";
			 			document.getElementsByClassName("reset")[0].style.color = "#7f0000";
					}else{
						document.getElementById("myTypingText").style.color = "#7f0000";
						document.getElementById("myTypingText").innerHTML = respondWithCloseness(guess);
						var counter = document.getElementById("chances");
						chances = chances - 1;
						counter.innerHTML = chances +"X";
						counter.style.color = "#7f0000";
						if (chances === 0) {
							//game is on lockdown until player reset
							gamestate = false;
							document.getElementsByClassName("reset")[0].style.color = "#7f0000";
						}
					}
				} else {
					// you put in a bad input, you should try again
					document.getElementById("myTypingText").innerHTML = "as expected, you couldn't enter a good input.";
				}
			} else {
				document.getElementById("myTypingText").innerHTML = "reset if that's all you want to use me for. The number was " + numr +".";	
			}
			document.getElementById("number").value = "";
		}

		function resetGame() {
			location.reload();
		}

		function giveHint() {
			if (gamestate) {
				document.getElementById("myTypingText").innerHTML = "Oh what's the point? the number times 2 is " + (2*numr) +".";
			} else {
				document.getElementById("myTypingText").innerHTML = "just reset since your chances are up";
			}
			//do some math on the number and give a hint 
			//it's even and less than your number
		}

		//event to handle the clicks
		document.getElementById("number").onkeydown = function(){
			if (event.keyCode === 13){
				doesNumberToGuessExist();
			}
		}
		document.getElementById("submitb").onclick = function(){
			doesNumberToGuessExist();
		}
		document.getElementsByClassName("reset")[0].onclick = function(){
			resetGame();
		}
		document.getElementsByClassName("hint")[0].onclick = function(){
			giveHint();
		}
}
}());