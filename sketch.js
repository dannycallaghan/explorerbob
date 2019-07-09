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


const standardBlue = [87, 172, 230];
		const darkBlue = [51, 103, 127];
		const shadowBlue = [81, 159, 193];
		const lightBlue = [165, 213, 236];
		const skinColor = [248, 226, 87];
		const palmColor = [214, 198, 107];
		const tankOnColor = [255, 255, 255];


		const topHalfX = 35;
		const topHalfY = 88;
		const topHalfWidth = 18;
		const topHalfHeight = 22.5;
		const topHalfDepth = 14;
		const tankDepth = 8;
		const tankHeight = topHalfHeight - 2;

		const bottomHalfX = topHalfX - 3;
		const bottomHalfY = topHalfY + topHalfHeight + 1;
		const bottomHalfWidth = topHalfWidth + 6;
		const bitsWidth = 4;
		const legWidthAtTop = (bottomHalfWidth - bitsWidth) / 2;
		const legWidthAtBottom = legWidthAtTop + 1;

function preload() {
	//img = loadImage('spaceman.png');
  }

function setup()
{
	createCanvas(400, 600);

	background(255);

	//console.warn(img);

	loadImage('spaceman.png', img => {
		//console.warn('here');
		//image(img, 22, 62, 47, 77);
	  });

	//image(img, 10, 10);
}

function mousePressed () {
	console.warn('foo');
console.warn(mouseX, mouseY);
}

function _mousePressed() {

	const foo = document.getElementById('foo');

	foo.value = `${foo.value}vertex(${Math.round(mouseX)}, ${Math.round(mouseY)})\n`;

}



