// Game frame rate (used for Bob's legs moving)
let personalFrameRate = 10;
let personalFrameRateCount = 1;

// Horizon
const horizon = 432;

// Font
let font;
let textStartX;
let textStartY;

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
let runningSpeed = 4;
let jumpingSpeed = 10;
let fallingSpeed = 5;

// Jumping height
let maxJumpHeight = 190;

// Character
let gameCharStart_x = -500;
let gameCharacterOffSet = 22;
let gameChar_x;
let gameChar_y;
let state = '';
let primaryColor;
let skinColor;
let secondaryColor;
let logoColor;
let strokeColor;
let trouserColor;

// Keeps the amount of time Bob's shirt has 'flashed'
let flashed = 0;

// Canyon
let canyon;
let spikeHeight;

// Tree
let treePos_x;
let treePos_y;

// Collectable
let collectable;

// Cloud
let cloud_1;
let cloud_2;

// Mountain
let mountain;

// Generic stroke width
const strokeWidth = 2;
// Grass effect
let grassStartPos = 0;

// Colors
const treeColor = [87, 221, 111]; // Tree/bushes
const treeBorderColor = [0, 0, 0]; // Tree/bushes border color
const treeTrunkColor = [119, 69, 17]; // Tree trunk color
const skyColor = [179, 232, 248]; // Sky color
const grassColor = treeColor; // Grass color
const earthColor = [202, 121, 37]; // Earth color
const mountainColor = [183, 209, 216] // Mountain color

function preload () {
	font = loadFont('arcadeclassic.ttf');
}

function setup () {

	// Character colors
	primaryColor = color(223, 39, 59);
	skinColor = color(228, 198, 128);
	secondaryColor = color(68, 121, 187);
	logoColor = color(255, 255, 255);
	strokeColor = color(0, 0, 0);
	trouserColor = color(95, 53, 48);

	// Game character.
	gameChar_x = gameCharStart_x;
	gameChar_y = horizon

	// Tree.
	treePos_x = 200;
	treePos_y = horizon;

	// Canyon.
	canyon = {
		x_pos: 500,
		width: 200
	};

	// Collectable.
	collectable = {
		x_pos: 860,
		y_pos: 394,
		size: 50
	};

	// Cloud.
	cloud_1 = {
		x_pos: 140,
		y_pos: 160,
		size: 50,
		color: [255, 255, 255]
	};

	// Cloud.
	cloud_2 = {
		x_pos: 40,
		y_pos: 40,
		size: 10,
		color: [255, 255, 255]
	};

	// Mountain.
	mountain = {
		x_pos: 250,
		y_pos: horizon,
		size: 50
	};

	createCanvas(1024, 576);
}

let frameCount = 0;

