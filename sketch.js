// Horizon
const horizon = 432;

// Character
let gameChar_x;
let gameChar_y;

// Canyon
let canyon;

// Tree
let treePos_x;
let treePos_y;

// Collectable
let collectable;

// Cloud
let cloud;

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

function setup () {

	/**********
	Assignment. Game character.
	2. 
	/*********/
	gameChar_x = 500;
	gameChar_y = horizon

	/**********
	Assignment. Tree.
	3. Change the following vars to test...
	/*********/
	treePos_x = 600;
	treePos_y = horizon;

	/**********
	Assignment. Canyon.
	4. Change the following vars to test...
	/*********/
	canyon = {
		x_pos: 150,
		width: 200
	};

	/**********
	Assignment. Collectable.
	5. Change the following vars to test...
	/*********/
	collectable = {
		x_pos: 360,
		y_pos: 394,
		size: 50
	};

	/**********
	Assignment. Cloud.
	6a. Change the following vars to test...
	/*********/
	cloud = {
		x_pos: 140,
		y_pos: 160,
		size: 50
	};

	/**********
	Assignment. Mountain.
	6b. Change the following vars to test...
	/*********/
	mountain = {
		x_pos: 200,
		y_pos: horizon,
		size: 50
	};

	createCanvas(1024, 576);
}

function draw () {
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

	// Cloud
	renderCloud({
		xPos: cloud.x_pos,
		yPos: cloud.y_pos,
		size: cloud.size
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
	renderCollectable({
		xPos: collectable.x_pos,
		yPos: collectable.y_pos,
		size: collectable.size
	});

	// Character	
	renderCharacter(gameChar_x, gameChar_y, '');
	
}

function mousePressed () {
	gameChar_x = mouseX;
	gameChar_y = mouseY;
}

// Function to drawer the character
function renderCharacter (x, y, state) {
	var characterWidth = 26;
	var state = state || '';

	// Hat
	var hatYPos = y - 65;
	if (state.match(/jump/)) {
		hatYPos = y - 70;
	}
	strokeWeight(2);

	fill(223, 39, 59);
	rect(x - (characterWidth / 2), hatYPos, characterWidth, 5);

	// Head
	fill(228, 198, 128);
	rect(x - (characterWidth / 2), y - 60, characterWidth, 25);

	// Body
	fill(223, 39, 59);
	rect(x - (characterWidth / 2), y - 35, characterWidth, 20);
	textSize(18);
	textStyle(BOLD);
	fill(255);
	let jumperOffset = 6;
	if (state.match(/-l/)) {
		jumperOffset = 2;
	}
	if (state.match(/-r/)) {
		jumperOffset = 11;
	}
	text('B', x - (characterWidth / 2) + jumperOffset, y - 19);

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
	let eyeXPosL = x - (characterWidth / 2) + 6;
	let pupilXPosL = eyeXPosL + 2;
	
	if (state.match('-l')) {
		eyeXPosL = x - (characterWidth / 2) + 2;
		pupilXPosL = eyeXPosL + 1;
	}
	if (state.match('-r')) {
		eyeXPosL = x + (characterWidth / 2) - 16;
		pupilXPosL = eyeXPosL + 3;
	}

	let pupilYPos = y - 53;
	if (state.match(/jump/)) {
		pupilYPos = y - 54;
	}

	// Left eye
	stroke(0);
	strokeWeight(1);
	fill(255);
	rect(eyeXPosL, y - 55, 5, 5);
	noStroke();
	fill(0, 255, 0);
	rect(pupilXPosL, pupilYPos, 2, 2);

	// Right eye
	stroke(0);
	strokeWeight(1);
	fill(255);
	rect(eyeXPosL + 8, y - 55, 5, 5);
	noStroke();
	fill(0, 255, 0);
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
		fill(0);
		noStroke(0);
		ellipse(x + (characterWidth / 2) - jumpXPosDiff, y - jumpYPosDiff, jumpWidth, jumpHeight);
	} else {
		stroke(0);
		strokeWeight(1);
		noFill();
		let mouthPosLOffset = 6;
		if (state.match(/-l/)) {
			mouthPosLOffset = 2;
		}
		if (state.match(/-r/)) {
			mouthPosLOffset = 9;
		}
		bezier(
			x - (characterWidth / 2) + mouthPosLOffset,
			y - 45,
			
			x - (characterWidth / 2) + mouthPosLOffset + 2,
			(y - 45) + 4,

			x - (characterWidth / 2) + mouthPosLOffset + 14,
			(y - 45) + 4,

			x - (characterWidth / 2) + mouthPosLOffset + 15,
			y - 45
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
	const largeCloud = size * 2;
	const smallCloud = ((largeCloud / 100) * 70);

	noStroke();
	fill(255, 255, 255);
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
			triangle(_xPos, height - strokeWidth, _xPos + spikeSize, height - (3 * spikeSize), _xPos + (2 * spikeSize), height - strokeWidth);
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
