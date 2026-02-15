
const FOUR_WING_CONFIG = {
  A: 0.2,
  B: 0.01,
  C: -0.4,

  // Functional relationship (returns dx,dy,dz)
  f: function (x, y, z) {
    const A = CONFIG.A,
          B = CONFIG.B,
          C = CONFIG.C;
    return {
      dx: A * x + y * z,
      dy: B * x + C * y - x * z,
      dz: -z - x * y
    };
  },

  // Geometry offsets / rotations (degrees → radians later)
  attractorOffsetX: 0,
  attractorOffsetY: 0,
  attractorOffsetZ: 0,
  rotationAlphaDeg: 30,
  rotationBetaDeg: 50,
  rotationGammaDeg: -15,

  // Time step for RK4 integration
  dt: 0.1,

  // Spawning intervals (ms)
  mouseSpawnInterval: 900,
  edgeSpawnInterval: 400,

  // Trail / point lifetimes (ms)
  trailLife: 2000,
  pointLife: 45000,
  fadeIn: 4000,

  // Visual basics
  pointRadius: 0,
  lineWidth: 3,

  // Placement ratios (0‑1)
  offsetXRatio: 0.45,
  offsetYRatio: 0.4,

  // Independent scaling
  scaleXRatio: 20,
  scaleYRatio: 20,

  // Colour‑ellipse parameters
  colorCenterXRatio: 0.5,
  colorCenterYRatio: 0.45,
  ellipseXScale: 1.5,
  ellipseYScale: 1.1,
  ellipseRotationDeg: 0
}

const LORENZ_CONFIG = {
  SIGMA: 10,
  RHO: 28,
  BETA: 8/3,

  // functional relationship
  f: function(x, y, z) {
      return {
        dx: SIGMA * (y - x),
        dy: x * (RHO - z) - y,
        dz: x * y - BETA * z
      };
    },

  attractorOffsetX: 0,   // shift in the Lorenz X direction
  attractorOffsetY: 0,   // shift in the Lorenz Y direction
  attractorOffsetZ: -25, // shift in the Lorenz Z direction
  rotationAlphaDeg:  180,
  rotationBetaDeg:  0,
  rotationGammaDeg: 90,

  dt:                 0.01,  // integration step (seconds)
  mouseSpawnInterval:  900,  // mouse‑seeded point every 5s
  edgeSpawnInterval:   700,  // edge‑seeded point every 10s
  trailLife:          1000,  // overall fade‑out length (ms)
  pointLife:         45000,  // total point lifetime (ms)
  fadeIn:             4000,  // fade‑in duration (ms)

  // Visual basics
  pointRadius: 0,
  lineWidth:   3,

  // ---- Attractor placement / orientation ----
  offsetXRatio: 0.5,    // 0=left edge, 1=right edge (default centre)
  offsetYRatio: 0.5,    // 0=top edge,  1=bottom edge (default centre)

  // ---- Independent scaling of the attractor geometry ----
  scaleXRatio: 2,     // horizontal stretch (>1 larger, <1 smaller)
  scaleYRatio: 2,     // vertical stretch (>1 larger, <1 smaller)

  // ---- Ellipsoidal colour mapping parameters ----
  colorCenterXRatio:  0.5,  // centre of colour ellipse (horizontal)
  colorCenterYRatio: 0.45,  // centre of colour ellipse (vertical)
  ellipseXScale:      1.5,  // horizontal radius multiplier (1=half‑width)
  ellipseYScale:      1.1,  // vertical radius multiplier (1=half‑height)
  ellipseRotationDeg:   0,  // rotation of colour ellipse (degrees CCW)
}

const THOMAS_CONFIG = {
  B: 0.208186;

  // Thomas system functional relationship
  f: function(x, y, z) {
      return {
        dx: Math.sin(y) - B*x,
        dy: Math.sin(z) - B*y,
        dz: Math.sin(x) - B*z
      };
    },

  attractorOffsetX: 0,   // shift in the Lorenz X direction
  attractorOffsetY: 0,   // shift in the Lorenz Y direction
  attractorOffsetZ: 0, // shift in the Lorenz Z direction
  rotationAlphaDeg: 65,
  rotationBetaDeg:  15,
  rotationGammaDeg: 90,

  dt:                  0.1,  // integration step (seconds)
  mouseSpawnInterval:  700,  // mouse‑seeded point every 5s
  edgeSpawnInterval:   400,  // edge‑seeded point every 10s
  trailLife:          2000,  // overall fade‑out length (ms)
  pointLife:         48000,  // total point lifetime (ms)
  fadeIn:             4000,  // fade‑in duration (ms)

  // Visual basics
  pointRadius: 0,
  lineWidth:   3,

  // ---- Attractor placement / orientation ----
  offsetXRatio: 0.5,    // 0=left edge, 1=right edge (default centre)
  offsetYRatio: 0.5,    // 0=top edge,  1=bottom edge (default centre)

  // ---- Independent scaling of the attractor geometry ----
  scaleXRatio: 8,     // horizontal stretch (>1 larger, <1 smaller)
  scaleYRatio: 12,     // vertical stretch (>1 larger, <1 smaller)

  // ---- Ellipsoidal colour mapping parameters ----
  colorCenterXRatio:  0.5,  // centre of colour ellipse (horizontal)
  colorCenterYRatio: 0.45,  // centre of colour ellipse (vertical)
  ellipseXScale:      1.5,  // horizontal radius multiplier (1=half‑width)
  ellipseYScale:      1.1,  // vertical radius multiplier (1=half‑height)
  ellipseRotationDeg:   0,  // rotation of colour ellipse (degrees CCW)
}

