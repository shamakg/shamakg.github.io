/* ============================================================
   PORTFOLIO — app.js
   Grand tree · Falling leaves · Cherry petals · Pixel squirrel
   ============================================================ */

'use strict';

/* ============================================================
   PROJECT DATA  — update this to add / edit projects
   ============================================================ */
const PROJECTS = [
  {
    id: 'auv',
    title: 'Autonomous Underwater Vehicle',
    subtitle: "It's Not That Deep",
    desc: 'Built at MIT Lincoln Laboratory — a competition AUV with YOLOv8 real-time detection, hierarchical ROS control, and autonomous path planning strategies including orbiting, flanking, and pure pursuit.',
    longDesc: `I had the pleasure of completing this project at MIT Lincoln Laboratory. The goal was to build an AUV that could locate, track, and pursue other vehicles in the water. This was one of my first experiences with the ROS middleware, and it was a great opportunity to incorporate very familiar concepts such as vision pipelines and motion planning (PIDs) to an unfamiliar environment: underwater!

Much love to our robot: It's Not That Deep.`,
    tech: ['Python', 'ROS', 'YOLOv8', 'OpenCV', 'MavLink', 'Gazebo', 'Raspberry Pi', 'PID Control'],
    github: 'https://github.com/shamakg/AUV-Group-Github',
    demo: null,
    highlights: [
      { label: 'Venue', value: 'MIT Lincoln Lab' },
      { label: 'Detection', value: '90% Accuracy' },
      { label: 'Inference', value: '5 FPS on RPi' },
      { label: 'Heading', value: '±2° Accuracy' },
    ],
    sections: [
      {
        title: 'Controls',
        body: `We designed a hierarchical control system in ROS from scratch. Implemented a heading controller with ±2° accuracy using compass feedback and a depth controller with feedback from pressure sensors.

Utilized MavLink as the communication protocol between the ground station and the AUV. Created a custom simulator using QGroundControl for path planning. All motion was first simulated in Gazebo before live testing in the water.`,
        images: ['projects/auv/auv-05.png', 'projects/auv/auv-04.png'],
        sideImage: 'projects/auv/auv-07.png',
        sideImageRound: false
      },
      {
        title: 'Path Planning',
        body: `To gain a competitive edge against other AUVs, we developed autonomous path planning strategies, experimenting with several state-of-the-art planning mechanisms.

Built algorithms for waypoint navigation, obstacle-aware maneuvering, and multi-step movement strategies such as orbiting, flanking, and coordinated approach paths. Our final path planning strategy was a simplified State Space of orbiting, flanking, and pure pursuit.`,
        images: ['projects/auv/auv-03.png', 'projects/auv/auv-06.png'],
        sideImage: 'projects/auv/auv-08.png',
        sideImageRound: true
      },
      {
        title: 'Vision',
        body: `We also trained a YOLOv8 deep learning model to detect and track other AUVs in real time. This required collecting diverse training data, iterating on model architecture, and optimizing for edge deployment on the vehicle's compute hardware.

We achieved 90% detection accuracy on test dataset, and real-time, albeit slow, inference on RPi CPU (5 FPS).

Results showed robust tracking across varying lighting and water clarity.`,
        images: ['projects/auv/auv-09.png', 'projects/auv/auv-10.png']
      },
    ],
    aboutImage: 'projects/auv/auv-12.png',
    featuredImage: 'projects/auv/auv-11.png',
    resultImages: [],
    images: ['projects/auv/auv-thumbnail.jpg'],
    videos: []
  },
  {
    id: 'gaussian-image',
    title: 'GaussianImage',
    subtitle: '2D Gaussian Splatting for Image Compression',
    desc: 'A from-scratch implementation of the GaussianImage paper — representing images as fields of 2D Gaussians using Cholesky covariance factorization, trained end-to-end.',
    longDesc: `This project was my best recreation of the GaussianImage Paper. 3D Gaussian Splatting has become a very popular phrase in my life — mainly because in my research lab (AUTOLab), I'm working on figuring out ways to use Gaussian Splatting to model and disambiguate/trace thin cables and hoses, possibly eliminating the current need for robot primitives to trace cables.

I wanted to familiarize myself with the math behind Gaussian Splatting, and I came upon a paper that did something very interesting: 2D Gaussian Splatting for compression applications. I'll do my best to explain my process below.

A decent quality image is $512 \\times 512$ (over $750,000$ data points for RGB). Through 2D Gaussian Splatting, we can train Gaussians to represent this image but with less data. Suppose we use $30,000$ Gaussians for this image. Each one contains 9 parameters (at least the ones in the paper), which gives $270,000$ data points, which is a decent compression from the original data!`,
    tech: ['Python', 'PyTorch', 'Gaussian Splatting', 'Computer Vision', 'NumPy'],
    github: null,
    demo: null,
    thumbnail: 'projects/gaussian/thumb.jpg',
    cardVideo: 'projects/gaussian/v1.mp4',
    localVideos: [
      'projects/gaussian/v1.mp4',
      'projects/gaussian/v2.mp4',
      'projects/gaussian/v3.mp4',
    ],
    sections: [
      {
        title: 'Covariance Methods',
        body: `There are two methods to shape our Gaussians (there may be more, but only two were mentioned in the paper). Both require 9 parameters for every Gaussian.

The first is the Rotation Scaling Method, which is the most intuitive. This is a very straightforward rotation and scaling transformation. We grab the width and height handles to stretch it, and rotate the entire shape by an angle $\\theta$.
$$\\Sigma = R S S^T R^T$$
Where:
$$S = \\begin{bmatrix} s_x & 0 \\\\ 0 & s_y \\end{bmatrix}, \\quad R = \\begin{bmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{bmatrix}$$

To understand the second method (Cholesky Factorization), we must understand a deeper question: what exactly is a 2D Gaussian function?

We're familiar with a 1D Gaussian, whose width and spread are controlled by $\\sigma^2$. A 2D Gaussian is simply an ellipse, defined not by a single $\\sigma^2$ but by a covariance matrix:
$$\\Sigma = \\begin{bmatrix} \\sigma_x^2 & \\sigma_{xy} \\\\ \\sigma_{yx} & \\sigma_y^2 \\end{bmatrix}$$

In order for this to represent a physically sensible Gaussian, the covariance matrix must be symmetric and positive semi-definite (since covariance is commutative, $\\sigma_{xy} = \\sigma_{yx}$, and the ellipse width must be positive).

Cholesky factorization uses a lower triangular matrix $L$:
$$L = \\begin{bmatrix} s_1 & 0 \\\\ s_2 & s_3 \\end{bmatrix}$$

We multiply this by its transpose to get our guaranteed symmetric positive semi-definite covariance matrix:
$$\\Sigma = L L^T = \\begin{bmatrix} s_1^2 & s_1 s_2 \\\\ s_1 s_2 & s_2^2 + s_3^2 \\end{bmatrix}$$

The implementation I chose was the Cholesky factorization.`,
        images: [],
      },
      {
        title: 'Optimization',
        body: `How do we actually optimize the Gaussians? We can think of a Gaussian somewhat as a PDF where the center is where the brightness is $100\\%$ solid. The probability density just tells how bright a specific pixel should be based on how close it is to the center of the ellipse.

We calculate the precision matrix ($\\Sigma^{-1}$) to find this density, mapping out the shape-warped distance ($\\sigma_n$) from the pixel coordinate $\\mathbf{x}$ to the Gaussian mean $\\boldsymbol{\\mu}$:
$$\\sigma_n = \\frac{1}{2} (\\mathbf{x} - \\boldsymbol{\\mu})^T \\Sigma^{-1} (\\mathbf{x} - \\boldsymbol{\\mu})$$

Then we perform alpha blending with a normalized weighted sum reduction equation to get our final compressed image after normalization:
$$\\text{Pixel Color} = \\frac{\\sum_{n} G_n \\cdot c_n}{\\sum_{n} G_n + \\epsilon}$$

Where $G_n = \\text{sigmoid}(o_n) \\cdot \\exp(-\\sigma_n)$, which acts as our alpha mask, and $c_n$ represents the color parameters.`,
        images: [],
      },
    ],
    images: [],
    videos: [],
  },
  {
    id: 'jei-ml-alloys',
    title: 'ML Predictions of Additively Manufactured Alloy Crack Susceptibilities',
    desc: 'Published in the Journal of Emerging Investigators — a multi-model ML pipeline predicting solidification cracking in metal alloys for additive manufacturing, achieving top accuracy with Random Forest.',
    longDesc: '',
    tech: ['Python', 'Machine Learning', 'Random Forest', 'Scikit-learn', 'Additive Manufacturing', 'Materials Science'],
    github: null,
    demo: null,
    pdfEmbed: 'projects/jei/article.pdf',
    thumbnail: 'projects/jei/cover.png',
    images: [],
    videos: []
  },
  {
    id: 'fire-mapping',
    title: 'Fire Proneness Mapping',
    subtitle: 'Wildfire Risk Prediction for California',
    desc: 'LSTM wildfire risk predictor for California: 88% accuracy at 1-square-mile resolution, trained on 10+ years of Landsat satellite data and deployed as an interactive web app.',
    longDesc: `Wildfires in California have been getting worse every year, and most existing prediction tools are stuck at county-level granularity. I wanted to build something that worked at a resolution actually useful for emergency planning: one square mile, fine enough to matter.

The interesting challenge here wasn't the model, it was the data. Thousands of GIS satellite files with mismatched coordinate systems, cloud cover removing 20% of usable images, and a severe class imbalance (fires are rare, which is good, but makes training hard) that kept early models stuck at 40-60% accuracy. Getting to 88% took a lot of data engineering and careful thinking about how to handle that imbalance.

The deployed app lets users click any grid cell in California, scrub through 10+ years of predictions, and inspect the underlying environmental features driving the risk score.`,
    tech: ['Python', 'PyTorch', 'LSTM', 'Landsat 8/9', 'SMOTE', 'GeoPandas', 'GDAL', 'Folium'],
    github: 'https://github.com/shamakg/forest-fire-prediction',
    demo: 'https://shamakg.vercel.app/projects/fire-proneness-mapping',
    highlights: [
      { label: 'Accuracy', value: '88%' },
      { label: 'Resolution', value: '1 sq mile' },
      { label: 'Data Span', value: '10+ years' },
      { label: 'Response', value: '<1ms' },
    ],
    sections: [
      {
        title: 'Data Pipeline',
        body: `Roughly half the total project time was spent wrangling data, not training models.

The raw inputs were thousands of Landsat satellite GIS files paired with historical weather records. The main headaches: inconsistent coordinate systems across files, cloud cover invalidating 20% of images outright, and storage ballooning fast at full resolution. I built an automated geo-cropping pipeline using file metadata to align everything to a unified 1-square-mile grid, filtered cloudy frames, and converted the final dataset to .parquet, cutting storage by 60%.

Eight predictive features made it into the final dataset: temperature, precipitation, leaf area index, vapor pressure deficit, wind speed, drought index, NDVI from Landsat 8/9 (it outperforms MODIS for California dryland ecosystems), and power line proximity.`,
        images: ['projects/fire/fire-01.png', 'projects/fire/fire-02.png'],
      },
      {
        title: 'Model',
        body: `The model is an LSTM that looks at 10-week sequences of weather and vegetation data to predict binary fire occurrence in the following week.

The hard part was class imbalance. Fires happen in maybe 1-2% of grid-week pairs, so a naive model just predicts "no fire" everywhere and hits 98% accuracy while being completely useless. I applied SMOTE to synthetically oversample fire events and added weighted loss terms to penalize missed detections. That combination pushed accuracy from the initial 40-60% range up to 88% on the held-out test set.`,
        images: ['projects/fire/fire-05.png', 'projects/fire/fire-06.png'],
      },
      {
        title: 'Web App',
        body: `Real-time LSTM inference on a full California grid takes seconds per query, too slow for a web app. The fix was to precompute all predictions offline and store them in a CSV, so the app does fast lookups at query time. Response times dropped from 2+ seconds to under a millisecond.

The app shows a clickable heatmap of California, temporal controls spanning the full 10+ year dataset, and a sidebar with the raw environmental features for any selected grid cell, so users can see not just the risk score but what's driving it.`,
        images: ['projects/fire/fire-demo.mp4'],
        wideMedia: true,
      },
    ],
    aboutImage: null,
    featuredImage: null,
    resultImages: [],
    images: ['projects/fire/wildfire.jpg'],
    videos: []
  }
];

