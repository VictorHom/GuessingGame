var myString = "Guess the number. There is 1/100 chance that it is 42, but you probably don't care.";
var myArray = myString.split("");
var loopTimer;
function frameLooper() {
	if(myArray.length > 0) {
		document.getElementById("myTypingText").innerHTML += myArray.shift();
	} else {
		clearTimeout(loopTimer); 
                return false;
	}
	loopTimer = setTimeout('frameLooper()',70);
}
frameLooper();