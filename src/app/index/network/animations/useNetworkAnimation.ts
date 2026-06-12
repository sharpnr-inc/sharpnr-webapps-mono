import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import * as THREE from "three";
import type { RefObject } from "react";
import { createNetworkScene } from "../networkScene";

export type HoveredNode = number | "hub" | null;

interface NetworkAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  headingRef: RefObject<HTMLDivElement | null>;
  hostRef: RefObject<HTMLDivElement | null>;
  tooltipRef: RefObject<HTMLDivElement | null>;
  mobileRef: RefObject<HTMLDivElement | null>;
  legendRef: RefObject<HTMLDivElement | null>;
  isMobile: boolean;
  onHover: (value: HoveredNode) => void;
}

/* Quiet targets — structure over shine. */
const LATTICE_OPACITY = 0.85;
const HIGHLIGHT_OPACITY = 0.9;
const WIRE_OPACITY = 0.07;
const HUB_ARC_OPACITY = 0.42;
const PEER_ARC_OPACITY = 0.2;
const ROTATION_SPEED = 0.045;

export function useNetworkAnimation(refs: NetworkAnimationRefs) {
  const {
    sectionRef,
    headingRef,
    hostRef,
    tooltipRef,
    mobileRef,
    legendRef,
    isMobile,
    onHover,
  } = refs;

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      // ── Phase 1: Heading + legend reveal (all devices) ─────────
      if (!prefersReducedMotion) {
        gsap.from(headingRef.current ? headingRef.current.children : [], {
          opacity: 0,
          y: 32,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
        if (legendRef.current) {
          gsap.from(legendRef.current.children, {
            opacity: 0,
            y: 18,
            duration: 0.5,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: legendRef.current,
              start: "top 92%",
              toggleActions: "play none none none",
            },
          });
        }
      }

      // ── Mobile: static illustration, gentle fade only ──────────
      if (isMobile) {
        if (!prefersReducedMotion && mobileRef.current) {
          gsap.from(mobileRef.current.children, {
            opacity: 0,
            y: 24,
            duration: 0.6,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: mobileRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
        }
        return;
      }

      const host = hostRef.current;
      if (!host) return;

      let handle: ReturnType<typeof createNetworkScene>;
      try {
        handle = createNetworkScene(host);
      } catch {
        return; // No WebGL — the section degrades to its copy
      }

      const {
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
      } = handle;

      const observer = new ResizeObserver(() => {
        handle.setSize();
        handle.render();
      });
      observer.observe(host);

      /* Per-marker animation factors — combined into opacity each
         frame so backside fading, hover, and entrance compose. */
      const factors = markers.map(() => ({ entrance: 0, hover: 1 }));

      const globeCenter = new THREE.Vector3();
      const camDir = new THREE.Vector3();
      const markerDir = new THREE.Vector3();
      const markerQuat = new THREE.Quaternion();

      /** 0 on the far side, 1 when facing the camera. */
      const markerVisibility = (index: number) => {
        globeGroup.getWorldQuaternion(markerQuat);
        markerDir.copy(markers[index].direction).applyQuaternion(markerQuat);
        tiltGroup.getWorldPosition(globeCenter);
        camDir.copy(camera.position).sub(globeCenter).normalize();
        const v = markerDir.dot(camDir);
        return THREE.MathUtils.smoothstep(v, -0.02, 0.3);
      };

      const applyMarkerOpacity = () => {
        markers.forEach((marker, i) => {
          marker.material.opacity =
            factors[i].entrance * factors[i].hover * markerVisibility(i);
        });
      };

      const updateHighlights = (elapsed: number) => {
        const { colorAttr, phases, speeds, count, color } = highlight;
        for (let i = 0; i < count; i++) {
          const pulse =
            0.2 + 0.6 * (0.5 + 0.5 * Math.sin(elapsed * speeds[i] + phases[i]));
          color.setScalar(pulse);
          colorAttr.setXYZ(i, color.r, color.g, color.b);
        }
        colorAttr.needsUpdate = true;
      };

      const sampleArc = (arc: (typeof arcs)[number], t: number) => {
        const f = t * (arc.pointCount - 1);
        const i = Math.min(Math.floor(f), arc.pointCount - 2);
        return new THREE.Vector3().lerpVectors(
          arc.points[i],
          arc.points[i + 1],
          f - i,
        );
      };

      // ── Reduced motion: settle everything and render once ──────
      if (prefersReducedMotion) {
        latticeMaterial.opacity = LATTICE_OPACITY;
        highlightMaterial.opacity = HIGHLIGHT_OPACITY;
        wireMaterials.forEach((m) => (m.opacity = WIRE_OPACITY));
        arcs.forEach((arc) => {
          arc.geometry.setDrawRange(0, arc.pointCount);
          arc.material.opacity = arc.toHub
            ? HUB_ARC_OPACITY
            : PEER_ARC_OPACITY;
        });
        factors.forEach((f) => (f.entrance = 1));
        updateHighlights(1.6);
        applyMarkerOpacity();
        handle.render();
        return () => {
          observer.disconnect();
          handle.dispose();
        };
      }

      // ── Phase 2: Entrance — globe forms, markers pin, routes draw ──
      let flowOn = false;
      const intro = { yaw: -0.75 };
      const entrance = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: host,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      entrance
        .to(latticeMaterial, { opacity: LATTICE_OPACITY, duration: 1.6 }, 0)
        .to(intro, { yaw: 0, duration: 2.2, ease: "power2.out" }, 0)
        .to(
          wireMaterials,
          { opacity: WIRE_OPACITY, duration: 1.2, stagger: 0.06 },
          0.4,
        )
        .to(highlightMaterial, { opacity: HIGHLIGHT_OPACITY, duration: 1.0 }, 0.8);

      // Markers pin onto the surface
      markers.forEach((marker, i) => {
        const at = 1.0 + i * 0.1;
        entrance
          .to(factors[i], { entrance: 1, duration: 0.5 }, at)
          .fromTo(
            marker.sprite.scale,
            {
              x: marker.baseScale.x * 0.6,
              y: marker.baseScale.y * 0.6,
            },
            {
              x: marker.baseScale.x,
              y: marker.baseScale.y,
              duration: 0.6,
              ease: "back.out(2.2)",
            },
            at,
          );
      });

      // Routes draw from org to hub
      arcs.forEach((arc, i) => {
        const proxy = { p: 0 };
        entrance
          .to(arc.material, { opacity: arc.toHub ? HUB_ARC_OPACITY : PEER_ARC_OPACITY, duration: 0.3 }, 1.7 + i * 0.08)
          .to(
            proxy,
            {
              p: 1,
              duration: 0.9,
              ease: "power2.inOut",
              onUpdate: () =>
                arc.geometry.setDrawRange(
                  0,
                  Math.floor(proxy.p * arc.pointCount),
                ),
            },
            1.7 + i * 0.08,
          );
      });

      entrance.add(() => {
        flowOn = true;
      });

      // ── Phase 3: Live loop — rotation, parallax, packets, pulses ──
      let elapsed = 0;
      let hovered: HoveredNode = null;
      const parallax = { x: 0, y: 0 };
      const smoothParallax = { x: 0, y: 0 };
      const worldPos = new THREE.Vector3();

      const tick = (_time: number, deltaMS: number) => {
        const dt = deltaMS / 1000;
        elapsed += dt;

        // The globe turns; the pointer tilts the whole assembly gently
        globeGroup.rotation.y += dt * ROTATION_SPEED;
        smoothParallax.x += (parallax.x - smoothParallax.x) * Math.min(1, dt * 3);
        smoothParallax.y += (parallax.y - smoothParallax.y) * Math.min(1, dt * 3);
        tiltGroup.rotation.y = intro.yaw + smoothParallax.x * 0.1;
        tiltGroup.rotation.x = -smoothParallax.y * 0.06;

        updateHighlights(elapsed);
        applyMarkerOpacity();

        // Packets ride the routes
        if (flowOn) {
          arcDots.forEach((dot) => {
            dot.t += dt * dot.speed;
            if (dot.t > 1) dot.t -= 1;
            if (dot.t < 0) dot.t += 1;
            dot.sprite.position.copy(sampleArc(dot.arc, dot.t));
            dot.material.opacity =
              (dot.arc.toHub ? 0.7 : 0.45) * Math.sin(Math.PI * dot.t);
          });
        }

        // Tooltip tracks the hovered marker; drop it if it rotates away
        if (hovered !== null) {
          const index = markers.findIndex((m) =>
            hovered === "hub" ? m.isHub : m.orgIndex === hovered,
          );
          if (index !== -1 && markerVisibility(index) < 0.35) {
            setHovered(null);
          } else if (index !== -1 && tooltipRef.current) {
            markers[index].sprite.getWorldPosition(worldPos);
            worldPos.y += markers[index].baseScale.y * 0.55;
            worldPos.project(camera);
            const w = host.clientWidth;
            const h = host.clientHeight;
            gsap.set(tooltipRef.current, {
              x: (worldPos.x * 0.5 + 0.5) * w,
              y: (-worldPos.y * 0.5 + 0.5) * h,
              xPercent: -50,
              yPercent: -100,
            });
          }
        }

        handle.render();
      };
      gsap.ticker.add(tick);

      // ── Phase 4: Hover — raycast, highlight, tooltip ───────────
      const raycaster = new THREE.Raycaster();
      const pointer = new THREE.Vector2();
      const sprites = markers.map((m) => m.sprite);

      const setHovered = (next: HoveredNode) => {
        if (next === hovered) return;
        hovered = next;
        onHover(next);
        markers.forEach((marker, i) => {
          const isTarget =
            next !== null &&
            (next === "hub" ? marker.isHub : marker.orgIndex === next);
          gsap.to(marker.sprite.scale, {
            x: marker.baseScale.x * (isTarget ? 1.12 : 1),
            y: marker.baseScale.y * (isTarget ? 1.12 : 1),
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(factors[i], {
            hover: next === null || isTarget ? 1 : 0.5,
            duration: 0.3,
          });
        });
        host.style.cursor = next === null ? "" : "pointer";
      };

      const onPointerMove = (e: PointerEvent) => {
        const rect = host.getBoundingClientRect();
        pointer.set(
          ((e.clientX - rect.left) / rect.width) * 2 - 1,
          -((e.clientY - rect.top) / rect.height) * 2 + 1,
        );
        parallax.x = pointer.x;
        parallax.y = pointer.y;

        raycaster.setFromCamera(pointer, camera);
        const hits = raycaster.intersectObjects(sprites, false);
        const hit = hits.find((h) => {
          const index = sprites.indexOf(h.object as THREE.Sprite);
          return index !== -1 && markerVisibility(index) > 0.4;
        });
        if (!hit) {
          setHovered(null);
          return;
        }
        const orgIndex = hit.object.userData.orgIndex as number | null;
        setHovered(orgIndex === null ? "hub" : orgIndex);
      };
      const onPointerLeave = () => {
        setHovered(null);
        parallax.x = 0;
        parallax.y = 0;
      };

      host.addEventListener("pointermove", onPointerMove);
      host.addEventListener("pointerleave", onPointerLeave);

      return () => {
        gsap.ticker.remove(tick);
        host.removeEventListener("pointermove", onPointerMove);
        host.removeEventListener("pointerleave", onPointerLeave);
        observer.disconnect();
        handle.dispose();
      };
    },
    { scope: sectionRef, dependencies: [isMobile] },
  );
}