function draw () {

	frameRate(120);

	// Set our own framerate;
	frameCount++;
	if (frameCount % personalFrameRate === 0) {
		frameCount = 0;
		personalFrameRateCount++;
	}

	// Sky
	background(...skyColor);

	// Earth
	noStroke();
	fill(...earthColor);
	rect(0, horizon, width, 150); 

	// Grass
	noStroke();
	fill(...grassColor);
	rect(0, horizon, width, 20);
	stroke(0);
	strokeWeight(strokeWidth);
	fill(...grassColor);
	for (let grassStartPos = 0; grassStartPos < width; grassStartPos = grassStartPos + 36) {
		bezier(grassStartPos, horizon + 20, grassStartPos + 20, horizon + 40, grassStartPos + 40, horizon + 40, grassStartPos + 60, horizon + 20);
		grassStartPos = grassStartPos + 60;
		bezier(grassStartPos, horizon + 20, grassStartPos + 12, horizon + 35, grassStartPos + 24, horizon + 35, grassStartPos + 36, horizon + 20);
	}
	
	// Mountains
	renderMountain({
		xPos: mountain.x_pos,
		yPos: mountain.y_pos,
		size: mountain.size
	});

	// Cloud 1
	if (cloud_1.x_pos > width + cloud_1.size) {
		cloud_1.x_pos = -3 * cloud_1.size;
	}
	renderCloud({
		xPos: cloud_1.x_pos++,
		yPos: cloud_1.y_pos,
		size: cloud_1.size,
		color: [255, 255, 255]
	});

	// Cloud 2
	if (cloud_2.x_pos > width + cloud_2.size) {
		cloud_2.x_pos = -3 * cloud_2.size;
	}
	renderCloud({
		xPos: cloud_2.x_pos = cloud_2.x_pos + 0.5,
		yPos: cloud_2.y_pos,
		size: cloud_2.size,
		color: [219, 247, 249]
	});

	// Trees
	renderBushes({
		xPos: treePos_x,
		yPos: treePos_y,
		totalBushWidth: 300,
		curveHeight: 50,
		strokeWidth: strokeWidth,
		bushes: [
		  {
			height: 80,
			lineHeight: 0
		  },
		  {
			height: 150,
			lineHeight: 75
		  },
		  {
			height: 100,
		  }
		]
	});
	
	// The 'floor'
	stroke(0);
	strokeWeight(strokeWidth);
	line(0, horizon + 1, width, horizon + 1);

	// Canyon
	renderCanyon({
		xPos: canyon.x_pos,
		width: canyon.width
	});

	// Collectable/star
	if (!isFound) {
		renderCollectable({
			xPos: collectable.x_pos,
			yPos: collectable.y_pos,
			size: collectable.size
		});
	}

	// Bob	
	renderCharacter(gameChar_x, gameChar_y, state);

	// Make Bob fall
	if (isFalling) {
		if (gameChar_y < horizon) {
			gameChar_y += fallingSpeed;
		} else {
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
	}

	// Make Bob jump
	if (isJumping) {
		if (gameChar_y > horizon - maxJumpHeight) {
			gameChar_y -= jumpingSpeed;
		} else {
			isJumping = false;
			isFalling = true;
		}
		if (isRight && gameChar_x <= width - gameCharacterOffSet) {
			gameChar_x += runningSpeed;
			state = 'jump-r';
			return;
		}
		if (isLeft && gameChar_x >= gameCharacterOffSet) {
			gameChar_x -= runningSpeed;
			state = 'jump-l';
			return;
		}
		state = 'jump';
	}

	// Make Bob walk right {
	if (isRight && gameChar_x < width - gameCharacterOffSet) {
		state = 'walk-r';
		gameChar_x += runningSpeed;
	}

	// Make Bob walk left {
	if (isLeft && gameChar_x > gameCharacterOffSet) {
		state = 'walk-l';
		gameChar_x -= runningSpeed;
	}

	// Make Bob die
	if (
		(gameChar_x >= canyon.x_pos + (gameCharacterOffSet - 12))
		&&
		(gameChar_x <= ((canyon.x_pos + canyon.width) - (gameCharacterOffSet - 14)))
		&&
		(!isJumping && !isFalling)
	) {
		isPlummeting = true;
		if (gameChar_x <= canyon.x_pos + 24) {
			gameChar_x = canyon.x_pos + 24;
		}
		if (state.match('-l')) {
			state = 'jump-l';
		}
		if (state.match('-r')) {
			state = 'jump-r';
		}
		if (!isGameOver && gameChar_y < spikeHeight) {
			console.warn(3);
			gameChar_y += fallingSpeed;
		} else {
			state = '';
			isGameOver = true;
			isGameStarted = false;
			isRight = false;
			isLeft = false;
			isJumping = false;
			isFalling = false;
			isPlummeting = false;
			gameChar_y = gameChar_y - 5;
			gameChar_x = gameChar_x;
		}
	}

	// Make Bob get a collectable
	if (
		gameChar_x > (collectable.x_pos - (collectable.size / 2))
		&&
		gameChar_x < (collectable.x_pos + (collectable.size + collectable.size / 2))
	) {
		isFound = true;
	}

	// Game text
	textStartX = width / 2;
	textStartY = !isGameStarted && !isGameOver ? height / 2 - 50 : -2000;

	textGameOverX = width / 2;
	textGameOverY = isGameOver && !isGameStarted ? height / 2 - 50 : -2000;

	textRestartX = width / 2;
	textRestartY = isGameOver  && !isGameStarted ? height / 2 : -2000;

	fill(255, 255, 0);
	textFont(font);
	textSize(80);
	textAlign(CENTER);
	text('PRESS ANY KEY TO START', textStartX, textStartY);

	text('GAME OVER', textGameOverX, textGameOverY);

	textSize(50);
	text('PRESS ANY KEY TO RESTART', textRestartX, textRestartY);

}

// Function to drawer the character
function renderCharacter (x, y, _state) {
	let state = _state || '';
	const gameCharacterWidth = 26;
	const gameCharacterStrokeWidth = 2;

	if (isGameOver) {
		primaryColor = color(255);
		skinColor = color(249, 240, 220);
		secondaryColor = color(255);
		logoColor = color(100, 100, 100);
		trouserColor = color(255);
	}

	// Hat
	var hatYPos = y - 65;
	if (state.match(/jump/)) {
		hatYPos = y - 70;
	}
	strokeWeight(gameCharacterStrokeWidth);

	fill(primaryColor);
	rect(x - (gameCharacterWidth / 2), hatYPos, gameCharacterWidth, 5);

	// Head
	fill(skinColor);
	rect(x - (gameCharacterWidth / 2), y - 60, gameCharacterWidth, 25);

	// Body
	if (isFound && flashed < 40) {
		console.warn('1');
		if (personalFrameRateCount % 2 === 0) {
			console.warn('flashing');
			fill(255, 255, 0);
			flashed++;
		} else {
			fill(primaryColor);
		}
	} else {
		fill(primaryColor);
	}
	rect(x - (gameCharacterWidth / 2), y - 35, gameCharacterWidth, 20);
	textSize(20);
	textStyle(BOLD);
	fill(logoColor);
	let jumperOffset = 6;
	if (state.match(/-l/)) {
		jumperOffset = 2;
	}
	if (state.match(/-r/)) {
		jumperOffset = 11;
	}
	text('B', (x - (gameCharacterWidth / 2)) + 6 + jumperOffset, y - 19);

	// Legs
	var legYPos = y - 15;
	var legXPosR = x + ((gameCharacterWidth / 2) - 10);
	var legXPosL = x - (gameCharacterWidth / 2);
	var legHeighL = 15;
	var legHeighR = 15;
	if (state.match('jump')) {
		legYPos = y - 25;
	}

	if (state.match('-l')) {
		legXPosR = legXPosR - 4;
		if (personalFrameRateCount % 2 === 0) {
			legHeighL = 15;
			legHeighR = 10;
		} else {
			legHeighR = 15;
			legHeighL = 10;
		}
	}
	if (state.match('-r')) {
		legXPosL = legXPosL + 4;
		if (personalFrameRateCount % 2 === 0) {
			legHeighL = 15;
			legHeighR = 10;
		} else {
			legHeighR = 15;
			legHeighL = 10;
		}
	}
	
	// Left leg
	fill(trouserColor);
	rect(legXPosL, legYPos, 10, legHeighL);

	// Right leg
	fill(trouserColor);
	rect(legXPosR, legYPos, 10, legHeighR);

	// Arms
	var armYPos = y - 38;
	var armWidthL = 8;
	var armWidthR = 8;
	var armXPosR = x + (gameCharacterWidth / 2);
	var armXPosL = x - (gameCharacterWidth / 2) - armWidthL;
	if (state.match('jump')) {
		armYPos = y - 42;
	}
	if (state.match('-l')) {
		armWidthL = 4;
		armXPosL = x - (gameCharacterWidth / 2) - armWidthL;
		armXPosR = x + ((gameCharacterWidth / 2) - 18);
	}
	if (state.match('-r')) {
		armWidthR = 4;
		armXPosL = x - (gameCharacterWidth / 2) + 10;
		armXPosR = x + (gameCharacterWidth / 2);
	}

	// Left arm
	fill(secondaryColor);
	rect(armXPosL, armYPos, armWidthL, 20);

	// Right arm
	fill(secondaryColor);
	rect(armXPosR, armYPos, armWidthR, 20);

	// Eyes
	let eyeXPosL = x - (gameCharacterWidth / 2) + 6;
	let pupilXPosL = eyeXPosL + 2;
	
	if (state.match('-l')) {
		eyeXPosL = x - (gameCharacterWidth / 2) + 2;
		pupilXPosL = eyeXPosL + 1;
	}
	if (state.match('-r')) {
		eyeXPosL = x + (gameCharacterWidth / 2) - 16;
		pupilXPosL = eyeXPosL + 3;
	}

	let pupilYPos = y - 53;
	if (state.match(/jump/)) {
		pupilYPos = y - 54;
	}

	// Left eye
	stroke(strokeColor);
	strokeWeight(1);
	fill(255);
	rect(eyeXPosL, y - 55, 5, 5);
	noStroke();
	fill(34,139,34);
	rect(pupilXPosL, pupilYPos, 2, 2);

	// Right eye
	stroke(strokeColor);
	strokeWeight(1);
	fill(255);
	rect(eyeXPosL + 8, y - 55, 5, 5);
	noStroke();
	fill(34,139,34);
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
		fill(strokeColor);
		noStroke(0);
		ellipse(x + (gameCharacterWidth / 2) - jumpXPosDiff, y - jumpYPosDiff, jumpWidth, jumpHeight);
	} else {
		stroke(strokeColor);
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
			x - (gameCharacterWidth / 2) + mouthPosLOffset,
			y - (45 - mouthPosYOffSet),
			
			x - (gameCharacterWidth / 2) + mouthPosLOffset + 2,
			(y - (45 - mouthPosYOffSet)) + mouthOffSet,

			x - (gameCharacterWidth / 2) + mouthPosLOffset + 14,
			(y - (45 - mouthPosYOffSet)) + mouthOffSet,

			x - (gameCharacterWidth / 2) + mouthPosLOffset + 15,
			y - (45 - mouthPosYOffSet)
		);
	}
	
}