/* ============================================================
   UTILITIES
   ============================================================ */
const rand    = (a, b) => Math.random() * (b - a) + a;
const randInt = (a, b) => Math.floor(rand(a, b + 1));
const clamp   = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const lerp    = (a, b, t) => a + (b - a) * t;

/* Easing functions */
const easeInOutQuad = t => t < 0.5 ? 2*t*t : 1-(-2*t+2)**2/2;
const easeOutBack   = t => { const c1=1.70158, c3=c1+1; return 1+c3*(t-1)**3+c1*(t-1)**2; };
const easeInQuad    = t => t * t;

/* ============================================================
   A. TREE — large_tree.png rendered statically on a canvas.
   Leaves spawn from positions within the tree's screen area and
   fall independently; the tree image is never modified.
   ============================================================ */
let treeCanvas, treeCtx;
let treeReady     = false;
let treeSpawnArea = null;   // cached {x,y,w,h} in leaves-canvas coordinates

/* Call this after any layout change so spawnLeaf always has fresh bounds. */
function updateTreeSpawnArea() {
  if (!treeCanvas || !leavesCanvas) return;
  const tr = treeCanvas.getBoundingClientRect();
  const lr = leavesCanvas.getBoundingClientRect();
  if (tr.width === 0 || lr.width === 0) { treeSpawnArea = null; return; }
  treeSpawnArea = {
    x: tr.left - lr.left,
    y: tr.top  - lr.top,
    w: tr.width,
    h: tr.height,
  };
}

