/*
#########################################################################
#########################################################################
* Game vars
#########################################################################
#########################################################################
*/
// Dev settings to make things easier
const isTestMode = false; // Can't die in test mode
const testFrameRate = 0; // Override the standard 60fps

// Game frame rate (used for Bob's legs moving and jumper flashing when he finds something) 
let personalFrameRate = 10;
let personalFrameRateCount = 1;
let frameCount = 0;

// Game settings
const gameWorldSize = 3000;
const gameWorldOffsetLeft = -500;
const gameWorldStopRight = gameWorldSize + Math.abs(gameWorldOffsetLeft);

// Scrolling speeds
const scrollSpeedClouds = 0.2;
const scrollSpeedTwo = 2;
const scrollSpeedThree = 3;
const scrollSpeedFour = 5;

// Horizon
const horizon = 435;

// Interactions vars
let isGameStarted = false;
let isGameOver = false;
let isLeft = false;
let isRight = false;
let isFalling = false;
let isPlummeting = false;
let isJumping = false;
let isFound = false;

// Speeds 
let runningSpeed = 5;
let jumpingSpeed = 5;
let fallingSpeed = 5;
let ascendSpeed = 5;

// Jumping height
let maxJumpHeight = 120;

// Character
let gameCharStartX = 50;
let gameCharX;
let gameCharXInWorld;
let gameCharY = horizon;
let state = '';
const gameCharacterWidth = 44;
const gameCharacterHeight = 65;
const gameCharXOffsetR = 40;
const gameCharXOffsetL = 4;

// Keeps the amount of time Bob's shirt has 'flashed'
let flashed = 0;

// Canyon
let canyonSpikeHeight;
let canyons;

// Trees
let trees;

// Collectables position and status
let collectables;

// Colors
const treeColor = [87, 221, 111]; // Tree/bushes
const treeBorderColor = [0, 0, 0]; // Tree/bushes border color
const treeTrunkColor = [119, 69, 17]; // Tree trunk color
const skyColor = [179, 232, 248]; // Sky color
const grassColor = treeColor; // Grass color
const earthColor = [202, 121, 37]; // Earth color
const mountainColor = [183, 209, 216] // Mountain color
const mountainSnowColor = [220, 232, 234] // Mountain snow color
const canyonColor = [166, 190, 198] // The canyon background

// Character colors
let primaryColor = [223, 39, 59];
let skinColor = [228, 198, 128];
let secondaryColor = [68, 121, 187];
let logoColor = [255, 255, 255];
let strokeColor = [0, 0, 0];
let trouserColor = [95, 53, 48];
let eyeColor = [34,139,34];

// Scroll vars
let scrollPos = [];
/*
#########################################################################
*/

/*
#########################################################################
#########################################################################
* P5.js functions
#########################################################################
#########################################################################
*/
// Setup
function setup () {
	createCanvas(1024, 576);
}