function draw()
{

	// noStroke();
	// fill(81, 159, 193);
	// rect(38.5, 84, 14.5, 4);

	// fill(87, 172, 230);

	// noStroke();
	// ellipse(45.5, 70, 21, 15);
	// rect(35, 68.5, 21, 14.5);

	// ellipse(45.5, 82, 21, 8);
	

	// fill(248, 226, 87);
	// ellipse(38.5, 76, 2, 9);
	// ellipse(53, 76, 2, 9);
	// rect(38.5, 71.5, 14.5, 9);

	// fill(0, 0, 0);
	// ellipse(43, 75.5, 2, 2);
	// ellipse(48, 75.5, 2, 2);
	// //Standing, facing frontwards

	
	
	// noFill();
	// stroke(1)
	// curve(32, 65, 43, 78.5, 48, 78.5, 40, 80);

	

	
	

	// stroke(100);
	// noFill();
	// rect(20, 60, 50, 80);
	// noStroke();
	// fill(0);
	//text("1. standing front facing", 20, 160);

	gameChar_x = 45;
	gameChar_y = 137;
	//Add your code here ...

	drawCharacter(gameChar_x, gameChar_y);

	function drawCharacter (x, y, state) {

		
		//quad(topHalfX - 4, topHalfY + 2, topHalfX + topHalfWidthTop + 4, topHalfY + 2, topHalfX + topHalfWidthTop + 7, topHalfY + 4 + 4, topHalfX - 7, topHalfY + 4 + 4);

		// Body


		

		

		//beginShape();


		// curveVertex(61, 138);
		// curveVertex(60, 113);
		// curveVertex(61, 110);
		// curveVertex(63, 109);
		// curveVertex(66, 110);
		// curveVertex(67, 112);
		// curveVertex(67, 138);

		// vertex(62, 118)
		// bezierVertex(60, 115)
		// bezierVertex(60, 114)
		// bezierVertex(60, 113)
		// bezierVertex(60, 112)
		// bezierVertex(60, 110)
		// bezierVertex(62, 110)
		// bezierVertex(63, 110)
		// bezierVertex(64, 110)
		// bezierVertex(65, 110)
		// bezierVertex(66, 110)
		// bezierVertex(67, 111)
		// bezierVertex(67, 112)
		// bezierVertex(67, 114)
		// bezierVertex(67, 115)
		// bezierVertex(67, 116)

		

  

		
		

		// const base1x = 217;
		// base1y = base1x - 9;
		// base 1

		//console.warn(handPos(217, 1));

		//const a = [217, 208, 178, 162, 272, 161, 233, 209];
  
		

		

		//bezier(217, 208, 178, 162, 272, 161, 233, 209);

		//vertex(80, 120);
		//bezierVertex(30, 75, 80, 75, 80, 0);

		// curveVertex(topHalfX - 30, topHalfY + 91);
		// curveVertex(topHalfX, topHalfY + 31);

		// curveVertex(topHalfX - 6, topHalfY + 28);
		// curveVertex(topHalfX, topHalfY + 28);
		
		// curveVertex(topHalfX - 5, topHalfY + 31);
		// curveVertex(topHalfX + 0, topHalfY + 31);
		//endShape();



		// stroke(...darkBlue);
		// strokeWeight(1);
		// fill(...standardBlue);
		// quad(topHalfX, topHalfY, topHalfX + topHalfWidthTop, topHalfY, (topHalfX + topHalfWidthTop) + 4, topHalfY + topHalfHeight, topHalfX - 4, topHalfY + topHalfHeight);

		
		//vertex(topHalfX, topHalfY + 1);
		//vertex(topHalfX, topHalfY + 9);
		//vertex(topHalfX - 10, topHalfY + 9);
		

		//quad(topHalfX - 4, topHalfY + 2, topHalfX, topHalfY + 2, topHalfX, topHalfY + 10, topHalfX - 10, topHalfY + 10);


		// // Body spacer
		// fill(...darkBlue);
		// quad(topHalfX - 4, topHalfY + topHalfHeight, (topHalfX + topHalfWidthTop) + 4, topHalfY + topHalfHeight, (topHalfX + topHalfWidthTop) + 4, topHalfY + topHalfHeight + 1, topHalfX - 4, topHalfY + topHalfHeight + 1);

		// // Bottom half
		// const bottomHalfX = topHalfX - 3;
		// const bottomHalfY = topHalfY + topHalfHeight + 1;
		// const bottomHalfWidth = topHalfWidthTop + 6;
		// const bitsWidth = 4;
		// const legWidthAtTop = (bottomHalfWidth - bitsWidth) / 2;
		// const legWidthAtBottom = legWidthAtTop + 1;

		// // Pelvis
		// fill(...standardBlue);
		// rect(bottomHalfX, bottomHalfY, bottomHalfWidth, 4);

		// // HIS right top thigh
		// fill(...shadowBlue);
		// rect(bottomHalfX, bottomHalfY + 4, legWidthAtTop, 4);

		// // HIS left top thigh
		// fill(...shadowBlue);
		// rect(bottomHalfX + bottomHalfWidth - legWidthAtTop, bottomHalfY + 4, legWidthAtTop, 4);

		// // HIS right bottom thigh
		// fill(...standardBlue);
		// rect(bottomHalfX, bottomHalfY + 8, legWidthAtTop, 4);

		// // HIS left bottom thigh
		// fill(...standardBlue);
		// rect(bottomHalfX + bottomHalfWidth - legWidthAtTop, bottomHalfY + 8, legWidthAtTop, 4);

		// // HIS right top knee spacer
		// fill(...darkBlue);
		// rect(bottomHalfX, bottomHalfY + 12, legWidthAtTop, 1);
		// fill(...lightBlue);
		// rect(bottomHalfX, bottomHalfY + 13, legWidthAtTop, 0.5);

		// // HIS left top knee spacer
		// fill(...darkBlue);
		// rect(bottomHalfX + bottomHalfWidth - legWidthAtTop, bottomHalfY + 12, legWidthAtTop, 1);
		// fill(...lightBlue);
		// rect(bottomHalfX + bottomHalfWidth - legWidthAtTop, bottomHalfY + 13, legWidthAtTop, 0.5);

		// // HIS right knee
		// fill(...standardBlue);
		// quad(bottomHalfX, bottomHalfY + 13.5, bottomHalfX + legWidthAtBottom, bottomHalfY + 13.5, bottomHalfX + legWidthAtBottom, bottomHalfY + 22, bottomHalfX - 0.5, bottomHalfY + 22);

		// // HIS left knee
		// fill(...standardBlue);
		// quad(bottomHalfX + bottomHalfWidth - legWidthAtBottom, bottomHalfY + 13.5, bottomHalfX + bottomHalfWidth, bottomHalfY + 13.5, bottomHalfX + bottomHalfWidth + 0.5, bottomHalfY + 22, bottomHalfX + bottomHalfWidth - legWidthAtBottom, bottomHalfY + 22);

		// // HIS right bottom knee spacer
		// fill(...darkBlue);
		// rect(bottomHalfX - 0.5, bottomHalfY + 22, legWidthAtBottom + 0.5, 1);
		// fill(...lightBlue);
		// rect(bottomHalfX - 0.5, bottomHalfY + 23, legWidthAtBottom + 0.5, 0.5);

		// // HIS left bottom knee spacer
		// fill(...darkBlue);
		// rect(bottomHalfX + bottomHalfWidth - legWidthAtBottom, bottomHalfY + 22, legWidthAtBottom + 0.5, 1);
		// fill(...lightBlue);
		// rect(bottomHalfX + bottomHalfWidth - legWidthAtBottom, bottomHalfY + 23, legWidthAtBottom + 0.5, 0.5);

		// // His bits
		// stroke(...darkBlue);
		// strokeWeight(0.5);
		// fill(...standardBlue);
		// rect(bottomHalfX + legWidthAtTop, bottomHalfY + 4, 4, 10);
		// noStroke();

		// // HIS right foot
		// fill(...standardBlue);
		// quad(bottomHalfX - 0.5, bottomHalfY + 23.5, bottomHalfX + legWidthAtBottom, bottomHalfY + 23.5, bottomHalfX + legWidthAtBottom, bottomHalfY + 28, bottomHalfX - 1, bottomHalfY + 28);

		// // HIS left foot
		// fill(...standardBlue);
		// quad(bottomHalfX + bottomHalfWidth - legWidthAtBottom, bottomHalfY + 23.5, bottomHalfX + bottomHalfWidth + 0.5, bottomHalfY + 23.5, bottomHalfX + bottomHalfWidth + 1, bottomHalfY + 28, bottomHalfX + bottomHalfWidth - legWidthAtBottom, bottomHalfY + 28);
		
		// His right leg
			// Top thigh
			// fill(255, 0, 255, 2);
			// rect(33, 115, 11, 4);

			// fill(255, 0, 0, 2);
			// rect(33, 119, 11, 4);

			// fill(255, 255, 255, 2);
			// rect(33, 123, 11, 1);

			// fill(0, 255, 0, 2);
			// quad(33, 124, 45, 124, 45, 132, 32.5, 132);

			// fill(255, 255, 255, 2);
			// rect(32.5, 132, 13, 1);

			// fill(0, 0, 255, 2);
			// quad(32.5, 133, 45, 133, 45, 139, 32, 139);



		// var characterWidth = 26;
		// var state = state || '';

		// // Hat
		// var hatYPos = y - 65;
		// if (state.match(/jump/)) {
		// 	hatYPos = y - 70;
		// }
		// fill(223, 39, 59);
		// rect(x - (characterWidth / 2), hatYPos, characterWidth, 5);

		// // Head
		// fill(228, 198, 128);
		// rect(x - (characterWidth / 2), y - 60, characterWidth, 25);

		// // Body
		// fill(223, 39, 59);
		// rect(x - (characterWidth / 2), y - 35, characterWidth, 20);

		// // Legs
		// var legYPos = y - 15;
		// var legXPosR = x + ((characterWidth / 2) - 10);
		// var legXPosL = x - (characterWidth / 2);
		// var legHeighL = 15;
		// var legHeighR = 15;
		// if (state.match('jump')) {
		// 	legYPos = y - 25;
		// }
		// if (state.match('-l')) {
		// 	legXPosR = legXPosR - 4;
		// 	legHeighL = 10;
		// }
		// if (state.match('-r')) {
		// 	legXPosL = legXPosL + 4;
		// 	legHeighR = 10;
		// }
		
		// // Left leg
		// fill(95, 53, 48);
		// rect(legXPosL, legYPos, 10, legHeighL);

		// // Right leg
		// fill(95, 53, 48);
		// rect(legXPosR, legYPos, 10, legHeighR);

		// // Arms
		// var armYPos = y - 38;
		// var armWidthL = 8;
		// var armWidthR = 8;
		// var armXPosR = x + (characterWidth / 2);
		// var armXPosL = x - (characterWidth / 2) - armWidthL;
		// if (state.match('jump')) {
		// 	armYPos = y - 42;
		// }
		// if (state.match('-l')) {
		// 	armWidthL = 4;
		// 	armXPosL = x - (characterWidth / 2) - armWidthL;
		// 	armXPosR = x + ((characterWidth / 2) - 18);
		// }
		// if (state.match('-r')) {
		// 	armWidthR = 4;
		// 	armXPosL = x - (characterWidth / 2) + 10;
		// 	armXPosR = x + (characterWidth / 2);
		// }

		// // Left arm
		// fill(68, 121, 187);
		// rect(armXPosL, armYPos, armWidthL, 20);

		// // Right arm
		// fill(68, 121, 187);
		// rect(armXPosR, armYPos, armWidthR, 20);

		// // Eyes
		// var eyeXPosL = x - (characterWidth / 2) + 8;
		// if (state.match('-l')) {
		// 	eyeXPosL = x - (characterWidth / 2) + 2;
		// }
		// if (state.match('-r')) {
		// 	eyeXPosL = x + (characterWidth / 2) - 12;
		// }

		// // Left eye
		// fill(0);
		// rect(eyeXPosL, y - 55, 4, 4);

		// // Right eye
		// fill(0);
		// rect(eyeXPosL + 6, y - 55, 4, 4);

		// // Mouth
		// var mouthPosLOffset = 6;
		// if (state.match('-l')) {
		// 	mouthPosLOffset = 2;
		// }
		// if (state.match('-r')) {
		// 	mouthPosLOffset = (characterWidth / 2) - 3;
		// }
		// fill(255);
		// triangle(
		// 	x - (characterWidth / 2) + mouthPosLOffset, y - 46,
		// 	x - (characterWidth / 2) + mouthPosLOffset + 14, y - 48,
		// 	x - (characterWidth / 2) + mouthPosLOffset + 14, y - 44
		// );
	}

	// drawCharacter(gameChar_x, gameChar_y);
	
	// //Jumping facing forwards
	// stroke(100);
	// noFill();
	// rect(220, 60, 50, 80);
	// noStroke();
	// fill(0);
	// text("2. jumping facing forwards", 220, 160);

	// gameChar_x = 245;
	// gameChar_y = 137;
	// //Add your code here ...

	// drawCharacter(gameChar_x, gameChar_y, 'jump');

	// //Walking, turned left
	// stroke(100);
	// noFill();
	// rect(20, 260, 50, 80);
	// noStroke();
	// fill(0);
	// text("3. Walking left", 20, 360);

	// gameChar_x = 45;
	// gameChar_y = 337;
	// //Add your code here ...

	// drawCharacter(gameChar_x, gameChar_y, 'walk-l');

	// //Walking, turned right
	// stroke(100);
	// noFill();
	// rect(220, 260, 50, 80);
	// noStroke();
	// fill(0);
	// text("4. Walking right", 220, 360);

	// gameChar_x = 245;
	// gameChar_y = 337;
	// //Add your code here ...

	// drawCharacter(gameChar_x, gameChar_y, 'walk-r');

	// //Jumping right
	// stroke(100);
	// noFill();
	// rect(20, 460, 50, 80);
	// noStroke();
	// fill(0);
	// text("5. Jumping to the right", 20, 560);

	// gameChar_x = 45;
	// gameChar_y = 537;
	// //Add your code here ...

	// drawCharacter(gameChar_x, gameChar_y, 'jump-r');

	// //Jumping to the left
	// stroke(100);
	// noFill();
	// rect(220, 460, 50, 80);
	// noStroke();
	// fill(0);
	// text("6. Jumping to the left", 220, 560);

	// gameChar_x = 245;
	// gameChar_y = 537;
	// //Add your code here ...

	// drawCharacter(gameChar_x, gameChar_y, 'jump-l');


	//renderArm(topHalfX - 2, topHalfY + 1);
	//renderArm(topHalfX + 4, topHalfY + 1, 'front_left');

	
	
	renderBody(topHalfX + 1.5, topHalfY, 'walk-left');
	renderHead(41, 62, 'walk-left');

	renderLegs(44.5, 111, 'walk-left');

	renderArm(topHalfX + 12, topHalfY, 'walk_right');


}

