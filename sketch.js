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


function setup () {
	createCanvas(400, 600);

	background(255);

	loadImage('spaceman.png', img => {
		//image(img, 22, 62, 47, 77);
	});

}

function draw () {

	background(255);

	gameChar_x = 0;
	gameChar_y = 99.5;

	renderCharacter(gameChar_x, gameChar_y, 'walk-left');

}


function renderCharacter (x, y, state) {

	const backLimb = state.match(/right/) ? 'right' : 'left';
	const frontLimb = state.match(/right/) ? 'left' : 'right';

	renderArm(x, y, state, backLimb);
	renderLegs(x, y, state);
	renderBody(x, y, state);
	renderHead(x, y, state);
	renderArm(x, y, state, frontLimb);
	
}

function doRotate (limbType, direction, limb, forward, back, speed = 10) {
	const limbDirOne = forward > back ? 'back' : 'forward';
	const limbDirTwo = forward > back ? 'forward' : 'back';
	const ref = `${limbType}_${direction}_${limb}`;
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

	if (limb === 'left') {
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
	const state = _state;
	const legHeight = 28;
	const xOffset = state.match(/front/) ? 10.5 : 17;
	const y = _y - legHeight;
	const x = _x + xOffset;
	const setSign = (num) => {
		return state.match(/left/) ? Math.abs(num) : -Math.abs(num);
	};

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

		// Display settings
		fill(...standardBlue);
		strokeWeight(1);
		stroke(...darkBlue);

		// Renders pelvis
		function pelvis () {
			beginShape();
			vertex(x, y);
			vertex(x + setSign(topHalfDepth), y);
			vertex(x + setSign(topHalfDepth), y + 5);
			vertex(x, y + 5);
			endShape(CLOSE);
		}

		// Front leg
		push();
			translate(x + setSign(7.5), y + (topHalfDepth / 2) + 1.5);
			if (state.match(/left/)) {
				doRotate('leg', 'left', 'left', 0, 180);
			} else {
				doRotate('leg', 'right', 'right', 180, 360);
			}
			beginShape();
				vertex(0, (topHalfDepth / 2) - 0.5); // 1
				vertex(0, 0 - (topHalfDepth / 2) + 2); // 2
				vertex(0 + setSign(12), 0 - (topHalfDepth / 2) + 2); // 3
				vertex(0 + setSign(12), 0 - (topHalfDepth / 2) - 3); // 4
				vertex(0 + setSign(18), 0 - (topHalfDepth / 2) - 3); // 5
				vertex(0 + setSign(18), 0 - (topHalfDepth / 2) + 14); // 6
				vertex(0, 0 - (topHalfDepth / 2) + 14); // 7
			endShape(CLOSE);
			if (state.match(/left/)) {
				arc(0, 0, topHalfDepth, topHalfDepth, PI - 8, PI + 21.2, OPEN);
			} else {
				arc(0, 0, topHalfDepth, topHalfDepth, PI + 7.11, PI - 20.3, OPEN);
			}
		pop();

		// Pelvis
		pelvis();
		
		// Back leg
		push();
			translate(x + setSign(7.5), y + (topHalfDepth / 2) + 1.5);
			if (state.match(/left/)) {
				doRotate('leg', 'left', 'right', 360, 180);
			} else {
				doRotate('leg', 'right', 'left', 180, 0);
			}
			beginShape();
				vertex(0, (topHalfDepth / 2) - 2); // 1
				vertex(0, 0 - (topHalfDepth / 2)); // 2
				vertex(0 - setSign(18), 0 - (topHalfDepth / 2)); // 2
				vertex(0 - setSign(18), 0 - (topHalfDepth / 2) + 17); // 3
				vertex(0 - setSign(12), 0 - (topHalfDepth / 2) + 17); // 4
				vertex(0 - setSign(12), 0 - (topHalfDepth / 2) + 12); // 5
				vertex(0, 0 - (topHalfDepth / 2) + 12); // 6
			endShape(CLOSE);
			if (state.match(/left/)) {
				arc(0, 0, topHalfDepth, topHalfDepth, PI + 7.6, PI - 19.7, OPEN);
			} else {
				arc(0, 0, topHalfDepth, topHalfDepth, PI - 8.6, PI + 20.6, OPEN);
			}
		pop();

	}

}