// Draw
function draw () {

	// Set the frame rate
	frameRate(testFrameRate);

	// Set a personal frame rate (half the game frame rate)
	// so we can do things slow enough to be visible
	// like Bob's leg's moving and his jumper flashing
	frameCount++;
	if (frameCount % personalFrameRate === 0) {
		frameCount = 0;
		personalFrameRateCount++;
	}

	// Draw the sky
	push();
	background(...skyColor);
	pop();

	// Draw the earth
	push();
	fill(...earthColor);
	rect(gameWorldOffsetLeft, horizon, gameWorldSize, 150); 
	pop();

	// Initialise first scroller for the parallex effect
	scrollStart(scrollSpeedClouds);

	// Draw the clouds
	renderClouds([
		{ x: 140, y: 160, size: 50 },
		{ x: 800, y: 120, size: 30 },
		{ x: 40, y: 40, size: 10, color: [219, 247, 249] }
	]);

	// Stop first scroller
	scrollStop();

	// Initialise second scroller for the parallex effect
	scrollStart(scrollSpeedTwo);

	// Draw the mountains
	renderMountains([
		{ x: 50, size: 30 },
		{ x: 550, size: 50 },
		{ x: 1300, size: 60 },
		{ x: 2000, size: 40 },
		{ x: 2600, size: 30 },
	]);

	// Stop second scroller
	scrollStop();

	// Initialise third scroller for the parallex effect
	scrollStart(scrollSpeedThree);

	// Draw the trees
	renderTrees([
		{ x: 10, bushes: [ { height: 80, rightSideHeight: 0 }, { height: 150, rightSideHeight: 75 }, { height: 100 } ] },
		{ x: 720, bushes: [ { height: 60, rightSideHeight: 0 }, { height: 100, rightSideHeight: 50 }, { height: 60 } ] },
		{ x: 1300, bushes: [ { height: 90, rightSideHeight: 0 }, { height: 120, rightSideHeight: 60 }, { height: 80 } ] },
		{ x: 2160, bushes: [ { height: 50, rightSideHeight: 0 }, { height: 60, rightSideHeight: 30 }, { height: 50 } ] },
		{ x: 2500, bushes: [ { height: 80, rightSideHeight: 0 }, { height: 140, rightSideHeight: 70 }, { height: 60 } ] },
	]);

	// Stop third scroller
	scrollStop();

	// Initialise fourth scroller for the parallex effect
	scrollStart(scrollSpeedFour);
	
	// Draw the grass effect
	renderGrass();

	// The 'floor'
	push();
	stroke(0);
	strokeWeight(2);
	line(gameWorldOffsetLeft, horizon + 1, gameWorldSize, horizon + 1);
	pop();

	// Draw the canyon
	renderCanyons([
		{ x: 500, width: 120 },
		{ x: 1200, width: 120 },
		{ x: 2000, width: 100 }
	]);

	// Draw the collectables
	renderCollectables([
		{ x: 550, y: 294, size: 50, found: false },
		{ x: 1210, y: 294, size: 50, found: false },
		{ x: 1600, y: 394, size: 50, found: false },
		{ x: 2300, y: 394, size: 50, found: false }
	]);

	// Stop fourth scrolling effect
	scrollStop();
	
	/** Interactions: */
	// Reset state
	state = '';

	// Make Bob walk right
	if (isRight) {
		state = 'walk-r';
		walk();
	}

	// Make Bob walk left
	if (isLeft) {
		state = 'walk-l';
		walk();
	}

	// Make Bob jump
	if (isJumping) {
		jump();
	}

	// Make Bob fall
	if (isFalling) {
		fall();
	}

	// Make Bob react to a canyon
	if (canyons && canyons.length) {
		plummet();
	}

	// Make Bob react to a collectable
	if (collectables && collectables.length) {
		collect();
	}

	// Draw Bob
	renderCharacter(gameCharX, gameCharY, state);

	// Get a hold of Bobs position *in the world*
	gameCharXInWorld = gameCharX - scrollPos[scrollPos.length - 1];

	// Draw the game text
	renderGameText();

}
/*
#########################################################################
*/

/*
#########################################################################
#########################################################################
* Game control functions
#########################################################################
#########################################################################
*/
// Freeze the current status of Bob (while he travels to heaven)
function freezeCharacterState () {
	// Reset game vars
	isFalling = false;
	isPlummeting = false;
	isLeft = false;
	isRight = false;
	isJumping = false;
}

// Reset the game's state
function resetGameState () {
	// Reset colours
	primaryColor = [223, 39, 59];
	skinColor = [228, 198, 128];
	secondaryColor = [68, 121, 187];
	logoColor = [255, 255, 255];
	strokeColor = [0, 0, 0];
	trouserColor = [95, 53, 48];

	// Reset game vars
	isFalling = false;
	isPlummeting = false;
	isLeft = false;
	isRight = false;
	isJumping = false;
	isFound = false;

	// Reposition Bob
	gameCharX = gameCharStartX;
	gameCharX = gameCharStartX;
	gameCharY = horizon;
	state = '';
	flashed = 0;

	// Reset Bob's position *in the world*
	gameCharXInWorld = gameCharX - scrollPos[scrollPos.length - 1];

	// Reset collectables
	collectables = collectables.map(collectable => {
		collectable.found = false;
		return collectable;
	});

	// Reset scroll positions
	scrollPos = scrollPos.map(pos => 0);
}