function buildTree(cb) {
  treeCanvas = document.getElementById('tree-canvas');
  if (!treeCanvas) { cb && cb(); return; }
  treeCtx = treeCanvas.getContext('2d');

  const img = new Image();
  img.onload = () => {
    treeCanvas.width  = img.naturalWidth;
    treeCanvas.height = img.naturalHeight;
    treeCtx.imageSmoothingEnabled = false;
    treeCtx.drawImage(img, 0, 0);
    treeReady = true;
    /* Wait one rAF so the browser has finalised layout before measuring. */
    requestAnimationFrame(() => { updateTreeSpawnArea(); cb && cb(); });
  };
  img.onerror = () => { treeReady = false; cb && cb(); };
  img.src = 'large_tree.png';
}

/* ============================================================
   B. FALLING LEAVES
   Organic ellipse/teardrop shapes — colours sampled from the real
   block they detached from. Same Lissajous flutter physics.
   ============================================================ */
const MAX_LEAVES   = 60;
let leaves         = [];
let leafSpawnTimer = 0;

/* Small pixel-art leaf silhouettes — each is a cluster of tiny blocks
   arranged in an irregular shape (L, T, S, Z, cross, etc.), matching the
   voxel aesthetic of the tree. Each leaf instance picks one pattern and
   one colour, then tumbles with the same Lissajous physics. */
