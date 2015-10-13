(function(){
	window.onload = function () {
		//if gamestate is false, the game cannot go on until you reset
		var gamestate = true, chances = 5, lr = 1, hr = 100, guesses = [];
		var adjustedhr = hr - lr + 1;
		var numr = Math.floor(Math.random()*adjustedhr) + lr;
		console.log(numr);

		function booleanWithCloseness(g){
			var a;
			var pop = guesses[guesses.length - 1];
			if (pop === undefined){
				if (Math.abs(numr - g) > 20) {
					a = false;
				} else {
					a = true;
				}
			} else if (Math.abs(numr - g) < Math.abs(numr - pop)) {
				a = true;
			} else {
				a = false;
			}
			return a;			
		}
		// given a wrong response, do some quick check to tell if cold or hot.
		//if 20 off in either direction of the generated number, it is bad
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

		function repeatCheck(g) {
			if (guesses.indexOf(g) > -1) {
				//repeated
				return guesses.join(", ");
			} else {
				return "";
			}
		}

		function updateRepeat(g) {
			
			var guessnode = document.createElement("div"); 
			if (booleanWithCloseness(g) === true){
				guessnode.className = guessnode.className  + " hot";
			} else {
				guessnode.className = guessnode.className  + " cold";

			}
			//is it weird/bad practice since the booleanWithCloseness check has to happen before this push
			guesses.push(g);
			guessnode.innerHTML = g;
			guessnode.className  = guessnode.className + " guessnode";
			document.getElementById("previousguesses").appendChild(guessnode);
		}

		//issue if you submit before talking.js completes the text still continues to writes. unsure how to change
		function doesNumberToGuessExist() {
			if (gamestate) {
			 	var guess  = parseInt(document.getElementById("number").value, 10);
			 	//thought this would help the talking.js problem
			 	document.getElementById("myTypingText").innerHTML = "";
				if (guess >= 1 && guess <= 100 ){
			 		if (guess === numr) {
			 			gamestate == false;
			 			updateMessage("big whoop that you guessed it!","#F9D510");
			 			document.getElementsByClassName("reset")[0].style.color = "#7f0000";
					}else{
						var repeat = repeatCheck(guess);
						console.log(repeat)
						if (repeat === ""){
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
							updateMessage("you have used " + repeat + " already." ,"#7f0000");
						}
					}
				} else {
					// you put in a bad input, you should try again
					document.getElementById("myTypingText").innerHTML = "wrong. it's easier than finding the answer to the universe";
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