// Starts game
function startGame () {
	if (isGameOver) { return; };
	resetGameState();
	isGameStarted = true;
	renderCharacter(gameCharX, gameCharY, state);
}

/*
#########################################################################
#########################################################################
* Scrolling functions to look after the parallex effect
#########################################################################
#########################################################################
*/
// Scroll start function, for the parallex effect
function scrollStart (speed) {
	if (!scrollPos[speed]) {
		scrollPos[speed] = 0;
	}
	if (gameCharX < width * 0.3 && isLeft) {
		if (
			(scrollPos[scrollPos.length - 1] >= 0
			&& scrollPos[scrollPos.length - 1] < Math.abs(gameWorldOffsetLeft))
			|| 
			(scrollPos[scrollPos.length - 1] < 0)
		) {
			scrollPos[speed] += speed;
		}
	}
	if (gameCharX > width * 0.7 && isRight) {
		if (
			((scrollPos[scrollPos.length - 1] <= 0)
			&&
			((scrollPos[scrollPos.length - 1] - width) >= -Math.abs(gameWorldStopRight - width)))
			||
			(scrollPos[scrollPos.length - 1] > 0)
		) {
			scrollPos[speed] -= speed;
		}
	}
	if (speed < 1) {
		scrollPos[speed] += speed;
	}
	push();
	translate(scrollPos[speed], 0);
}

// Scroll stop (just returns pop)
function scrollStop () {
	return pop();
}

/*
#########################################################################
#########################################################################
* Drawing functions for the various items
#########################################################################
#########################################################################
*/
// Function to draw the clouds
function renderClouds (data) {
	const cloudsDistance = 60;
	for (let i = 0, x = data.length; i < x; i++ ) {
		const adjustedXPos = data[i].x + (cloudsDistance / 2);
		const color = data[i].color || [255, 255, 255];
		const large = data[i].size * 2;
		const small = ((large / 100) * cloudsDistance);
		push();
		noStroke();
		fill(...color);
		// Left circle
		ellipse(adjustedXPos, data[i].y + ((large / 100) * 10), small, small);
		// Centre circle
		ellipse(adjustedXPos + ((large / 100) * cloudsDistance), data[i].y, large, large);
		// Right circle
		ellipse(adjustedXPos + (((large / 100) * cloudsDistance) * 2), data[i].y + ((large / 100) * 10), small, small);
		pop();
	}
}

// Function to draw the trees
function renderTrees (data) {
	const bushWidth = 100;
	const halfBush = bushWidth / 2;
	const quarterBush = halfBush / 2;
	const curveHeight = 50;
	for (let i = 0, x = data.length; i < x; i++ ) {
		push();
		fill(...treeColor);
		stroke(...treeBorderColor);
		strokeWeight(2);
		const xPos = data[i].x + 1; // Adjust for stroke
		const yPos = data[i].y || horizon;
		const bushes = data[i].bushes;
		for (let b = bushes.length - 1; b >= 0; b--) {
			// Curve at the top
			bezier(
			  (b * halfBush) + (xPos + bushWidth), yPos - bushes[b].height,
			  (b * halfBush) + (xPos + (quarterBush * 3)), (yPos - bushes[b].height) - curveHeight,
			  (b * halfBush) + (xPos + quarterBush), (yPos - bushes[b].height) - curveHeight,
			  (b * halfBush) + xPos, yPos - bushes[b].height
			);
			// Background
			noStroke();
			fill(...treeColor);
			rect(
			  (b * halfBush) + xPos,
			  yPos - bushes[b].height,
			  bushWidth,
			  bushes[b].height);
			// Left hand line
			stroke(...treeBorderColor);
			strokeWeight(2);
			line(
			  (b * halfBush) + xPos,
			  yPos - bushes[b].height,
			  (b * halfBush) + xPos,
			  yPos - 1
			);
			// Right hand line
			const _lineHeight = bushes[b].rightSideHeight === undefined ? bushes[b].height : bushes[b].rightSideHeight;
			line(
				(b * halfBush) + (xPos + bushWidth),
				yPos - bushes[b].height,
				(b * halfBush) + (xPos + bushWidth),
				(((yPos - bushes[b].height) + _lineHeight) - 1)
			);
		}
		// Trunks - drawn last so sit above all tress
		for (let p = bushes.length - 1; p >= 0; p--) {
			fill(...treeTrunkColor);
			rect((p * halfBush) + xPos + ((bushWidth - (bushWidth / 4)) / 2), yPos - (bushes[p].height / 4) + 1, bushWidth / 4, bushes[p].height / 4);
			line((p * halfBush) + xPos + ((bushWidth - (bushWidth / 4)) / 2) - (bushWidth / 15), yPos - (bushes[p].height / 4) + 1, ((p * halfBush) + xPos + ((bushWidth - (bushWidth / 4)) / 2) - 5) + (bushWidth / 4) + ((bushWidth / 15) * 2), yPos - (bushes[p].height / 4) + 1);
		}
		// Add item to canyons array
		trees = trees || [];
		if (!trees[i]) {
			trees = trees.concat([{
				x1: xPos,
				x2: xPos + (bushWidth * 2)
			}])
		}
		pop();
	}
}

