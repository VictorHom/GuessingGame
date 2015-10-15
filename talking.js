
var myString = "There is 1/100 chance that it is 42, but what's the point.";
var myArray = myString.split("");
var loopTimer;
var frameLooper = function() {
	if(myArray.length > 0) {
		document.getElementById("myTypingText").innerHTML += myArray.shift();
	} else {
		clearTimeout(loopTimer); 
                return false;
	}
	loopTimer = setTimeout('frameLooper()',40);
}
frameLooper();