const LEAF_PATTERNS = [
  /* Each pattern = array of [col, row] offsets for a 3×3 pixel block */
  [[0,0],[1,0],[0,1]],                      // mini-L
  [[0,0],[1,0],[1,1]],                      // mini-J
  [[1,0],[0,1],[1,1]],                      // mini-S
  [[0,0],[0,1],[1,1]],                      // mini-Z
  [[0,0],[1,0],[2,0]],                      // mini-I (horiz)
  [[0,0],[0,1],[0,2]],                      // mini-I (vert)
  [[1,0],[0,1],[1,1],[0,2]],               // S-tall
  [[0,0],[1,0],[1,1],[2,1]],               // Z-tall
  [[0,0],[1,0],[0,1],[1,1]],               // 2×2 square
  [[0,0],[1,0],[2,0],[1,1]],               // T-top
  [[1,0],[0,1],[1,1],[1,2]],               // T-right
  [[0,0],[1,0],[2,0],[0,1],[1,1],[2,1]],   // 3×2 block
  [[0,0],[1,0],[0,1],[0,2]],               // L-long
  [[0,0],[0,1],[0,2],[1,2]],               // J-long
  [[0,0],[1,0],[0,1],[1,2]],               // sparse irregular
  [[0,0],[2,0],[1,1],[0,2],[2,2]],         // X-cross
];

class Leaf {
  constructor(sp) {
    this.x = sp.x + rand(-6, 6);
    this.y = sp.y + rand(-4, 4);

    /* Pick a random pixel pattern and scale it */
    this.pattern = LEAF_PATTERNS[randInt(0, LEAF_PATTERNS.length - 1)];
    this.ps = rand(3.5, 6.5);   // pixel block size in canvas px

    /* Center the pattern so it rotates around its centroid */
    const xs = this.pattern.map(p => p[0]);
    const ys = this.pattern.map(p => p[1]);
    const cx = (Math.min(...xs) + Math.max(...xs)) / 2;
    const cy = (Math.min(...ys) + Math.max(...ys)) / 2;
    this.offsets = this.pattern.map(([c, r]) => [
      (c - cx) * this.ps,
      (r - cy) * this.ps,
    ]);

    /* Colour from the shed tree block */
    this.color = sp.color;
    const m = sp.color.match(/\d+/g) || ['80','180','80'];
    const r = +m[0], g = +m[1], b = +m[2];
    /* Highlight: brighter version for top-left pixels */
    this.hiColor = `rgb(${Math.min(255,r+60)},${Math.min(255,g+60)},${Math.min(255,b+45)})`;
    /* Shadow: darker for bottom-right pixels */
    this.shColor = `rgb(${Math.round(r*.45)},${Math.round(g*.45)},${Math.round(b*.45)})`;

    /* Physics */
    this.vx   = rand(-1.3, 1.3);
    this.vy   = rand(0.20, 0.80);
    this.grav = rand(0.008, 0.022);
    this.drag = rand(0.987, 0.997);
    this.rot     = rand(0, Math.PI * 2);
    this.rotV    = rand(0.025, 0.085) * (Math.random() < 0.5 ? 1 : -1);
    this.rotDrag = rand(0.979, 0.994);
    this.sp1 = rand(0, Math.PI * 2);
    this.sp2 = rand(0, Math.PI * 2);
    this.sa1 = rand(0.5, 1.2);
    this.sa2 = rand(0.2, 0.6);
    this.alpha  = 0;
    this.active = true;
  }

  update(frame) {
    if (!this.active) return;
    const sway = this.sa1 * Math.sin(frame * 0.018 + this.sp1)
               + this.sa2 * Math.sin(frame * 0.038 + this.sp2);
    this.vx  = (this.vx + sway * 0.05) * this.drag;
    this.vy  =  this.vy * this.drag + this.grav;
    this.x  += this.vx + sway * 0.5;
    this.y  += this.vy;
    this.rotV *= this.rotDrag;
    this.rot  += this.rotV;
    this.alpha = Math.min(0.95, this.alpha + 0.07);
    const H = leavesCanvas ? leavesCanvas.height : 800;
    if (this.y > H * 0.72) this.alpha -= 0.014;
    if (this.alpha <= 0 || this.y > H + 30) this.active = false;
  }

  draw(ctx) {
    if (!this.active || this.alpha <= 0) return;
    const ps = this.ps;
    const e  = Math.max(1, ps * 0.22);   // voxel edge strip width

    ctx.save();
    ctx.globalAlpha = Math.max(0, this.alpha);
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rot);

    for (const [ox, oy] of this.offsets) {
      /* Main face */
      ctx.fillStyle = this.color;
      ctx.fillRect(ox, oy, ps - 0.5, ps - 0.5);
      /* Top + left highlight — voxel lit-from-top-left */
      ctx.fillStyle = this.hiColor;
      ctx.fillRect(ox, oy, ps - 0.5, e);          // top
      ctx.fillRect(ox, oy, e, ps - 0.5);          // left
      /* Bottom + right shadow */
      ctx.fillStyle = this.shColor;
      ctx.fillRect(ox, oy + ps - e - 0.5, ps - 0.5, e); // bottom
      ctx.fillRect(ox + ps - e - 0.5, oy, e, ps - 0.5); // right
    }

    ctx.restore();
  }
}

const LEAF_COLORS = [
  'rgb(80,160,60)','rgb(90,180,70)','rgb(100,170,50)',
  'rgb(70,150,55)','rgb(110,190,65)','rgb(85,165,45)',
  'rgb(75,155,75)','rgb(120,185,60)','rgb(95,175,80)',
  'rgb(65,140,50)','rgb(105,195,55)','rgb(130,200,70)',
];