// Function to draw collectable stars
function renderCollectables (data) {
	const sizeRatio = 25;
	push();
	stroke(0);
	strokeWeight(2);
	fill(255, 255, 0);
	for (let i = 0, x = data.length; i < x; i++ ) {
		const xPos = data[i].x + 1; // Adjust for stroke
		const yPos = data[i].y + 1; // Adjust for stroke
		const size = data[i].size;
		const adjustedRatio = data[i].size <= sizeRatio ? 1 : size / sizeRatio;
		// Add item to collectables array
		collectables = collectables || [];
		if (!collectables[i]) {
			collectables = collectables.concat([{
				x1: xPos - 1,
				x2: ((xPos - 1) + (adjustedRatio * 27) + 4),
				y1: yPos - 10 * adjustedRatio,
				y2: ((yPos - 10 * adjustedRatio) + (((yPos - (yPos - 9 * adjustedRatio)) + adjustedRatio * 16) + 5)),
				found: false
			}])
		}
		if (collectables && collectables.length && collectables[i] && collectables[i].found !== true) {
			beginShape();
			vertex(xPos, yPos); // Point 1
			vertex(xPos + adjustedRatio * 10, yPos); // 2
			vertex(xPos + adjustedRatio * 14, yPos - 9 * adjustedRatio); // 3
			vertex(xPos + adjustedRatio * 17, yPos); // 4
			vertex(xPos + adjustedRatio * 27, yPos); // 5
			vertex(xPos + adjustedRatio * 19, yPos + adjustedRatio * 7); // 6
			vertex(xPos + adjustedRatio * 23, yPos + adjustedRatio * 16); // 7
			vertex(xPos + adjustedRatio * 14, yPos + adjustedRatio * 11); // x
			vertex(xPos + adjustedRatio * 5, yPos + adjustedRatio * 16); // 9
			vertex(xPos + adjustedRatio * 8, yPos + adjustedRatio * 7); // 10
			endShape(CLOSE);
		}
	}
	pop();
}

// Function to draw the instructional game text
function renderGameText () {
	push();

	fill(255, 255, 0);
	stroke(0);
	strokeWeight(2);
	textFont('Impact');

	// Start text
	const textStartX = width / 2;
	const textStartY = !isGameStarted && !isGameOver ? height / 2 - 50 : -2000;
	textSize(80);
	textAlign(CENTER);
	text('PRESS ANY KEY TO START', textStartX, textStartY);

	// Game over text
	const textGameOverX = width / 2;
	const textGameOverY = isGameOver && !isGameStarted ? height / 2 - 50 : -2000;
	text('GAME OVER', textGameOverX, textGameOverY);

	// Restart text
	const textRestartX = width / 2;
	const textRestartY = isGameOver  && !isGameStarted ? height / 2 : -2000;
	textSize(50);
	text('PRESS ANY KEY TO RESTART', textRestartX, textRestartY);

	pop();
}

