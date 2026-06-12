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

      const { camera, nodes, lineMaterials, particles, motesMaterial } =
        handle;

      const observer = new ResizeObserver(() => {
        handle.setSize();
        handle.render();
      });
      observer.observe(host);

      // ── Reduced motion: settle everything and render once ──────
      if (prefersReducedMotion) {
        nodes.forEach((node) => {
          node.group.position.copy(node.final);
          node.material.opacity = 1;
          node.group.quaternion.copy(camera.quaternion);
        });
        lineMaterials.forEach((m) => (m.opacity = 0.5));
        motesMaterial.opacity = 0.3;
        handle.hubGlowMaterial.opacity = 0.5;
        handle.render();
        return () => {
          observer.disconnect();
          handle.dispose();
        };
      }

      // ── Phase 2: Entrance — nodes fly in and settle ────────────
      let flowOn = false;
      const entrance = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: host,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      nodes.forEach((node, i) => {
        const at = i * 0.14;
        entrance
          .to(
            node.group.position,
            {
              x: node.final.x,
              y: node.final.y,
              z: node.final.z,
              duration: 1.3,
            },
            at,
          )
          .to(node.material, { opacity: 1, duration: 0.7 }, at + 0.15);
      });
      entrance
        .to(
          handle.hubGlowMaterial,
          { opacity: 0.55, duration: 0.9 },
          ">-0.6",
        )
        .to(
          lineMaterials,
          { opacity: 0.5, duration: 0.8, stagger: 0.12 },
          ">-0.4",
        )
        .to(motesMaterial, { opacity: 0.3, duration: 1.2 }, "<")
        .add(() => {
          flowOn = true;
          // ── Phase 3: Ambient float on each node ────────────────
          nodes.forEach((node, i) => {
            gsap.to(node.group.position, {
              y: `+=${0.16 + (i % 3) * 0.05}`,
              duration: 3 + i * 0.6,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            });
          });
        });

      // ── Phase 4: Live loop — orbit, billboards, particles ──────
      let elapsed = 0;
      let hovered: HoveredNode = null;
      const parallax = { x: 0, y: 0 };
      const worldPos = new THREE.Vector3();

      const tick = (_time: number, deltaMS: number) => {
        const dt = deltaMS / 1000;
        elapsed += dt;

        // Camera slowly orbits, nudged by the pointer
        const angle = elapsed * 0.07 + parallax.x * 0.18;
        const radius = 9;
        camera.position.set(
          Math.sin(angle) * radius,
          2 + parallax.y * 0.7,
          Math.cos(angle) * radius,
        );
        camera.lookAt(0, 0.35, 0);

        // Cards always face the camera
        nodes.forEach((node) => {
          node.group.quaternion.copy(camera.quaternion);
        });

        // Hub glow breathes
        handle.hubGlowMaterial.opacity = flowOn
          ? 0.45 + Math.sin(elapsed * 1.4) * 0.12
          : handle.hubGlowMaterial.opacity;

        // Packets ride the connections
        if (flowOn) {
          particles.forEach((p) => {
            p.t += dt * p.speed;
            if (p.t > 1) p.t -= 1;
            p.sprite.position.lerpVectors(p.a, p.b, p.t);
            p.material.opacity =
              0.85 * Math.sin(Math.PI * Math.min(1, Math.max(0, p.t)));
          });
        }

        // Tooltip tracks the hovered node
        if (hovered !== null && tooltipRef.current) {
          const node =
            hovered === "hub"
              ? nodes[nodes.length - 1]
              : nodes.find((n) => n.orgIndex === hovered);
          if (node) {
            worldPos.copy(node.group.position);
            worldPos.y += node.isHub ? 0.8 : 1.0;
            worldPos.project(camera);
            const w = host.clientWidth;
            const h = host.clientHeight;
            gsap.set(tooltipRef.current, {
              x: (worldPos.x * 0.5 + 0.5) * w,
              y: (-worldPos.y * 0.5 + 0.5) * h,
              xPercent: -50,
              yPercent: -112,
            });
          }
        }

        handle.render();
      };
      gsap.ticker.add(tick);

      // ── Phase 5: Hover — raycast, highlight, tooltip ───────────
      const raycaster = new THREE.Raycaster();
      const pointer = new THREE.Vector2();
      const meshes = nodes.map((n) => n.mesh);

      const setHovered = (next: HoveredNode) => {
        if (next === hovered) return;
        hovered = next;
        onHover(next);
        nodes.forEach((node) => {
          const isTarget =
            next !== null &&
            (next === "hub" ? node.isHub : node.orgIndex === next);
          gsap.to(node.group.scale, {
            x: isTarget ? 1.12 : 1,
            y: isTarget ? 1.12 : 1,
            z: isTarget ? 1.12 : 1,
            duration: 0.35,
            ease: "power2.out",
          });
          gsap.to(node.material, {
            opacity: next === null || isTarget ? 1 : 0.55,
            duration: 0.35,
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
        const hit = raycaster.intersectObjects(meshes, false)[0];
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
