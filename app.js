/* ============================================================
   PORTFOLIO — app.js
   Sidebar layout · Cherry petals · Pixel squirrel
   ============================================================ */

'use strict';

/* ============================================================
   PROJECT DATA  — update this to add / edit projects
   ============================================================ */
const PROJECTS = [
  {
    id: 'tape-handover',
    title: 'Bimanual Tape Handover',
    subtitle: 'From an LLM-Authored Skill Graph to a Visuomotor Policy',
    desc: 'How do we perform a bimanual handover of a round object using agentic robotics?',
    longDesc: `**One of the first implementations of the Graph-as-Policy (GaP) paper on the YAM bimanual robot.** The left arm picks up a roll of tape from a random spot, hands it to the right arm mid-air, and the right arm sets it on a roll of duct tape. Every pose comes from RGB-D perception, with no ground truth.

I built it in two stages. First, an LLM composes my skill library into a graph that solves the task (**99.6% success, 0 arm collisions**). Then I distilled that graph's rollouts into an ACT policy that runs **~10× faster** and went **25 / 25 on held-out positions**.

(GaP, the base skill library, and the sim are shared lab infrastructure. The tape-handover skills, perception, benchmarking, data pipeline, and ACT training are mine.)`,
    tech: ['Graph-as-Policy', 'Python', 'MuJoCo', 'cuRobo', 'Grounding-DINO', 'SAM', 'LeRobot / ACT', 'PyTorch', 'W&B'],
    github: null,
    demo: null,
    highlights: [
      { label: 'Skill Graph', value: '481/483 (99.6%)' },
      { label: 'Arm Collisions', value: '0' },
      { label: 'ACT Held-Out', value: '25/25' },
      { label: 'Speed-up', value: '~10×' },
    ],
    heroVideo: 'projects/tape-handover/generalization.mp4',
    heroPoster: 'projects/tape-handover/generalization-grid.jpg',
    heroWide: true,
    cardVideo: 'projects/tape-handover/handover.mp4',
    sections: [
      {
        title: 'Skill Graph',
        body: `I wrote a library of small skills (perceive, grasp, present, hand over, place, verify), and an LLM wires them into a graph using only their input and output descriptions. The screenshot is the actual generated graph.

Across 5 benchmark sweeps, it succeeded **481 / 483 times (99.6%) with 0 arm-arm collisions**.`,
        images: ['projects/tape-handover/skill-graph.png', 'projects/tape-handover/handover.mp4'],
        wideMedia: true,
      },
      {
        title: 'Motion Planning',
        body: `cuRobo plans every motion, modelling the arm as collision spheres (fitted with MorphIt). The fingers needed the tightest fit, since they have to thread through a 47 mm hole.`,
        images: ['projects/tape-handover/morphit-spheres.jpg'],
      },
      {
        title: 'Perception',
        body: `Grounding-DINO and SAM find the tape, and depth turns the mask into a 3D pose. I also built a model-free CV version that's just as accurate (**2.5–3 mm**) and cuts perception time from **~29 s to ~5 s**.`,
        images: ['projects/tape-handover/perception-dino-sam.png', 'projects/tape-handover/perception-cv.png'],
      },
      {
        title: 'The Handover',
        body: `The key trick: once the giver grabs the tape, it measures where the tape actually sits in its gripper, so the motion planner (cuRobo) moves the tape itself to the meet point instead of the hand. The receiver then threads a finger through the hole on a diagonal, so the two arms never collide.`,
        images: ['projects/tape-handover/three-cam.mp4'],
        stacked: true,
      },
      {
        title: 'Grasp Verification',
        body: `A vision-language model checks each grasp. Wrist views like this one fooled it, since an open gripper over the tape looks a lot like a grasp, so it only gets the main scene camera.`,
        images: ['projects/tape-handover/wristview.png'],
      },
      {
        title: 'Generalization',
        body: `Nothing is hard-coded, so the same graph works across every tape and duct layout in the benchmark grid. The first full 72-pair sweep went **72 / 72**.

The same skills also stacked bowls with no new code, just a different perception query.`,
        images: ['projects/tape-handover/benchmark-grid.jpg', 'projects/tape-handover/skill-reuse-bowls.mp4'],
        wideMedia: true,
      },
      {
        title: 'ACT Policy',
        body: `I trained an ACT policy on **210 graph rollouts (84.6k frames)**. On held-out positions with **7 distractor objects it never saw in training**, it went **25 / 25** and ran about 10× faster than the graph.

In the comparison video, the left side is the graph and the right side is the policy at the same position.`,
        images: ['projects/tape-handover/teacher-vs-student.mp4', 'projects/tape-handover/act-grid.mp4'],
        wideMedia: true,
      },
      {
        title: 'Where It Breaks',
        body: `ACT interpolates well and does not extrapolate.`,
        images: ['projects/tape-handover/act-ood-failure.mp4'],
      },
    ],
    featuredImage: 'projects/tape-handover/filmstrip.png',
    featuredCaption: 'Pick, present, hand over, place',
    resultImages: [],
    images: [],
    videos: []
  },
  {
    id: 'auv',
    title: 'Autonomous Underwater Vehicle',
    subtitle: "It's Not That Deep",
    desc: 'Built at MIT Lincoln Laboratory. A competition AUV with YOLOv8 real-time detection, ROS control, and autonomous path planning strategies including orbiting, flanking, and pure pursuit.',
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
    id: 'trace-cables',
    title: 'TRACE',
    subtitle: 'Interactive Bi-Directional Cable Tracing Amid Clutter',
    desc: 'TRACE combines bi-directional cable tracing with interactive perception primitives (Divergence Push and Cluster Dilation) to trace monochrome cables amid clutter.',
    longDesc: '',
    tech: [],
    github: null,
    demo: null,
    externalURL: 'https://trace-paper.github.io/',
    cardVideo: 'projects/trace-cables/trace_loop.mp4',
    sections: [],
    images: [],
    videos: []
  },
  {
    id: 'gaussian-image',
    title: 'GaussianImage',
    subtitle: '2D Gaussian Splatting for Image Compression',
    desc: 'An implementation of the GaussianImage paper from scratch',
    longDesc: `This project was my best recreation of the GaussianImage Paper. 3D Gaussian Splatting has become a very popular phrase in my life — mainly because in my research lab (AUTOLab), I'm working on figuring out ways to use Gaussian Splatting to model and disambiguate/trace thin cables and hoses, possibly eliminating the current need for robot primitives to trace cables.

I wanted to familiarize myself with the math behind Gaussian Splatting, and I came upon a paper that did something very interesting: 2D Gaussian Splatting for compression applications. I'll do my best to explain my process below.

A decent quality image is $512 \\times 512$ (over $750,000$ data points for RGB). Through 2D Gaussian Splatting, we can train Gaussians to represent this image but with less data. Suppose we use $30,000$ Gaussians for this image. Each one contains 9 parameters (at least the ones in the paper), which gives $270,000$ data points, which is a decent compression from the original data!`,
    tech: ['Python', 'PyTorch', 'Gaussian Splatting', 'Computer Vision', 'NumPy'],
    github: null,
    demo: null,
    thumbnail: 'projects/gaussian/thumb.jpg',
    cardVideo: 'projects/gaussian/v1.mp4',
    cardVideoRate: 0.2,
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
    desc: 'A multi-model ML pipeline predicting solidification cracking in metal alloys for additive manufacturing for aerospace applications.',
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
    demo: null,
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
  },
  {
    id: 'autonomous-parking',
    title: 'Coming Soon: Autonomous Parking',
    subtitle: '',
    desc: '',
    longDesc: 'Currently building...',
    tech: [],
    github: null,
    demo: null,
    comingSoon: true,
    cardVideo: 'projects/autonomous-parking/scenario_2_chase.mp4',
    sections: [],
    images: [],
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
   D. SQUIRREL — animated from squirrel.webp (7-frame jump)
      squirrel.webp is a vector-traced, 3x-resolution redraw of the
      original sprite with a transparent background, so it stays crisp
      on Retina screens. Sprite faces RIGHT (flip for left movement).
   ============================================================ */

/* Frame boxes within the 1836×720 sheet (jump cycle order):
   0 crouch · 1 launch · 2 ascend · 3 peak · 4 descend · 5 pre-land · 6 land */
const SQ_RES = 3;             // sheet pixels per original sprite pixel
const SQ_FRAMES = [
  { x: 66, y: 45, w: 321, h: 207 },
  { x: 519, y: 45, w: 327, h: 204 },
  { x: 960, y: 51, w: 354, h: 195 },
  { x: 1410, y: 60, w: 378, h: 165 },
  { x: 21, y: 531, w: 393, h: 135 },
  { x: 492, y: 519, w: 375, h: 138 },
  { x: 960, y: 483, w: 360, h: 195 },
];

const SQ_SCALE = 0.88 / SQ_RES;  // on-screen CSS px per sheet px
const SQ_PAD_PX = 2 * 0.88;      // frame boxes are padded 2 source px; keep feet where they were
let   sqSheet  = null;        // decoded sprite sheet image
let   sqSheetReady = false;

/* ---- Animation state ---- */
let sqState     = 'idle';     // idle | pre-jump | jumping | landing
let sqFrame     = 0;
let sqPanelIdx  = 0;
let sqFootX = 0, sqFootY = 0;                 // current foot anchor (feet touch point)
let sqStartFX = 0, sqStartFY = 0, sqTargetFX = 0, sqTargetFY = 0;
let sqJumpT = 0, sqJumpDur = 760;
let sqJumpStart = 0, sqPreJumpStart = 0, sqLandStart = 0;
let sqIdleTimer = 0, sqIdlePause = 2000;
let sqBobOffset = 0;
let sqFacing    = 1;          // 1=right, -1=left
let panelPositions = [];
let squirrelReady  = false;

/* Load the (already transparent) sprite sheet */
function loadSquirrelSheet(cb) {
  const img = new Image();
  img.onload = () => { sqSheet = img; sqSheetReady = true; cb && cb(); };
  img.onerror = () => { sqSheetReady = false; };
  img.src = 'squirrel.webp';
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
      sqIdlePause = rand(2000, 3500);
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
  ctx.drawImage(sqSheet, f.x, f.y, f.w, f.h, -dw / 2, -dh + SQ_PAD_PX * dpr, dw, dh);
  ctx.restore();
}

/* ============================================================
   E. PROJECT CARD RENDERING
   ============================================================ */

function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  grid.innerHTML = PROJECTS.map((p, i) => {
    const detailURL = p.externalURL || `project.html?project=${p.id}`;
    const externalAttrs = p.externalURL ? ` target="_blank" rel="noopener"` : '';
    const thumb     = p.thumbnail || (p.images && p.images[0]);
    const linksHTML = p.comingSoon
      ? `<span class="card-link card-link--soon">Coming Soon</span>`
      : p.externalURL
      ? `<a href="${detailURL}" class="card-link card-link--primary" target="_blank" rel="noopener">View Project ↗</a>`
      : [
          `<a href="${detailURL}" class="card-link card-link--primary">View Project →</a>`,
          p.github ? `<a href="${p.github}" class="card-link" target="_blank" rel="noopener">GitHub ↗</a>` : '',
          p.demo   ? `<a href="${p.demo}"   class="card-link" target="_blank" rel="noopener">Live ↗</a>`   : '',
        ].join('');

    const rateAttr = p.cardVideoRate ? ` oncanplay="this.playbackRate=${p.cardVideoRate}"` : '';
    const thumbMedia = p.cardVideo
      ? `<video src="${p.cardVideo}" autoplay loop muted playsinline${rateAttr}></video>`
      : `<img src="${thumb}" alt="${p.title} preview" loading="lazy">`;

    const thumbWrap = p.comingSoon
      ? `<div class="card-thumb">${thumbMedia}</div>`
      : `<a href="${detailURL}" class="card-thumb"${externalAttrs}>${thumbMedia}</a>`;

    return `
      <div class="project-card">
        <img src="pinecone1.png" class="pinecone" alt="" aria-hidden="true">
        ${thumbWrap}
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.desc}</p>
        <div class="card-links">${linksHTML}</div>
      </div>`;
  }).join('');

  equalizeCardHeights();
  initCardVideoPlayback(grid);
}

/* Desktop only: give every project card the same size without truncating
   text. Thumbnails use one fixed aspect ratio (THUMB_RATIO, matching the
   alloy diagram cover so it is never cropped). If the pane is too short
   for all cards at full width, the grid is narrowed step by step until
   every card fits in the full-height projects pane without scrolling. */
const EQUAL_CARDS_MQ = window.matchMedia('(min-width: 1101px)');
const THUMB_RATIO = 600 / 336;   // width / height of projects/jei/cover.png
const GRID_MIN_W = 820;          // never squeeze the grid narrower than this
function equalizeCardHeights() {
  const grid   = document.getElementById('projects-grid');
  const cards  = [...document.querySelectorAll('.project-card')];
  const thumbs = cards.map(c => c.querySelector('.card-thumb')).filter(Boolean);
  if (!grid) return;
  grid.style.maxWidth = ''; grid.style.margin = '';
  cards.forEach(c => { c.style.height = ''; });
  thumbs.forEach(t => { t.style.height = ''; t.style.aspectRatio = ''; });
  if (!EQUAL_CARDS_MQ.matches || !cards.length) return;

  const section = document.getElementById('projects');
  const avail = section.clientHeight - 10;   // pane is 100vh on desktop

  /* Lay out at the current grid width; returns total height used. */
  function layout() {
    cards.forEach(c => { c.style.height = ''; });
    thumbs.forEach(t => { t.style.aspectRatio = 'auto'; t.style.height = '0px'; });
    const textH = Math.max(...cards.map(c => c.offsetHeight));
    const thumbH = Math.round(thumbs[0].offsetWidth / THUMB_RATIO);
    thumbs.forEach(t => { t.style.height = thumbH + 'px'; });
    cards.forEach(c => { c.style.height = (textH + thumbH) + 'px'; });
    const last = cards[cards.length - 1].getBoundingClientRect().bottom;
    return last - section.getBoundingClientRect().top + section.scrollTop;
  }

  /* Narrow until it fits. Narrower cards wrap more text, so on very short
     screens it may never fit; then keep whichever width overflowed least
     (the pane scrolls a little as a fallback). */
  const fullW = grid.offsetWidth;
  grid.style.margin = '0 auto';
  let best = { w: fullW, over: layout() - avail };
  for (let w = fullW - 16; best.over > 0 && w >= GRID_MIN_W; w -= 16) {
    grid.style.maxWidth = w + 'px';
    const over = layout() - avail;
    if (over < best.over) best = { w, over };
  }
  grid.style.maxWidth = best.w === fullW ? '' : best.w + 'px';
  layout();
}
let equalizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(equalizeTimer);
  equalizeTimer = setTimeout(equalizeCardHeights, 120);
});
if (document.fonts && document.fonts.ready) document.fonts.ready.then(equalizeCardHeights);

