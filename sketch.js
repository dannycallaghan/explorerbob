/**
 * Extensions
 * 
 * Due to having two small children who demanded that I do all four extensions (certainly three, but, although it's subjective,
 * I would like to think that I have also added 'advanced graphics') as they were very keed on playing this game. However, as
 * per the instructions, I have nominated two extensions for grading purposes, as detailed below.
 * 
 * ***********************************
 * Extension 1 - Enemies
 * 
 * I thoroughly enjoyed creating the enemies, as I had more fun with the design aspect of this extension that any other element
 * of the game. I'm really happy with the way I was able to create the eight legs for each spider - two nested loops containg only
 * two lines of 'drawing code'. I use a little maths knowledge to create legs on both sides of the spider, by changing the
 * sign (positive or negative) of some of the coordinate manipulation by multiplying the result by positive one, or negative
 * one depending on which side of the spider. The Constructor pattern is something that I rarely use anymore in my day to day
 * work as a front end developer, so it was good to become familiar with it again. For me, the only tricky part of this was that
 * I felt simply looking at the `dist` of the character and the enemy was not enough. It didn't feel accurate enough. To combat this 
 * I drew a temporary box around the whole of the spider to find out the real x and y coordinates of the spider, and found the
 * 'sweetspot' for collision detection depending on whether Bob was approaching the spider from the left or right. Further, I found
 * that when jumping over (on falling on) the enemy wouldn't work correctly with `dist`. If you enemy is wider than it is tall, it
 * was triggering the collision detection when I was 'width' above my spider. To stop this, I completely disregarding jumping and falling,
 * and let walking left or right take care of things.
 * 
 * ***********************************
 * Extension 2 - Sound
 * 
 * Obviously, this was a fun thing to add, and my son and I had a great time browsing for sound effects! I found that adding the 
 * sounds was made really simple by P5. There are several things that I find frustrating, or just annoying, about this library (for
 * example, I really don't like that the event triggers, such as mouseClick don't give you some kind of event object that you can interrogate,
 * rathe than just adding stuff straight to the global namespace), but I feel the sound extension is really well done, and incredibly
 * intuitive. I did come across one issue when adding my 'lost a life' sound, in that I was forgetting that my `ascend` function (making Bob
 * go to heaven) that is called when you lose a life, is called every frame until Bob disappears from site. As a result, my sound file became
 * very distorted and it took me quite a while to figure out why. Once I made sure the sound was called only once, regardless of the amount of times
 * the `ascend` function was called, everything sounded as expected.
 * 
 */


/**
 * Settings
 */
// Dev settings to make things easier
const isTestMode = false; // Can't die in test mode
const testFrameRate = 0; // Override the standard 60fps

// Game frame rate (used for Bob's legs moving and jumper flashing when he finds something) 
let personalFrameRate = 10;
let personalFrameRateCount = 1;
let frameCount = 0;

// Game settings
const gameWorldSize = 5000;
const gameWorldOffsetLeft = -400;
const gameWorldStopRight = gameWorldSize + Math.abs(gameWorldOffsetLeft);

// Player settings
let gameScore = 0;
let lives = 4;
let highScore = 0;

// Scrolling speeds
const scrollSpeedClouds = 0.2;
const scrollSpeedTwo = 2;
const scrollSpeedThree = 3;
const scrollSpeedFour = 5;

// Horizon
const horizon = 435;

// Interactions vars
let isGameStarted = false;
let isGameCompleted = false;
let isGameOver = false;
let isLeft = false;
let isRight = false;
let isFalling = false;
let isPlummeting = false;
let isJumping = false;
let isFound = false;
let isOverPlatform = false;
let isBitten = false;

// Speeds 
const runningSpeed = 5;
const jumpingSpeed = 5;
const fallingSpeed = 5;
const ascendSpeed = 8;

// Jumping height
const maxJumpHeight = 160;

// Character
let gameCharStartX = 50;
let gameCharX;
let gameCharXInWorld;
let gameCharY = horizon;
let characterYLevel = horizon;
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
let canyonDetection;

// Mountains
let mountains;

// Clouds
let clouds;

// Trees
let trees;

// Platforms
let platforms;
let platformsDetection;
let isNearPlatform = false;