// Function to draw the mountains
function renderMountains (data) {
	const largeMountainRatio = 3.5;
	const smallMountainRatio = 2.8;
	push();
	noStroke();
	fill(...mountainColor);
	for (let i = 0, x = data.length; i < x; i++ ) {
		const yPos = data[i].y || horizon;
		const firstMountainRatio = i % 2 ? smallMountainRatio : largeMountainRatio;
		const secondMountainRatio = i % 2 ? largeMountainRatio : smallMountainRatio;
		const firstMountainPeak = data[i].size * firstMountainRatio;
		const secondMountainPeak = data[i].size * secondMountainRatio;
		const secondMountainXPos = data[i].x + (data[i].size * secondMountainRatio);
		const snowHeight = 70;
		
		fill(...mountainColor);
		triangle(data[i].x, yPos, firstMountainPeak + data[i].x, yPos - firstMountainPeak, (firstMountainPeak * 2)  + data[i].x, yPos);
		triangle(secondMountainXPos, yPos, secondMountainPeak + secondMountainXPos, yPos - secondMountainPeak, (secondMountainPeak * 2)  + secondMountainXPos, yPos);
	
		fill(...mountainSnowColor);
		triangle(data[i].x + snowHeight, yPos - snowHeight, firstMountainPeak + data[i].x, yPos - firstMountainPeak, ((firstMountainPeak * 2)  + data[i].x) - snowHeight, yPos - snowHeight);
		triangle(secondMountainXPos + snowHeight, yPos - snowHeight, secondMountainPeak + secondMountainXPos, yPos - secondMountainPeak, ((secondMountainPeak * 2)  + secondMountainXPos) - snowHeight, yPos - snowHeight);
	}
	pop();
}

