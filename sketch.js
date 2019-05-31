/*

The Game Project

1 - Background Scenery

Use p5 drawing functions such as rect, ellipse, line, triangle and
point to draw the scenery as set out in the code comments. The items
should appear next to the text titles.

Each bit of scenery is worth two marks:

0 marks = not a reasonable attempt
1 mark = attempted but it's messy or lacks detail
2 marks = you've used several shape functions to create the scenery

I've given titles and chosen some base colours, but feel free to
imaginatively modify these and interpret the scenery titles loosely to
match your game theme.


WARNING: Do not get too carried away. If you're shape takes more than 5 lines
of code to draw then you've probably over done it.


*/

function setup () {
	createCanvas(1024, 576);
}

function draw () {
	background(100, 155, 255); //fill the sky blue

	noStroke();
	fill(0, 155, 0);
	rect(0, 432, 1024, 144); //draw some green ground

	// 1. a cloud in the sky
	fill(255, 255, 255);
	ellipse(200, 150, 100, 100);
	ellipse(140, 160, 70, 70);
	ellipse(260, 160, 70, 70);

	// 2. a mountain in the distance
	fill(102, 102, 102);
	triangle(200, 432, 375, 250, 550, 432);
	triangle(325, 432, 475, 300, 625, 432);

	// 3. a tree
	fill(149, 102, 34);
	rect(800, 282, 60, 150);

	// 3b. branches
	fill(0, 155, 0)
	triangle(750, 352, 830, 232, 910, 352)
	triangle(770, 292, 830, 192, 890, 292)

	// 4. a canyon
	strokeWeight(1);
	fill(93, 60, 27);
	beginShape();
	vertex(100, 432);
	vertex(150, 432);
	vertex(320, 576);
	vertex(120, 576);
	endShape(CLOSE);

	fill(100, 155, 255);
	beginShape();
	vertex(100, 432);
	vertex(150, 432);
	vertex(150, 457);
	vertex(103, 457);
	endShape(CLOSE);
	
	//5. a collectable token - eg. a jewel, fruit, coins
	strokeWeight(3);
	stroke(120, 92, 5);
	fill(237, 185, 26);
	ellipse(430, 402, 60, 60);
	fill(255, 255, 0);
	ellipse(430, 402, 50, 50);
	fill(232, 214, 161);
	strokeWeight(5);
	textSize(40);
	textStyle(BOLD);
	text('1', 419, 416);
}