// Collectables position and status
let collectables;
let collectableDetection;
const collectableDistributionInPixels = 300;
const collectableWidth = 50;

// flag
let flag;
const flagFlownPos = horizon - 170;
const flagLocationFromEnd = 300;
let flagPos = horizon;

// Colors
const treeColor = [87, 221, 111];
const treeBorderColor = [0, 0, 0];
const treeTrunkColor = [119, 69, 17];
const skyColor = [179, 232, 248];
const grassColor = treeColor;
const earthColor = [202, 121, 37];
const mountainColor = [183, 209, 216];
const mountainSnowColor = [220, 232, 234];
const canyonColor = [166, 190, 198];

// Character colors
let primaryColor = [223, 39, 59];
let primaryColorDark = [86, 40, 45];
let skinColor = [228, 198, 128];
let secondaryColor = [68, 121, 187];
let logoColor = [255, 255, 255];
let strokeColor = [0, 0, 0];
let trouserColor = [95, 53, 48];
const eyeColor = [34,139,34];
const backpackColor = [148, 0, 211];

// Enemies
let enemies = [];
const enemyBodyWidth = 30;
const enemyBodyHeight = 30
const enemyLegY = 12;
const enemyLegX = -18;
const enemyLegKneeY = 2;

// Scroll vars
let scrollPos = [];

// Fonts
let title;
let font;

// Sounds
let gameSound;
let jumpSound;
let dieSound;
let collectSound;
let completeSound;
let dieSoundIsPlaying = false;

// Broweser storage
const store = window.sessionStorage;
const storeStr = 'BobsHighScore';

/**
 * P5 function, used to preload any assets.
 *
 * @return void.
 */
function preload () {
	// Fonts
	title = loadFont('assets/mario.ttf'); // Font used for game title
	font = loadFont('assets/arcadeclassic.ttf'); // FOnt used for everything else

	// Sounds
	soundFormats('wav', 'mp3');
	gameSound = loadSound('assets/followme.wav');
	gameSound.setVolume(0.1);
	jumpSound = loadSound('assets/jump.wav');
	jumpSound.setVolume(0.15);
	dieSound = loadSound('assets/die.wav');
	dieSound.setVolume(0.15);
	collectSound = loadSound('assets/collect.wav');
	collectSound.setVolume(0.15);
	completeSound = loadSound('assets/complete.mp3');
	completeSound.setVolume(0.15);
}

/**
 * P5 function, set's up stage, assigns any necessary values.
 *
 * @return void.
 */
function setup () {

	// Clouds
	clouds = [
		{ x: 140, y: 160, size: 50 },
		{ x: 800, y: 120, size: 30 },
		{ x: 40, y: 40, size: 10, color: [219, 247, 249] }
	];

	// Flag
	flag = {
		x: (gameWorldSize + gameWorldOffsetLeft) - flagLocationFromEnd - gameCharacterWidth,
		isReached: false
	};

	// Direction
	warning = {
		x: 100
	};

	// Set the stage dimensions
	createCanvas(1024, 576);
}

/**
 * P5 function, called every frame.
 *
 * @return void.
 */
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

	// Draw the platforms
	renderPlatforms(platforms);
	
	// Draw the enemies
	renderEnemies(enemies);

	// Draw the flag
	renderFlagPole(flag);

	// Render warning if they go the wrong way
	renderWarning(warning);

	// Check flag status
	checkFlagpole();

	// Stop fourth scrolling effect
	scrollStop();
	
	// Reset state
	state = '';

	// ** Interactions **

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

	// Make Bob die from a spider bite
	if (isBitten) {
		freezeCharacterState();
		ascend();
	}

	// Make Bob react to a canyon
	if (canyonDetection && canyonDetection.length) {
		plummet();
	}

	// Make Bob react to a collectable
	if (collectableDetection && collectableDetection.length) {
		collect();
	}

	// Make Bob react to a platform
	if (platformsDetection && platformsDetection.length) {
		nearPlatform();
	}

	// Make Bob react to an enemy
	if (enemies && enemies.length) {
		getBitten();
	}

	// Draw Bob
	renderCharacter(gameCharX, gameCharY, state);

	// Get a hold of Bobs position 'in the world'
	gameCharXInWorld = gameCharX - scrollPos[scrollPos.length - 1];

	// Draw the game text
	renderGameText();

}

