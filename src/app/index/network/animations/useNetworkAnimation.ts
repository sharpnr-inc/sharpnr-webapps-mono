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

/* Quiet targets — wireframe structure over shine. */
const HUB_LINK_OPACITY = 0.4;
const PEER_LINK_OPACITY = 0.18;
const MEMBER_OPACITY = 0.9;
const MOTES_OPACITY = 0.16;
const RING_OPACITY = 0.09;
const NET_ROTATION = 0.05;
const ATMOSPHERE_ROTATION = -0.022;

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
      } = handle;

      const observer = new ResizeObserver(() => {
        handle.setSize();
        handle.render();
      });
      observer.observe(host);

      /* Cards orbit inside networkGroup but must keep facing the camera.
         local = parentWorld⁻¹ · cameraQuat keeps them billboarded. */
      const parentQuat = new THREE.Quaternion();
      const parentInv = new THREE.Quaternion();
      const cardWorld = new THREE.Vector3();

      const billboardAndFade = () => {
        networkGroup.getWorldQuaternion(parentQuat);
        parentInv.copy(parentQuat).invert();
        nodes.forEach((node) => {
          node.group.quaternion.copy(camera.quaternion).premultiply(parentInv);
          // Depth fade — cards nearer the camera read brighter
          node.group.getWorldPosition(cardWorld);
          const dist = cardWorld.distanceTo(camera.position);
          const depth = 1 - THREE.MathUtils.smoothstep(dist, 8, 14.5);
          node.material.opacity =
            node.entrance * node.hover * (0.45 + depth * 0.55);
        });
      };

      const updateMembers = (elapsed: number) => {
        const { colorAttr, phases, speeds, count, color } = members;
        for (let i = 0; i < count; i++) {
          const pulse =
            0.18 + 0.55 * (0.5 + 0.5 * Math.sin(elapsed * speeds[i] + phases[i]));
          color.setScalar(pulse);
          colorAttr.setXYZ(i, color.r, color.g, color.b);
        }
        colorAttr.needsUpdate = true;
      };

      const samplePacket = (packet: (typeof packets)[number]) => {
        const { points, pointCount } = packet.link;
        const f = packet.t * (pointCount - 1);
        const i = Math.min(Math.floor(f), pointCount - 2);
        return new THREE.Vector3().lerpVectors(points[i], points[i + 1], f - i);
      };

      // ── Reduced motion: settle everything and render once ──────
      if (prefersReducedMotion) {
        wireMaterials.forEach(
          (m) => (m.opacity = (m.userData.base as number) ?? 0.1),
        );
        ringMaterials.forEach((m) => (m.opacity = RING_OPACITY));
        memberMaterial.opacity = MEMBER_OPACITY;
        motesMaterial.opacity = MOTES_OPACITY;
        links.forEach((link) => {
          link.geometry.setDrawRange(0, link.pointCount);
          link.material.opacity = link.toHub
            ? HUB_LINK_OPACITY
            : PEER_LINK_OPACITY;
        });
        nodes.forEach((node) => {
          node.group.position.copy(node.final);
          node.entrance = 1;
        });
        updateMembers(1.4);
        billboardAndFade();
        handle.render();
        return () => {
          observer.disconnect();
          handle.dispose();
        };
      }

      // ── Phase 2: Entrance — sphere forms, cards dock, web draws ──
      let flowOn = false;
      const intro = { spin: -0.6 };
      const entrance = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: host,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      // Wireframe sphere fades in and unwinds into place
      atmosphereGroup.scale.set(0.7, 0.7, 0.7);
      entrance
        .to(atmosphereGroup.scale, { x: 1, y: 1, z: 1, duration: 1.8 }, 0)
        .to(intro, { spin: 0, duration: 2.0, ease: "power2.out" }, 0)
        .to(
          wireMaterials,
          {
            opacity: (i) => (wireMaterials[i].userData.base as number) ?? 0.1,
            duration: 1.4,
            stagger: 0.1,
          },
          0.2,
        )
        .to(
          ringMaterials,
          { opacity: RING_OPACITY, duration: 1.2, stagger: 0.12 },
          0.4,
        )
        .to(memberMaterial, { opacity: MEMBER_OPACITY, duration: 1.0 }, 0.6)
        .to(motesMaterial, { opacity: MOTES_OPACITY, duration: 1.4 }, 0.4);

      // Hub docks first, then org containers fly in
      const hub = nodes[nodes.length - 1];
      entrance
        .to(hub.group.position, {
          x: hub.final.x,
          y: hub.final.y,
          z: hub.final.z,
          duration: 1.1,
        }, 0.7)
        .to(hub, { entrance: 1, duration: 0.6 }, 0.85);

      nodes.forEach((node, i) => {
        if (node.isHub) return;
        const at = 1.0 + i * 0.13;
        entrance
          .to(
            node.group.position,
            {
              x: node.final.x,
              y: node.final.y,
              z: node.final.z,
              duration: 1.2,
            },
            at,
          )
          .to(node, { entrance: 1, duration: 0.7 }, at + 0.1);
      });

      // The web draws — hub links first, then peer routes
      links.forEach((link, i) => {
        const proxy = { p: 0 };
        const at = (link.toHub ? 1.5 : 2.2) + i * 0.06;
        entrance
          .to(
            link.material,
            {
              opacity: link.toHub ? HUB_LINK_OPACITY : PEER_LINK_OPACITY,
              duration: 0.3,
            },
            at,
          )
          .to(
            proxy,
            {
              p: 1,
              duration: 0.85,
              ease: "power2.inOut",
              onUpdate: () =>
                link.geometry.setDrawRange(
                  0,
                  Math.floor(proxy.p * link.pointCount),
                ),
            },
            at,
          );
      });

      entrance.add(() => {
        flowOn = true;
      });

      // ── Phase 3: Live loop ─────────────────────────────────────
      let elapsed = 0;
      let hovered: HoveredNode = null;
      const parallax = { x: 0, y: 0 };
      const smooth = { x: 0, y: 0 };
      const worldPos = new THREE.Vector3();

      const tick = (_time: number, deltaMS: number) => {
        const dt = Math.min(deltaMS / 1000, 0.05);
        elapsed += dt;

        networkGroup.rotation.y += dt * NET_ROTATION;
        atmosphereGroup.rotation.y += dt * ATMOSPHERE_ROTATION;
        atmosphereGroup.rotation.x = 0.12;

        smooth.x += (parallax.x - smooth.x) * Math.min(1, dt * 3);
        smooth.y += (parallax.y - smooth.y) * Math.min(1, dt * 3);
        tiltGroup.rotation.y = intro.spin + smooth.x * 0.12;
        tiltGroup.rotation.x = -smooth.y * 0.08;

        updateMembers(elapsed);
        billboardAndFade();

        if (flowOn) {
          packets.forEach((p) => {
            p.t += dt * p.speed;
            if (p.t > 1) p.t -= 1;
            if (p.t < 0) p.t += 1;
            p.sprite.position.copy(samplePacket(p));
            p.material.opacity =
              (p.link.toHub ? 0.7 : 0.45) * Math.sin(Math.PI * p.t);
          });
        }

        if (hovered !== null && tooltipRef.current) {
          const node =
            hovered === "hub"
              ? nodes[nodes.length - 1]
              : nodes.find((n) => n.orgIndex === hovered);
          if (node) {
            node.group.getWorldPosition(worldPos);
            worldPos.y += node.isHub ? 0.75 : 0.85;
            worldPos.project(camera);
            const w = host.clientWidth;
            const h = host.clientHeight;
            gsap.set(tooltipRef.current, {
              x: (worldPos.x * 0.5 + 0.5) * w,
              y: (-worldPos.y * 0.5 + 0.5) * h,
              xPercent: -50,
              yPercent: -108,
            });
          }
        }

        handle.render();
      };
      gsap.ticker.add(tick);

      // ── Phase 4: Hover — raycast, highlight, tooltip ───────────
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
            x: isTarget ? 1.08 : 1,
            y: isTarget ? 1.08 : 1,
            z: isTarget ? 1.08 : 1,
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(node, {
            hover: next === null || isTarget ? 1 : 0.4,
            duration: 0.3,
          });
        });
        // Dim links not touching the hovered org
        links.forEach((link) => {
          gsap.to(link.material, {
            opacity:
              next === null
                ? link.toHub
                  ? HUB_LINK_OPACITY
                  : PEER_LINK_OPACITY
                : link.toHub
                  ? HUB_LINK_OPACITY * 0.4
                  : PEER_LINK_OPACITY * 0.3,
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