// Function to draw the tree/bushes
function renderBushes (config) {
	var bushWidth = config.totalBushWidth / config.bushes.length;
	var halfBush = bushWidth / 2;
	var quarterBush = halfBush / 2;
  
	for (let i = config.bushes.length - 1; i >= 0; i--) {
		fill(...treeColor);
		stroke(...treeBorderColor);
		strokeWeight(config.strokeWidth);
		// Curve at the top
		bezier(
		  (i * halfBush) + (config.xPos + bushWidth), config.yPos - config.bushes[i].height,
		  (i * halfBush) + (config.xPos + (quarterBush * 3)), (config.yPos - config.bushes[i].height) - config.curveHeight,
		  (i * halfBush) + (config.xPos + quarterBush), (config.yPos - config.bushes[i].height) - config.curveHeight,
		  (i * halfBush) + config.xPos, config.yPos - config.bushes[i].height
		);
		// Background
		noStroke();
		fill(...treeColor);
		rect(
		  (i * halfBush) + config.xPos,
		  config.yPos - config.bushes[i].height,
		  bushWidth,
		  config.bushes[i].height);
		// Left hand line
		stroke(...treeBorderColor);
		strokeWeight(config.strokeWidth);
		line(
		  (i * halfBush) + config.xPos,
		  config.yPos - config.bushes[i].height,
		  (i * halfBush) + config.xPos,
		  config.yPos - (config.strokeWidth - 1)
		);
		// Right hand line
		const _lineHeight = config.bushes[i].lineHeight === undefined ? config.bushes[i].height : config.bushes[i].lineHeight;
		line(
			(i * halfBush) + (config.xPos + bushWidth),
		  	config.yPos - config.bushes[i].height,
		  	(i * halfBush) + (config.xPos + bushWidth),
		  	(((config.yPos - config.bushes[i].height) + _lineHeight) - (config.strokeWidth - 1))
			);
	}

	for (let i = config.bushes.length - 1; i >= 0; i--) {
		fill(...treeTrunkColor);
		rect((i * halfBush) + config.xPos + ((bushWidth - (bushWidth / 4)) / 2), config.yPos - (config.bushes[i].height / 4) + 1, bushWidth / 4, config.bushes[i].height / 4);
		line((i * halfBush) + config.xPos + ((bushWidth - (bushWidth / 4)) / 2) - (bushWidth / 15), config.yPos - (config.bushes[i].height / 4) + 1, ((i * halfBush) + config.xPos + ((bushWidth - (bushWidth / 4)) / 2) - 5) + (bushWidth / 4) + ((bushWidth / 15) * 2), config.yPos - (config.bushes[i].height / 4) + 1);
	}
}

