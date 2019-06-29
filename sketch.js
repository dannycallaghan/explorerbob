/*

The Game Project 4 - Side scrolling

Week 6

*/

var gameChar_x;
var gameChar_y;
var floorPos_y;
var isLeft;
var isRight;
var scrollPos;

var clouds;
var mountains;
var trees_x;
var canyons;
var collectables;

// Game settings
const gameWorldSize = 4000;
const gameWorldOffsetLeft = -500;
const gameWorldStopRight = gameWorldSize + Math.abs(gameWorldOffsetLeft);

function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
	gameChar_x = width/2;
	gameChar_y = floorPos_y;

	// Boolean variables to control the movement of the game character.
	isLeft = false;
	isRight = false;

	// Variable to control the background scrolling.
	scrollPos = 0;

	// Initialise arrays of scenery objects.
	trees_x = [-1060, -550, 10, 850, 1380, 2160, 2580, 3700];
	clouds = [
		{ x: -100, y: 50, size: 50 },
		{ x: 40, y: 40, size: 10 },
		{ x: 140, y: 160, size: 50 },
		{ x: 800, y: 120, size: 30 },
		{ x: 1200, y: 140, size: 40 },
		{ x: 1800, y: 50, size: 20 },
		{ x: 2250, y: 100, size: 50 },
		{ x: 2850, y: 60, size: 70 },
		{ x: 3250, y: 20, size: 70 }
	];
	mountains = [
		{ x: -150, size: 40 },
		{ x: 50, size: 30 },
		{ x: 550, size: 50 },
		{ x: 1300, size: 60 },
		{ x: 2000, size: 40 },
		{ x: 2600, size: 30 },
		{ x: 3100, size: 50 },
	];
	canyons = [
		{ x: 700, width: 120 },
		{ x: 1200, width: 160 },
		{ x: 2000, width: 100 },
		{ x: 2400, width: 100 },
		{ x: 3100, width: 120 }
	];
	collectables = [
		{ x: -340, y: 294, size: 50 },
		{ x: 234, y: 394, size: 50 },
		{ x: 732, y: 294, size: 50 },
		{ x: 1234, y: 294, size: 50 },
		{ x: 1600, y: 394, size: 50 },
		{ x: 2300, y: 394, size: 50 },
		{ x: 3250, y: 394, size: 50 }
	];
}