function spawnLeaf() {
  if (leaves.length >= MAX_LEAVES || !treeReady || !treeSpawnArea) return;
  const { x, y, w, h } = treeSpawnArea;
  const sp = {
    x:     x + rand(w * 0.10, w * 0.90),
    y:     y + rand(h * 0.05, h * 0.65),
    color: LEAF_COLORS[randInt(0, LEAF_COLORS.length - 1)],
  };
  leaves.push(new Leaf(sp));
}

function initLeaves() { leaves = []; }

/* ============================================================
   C. CHERRY BLOSSOM PETALS
   ============================================================ */
const PETAL_COLORS = ['#ffb7c5','#ffc8d4','#ffd4df','#e898b0','#ffcdd6','#f9a8be'];
const MAX_PETALS   = 38;
let petals = [];

/* ---- Petal pile — a solid mound base + texture petals on top ---- */
let petalPile = [];
const MAX_PILE  = 2200;
const PILE_MAXH = 96;    // peak height of mound (px) — flatter than before

/* Surface height of the mound at column x — broad, gently lumpy */
function pileTopAt(x, w, h) {
  const cx = w / 2;
  const t  = (x - cx) / (w * 0.46);
  const base = Math.exp(-1.5 * t * t);                 // broad, flat-ish bell
  /* small low-freq lumps so the crest isn't a clean curve */
  const lumps = (0.09 * Math.sin(x * 0.012 + 0.4)
               + 0.06 * Math.sin(x * 0.029 + 1.7)
               + 0.04 * Math.sin(x * 0.061 + 3.0)) * base;
  const frac = clamp(base + lumps, 0, 1.10);
  return h - frac * PILE_MAXH;
}

function makePilePetal(x, y) {
  return {
    x, y,
    rot: rand(0, Math.PI * 2),
    color: PETAL_COLORS[randInt(0, PETAL_COLORS.length - 1)],
    rw: rand(4, 7),
    rh: rand(4, 7),       // rounder/flatter petals pack tighter
    alpha: rand(0.8, 1),
  };
}

function initPetalPile(canvas) {
  petalPile = [];
  const w = canvas.width, h = canvas.height;
  /* Dense texture petals concentrated near the surface (the solid base
     fills everything beneath, so no green can show through). */
  const target = clamp(Math.round(w * 1.1), 700, MAX_PILE);
  let placed = 0, attempts = 0;
  while (placed < target && attempts < target * 12) {
    attempts++;
    const x = rand(-10, w + 10);
    const top = pileTopAt(x, w, h);
    /* bias petals to the upper ~45px of the mound for surface texture */
    const y = top + Math.pow(Math.random(), 0.6) * (PILE_MAXH * 0.55);
    if (y < top - 6) continue;
    petalPile.push(makePilePetal(x, y));
    placed++;
  }
  petalPile.sort((a, b) => a.y - b.y);  // back-to-front
}

