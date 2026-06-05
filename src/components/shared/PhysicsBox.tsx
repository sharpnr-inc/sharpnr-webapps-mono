import { useGSAP, gsap } from "@/animations/gsap";
import { Draggable, InertiaPlugin } from "@/animations/gsap";
import { useRef } from "react";

gsap.registerPlugin(Draggable, InertiaPlugin);

const PhysicsBox = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const trailContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const box = boxRef.current;
      const container = containerRef.current;
      const shadow = shadowRef.current;
      const trailContainer = trailContainerRef.current;
      if (!box || !container || !shadow || !trailContainer) return;

      const BOX_W = 120;
      const BOX_H = 120;
      const FLOOR_Y = container.clientHeight - BOX_H - 24;
      const WALL_R = container.clientWidth - BOX_W - 24;
      const WALL_L = 24;
      const GRAVITY = 2200; // px/s²
      const BOUNCE_DAMPEN = 0.58;
      const X_FRICTION = 0.87;

      // live physics state — no rAF, GSAP ticker drives it
      const state = {
        vy: 0,
        vx: 0,
        y: -BOX_H,
        x: container.clientWidth / 2 - BOX_W / 2,
        active: true,
      };

      gsap.set(box, {
        x: state.x,
        y: state.y,
        transformOrigin: "50% 100%",
      });

      // ── squash/stretch ──────────────────────────────────────────
      const squash = (speed: number) => {
        const t = Math.min(speed / 2200, 1);
        gsap.killTweensOf(box, "scaleX,scaleY");
        gsap
          .timeline()
          .to(box, {
            scaleY: 1 - t * 0.52,
            scaleX: 1 + t * 0.42,
            duration: 0.055,
            ease: "power3.in",
          })
          .to(box, {
            scaleY: 1 + t * 0.18,
            scaleX: 1 - t * 0.12,
            duration: 0.09,
            ease: "power1.out",
          })
          .to(box, {
            scaleY: 1,
            scaleX: 1,
            duration: 0.55,
            ease: "elastic.out(1.1, 0.32)",
          });
      };

      // ── shadow proximity ────────────────────────────────────────
      const updateShadow = (y: number) => {
        const pct = Math.max(0, 1 - (FLOOR_Y - y) / FLOOR_Y);
        gsap.set(shadow, {
          scaleX: 0.25 + pct * 0.75,
          opacity: 0.08 + pct * 0.55,
        });
      };

      // ── trail ghost ─────────────────────────────────────────────
      let trailTick = 0;
      const spawnTrail = (x: number, y: number) => {
        const g = document.createElement("div");
        g.style.cssText = `
          position:absolute;width:${BOX_W}px;height:${BOX_H}px;
          left:${x}px;top:${y}px;border-radius:16px;pointer-events:none;
          background:linear-gradient(135deg,rgba(99,102,241,.3),rgba(14,165,233,.2),rgba(16,185,129,.12));
          border:1px solid rgba(255,255,255,.08);
        `;
        trailContainer.appendChild(g);
        gsap.to(g, {
          opacity: 0,
          scale: 0.35,
          duration: 0.38,
          ease: "power2.out",
          onComplete: () => g.remove(),
        });
      };

      // ── GSAP ticker — this IS the physics loop ──────────────────
      // gsap.ticker is GSAP's own RAF. delta is in ms.
      const physicsLoop = (time: number, deltaTime: number, frame: number) => {
        if (!state.active) return;

        const dt = Math.min(deltaTime / 1000, 0.05); // seconds, clamped

        // integrate gravity
        state.vy += GRAVITY * dt;
        state.y += state.vy * dt;
        state.x += state.vx * dt;
        state.vx *= Math.pow(X_FRICTION, dt * 60);

        // trail
        trailTick++;
        if (trailTick % 3 === 0 && Math.abs(state.vy) > 800) {
          spawnTrail(state.x, state.y);
        }

        // floor
        if (state.y >= FLOOR_Y) {
          state.y = FLOOR_Y;
          squash(Math.abs(state.vy));
          state.vy = -(Math.abs(state.vy) * BOUNCE_DAMPEN);
          if (Math.abs(state.vy) < 60) {
            state.vy = 0;
          }
        }

        // walls
        if (state.x < WALL_L) {
          state.x = WALL_L;
          state.vx = Math.abs(state.vx) * 0.55;
          squash(Math.abs(state.vx) * 0.4);
        }
        if (state.x > WALL_R) {
          state.x = WALL_R;
          state.vx = -Math.abs(state.vx) * 0.55;
          squash(Math.abs(state.vx) * 0.4);
        }

        // commit to DOM via gsap.set — GSAP controls the render
        gsap.set(box, { x: state.x, y: state.y });
        updateShadow(state.y);
      };

      gsap.ticker.add(physicsLoop);

      // ── Draggable + InertiaPlugin ───────────────────────────────
      Draggable.create(box, {
        type: "x,y",
        inertia: true,
        bounds: container,
        edgeResistance: 0.7,

        onDragStart() {
          // pause physics while dragging
          state.active = false;
          gsap.to(box, { scale: 0.88, duration: 0.12, ease: "power2.out" });
        },

        onDrag() {
          // keep state in sync while dragging so physics resumes correctly
          state.x = this.x;
          state.y = this.y;
          updateShadow(this.y);
        },

        onDragEnd() {
          gsap.to(box, {
            scale: 1,
            duration: 0.35,
            ease: "elastic.out(1, 0.4)",
          });

          // InertiaPlugin tracked velocity during drag — grab it
          state.vx = InertiaPlugin.getVelocity(box, "x");
          state.vy = InertiaPlugin.getVelocity(box, "y");
          state.x = this.x;
          state.y = this.y;

          // cap throw velocity so it doesn't escape to infinity
          state.vx = Math.max(-2800, Math.min(2800, state.vx));
          state.vy = Math.max(-3500, Math.min(3500, state.vy));

          // hand back to physics loop
          state.active = true;
        },
      });

      // ── hover repel ─────────────────────────────────────────────
      container.addEventListener("mousemove", (e) => {
        if (!state.active) return;
        const rect = container.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
        const cx = state.x + BOX_W / 2;
        const cy = state.y + BOX_H / 2;
        const dx = cx - mx;
        const dy = cy - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 140 && dist > 0) {
          const force = ((140 - dist) / 140) * 1800;
          state.vx += (dx / dist) * force * 0.016;
          state.vy += (dy / dist) * force * 0.016;
        }
      });

      // ── click to launch upward ───────────────────────────────────
      box.addEventListener("click", () => {
        if (state.active) {
          state.vy = -2200;
          state.vx = gsap.utils.random(-400, 400);
        }
      });

      return () => {
        gsap.ticker.remove(physicsLoop);
      };
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden select-none"
      style={{
        height: 600,
        background:
          "radial-gradient(ellipse at 50% 110%, #0f172a 0%, #020617 65%)",
        cursor: "default",
      }}
    >
      <div
        ref={trailContainerRef}
        className="absolute inset-0 pointer-events-none"
      />

      {/* floor line */}
      <div
        className="absolute left-6 right-6"
        style={{
          bottom: 24,
          height: 1,
          background:
            "linear-gradient(90deg,transparent,rgba(99,102,241,.55) 20%,rgba(14,165,233,.55) 50%,rgba(16,185,129,.45) 80%,transparent)",
        }}
      />

      {/* contact shadow */}
      <div
        ref={shadowRef}
        className="absolute pointer-events-none"
        style={{
          bottom: 12,
          left: "50%",
          transform: "translateX(-50%)",
          width: 120,
          height: 18,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse,rgba(99,102,241,.7) 0%,transparent 70%)",
          filter: "blur(8px)",
        }}
      />

      {/* THE BOX */}
      <div
        ref={boxRef}
        className="absolute"
        style={{
          width: 120,
          height: 120,
          borderRadius: 16,
          background:
            "linear-gradient(135deg, #6366f1 0%, #0ea5e9 50%, #10b981 100%)",
          boxShadow:
            "0 0 40px rgba(99,102,241,.55), 0 0 80px rgba(14,165,233,.2), inset 0 1px 0 rgba(255,255,255,.25)",
          border: "1px solid rgba(255,255,255,.18)",
          cursor: "grab",
          transformOrigin: "50% 100%",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 14,
            background:
              "linear-gradient(135deg,rgba(255,255,255,.22) 0%,transparent 55%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "rgba(255,255,255,.65)",
          }}
        />
      </div>

      <p
        className="absolute top-5 inset-x-0 text-center text-xs tracking-widest pointer-events-none"
        style={{ color: "rgba(255,255,255,.2)", fontFamily: "monospace" }}
      >
        drag · throw · hover to repel · click to launch
      </p>
    </div>
  );
};

export default PhysicsBox;