// Function to draw a cloud
function renderCloud (config) {
	const size = config.size || 50;
	const xPos = config.xPos || 140;
	const yPos = config.yPos || 150;
	const color = config.color || [255, 255, 255];
	const largeCloud = size * 2;
	const smallCloud = ((largeCloud / 100) * 70);

	noStroke();
	fill(...color);
	// Left circle
	ellipse(xPos, yPos + ((largeCloud / 100) * 10), smallCloud, smallCloud);
	// Centre circle
	ellipse(xPos + ((largeCloud / 100) * 60), yPos, largeCloud, largeCloud);
	// Right circle
	ellipse(xPos + (((largeCloud / 100) * 60) * 2), yPos + ((largeCloud / 100) * 10), smallCloud, smallCloud);
}

// Function to draw the mountains
function renderMountain (config) {
	const size = config.size || 50;
	const xPos = config.xPos || 200;
	const xPos2 = xPos + (size * 2.8);
	const yPos = config.yPos || horizon;
	const firstPeak = size * 3.5;
	const secondPeak = size * 2.8;

	fill(...mountainColor);
	stroke(...mountainColor);
	
	triangle(xPos, yPos, firstPeak + xPos, yPos - firstPeak, (firstPeak * 2)  + xPos, yPos);
	triangle(xPos2, yPos, secondPeak + xPos2, yPos - secondPeak, (secondPeak * 2)  + xPos2, yPos);
}

