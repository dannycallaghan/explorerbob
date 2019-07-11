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
let personalFrameRate = 10;
let personalFrameRateCount = 1;
let frameCount = 0;

var gameChar_x = 0;
var gameChar_y = 0;


const standardBlue = [87, 172, 230];
const darkBlue = [51, 103, 127];
const shadowBlue = [81, 159, 193];
const lightBlue = [165, 213, 236];
const skinColor = [248, 226, 87];
const palmColor = [214, 198, 107];
const tankOnColor = [255, 255, 255];

const planetLogoMain = [247, 228, 127];
const planetLogoBorder = [209, 235, 241];
const planetLogoRed = [206, 45, 33];


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

const rotatationContainer = {};


function setup()
{
	createCanvas(400, 600);

	background(255);


	loadImage('spaceman.png', img => {
		//image(img, 22, 62, 47, 77);
	  });

	//image(img, 10, 10);

	//legRotateAmountLeft = PI / 2;
	//legRotateAmountRight = (3 * PI) / 2;

}

function mousePressed () {
}

function _mousePressed() {

	const foo = document.getElementById('foo');

	foo.value = `${foo.value}vertex(${Math.round(mouseX)}, ${Math.round(mouseY)})\n`;

}

gameChar_x = 85;

function draw()
{

	background(255);


	frameCount++;
	// if (frameCount % personalFrameRate === 0) {
	// 	frameCount = 0;
	// 	personalFrameRateCount++;
	// }

	stroke(255, 0, 0);
	noFill();
	// translate(width / 2, height / 2);
	// rotate(45);
	rect(20, 60, 50, 80);
	noStroke();
	fill(0);
	text("1. standing front facing", 20, 160);

	
	//gameChar_y = 137;
	//Add your code here ...

	drawCharacter(gameChar_x, gameChar_y);

	function drawCharacter (x, y, state) {

		
	}

	gameChar_x = 40;
	gameChar_y = 100;

	// HEIGHT IS 76.5

	// stroke(255, 0, 0);
	// noFill();
	// rect(20, 60, 50, 80);
	// noStroke();
	// fill(0);
	// text("1. standing front facing", 20, 160);

	let __state = 'walk-left';
	let __side = 'left';
	
	//if (frameCount % 180 === 0) {
		renderLegs(gameChar_x, gameChar_y, __state);
	//}
	
	
	renderArm(gameChar_x, gameChar_y, __state, 'right');
	renderBody(gameChar_x, gameChar_y, __state);
	renderArm(gameChar_x, gameChar_y, __state, 'left');
	renderHead(gameChar_x, gameChar_y, __state);


}


function doRotate (direction, limb, forward, back, speed = 5) {
	const limbDirOne = forward > back ? 'back' : 'forward';
	const limbDirTwo = forward > back ? 'forward' : 'back';
	const ref = `${direction}_${limb}`;
	rotatationContainer[ref] = rotatationContainer[ref] || {};
	rotatationContainer[ref].step = rotatationContainer[ref].forward !== undefined ? rotatationContainer[ref].step : !(forward > back);
	rotatationContainer[ref].forward = rotatationContainer[ref].forward !== undefined ? rotatationContainer[ref].forward : forward;
	rotatationContainer[ref].back = rotatationContainer[ref].back !== undefined ? rotatationContainer[ref].back : back;
	rotatationContainer[ref].speed = rotatationContainer[ref].speed !== undefined ? rotatationContainer[ref].speed : speed;

	 function frontToBack () {
		if (rotatationContainer[ref][limbDirOne] < rotatationContainer[ref][limbDirTwo]) {
			rotatationContainer[ref][limbDirOne] = rotatationContainer[ref][limbDirOne] + rotatationContainer[ref].speed;
			rotate(radians(rotatationContainer[ref][limbDirOne]));
			return;
		}
		rotatationContainer[ref].step = !rotatationContainer[ref].step;
		rotatationContainer[ref].forward = forward;
		rotatationContainer[ref].back = back;
	}

	function backToFront () {
		if (rotatationContainer[ref][limbDirTwo] > rotatationContainer[ref][limbDirOne]) {
			rotatationContainer[ref][limbDirTwo] = rotatationContainer[ref][limbDirTwo] - rotatationContainer[ref].speed;
			rotate(radians(rotatationContainer[ref][limbDirTwo]));
			return;
		}
		rotatationContainer[ref].step = !rotatationContainer[ref].step;
		rotatationContainer[ref].forward = forward;
		rotatationContainer[ref].back = back;
	}

	if (limb === 'right') {
		if (rotatationContainer[ref].step) {
			frontToBack();
		}
		if (!rotatationContainer[ref].step) {
			backToFront();
		}
		return;
	}

	if (!rotatationContainer[ref].step) {
		backToFront();
	}
	if (rotatationContainer[ref].step) {
		frontToBack();
	}
}

