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
const gameWorldSize = 4000;
const gameWorldOffsetLeft = -500;
const gameWorldStopRight = gameWorldSize + Math.abs(gameWorldOffsetLeft);

// Player settings
let game_score = 0;

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
const runningSpeed = 5;
const jumpingSpeed = 5;
const fallingSpeed = 5;
const ascendSpeed = 5;

// Jumping height
const maxJumpHeight = 120;

// Character
let gameCharStartX = 50;
let gameChar_x;
let gameChar_xInWorld;
let gameChar_y = horizon;
let state = '';
const gameCharacterWidth = 44;
const gameCharacterHeight = 65;
const gameChar_xOffsetR = 40;
const gameChar_xOffsetL = 4;

// Keeps the amount of time Bob's shirt has 'flashed'
let flashed = 0;

// Canyon
let canyonSpikeHeight;
let canyons;
let canyonDetection;

// Mountains
let mountains;

// Clouds
let clouds;

// Trees
let trees;

// Collectables position and status
let collectables = [];
let collectableDetection;
const collectableYPos = [350, 220];
const collectableDistributionInPixels = 300;
const collectableWidth = 50;

// flag
let flag;
const flagFlownPos = horizon - 170;
const flagLocationFromEnd = 100;
let flagPos = horizon;

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
let primaryColorDark = [86, 40, 45];
let skinColor = [228, 198, 128];
let secondaryColor = [68, 121, 187];
let logoColor = [255, 255, 255];
let strokeColor = [0, 0, 0];
let trouserColor = [95, 53, 48];
const eyeColor = [34,139,34];

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
let font;

function preload () {
	title = loadFont('mario.ttf');
	font = loadFont('arcadeclassic.ttf');
}

// Setup
function setup () {

	// Clouds
	clouds = [
		{ x: 140, y: 160, size: 50 },
		{ x: 800, y: 120, size: 30 },
		{ x: 40, y: 40, size: 10, color: [219, 247, 249] }
	];

	// Mountains
	mountains = [
		{ x: 50, size: 30 },
		{ x: 550, size: 50 },
		{ x: 1300, size: 60 },
		{ x: 2000, size: 40 },
		{ x: 2600, size: 30 },
	];

	// Trees
	trees = [
		{ x: 10, bushes: [ { height: 80, rightSideHeight: 0 }, { height: 150, rightSideHeight: 75 }, { height: 100 } ] },
		{ x: 720, bushes: [ { height: 60, rightSideHeight: 0 }, { height: 100, rightSideHeight: 50 }, { height: 60 } ] },
		{ x: 1300, bushes: [ { height: 90, rightSideHeight: 0 }, { height: 120, rightSideHeight: 60 }, { height: 80 } ] },
		{ x: 2160, bushes: [ { height: 50, rightSideHeight: 0 }, { height: 60, rightSideHeight: 30 }, { height: 50 } ] },
		{ x: 2500, bushes: [ { height: 80, rightSideHeight: 0 }, { height: 140, rightSideHeight: 70 }, { height: 60 } ] },
		{ x: 3600, bushes: [ { height: 90, rightSideHeight: 0 }, { height: 120, rightSideHeight: 60 }, { height: 80 } ] }
	];

	// Canyons
	canyons = [
		{ x: 500, width: 120 },
		{ x: 1200, width: 160 },
		{ x: 2000, width: 100 }
	];

	// Collectables
	for (let i = gameWorldOffsetLeft + collectableWidth; i < (gameWorldSize + gameWorldOffsetLeft) - flagLocationFromEnd - gameCharacterWidth; i = i + collectableDistributionInPixels) {
		collectables = collectables.concat([{
			x: parseInt(random(i - collectableDistributionInPixels - collectableWidth, i)),
			y: collectableYPos[Math.round(random(0, 1))],
			size: collectableWidth,
			found: false	
		}])
	}

	// Flag
	flag = {
		x_pos: (gameWorldSize + gameWorldOffsetLeft) - flagLocationFromEnd - gameCharacterWidth,
		isReached: false
	};

	createCanvas(1024, 576);
}

