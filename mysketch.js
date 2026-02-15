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

// ----------------------------------------------------------
// p5.js lifecycle
// ----------------------------------------------------------
function setup() {
  const myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.class('backgroundsketch');
  // Use a dark background that slowly fades (same colour as original)
  background(30, 45, 71);
  // No continuous looping of `draw()` until we add points – but we want it always running.
  // So nothing special here.
}

function draw() {
  const now = millis();

  // Fade‑out the previous frame (semi‑transparent overlay)
  background(30, 45, 71, 64); // 64/255 ≈ 0.25 opacity (matches rgba(30,45,71,0.25))

  // ---- Spawn new points if enough time elapsed ----
  if (now - lastMouseSpawn > CONFIG.mouseSpawnInterval) {
    const { x, y, z } = inverseProject(mouseX, mouseY, 0);
    points.push(new Point(x, y, z));
    lastMouseSpawn = now;
  }

  if (now - lastEdgeSpawn > CONFIG.edgeSpawnInterval) {
    spawnEdgePoint();
    lastEdgeSpawn = now;
  }

  // ---- Update / draw all points ----
  for (let i = points.length - 1; i >= 0; i--) {
    const p = points[i];
    p.step(CONFIG.dt);
    p.pruneTrail(now);
    p.draw(now);
    if (p.expired(now)) points.splice(i, 1);
  }
}

// ----------------------------------------------------------
// Edge‑seeded point generation (same logic as original)
// ----------------------------------------------------------
function spawnEdgePoint() {
  const side = floor(random(4));
  let sx, sy;
  if (side === 0) {            // left
    sx = 0;
    sy = random(height);
  } else if (side === 1) {     // top
    sx = random(width);
    sy = 0;
  } else if (side === 2) {     // right
    sx = width;
    sy = random(height);
  } else {                     // bottom
    sx = random(width);
    sy = height;
  }
  const { x, y, z } = inverseProject(sx, sy, 0);
  points.push(new Point(x, y, z));
}

// ----------------------------------------------------------
// Pre‑computed radians for rotations
// ----------------------------------------------------------
const rad = deg => deg * Math.PI / 180;
const attractorAlphaRotRad = rad(CONFIG.rotationAlphaDeg);
const attractorBetaRotRad  = rad(CONFIG.rotationBetaDeg);
const attractorGammaRotRad = rad(CONFIG.rotationGammaDeg);
const ellipseRotRad        = rad(CONFIG.ellipseRotationDeg);

// ----------------------------------------------------------
// Global state
// ----------------------------------------------------------
let points = [];               // active Point objects
let lastMouseSpawn = 0;        // timestamp of last mouse‑spawn
let lastEdgeSpawn = 0;         // timestamp of last edge‑spawn

// ----------------------------------------------------------
// Helper maths (identical to original)
// ----------------------------------------------------------
function project(x, y, z) {
  // Global attractor offset
  const xr = x + CONFIG.attractorOffsetX;
  const yr = y + CONFIG.attractorOffsetY;
  const zr = z + CONFIG.attractorOffsetZ;

  // ---------- Rotation ----------
  // Gamma
  const xg = xr;
  const yg = yr * Math.cos(attractorGammaRotRad) - zr * Math.sin(attractorGammaRotRad);
  const zg = yr * Math.sin(attractorGammaRotRad) + zr * Math.cos(attractorGammaRotRad);
  // Beta
  const xb = xg * Math.cos(attractorBetaRotRad) + zg * Math.sin(attractorBetaRotRad);
  const yb = yg;
  const zb = -xg * Math.sin(attractorBetaRotRad) + zg * Math.cos(attractorBetaRotRad);
  // Alpha
  const xa = xb * Math.cos(attractorAlphaRotRad) - yb * Math.sin(attractorAlphaRotRad);
  const ya = xb * Math.sin(attractorAlphaRotRad) + yb * Math.cos(attractorAlphaRotRad);
  const za = zb;

  // ---------- Canvas‑proportional offset ----------
  const offsetX = CONFIG.offsetXRatio * width;
  const offsetY = CONFIG.offsetYRatio * height;

  // ---------- Final screen coordinates ----------
  const sx = offsetX + xa * width / 100 * CONFIG.scaleXRatio;
  const sy = offsetY - ya * height / 100 * CONFIG.scaleYRatio;
  const sz = za;
  return { sx, sy, sz };
}