// Function to render a canyon
function renderCanyon (config) {
	const xPos = config.xPos || 100;
	const width = config.width || 200;

	strokeWeight(0);
	fill(...mountainColor);
	// The drop
	rect(xPos, horizon, width, height - horizon);
	// Left hand border
	strokeWeight(strokeWidth);
	line(xPos, horizon + (strokeWidth - 1), xPos, height);
	// Right hand border
	line(xPos + width, horizon + (strokeWidth - 1), xPos + width, height);
	// Spikes
	fill(255);
	const spikeSize = ((width / 100) * 10) > 10 ? 10 : (width / 100) * 10;
	if (spikeSize > 3) {
		let spikeNum = 0;
		for (let i = 0; i < width - spikeSize; i = i + (spikeSize * 2)) {
			let _xPos = xPos + ((spikeSize * spikeNum) * 2);
			spikeHeight = height - (3 * spikeSize);
			triangle(_xPos, height - strokeWidth, _xPos + spikeSize, spikeHeight, _xPos + (2 * spikeSize), height - strokeWidth);
			spikeNum++;
		}
	}
}

// Function to render a collectable star
function renderCollectable (config) {
	const xPos = config.xPos !== undefined ? config.xPos : 100;
	const yPos = config.yPos !== undefined ? config.yPos : 100;
	
	const size = config.size !== undefined ? config.size : 20;
	const ratio = size <= 25 ? 1 : size / 25;

	stroke(0);
	strokeWeight(strokeWidth);
	fill(255, 255, 0);

	push();
	beginShape();
	vertex(xPos, yPos); // Point 1
	vertex(xPos + ratio * 10, yPos); // 2
	vertex(xPos + ratio * 14, yPos - 9 * ratio); // 3
	vertex(xPos + ratio * 17, yPos); // 4
	vertex(xPos + ratio * 27, yPos); // 5
	vertex(xPos + ratio * 19, yPos + ratio * 7); // 6
	vertex(xPos + ratio * 23, yPos + ratio * 16); // 7
	vertex(xPos + ratio * 14, yPos + ratio * 11); // 8
	vertex(xPos + ratio * 5, yPos + ratio * 16); // 9
	vertex(xPos + ratio * 8, yPos + ratio * 7); // 10
	endShape(CLOSE);
	pop();
}

// Events
function mousePressed () {
	startGame();
}

function startGame () {
	primaryColor = [223, 39, 59];
	skinColor = [228, 198, 128];
	secondaryColor = [68, 121, 187];
	logoColor = [255, 255, 255];
	strokeColor = [0, 0, 0];
	trouserColor = [95, 53, 48];

	isGameStarted = true;
	isGameOver = false;
	isFalling = false;
	isPlummeting = false;
	isLeft = false;
	isRight = false;
	isJumping = false;
	isFound = false;
	gameChar_x = 50;
	gameChar_y = horizon;
	state = '';
	flashed = 0;

	renderCharacter(gameChar_x, gameChar_y, state);
}

function keyPressed () {
	if (!isGameStarted) {
		startGame();
		return;
	};
	if (isGameOver) return;
	// Right arrow
	if (keyCode && keyCode === 39) {
		isRight = true;
	}
	// Left arrow
	if (keyCode && keyCode === 37) {
		isLeft = true;
	}
	// Spacebar or arrow up
	if (keyCode && (keyCode === 32 || keyCode === 38)) {
		if (gameChar_y === horizon) {
			isJumping = true;
		}
	}
}

function keyReleased () {
	if (!isGameStarted) return;
	if (isGameOver) {
		state = '';
		return;
	}
	// Right arrow
	if (keyCode && keyCode === 39) {
		isRight = false;
		state = '';
		return;
	}
	// Left arrow
	if (keyCode && keyCode === 37) {
		isLeft = false;
		state = '';
		return;
	}
	// Spacebar or arrow up
	if (keyCode && (keyCode === 32 || keyCode === 38)) {
		isJumping = false;
		isFalling = true;
	}
}
