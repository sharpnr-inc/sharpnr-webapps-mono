import * as THREE from "three";

/* ── Org data shown on the container cards ──────────────────────── */

export interface OrgNodeData {
  name: string;
  industry: string;
  apps: string[];
}

export const ORGS: OrgNodeData[] = [
  {
    name: "Org A",
    industry: "Hotels & Resorts",
    apps: ["Sharp-Hospitality", "Cables", "Sharp-Accounting"],
  },
  {
    name: "Org B",
    industry: "Healthcare",
    apps: ["Sharp-Lifco", "Sharp-HR", "Silo"],
  },
  {
    name: "Org C",
    industry: "Finance",
    apps: ["Sharp-Accounting", "Folio", "Cortex"],
  },
  {
    name: "Org D",
    industry: "Restaurants & Cafés",
    apps: ["Sharp-Hospitality", "Sharp-Marketing", "SharpIAM"],
  },
  {
    name: "Org E",
    industry: "Retail",
    apps: ["Sharp-Marketing", "Sharp-Accounting", "Silo"],
  },
  {
    name: "Org F",
    industry: "Mixed Group",
    apps: ["Orchestrator", "Sharp-Accounting", "Sharp-HR"],
  },
];

export const HUB = { name: "Sharp-Marketplace", sub: "O2O · B2B LAYER" };

/* ── Design-token helpers ───────────────────────────────────────────
   Three.js and 2D canvas need concrete colors — resolve them from the
   CSS tokens so index.css stays the single source of truth. */

function tokenCss(token: string): string {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(token)
    .trim();
}

function tokenColor(token: string): THREE.Color {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 1;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return new THREE.Color(1, 1, 1);
  ctx.fillStyle = tokenCss(token);
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return new THREE.Color(r / 255, g / 255, b / 255);
}

/* ── Canvas-drawn textures ──────────────────────────────────────── */

function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/* Corner brackets — HUD / container reticle. */
function cornerBrackets(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  len: number,
  color: string,
  alpha = 1,
) {
  ctx.strokeStyle = color;
  ctx.globalAlpha = alpha;
  ctx.lineWidth = 2.5;
  const corners: Array<[number, number, number, number]> = [
    [x, y, 1, 1],
    [x + w, y, -1, 1],
    [x, y + h, 1, -1],
    [x + w, y + h, -1, -1],
  ];
  corners.forEach(([cx, cy, dx, dy]) => {
    ctx.beginPath();
    ctx.moveTo(cx, cy + dy * len);
    ctx.lineTo(cx, cy);
    ctx.lineTo(cx + dx * len, cy);
    ctx.stroke();
  });
  ctx.globalAlpha = 1;
}