function inverseProject(sx, sy, sz) {
  // Undo canvas offset
  const offsetX = CONFIG.offsetXRatio * width;
  const offsetY = CONFIG.offsetYRatio * height;
  const xOff = sx - offsetX;
  const yOff = offsetY - sy;

  // Undo scaling
  const xr = xOff / width * 100 / CONFIG.scaleXRatio;
  const yr = yOff / height * 100 / CONFIG.scaleYRatio;
  const zr = sz;

  // Undo rotation (reverse order, negative angles)
  // Alpha
  const xa = xr * Math.cos(-attractorAlphaRotRad) - yr * Math.sin(-attractorAlphaRotRad);
  const ya = xr * Math.sin(-attractorAlphaRotRad) + yr * Math.cos(-attractorAlphaRotRad);
  const za = zr;
  // Beta
  const xb = xa * Math.cos(-attractorBetaRotRad) + za * Math.sin(-attractorBetaRotRad);
  const yb = ya;
  const zb = -xa * Math.sin(-attractorBetaRotRad) + za * Math.cos(-attractorBetaRotRad);
  // Gamma
  const xg = xb;
  const yg = yb * Math.cos(-attractorGammaRotRad) - zb * Math.sin(-attractorGammaRotRad);
  const zg = yb * Math.sin(-attractorGammaRotRad) + zb * Math.cos(-attractorGammaRotRad);

  // Undo global offset
  const x = xg - CONFIG.attractorOffsetX;
  const y = yg - CONFIG.attractorOffsetY;
  const z = zg - CONFIG.attractorOffsetZ;
  return { x, y, z };
}

// Colour‑ellipse helpers -------------------------------------------------
function rotateEllipsePoint(px, py) {
  const cx = CONFIG.colorCenterXRatio * width;
  const cy = CONFIG.colorCenterYRatio * height;
  const dx = px - cx;
  const dy = py - cy;
  const cosR = Math.cos(-ellipseRotRad);
  const sinR = Math.sin(-ellipseRotRad);
  const rx = dx * cosR - dy * sinR;
  const ry = dx * sinR + dy * cosR;
  return { x: cx + rx, y: cy + ry };
}

function ellipsoidalNorm(px, py) {
  const { x, y } = rotateEllipsePoint(px, py);
  const cx = CONFIG.colorCenterXRatio * width;
  const cy = CONFIG.colorCenterYRatio * height;
  const a = (width / 2) * CONFIG.ellipseXScale;   // horiz semi‑axis
  const b = (height / 2) * CONFIG.ellipseYScale; // vert semi‑axis
  const dx = x - cx;
  const dy = y - cy;
  const norm = Math.sqrt((dx * dx) / (a * a) + (dy * dy) / (b * b));
  return Math.min(1, norm);
}

// Linear interpolation between two RGB triples (0‑1 range)
function lerpRGB(c1, c2, t) {
  return [
    c1[0] + (c2[0] - c1[0]) * t,
    c1[1] + (c2[1] - c1[1]) * t,
    c1[2] + (c2[2] - c1[2]) * t
  ];
}

// Colour from LUT, **inverted** (0↔1)
function colourFromLUT(t) {
  const lut = CONFIG.colourLUT;
  const maxIdx = lut.length - 1;
  const invT = 1 - t;
  const exact = invT * maxIdx;
  const idxLow = Math.floor(exact);
  const idxHigh = Math.min(maxIdx, idxLow + 1);
  const frac = exact - idxLow;
  const rgb = lerpRGB(lut[idxLow], lut[idxHigh], frac);
  // Convert to p5 colour (0‑255 range)
  return color(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255);
}

// ----------------------------------------------------------
// Point class – holds a Lorenz trajectory and its trail
// ----------------------------------------------------------
class Point {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.birth = millis(); // p5 timestamp
    this.trail = [];