function renderLegs (x, y, state = 'front') {

	if (state.match(/front/)) {

		// Display settings
		fill(...shadowBlue);
		strokeWeight(1);
		stroke(...darkBlue);

		// Top thigh
		rect(x - 0.5, y + 3, bottomHalfWidth, 4);

		// Display settings
		fill(...standardBlue);

		// Bottom thigh
		rect(x - 0.5, y + 7, bottomHalfWidth, 5);

		// Knees
		beginShape();
		vertex(x, y + 12);
		vertex(x + (bottomHalfWidth / 2) - 1, y + 12);
		vertex(x + (bottomHalfWidth / 2) - 1, y + 22);
		vertex(x - 1, y + 22);
		endShape(CLOSE);

		beginShape();
		vertex(x + (bottomHalfWidth / 2) + 1, y + 12);
		vertex(x + bottomHalfWidth, y + 12);
		vertex(x + bottomHalfWidth + 1, y + 22);
		vertex(x + (bottomHalfWidth / 2) + 1, y + 22);
		endShape(CLOSE);

		// Feet
		beginShape();
		vertex(x - 1, y + 22);
		vertex(x + ((bottomHalfWidth / 2) - 1), y + 22);
		vertex(x + ((bottomHalfWidth / 2) - 1), y + 28);
		vertex(x - 2, y + 28);
		endShape(CLOSE);

		beginShape();
		vertex(x + (bottomHalfWidth / 2) + 1, y + 22);
		vertex(x + bottomHalfWidth + 1, y + 22);
		vertex(x + bottomHalfWidth + 2, y + 28);
		vertex(x + (bottomHalfWidth / 2) + 1, y + 28);
		endShape(CLOSE);

		// Pelvis
		beginShape();
		vertex(x, y);
		vertex(x + bottomHalfWidth, y);
		vertex(x + bottomHalfWidth, y + 4);
		vertex(x + (bottomHalfWidth / 2) + 2, y + 4);
		vertex(x + (bottomHalfWidth / 2) + 2, y + 13);
		vertex(x + (bottomHalfWidth / 2) - 2, y + 13);
		vertex(x + (bottomHalfWidth / 2) - 2, y + 4);
		vertex(x, y + 4);
		endShape(CLOSE);

	} else {

		// Display settings
		fill(...standardBlue);
		strokeWeight(1);
		stroke(...darkBlue);

		// Leg and foot
		beginShape();
		vertex(x + 0.5, y + 5);
		vertex(x + 21, y + 5);
		vertex(x + 21, y);
		vertex(x + 27, y);
		vertex(x + 27, y + 14);
		vertex(x + 0.5, y + 14);
		endShape(CLOSE);

		// Pelvis
		beginShape();
		vertex(x, y);
		vertex(x + topHalfDepth, y);
		vertex(x + topHalfDepth, y + 4);
		vertex(x, y + 4);
		endShape(CLOSE);

		// Thigh
		ellipse(x + 7, y + 8, topHalfDepth - 1, topHalfDepth - 1);

		// Leg and foot
		beginShape();
		vertex(x + 0.5, y + 8);
		vertex(x + topHalfDepth - 2, y + 8);
		vertex(x + topHalfDepth - 2, y + 22);
		vertex(x + topHalfDepth + 3, y + 22);
		vertex(x + topHalfDepth + 3, y + 28);
		vertex(x + 0.5, y + 28);
		endShape(CLOSE);

		// Display settings
		fill(...standardBlue);
		noStroke();

		// Cloak
		rect(x + 1, y + 7, 11.5, 3.5);

	}



	// // HIS right top thigh
	// fill(...shadowBlue);
	// rect(x, y + 4, legWidthAtTop, 4);

	// // HIS left top thigh
	// fill(...shadowBlue);
	// rect(x + bottomHalfWidth - legWidthAtTop, y + 4, legWidthAtTop, 4);

	// // HIS right bottom thigh
	// fill(...standardBlue);
	// rect(x, y + 8, legWidthAtTop, 4);

	// // HIS left bottom thigh
	// fill(...standardBlue);
	// rect(x + bottomHalfWidth - legWidthAtTop, y + 8, legWidthAtTop, 4);

	// // HIS right top knee spacer
	// fill(...darkBlue);
	// rect(x, y + 12, legWidthAtTop, 1);
	// fill(...lightBlue);
	// rect(x, y + 13, legWidthAtTop, 0.5);

	// // HIS left top knee spacer
	// fill(...darkBlue);
	// rect(x + bottomHalfWidth - legWidthAtTop, y + 12, legWidthAtTop, 1);
	// fill(...lightBlue);
	// rect(x + bottomHalfWidth - legWidthAtTop, y + 13, legWidthAtTop, 0.5);

	// // HIS right knee
	// fill(...standardBlue);
	// quad(x, y + 13.5, x + legWidthAtBottom, y + 13.5, x + legWidthAtBottom, y + 22, x - 0.5, y + 22);

	// // HIS left knee
	// fill(...standardBlue);
	// quad(x + bottomHalfWidth - legWidthAtBottom, y + 13.5, x + bottomHalfWidth, y + 13.5, x + bottomHalfWidth + 0.5, y + 22, x + bottomHalfWidth - legWidthAtBottom, y + 22);

	// // HIS right bottom knee spacer
	// fill(...darkBlue);
	// rect(x - 0.5, y + 22, legWidthAtBottom + 0.5, 1);
	// fill(...lightBlue);
	// rect(x - 0.5, y + 23, legWidthAtBottom + 0.5, 0.5);

	// // HIS left bottom knee spacer
	// fill(...darkBlue);
	// rect(x + bottomHalfWidth - legWidthAtBottom, y + 22, legWidthAtBottom + 0.5, 1);
	// fill(...lightBlue);
	// rect(x + bottomHalfWidth - legWidthAtBottom, y + 23, legWidthAtBottom + 0.5, 0.5);

	// // His bits
	// stroke(...darkBlue);
	// strokeWeight(0.5);
	// fill(...standardBlue);
	// rect(x + legWidthAtTop, y + 4, 4, 10);
	// noStroke();

	// // HIS right foot
	// fill(...standardBlue);
	// quad(x - 0.5, y + 23.5, x + legWidthAtBottom, y + 23.5, x + legWidthAtBottom, y + 28, x - 1, y + 28);

	// // HIS left foot
	// fill(...standardBlue);
	// quad(x + bottomHalfWidth - legWidthAtBottom, y + 23.5, x + bottomHalfWidth + 0.5, y + 23.5, x + bottomHalfWidth + 1, y + 28, x + bottomHalfWidth - legWidthAtBottom, y + 28);
	
}

