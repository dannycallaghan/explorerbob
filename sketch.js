/*

The Game Project

2 - Game character

Use p5 drawing functions such as rect, ellipse, line, triangle and
point to draw the different states of your game character.

Write the code so that your character appears inside the box for each
state.

IMPORTANT: For each box the variables gameChar_x & gameChar_y are set to the bottom
center of the box. You must combine these variables with arithmetic to
determine the position of each shape that you draw. This will later allow
you to adjust the position of your game character.

Each state is worth two marks:

//standing front facing = 2
//jumping facing forwards = 2
//walking left = 2
//walking right = 2
//jumping left and jumping right = 2

0 marks = not a reasonable attempt
1 mark = attempted but it lacks detail and you didn't use gameChar_x and gameChar_y correctly
2 marks = you've used a selction of shape functions and made consistent use of gameChar_x and gameChar_y

WARNING: Do not get too carried away. If you're character takes more than 5 lines
of code to draw then you've probably over done it.

** Only submit your sketch.js **

*/

var gameChar_x = 0;
var gameChar_y = 0;

function setup()
{
	createCanvas(400, 600);
}

function draw()
{
	background(255);

	//Standing, facing frontwards

	stroke(100);
	noFill();
	rect(20, 60, 50, 80);
	noStroke();
	fill(0);
	text("1. standing front facing", 20, 160);

	gameChar_x = 45;
	gameChar_y = 137;
	//Add your code here ...

	function drawCharacter (x, y, state) {
		var characterWidth = 26;
		var state = state || '';

		// Hat
		var hatYPos = y - 65;
		if (state.match(/jump/)) {
			hatYPos = y - 70;
		}
		fill(223, 39, 59);
		rect(x - (characterWidth / 2), hatYPos, characterWidth, 5);

		// Head
		fill(228, 198, 128);
		rect(x - (characterWidth / 2), y - 60, characterWidth, 25);

		// Body
		fill(223, 39, 59);
		rect(x - (characterWidth / 2), y - 35, characterWidth, 20);

		// Legs
		var legYPos = y - 15;
		var legXPosR = x + ((characterWidth / 2) - 10);
		var legXPosL = x - (characterWidth / 2);
		var legHeighL = 15;
		var legHeighR = 15;
		if (state.match('jump')) {
			legYPos = y - 25;
		}
		if (state.match('-l')) {
			legXPosR = legXPosR - 4;
			legHeighL = 10;
		}
		if (state.match('-r')) {
			legXPosL = legXPosL + 4;
			legHeighR = 10;
		}
		
		// Left leg
		fill(95, 53, 48);
		rect(legXPosL, legYPos, 10, legHeighL);

		// Right leg
		fill(95, 53, 48);
		rect(legXPosR, legYPos, 10, legHeighR);

		// Arms
		var armYPos = y - 38;
		var armWidthL = 8;
		var armWidthR = 8;
		var armXPosR = x + (characterWidth / 2);
		var armXPosL = x - (characterWidth / 2) - armWidthL;
		if (state.match('jump')) {
			armYPos = y - 42;
		}
		if (state.match('-l')) {
			armWidthL = 4;
			armXPosL = x - (characterWidth / 2) - armWidthL;
			armXPosR = x + ((characterWidth / 2) - 18);
		}
		if (state.match('-r')) {
			armWidthR = 4;
			armXPosL = x - (characterWidth / 2) + 10;
			armXPosR = x + (characterWidth / 2);
		}

		// Left arm
		fill(68, 121, 187);
		rect(armXPosL, armYPos, armWidthL, 20);

		// Right arm
		fill(68, 121, 187);
		rect(armXPosR, armYPos, armWidthR, 20);

		// Eyes
		var eyeXPosL = x - (characterWidth / 2) + 8;
		if (state.match('-l')) {
			eyeXPosL = x - (characterWidth / 2) + 2;
		}
		if (state.match('-r')) {
			eyeXPosL = x + (characterWidth / 2) - 12;
		}

		// Left eye
		fill(0);
		rect(eyeXPosL, y - 55, 4, 4);

		// Right eye
		fill(0);
		rect(eyeXPosL + 6, y - 55, 4, 4);

		// Mouth
		var mouthPosLOffset = 6;
		if (state.match('-l')) {
			mouthPosLOffset = 2;
		}
		if (state.match('-r')) {
			mouthPosLOffset = (characterWidth / 2) - 3;
		}
		fill(255);
		triangle(
			x - (characterWidth / 2) + mouthPosLOffset, y - 46,
			x - (characterWidth / 2) + mouthPosLOffset + 14, y - 48,
			x - (characterWidth / 2) + mouthPosLOffset + 14, y - 44
		);
	}

	drawCharacter(gameChar_x, gameChar_y);
	
	//Jumping facing forwards
	stroke(100);
	noFill();
	rect(220, 60, 50, 80);
	noStroke();
	fill(0);
	text("2. jumping facing forwards", 220, 160);

	gameChar_x = 245;
	gameChar_y = 137;
	//Add your code here ...

	drawCharacter(gameChar_x, gameChar_y, 'jump');

	//Walking, turned left
	stroke(100);
	noFill();
	rect(20, 260, 50, 80);
	noStroke();
	fill(0);
	text("3. Walking left", 20, 360);

	gameChar_x = 45;
	gameChar_y = 337;
	//Add your code here ...

	drawCharacter(gameChar_x, gameChar_y, 'walk-l');

	//Walking, turned right
	stroke(100);
	noFill();
	rect(220, 260, 50, 80);
	noStroke();
	fill(0);
	text("4. Walking right", 220, 360);

	gameChar_x = 245;
	gameChar_y = 337;
	//Add your code here ...

	drawCharacter(gameChar_x, gameChar_y, 'walk-r');

	//Jumping right
	stroke(100);
	noFill();
	rect(20, 460, 50, 80);
	noStroke();
	fill(0);
	text("5. Jumping to the right", 20, 560);

	gameChar_x = 45;
	gameChar_y = 537;
	//Add your code here ...

	drawCharacter(gameChar_x, gameChar_y, 'jump-r');

	//Jumping to the left
	stroke(100);
	noFill();
	rect(220, 460, 50, 80);
	noStroke();
	fill(0);
	text("6. Jumping to the left", 220, 560);

	gameChar_x = 245;
	gameChar_y = 537;
	//Add your code here ...

	drawCharacter(gameChar_x, gameChar_y, 'jump-l');

}