/* Mobile browsers (iOS Safari in particular) won't reliably autoplay
   <video> elements that were inserted via innerHTML, even with the
   autoplay/muted/playsinline attributes set — it silently no-ops.
   Explicitly calling .play() after insertion fixes it everywhere.
   An IntersectionObserver also pauses off-screen thumbs (saves battery/
   data on mobile) and resumes them when scrolled back into view, since
   mobile browsers frequently pause background video on their own. */
function initCardVideoPlayback(grid) {
  const videos = grid.querySelectorAll('video');
  videos.forEach(v => { v.play().catch(() => {}); });

  if (!('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const v = entry.target;
      if (entry.isIntersecting) v.play().catch(() => {});
      else v.pause();
    });
  }, { threshold: 0.1 });
  videos.forEach(v => io.observe(v));
}

/* ============================================================
   G. CANVAS SETUP + MAIN LOOP
   ============================================================ */
const petalsCanvas   = document.getElementById('petals-canvas');
const squirrelCanvas = document.getElementById('squirrel-canvas');
let petalsCtx, squirrelCtx;
let frame = 0;
let petalsVisible = false;

function resizeCanvases() {
  const projects = document.getElementById('projects');

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
}

function loop(now) {
  frame++;

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

  if (petalsCanvas)   petalsCtx   = petalsCanvas.getContext('2d');
  if (squirrelCanvas) squirrelCtx = squirrelCanvas.getContext('2d');

  resizeCanvases();
  if (petalsCanvas) initPetals(petalsCanvas);

  /* Load squirrel sprite sheet, then enable once panels are measured */
  loadSquirrelSheet(() => {
    updatePanelPositions();
    if (panelPositions.length) {
      const f = panelFoot(0);
      sqFootX = f.x; sqFootY = f.y;
      squirrelReady = true;
    }
  });

  initPetalsObserver();

  let rTimer;
  window.addEventListener('resize', () => {
    clearTimeout(rTimer);
    rTimer = setTimeout(() => {
      resizeCanvases();
    }, 200);
  }, { passive: true });

  requestAnimationFrame(loop);
}

if (document.readyState !== 'loading') {
  init();
} else {
  document.addEventListener('DOMContentLoaded', init);
}
