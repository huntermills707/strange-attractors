# Strange Attractors Visualization

A web-based interactive visualization of mathematical strange attractors, with all calculations performed client-side in the browser.

## Overview

This project renders **strange attractors**—mathematical structures arising from dynamical systems displaying chaotic behavior. The entire simulation runs in your browser, generating intricate fractal-like patterns from iterative mathematical equations without requiring any server-side processing.

## Motivations

This project was developed as an interactive background component for Hugo static sites. Inspired by techniques for embedding p5.js and JavaScript visualizations in static site generators, this implementation creates a living, mathematical backdrop that adds dynamic visual interest to otherwise static pages.

The approach follows methods described by Andreas Handel for [testing JavaScript visualizations in Hugo sites](https://aimundo.rbind.io/blog/2021-07-25-testing-javascript-visualizations/) and Nathan's guide on [using p5.js as a background for Hugo](https://nathan.exchange/posts/p5js-background-for-hugo/). These resources demonstrate how to seamlessly integrate Processing/p5.js sketches into Hugo's templating system while maintaining site performance.

See it in action at [volundarhus.com](https://volundarhus.com), where the attractor visualization runs as a full-page background behind the site content.

## Features

- **Client-Side Computation**: All attractor calculations performed in real-time using JavaScript
- **Real-time Visualization**: Interactive rendering of complex geometric patterns via HTML5 Canvas
- **Configurable Systems**: Adjust attractor parameters in `strange-attractor-config.js` to explore different equations (Lorenz, Thomas, Chen, etc.)
- **Customizable Rendering**: Modify color schemes, point sizes, and trail effects through `color-config.js`
- **Zero Dependencies**: Pure client-side application—no server or installation required

## Project Structure

```
strange-attractors/
├── index.html                  # Main HTML page and canvas container
├── strange-attractor.js        # Core visualization and calculation logic
├── strange-attractor-config.js # Attractor equations and parameter configurations
├── color-config.js             # Color palettes and rendering styles
├── style.css                   # Web interface styling
├── start_py.sh                 # Optional: launches local Python HTTP server
├── start_js.sh                 # Optional: launches local Node.js HTTP server
└── raw_html/                   # Legacy HTML files with all in one implementaions

```

## Usage

### Quick Start (Standalone)

Simply open `index.html` directly in any modern web browser:

```bash
# Linux/Mac
open index.html

# Windows
start index.html
```

Or double-click the file in your file manager.

### Local Server (Optional)

For development or avoiding CORS issues with module imports:

**Using Python (simple HTTP server):**
```bash
./start_py.sh
# Or manually: python3 -m http.server 8000
```

**Using Node.js:**
```bash
./start_js.sh
# Or manually: npx serve or node server.js
```

Then navigate to `http://localhost:8000`.

### Configuration

- **Attractor Parameters**: Edit `strange-attractor-config.js` to change equations, initial conditions, time steps, or switch between attractor types
- **Visual Appearance**: Edit `color-config.js` to adjust color gradients, background colors, point opacity, and trail persistence

## Technical Details

- **Computation Engine**: Pure JavaScript—iterates millions of points using attractor equations directly in the browser
- **Rendering**: HTML5 Canvas API for high-performance pixel manipulation and trail rendering
- **Architecture**: Modular ES6 modules separating mathematical logic (`strange-attractor.js`), configuration (`*-config.js`), and presentation (`style.css`)
- **Performance**: Optimized for 60fps rendering with configurable iteration counts

## Browser Compatibility

- Chrome/Edge
- Firefox
- Safari
- Opera

## Contributing

Areas for expansion:
- Additional attractor types (Thomas, Duffing, Chua, Halvorsen, etc.)
- Real-time parameter adjustment UI (sliders/controls)
- 3D attractor support with WebGL