// Draw
function draw () {

	// Set the frame rate
	frameRate(testFrameRate);

	// Set a personal frame rate
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
	renderClouds(clouds);

	// Stop first scroller
	scrollStop();

	// Initialise second scroller for the parallex effect
	scrollStart(scrollSpeedTwo);

	// Draw the mountains
	renderMountains(mountains);

	// Stop second scroller
	scrollStop();

	// Initialise third scroller for the parallex effect
	scrollStart(scrollSpeedThree);

	// Draw the trees
	renderTrees(trees);

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
	renderCanyons(canyons);

	// Draw the collectables
	renderCollectables(collectables);

	// Draw the flag
	renderFlagPole(flag);

	// Check flag status
	checkFlagpole();

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
	if (canyonDetection && canyonDetection.length) {
		plummet();
	}

	// Make Bob react to a collectable
	if (collectableDetection && collectableDetection.length) {
		collect();
	}

	// Draw Bob
	renderCharacter(gameChar_x, gameChar_y, state);

	// Get a hold of Bobs position *in the world*
	gameChar_xInWorld = gameChar_x - scrollPos[scrollPos.length - 1];

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
	gameChar_x = gameCharStartX;
	gameChar_x = gameCharStartX;
	gameChar_y = horizon;
	state = '';
	flashed = 0;

	// Reset Bob's position *in the world*
	gameChar_xInWorld = gameChar_x - scrollPos[scrollPos.length - 1];

	// Reset collectables
	collectableDetection = collectableDetection.map(collectable => {
		collectable.found = false;
		return collectable;
	});

	// Reset scroll positions
	scrollPos = scrollPos.map(pos => 0);

	// Reset player settings
	game_score = 0;
}