function renderLegs (_x, _y, _state = 'front') {
	let state = _state;
	let legHeight = 28;
	let xOffset = state.match(/front/) ? 10.5 : 17;
	let y = _y - legHeight;
	let x = _x + xOffset;
	if (_state.match(/front/)) {

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

		if (state.match(/left/)) {

			// Display settings
			fill(...standardBlue);
			strokeWeight(1);
			stroke(...darkBlue);

			// Renders pelvis
			function pelvis () {
				beginShape();
				vertex(x, y);
				vertex(x + topHalfDepth, y);
				vertex(x + topHalfDepth, y + 5);
				vertex(x, y + 5);
				endShape(CLOSE);
			}

			// Left leg
			push();
				translate(x + 7.5, y + (topHalfDepth / 2) + 1.5);
				doRotate('left', 'right', 0, 180);
				beginShape();
					vertex(0, (topHalfDepth / 2) - 0.5); // 1
					vertex(0, 0 - (topHalfDepth / 2) + 2); // 2
					vertex(0 + 22, 0 - (topHalfDepth / 2) + 2); // 3
					vertex(0 + 22, 0 - (topHalfDepth / 2) - 3); // 4
					vertex(0 + 28, 0 - (topHalfDepth / 2) - 3); // 5
					vertex(0 + 28, 0 - (topHalfDepth / 2) + 14); // 6
					vertex(0, 0 - (topHalfDepth / 2) + 14); // 7
				endShape(CLOSE);
				arc(0, 0, topHalfDepth, topHalfDepth, PI - 8, PI + 21.2, OPEN);
			pop();

			// Pelvis
			pelvis();

			// Right leg
			const offSetX = 1;
			push();
				translate(x + 7.5, y + (topHalfDepth / 2) + 1.5);
				doRotate('left', 'left', 360, 180);
				beginShape();
					vertex(0 - offSetX, (topHalfDepth / 2) - 2); // 1
					vertex(0 - offSetX, 0 - (topHalfDepth / 2)); // 2
					vertex(0 - offSetX - 28, 0 - (topHalfDepth / 2)); // 2
					vertex(0 - offSetX - 28, 0 - (topHalfDepth / 2) + 17); // 3
					vertex(0 - offSetX - 22, 0 - (topHalfDepth / 2) + 17); // 4
					vertex(0 - offSetX - 22, 0 - (topHalfDepth / 2) + 12); // 5
					vertex(0 - offSetX, 0 - (topHalfDepth / 2) + 12); // 6
				endShape(CLOSE);
				arc(0, 0, topHalfDepth, topHalfDepth, PI + 7.6, PI - 19.7, OPEN);
			pop();

		}
	}
}

function renderHead (_x, _y, _state = 'front') {
	let state = _state;
	let headHeight = 76.5;
	let xOffset = state.match(/front/) ? 12 : 14;
	let y = _y - headHeight;
	let x = _x + xOffset;
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

	// Left and right hand side of the main body of the helmet
	line(x, y + 6.5, x, y + 20);
	line(x + headWidth, y + 6.5, x + headWidth, y + 20);
	
	// Display settings
	fill(248, 226, 87);

	if (state.match(/front/)) {

		// Left and right curved bits of the visor
		ellipse(x + 3.5, y + 14.5, 2, 10);
		ellipse(x + 17.5, y + 14.5, 2, 10);

		// Display settings
		noStroke();

		// Main body of the visor
		rect(x + 3.5, y + 9, 14, 10);

		// Display settings
		stroke(...darkBlue);
		strokeWeight(1);

		// Top and bottom visor
		line(x + 3, y + 9, x + 3 + 14, y + 9);
		line(x + 3, y + 19, x + 3 + 14, y + 19);

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
		ellipse(x + 12, y + 14.5, 2, 10);

		// Display settings
		noStroke();

		// Main body of the visor
		rect(x + 12, y + 10, 9, 9);

		// Display settings
		stroke(...darkBlue);
		strokeWeight(1);

		// Top and bottom visor
		line(x + 11.5, y + 9, x + 20, y + 9);
		line(x + 11.5, y + 19, x + 20, y + 19);

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
		curve(x - 3 + xOffSet, y + 5, x + 8.5 + xOffSet, y + 16.5, x + 10.5 + xOffSet, y + 18, x + 5 + xOffSet, y + 17);
	}

}