// Function to drawer the character
function renderCharacter (_x, y, _state) {
	const gameCharacterBodyWidth = 26;
	let state = _state || '';
	let x = _x + 22;
	
	// Give him dead colors
	if (isGameOver) {
		primaryColor = [255, 255, 255];
		skinColor = [249, 240, 220];
		secondaryColor = [255, 255, 255];
		logoColor = [100, 100, 100];
		trouserColor = [255, 255, 255];
	}

	// Hat
	var hatYPos = y - gameCharacterHeight;
	if (state.match(/jump/)) {
		hatYPos = y - (gameCharacterHeight + 5);
	}
	push();
	strokeWeight(2);
	stroke(...strokeColor);

	fill(...primaryColor);
	rect(x - (gameCharacterBodyWidth / 2), hatYPos, gameCharacterBodyWidth, 5);

	// Head
	fill(...skinColor);
	rect(x - (gameCharacterBodyWidth / 2), y - 60, gameCharacterBodyWidth, 25);

	// Body
	if (isFound && flashed < 40) {
		if (personalFrameRateCount % 2 === 0) {
			fill(255, 255, 0);
			flashed++;
		} else {
			fill(primaryColor);
		}
	} else {
		fill(primaryColor);
	}

	rect(x - (gameCharacterBodyWidth / 2), y - 35, gameCharacterBodyWidth, 20);
	textSize(19);
	textStyle(BOLD);
	fill(...logoColor);
	let jumperOffset = 0;
	if (state.match(/-l/)) {
		jumperOffset = -7;
	}
	if (state.match(/-r/)) {
		jumperOffset = 7;
	}
	text('B', (x - (gameCharacterBodyWidth / 2)) + 6 + jumperOffset, y - 18);

	// Legs
	var legYPos = y - 15;
	var legXPosR = x + ((gameCharacterBodyWidth / 2) - 10);
	var legXPosL = x - (gameCharacterBodyWidth / 2);
	var legHeighL = 14;
	var legHeighR = 14;
	if (state.match('jump')) {
		legYPos = y - 25;
	}

	if (state.match('-l')) {
		legXPosR = legXPosR - 4;
		if (personalFrameRateCount % 2 === 0) {
			legHeighL = 14;
			legHeighR = 10;
		} else {
			legHeighR = 14;
			legHeighL = 10;
		}
	}
	if (state.match('-r')) {
		legXPosL = legXPosL + 4;
		if (personalFrameRateCount % 2 === 0) {
			legHeighL = 14;
			legHeighR = 10;
		} else {
			legHeighR = 14;
			legHeighL = 10;
		}
	}
	
	// Left leg
	fill(...trouserColor);
	rect(legXPosL, legYPos, 10, legHeighL);

	// Right leg
	fill(...trouserColor);
	rect(legXPosR, legYPos, 10, legHeighR);

	// Arms
	var armYPos = y - 38;
	var armWidthL = 8;
	var armWidthR = 8;
	var armXPosR = x + (gameCharacterBodyWidth / 2);
	var armXPosL = x - (gameCharacterBodyWidth / 2) - armWidthL;
	if (state.match('jump')) {
		armYPos = y - 42;
	}
	if (state.match('-l')) {
		armWidthL = 4;
		armXPosL = x - (gameCharacterBodyWidth / 2) - armWidthL;
		armXPosR = x + ((gameCharacterBodyWidth / 2) - 18);
	}
	if (state.match('-r')) {
		armWidthR = 4;
		armXPosL = x - (gameCharacterBodyWidth / 2) + 10;
		armXPosR = x + (gameCharacterBodyWidth / 2);
	}

	// Left arm
	fill(...secondaryColor);
	rect(armXPosL, armYPos, armWidthL, 20);

	// Right arm
	fill(...secondaryColor);
	rect(armXPosR, armYPos, armWidthR, 20);

	// Eyes
	let eyeXPosL = x - (gameCharacterBodyWidth / 2) + 6;
	let pupilXPosL = eyeXPosL + 2;
	
	if (state.match('-l')) {
		eyeXPosL = x - (gameCharacterBodyWidth / 2) + 2;
		pupilXPosL = eyeXPosL + 1;
	}
	if (state.match('-r')) {
		eyeXPosL = x + (gameCharacterBodyWidth / 2) - 16;
		pupilXPosL = eyeXPosL + 3;
	}

	let pupilYPos = y - 53;
	if (state.match(/jump/)) {
		pupilYPos = y - 54;
	}

	// Left eye
	stroke(...strokeColor);
	strokeWeight(1);
	fill(255);
	rect(eyeXPosL, y - 55, 5, 5);
	noStroke();
	fill(...eyeColor);
	rect(pupilXPosL, pupilYPos, 2, 2);

	// Right eye
	stroke(...strokeColor);
	strokeWeight(1);
	fill(255);
	rect(eyeXPosL + 8, y - 55, 5, 5);
	noStroke();
	fill(...eyeColor);
	rect(pupilXPosL + 8, pupilYPos, 2, 2);

	// Mouth
	if (state.match(/jump/)) {
		let jumpWidth = 11;
		let jumpHeight = 6;
		let jumpXPosDiff = 13;
		let jumpYPosDiff = 43;
		if (state.match(/-/)) {
			jumpWidth = 5;
		}
		if (state.match(/-r/)) {
			jumpXPosDiff = 4;
			jumpYPosDiff = 44;
		}
		if (state.match(/-l/)) {
			jumpXPosDiff = 22;
			jumpYPosDiff = 44;
		}
		fill(...strokeColor);
		noStroke(0);
		ellipse(x + (gameCharacterBodyWidth / 2) - jumpXPosDiff, y - jumpYPosDiff, jumpWidth, jumpHeight);
	} else {
		stroke(...strokeColor);
		strokeWeight(1);
		noFill();
		let mouthPosLOffset = 6;
		if (state.match(/-l/)) {
			mouthPosLOffset = 2;
		}
		if (state.match(/-r/)) {
			mouthPosLOffset = 9;
		}

		const mouthOffSet = isGameOver ? -4 : 4;
		const mouthPosYOffSet = isGameOver ? 4 : 0;

		bezier(
			x - (gameCharacterBodyWidth / 2) + mouthPosLOffset,
			y - (45 - mouthPosYOffSet),
			
			x - (gameCharacterBodyWidth / 2) + mouthPosLOffset + 2,
			(y - (45 - mouthPosYOffSet)) + mouthOffSet,

			x - (gameCharacterBodyWidth / 2) + mouthPosLOffset + 14,
			(y - (45 - mouthPosYOffSet)) + mouthOffSet,

			x - (gameCharacterBodyWidth / 2) + mouthPosLOffset + 15,
			y - (45 - mouthPosYOffSet)
		);
	}
	pop();
}

