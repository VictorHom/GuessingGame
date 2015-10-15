(function(){
	window.onload = function () {
		//if gamestate is false, the game cannot go on until you reset
		var gamestate = true, chances = 5, guesses = [];

		//generate the random number
		var numr = (function(){
			var lr = 1, hr = 100;
			var adjustedhr = hr - lr + 1;
			var r = Math.floor(Math.random() * adjustedhr) + lr;
			return r;
		})();

		function booleanWithCloseness(g){
			var a;
			var peek = guesses[guesses.length - 1];
			// true is hot, false is cold
			if (peek === undefined){
				// when there are no guesses ,base closeness on whether you are within 20 of the generated number
				if (Math.abs(numr - g) > 20) {
					a = false;
				} else {
					a = true;
				}
			// compare whether the closeness is closer than previously guessed number
			} else if (Math.abs(numr - g) < Math.abs(numr - peek)) {
				a = true;
			} else {
				a = false;
			}
			return a;			
		}

		// given a wrong response, do some quick check to tell if cold or hot.
		// if 20 off in either direction of the generated number, it is bad
		// return string for the textbox
		function respondWithCloseness(g) {
			if (!booleanWithCloseness(g)) {
				return "you're cold and I don't care.";
			} else {
				return "you're close and I am sad."
			}
		}

		//helper function to update what text is in this element
		function updateMessage(s, sty) {
			document.getElementById("myTypingText").innerHTML = s;
			document.getElementById("myTypingText").style.color = sty;
		}

		// check if the guess was used already
		// return the guessed number if repeat guess, otherwise empty string
		function repeatCheck(g) {
			if (guesses.indexOf(g) > -1) {
				//repeated
				return guesses.join(", ");
			} else {
				return "";
			}
		}

		// modifies the guesses array with new guess
		// create a div to store in our list of guesses
		function updateRepeat(g) {			
			var guessnode = document.createElement("div"); 
			if (booleanWithCloseness(g) === true){
				guessnode.className = guessnode.className  + " hot";
			} else {
				guessnode.className = guessnode.className  + " cold";

			}
			guesses.push(g);
			guessnode.innerHTML = g;
			guessnode.className  = guessnode.className + " guessnode";
			document.getElementById("previousguesses").appendChild(guessnode);
		}

		//issue if you submit before talking.js completes the text still continues to writes. unsure how to change
		function doesNumberToGuessExist() {
			var typingNode = document.getElementById("myTypingText");
			if (gamestate) {
			 	var guess  = parseInt(document.getElementById("number").value, 10);
			 	//thought this would help the talking.js problem
			 	typingNode.innerHTML = "";
				if (guess >= 1 && guess <= 100 ){
			 		if (guess === numr) {
			 			gamestate = false;
			 			updateMessage("Big whoop that you guessed it!","#F9D510");
			 			document.getElementsByClassName("reset")[0].style.color = "#7f0000";
					}else{
						var repeat = repeatCheck(guess);
						// it's a new guess else textbox update tells them it's already used
						if (repeat === ""){
							//update the time line to show past guesses
							updateRepeat(guess);
							updateMessage(respondWithCloseness(guess),"#7f0000");
							var counter = document.getElementById("chances");
							chances = chances - 1;
							counter.innerHTML = chances +"X";
							counter.style.color = "#7f0000";
							if (chances === 0) {
								gamestate = false;
								document.getElementsByClassName("reset")[0].style.color = "#7f0000";
							}
						} else {
							updateMessage("You have used " + repeat + " already." ,"#7f0000");
						}
					}
				} else {
					// you put in a bad input, you should try again
					typingNode.innerHTML = "Bad input. It's easier than finding the answer to the universe";
				}
			} else {
				//game has been set to false since all the chances have been used or game is done already
				typingNode.innerHTML = "Reset if that's all you want to use me for. The number was " + numr +".";	
			}
			//clearing the input box
			document.getElementById("number").value = "";
		}
		//website reload
		function resetGame() {
			location.reload();
		}
		//hint that gives the answer
		function giveHint() {
			var typingNode = document.getElementById("myTypingText");
			if (gamestate) {
				typingNode.innerHTML = "Oh what's the point? the number times 2 is " + (2 * numr) +".";
			} else {
				typingNode.innerHTML = "just reset since your chances are up. You wanted " + numr + ".";
			}
		}

		//event to handle the clicks
		document.getElementById("number_form").onsubmit = function() {
			return false;
		}
		document.getElementById("number").onkeydown = function() {
			if (event.keyCode === 13){
				doesNumberToGuessExist();
			}
		}
		document.getElementById("submitb").onclick = function() {
			doesNumberToGuessExist();
		}
		document.getElementsByClassName("reset")[0].onclick = function() {
			resetGame();
		}
		document.getElementsByClassName("hint")[0].onclick = function() {
			giveHint();
		}
		
	}
}());