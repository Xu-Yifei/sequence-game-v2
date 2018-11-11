// Game currently only supports sequences of length up to 9
var sequenceLength = 4;

var sequence = [];
var inputSequence = [];

var level = 0;
var realLevel = 0;

var delayTime = 1000;

var presses = 0;
var tilesOnBoard = 0;
var canClick = false;

var y;

var win = true;
var firstMove = true;

function postPress() 
{
	presses++;

	if(presses > sequenceLength - 1)
	{
		if (win && presses == sequenceLength) 
		{
			realLevel++;
			document.getElementById("score").innerHTML = (realLevel);
		}

		document.removeEventListener('keydown',startClicking);
		canClick = false;
	}
}

function upClick()
{	
	y = document.createElement("IMG");
	y.setAttribute("width", "150");
	y.setAttribute("height", "150");
	y.setAttribute("id", "gameTile")

	if(canClick) 
	{
		if(sequence[presses] == 1) // If correct
			y.setAttribute("src", "assets/arrow-up.png");
		else 
		{
			y.setAttribute("src", "assets/wrong-arrow-up.png");
			canClick = false;
			win = false;
		}

		postPress();
	}
}

function rightClick()
{
	y = document.createElement("IMG");
	y.setAttribute("width", "150");
	y.setAttribute("height", "150");
	y.setAttribute("id", "gameTile")

	if(canClick) 
	{
		if(sequence[presses] == 2) // If correct
			y.setAttribute("src", "assets/arrow-right.png");
		else 
		{
			y.setAttribute("src", "assets/wrong-arrow-right.png");
			canClick = false;
			win = false;
		}

		postPress();
	}
}

function downClick()
{
	y = document.createElement("IMG");
	y.setAttribute("width", "150");
	y.setAttribute("height", "150");
	y.setAttribute("id", "gameTile")

	if(canClick) 
	{
		if(sequence[presses] == 3) // If correct
			y.setAttribute("src", "assets/arrow-down.png");
		else
		{
			y.setAttribute("src", "assets/wrong-arrow-down.png");
			canClick = false;
			win = false;
		}

		postPress();
	}
}

function leftClick()
{
	y = document.createElement("IMG");
	y.setAttribute("width", "150");
	y.setAttribute("height", "150");
	y.setAttribute("id", "gameTile")

	if(canClick) 
	{
		if(sequence[presses] == 4) // If correct
			y.setAttribute("src", "assets/arrow-left.png");
		else
		{
			y.setAttribute("src", "assets/wrong-arrow-left.png");
			canClick = false;
			win = false;
		}

		postPress();
	}
}

function startClicking(event)
{
	if (event.keyCode == 37) 
    {
    	leftClick();
    	tilesOnBoard++;
    	document.getElementById("gameDiv").appendChild(y);
    } 
    else if (event.keyCode == 38)
    {
    	upClick();
    	tilesOnBoard++;
    	document.getElementById("gameDiv").appendChild(y);
    }
    else if (event.keyCode == 39)
    {
    	rightClick();
    	tilesOnBoard++;
    	document.getElementById("gameDiv").appendChild(y);
    }
    else if (event.keyCode == 40)
    {
    	downClick();
    	tilesOnBoard++;
    	document.getElementById("gameDiv").appendChild(y);
    }
}

function drawInput() 
{
	document.addEventListener('keydown', startClicking);
	canClick = true;
}

function cleanTiles() {
	for(var i = 0; i < tilesOnBoard; i++) 
	{
		var blocks = document.getElementById("gameTile");
		blocks.parentNode.removeChild(blocks);
	}

	tilesOnBoard = 0;
}
// To-do
// -Clean up the algorithm for finding points of triangle
// -Find a better looking triangular shape while maintaing consistency of placement with other triangles
//
function drawSequence() 
{
	if(!canClick)
	{
		if(!win)
		{
			reset();
		}

		document.removeEventListener('keydown',startClicking);

		if(level >= 9 && sequenceLength < 8) {
			level = 0;
			sequenceLength++;
		}

		if(!firstMove) 
			cleanTiles();

		firstMove = false;

		tilesOnBoard = sequenceLength;

		presses = 0;

		delayTime = (0.4 * sequenceLength) /  (0.2 * level + 1) * 1000;  

		for (var i = 0; i < sequenceLength; i++) 
		{
			sequence[i] = roll();

			switch(sequence[i]) 
			{
				case 1:
					drawUp();
					// Up arrow
					break;
				case 2:
					drawRight();
					// Right arrow
					break;
				case 3:
					drawDown();
					// Down arrow
					break;
				case 4:
					drawLeft();
					// Left arrow
					break;
				default:
					alert("You've messed up");
			}
		}

		setTimeout(function() {
			cleanTiles();
			drawInput();
		}, delayTime);

		level++;
	}
}

function drawUp() {
	var x = document.createElement("IMG");
	x.setAttribute("src", "assets/arrow-up.png");
	x.setAttribute("width", "150");
	x.setAttribute("height", "150");
	x.setAttribute("id", "gameTile")
	document.getElementById("gameDiv").appendChild(x);
}

function drawRight() {
	var x = document.createElement("IMG");
	x.setAttribute("src", "assets/arrow-right.png");
	x.setAttribute("width", "150");
	x.setAttribute("height", "150");
	x.setAttribute("id", "gameTile")
	document.getElementById("gameDiv").appendChild(x);
}

function drawDown() {
	var x = document.createElement("IMG");
	x.setAttribute("src", "assets/arrow-down.png");
	x.setAttribute("width", "150");
	x.setAttribute("height", "150");
	x.setAttribute("id", "gameTile")
	document.getElementById("gameDiv").appendChild(x);
}

function drawLeft() {
	var x = document.createElement("IMG");
	x.setAttribute("src", "assets/arrow-left.png");
	x.setAttribute("width", "150");
	x.setAttribute("height", "150");
	x.setAttribute("id", "gameTile")
	document.getElementById("gameDiv").appendChild(x);
}

function roll() 
{
	return Math.floor((Math.random() * 4) + 1);
}

function reset() 
{
	level = 0;
	sequenceLength = 4;
	cleanTiles();
	document.getElementById("score").innerHTML = 0;
	realLevel = 0;
	win = true;
}