function renderHead (x, y, state = 'front') {

	let headWidth = 20;

	// Display settings
	stroke(...darkBlue);
	strokeWeight(1);
	fill(...standardBlue);

	// Curved top and bottom
	ellipse(x + (headWidth / 2) + 0.5, y + 8, headWidth, 15);
	ellipse(x + (headWidth / 2) + 0.5, y + 20, headWidth, 8);

	// Display settings
	noStroke();

	// Main body of the helmet
	rect(x, y + 7, headWidth, 13.5);

	// Display settings
	stroke(...darkBlue);
	strokeWeight(1);

	// Left and right hand side of the main body
	line(x, y + 7, x, 82);
	line(x + headWidth, y + 7, x + headWidth, 82);
	
	// Display settings
	fill(248, 226, 87);

	if (state.match(/front/)) {

		// Left and right curved bits of the visor
		ellipse(x + 3.5, 76.5, 2, 10);
		ellipse(x + 17.5, 76.5, 2, 10);

		// Display settings
		noStroke();

		// Main body of the visor
		rect(x + 3.5, 71.5, 14, 10);

		// Display settings
		stroke(...darkBlue);
		strokeWeight(1);

		// Top and bottom visor
		line(x + 3, 71, x + 3 + 14, 71);
		line(x + 3, 81, x + 3 + 14, 81);

		// Display settings
		fill(0, 0, 0);
		noStroke();
		
		// Eyes
		ellipse(x + 8, y + 13.5, 2, 2);
		ellipse(x + 13, y + 13.5, 2, 2);
		
		// Display settings
		noFill();
		stroke(1)

		// Mouth - smile
		curve(x - 3, y + 3, x + 8, y + 16.5, x + 13, y + 16.5, x + 5, y + 18);

	} else {

		// Left and right curved bits of the visor
		ellipse(x + 12, 76.5, 2, 10);

		// Display settings
		noStroke();

		// Main body of the visor
		rect(x + 12, 71.5, 9, 10);

		// Display settings
		stroke(...darkBlue);
		strokeWeight(1);

		// Top and bottom visor
		line(x + 11.5, 71, x + 20, 71);
		line(x + 11.5, 81, x + 20, 81);

		// Display settings
		fill(0, 0, 0);
		noStroke();
		
		// Eyes
		ellipse(x + 19, y + 13.5, 2, 2);
		
		// Display settings
		noFill();
		stroke(1)

		let xOffSet = 10;

		// Mouth - smile
		curve(x - 3 + xOffSet, y + 3, x + 8.5 + xOffSet, y + 16.5, x + 10.5 + xOffSet, y + 18, x + 5 + xOffSet, y + 18);

	}

}