/**
 * Freezes Bob, allowing no interaction. Called when he dies.
 *
 * @return void.
 */
function freezeCharacterState () {
	// Reset game vars
	isFalling = false;
	isPlummeting = false;
	isLeft = false;
	isRight = false;
	isJumping = false;
}

/**
 * Sets all game settings back to their default state, for restarting the game.
 *
 * @return void.
 */
function resetGameState () {

	// Rest game over status
	isGameOver = false;

	// Flashing
	state = '';
	flashed = 0;

	// Reposition Bob
	gameCharX = gameCharStartX;
	gameCharX = gameCharStartX;

	// Reset Bob's position *in the world*
	scrollPos = [];
	gameCharXInWorld = gameCharX - scrollPos[scrollPos.length - 1];

	// Reset scenery
	// - Mountains
	mountains = [];

	// - Trees
	trees = [];

	// - Canyons
	canyons = [];
	canyonDetection = [];

	// - Collectables
	collectables = [];
	collectableDetection = [];

	// - Platforms
	platforms = [];
	platformsDetection = [];

	// - Enemies
	enemies = [];

	// Reset scroll positions
	scrollPos = scrollPos.map(pos => 0);

	// Reset player settings
	gameScore = 0;
}

/**
 * Starts a new game by resetting everything and redrawing Bob.
 *
 * @return void.
 */