function drawPetalPile(ctx) {
  const cnv = ctx.canvas;
  const w = cnv.width, h = cnv.height;

  /* 1) Solid filled mound — guarantees no background shows through */
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(-12, h + 12);
  for (let x = -12; x <= w + 12; x += 5) {
    ctx.lineTo(x, pileTopAt(x, w, h));
  }
  ctx.lineTo(w + 12, h + 12);
  ctx.closePath();
  const grad = ctx.createLinearGradient(0, h - PILE_MAXH, 0, h);
  grad.addColorStop(0,   '#ffd4df');
  grad.addColorStop(0.5, '#ffbcd0');
  grad.addColorStop(1,   '#f0a6c0');
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.restore();

  /* 2) Texture petals on top for organic detail */
  for (const p of petalPile) {
    ctx.save();
    ctx.globalAlpha = p.alpha;
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.ellipse(0, 0, p.rw, p.rh, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

class Petal {
  constructor(canvas) { this.canvas = canvas; this.reset(true); }

  reset(initial = false) {
    const w = this.canvas.width, h = this.canvas.height;
    this.x    = rand(0, w);
    this.y    = initial ? rand(-60, h * 0.75) : rand(-30, -5);
    this.vx   = rand(-0.35, 0.35);
    this.vy   = rand(0.45, 1.0);
    this.rw   = rand(3, 6);
    this.rh   = rand(5, 10);
    this.rot  = rand(0, Math.PI * 2);
    this.rotV = rand(-0.025, 0.025);
    this.swayP = rand(0, Math.PI * 2);
    this.color = PETAL_COLORS[randInt(0, PETAL_COLORS.length - 1)];
    this.alpha = rand(0.5, 0.85);
    this.settled = false;
  }

  update(frame) {
    if (this.settled) return;
    this.x   += this.vx + Math.sin(frame * 0.016 + this.swayP) * 0.55;
    this.y   += this.vy;
    this.rot += this.rotV;

    /* Check if petal has reached the pile surface */
    const floorY = pileTopAt(this.x, this.canvas.width, this.canvas.height);
    if (this.y >= floorY) {
      /* Settle: land slightly into the surface so the mound grows */
      const landed = makePilePetal(this.x, floorY + rand(-3, 6));
      landed.rot = this.rot;
      if (petalPile.length >= MAX_PILE) petalPile.shift();
      petalPile.push(landed);
      this.reset(); // respawn at top
    }
  }

  draw(ctx) {
    if (this.settled) return;
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rot);
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.ellipse(0, 0, this.rw, this.rh, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function initPetals(canvas) {
  petals = [];
  initPetalPile(canvas);
  for (let i = 0; i < MAX_PETALS; i++) petals.push(new Petal(canvas));
}

/* ============================================================
   D. SQUIRREL — animated from squirrel_sprite.png (7-frame jump)
      Frames extracted from the sprite sheet; white chroma-keyed
      to transparent. Sprite faces RIGHT (flip for left movement).
   ============================================================ */

/* Tight frame bounding boxes within the 612×612 sheet (jump cycle order):
   0 crouch · 1 launch · 2 ascend · 3 peak · 4 descend · 5 pre-land · 6 land */
const SQ_FRAMES = [
  { x: 24,  y: 47,  w: 103, h: 65 },
  { x: 175, y: 47,  w: 105, h: 64 },
  { x: 322, y: 49,  w: 114, h: 61 },
  { x: 472, y: 52,  w: 122, h: 51 },
  { x: 9,   y: 209, w: 127, h: 41 },
  { x: 166, y: 205, w: 121, h: 42 },
  { x: 322, y: 193, w: 116, h: 61 },
];

const SQ_SCALE = 0.88;        // on-screen CSS px per source px
let   sqSheet  = null;        // chroma-keyed offscreen canvas
let   sqSheetReady = false;

/* ---- Animation state ---- */
let sqState     = 'idle';     // idle | pre-jump | jumping | landing
let sqFrame     = 0;
let sqPanelIdx  = 0;
let sqFootX = 0, sqFootY = 0;                 // current foot anchor (feet touch point)
let sqStartFX = 0, sqStartFY = 0, sqTargetFX = 0, sqTargetFY = 0;
let sqJumpT = 0, sqJumpDur = 760;
let sqJumpStart = 0, sqPreJumpStart = 0, sqLandStart = 0;
let sqIdleTimer = 0, sqIdlePause = 3000;
let sqBobOffset = 0;
let sqFacing    = 1;          // 1=right, -1=left
let panelPositions = [];
let squirrelReady  = false;

/* Load sprite sheet & chroma-key the white background to transparent */
function loadSquirrelSheet(cb) {
  const img = new Image();
  img.onload = () => {
    const c = document.createElement('canvas');
    c.width = img.naturalWidth;
    c.height = img.naturalHeight;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const data = ctx.getImageData(0, 0, c.width, c.height);
    const d = data.data;
    for (let i = 0; i < d.length; i += 4) {
      /* near-white → transparent */
      if (d[i] > 232 && d[i + 1] > 232 && d[i + 2] > 232) d[i + 3] = 0;
    }
    ctx.putImageData(data, 0, 0);
    sqSheet = c;
    sqSheetReady = true;
    cb && cb();
  };
  img.onerror = () => { sqSheetReady = false; };
  img.src = 'squirrel_sprite.png';
}

function updatePanelPositions() {
  const section = document.getElementById('projects');
  const cards   = document.querySelectorAll('.project-card');
  if (!section || !cards.length) return;

  const sr = section.getBoundingClientRect();
  panelPositions = [];
  cards.forEach(card => {
    const r = card.getBoundingClientRect();
    panelPositions.push({
      x: r.left - sr.left + r.width / 2,
      y: r.top  - sr.top  + section.scrollTop,
      w: r.width, h: r.height
    });
  });
}

/* Foot anchor for a panel: centered horizontally, resting on its top edge */
function panelFoot(idx) {
  const p = panelPositions[idx];
  return { x: p.x, y: p.y + 6 };
}

function squirrelLandOnPanel(idx) {
  const cards = document.querySelectorAll('.project-card');
  if (!cards[idx]) return;
  const c = cards[idx];
  c.classList.remove('tilting');
  void c.offsetWidth;
  c.classList.add('tilting');
  c.addEventListener('animationend', () => c.classList.remove('tilting'), { once: true });
}

function pickNextPanel() {
  const col = sqPanelIdx % 3;
  const row = Math.floor(sqPanelIdx / 3);
  const total = panelPositions.length;

  const goRow = Math.random() < 0.22 && total > 3;
  if (goRow) {
    const next = row === 0 ? sqPanelIdx + 3 : sqPanelIdx - 3;
    return clamp(next, 0, total - 1);
  }
  if (col === 0) return sqPanelIdx + 1;
  if (col === 2) return sqPanelIdx - 1;
  return Math.random() < 0.5 ? sqPanelIdx - 1 : sqPanelIdx + 1;
}

function startPreJump() {
  sqState = 'pre-jump';
  sqPreJumpStart = performance.now();
}

function startJump(toIdx) {
  if (!panelPositions[sqPanelIdx] || !panelPositions[toIdx]) return;
  const from = panelFoot(sqPanelIdx);
  const to   = panelFoot(toIdx);
  sqStartFX = from.x; sqStartFY = from.y;
  sqTargetFX = to.x;  sqTargetFY = to.y;
  sqFacing  = sqTargetFX >= sqStartFX ? 1 : -1;
  sqJumpStart = performance.now();
  sqPanelIdx  = toIdx;
  sqState = 'jumping';
}

function tickSquirrel(now) {
  if (!squirrelReady || !panelPositions.length) return;

  if (sqState === 'idle') {
    sqFrame = 0;
    sqBobOffset = Math.sin(now * 0.0026) * 1.6;
    sqIdleTimer += 16;
    if (sqIdleTimer >= sqIdlePause) { sqIdleTimer = 0; startPreJump(); }

  } else if (sqState === 'pre-jump') {
    /* brief crouch anticipation */
    const t = clamp((now - sqPreJumpStart) / 180, 0, 1);
    sqFrame = 0;
    sqBobOffset = lerp(0, 4, easeInQuad(t)); // dip down slightly
    if (t >= 1) { sqBobOffset = 0; startJump(pickNextPanel()); }

  } else if (sqState === 'jumping') {
    sqJumpT = clamp((now - sqJumpStart) / sqJumpDur, 0, 1);
    const t = sqJumpT;

    /* parabolic arc — gentler hop */
    const dx  = sqTargetFX - sqStartFX;
    const dy  = sqTargetFY - sqStartFY;
    const arc = Math.abs(dx) * 0.22 + 34;
    sqFootX = sqStartFX + dx * t;
    sqFootY = sqStartFY + dy * t - arc * Math.sin(t * Math.PI);

    /* frame selection across the leap */
    if      (t < 0.12) sqFrame = 1;  // launch
    else if (t < 0.30) sqFrame = 2;  // ascend
    else if (t < 0.55) sqFrame = 3;  // peak
    else if (t < 0.80) sqFrame = 4;  // descend
    else               sqFrame = 5;  // pre-land

    if (t >= 1) {
      sqFootX = sqTargetFX; sqFootY = sqTargetFY;
      squirrelLandOnPanel(sqPanelIdx);
      sqLandStart = now;
      sqState = 'landing';
    }

  } else if (sqState === 'landing') {
    const t = clamp((now - sqLandStart) / 280, 0, 1);
    sqFrame = t < 0.6 ? 6 : 0;   // land crouch → settle
    if (t >= 1) {
      sqState = 'idle';
      sqIdleTimer = 0;
      sqIdlePause = rand(3333, 5333);
    }
  }
}

function drawSquirrel(ctx, canvas) {
  if (!squirrelReady || !sqSheetReady) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const dpr = window.devicePixelRatio || 1;
  const f   = SQ_FRAMES[sqFrame];
  const dw  = f.w * SQ_SCALE * dpr;
  const dh  = f.h * SQ_SCALE * dpr;

  /* current foot position (CSS px → buffer px via dpr) */
  let footX, footY;
  if (sqState === 'jumping') { footX = sqFootX; footY = sqFootY; }
  else {
    const p = panelFoot(sqPanelIdx);
    footX = p.x; footY = p.y + sqBobOffset;
  }

  ctx.save();
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.translate(footX * dpr, footY * dpr);
  if (sqFacing === -1) ctx.scale(-1, 1);
  /* draw so bottom-center of frame sits at the foot point */
  ctx.drawImage(sqSheet, f.x, f.y, f.w, f.h, -dw / 2, -dh, dw, dh);
  ctx.restore();
}

/* ============================================================
   E. PROJECT CARD RENDERING
   ============================================================ */

/* Generates an on-brand SVG placeholder thumbnail (data URI).
   Used when a project has no real images yet. */
function placeholderThumb(p, i) {
  const grads = [
    ['#1e6b3a', '#74cc6c'], ['#14532d', '#4aa84a'], ['#155e63', '#3fc0b0'],
    ['#3a2d5c', '#8a6cc8'], ['#5c3a1e', '#caa05a'], ['#1e3a5c', '#5a9bd4'],
  ];
  const [a, b] = grads[i % grads.length];

  /* scattered pixel squares (deterministic) for a subtle pixel-art motif */
  let rects = '';
  for (let k = 0; k < 30; k++) {
    const x = ((Math.sin(k * 12.9 + i * 3.1) * 0.5 + 0.5) * 400) | 0;
    const y = ((Math.cos(k * 7.7 + i * 2.3) * 0.5 + 0.5) * 225) | 0;
    const s = 5 + ((k * 7) % 4) * 4;
    const o = (0.05 + (k % 5) * 0.03).toFixed(2);
    rects += `<rect x='${x}' y='${y}' width='${s}' height='${s}' fill='#fff' opacity='${o}'/>`;
  }

  const title = p.title.replace(/&/g, '&amp;');
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 225'>` +
    `<defs><linearGradient id='g${i}' x1='0' y1='0' x2='1' y2='1'>` +
    `<stop offset='0' stop-color='${a}'/><stop offset='1' stop-color='${b}'/></linearGradient></defs>` +
    `<rect width='400' height='225' fill='url(#g${i})'/>${rects}` +
    `<text x='22' y='44' font-family='monospace' font-size='13' fill='#fff' opacity='0.6'>PREVIEW</text>` +
    `<text x='22' y='200' font-family='Space Grotesk, Arial, sans-serif' font-size='21' font-weight='700' fill='#fff'>${title}</text>` +
    `</svg>`;
  return 'data:image/svg+xml,' + encodeURIComponent(svg);
}

function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  grid.innerHTML = PROJECTS.map((p, i) => {
    const detailURL = `project.html?project=${p.id}`;
    const thumb     = p.thumbnail || (p.images && p.images[0]) || placeholderThumb(p, i);
    const linksHTML = [
      `<a href="${detailURL}" class="card-link card-link--primary">View Project →</a>`,
      p.github ? `<a href="${p.github}" class="card-link" target="_blank" rel="noopener">GitHub ↗</a>` : '',
      p.demo   ? `<a href="${p.demo}"   class="card-link" target="_blank" rel="noopener">Live ↗</a>`   : '',
    ].join('');

    const thumbMedia = p.cardVideo
      ? `<video src="${p.cardVideo}" autoplay loop muted playsinline oncanplay="this.playbackRate=0.2"></video>`
      : `<img src="${thumb}" alt="${p.title} preview" loading="lazy">`;

    return `
      <div class="project-card">
        <img src="pinecone1.png" class="pinecone" alt="" aria-hidden="true">
        <a href="${detailURL}" class="card-thumb">
          ${thumbMedia}
        </a>
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.desc}</p>
        <div class="card-links">${linksHTML}</div>
      </div>`;
  }).join('');
}

/* ============================================================
   F. NAVBAR
   ============================================================ */
function initNavbar() {
  const nav = document.getElementById('navbar');
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        nav.classList.toggle('scrolled', window.scrollY > 50);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/* ============================================================
   G. CANVAS SETUP + MAIN LOOP
   ============================================================ */
const leavesCanvas   = document.getElementById('leaves-canvas');
const petalsCanvas   = document.getElementById('petals-canvas');
const squirrelCanvas = document.getElementById('squirrel-canvas');
let leavesCtx, petalsCtx, squirrelCtx;
let frame = 0;
let petalsVisible = false;

function resizeCanvases() {
  const landing  = document.getElementById('landing');
  const projects = document.getElementById('projects');

  if (leavesCanvas && landing) {
    leavesCanvas.width  = landing.offsetWidth;
    leavesCanvas.height = landing.offsetHeight;
  }
  if (petalsCanvas && projects) {
    petalsCanvas.width  = projects.offsetWidth;
    petalsCanvas.height = projects.offsetHeight;
  }
  if (squirrelCanvas && projects) {
    const dpr = window.devicePixelRatio || 1;
    squirrelCanvas.width  = projects.offsetWidth  * dpr;
    squirrelCanvas.height = projects.offsetHeight * dpr;
    squirrelCanvas.style.width  = projects.offsetWidth  + 'px';
    squirrelCanvas.style.height = projects.offsetHeight + 'px';
  }

  updatePanelPositions();
  updateTreeSpawnArea();
}

function loop(now) {
  frame++;

  /* Leaves — spawn from tree area, fall with physics */
  if (leavesCtx && leavesCanvas.width) {
    leavesCtx.clearRect(0, 0, leavesCanvas.width, leavesCanvas.height);
    leafSpawnTimer++;
    if (leafSpawnTimer >= 22) {   // ~3 leaves/sec — gentle shedding rate
      leafSpawnTimer = 0;
      spawnLeaf();
    }
    leaves = leaves.filter(l => l.active);
    for (const l of leaves) { l.update(frame); l.draw(leavesCtx); }
  }

  /* Petals + pile */
  if (petalsCtx && petalsVisible && petalsCanvas.width) {
    petalsCtx.clearRect(0, 0, petalsCanvas.width, petalsCanvas.height);
    drawPetalPile(petalsCtx);                           // pile first (bottom layer)
    for (const p of petals) { p.update(frame); p.draw(petalsCtx); }
  }

  /* Squirrel */
  if (squirrelCtx && squirrelCanvas.width) {
    tickSquirrel(now);
    drawSquirrel(squirrelCtx, squirrelCanvas);
  }

  requestAnimationFrame(loop);
}

function initPetalsObserver() {
  const section = document.getElementById('projects');
  if (!section || !('IntersectionObserver' in window)) { petalsVisible = true; return; }
  new IntersectionObserver(entries => {
    petalsVisible = entries[0].isIntersecting;
  }, { threshold: 0.05 }).observe(section);
}

/* ============================================================
   INIT
   ============================================================ */
function init() {
  renderProjects();

  if (leavesCanvas)   leavesCtx   = leavesCanvas.getContext('2d');
  if (petalsCanvas)   petalsCtx   = petalsCanvas.getContext('2d');
  if (squirrelCanvas) squirrelCtx = squirrelCanvas.getContext('2d');

  resizeCanvases();
  initLeaves();
  if (petalsCanvas) initPetals(petalsCanvas);

  /* Build the tree canvas with branch network behind the image */
  buildTree();

  /* Load squirrel sprite sheet, then enable once panels are measured */
  loadSquirrelSheet(() => {
    updatePanelPositions();
    if (panelPositions.length) {
      const f = panelFoot(0);
      sqFootX = f.x; sqFootY = f.y;
      squirrelReady = true;
    }
  });

  initNavbar();
  initPetalsObserver();

  let rTimer;
  window.addEventListener('resize', () => {
    clearTimeout(rTimer);
    rTimer = setTimeout(() => {
      resizeCanvases();
      initLeaves();
    }, 200);
  }, { passive: true });

  requestAnimationFrame(loop);
}

if (document.readyState !== 'loading') {
  init();
} else {
  document.addEventListener('DOMContentLoaded', init);
}