function renderBody (x, y, state = 'front') {
	
	// Display settings
	stroke(...darkBlue);

	// Tanks
	beginShape();
	if (state.match(/front/)) {
		// Display settings
		fill(...shadowBlue);
		
		vertex(x, y - 3);
		vertex(x + topHalfWidth, y - 3);
		vertex(x + topHalfWidth, y + 10);
		vertex(x, y + 10);
	} else {
		// Display settings
		fill(...standardBlue);

		vertex(x, y - 2);
		vertex(x + tankDepth + topHalfDepth, y - 2);
		vertex(x + tankDepth + topHalfDepth, y - 2 + tankHeight);
		vertex(x + tankDepth, y - 2 + tankHeight);
		vertex(x, y - 2 + tankHeight);
	}
	endShape(CLOSE);

	// Tank tops
	if (!state.match(/front/)) {
		beginShape();
		vertex(x + 2, y - 5);
		vertex(x + 6, y - 5);
		vertex(x + 6, y - 2);
		vertex(x + 2, y - 2);
		endShape(CLOSE);
	}

	// Tank air
	if (state.match(/jump/)) {	
		// Display settings
		fill(...tankOnColor);
		noStroke();

		beginShape();
		vertex(x, y - 1 + tankHeight);
		vertex(x + tankDepth, y - 1 + tankHeight);
		vertex(x + tankDepth / 2, y - 1 + tankHeight + 10);
		endShape(CLOSE);
	}

	// Display settings
	fill(...standardBlue);
	strokeWeight(1);
	stroke(...darkBlue);

	// Torso
	beginShape();
	if (state.match(/front/)) {
		vertex(x, y);
		vertex(x + topHalfWidth, y);
		vertex(x + topHalfWidth + 5, y + topHalfHeight);
		vertex(x - 5, y + topHalfHeight);
	} else {
		vertex(x + tankDepth, y);
		vertex(x + tankDepth + topHalfDepth, y);
		vertex(x + tankDepth + topHalfDepth, y + topHalfHeight);
		vertex(x + tankDepth, y + topHalfHeight);
	}
	endShape(CLOSE);

	const planetLogoMain = [247, 228, 127];
	const planetLogoBorder = [209, 235, 241];
	const planetLogoRed = [206, 45, 33];

	if (state.match(/front/)) {
		// Display settings
		fill(...planetLogoMain);
		strokeWeight(1);
		stroke(...planetLogoBorder);

		// Logo - planet
		ellipse(x + (topHalfHeight / 2) - 4, y + (topHalfWidth / 2) - 1, 8, 8);

		// Display settings
		noFill();
		stroke(...planetLogoRed);

		// Logo - swoosh
		curve(x + 50, y - 28, x + 15, y + 5, x + 2.5, y + 8, x + 70, y - 10);

		// Display settings
		fill(...planetLogoRed);
		noStroke();

		// Logo - ship
		triangle(x + 13, y + 4.5, x + 16, y + 4, x + 15.5, y + 7.5);
	}

}



