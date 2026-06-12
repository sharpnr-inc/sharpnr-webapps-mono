import * as THREE from "three";

/* ── Org data shown on the 3D cards ─────────────────────────────── */

export interface OrgNodeData {
  name: string;
  industry: string;
  apps: string[];
}

export const ORGS: OrgNodeData[] = [
  {
    name: "Org A",
    industry: "Hotels & Hospitality",
    apps: ["Sharp-Hospitality", "Cables", "Sharp-Accounting"],
  },
  {
    name: "Org B",
    industry: "Healthcare",
    apps: ["Sharp-Lifco", "Sharp-HR", "Silo"],
  },
  {
    name: "Org C",
    industry: "Finance Corp",
    apps: ["Sharp-Accounting", "Folio", "Cortex"],
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

function makeOrgCardTexture(org: OrgNodeData): THREE.CanvasTexture {
  const scale = 2;
  const W = 560;
  const H = 330;
  const canvas = document.createElement("canvas");
  canvas.width = W * scale;
  canvas.height = H * scale;
  const ctx = canvas.getContext("2d")!;
  ctx.scale(scale, scale);

  const inkSoft = tokenCss("--color-ink-soft");
  const accentGlow = tokenCss("--color-accent-glow");
  const accent = tokenCss("--color-accent");
  const light = tokenCss("--color-text-light");
  const muted = tokenCss("--color-ink-muted");

  // Card body — primary-family navy with slight transparency
  ctx.globalAlpha = 0.88;
  ctx.fillStyle = inkSoft;
  roundedRect(ctx, 4, 4, W - 8, H - 8, 26);
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = accent;
  ctx.globalAlpha = 0.55;
  roundedRect(ctx, 4, 4, W - 8, H - 8, 26);
  ctx.stroke();
  ctx.globalAlpha = 1;

  // Industry eyebrow
  ctx.font = "500 19px 'JetBrains Mono', monospace";
  ctx.fillStyle = accentGlow;
  ctx.fillText(org.industry.toUpperCase(), 36, 62);

  // Org name
  ctx.font = "650 42px 'Schibsted Grotesk', sans-serif";
  ctx.fillStyle = light;
  ctx.fillText(org.name, 36, 116);

  // Divider
  ctx.strokeStyle = accent;
  ctx.globalAlpha = 0.25;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(36, 146);
  ctx.lineTo(W - 36, 146);
  ctx.stroke();
  ctx.globalAlpha = 1;

  // Apps
  ctx.font = "400 23px 'JetBrains Mono', monospace";
  org.apps.forEach((app, i) => {
    const y = 192 + i * 44;
    ctx.fillStyle = accentGlow;
    ctx.beginPath();
    ctx.arc(46, y - 7, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = muted;
    ctx.fillText(app, 66, y);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

function makeHubCardTexture(): THREE.CanvasTexture {
  const scale = 2;
  const W = 620;
  const H = 230;
  const canvas = document.createElement("canvas");
  canvas.width = W * scale;
  canvas.height = H * scale;
  const ctx = canvas.getContext("2d")!;
  ctx.scale(scale, scale);

  const ink = tokenCss("--color-ink");
  const accentGlow = tokenCss("--color-accent-glow");
  const accent = tokenCss("--color-accent");
  const light = tokenCss("--color-text-light");

  ctx.globalAlpha = 0.94;
  ctx.fillStyle = ink;
  roundedRect(ctx, 4, 4, W - 8, H - 8, 24);
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.lineWidth = 3.5;
  ctx.strokeStyle = accentGlow;
  roundedRect(ctx, 4, 4, W - 8, H - 8, 24);
  ctx.stroke();

  ctx.font = "700 52px 'Schibsted Grotesk', sans-serif";
  ctx.fillStyle = light;
  ctx.textAlign = "center";
  ctx.fillText(HUB.name, W / 2, 104);

  ctx.font = "500 22px 'JetBrains Mono', monospace";
  ctx.fillStyle = accentGlow;
  ctx.fillText(HUB.sub, W / 2, 156);

  ctx.strokeStyle = accent;
  ctx.globalAlpha = 0.4;
  ctx.setLineDash([4, 8]);
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(60, 182);
  ctx.lineTo(W - 60, 182);
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

function makeGlowTexture(): THREE.CanvasTexture {
  const size = 256;
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
  gradient.addColorStop(0, tokenCss("--color-accent-glow"));
  gradient.addColorStop(0.4, tokenCss("--color-accent"));
  gradient.addColorStop(1, "transparent");
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
}

export interface FlowParticle {
  sprite: THREE.Sprite;
  material: THREE.SpriteMaterial;
  a: THREE.Vector3;
  b: THREE.Vector3;
  t: number;
  speed: number;
}

export interface NetworkSceneHandle {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  nodes: NetworkNode[];
  lineMaterials: THREE.LineBasicMaterial[];
  particles: FlowParticle[];
  motesMaterial: THREE.PointsMaterial;
  hubGlowMaterial: THREE.SpriteMaterial;
  setSize: () => void;
  render: () => void;
  dispose: () => void;
}

/* ── World layout ───────────────────────────────────────────────── */

const HUB_POS = new THREE.Vector3(0, 0.15, 0);
const ORG_POSITIONS = [
  new THREE.Vector3(4.4, 0.95, -1.5),
  new THREE.Vector3(-4.5, -0.15, -1.3),
  new THREE.Vector3(1.7, -0.85, 4.2),
];
const FLY_DIRECTIONS = [
  new THREE.Vector3(1, 0.6, -0.4),
  new THREE.Vector3(-1, 0.5, -0.4),
  new THREE.Vector3(0.2, -0.6, 1),
  new THREE.Vector3(0, 1.2, 0), // hub drops in from above
];

/* ── Builder ────────────────────────────────────────────────────── */

export function createNetworkScene(host: HTMLElement): NetworkSceneHandle {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.domElement.className = "absolute inset-0 size-full";
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 2, 9);
  camera.lookAt(0, 0.35, 0);

  const accentColor = tokenColor("--color-accent");
  const glowColor = tokenColor("--color-accent-glow");
  const lightColor = tokenColor("--color-text-light");
  const glowTexture = makeGlowTexture();

  /* Nodes — three org cards + the marketplace hub */
  const nodes: NetworkNode[] = [];

  ORGS.forEach((org, i) => {
    const material = new THREE.MeshBasicMaterial({
      map: makeOrgCardTexture(org),
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2.7, 1.59), material);
    mesh.userData.orgIndex = i;
    const group = new THREE.Group();
    group.add(mesh);
    const final = ORG_POSITIONS[i].clone();
    group.position.copy(final.clone().addScaledVector(FLY_DIRECTIONS[i], 11));
    scene.add(group);
    nodes.push({
      group,
      mesh,
      material,
      final,
      flyFrom: group.position.clone(),
      isHub: false,
      orgIndex: i,
    });
  });

  /* Hub — brightest node with a glow halo */
  const hubMaterial = new THREE.MeshBasicMaterial({
    map: makeHubCardTexture(),
    transparent: true,
    opacity: 0,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const hubMesh = new THREE.Mesh(new THREE.PlaneGeometry(3.1, 1.15), hubMaterial);
  hubMesh.userData.orgIndex = null;
  const hubGlowMaterial = new THREE.SpriteMaterial({
    map: glowTexture,
    color: accentColor,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const hubGlow = new THREE.Sprite(hubGlowMaterial);
  hubGlow.scale.setScalar(5.2);
  const hubGroup = new THREE.Group();
  hubGroup.add(hubGlow);
  hubGroup.add(hubMesh);
  hubGroup.position.copy(
    HUB_POS.clone().addScaledVector(FLY_DIRECTIONS[3], 11),
  );
  scene.add(hubGroup);
  nodes.push({
    group: hubGroup,
    mesh: hubMesh,
    material: hubMaterial,
    final: HUB_POS.clone(),
    flyFrom: hubGroup.position.clone(),
    isHub: true,
    orgIndex: null,
  });

  /* Connection lines — org ↔ hub, additive glow */
  const lineMaterials: THREE.LineBasicMaterial[] = [];
  ORG_POSITIONS.forEach((pos) => {
    const material = new THREE.LineBasicMaterial({
      color: accentColor,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    });
    const geometry = new THREE.BufferGeometry().setFromPoints([HUB_POS, pos]);
    scene.add(new THREE.Line(geometry, material));
    lineMaterials.push(material);
  });

  /* Flow particles — packets travelling both directions */
  const particles: FlowParticle[] = [];
  ORG_POSITIONS.forEach((pos) => {
    for (let k = 0; k < 4; k++) {
      const outbound = k % 2 === 0;
      const material = new THREE.SpriteMaterial({
        map: glowTexture,
        color: lightColor,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const sprite = new THREE.Sprite(material);
      sprite.scale.setScalar(0.16);
      scene.add(sprite);
      particles.push({
        sprite,
        material,
        a: outbound ? HUB_POS.clone() : pos.clone(),
        b: outbound ? pos.clone() : HUB_POS.clone(),
        t: k / 4 + Math.random() * 0.15,
        speed: 0.16 + Math.random() * 0.08,
      });
    }
  });

  /* Background motes for depth */
  const moteCount = 220;
  const motePositions = new Float32Array(moteCount * 3);
  for (let i = 0; i < moteCount; i++) {
    const r = 9 + Math.random() * 9;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    motePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    motePositions[i * 3 + 1] = (r * Math.cos(phi)) * 0.5;
    motePositions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
  }
  const motesGeometry = new THREE.BufferGeometry();
  motesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(motePositions, 3),
  );
  const motesMaterial = new THREE.PointsMaterial({
    color: glowColor,
    size: 0.045,
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
      if (obj instanceof THREE.Mesh || obj instanceof THREE.Points) {
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
    glowTexture.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };

  return {
    renderer,
    scene,
    camera,
    nodes,
    lineMaterials,
    particles,
    motesMaterial,
    hubGlowMaterial,
    setSize,
    render,
    dispose,
  };
}