function startGame () {

	// Reset game vars
	resetGameState();

	// Stop any sounds
	completeSound.stop();

	// Decrement lives
	lives = lives === 1 || isGameCompleted ?  3 : lives - 1;

	// Mountains
	mountains = [
		{ x: 50, size: 30 },
		{ x: 550, size: 50 },
		{ x: 1300, size: 60 },
		{ x: 2000, size: 40 },
		{ x: 2600, size: 30 },
		{ x: 3200, size: 60 }
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

	// Platforms
	platforms = [
		{ x: 340, y: 300, size: 100 },
		{ x: 1315, y: 360, size: 100 },
		{ x: 2050, y: 320, size: 100 },
		{ x: 3600, y: 360, size: 100 },
		{ x: 3800, y: 280, size: 100 },
	];

	// Canyons
	canyons = [
		{ x: 500, width: 100 },
		{ x: 1200, width: 330 },
		{ x: 2500, width: 120 },
		{ x: 2740, width: 120 },
		{ x: 3500, width: 500 }
	];

	// Collectables
	collectables = [
		{ x: -250, y: 220, size: collectableWidth, found: false},
		{ x: 364, y: 350, size: collectableWidth, found: false},
		{ x: 900, y: 350, size: collectableWidth, found: false},
		{ x: 1335, y: 310, size: collectableWidth, found: false},
		{ x: 2070, y: 270, size: collectableWidth, found: false},
		{ x: 2340, y: 350, size: collectableWidth, found: false},
		{ x: 2650, y: 360, size: collectableWidth, found: false},
		{ x: 3200, y: 320, size: collectableWidth, found: false},
		{ x: 3820, y: 220, size: collectableWidth, found: false},
		{ x: 4100, y: 320, size: collectableWidth, found: false}
	];

	// Enemies
	enemies.push(
		new Enemy(360, 280, 60),
		new Enemy(1670, horizon - 20, 100),
		new Enemy(2050, horizon - 20, 100),
		new Enemy(3000, horizon - 20, 100),
		new Enemy(4026, horizon - 20, 40)
	);

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
	isBitten = false;
	dieSoundIsPlaying = false;

	// Reposition Bob
	gameCharX = gameCharStartX;
	gameCharY = horizon;
	state = '';
	flashed = 0;

	// Reset scroll positions
	scrollPos = scrollPos.map(pos => 0);

	// Reset player settings
	gameScore = 0;

	//resetGameState();
	isGameStarted = true;
	isGameCompleted = false;

}

/**
 * Sets up the scrolling for all subsequent objects, util scrollStop is called.
 *
 * @param {number}	speed - The speed of this scroll effect.
 * 
 * @return void.
 */
function scrollStart (speed) {
	// If we don't already have a value for this one, set it to zero
	if (!scrollPos[speed]) {
		scrollPos[speed] = 0;
	}
	// Stop scrolling when we get to the left end of the game
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
	// Stop scrolling when we get to the right end of the game
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

/**
 * Simply calls pop to end the previous scrollStart effect.
 *
 * @return pop().
 */
function scrollStop () {
	return pop();
}

/**
 * Draws the clouds to the screen
 *
 * @parma {object}	data - An object containing the x position, y position, size and an optional colour for each cloud
 * 
 * @return void.
 */
function renderClouds (data) {
	const cloudsDistance = 60; // Ensures that the clouds aren't too close to each other
	for (let i = 0, x = data.length; i < x; i++ ) {
		const adjustedXPos = data[i].x + (cloudsDistance / 2); // Adjust the x position depending on the distance setting
		const color = data[i].color || [255, 255, 255];
		const large = data[i].size * 2;
		const small = ((large / 100) * cloudsDistance);
		push(); // Prevent bleed
		noStroke();
		fill(...color);
		// Left circle
		ellipse(adjustedXPos, data[i].y + ((large / 100) * 10), small, small);
		// Centre circle
		ellipse(adjustedXPos + ((large / 100) * cloudsDistance), data[i].y, large, large);
		// Right circle
		ellipse(adjustedXPos + (((large / 100) * cloudsDistance) * 2), data[i].y + ((large / 100) * 10), small, small);
		pop(); // Prevent bleed
	}
}

/**
 * Draws the trees to the screen
 *
 * @parma {object}	data - An object containing the x position, and array of bush dimensions for each tree.
 * 
 * @return void.
 */
function renderTrees (data) {
	if (!data || !data.length) {
		return;
	}
	const bushWidth = 100;
	const halfBush = bushWidth / 2;
	const quarterBush = halfBush / 2;
	const curveHeight = 50;
	for (let i = 0, x = data.length; i < x; i++ ) {
		push(); // Prevent bleed
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
		pop(); // Prevent bleed
	}
}

/**
 * Draws the platforms to the screen
 *
 * @parma {object}	data - An object containing the x position, y position and size of the platform.
 * 
 * @return void.
 */
function renderPlatforms (data) {
	if (!data || !data.length) {
		return;
	}
	for (let i = 0, x = data.length; i < x; i++ ) {
		fill(...earthColor);
		strokeWeight(2);
		rect(data[i].x, data[i].y, data[i].size, 20);
		// Add only useful infomation to platformsDetection array
		platformsDetection = platformsDetection || [];
		if (!platformsDetection[i]) {
			platformsDetection = platformsDetection.concat([{
				x1: data[i].x,
				x2: data[i].x + data[i].size,
				y: data[i].y
			}])
		}
	}
}

/**
 * Calls the render function of our enemy constructor
 *
 * @parma {object}	enemies - A reference to our enemies array
 * 
 * @return void.
 */
function renderEnemies (enemiesArray) {
	enemiesArray.map(enemy => {
		enemy.render();
	});
}

/**
 * Enemy constructor
 *
 * @param {number}	x - X position of the enemy
 * @param {number}	y - Y position of the enemy
 * @param {number}	range - How far the enemy can travel
 * 
 * @return void.
 */
function Enemy (x, y, range) {
	this.x = x;
	this.y = y;
	this.range = range;
	this.currentXPos = x;
	this.speed = 1;

	// Update the current position of our enemy
	this.update = function () {
		this.currentXPos += this.speed;
		if (this.currentXPos >= this.x + this.range) {
			this.speed = -1;
		} else if (this.currentXPos < this.x) {
			this.speed = 1;
		}
	}
	// Draw the enemy
	this.render = function () {
		// Call the update function to find out where to draw it
		this.update();
		
		const enemyX = this.currentXPos;
		const enemyY = this.y;
		let signChange = 1;
		let enemyLegLength = enemyY + 19;

		// Checks of the leg is off or even, depending on which frame we're in (moves the legs, in other words!)
		function checkEven (l) {
			const t = personalFrameRateCount % 2 === 0 ? l + 1 : l;
			return t % 2 === 0;
		}

		// Enemy legs
		fill(0);
		for (let x = 0; x < 2; x++) {
			for (let i = 0; i < 4; i++) {
				// Above the knee
				line(enemyX, enemyY + (enemyLegY - (i * 4)), (enemyX + ((enemyLegX - (i * 4)) * signChange)), enemyY + (enemyLegKneeY - (i * 4)));
				// Below the knee
				const enemyLegOffSet = checkEven(i) ? 0 : 6;
				line((enemyX + ((enemyLegX - (i * 4)) * signChange)), enemyY + (enemyLegKneeY - (i * 4)), enemyX + ((enemyLegX - (i * 4) + 2) * signChange), enemyLegLength - enemyLegOffSet);
			}
			signChange = -1;
		}
		// Body
		ellipse(enemyX, enemyY, enemyBodyWidth, enemyBodyHeight);
		// Eye white
		fill(255);
		ellipse(enemyX - 5, enemyY - 4, 10, 10);
		ellipse(enemyX + 5, enemyY - 4, 10, 10);
		// Eye pupil
		fill(0);
		ellipse(enemyX - 5, enemyY - 4, 3, 3);
		ellipse(enemyX + 5, enemyY - 4, 3, 3);
		// Mouth
		fill(255, 0, 0);
		arc(enemyX, enemyY + 2, 16, 16, PI - 9, PI + 18.45, OPEN);
	}

	// Detect a hit
	this.detect = function (bobX, bobY) {
		// Calculate the real left and right of the enemy
		const realEnemyXLeftForDetection = this.currentXPos - 30;
		const realEnemyXRightForDetection = realEnemyXLeftForDetection + enemyBodyWidth + 31;
		const realEnemyTopForDetection = this.y;
		const distanceLeft = dist(bobX, bobY, realEnemyXLeftForDetection, realEnemyTopForDetection);
		const distanceRight = dist(bobX, bobY, realEnemyXRightForDetection, realEnemyTopForDetection);
		// If he's falling, don't check, as it confuses everything
		if (isFalling) {
			return false;
		}
		if (distanceLeft < 40) {
			return true;
		}
		if (distanceRight <= 20) {
			return true;
		}
		return false;
	}
}

/**
 * Draws the collectables to the screen
 *
 * @parma {object}	data - An object containing the x position, y position, size and the found status of each collectable.
 * 
 * @return void.
 */
function renderCollectables (data) {
	if (!data || !data.length) {
		return;
	}
	const sizeRatio = 25;
	push(); // Prevent bleed
	stroke(0);
	strokeWeight(2);
	fill(255, 255, 0);
	for (let i = 0, x = data.length; i < x; i++ ) {
		const xPos = data[i].x + 1; // Adjust for stroke
		const yPos = data[i].y + 1; // Adjust for stroke
		const size = data[i].size;
		const adjustedRatio = data[i].size <= sizeRatio ? 1 : size / sizeRatio;
		// Add only useful infomation to collectableDetection array
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
		// Draw each item to screen
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
	pop(); // Prevent bleed
}

/**
 * Draws the flagpole to the screen
 *
 * @parma {object}	data - An object containing the x position, and isReached status of the flagpole.
 * 
 * @return void.
 */
function renderFlagPole (data) {
	let x = data.x;
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
	push(); // Prevent bleed
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
	pop(); // Prevent bleed
}

/**
 * Draws the warning sign
 *
 * @parma {object}	data - An object containing the x position
 * 
 * @return void.
 */
function renderWarning (data) {
	let x = -370;
	fill(...earthColor);
	// Pole
	rect(x, horizon, 6, -100);
	// Sign
	rect(x, horizon - 100, 90, 50);
	textFont(title);
	strokeWeight(2);
	stroke(0);
	fill(255);
	textSize(20);
	textAlign(LEFT);
	text(`WRONG`, x + 10, horizon - 76);
	text(`WAY!`, x + 10, horizon - 56);
}

/**
 * Draws any necessary text to the screen.
 *
 * @return void.
 */
function renderGameText () {

	push(); // Prevent bleed

	fill(0, 255, 255);
	stroke(0);
	strokeWeight(2);
	textFont(title);

	// Title text
	const textStartX = width / 2;
	const textStartY = height / 2 - 50;
	textSize(90);
	textAlign(CENTER);

	let titleText = `EXPLORER BOB`;

	if (isGameCompleted) {
		titleText = 'YOU DID IT!';
	} else {
		if (lives < 4 && lives > 1) {
			titleText = 'TRY AGAIN!';
		} else if (lives === 1){
			titleText = 'GAME OVER';
		}
	}
	if (!isGameStarted || isGameCompleted) {
		const retryText = lives === 0 ? 'retry' : 'start';
		text(titleText, textStartX, textStartY);
		textFont(font);
		fill(255, 255, 0);
		textSize(40);
		const subTitleText = isGameCompleted ? 'Press any key to go again' : `Press any key to ${retryText}`;
		text(subTitleText, textStartX, textStartY + 50);
	}

	textFont(font);
	fill(255);
	textSize(40);
	textSize(30);

	// Score
	if (isGameStarted) {
		textAlign(LEFT);
		text(`SCORE ${gameScore}`, 20, 40);
	}

	// High score
	if (store && isGameStarted) {
		const hs = store.getItem(storeStr) ? store.getItem(storeStr) : 0;
		textAlign(RIGHT);
		text(`YOUR HIGH SCORE ${hs > gameScore ? hs : gameScore }`, width - 20, 40);
	}

	// Lives
	if (isGameStarted) {
		textAlign(CENTER);
		text(`LIVES ${lives}`, width / 2, 40);
	}

	pop(); // Prevent bleed
}

/**
 * Draws the mountains to the screen
 *
 * @parma {object}	data - An object containing the x position, and size of each mountain.
 * 
 * @return void.
 */
function renderMountains (data) {
	if (!data || !data.length) {
		return;
	}
	const largeMountainRatio = 3.5; // Large mountains
	const smallMountainRatio = 2.8; // Small mountains
	push(); // Prevent bleed
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
		
		// Mountain
		fill(...mountainColor);
		triangle(data[i].x, yPos, firstMountainPeak + data[i].x, yPos - firstMountainPeak, (firstMountainPeak * 2)  + data[i].x, yPos);
		triangle(secondMountainXPos, yPos, secondMountainPeak + secondMountainXPos, yPos - secondMountainPeak, (secondMountainPeak * 2)  + secondMountainXPos, yPos);
		
		// Snow
		fill(...mountainSnowColor);
		triangle(data[i].x + snowHeight, yPos - snowHeight, firstMountainPeak + data[i].x, yPos - firstMountainPeak, ((firstMountainPeak * 2)  + data[i].x) - snowHeight, yPos - snowHeight);
		triangle(secondMountainXPos + snowHeight, yPos - snowHeight, secondMountainPeak + secondMountainXPos, yPos - secondMountainPeak, ((secondMountainPeak * 2)  + secondMountainXPos) - snowHeight, yPos - snowHeight);
	}
	pop(); // Prevent bleed
}

/**
 * Draws Bob!
 *
 * @parma {number}	_x - Bob's x position
 * @parma {number}	_y - Bob's y position
 * @parma {string}	_state - Bob's status. Can be empty, jump, jump-l, jump-r, walk-l, or walk-r
 * 
 * @return void.
 */
function renderCharacter (_x, y, _state) {
	const gameCharacterBodyWidth = 26;
	let state = _state || '';
	let x = _x + 22;

	push(); // Prevent bleed

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
		ellipse(x - 8, hatYPos, gameCharacterBodyWidth, 10);
	}
	if (isRight) {
		ellipse((x + gameCharacterBodyWidth) - 18, hatYPos, gameCharacterBodyWidth, 10);
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
	var bagXPosR = x + (gameCharacterBodyWidth / 2);
	var bagXPosL = x - (gameCharacterBodyWidth / 2) - armWidthL;
	var bagYPos = y - 38;

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

	// Backpack
	fill(...backpackColor);
	strokeWeight(2);
	stroke(...strokeColor);
	if (state.match('-l')) {
		rect(bagXPosR, bagYPos, armWidthL, 20);
	}
	if (state.match('-r')) {
		rect(bagXPosL, bagYPos, armWidthL, 20);
	}
	
	pop(); // Prevent bleed
}

/**
 * Draws the grass effect.
 *
 * @return void.
 */
function renderGrass () {
	const yPos = horizon;
	push(); // Prevent bleed
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
	pop(); // Prevent bleed
}

/**
 * Draws the canyons.
 *
 * @parma {object} data - An object containing the x position and width of each canyon
 * 
 * @return void.
 */
function renderCanyons (data) {
	if (!data || !data.length) {
		return;
	}
	for (let i = 0, x = data.length; i < x; i++ ) {
		push(); // Prevent bleed
		strokeWeight(0);
		fill(...canyonColor);
		const width = data[i].width;
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
		// Add useful info to the canyonDetection array
		canyonDetection = canyonDetection || [];
		if (!canyonDetection[i]) {
			canyonDetection = canyonDetection.concat([{
				x1: xPos,
				x2: xPos + width
			}])
		}
		pop(); // Prevent bleed
	}
}

/**
 * Makes Bob walk.
 *
 * @return void.
 */
function walk () {
	// Walk off the platform
	const walkOff = () => {
		isNearPlatform = [];
		isFalling = true;
	};
	// Make him walk until he gets the right end of the game
	if (state.match(/-r/)) {
		const ratio = (scrollPos[scrollPos.length - 1] - width) <= -Math.abs(gameWorldStopRight - width) ? 1 : 0.7;
		if (isNearPlatform.length && gameCharXInWorld >= isNearPlatform[0].x2 - 11) {
			walkOff();
		}
		if(gameCharX < width * ratio) {
			if (gameCharX < (width - gameCharacterWidth)) {
				gameCharX += runningSpeed;
			}
		}
		return;
	}
	// Make him walk until he gets the left end of the game
	if (state.match(/-l/)) {
		const ratio = scrollPos[scrollPos.length - 1] === Math.abs(gameWorldOffsetLeft) ? 0 : 0.3;
		// If we're on a platform, and we get to end of it, we need to fall
		if (isNearPlatform.length && gameCharXInWorld <= isNearPlatform[0].x1 - 11) {
			walkOff();
		}
		if (gameCharX > width * ratio) {
			gameCharX -= runningSpeed;
		}
		return;
	}
}

/**
 * Makes Bob jump.
 *
 * @return void.
 */
function jump () {
	if (gameCharY > characterYLevel - maxJumpHeight) {
		gameCharY -= jumpingSpeed;
		isFalling = false;
		if (isRight) {
			state = 'jump-r'; // Jumping right
			return;
		}
		if (isLeft) {
			state = 'jump-l'; // Jumping right
			return;
		}
		state = 'jump'; // Just jumping
		return
	}
	isJumping = false;
	isFalling = true;
}

/**
 * Makes Bob fall after jumping
 *
 * @return void.
 */
function fall () {
	if (isNearPlatform.length && isNearPlatform[0].y >= gameCharY - 60) {
		isOverPlatform = true;
	}
	// Set ground level depending on whether we're above a platform
	const setHorizon = isOverPlatform && isNearPlatform.length  ? isNearPlatform[0].y : horizon;
	if (gameCharY < setHorizon) {
		gameCharY += fallingSpeed;
		return;
	}
	// If we're over a platform, change Bob's default horizon	
	if (isOverPlatform && isNearPlatform.length) {
		characterYLevel = isNearPlatform[0].y;
		gameCharY = isNearPlatform[0].y;
		isOverPlatform = false;
	} else {
		characterYLevel = horizon;
	}
	isFalling = false;
	// If he was walking right when he jumped, continue walking right
	if (state.match('-r')) {
		state = 'walk-r';
		return;
	}
	// If he was walking left when he jumped, continue walking left
	if (state.match('-l')) {
		state = 'walk-l';
		return;
	}
	state = '';
}

/**
 * Makes Bob die and rise to heaven.
 *
 * @return void.
 */
function ascend ()  {
	isGameOver = true;
	if (!dieSoundIsPlaying) {
		gameSound.stop();
		dieSound.play();
		dieSoundIsPlaying = true;
	}
	if (gameCharY > -Math.abs(gameCharacterHeight)) {
		gameCharY -= ascendSpeed;
		return;
	}
	//isGameOver = false;
	isGameStarted = false;
	adjustHighScore();
	renderGameText();
}

/**
 * Makes Bob fall down a canyon.
 *
 * @return void.
 */
function doPlummet (canyon) {
	// Keep him with the canyon if he falls
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

/**
 * Detects whether Bob has reached a canyon.
 *
 * @return void.
 */
function plummet () {
	if (isTestMode || !canyonDetection.length) { return; }
	canyonDetection.map(canyon => {
		// Walking right
		if (
			state === 'walk-r'
			&&
			// x position is more than the left hand side of the canyon
			((gameCharXInWorld + 15) >= canyon.x1)
			&&
			// x position is less than the right hand side of the canyon
			((gameCharXInWorld + gameCharacterWidth - 15) <= canyon.x2)
			&&
			// Isn't falling or jumping
			(!isJumping && !isFalling)
			&&
			// Is not over a platform
			!isNearPlatform.length
		) {
			doPlummet(canyon);
		}
		// Walking left
		if (
			state === 'walk-l'
			&&
			// x position is more than the left hand side of the canyon
			((gameCharXInWorld + 15) >= canyon.x1)
			&&
			// x position is less that the right hand side of the canyon
			((gameCharXInWorld + gameCharacterWidth - 15) <= canyon.x2)
			&&
			// Isn't falling or jumping
			(!isJumping && !isFalling)
			&&
			// Is not over a platform
			!isNearPlatform.length
		) {
			doPlummet(canyon);
		}
		// Facing front
		if (
			state === ''
			&&
			// x position is more than the left hand side of the canyon
			((gameCharXInWorld + 10) >= canyon.x1)
			&&
			// x position is less that the right hand side of the canyon
			((gameCharXInWorld + gameCharacterWidth - 10) <= canyon.x2)
			&&
			// Isn't falling or jumping
			(!isJumping && !isFalling)
			&&
			// Is not over a platform
			!isNearPlatform.length
		) {
			doPlummet(canyon);
		}
	});
}

/**
 * Detects whether Bob has reached a collectable.
 *
 * @return void.
 */
function collect () {
	if (isGameOver) { return; }
	collectableDetection.map(collectable => {
		if (!collectable.found) {
			if (
				( gameCharXInWorld + gameCharXOffsetR > collectable.x1 && gameCharXInWorld < collectable.x2 )
				&&
				( gameCharY - gameCharacterHeight < collectable.y2 )
				&&
				( gameCharY > collectable.y1 )
			) {
				collectSound.play();
				collectable.found = true;
				flashed = 0;
				isFound = true;
				gameScore++;
			}
		}
	})
}

/**
 * Detects whether is in the vacinity of a platform, and sets the status for each platform.
 *
 * @return void.
 */
function nearPlatform () {
	if (isGameOver) { return; }
	platformsDetection = platformsDetection.map(platform => {
		platform.over = gameCharXInWorld >= platform.x1 - 28 && gameCharXInWorld < platform.x2 - 11;
		return platform;
	});
	isNearPlatform = platformsDetection.filter(platform => platform.over);
}

/**
 * Detects whether is in the vacinity of an enemy.
 *
 * @return void.
 */
function getBitten () {
	if (isTestMode) {
		return;
	}
	enemies.map(enemy => {
		if (enemy.detect(gameCharXInWorld, gameCharY)) {
			isBitten = true;
			return;
		}
	});
}

/**
 * Updates the high score in storage
 *
 * @return void.
 */
function adjustHighScore () {
	if (!store) {
		return;
	}
	const highScore = store.getItem(storeStr);
	if (highScore) {
		store.setItem(storeStr, gameScore > highScore ? gameScore : highScore );
	} else {
		store.setItem(storeStr, gameScore );
	}
}

/**
 * Detects whether Bob has reached the flagpole.
 *
 * @return void.
 */
function checkFlagpole () {
	if (flag.isReached) { return; }
	if (gameCharXInWorld + gameCharXOffsetR > flag.x) {
		gameSound.stop();
		completeSound.play();
		adjustHighScore();
		isGameCompleted = true;
		isGameStarted = false;
		flag.isReached = true;
		renderGameText();
	}
}

/**
 * Detects key presses, and passes off to necessary event functions.
 *
 * @return void.
 */
function keyPressed () {
	if (!isGameStarted) {
		startGame();
		if (!isTestMode) {
			gameSound.loop();
		}
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
		jumpSound.play();
	}
}

/**
 * Detects key releases, and passes off to necessary event functions.
 *
 * @return void.
 */
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