function renderHand (x, y, state) {
	const setSign = (num) => {
		return state.match('left') ? -Math.abs(num) : Math.abs(num);
	};
	const handPos = (hand_x, hand_y) => {
		return [
			hand_x,
			hand_y - 1,
			(hand_x - 7),
			(hand_y - 8),
			(hand_x + 10),
			(hand_y - 8),
			(hand_x + 3),
			(hand_y - 1)
		];
	};

	// Display settings
	fill(...skinColor);
	stroke(...skinColor);

	if (state.match('front')) {
		// Wrist
		beginShape();
		vertex(x - setSign(7), y + 20);
		vertex(x - setSign(7.5), y + 22);
		vertex(x - setSign(4), y + 22);
		vertex(x - setSign(3.5), y + 20);
		endShape(CLOSE);
	}

	if (state.match('walk')) {
		// Wrist
		beginShape();
		vertex(x - 17, y + 12.5);
		vertex(x - 14.5, y + 15);
		vertex(x - 15, y + 15.5);
		vertex(x - 17.5, y + 13);
		endShape(CLOSE);

		// Wrist
		beginShape();
		vertex(x + 20.5, y - 5);
		vertex(x + 21, y - 5.5);
		vertex(x + 24, y - 3);
		vertex(x + 23.5, y - 2.5);
		endShape(CLOSE);
	}

	// Hand
	switch (state) {
		case 'walk_left':
			// Hand
			rect(x - 0.5, y + 22, 6, 5);
		break;
		case 'walk_right':

			// Helpers
			let helperX = -19;
			let helperY = -13;

			// Hand
			beginShape();
			vertex(x + helperX, y - helperY);
			vertex(x + helperX + 4, y - helperY + 4);
			vertex(x + helperX - 0, y - helperY + 8);
			vertex(x + helperX - 4, y - helperY + 4);
			endShape(CLOSE);

			// Helpers
			helperX = 24.5;
			helperY = 12;
			
			// Hand
			beginShape();
			vertex(x + helperX, y - helperY);
			vertex(x + helperX + 5, y - helperY + 4);
			vertex(x + helperX + 1, y - helperY + 9);
			vertex(x + helperX - 4, y - helperY + 5);
			endShape(CLOSE);

			// Display settings
			fill(...palmColor);
			noStroke();

			// Palm
			beginShape();
			vertex(x + helperX - 1, y - helperY + 0.5);
			vertex(x + helperX + 4.5, y - helperY + 5);
			vertex(x + helperX + 2, y - helperY + 8.5);
			vertex(x + helperX - 4, y - helperY + 4);
			endShape(CLOSE);
		break;
		case 'front_left':
			// Display settings
			noFill();
			strokeWeight(2);
		
			// Hand
			bezier(...handPos(x + 5, y + 29));
		break;
		default: // front_right
			// Display settings
			noFill();
			strokeWeight(2);

			// Hand
			bezier(...handPos(x - 8, y + 29));
	}
}