// Function to draw the grass effect
function renderGrass (data) {
	const yPos = (data && data.y) || horizon;
	push();
	fill(...grassColor);
	rect(gameWorldOffsetLeft, yPos, gameWorldSize, 20);
	stroke(0);
	strokeWeight(2);
	fill(...grassColor);
	for (let grassStartPos = gameWorldOffsetLeft; grassStartPos < (gameWorldSize + gameWorldOffsetLeft); grassStartPos = grassStartPos + 36) {
		bezier(grassStartPos, yPos + 20, grassStartPos + 20, yPos + 40, grassStartPos + 40, yPos + 40, grassStartPos + 60, yPos + 20);
		grassStartPos = grassStartPos + 60;
		bezier(grassStartPos, yPos + 20, grassStartPos + 12, yPos + 35, grassStartPos + 24, yPos + 35, grassStartPos + 36, yPos + 20);
	}
	pop();
}

// Function to draw the canyons
function renderCanyons (data) {
	for (let i = 0, x = data.length; i < x; i++ ) {
		push();
		strokeWeight(0);
		fill(...canyonColor);
		const width = data[i].width > 200 ? 200 : data[i].width;
		const xPos = data[i].x; // Adjust for stroke
		// The drop
		rect(xPos, horizon, width, height - horizon);
		// Left hand border
		strokeWeight(2);
		line(xPos, horizon + 1, xPos, height);
		// Right hand border
		line(xPos + width, horizon + 1, xPos + width, height);
		// Spikes
		fill(255);
		const spikeSize = ((width / 100) * 10) > 10 ? 10 : (width / 100) * 10;
		if (spikeSize > 3) {
			let spikeNum = 0;
			for (let i = 0; i < width - spikeSize; i = i + (spikeSize * 2)) {
				let _xPos = xPos + ((spikeSize * spikeNum) * 2);
				canyonSpikeHeight = height - (3 * spikeSize);
				triangle(_xPos, height - 1, _xPos + spikeSize, canyonSpikeHeight, _xPos + (2 * spikeSize), height - 1);
				spikeNum++;
			}
		}
		// Add item to canyons array
		canyons = canyons || [];
		if (!canyons[i]) {
			canyons = canyons.concat([{
				x1: xPos,
				x2: xPos + width
			}])
		}
		pop();
	}
}
/*
#########################################################################
*/

/*
#########################################################################
#########################################################################
* Functions to make Bob move
#########################################################################
#########################################################################
*/
// Function to make Bob walk
function walk () {
	if (state.match(/-r/)) {
		const ratio = (scrollPos[scrollPos.length - 1] - width) <= -Math.abs(gameWorldStopRight - width) ? 1 : 0.7;
		if(gameCharX < width * ratio) {
			if (gameCharX < (width - gameCharacterWidth)) {
				gameCharX += runningSpeed;
			}
		}
		return;
	}
	if (state.match(/-l/)) {
		const ratio = scrollPos[scrollPos.length - 1] === Math.abs(gameWorldOffsetLeft) ? 0 : 0.3;
		if (gameCharX > width * ratio) {
			gameCharX -= runningSpeed;
		}
		return;
	}
}

// Function to make Bob jump
function jump () {
	if (gameCharY > horizon - maxJumpHeight) {
		gameCharY -= jumpingSpeed;
		isFalling = false;
		if (isRight) {
			state = 'jump-r';
			return;
		}
		if (isLeft) {
			state = 'jump-l';
			return;
		}
		state = 'jump';
		return
	}
	isJumping = false;
	isFalling = true;
}

// Function to make Bob fall
function fall () {
	if (gameCharY < horizon) {
		gameCharY += fallingSpeed;
		return;
	}
	isFalling = false;
	if (state.match('-r')) {
		state = 'walk-r';
		return;
	}
	if (state.match('-l')) {
		state = 'walk-l';
		return;
	}
	state = '';
}