function renderBody (_x, _y, _state = 'front') {
	let state = _state;
	let bodyHeight = 50;
	let xOffset = state.match(/front/) ? 13.5 : 9;
	let y = _y - bodyHeight;
	let x = _x + xOffset;
	
	// Display settings
	stroke(...darkBlue);
	strokeWeight(1);

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

function renderHand (x, y, state, side) {
	const setSign = (num) => {
		return side.match(/left/) ? -Math.abs(num) : Math.abs(num);
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
	let helperX, helperY;

	// Display settings
	fill(...skinColor);
	stroke(...skinColor);

	if (state.match(/front/)) {
		// Wrist
		beginShape();
		vertex(x - setSign(7), y + 20);
		vertex(x - setSign(7.5), y + 22);
		vertex(x - setSign(4), y + 22);
		vertex(x - setSign(3.5), y + 20);
		endShape(CLOSE);

		// Display settings
		noFill();
		strokeWeight(2);
		
		// Hand
		if (side === 'left') {
			bezier(...handPos(x + 5, y + 29));
		} else {
			bezier(...handPos(x - 8, y + 29));
		}
	}

	if (state.match(/walk/)) {
		if (side.match(/right/)) {
			// Wrist
			beginShape();
			vertex(x + 20.5, y - 5);
			vertex(x + 21, y - 5.5);
			vertex(x + 24, y - 3);
			vertex(x + 23.5, y - 2.5);
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
		}

		if (side.match(/left/)) {
			// Wrist
			beginShape();
			vertex(x - 17, y + 12.5);
			vertex(x - 14.5, y + 15);
			vertex(x - 15, y + 15.5);
			vertex(x - 17.5, y + 13);
			endShape(CLOSE);

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
		}
	}
}

function renderArm (_x, _y, _state = 'front', _side = 'right') {
	let state = _state;
	let side = _side;
	let armHeight = 49;
	let xOffset = state.match(/front/) ? 11 : 23.5;
	let y = _y - armHeight;
	let x = _x + xOffset;

	const setSign = (num) => {
		return side.match(/left/) ? -Math.abs(num) : Math.abs(num);
	}
	
	// Display settings
	stroke(...darkBlue);
	strokeWeight(1);
	fill(...standardBlue);

	if (state.match(/front/)) {

		let armOffSet = side === 'right' ? 0 : 23;

		// Arm
		beginShape();
		vertex((x + armOffSet), y);
		vertex((x + armOffSet) - setSign(5), y + 8);
		vertex((x + armOffSet) - setSign(8), y + 19);
		vertex((x + armOffSet) + setSign(2), y + 19);
		vertex((x + armOffSet) + setSign(2), y);
		endShape(CLOSE);

		// Hand
		renderHand(x + armOffSet, y, state, side);

		if (side === 'right') {
			renderArm (_x, _y, _state = 'front', _side = 'left');
		}
	}

	if (state.match(/walk/)) {
		
		if (side.match(/left/)) {
			// Display settings
			stroke(...darkBlue);
			strokeWeight(1);
			fill(...standardBlue);

			// Arm
			push();
			beginShape();
			vertex(x, y);
			vertex(x - 11, y + 5);
			vertex(x - 17, y + 11);
			vertex(x - 13, y + 15);
			vertex(x - 7, y + 9);
			vertex(x, y + 6);
			endShape(CLOSE);
			pop();

			// Hand
			renderHand(x, y, state, side);
		}

		if (side.match(/right/)) {

			// Display settings
			stroke(...darkBlue);
			strokeWeight(1);
			fill(...standardBlue);

			// Arm
			beginShape();
			vertex(x, y);
			vertex(x + 15, y);
			vertex(x + 19, y - 5);
			vertex(x + 24, y - 1);
			vertex(x + 18, y + 6);
			vertex(x, y + 6);
			endShape(CLOSE);

			// Hand
			renderHand(x, y, state, side);
		}
	}
}