    const start = project(x, y, z);
    this.trail.push({ sx: start.sx, sy: start.sy, sz: start.sz, t: this.birth });
  }

  // One RK4 integration step (unchanged dynamics)
  step(dt) {
    const { f } = CONFIG;
    const k1 = f(this.x, this.y, this.z);
    const k2 = f(this.x + k1.dx * dt / 2, this.y + k1.dy * dt / 2, this.z + k1.dz * dt / 2);
    const k3 = f(this.x + k2.dx * dt / 2, this.y + k2.dy * dt / 2, this.z + k2.dz * dt / 2);
    const k4 = f(this.x + k3.dx * dt, this.y + k3.dy * dt, this.z + k3.dz * dt);

    this.x += dt / 6 * (k1.dx + 2 * k2.dx + 2 * k3.dx + k4.dx);
    this.y += dt / 6 * (k1.dy + 2 * k2.dy + 2 * k3.dy + k4.dy);
    this.z += dt / 6 * (k1.dz + 2 * k2.dz + 2 * k3.dz + k4.dz);

    const p = project(this.x, this.y, this.z);
    this.trail.push({
      sx: isNaN(p.sx) ? 1e15 : p.sx,
      sy: isNaN(p.sy) ? 1e15 : p.sy,
      sz: isNaN(p.sz) ? 1e15 : p.sz,
      t: millis()
    });
  }

  // Remove old segments beyond `trailLife`
  pruneTrail(now) {
    const limit = now - CONFIG.trailLife;
    while (this.trail.length && this.trail[0].t < limit) this.trail.shift();
  }

  // Fade‑in factor for newly created trail pieces
  fadeInFactor(age) {
    const fi = CONFIG.fadeIn;
    return fi <= 0 ? 1 : Math.min(1, age / fi);
  }

  // Draw the whole polyline + head point
  draw(now) {
    const pointAge = now - this.birth;
    const fadeOutStart = CONFIG.pointLife - CONFIG.trailLife;
    const tailFadeProgress = Math.max(
      0,
      (pointAge - fadeOutStart) / CONFIG.trailLife
    );

    strokeWeight(CONFIG.lineWidth);

    // ----- Polyline (segments) -----
    for (let i = 1; i < this.trail.length; i++) {
      const a = this.trail[i - 1];
      const b = this.trail[i];
      const segAge = now - a.t;
      const fadeIn = this.fadeInFactor(segAge);
      const relIdx = (i - 1) / (this.trail.length - 1); // 0=tail, 1=head
      const tailFade = Math.min(1, tailFadeProgress * (1 - relIdx));
      const alpha = fadeIn * (1 - tailFade);
      if (alpha <= 0) continue;

      const t = ellipsoidalNorm(a.sx, a.sy);
      const baseCol = colourFromLUT(t);
      const colWithAlpha = color(red(baseCol), green(baseCol), blue(baseCol), alpha * 255);
      stroke(colWithAlpha);
      line(a.sx, a.sy, b.sx, b.sy);
    }

    // ----- Head point -----
    const cur = this.trail[this.trail.length - 1];
    if (cur) {
      const age = now - cur.t;
      const fadeIn = this.fadeInFactor(age);
      const tailFade = Math.min(1, tailFadeProgress);
      const alpha = fadeIn * (1 - tailFade);
      const t = ellipsoidalNorm(cur.sx, cur.sy);
      const baseCol = colourFromLUT(t);
      const colWithAlpha = color(red(baseCol), green(baseCol), blue(baseCol), alpha * 255);
      fill(colWithAlpha);
      noStroke();

      const radius = this.trail.length === 1 ? CONFIG.pointRadius * 1.5 : CONFIG.pointRadius;
      ellipse(cur.sx, cur.sy, radius * 2, radius * 2);
    }
  }

  // Has the point lived past `pointLife`?
  expired(now) {
    return now - this.birth > CONFIG.pointLife;
  }
}

// ----------------------------------------------------------
// Window resize handling (p5 hook)
// ----------------------------------------------------------
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