const LASER_CONFIG = {
  A: 10,
  B: 1,
  C: 5,
  D: -1,
  E: -5,
  K: -6,

  // Laser system functional relationship
  f: function(x, y, z) {
      return {
        dx: A*y - A*x + B*y*z*z,
        dy: C*x + D*x*z*z,
        dz: E*z + K*x*x,
      };
    },

  attractorOffsetX: 0,   // shift in the Lorenz X direction
  attractorOffsetY: 0,   // shift in the Lorenz Y direction
  attractorOffsetZ: 2.5, // shift in the Lorenz Z direction
  rotationAlphaDeg:30,
  rotationBetaDeg: 0,
  rotationGammaDeg: 90,

  dt:                  0.005,  // integration step (seconds)
  mouseSpawnInterval:  900,  // mouse‑seeded point every 5s
  edgeSpawnInterval:   700,  // edge‑seeded point every 10s
  trailLife:          2500,  // overall fade‑out length (ms)
  pointLife:         50000,  // total point lifetime (ms)
  fadeIn:             4000,  // fade‑in duration (ms)

  // Visual basics
  pointRadius: 0,
  lineWidth:   3,

  // ---- Attractor placement / orientation ----
  offsetXRatio: 0.6,    // 0=left edge, 1=right edge (default centre)
  offsetYRatio: 0.55,    // 0=top edge,  1=bottom edge (default centre)

  // ---- Independent scaling of the attractor geometry ----
  scaleXRatio: 15,     // horizontal stretch (>1 larger, <1 smaller)
  scaleYRatio: 15,     // vertical stretch (>1 larger, <1 smaller)

  // ---- Ellipsoidal colour mapping parameters ----
  colorCenterXRatio:  0.5,  // centre of colour ellipse (horizontal)
  colorCenterYRatio: 0.5,  // centre of colour ellipse (vertical)
  ellipseXScale:      1.5,  // horizontal radius multiplier (1=half‑width)
  ellipseYScale:      1.1,  // vertical radius multiplier (1=half‑height)
  ellipseRotationDeg:   0,  // rotation of colour ellipse (degrees CCW)
}

const CHEN_CONFIG = {
  A: 5,
  B: -10,
  C: -0.38,

  // Thomas system functional relationship
  f: function(x, y, z) {
      return {
        dx: A * x - y * z,
        dy: B *y + x * z,
        dz: C * z + x * y / 3,
      };
    },

  attractorOffsetX: 0,   // shift in the Lorenz X direction
  attractorOffsetY: 0,   // shift in the Lorenz Y direction
  attractorOffsetZ: 0, // shift in the Lorenz Z direction
  rotationAlphaDeg: 65,
  rotationBetaDeg:  35,
  rotationGammaDeg: 85,

  dt:                 0.01,  // integration step (seconds)
  mouseSpawnInterval: 1000,  // mouse‑seeded point every 5s
  edgeSpawnInterval:  1500,  // edge‑seeded point every 10s
  trailLife:          5000,  // overall fade‑out length (ms)
  pointLife:         75000,  // total point lifetime (ms)
  fadeIn:             4000,  // fade‑in duration (ms)

  // Visual basics
  pointRadius: 0,
  lineWidth:   3,

  // ---- Attractor placement / orientation ----
  offsetXRatio: 0.5,    // 0=left edge, 1=right edge (default centre)
  offsetYRatio: 0.5,    // 0=top edge,  1=bottom edge (default centre)

  // ---- Independent scaling of the attractor geometry ----
  scaleXRatio: 1.75,     // horizontal stretch (>1 larger, <1 smaller)
  scaleYRatio: 2.5,     // vertical stretch (>1 larger, <1 smaller)

  // ---- Ellipsoidal colour mapping parameters ----
  colorCenterXRatio:  0.5,  // centre of colour ellipse (horizontal)
  colorCenterYRatio: 0.45,  // centre of colour ellipse (vertical)
  ellipseXScale:      1.5,  // horizontal radius multiplier (1=half‑width)
  ellipseYScale:      1.1,  // vertical radius multiplier (1=half‑height)
  ellipseRotationDeg:   0,  // rotation of colour ellipse (degrees CCW)
}