function renderHead (_x, _y, _state = 'front') {
	const state = _state;
	const headHeight = 76.5;
	const xOffset = state.match(/front/) ? 12 : 14;
	const y = _y - headHeight;
	const x = _x + xOffset;
	const headWidth = 20;
	const walkOffSet = state.match(/right/) ? 6 : 0;
	const setSign = (num) => {
		return state.match(/right/) ? Math.abs(num) : -Math.abs(num);
	};

	if (state.match(/front/)) {

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
		fill(...skinColor);

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

		// Display settings
		fill(...standardBlue);

		// Main body of helmet
		beginShape();
		vertex(x - setSign(0.5) + walkOffSet, y + 6);
		vertex(x - setSign(20.5) + walkOffSet, y + 6);
		vertex(x - setSign(20.5) + walkOffSet, y + 9);
		vertex(x - setSign(12) + walkOffSet, y + 9);
		vertex(x - setSign(12) + walkOffSet, y + 18.5);
		vertex(x - setSign(21.5) + walkOffSet, y + 18.5);
		vertex(x - setSign(21.5) + walkOffSet, y + 21);
		vertex(x - setSign(0.5) + walkOffSet, y + 21.5);
		endShape(CLOSE);

		// Top and bottom of helmet
		arc(x - setSign(10.5) + walkOffSet, y + 11.5, 22.8, 23, PI - 5.84, PI + 21.55, OPEN);
		arc(x - setSign(11) + walkOffSet, y + 17, 26, 13, PI - 9.12, PI + 12.23, OPEN);

		// Display settings
		fill(...skinColor);
		stroke(...darkBlue);
		
		// Side of visor
		ellipse(x - setSign(12) + walkOffSet, y + 13.5, 2, 9.5);

		// Display settings
		noStroke();

		// Main body of visor
		if (state.match(/left/)) {
			rect(x - setSign(12), y + 9.5, 7, 8.5);
		} else {
			rect(x - setSign(12) - 1, y + 9.5, 7, 8.5);
		}

		// Display settings
		fill(0, 0, 0);
		noStroke();
		
		// Eye
		ellipse(x - setSign(17.5) + walkOffSet, y + 13.5, 2, 2);
		
		// Display settings
		noFill();
		stroke(1)

		// Mouth
		if (state.match(/left/)) {
			line(x - setSign(16) + walkOffSet, y + 16, x - setSign(18) + walkOffSet, y + 16.5);
		} else {
			line(x - setSign(16) + walkOffSet - 1, y + 16, x - setSign(18) + walkOffSet - 1, y + 16.5);
		}

	}

}

function renderBody (_x, _y, _state = 'front') {
	const state = _state;
	const bodyHeight = 50;
	const xOffset = state.match(/front/) ? 13.5 : 9;
	const y = _y - bodyHeight;
	const x = _x + xOffset;
	const tankOffSet = _state.match(/left/) ? 0 : -6;
	const setSign = (num) => {
		return state.match(/left/) ? Math.abs(num) : -Math.abs(num);
	};
	
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
		vertex(x + tankOffSet, y - 2);
		vertex(x + tankOffSet + tankDepth + topHalfDepth, y - 2);
		vertex(x + tankOffSet + tankDepth + topHalfDepth, y - 2 + tankHeight);
		vertex(x + tankOffSet + tankDepth, y - 2 + tankHeight);
		vertex(x + tankOffSet, y - 2 + tankHeight);
	}
	endShape(CLOSE);

	// Tank tops
	if (!state.match(/front/)) {
		beginShape();
		if (state.match(/right/)) {
			vertex(x + 2 + tankDepth, y - 5);
			vertex(x + 6 + tankDepth, y - 5);
			vertex(x + 6 + tankDepth, y - 2);
			vertex(x + 2 + tankDepth, y - 2);
		} else {
			vertex(x + 2, y - 5);
			vertex(x + 6, y - 5);
			vertex(x + 6, y - 2);
			vertex(x + 2, y - 2);
		}
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
		vertex(x + tankDepth + setSign(topHalfDepth), y);
		vertex(x + tankDepth + setSign(topHalfDepth), y + topHalfHeight);
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

}