// Starts game
function startGame () {
	if (isGameOver) { return; };
	resetGameState();
	isGameStarted = true;
	renderCharacter(gameChar_x, gameChar_y, state);
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
	if (gameChar_x < width * 0.3 && isLeft) {
		if (
			(scrollPos[scrollPos.length - 1] >= 0
			&& scrollPos[scrollPos.length - 1] < Math.abs(gameWorldOffsetLeft))
			|| 
			(scrollPos[scrollPos.length - 1] < 0)
		) {
			scrollPos[speed] += speed;
		}
	}
	if (gameChar_x > width * 0.7 && isRight) {
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
		collectableDetection = collectableDetection || [];
		if (!collectableDetection[i]) {
			collectableDetection = collectableDetection.concat([{
				x1: xPos - 1,
				x2: ((xPos - 1) + (adjustedRatio * 27) + 4),
				y1: yPos - 10 * adjustedRatio,
				y2: ((yPos - 10 * adjustedRatio) + (((yPos - (yPos - 9 * adjustedRatio)) + adjustedRatio * 16) + 5)),
				found: false
			}])
		}
		if (collectableDetection && collectableDetection.length && collectableDetection[i] && collectableDetection[i].found !== true) {
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

// Function to draw the flag pole
function renderFlagPole (data) {
	let x = data.x_pos;
	if (data.isReached) {
		// Raise flag
		if (flagPos > flagFlownPos) {
			flagPos = flagPos - 5;
		}
		push();
		// Flag
		translate(x + 8, flagPos);
		rotate(radians(270));
		// Waistband
		fill(255,182,193);
		rect(1, 0, 57, 10);
		// Body of pants
		fill(255,105,180);
		beginShape()
		vertex(0, 10);
		vertex(60, 10);
		vertex(62, 60);
		vertex(35, 60);
		vertex(30, 30);
		vertex(25, 60);
		vertex(-2, 60);
		endShape(CLOSE);
		// Crotch
		arc(30, 20, 25, 30, PI - 9, PI + 18.45, OPEN);
		// Y front
		line(30, 10, 30, 22);
		line(30, 22, 38, 30);
		line(30, 22, 22, 30);
		// Embroidery
		textSize(20);
		stroke(0);
		strokeWeight(1);
		fill(255);
		text('B', 43, 55);
		pop();
	}
	push();
	// Pole
	rect(x, horizon, 6, -250);
	fill(200, 200, 200);
	noStroke();
	// Pole shadow
	rect(x + 1, horizon, 2, -250);
	fill(255);
	stroke(...strokeColor);
	strokeWeight(1);
	// Pole top
	ellipse(x + 3.5, horizon - 250, 12, 4);
	pop();
}

// Function to draw the instructional game text
function renderGameText () {
	push();

	fill(0, 255, 255);
	stroke(0);
	strokeWeight(2);
	textFont(title);

	// Start text
	const textStartX = width / 2;
	const textStartY = !isGameStarted && !isGameOver ? height / 2 - 50 : -2000;
	textSize(90);
	textAlign(CENTER);

	text(`BOB'S ADVENTURES`, textStartX, textStartY);

	textFont(font);

	//text('CLICK OR PRESS', textStartX, textStartY);
	//text('ANY KEY TO START', textStartX, textStartY + 80);

	// Game over text
	const textGameOverX = width / 2;
	const textGameOverY = isGameOver && !isGameStarted ? height / 2 - 50 : -2000;
	text('GAME OVER', textGameOverX, textGameOverY);

	fill(255);
	textSize(30);

	// Score
	if (isGameStarted) {
		textAlign(LEFT);
		text(`SCORE ${game_score}`, 20, 40);
	}
	
	// High score
	if (isGameStarted) {
		textAlign(RIGHT);
		text(`YOUR HIGH SCORE ${game_score}`, width - 20, 40);
	}

	// High score
	if (isGameStarted) {
		textAlign(CENTER);
		text(`LIVES 3`, width / 2, 40);
	}

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

	//state = 'walk-l';
	//isLeft = true;

	push();

	// Give him dead colors, wings and a halo
	if (isGameOver) {
		primaryColor = [255, 255, 255];
		skinColor = [249, 240, 220];
		secondaryColor = [255, 255, 255];
		logoColor = [100, 100, 100];
		trouserColor = [255, 255, 255];
		arc(x, y - gameCharacterHeight + 10, gameCharacterBodyWidth * 3, 80, PI - 9, PI + 18.45, CHORD);
		noFill();
		stroke(255, 255, 0);
		strokeWeight(4);
		ellipse(x, y - gameCharacterHeight - 16, gameCharacterBodyWidth, 10);
	}

	// Hat
	var hatYPos = y - gameCharacterHeight + 5.5;
	if (isFalling) {
		hatYPos = y - (gameCharacterHeight + 8);
	}
	
	strokeWeight(2);
	stroke(...strokeColor);

	fill(...primaryColor);
	arc(x, hatYPos, gameCharacterBodyWidth, 22, PI - 6.2, PI + 21.9, OPEN);
	fill(...trouserColor);
	if (!isLeft && !isRight) {
		arc(x, hatYPos, gameCharacterBodyWidth, 10, PI - 6.2, PI + 21.9, OPEN);
	}
	if (isLeft) {
		ellipse(x - 10, hatYPos, gameCharacterBodyWidth, 10);
	}
	if (isRight) {
		ellipse((x + gameCharacterBodyWidth) - 16, hatYPos, gameCharacterBodyWidth, 10);
	}

	// Head
	fill(...skinColor);
	rect(x - (gameCharacterBodyWidth / 2), y - 60, gameCharacterBodyWidth, 25);

	fill(...primaryColor);

	// Body
	if (isFound && flashed < 40) {
		if (personalFrameRateCount % 2 === 0) {
			fill(255, 255, 0);
			flashed++;
		} else {
			fill(...primaryColor);
		}
	} else {
		fill(...primaryColor);
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

	// Eyes
	let eyeXPosL = x - (gameCharacterBodyWidth / 2) + 9;
	let pupilXPosL = eyeXPosL;
	
	if (state.match('-l')) {
		eyeXPosL = x - (gameCharacterBodyWidth / 2) + 5;
		pupilXPosL = eyeXPosL - 1.5;
	}
	if (state.match('-r')) {
		eyeXPosL = x + (gameCharacterBodyWidth / 2) - 14;
		pupilXPosL = eyeXPosL + 1.5;
	}

	let pupilYPos = y - 52;
	if (state.match(/jump/)) {
		pupilYPos = y - 53.5;
	}
	if (isFalling) {
		pupilYPos = y - 50.5;
	}

	// Left eye
	stroke(...strokeColor);
	strokeWeight(1);
	fill(255);
	ellipse(eyeXPosL, y - 52, 6, 6);
	noStroke();
	fill(...eyeColor);
	ellipse(pupilXPosL, pupilYPos, 2, 2);

	// Right eye
	stroke(...strokeColor);
	strokeWeight(1);
	fill(255);
	ellipse(eyeXPosL + 9, y - 52, 6, 6);
	noStroke();
	fill(...eyeColor);
	ellipse(pupilXPosL + 9, pupilYPos, 2, 2);

	let mouthXPos = x;
	if (isLeft) {
		mouthXPos = x - 3.5;
	}
	if (isRight) {
		mouthXPos = x + 3.5;
	}

	// Mouth
	fill(...strokeColor);
	noStroke(0);
	if (isGameOver) {
		arc(mouthXPos, y - 38, 16, 16, PI - 6.2, PI + 21.9, OPEN);
	} else {
		if (isJumping) {
			ellipse(mouthXPos, y - 42, 12, 8);
		} else {
			arc(mouthXPos, y - 48, 16, 16, PI - 9, PI + 18.45, OPEN);
		}
	}

	// Arms
	push();
	var armYPos = y - 38;
	var armWidthL = 8;
	var armWidthR = 8;
	var armXPosR = x + (gameCharacterBodyWidth / 2);
	var armXPosL = x - (gameCharacterBodyWidth / 2) - armWidthL;

	if (state.match('jump')) {
		armYPos = y - 42;
	}
	if (state.match('-l')) {
		armXPosR = x + ((gameCharacterBodyWidth / 2) - 14);
	}
	if (state.match('-r')) {
		armXPosL = x - (gameCharacterBodyWidth / 2) + 6;
	}

	if (isJumping) {
		translate(x - (gameCharacterBodyWidth / 2) - armWidthL, y - 38);
		armYPos = 0;
		rotate(radians(180));
	}

	strokeWeight(2);
	stroke(...strokeColor);

	// Left arm
	if (!state.match('-l')) {
		if (isJumping) {
			armXPosL = 0 - armWidthL;
			if (state.match('-r')) {
				armXPosL = 0 - (armWidthL * 3);
			}
		}
		fill(...secondaryColor);
		rect(armXPosL, armYPos, armWidthL, 20);
		arc(armXPosL + 4, armYPos + 1.5, armWidthL, 6, PI - 6.2, PI + 21.9, OPEN);
		fill(...skinColor);
		rect(armXPosL, armYPos + 21, armWidthL, 4);
	}

	// Right arm
	if (!state.match('-r')) {
		if (isJumping) {
			armXPosR = 0 - gameCharacterBodyWidth - (armWidthR * 2);
			if (state.match('-l')) {
				armXPosR = 0 - (armWidthR * 3);
			}
		}
		fill(...secondaryColor);
		rect(armXPosR, armYPos, armWidthR, 20);
		arc(armXPosR + 4, armYPos + 1.5, armWidthR, 6, PI - 6.2, PI + 21.9, OPEN);
		fill(...skinColor);
		rect(armXPosR, armYPos + 21, armWidthR, 4);
	}
	pop();
	
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
		// Add item to canyons detection array
		canyonDetection = canyonDetection || [];
		if (!canyonDetection[i]) {
			canyonDetection = canyonDetection.concat([{
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
		if(gameChar_x < width * ratio) {
			if (gameChar_x < (width - gameCharacterWidth)) {
				gameChar_x += runningSpeed;
			}
		}
		return;
	}
	if (state.match(/-l/)) {
		const ratio = scrollPos[scrollPos.length - 1] === Math.abs(gameWorldOffsetLeft) ? 0 : 0.3;
		if (gameChar_x > width * ratio) {
			gameChar_x -= runningSpeed;
		}
		return;
	}
}

// Function to make Bob jump
function jump () {
	if (gameChar_y > horizon - maxJumpHeight) {
		gameChar_y -= jumpingSpeed;
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
	if (gameChar_y < horizon) {
		gameChar_y += fallingSpeed;
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
	if (gameChar_y > -Math.abs(gameCharacterHeight)) {
		gameChar_y -= ascendSpeed;
		return;
	}
	isGameOver = false;
	isGameStarted = false;
	resetGameState();
	renderGameText();
}

// Fall down a canyon
function doPlummet (canyon) {
	gameChar_x = constrain(
		gameChar_x,
		canyon.x1 + scrollPos[scrollPos.length - 1],
		canyon.x2 + scrollPos[scrollPos.length - 1]
	);
	freezeCharacterState();
	isPlummeting = true;
	if (!isGameOver && gameChar_y < canyonSpikeHeight) {
		gameChar_y += fallingSpeed;
		return;
	}
	ascend();
}

// Detects Bob is over a canyon
function plummet () {
	if (!canyonDetection.length) { return; }
	canyonDetection.map(canyon => {
		// Walking right
		if (
			state === 'walk-r'
			&&
			// x position is more than the left hand side of the canyon
			((gameChar_xInWorld + 11) >= canyon.x1)
			&&
			// x position is less than the right hand side of the canyon
			((gameChar_xInWorld + gameCharacterWidth - 11) <= canyon.x2)
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
			((gameChar_xInWorld + 11) >= canyon.x1)
			&&
			// x position is less that the right hand side of the canyon
			((gameChar_xInWorld + gameCharacterWidth - 11) <= canyon.x2)
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
			((gameChar_xInWorld + 7) >= canyon.x1)
			&&
			// x position is less that the right hand side of the canyon
			((gameChar_xInWorld + gameCharacterWidth - 7) <= canyon.x2)
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
	if (isGameOver) { return; }
	collectableDetection.map(collectable => {
		if (!collectable.found) {
			if (
				( gameChar_xInWorld + gameChar_xOffsetR > collectable.x1 && gameChar_xInWorld < collectable.x2 )
				&&
				( gameChar_y - gameCharacterHeight < collectable.y2 )
				&&
				( gameChar_y > collectable.y1 )
			) {
				collectable.found = true;
				flashed = 0;
				isFound = true;
				game_score += 1;
			}
		}
	})
}

// Function to check the current status of the flag
function checkFlagpole () {
	if (flag.isReached) { return; }
	if ( gameChar_xInWorld + gameChar_xOffsetR > flag.x_pos) {
		flag.isReached = true;	
	}
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
		isLeft = false;
	}

	// Left arrow
	if (keyCode && keyCode === 37) {
		isLeft = true;
		isRight = false;
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