// Function to make Bob die and go to heaven
function ascend ()  {
	isGameOver = true;
	if (gameCharY > -Math.abs(gameCharacterHeight)) {
		gameCharY -= ascendSpeed;
		return;
	}
	isGameOver = false;
	isGameStarted = false;
	resetGameState();
	renderGameText();
}

// Fall down a canyon
function doPlummet (canyon) {
	gameCharX = constrain(
		gameCharX,
		canyon.x1 + scrollPos[scrollPos.length - 1],
		canyon.x2 + scrollPos[scrollPos.length - 1]
	);
	freezeCharacterState();
	isPlummeting = true;
	if (!isGameOver && gameCharY < canyonSpikeHeight) {
		gameCharY += fallingSpeed;
		return;
	}
	ascend();
}

// Detects Bob is over a canyon
function plummet () {
	if (!canyons.length) { return; }
	canyons.map(canyon => {
		// Walking right
		if (
			state === 'walk-r'
			&&
			// x position is more than the left hand side of the canyon
			((gameCharXInWorld + 11) >= canyon.x1)
			&&
			// x position is less than the right hand side of the canyon
			((gameCharXInWorld + gameCharacterWidth - 11) <= canyon.x2)
			&&
			// Isn't falling or jumping
			(!isJumping && !isFalling)
		) {
			doPlummet(canyon);
		}
		// Walking left
		if (
			state === 'walk-l'
			&&
			// x position is more than the left hand side of the canyon
			((gameCharXInWorld + 11) >= canyon.x1)
			&&
			// x position is less that the right hand side of the canyon
			((gameCharXInWorld + gameCharacterWidth - 11) <= canyon.x2)
			&&
			// Isn't falling or jumping
			(!isJumping && !isFalling)
		) {
			doPlummet(canyon);
		}
		// Facing front
		if (
			state === ''
			&&
			// x position is more than the left hand side of the canyon
			((gameCharXInWorld + 7) >= canyon.x1)
			&&
			// x position is less that the right hand side of the canyon
			((gameCharXInWorld + gameCharacterWidth - 7) <= canyon.x2)
			&&
			// Isn't falling or jumping
			(!isJumping && !isFalling)
		) {
			doPlummet(canyon);
		}
	});
}

// Function to call when Bob gets a collectable
function collect () {
	collectables.map(collectable => {
		if (!collectable.found) {
			if (
				( gameCharXInWorld + gameCharXOffsetR > collectable.x1 && gameCharXInWorld < collectable.x2 )
				&&
				( gameCharY - gameCharacterHeight < collectable.y2 )
				&&
				( gameCharY > collectable.y1 )
			) {
				collectable.found = true;
				flashed = 0;
				isFound = true;
			}
		}
	})
}
/*
#########################################################################
*/

/*
#########################################################################
#########################################################################
* User events
#########################################################################
#########################################################################
*/
// Mouse click
function mousePressed () {
	if (isGameOver) { return; }
	if (isPlummeting) { return; }
	startGame();
}

// Key presses
function keyPressed () {
	if (!isGameStarted) {
		startGame();
		return;
	};

	if (isGameOver) { return; }
	if (isPlummeting) { return; }

	// Right arrow
	if (keyCode && keyCode === 39) {
		isRight = true;
	}

	// Left arrow
	if (keyCode && keyCode === 37) {
		isLeft = true;
	}

	// Spacebar or arrow up
	if (keyCode && (keyCode === 32 || keyCode === 38) && !isFalling) {
		isJumping = true;
	}
}

// Key ups
function keyReleased () {
	if (isGameOver) { return; }
	if (isPlummeting) { return; }

	// Right arrow
	if (keyCode && keyCode === 39) {
		isRight = false;
		return;
	}
	// Left arrow
	if (keyCode && keyCode === 37) {
		isLeft = false;
		return;
	}

	// Spacebar or arrow up
	if (keyCode && (keyCode === 32 || keyCode === 38)) {
		isJumping = false;
		isFalling = true;
		return;
	}
}