function draw()
{
	background(100, 155, 255); // fill the sky blue

	noStroke();
	fill(0, 155, 0);
	rect(0, floorPos_y, width, height/4); // draw some green ground

	// Custom - Draw the earth.
	const earthColor = [202, 121, 37];
	push();
	fill(...earthColor);
	rect(gameWorldOffsetLeft, floorPos_y, gameWorldSize, 150); 
	pop();

	// Scroll functionality (1)
	push();
	translate(scrollPos, 0);

	// Draw clouds.
	const cloudsDistance = 60;
	for (let i = 0, x = clouds.length; i < x; i++ ) {
		const adjustedXPos = clouds[i].x + (cloudsDistance / 2);
		const color = [255, 255, 255];
		const large = clouds[i].size * 2;
		const small = ((large / 100) * cloudsDistance);
		noStroke();
		fill(...color);
		// Left circle
		ellipse(adjustedXPos, clouds[i].y + ((large / 100) * 10), small, small);
		// Centre circle
		ellipse(adjustedXPos + ((large / 100) * cloudsDistance), clouds[i].y, large, large);
		// Right circle
		ellipse(adjustedXPos + (((large / 100) * cloudsDistance) * 2), clouds[i].y + ((large / 100) * 10), small, small);
	}
	
	// Draw mountains.
	const mountainColor = [183, 209, 216];
	const mountainSnowColor = [220, 232, 234];
	const largeMountainRatio = 3.5;
	const smallMountainRatio = 2.8;
	noStroke();
	fill(...mountainColor);
	for (let i = 0, x = mountains.length; i < x; i++ ) {
		const yPos = floorPos_y;
		const firstMountainRatio = i % 2 ? smallMountainRatio : largeMountainRatio;
		const secondMountainRatio = i % 2 ? largeMountainRatio : smallMountainRatio;
		const firstMountainPeak = mountains[i].size * firstMountainRatio;
		const secondMountainPeak = mountains[i].size * secondMountainRatio;
		const secondMountainXPos = mountains[i].x + (mountains[i].size * secondMountainRatio);
		const snowHeight = 70;
		
		fill(...mountainColor);
		triangle(mountains[i].x, yPos, firstMountainPeak + mountains[i].x, yPos - firstMountainPeak, (firstMountainPeak * 2)  + mountains[i].x, yPos);
		triangle(secondMountainXPos, yPos, secondMountainPeak + secondMountainXPos, yPos - secondMountainPeak, (secondMountainPeak * 2)  + secondMountainXPos, yPos);
	
		fill(...mountainSnowColor);
		triangle(mountains[i].x + snowHeight, yPos - snowHeight, firstMountainPeak + mountains[i].x, yPos - firstMountainPeak, ((firstMountainPeak * 2)  + mountains[i].x) - snowHeight, yPos - snowHeight);
		triangle(secondMountainXPos + snowHeight, yPos - snowHeight, secondMountainPeak + secondMountainXPos, yPos - secondMountainPeak, ((secondMountainPeak * 2)  + secondMountainXPos) - snowHeight, yPos - snowHeight);
	}

	// Draw trees.
	const treeColor = [87, 221, 111];
	const treeBorderColor = [0, 0, 0];
	const treeTrunkColor = [119, 69, 17];
	const bushWidth = 100;
	const halfBush = bushWidth / 2;
	const quarterBush = halfBush / 2;
	const curveHeight = 50;
	const bushes = [{ height: 80, rightSideHeight: 0 }, { height: 150, rightSideHeight: 75 }, { height: 100 }];
	for (let i = 0, x = trees_x.length; i < x; i++ ) {
		fill(...treeColor);
		stroke(...treeBorderColor);
		strokeWeight(2);
		const xPos = trees_x[i] + 1; // Adjust for stroke
		const yPos = floorPos_y;
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
	}

	// Custom - Draw grass.
	const grassColor = treeColor;
	noStroke();
	fill(...grassColor);
	rect(gameWorldOffsetLeft, floorPos_y, gameWorldSize, 20);
	stroke(0);
	strokeWeight(2);
	fill(...grassColor);
	for (let grassStartPos = gameWorldOffsetLeft; grassStartPos < (gameWorldSize + gameWorldOffsetLeft); grassStartPos = grassStartPos + 36) {
		bezier(grassStartPos, floorPos_y + 20, grassStartPos + 20, floorPos_y + 40, grassStartPos + 40, floorPos_y + 40, grassStartPos + 60, floorPos_y + 20);
		grassStartPos = grassStartPos + 60;
		bezier(grassStartPos, floorPos_y + 20, grassStartPos + 12, floorPos_y + 35, grassStartPos + 24, floorPos_y + 35, grassStartPos + 36, floorPos_y + 20);
	}

	// Custom - floor.
	push();
	stroke(0);
	strokeWeight(2);
	line(gameWorldOffsetLeft, floorPos_y + 1, gameWorldSize, floorPos_y + 1);
	pop();

	// Draw canyons.
	const canyonColor = [166, 190, 198]
	for (let i = 0, x = canyons.length; i < x; i++ ) {
		strokeWeight(0);
		fill(...canyonColor);
		const width = canyons[i].width > 200 ? 200 : canyons[i].width;
		const xPos = canyons[i].x; // Adjust for stroke
		// The drop
		rect(xPos, floorPos_y, width, height - floorPos_y);
		// Left hand border
		strokeWeight(2);
		line(xPos, floorPos_y + 1, xPos, height);
		// Right hand border
		line(xPos + width, floorPos_y + 1, xPos + width, height);
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
	}

	// Draw collectable items
	const sizeRatio = 25;
	stroke(0);
	strokeWeight(2);
	fill(255, 255, 0);
	for (let i = 0, x = collectables.length; i < x; i++ ) {
		const xPos = collectables[i].x + 1;
		const yPos = collectables[i].y + 1;
		const size = collectables[i].size;
		const adjustedRatio = collectables[i].size <= sizeRatio ? 1 : size / sizeRatio;
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

	// Scroll functionality (2)
	pop();

	// Draw the game character - this must be last
	const primaryColor = [223, 39, 59];
	const skinColor = [228, 198, 128];
	const secondaryColor = [68, 121, 187];
	const logoColor = [255, 255, 255];
	const strokeColor = [0, 0, 0];
	const trouserColor = [95, 53, 48];
	const eyeColor = [34,139,34];
	const gameCharacterBodyWidth = 26;
	const gameCharacterHeight = 65;
	
	// Hat
	const hatYPos = gameChar_y - gameCharacterHeight;
	strokeWeight(2);
	stroke(...strokeColor);

	fill(...primaryColor);
	rect(gameChar_x - (gameCharacterBodyWidth / 2), hatYPos, gameCharacterBodyWidth, 5);

	// Head
	fill(...skinColor);
	rect(gameChar_x - (gameCharacterBodyWidth / 2), gameChar_y - 60, gameCharacterBodyWidth, 25);

	// Body
	fill(primaryColor);
	rect(gameChar_x - (gameCharacterBodyWidth / 2), gameChar_y - 35, gameCharacterBodyWidth, 20);
	textSize(19);
	textStyle(BOLD);
	fill(...logoColor);
	text('B', (gameChar_x - (gameCharacterBodyWidth / 2)) + 6, gameChar_y - 18);

	// Legs
	const legYPos = gameChar_y - 15;
	const legXPosR = gameChar_x + ((gameCharacterBodyWidth / 2) - 10);
	const legXPosL = gameChar_x - (gameCharacterBodyWidth / 2);
	
	// Left leg
	fill(...trouserColor);
	rect(legXPosL, legYPos, 10, 14);

	// Right leg
	fill(...trouserColor);
	rect(legXPosR, legYPos, 10, 14);

	// Arms
	const armYPos = gameChar_y - 38;
	const armWidthL = 8;
	const armWidthR = 8;
	const armXPosR = gameChar_x + (gameCharacterBodyWidth / 2);
	const armXPosL = gameChar_x - (gameCharacterBodyWidth / 2) - armWidthL;

	// Left arm
	fill(...secondaryColor);
	rect(armXPosL, armYPos, armWidthL, 20);

	// Right arm
	fill(...secondaryColor);
	rect(armXPosR, armYPos, armWidthR, 20);

	// Eyes
	const eyeXPosL = gameChar_x - (gameCharacterBodyWidth / 2) + 6;
	const pupilXPosL = eyeXPosL + 2;
	const pupilYPos = gameChar_y - 53;

	// Left eye
	stroke(...strokeColor);
	strokeWeight(1);
	fill(255);
	rect(eyeXPosL, gameChar_y - 55, 5, 5);
	noStroke();
	fill(...eyeColor);
	rect(pupilXPosL, pupilYPos, 2, 2);

	// Right eye
	stroke(...strokeColor);
	strokeWeight(1);
	fill(255);
	rect(eyeXPosL + 8, gameChar_y - 55, 5, 5);
	noStroke();
	fill(...eyeColor);
	rect(pupilXPosL + 8, pupilYPos, 2, 2);

	// Mouth
	stroke(...strokeColor);
	strokeWeight(1);
	noFill();
	let mouthPosLOffset = 6;
	const mouthOffSet = 4;
	const mouthPosYOffSet = 0;
	bezier(
		gameChar_x - (gameCharacterBodyWidth / 2) + mouthPosLOffset,
		gameChar_y - (45 - mouthPosYOffSet),
		
		gameChar_x - (gameCharacterBodyWidth / 2) + mouthPosLOffset + 2,
		(gameChar_y - (45 - mouthPosYOffSet)) + mouthOffSet,

		gameChar_x - (gameCharacterBodyWidth / 2) + mouthPosLOffset + 14,
		(gameChar_y - (45 - mouthPosYOffSet)) + mouthOffSet,

		gameChar_x - (gameCharacterBodyWidth / 2) + mouthPosLOffset + 15,
		gameChar_y - (45 - mouthPosYOffSet)
	);

	//////// Game character logic ///////
	// Logic to move

	if(isLeft)
	{
		if(gameChar_x > width * 0.2)
		{
			gameChar_x -= 5;
		}
		else
		{

			// Custom - stop Bob when he goes 'too far' left
			if (
				(
					scrollPos >= 0 &&
					scrollPos < Math.abs(gameWorldOffsetLeft)
				)
				|| 
				(
					scrollPos < 0
				)
			) {
				scrollPos += 5;
			}
		}
	}

	if(isRight)
	{
		if(gameChar_x < width * 0.8)
		{
			gameChar_x  += 5;
		}
		else
		{
			// Custom - stop Bob when he goes 'too far' right
			if (
					(
						(scrollPos <= 0) &&
						((scrollPos - width) >= -Math.abs(gameWorldStopRight - width))
					)
					||
					(scrollPos > 0)
			) {
				scrollPos -= 5; // negative for moving against the background
			}
		}

	}
}

function keyPressed()
{

	if(key == 'A' || keyCode == 37)
	{
		isLeft = true;
	}

	if(key == 'D' || keyCode == 39)
	{
		isRight = true;
	}

}

function keyReleased()
{
	if(key == 'A' || keyCode == 37)
	{
		isLeft = false;
	}

	if(key == 'D' || keyCode == 39)
	{
		isRight = false;
	}
}
