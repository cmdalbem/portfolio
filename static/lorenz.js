// Mathematical constants for attractors
const ATTRACTORS = [
	{ o: 10, p: 28, b: 8.0 / 3.0 },         // Lorenz
	// { o: 40, p: 3, b: 28 },             // Chen
	// { o: 10.82, p: 14.286, b: null },   // Chua
	// { o: 0.1, p: 0.1, b: 14 }           // Rossler
];

const NUM_POINTS = 200;
const TAIL_SIZE = 300;
// let TAIL_SIZE = Math.max(100, Math.min(200, Math.floor(window.innerWidth / 10))); // Adaptive trail size

let isDarkMode = false;

let backgroundColor;
let strokeLightness;
let strokeHue;

function updateColors() {
	backgroundColor = isDarkMode ? "#1c2222" : 255;
	strokeHue = isDarkMode ? 20 : 220;
	strokeLightness = isDarkMode ? 10 : 20;
}
updateColors();

let points = [];
let colorSeed;
let stepSpeed;
let currentTime = 0;

let mouseRotation, mouseVelocity;

/**
 * Class representing a chaotic attractor point and its trail.
 */
class AttractorPoint {
	constructor(x, y, z, color, type) {
		this.pos = createVector(x, y, z);
		this.prev = [this.pos.array()]; // Only push initial position once
		this.color = color;
		this.type = type;
		this.h = null;

		// Set constants for this attractor type
		const { o, p, b } = ATTRACTORS[type];
		this.o = o;
		this.p = p;
		this.b = b;
	}

	/**
	 * Calculate next position based on attractor equations.
	 */
	calculate(dt) {
		let { x, y, z } = this.pos;
		let next = this.pos.copy();

		switch (this.type) {
			case 0: // Lorenz
				next.set(
					x + dt * this.o * (y - x),
					y + dt * (x * (this.p - z) - y),
					z + dt * (x * y - this.b * z)
				);
				break;
			case 1: // Chen
				next.set(
					x + dt * this.o * (y - x),
					y + dt * ((this.b - this.o) * x - x * z + this.b * y),
					z + dt * (x * y - this.p * z)
				);
				break;
			case 2: // Chua
				this.h = -0.11 * sin((PI * x) / 2.6);
				next.set(
					x + dt * (this.o * (y - this.h)),
					y + dt * (x - y + z),
					z + dt * (-this.p * y)
				);
				break;
			case 3: // Rossler
				next.set(
					x + dt * (-y - pow(this.o * z, 2)),
					y + dt * (x + this.o * y),
					z + dt * (this.p + z * (x - this.b))
				);
				break;
		}
		this.pos.set(next);
	}

	/**
	 * Draw the point and its trail.
	 */
	draw() {
		this.prev.push(this.pos.array());
		if (this.prev.length > TAIL_SIZE) this.prev.shift();

		// Lightness based on the length of the trail for a fade in effect
		stroke(strokeHue, 120, strokeLightness*(this.prev.length/TAIL_SIZE));
		
		beginShape();
		vertex(...this.prev[this.prev.length - 1]);
		let R = 1;
		for (let i = this.prev.length - 2; i >= 0; i -= R) {
			let v1 = this.prev[i];
			let v2 = this.prev[i + 1];
			let G = Math.sqrt(
				(v1[0] - v2[0]) ** 2 +
				(v1[1] - v2[1]) ** 2 +
				(v1[2] - v2[2]) ** 2
			);
			R = constrain(Math.round(5 / (G + 1)), 1, TAIL_SIZE / 2);
			vertex(...v1);
		}
		vertex(...this.prev[0]);
		endShape();
	}
}

/**
 * Creates and sets up a new attractor shape.
 */
function newAttractor(type) {
	const numShapes = ATTRACTORS.length;
	type = (type + 1) % numShapes;

	// Initial values for each attractor type
	let s = 1, x = 1, y = 1, z = 1;
	switch (type) {
		case 0: s = 20; stepSpeed = 0.0002; break;
		case 1: s = 1; stepSpeed = 0.0005; break;
		case 2: s = 0.01; stepSpeed = 0.01; break;
		case 3: s = 1; x = 20; y = 20; z = 0; stepSpeed = 0.002; break;
	}

	points = [];
	colorSeed = random(0, 100);
	for (let i = 0; i < NUM_POINTS; i++) {
		points.push(new AttractorPoint(
			random(x * s, x * -s),
			random(y * s, y * -s),
			random(z * s, z * -s),
			abs(randomGaussian(colorSeed, 5)) % 100,
			type
		));
	}
	return type;
}

/**
 * Controls the smooth rotation of the shape.
 */
function mouseControl() {
	// Only update mouse rotation if mouse is pressed or moved
	if ((mouseX !== pmouseX || mouseY !== pmouseY)) {
		mouseVelocity.add((mouseX - pmouseX) / 1000, (pmouseY - mouseY) / 1000);
		mouseVelocity.mult(0.02);
		mouseRotation.add(mouseVelocity);
	}
	rotateX(-mouseRotation.y);
	rotateY(-mouseRotation.x);
}

function setup() {
	mouseRotation = createVector(0, 0);
	mouseVelocity = createVector(0, 0);

	frameRate(60);

	let canvas = createCanvas(windowWidth, windowHeight, WEBGL);
	canvas.parent("p5-container");
	strokeWeight(1);
	noFill();

	perspective(PI / 4, width / height, 1, 1000);
	colorMode(HSL);
	blendMode(isDarkMode ? ADD : SUBTRACT);
	camera(0, 0, 70);

	newAttractor(0);
}

function draw() {
	currentTime++;

	if (currentTime%30 == 0) {
		addRandomPoint();
	}
	
	rotateY(currentTime/2000 - PI/10);
	rotateX(currentTime/1000);
	background(backgroundColor);
	blendMode(isDarkMode ? ADD : SUBTRACT);

	push();
	translate(0, 0, -100);
	pop();

	mouseControl();

	noFill();

	push();
	translate(10, 0, -20); // slight x offset
	for (let pt of points) {
		for (let i = 0; i < 10; i++) pt.calculate(stepSpeed);
		pt.draw();
	}
	pop();
}

function addRandomPoint() {
	points.shift();
	points.push(new AttractorPoint(
		random(100, -100),
		random(100, -100),
		random(100, -100),
		strokeHue,
		0
	));
}

window.setLorenzDarkMode = function (isDark) {
  isDarkMode = isDark;
  updateColors();
};