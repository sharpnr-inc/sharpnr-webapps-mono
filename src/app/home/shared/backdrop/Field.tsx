import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Color, ShaderMaterial, type Mesh } from "three";

/*
 * The ambient field.
 *
 * A single full-screen plane running flowing value-noise in the Sharpnr
 * palette. It exists to give the navy depth and a slow sense of life — it is
 * never content, never a shape, and never carries meaning. Two low-frequency
 * layers drift against each other so the light never repeats visibly, with a
 * fine grain on top to kill banding on large dark gradients.
 *
 * Cheap by construction: one plane, one pass, no lights, no post-processing.
 */
const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  uniform float uTime;
  uniform vec2  uAspect;
  uniform vec3  uBase;
  uniform vec3  uDeep;
  uniform vec3  uGlow;

  // Value noise — smooth, cheap, no texture lookups.
  vec2 hash(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(dot(hash(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
          dot(hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
      mix(dot(hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
          dot(hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
      u.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p *= 2.02;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv * uAspect;
    float t = uTime * 0.012;

    // Two slow layers drifting apart so the pattern never visibly loops.
    float a = fbm(uv * 1.15 + vec2(t, t * 0.6));
    float b = fbm(uv * 0.75 - vec2(t * 0.8, t * 0.45) + 3.7);

    float light = smoothstep(-0.35, 0.65, a * 0.65 + b * 0.5);

    // A soft pool of light drawn toward the upper third — never a circle.
    vec2 c = (vUv - vec2(0.42, 0.72)) * uAspect;
    float pool = 1.0 - smoothstep(0.0, 1.25, length(c));

    vec3 col = mix(uDeep, uBase, light);
    col = mix(col, uGlow, pool * light * 0.30);

    // Fine grain — stops banding across a large dark field.
    float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
    col += (grain - 0.5) * 0.016;

    gl_FragColor = vec4(col, 1.0);
  }
`;

interface FieldProps {
  /** Static single frame when the visitor prefers reduced motion. */
  animate: boolean;
}

export function Field({ animate }: FieldProps) {
  const mesh = useRef<Mesh>(null);
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAspect: { value: [1, 1] as [number, number] },
      // Palette only — deep navy ground, canvas base, blue/cyan light.
      uBase: { value: new Color("#001f3f") },
      uDeep: { value: new Color("#00101f") },
      uGlow: { value: new Color("#0077b6") },
    }),
    [],
  );

  useFrame((state) => {
    const mat = mesh.current?.material as ShaderMaterial | undefined;
    if (!mat) return;
    if (animate) mat.uniforms.uTime.value = state.clock.elapsedTime;
    const ratio = viewport.width / viewport.height;
    mat.uniforms.uAspect.value = [Math.max(1, ratio), Math.max(1, 1 / ratio)];
  });

  return (
    <mesh ref={mesh} frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}
