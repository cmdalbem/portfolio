// Mathematical constants for attractors
const ATTRACTORS = [
	{ o: 10, p: 28, b: 8.0 / 3.0 },         // Lorenz
	// { o: 40, p: 3, b: 28 },             // Chen
	// { o: 10.82, p: 14.286, b: null },   // Chua
	// { o: 0.1, p: 0.1, b: 14 }           // Rossler
];

const NUM_POINTS = 100;
const TAIL_SIZE = 200;

let isDarkMode = false;

let BACKGROUND_COLOR;
let STROKE_LIGHTNESS;

function updateColors() {
	BACKGROUND_COLOR = isDarkMode ? "#1c2222" : 255;
	STROKE_HUE = isDarkMode ? 220 : 20;
	STROKE_LIGHTNESS = isDarkMode ? 10 : 20;
}

let points = [];
let colorSeed;
let stepSpeed;
let time = 0;

let mouseRotation, mouseVelocity;

/**
 * Class representing a chaotic attractor point and its trail.
 */
class AttractorPoint {
	constructor(x, y, z, color, type) {
		this.pos = createVector(x, y, z);
		this.prev = [this.pos.array(), this.pos.array()];
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
		let next = createVector();

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

		//calculates the color of the trail based on the speed of the point
		// let G;
		// this.v1.set(createVector(this.prev[this.prev.length-1][0],this.prev[this.prev.length-1][1],this.prev[this.prev.length-1][2]));
		// this.v2.set(createVector(this.prev[this.prev.length-2][0],this.prev[this.prev.length-2][1],this.prev[this.prev.length-2][2]));
		// this.mod = p5.Vector.sub(this.v1,this.v2);
		// G = this.mod.mag();
		stroke(STROKE_HUE, 30, STROKE_LIGHTNESS*(this.prev.length/TAIL_SIZE));
		
		beginShape();
		vertex(...this.prev[this.prev.length - 1]);
		let R = 1;
		for (let i = this.prev.length - 2; i >= 0; i -= R) {
			let v1 = createVector(...this.prev[i]);
			let v2 = createVector(...this.prev[i + 1]);
			let G = p5.Vector.sub(v1, v2).mag();
			R = constrain(round(5 / (G + 1)), 1, TAIL_SIZE / 2);
			vertex(...this.prev[i]);
		}
		vertex(...this.prev[0]);
		endShape();
		// Uncomment to draw a sphere at the front
		// push();
		// translate(this.pos.x, this.pos.y, this.pos.z);
		// sphere(0.5, 3, 3);
		// pop();
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
		case 0: s = 20; stepSpeed = 0.0005; break;
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
	// if (mouseIsPressed) {
	mouseVelocity.add((mouseX - pmouseX) / 1000, (pmouseY - mouseY) / 1000);
	// }
	mouseVelocity.mult(0.1);
	mouseRotation.add(mouseVelocity);
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
	camera(0, 0, 80);

	newAttractor(0);
}

function draw() {
	time++;
	
	rotateY(time/2000 - PI/10);
	rotateX(time/1000);
	background(BACKGROUND_COLOR);
	blendMode(isDarkMode ? ADD : SUBTRACT);

	push();
	translate(0, 0, -100);
	pop();

	mouseControl();
	noFill();

	push();
	translate(0, 0, -20);
	for (let pt of points) {
		for (let i = 0; i < 10; i++) pt.calculate(stepSpeed);
		pt.draw();
	}
	pop();
}

window.setLorenzDarkMode = function (isDark) {
  isDarkMode = isDark;
  updateColors();
};