/* A clean container panel — wireframe HUD vibe, no glow. */
function makeOrgCardTexture(org: OrgNodeData): THREE.CanvasTexture {
  const scale = 2;
  const W = 600;
  const H = 360;
  const canvas = document.createElement("canvas");
  canvas.width = W * scale;
  canvas.height = H * scale;
  const ctx = canvas.getContext("2d")!;
  ctx.scale(scale, scale);

  const ink = tokenCss("--color-ink");
  const accent = tokenCss("--color-accent");
  const light = tokenCss("--color-text-light");
  const muted = tokenCss("--color-ink-muted");

  const pad = 38;

  // Panel body — flat fill + hairline border
  ctx.globalAlpha = 0.92;
  ctx.fillStyle = ink;
  roundedRect(ctx, 8, 8, W - 16, H - 16, 18);
  ctx.fill();
  ctx.globalAlpha = 0.16;
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = light;
  roundedRect(ctx, 8, 8, W - 16, H - 16, 18);
  ctx.stroke();
  ctx.globalAlpha = 1;

  // Corner brackets — the "container" reticle
  cornerBrackets(ctx, 22, 22, W - 44, H - 44, 18, accent, 0.85);

  // Status — small square + ONLINE, top right
  ctx.fillStyle = accent;
  ctx.fillRect(W - pad - 70, 50, 7, 7);
  ctx.font = "500 16px 'JetBrains Mono', monospace";
  ctx.fillStyle = accent;
  ctx.textAlign = "left";
  ctx.fillText("ONLINE", W - pad - 56, 58);

  // Industry eyebrow
  ctx.font = "500 19px 'JetBrains Mono', monospace";
  ctx.fillStyle = accent;
  ctx.fillText(org.industry.toUpperCase(), pad, 60);

  // Org name
  ctx.font = "650 48px 'Schibsted Grotesk', sans-serif";
  ctx.fillStyle = light;
  ctx.fillText(org.name, pad, 116);

  // Divider hairline
  ctx.globalAlpha = 0.12;
  ctx.strokeStyle = light;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(pad, 150);
  ctx.lineTo(W - pad, 150);
  ctx.stroke();
  ctx.globalAlpha = 1;

  // App chips — bordered pills, wrapping
  ctx.font = "400 22px 'JetBrains Mono', monospace";
  let chipX = pad;
  let chipY = 196;
  org.apps.forEach((app) => {
    const tw = ctx.measureText(app).width;
    const cw = tw + 34;
    if (chipX + cw > W - pad) {
      chipX = pad;
      chipY += 50;
    }
    ctx.globalAlpha = 0.22;
    ctx.strokeStyle = light;
    ctx.lineWidth = 1.5;
    roundedRect(ctx, chipX, chipY - 27, cw, 40, 10);
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.fillStyle = muted;
    ctx.fillText(app, chipX + 17, chipY);
    chipX += cw + 12;
  });

  // Footer node id
  ctx.font = "500 15px 'JetBrains Mono', monospace";
  ctx.fillStyle = muted;
  ctx.globalAlpha = 0.7;
  ctx.fillText(
    `NODE · ${org.name.toUpperCase().replace(" ", "-")}`,
    pad,
    H - 36,
  );
  ctx.globalAlpha = 1;

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

/* The hub container — the one accent-framed node at the center. */
function makeHubCardTexture(): THREE.CanvasTexture {
  const scale = 2;
  const W = 640;
  const H = 280;
  const canvas = document.createElement("canvas");
  canvas.width = W * scale;
  canvas.height = H * scale;
  const ctx = canvas.getContext("2d")!;
  ctx.scale(scale, scale);

  const inkDeep = tokenCss("--color-ink-deep");
  const accent = tokenCss("--color-accent");
  const light = tokenCss("--color-text-light");

  // Body
  ctx.globalAlpha = 0.95;
  ctx.fillStyle = inkDeep;
  roundedRect(ctx, 8, 8, W - 16, H - 16, 18);
  ctx.fill();
  ctx.globalAlpha = 1;

  // Accent hairline border — the hub earns the full frame
  ctx.globalAlpha = 0.7;
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = accent;
  roundedRect(ctx, 8, 8, W - 16, H - 16, 18);
  ctx.stroke();
  ctx.globalAlpha = 1;

  cornerBrackets(ctx, 24, 24, W - 48, H - 48, 22, accent, 0.9);

  // Diamond exchange glyph
  const dx = W / 2;
  const dy = 96;
  ctx.fillStyle = accent;
  ctx.beginPath();
  ctx.moveTo(dx, dy - 26);
  ctx.lineTo(dx + 26, dy);
  ctx.lineTo(dx, dy + 26);
  ctx.lineTo(dx - 26, dy);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = inkDeep;
  ctx.beginPath();
  ctx.moveTo(dx, dy - 11);
  ctx.lineTo(dx + 11, dy);
  ctx.lineTo(dx, dy + 11);
  ctx.lineTo(dx - 11, dy);
  ctx.closePath();
  ctx.fill();

  ctx.textAlign = "center";
  ctx.font = "700 52px 'Schibsted Grotesk', sans-serif";
  ctx.fillStyle = light;
  ctx.fillText(HUB.name, W / 2, 180);

  ctx.font = "500 22px 'JetBrains Mono', monospace";
  ctx.fillStyle = accent;
  ctx.fillText(HUB.sub, W / 2, 218);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

/* Small crisp dot — hard edge, faint AA rim. No bloom. */
function makeDotTexture(): THREE.CanvasTexture {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2,
  );
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.5, "rgba(255,255,255,1)");
  gradient.addColorStop(0.65, "rgba(255,255,255,0.3)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/* ── Scene graph types ──────────────────────────────────────────── */

export interface NetworkNode {
  group: THREE.Group;
  mesh: THREE.Mesh;
  material: THREE.MeshBasicMaterial;
  final: THREE.Vector3;
  flyFrom: THREE.Vector3;
  isHub: boolean;
  orgIndex: number | null;
  /** Combined into opacity each frame: entrance · hover · depth. */
  entrance: number;
  hover: number;
}

export interface NetworkLink {
  line: THREE.Line;
  material: THREE.LineBasicMaterial;
  geometry: THREE.BufferGeometry;
  points: THREE.Vector3[];
  pointCount: number;
  toHub: boolean;
}

export interface Packet {
  sprite: THREE.Sprite;
  material: THREE.SpriteMaterial;
  link: NetworkLink;
  t: number;
  speed: number;
}

export interface MemberDots {
  colorAttr: THREE.BufferAttribute;
  phases: Float32Array;
  speeds: Float32Array;
  count: number;
  color: THREE.Color;
}

export interface NetworkSceneHandle {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  /** Outer group — pointer parallax tilt. */
  tiltGroup: THREE.Group;
  /** Card constellation + links — rotates. */
  networkGroup: THREE.Group;
  /** Wireframe sphere + member dots — counter-rotates for depth. */
  atmosphereGroup: THREE.Group;
  nodes: NetworkNode[];
  links: NetworkLink[];
  packets: Packet[];
  wireMaterials: THREE.LineBasicMaterial[];
  ringMaterials: THREE.LineBasicMaterial[];
  memberMaterial: THREE.PointsMaterial;
  members: MemberDots;
  motesMaterial: THREE.PointsMaterial;
  setSize: () => void;
  render: () => void;
  dispose: () => void;
}

/* ── Constellation layout ───────────────────────────────────────── */

const HUB_POS = new THREE.Vector3(0, 0.05, 0.6);
const ORG_POSITIONS = [
  new THREE.Vector3(4.3, 1.3, 0.4),
  new THREE.Vector3(-4.2, 0.9, -1.1),
  new THREE.Vector3(3.1, -1.5, 2.3),
  new THREE.Vector3(-3.3, -1.2, 1.9),
  new THREE.Vector3(1.7, 2.0, -3.3),
  new THREE.Vector3(-1.5, -0.5, -3.7),
];

/** Peer routes — the social web, beyond every org's link to the hub. */
const PEER_PAIRS: Array<[number, number]> = [
  [0, 2],
  [1, 3],
  [4, 5],
  [0, 4],
  [3, 5],
];

const SPHERE_RADIUS = 6.4;

function curveBetween(a: THREE.Vector3, b: THREE.Vector3, lift: number) {
  const mid = a.clone().add(b).multiplyScalar(0.5);
  const out = mid.clone().normalize().multiplyScalar(lift);
  mid.add(out).add(new THREE.Vector3(0, lift * 0.4, 0));
  return new THREE.QuadraticBezierCurve3(a.clone(), mid, b.clone());
}

function fibonacciSphere(count: number, radius: number) {
  const points: THREE.Vector3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    points.push(
      new THREE.Vector3(
        Math.cos(theta) * r * radius,
        y * radius,
        Math.sin(theta) * r * radius,
      ),
    );
  }
  return points;
}

/* ── Builder ────────────────────────────────────────────────────── */

export function createNetworkScene(host: HTMLElement): NetworkSceneHandle {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.domElement.className = "absolute inset-0 size-full";
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  camera.position.set(0, 1.2, 11);
  camera.lookAt(0, 0, 0);

  const accentColor = tokenColor("--color-accent");
  const mutedColor = tokenColor("--color-ink-muted");
  const lightColor = tokenColor("--color-text-light");
  const dotTexture = makeDotTexture();

  const tiltGroup = new THREE.Group();
  scene.add(tiltGroup);
  const atmosphereGroup = new THREE.Group();
  tiltGroup.add(atmosphereGroup);
  const networkGroup = new THREE.Group();
  tiltGroup.add(networkGroup);

  /* ── Wireframe sphere — the contained network ─────────────────── */
  const wireMaterials: THREE.LineBasicMaterial[] = [];
  const addWireSphere = (radius: number, detail: number, color: THREE.Color, base: number) => {
    const icosa = new THREE.IcosahedronGeometry(radius, detail);
    const wire = new THREE.WireframeGeometry(icosa);
    const material = new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity: 0,
    });
    material.userData.base = base;
    const lines = new THREE.LineSegments(wire, material);
    atmosphereGroup.add(lines);
    icosa.dispose();
    wireMaterials.push(material);
    return lines;
  };
  addWireSphere(SPHERE_RADIUS, 1, accentColor, 0.12);
  addWireSphere(SPHERE_RADIUS - 1.8, 1, mutedColor, 0.07);

  /* Two steady outer orbit rings — sit outside the rotating sphere. */
  const ringMaterials: THREE.LineBasicMaterial[] = [];
  const addRing = (radius: number, rotation: THREE.Euler) => {
    const points: THREE.Vector3[] = [];
    for (let s = 0; s <= 160; s++) {
      const a = (s / 160) * Math.PI * 2;
      points.push(
        new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius),
      );
    }
    const material = new THREE.LineBasicMaterial({
      color: mutedColor,
      transparent: true,
      opacity: 0,
    });
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, material);
    line.rotation.copy(rotation);
    tiltGroup.add(line);
    ringMaterials.push(material);
  };
  addRing(SPHERE_RADIUS + 0.9, new THREE.Euler(1.32, 0, 0.18));
  addRing(SPHERE_RADIUS + 1.5, new THREE.Euler(1.46, 0, -0.22));

  /* Member dots — the broader social network, on the sphere surface. */
  const memberCount = 130;
  const memberPoints = fibonacciSphere(memberCount, SPHERE_RADIUS);
  const memberPositions = new Float32Array(memberCount * 3);
  const memberColors = new Float32Array(memberCount * 3);
  const phases = new Float32Array(memberCount);
  const speeds = new Float32Array(memberCount);
  memberPoints.forEach((p, i) => {
    memberPositions.set([p.x, p.y, p.z], i * 3);
    memberColors.set([0.4, 0.4, 0.4], i * 3);
    phases[i] = Math.random() * Math.PI * 2;
    speeds[i] = 0.5 + Math.random() * 1.2;
  });
  const memberGeometry = new THREE.BufferGeometry();
  memberGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(memberPositions, 3),
  );
  const memberColorAttr = new THREE.BufferAttribute(memberColors, 3);
  memberGeometry.setAttribute("color", memberColorAttr);
  const memberMaterial = new THREE.PointsMaterial({
    map: dotTexture,
    color: accentColor,
    vertexColors: true,
    size: 0.07,
    transparent: true,
    opacity: 0,
    depthWrite: false,
  });
  atmosphereGroup.add(new THREE.Points(memberGeometry, memberMaterial));
  const members: MemberDots = {
    colorAttr: memberColorAttr,
    phases,
    speeds,
    count: memberCount,
    color: new THREE.Color(),
  };

  /* ── Org containers + hub ─────────────────────────────────────── */
  const nodes: NetworkNode[] = [];
  const addCard = (
    texture: THREE.CanvasTexture,
    final: THREE.Vector3,
    w: number,
    h: number,
    orgIndex: number | null,
  ) => {
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), material);
    mesh.userData.orgIndex = orgIndex;
    const group = new THREE.Group();
    group.add(mesh);
    const flyFrom = final.clone().multiplyScalar(1.45);
    group.position.copy(flyFrom);
    networkGroup.add(group);
    nodes.push({
      group,
      mesh,
      material,
      final: final.clone(),
      flyFrom,
      isHub: orgIndex === null,
      orgIndex,
      entrance: 0,
      hover: 1,
    });
  };

  ORGS.forEach((org, i) => {
    addCard(makeOrgCardTexture(org), ORG_POSITIONS[i], 2.42, 1.45, i);
  });
  addCard(makeHubCardTexture(), HUB_POS, 2.9, 1.27, null);

  /* ── Links — org↔hub spokes + peer web ────────────────────────── */
  const links: NetworkLink[] = [];
  const addLink = (
    a: THREE.Vector3,
    b: THREE.Vector3,
    toHub: boolean,
  ) => {
    const curve = curveBetween(a, b, toHub ? 0.5 : 1.1);
    const points = curve.getPoints(50);
    const material = new THREE.LineBasicMaterial({
      color: toHub ? accentColor : mutedColor,
      transparent: true,
      opacity: 0,
    });
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    geometry.setDrawRange(0, 0);
    const line = new THREE.Line(geometry, material);
    networkGroup.add(line);
    links.push({
      line,
      material,
      geometry,
      points,
      pointCount: points.length,
      toHub,
    });
  };
  ORG_POSITIONS.forEach((pos) => addLink(pos, HUB_POS, true));
  PEER_PAIRS.forEach(([a, b]) =>
    addLink(ORG_POSITIONS[a], ORG_POSITIONS[b], false),
  );

  /* ── Packets — one crisp dot per link ─────────────────────────── */
  const packets: Packet[] = [];
  links.forEach((link, i) => {
    const material = new THREE.SpriteMaterial({
      map: dotTexture,
      color: link.toHub ? accentColor : lightColor,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });
    const sprite = new THREE.Sprite(material);
    sprite.scale.setScalar(link.toHub ? 0.1 : 0.075);
    networkGroup.add(sprite);
    packets.push({
      sprite,
      material,
      link,
      t: (i * 0.19) % 1,
      speed: (0.12 + Math.random() * 0.06) * (link.toHub ? 1 : -1),
    });
  });

  /* ── Background motes for depth ───────────────────────────────── */
  const moteCount = 200;
  const motePositions = new Float32Array(moteCount * 3);
  for (let i = 0; i < moteCount; i++) {
    const r = 10 + Math.random() * 9;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    motePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    motePositions[i * 3 + 1] = r * Math.cos(phi) * 0.6;
    motePositions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
  }
  const motesGeometry = new THREE.BufferGeometry();
  motesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(motePositions, 3),
  );
  const motesMaterial = new THREE.PointsMaterial({
    color: mutedColor,
    size: 0.03,
    transparent: true,
    opacity: 0,
    depthWrite: false,
  });
  scene.add(new THREE.Points(motesGeometry, motesMaterial));

  const setSize = () => {
    const w = host.clientWidth;
    const h = host.clientHeight;
    if (w === 0 || h === 0) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  setSize();

  const render = () => renderer.render(scene, camera);

  const dispose = () => {
    scene.traverse((obj) => {
      if (
        obj instanceof THREE.Mesh ||
        obj instanceof THREE.Points ||
        obj instanceof THREE.Line
      ) {
        obj.geometry?.dispose();
      }
      const material = (obj as THREE.Mesh).material as
        | THREE.Material
        | undefined;
      if (material) {
        const map = (material as THREE.MeshBasicMaterial).map;
        map?.dispose();
        material.dispose();
      }
    });
    dotTexture.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };

  return {
    renderer,
    scene,
    camera,
    tiltGroup,
    networkGroup,
    atmosphereGroup,
    nodes,
    links,
    packets,
    wireMaterials,
    ringMaterials,
    memberMaterial,
    members,
    motesMaterial,
    setSize,
    render,
    dispose,
  };
}
