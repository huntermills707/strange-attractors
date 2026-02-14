// mysketch.js
// Uses global variable 'THEME_CONFIG' defined in color-config.js

let currentMode = 'flow';

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.class('backgroundsketch');

  // Use config to set initial background
  background(THEME_CONFIG.flow.background);

  // Attach buttons
  document.getElementById('btn-flow').addEventListener('click', () => {
    currentMode = 'flow';
    background(THEME_CONFIG.flow.background);
  });

  document.getElementById('btn-balls').addEventListener('click', () => {
    currentMode = 'balls';
    background(THEME_CONFIG.balls.background);
  });
}

function draw() {
  if (currentMode === 'flow') {
    drawFlowField();
  } else if (currentMode === 'balls') {
    drawBouncingBalls();
  }
}

// --- Animation 1: Flow Field ---
function drawFlowField() {
  // Access global config
  let bg = THEME_CONFIG.flow.background;
  let primary = THEME_CONFIG.flow.primary;
  let fade = THEME_CONFIG.common.fadeAmount;

  // Convert Hex to RGB to add alpha for trailing effect
  let c = color(bg);
  c.setAlpha(fade); 
  background(c);

  push();
  translate(mouseX, mouseY);
  rotate(frameCount * 0.05);
  noStroke();
  fill(primary);
  rectMode(CENTER);
  rect(0, 0, 50, 50);
  pop();

  updateText("Flow Field Mode");
}

// --- Animation 2: Bouncing Balls ---
function drawBouncingBalls() {
  // Access global config
  let bg = THEME_CONFIG.balls.background;
  let secondary = THEME_CONFIG.balls.secondary;

  // Convert Hex to RGB to add alpha
  let c = color(bg);
  c.setAlpha(20); // Harder fade for balls
  background(c);

  fill(secondary);
  noStroke();

  let x = (width / 2) + sin(frameCount * 0.1) * 200;
  let y = (height / 2) + cos(frameCount * 0.15) * 100;
  circle(x, y, 40);

  updateText("Bouncing Balls Mode");
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // Reset background on resize to prevent glitchy trails
  background(currentMode === 'flow' ? THEME_CONFIG.flow.background : THEME_CONFIG.balls.background);
}

// Helper to update HTML text
function updateText(msg) {
  let el = document.getElementById('info-text');
  if (el.innerText !== msg) {
    el.innerText = msg;
  }
}