function renderArm (_x, _y, _state = 'front', _side = 'right') {
	let state = _state;
	let side = _side;
	let armHeight = 49;
	let xOffset = state.match(/front/) ? 11 : 23.5;
	let y = _y - armHeight;
	let x = _x + xOffset;
	const setSign = (num, arm = true) => {
		if (arm) {
			return side.match(/left/) ? Math.abs(num) : -Math.abs(num);
		}
		return state.match(/left/) ? Math.abs(num) : -Math.abs(num);
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
		vertex((x + armOffSet) + setSign(5), y + 8);
		vertex((x + armOffSet) + setSign(8), y + 19);
		vertex((x + armOffSet) - setSign(2), y + 19);
		vertex((x + armOffSet) - setSign(2), y);
		endShape(CLOSE);

		// Hand
		renderHand(x + armOffSet, y, state, side);

		if (side === 'right') {
			renderArm (_x, _y, _state = 'front', _side = 'left');
		}
	}

	if (state.match(/walk/)) {

		if (side.match(/right/)) {

			push();
				// Arm
				if (state.match(/left/)) {
					translate(x - 0.5, y + 5);
				} else {
					translate(x - 14, y + 4);
				}
				doRotate('arm', 'right', 'left', 0, 180);
				beginShape();
					if (state.match(/left/)) {
						vertex(0 + setSign(1.5, false), 0 + setSign(4, false));
						vertex(0 + setSign(7.5, false), 0 + setSign(4, false));
						vertex(0 + setSign(14, false), 0 - setSign(6.5, false));
						vertex(0 + setSign(8, false), 0 - setSign(9.5, false));
						vertex(0 + setSign(4, false), 0 - setSign(5, false));
						vertex(0 + setSign(1.5, false), 0 - setSign(5, false));
					} else {
						vertex(0 - setSign(1.5, false), 0 + setSign(4, false));
						vertex(0 - setSign(7.5, false), 0 + setSign(4, false));
						vertex(0 - setSign(14, false), 0 - setSign(6.5, false));
						vertex(0 - setSign(8, false), 0 - setSign(9.5, false));
						vertex(0 - setSign(4, false), 0 - setSign(5, false));
						vertex(0 - setSign(1.5, false), 0 - setSign(5, false));
					}
				endShape(CLOSE);
				if (state.match(/left/)) {
					arc(1.5, 0 - 0.5, 9.1, 9.1, PI - setSign(4.55), PI + setSign(23.4), OPEN);
				} else {
					arc(1.5, 0 + 0.5, 9.1, 9.1, PI - setSign(4.55), PI + setSign(23.4), OPEN);
				}

				// Display settings
				noStroke();
				fill(...skinColor);

				// Hand
				if (state.match(/right/)) {
					beginShape();
						vertex(0 + 15.5, 0 + 8.5);
						vertex(0 + 8, 0 + 12.5);
						vertex(0 + 12, 0 + 19);
						vertex(0 + 20, 0 + 15.5);
					endShape(CLOSE);

					beginShape();
						vertex(0 + 15, 0 + 9);
						vertex(0 + 10, 0 + 12.5);
						vertex(0 + 8.5, 0 + 9.5);
						vertex(0 + 14, 0 + 7);
					endShape(CLOSE);
				} else {
					beginShape();
						vertex(0 + 15.5, 0 - 8.5);
						vertex(0 + 8, 0 - 12.5);
						vertex(0 + 12, 0 - 19);
						vertex(0 + 20, 0 - 15.5);
					endShape(CLOSE);

					beginShape();
						vertex(0 + 15, 0 - 9);
						vertex(0 + 10, 0 - 12.5);
						vertex(0 + 8.5, 0 - 9.5);
						vertex(0 + 14, 0 - 7);
					endShape(CLOSE);
				}
			pop();

		} else {

			push();
				// Arm
				if (state.match(/left/)) {
					translate(x + 0.5, y + 4);
				} else {
					translate(x - 11.5, y + 5);
				}
				doRotate('arm', 'left', 'right', 360, 180);
				beginShape();
					if (state.match(/left/)) {
						vertex(0 - setSign(1.5, false), 0 - setSign(4, false));
						vertex(0 - setSign(7.5, false), 0 - setSign(4, false));
						vertex(0 - setSign(14, false), 0 + setSign(6.5, false));
						vertex(0 - setSign(8, false), 0 + setSign(9.5, false));
						vertex(0 - setSign(4, false), 0 + setSign(5, false));
						vertex(0 - setSign(1.5, false), 0 + setSign(5, false));
					} else {
						vertex(0 + setSign(1.5, false), 0 - setSign(4, false));
						vertex(0 + setSign(7.5, false), 0 - setSign(4, false));
						vertex(0 + setSign(14, false), 0 + setSign(6.5, false));
						vertex(0 + setSign(8, false), 0 + setSign(9.5, false));
						vertex(0 + setSign(4, false), 0 + setSign(5, false));
						vertex(0 + setSign(1.5, false), 0 + setSign(5, false));
					}
				endShape(CLOSE);
				if (state.match(/left/)) {
					arc(-2.5, 0.5, 9.1, 9.1, PI - setSign(4.6), PI + setSign(23.5), OPEN);
				} else {
					arc(-2.5, -0.5, 9.1, 9.1, PI - setSign(4.6), PI + setSign(23.5), OPEN);
				}

				// Display settings
				noStroke();
				fill(...skinColor);

				// Hand
				if (state.match(/right/)) {
					beginShape();
						vertex(0 - 15.5, 0 - 8.5);
						vertex(0 - 8, 0 - 12.5);
						vertex(0 - 12, 0 - 19);
						vertex(0 - 20, 0 - 15.5);
					endShape(CLOSE);

					beginShape();
						vertex(0 - 15, 0 - 9);
						vertex(0 - 10, 0 - 12.5);
						vertex(0 - 8.5, 0 - 9.5);
						vertex(0 - 14, 0 - 7);
					endShape(CLOSE);
				} else {
					beginShape();
						vertex(0 - 15.5, 0 + 8.5);
						vertex(0 - 8, 0 + 12.5);
						vertex(0 - 12, 0 + 19);
						vertex(0 - 20, 0 + 15.5);
					endShape(CLOSE);

					beginShape();
						vertex(0 - 15, 0 + 9);
						vertex(0 - 10, 0 + 12.5);
						vertex(0 - 8.5, 0 + 9.5);
						vertex(0 - 14, 0 + 7);
					endShape(CLOSE);
				}

				pop();

		}
	}
}