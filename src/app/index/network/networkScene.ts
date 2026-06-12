import * as THREE from "three";

/* ── Org data shown on markers and tooltips ─────────────────────── */

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

/* ── Textures ───────────────────────────────────────────────────── */

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
  gradient.addColorStop(0.55, "rgba(255,255,255,1)");
  gradient.addColorStop(0.7, "rgba(255,255,255,0.25)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/* Circular badge marker with a label underneath — Cloudflare-style. */
function makeOrgMarkerTexture(org: OrgNodeData): THREE.CanvasTexture {
  const scale = 2;
  const W = 256;
  const H = 320;
  const canvas = document.createElement("canvas");
  canvas.width = W * scale;
  canvas.height = H * scale;
  const ctx = canvas.getContext("2d")!;
  ctx.scale(scale, scale);

  const ink = tokenCss("--color-ink");
  const accent = tokenCss("--color-accent");
  const light = tokenCss("--color-text-light");
  const muted = tokenCss("--color-ink-muted");

  const cx = W / 2;
  const cy = 92;
  const r = 62;

  // Badge — flat fill, crisp ring
  ctx.fillStyle = ink;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = accent;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();

  // Org initial
  ctx.font = "650 64px 'Schibsted Grotesk', sans-serif";
  ctx.fillStyle = light;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(org.name.slice(-1), cx, cy + 4);

  // Stem down to the surface point
  ctx.strokeStyle = accent;
  ctx.globalAlpha = 0.6;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx, cy + r);
  ctx.lineTo(cx, 196);
  ctx.stroke();
  ctx.globalAlpha = 1;

  // Industry label
  ctx.font = "500 19px 'JetBrains Mono', monospace";
  ctx.fillStyle = muted;
  ctx.fillText(org.industry.toUpperCase(), cx, 226);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

function makeHubMarkerTexture(): THREE.CanvasTexture {
  const scale = 2;
  const W = 256;
  const H = 320;
  const canvas = document.createElement("canvas");
  canvas.width = W * scale;
  canvas.height = H * scale;
  const ctx = canvas.getContext("2d")!;
  ctx.scale(scale, scale);

  const inkDeep = tokenCss("--color-ink-deep");
  const accent = tokenCss("--color-accent");

  const cx = W / 2;
  const cy = 92;
  const r = 68;

  // The hub is the one filled element on the globe
  ctx.fillStyle = accent;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();

  // Diamond glyph — exchange mark
  ctx.fillStyle = inkDeep;
  ctx.beginPath();
  ctx.moveTo(cx, cy - 26);
  ctx.lineTo(cx + 26, cy);
  ctx.lineTo(cx, cy + 26);
  ctx.lineTo(cx - 26, cy);
  ctx.closePath();
  ctx.fill();

  // Stem
  ctx.strokeStyle = accent;
  ctx.globalAlpha = 0.7;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx, cy + r);
  ctx.lineTo(cx, 202);
  ctx.stroke();
  ctx.globalAlpha = 1;

  // Label
  ctx.font = "600 20px 'JetBrains Mono', monospace";
  ctx.fillStyle = accent;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("SHARP-MARKETPLACE", cx, 232);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

/* ── Scene graph types ──────────────────────────────────────────── */

export interface NetworkMarker {
  sprite: THREE.Sprite;
  material: THREE.SpriteMaterial;
  orgIndex: number | null; // null = hub
  isHub: boolean;
  baseScale: { x: number; y: number };
  /** Unit direction from globe center — for backside checks. */
  direction: THREE.Vector3;
}

export interface NetworkArc {
  line: THREE.Line;
  material: THREE.LineBasicMaterial;
  geometry: THREE.BufferGeometry;
  pointCount: number;
  points: THREE.Vector3[];
  toHub: boolean;
}

export interface ArcDot {
  sprite: THREE.Sprite;
  material: THREE.SpriteMaterial;
  arc: NetworkArc;
  t: number;
  speed: number;
}

export interface HighlightDots {
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
  /** Inner group — continuous rotation. */
  globeGroup: THREE.Group;
  latticeMaterial: THREE.PointsMaterial;
  highlight: HighlightDots;
  highlightMaterial: THREE.PointsMaterial;
  wireMaterials: THREE.LineBasicMaterial[];
  markers: NetworkMarker[];
  arcs: NetworkArc[];
  arcDots: ArcDot[];
  setSize: () => void;
  render: () => void;
  dispose: () => void;
}

/* ── Globe layout ───────────────────────────────────────────────── */

const RADIUS = 3.2;
const GLOBE_CENTER_Y = -0.55;

function latLon(latDeg: number, lonDeg: number, radius = RADIUS) {
  const lat = (latDeg * Math.PI) / 180;
  const lon = (lonDeg * Math.PI) / 180;
  return new THREE.Vector3(
    radius * Math.cos(lat) * Math.sin(lon),
    radius * Math.sin(lat),
    radius * Math.cos(lat) * Math.cos(lon),
  );
}

/* Markers spread around the sphere — Org F starts on the far side and
   rotates into view, so the globe reads as fully populated. */
const HUB_LATLON: [number, number] = [36, -28];
const ORG_LATLONS: Array<[number, number]> = [
  [22, -78],
  [50, 12],
  [4, 38],
  [-24, -38],
  [-32, 92],
  [14, 156],
];

/** Peer routes in addition to the org ↔ hub routes. */
const PEER_PAIRS: Array<[number, number]> = [
  [0, 3],
  [1, 2],
  [4, 5],
];

/* Great-circle arc lifted above the surface. */
function arcPoints(a: THREE.Vector3, b: THREE.Vector3, count = 64) {
  const points: THREE.Vector3[] = [];
  const qa = a.clone().normalize();
  const qb = b.clone().normalize();
  const angle = qa.angleTo(qb);
  const lift = 0.1 + angle * 0.16;
  for (let i = 0; i <= count; i++) {
    const t = i / count;
    const dir = qa
      .clone()
      .multiplyScalar(Math.sin((1 - t) * angle))
      .add(qb.clone().multiplyScalar(Math.sin(t * angle)))
      .divideScalar(Math.sin(angle))
      .normalize();
    const r = RADIUS * (1 + lift * Math.sin(Math.PI * t));
    points.push(dir.multiplyScalar(r));
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
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(0, 0.9, 10.5);
  camera.lookAt(0, GLOBE_CENTER_Y * 0.5, 0);

  const accentColor = tokenColor("--color-accent");
  const mutedColor = tokenColor("--color-ink-muted");
  const inkDeepColor = tokenColor("--color-ink-deep");
  const dotTexture = makeDotTexture();

  const tiltGroup = new THREE.Group();
  tiltGroup.position.y = GLOBE_CENTER_Y;
  scene.add(tiltGroup);
  const globeGroup = new THREE.Group();
  tiltGroup.add(globeGroup);

  /* Occluder — a solid sphere in the section background color, so the
     far side of the lattice fades out instead of shining through. */
  const occluder = new THREE.Mesh(
    new THREE.SphereGeometry(RADIUS - 0.07, 48, 48),
    new THREE.MeshBasicMaterial({ color: inkDeepColor }),
  );
  globeGroup.add(occluder);

  /* Dot lattice — structured rows, the body of the globe. */
  const latticePositions: number[] = [];
  const latticeColors: number[] = [];
  for (let lat = -72; lat <= 72; lat += 4) {
    const c = Math.cos((lat * Math.PI) / 180);
    const count = Math.max(10, Math.floor(92 * c));
    const offset = (lat / 4) * 2.4; // stagger rows so columns don't align
    for (let i = 0; i < count; i++) {
      const lon = (i / count) * 360 + offset;
      const p = latLon(lat, lon);
      latticePositions.push(p.x, p.y, p.z);
      // Quiet variation — most dots recede, a few read as "active"
      const brightness =
        Math.random() < 0.06 ? 0.95 : 0.18 + Math.random() * 0.4;
      latticeColors.push(brightness, brightness, brightness);
    }
  }
  const latticeGeometry = new THREE.BufferGeometry();
  latticeGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(latticePositions, 3),
  );
  latticeGeometry.setAttribute(
    "color",
    new THREE.Float32BufferAttribute(latticeColors, 3),
  );
  const latticeMaterial = new THREE.PointsMaterial({
    map: dotTexture,
    color: accentColor,
    vertexColors: true,
    size: 0.042,
    transparent: true,
    opacity: 0,
    depthWrite: false,
  });
  globeGroup.add(new THREE.Points(latticeGeometry, latticeMaterial));

  /* Pulsing highlight dots — a sparse set of "live" points. */
  const highlightCount = 56;
  const highlightPositions = new Float32Array(highlightCount * 3);
  const highlightColors = new Float32Array(highlightCount * 3);
  const phases = new Float32Array(highlightCount);
  const speeds = new Float32Array(highlightCount);
  for (let i = 0; i < highlightCount; i++) {
    const lat = -65 + Math.random() * 130;
    const lon = Math.random() * 360;
    const p = latLon(lat, lon, RADIUS + 0.01);
    highlightPositions.set([p.x, p.y, p.z], i * 3);
    highlightColors.set([0.5, 0.5, 0.5], i * 3);
    phases[i] = Math.random() * Math.PI * 2;
    speeds[i] = 0.6 + Math.random() * 1.1;
  }
  const highlightGeometry = new THREE.BufferGeometry();
  highlightGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(highlightPositions, 3),
  );
  const highlightColorAttr = new THREE.BufferAttribute(highlightColors, 3);
  highlightGeometry.setAttribute("color", highlightColorAttr);
  const highlightMaterial = new THREE.PointsMaterial({
    map: dotTexture,
    color: accentColor,
    vertexColors: true,
    size: 0.075,
    transparent: true,
    opacity: 0,
    depthWrite: false,
  });
  globeGroup.add(new THREE.Points(highlightGeometry, highlightMaterial));
  const highlight: HighlightDots = {
    colorAttr: highlightColorAttr,
    phases,
    speeds,
    count: highlightCount,
    color: new THREE.Color(),
  };

  /* Wireframe — faint meridians, parallels, and two outer orbits. */
  const wireMaterials: THREE.LineBasicMaterial[] = [];
  const addWireCircle = (
    radius: number,
    rotation: THREE.Euler,
    parent: THREE.Object3D,
  ) => {
    const points: THREE.Vector3[] = [];
    for (let s = 0; s <= 128; s++) {
      const a = (s / 128) * Math.PI * 2;
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
    parent.add(line);
    wireMaterials.push(material);
    return line;
  };
  // Parallels
  [-45, -15, 15, 45].forEach((lat) => {
    const r = RADIUS * Math.cos((lat * Math.PI) / 180) + 0.02;
    const line = addWireCircle(r, new THREE.Euler(0, 0, 0), globeGroup);
    line.position.y = RADIUS * Math.sin((lat * Math.PI) / 180);
  });
  // Meridians
  for (let m = 0; m < 4; m++) {
    addWireCircle(
      RADIUS + 0.02,
      new THREE.Euler(Math.PI / 2, (m / 4) * Math.PI, 0),
      globeGroup,
    );
  }
  // Outer orbits — outside the rotating globe so they stay still
  addWireCircle(RADIUS + 1.15, new THREE.Euler(0.42, 0, 0.12), tiltGroup);
  addWireCircle(RADIUS + 1.7, new THREE.Euler(-0.3, 0, -0.2), tiltGroup);

  /* Markers — six orgs + the marketplace hub, pinned to the surface. */
  const markers: NetworkMarker[] = [];
  const addMarker = (
    texture: THREE.CanvasTexture,
    direction: THREE.Vector3,
    orgIndex: number | null,
    scale: number,
  ) => {
    const material = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });
    const sprite = new THREE.Sprite(material);
    const baseScale = { x: scale, y: scale * 1.25 };
    sprite.scale.set(baseScale.x, baseScale.y, 1);
    // Anchor the stem tip (≈62% down the texture) at the surface point
    sprite.center.set(0.5, 0.38);
    sprite.position.copy(direction.clone().multiplyScalar(RADIUS + 0.02));
    sprite.userData.orgIndex = orgIndex;
    globeGroup.add(sprite);
    markers.push({
      sprite,
      material,
      orgIndex,
      isHub: orgIndex === null,
      baseScale,
      direction: direction.clone().normalize(),
    });
  };

  ORG_LATLONS.forEach((coordinates, i) => {
    addMarker(
      makeOrgMarkerTexture(ORGS[i]),
      latLon(coordinates[0], coordinates[1]).normalize(),
      i,
      1.05,
    );
  });
  addMarker(
    makeHubMarkerTexture(),
    latLon(HUB_LATLON[0], HUB_LATLON[1]).normalize(),
    null,
    1.35,
  );

  /* Arcs — every org to the hub, plus a few peer routes. */
  const hubPoint = latLon(HUB_LATLON[0], HUB_LATLON[1]);
  const arcs: NetworkArc[] = [];
  const addArc = (a: THREE.Vector3, b: THREE.Vector3, toHub: boolean) => {
    const points = arcPoints(a, b);
    const material = new THREE.LineBasicMaterial({
      color: toHub ? accentColor : mutedColor,
      transparent: true,
      opacity: 0,
    });
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    geometry.setDrawRange(0, 0);
    const line = new THREE.Line(geometry, material);
    globeGroup.add(line);
    arcs.push({
      line,
      material,
      geometry,
      pointCount: points.length,
      points,
      toHub,
    });
  };
  ORG_LATLONS.forEach((coordinates) => {
    addArc(latLon(coordinates[0], coordinates[1]), hubPoint, true);
  });
  PEER_PAIRS.forEach(([a, b]) => {
    addArc(
      latLon(ORG_LATLONS[a][0], ORG_LATLONS[a][1]),
      latLon(ORG_LATLONS[b][0], ORG_LATLONS[b][1]),
      false,
    );
  });

  /* Packets — one crisp dot per route. */
  const arcDots: ArcDot[] = [];
  arcs.forEach((arc, i) => {
    const material = new THREE.SpriteMaterial({
      map: dotTexture,
      color: arc.toHub ? accentColor : mutedColor,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });
    const sprite = new THREE.Sprite(material);
    sprite.scale.setScalar(arc.toHub ? 0.085 : 0.065);
    globeGroup.add(sprite);
    arcDots.push({
      sprite,
      material,
      arc,
      t: (i * 0.17) % 1,
      speed: (0.1 + Math.random() * 0.05) * (arc.toHub ? 1 : -1),
    });
  });

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
    globeGroup,
    latticeMaterial,
    highlight,
    highlightMaterial,
    wireMaterials,
    markers,
    arcs,
    arcDots,
    setSize,
    render,
    dispose,
  };
}