function renderArm (x, y, state = 'front_right') {
	const setSign = (num) => {
		return state.match('left') ? -Math.abs(num) : Math.abs(num);
	}
	
	// Display settings
	stroke(...darkBlue);
	strokeWeight(1);
	fill(...standardBlue);

	if (state.match('front')) {
		// Arm
		beginShape();
		vertex(x, y);
		vertex(x - setSign(5), y + 8);
		vertex(x - setSign(8), y + 19);
		vertex(x + setSign(2), y + 19);
		vertex(x + setSign(2), y);
		endShape(CLOSE);

		// Hand
		renderHand(x, y, state);
	}

	if (state.match('walk')) {
		
		// Arm
		beginShape();
		vertex(x, y);
		vertex(x - 11, y + 5);
		vertex(x - 17, y + 11);
		vertex(x - 13, y + 15);
		vertex(x - 7, y + 9);
		vertex(x, y + 6);
		endShape(CLOSE);

		// Arm
		beginShape();
		vertex(x + 5, y);
		vertex(x + 15, y);
		vertex(x + 19, y - 5);
		vertex(x + 24, y - 1);
		vertex(x + 18, y + 6);
		vertex(x + 5, y + 6);
		endShape(CLOSE);

		// Hand
		renderHand(x, y, state);

		// y = y + 20;
		// x = x - 20;

		// beginShape();
		// vertex(x - 5, y);
		// vertex(x - 15, y);
		// vertex(x - 19, y - 5);
		// vertex(x - 24, y - 1);
		// vertex(x - 18, y + 6);
		// vertex(x - 5, y + 6);
		// endShape(CLOSE);

		// // Arm
		// beginShape();
		// vertex(x, y);
		// vertex(x + 11, y + 5);
		// vertex(x + 17, y + 11);
		// vertex(x + 13, y + 15);
		// vertex(x + 7, y + 9);
		// vertex(x, y + 6);
		// endShape(CLOSE);
		// vertex(x - setSign(15), y + 11);
		// vertex(x - setSign(12), y + 16);
		// vertex(x - setSign(6), y + 10);
		// vertex(x - setSign(0), y + 7);
		// endShape(CLOSE);
		//vertex(x - setSign(14), y + 10);
		// vertex(x - setSign(7), y + 19);
		// vertex(x, y + 19);
		// vertex(x, y + 10);
		// vertex(x + setSign(8), y + 1);
		// vertex(x + setSign(8), y);
	}

	//endShape(CLOSE);

	
}
