import { useGSAP } from "@gsap/react";
import { gsap } from "@/animations/gsap";
import { type RefObject } from "react";

export function useDiagramAnimations(wrapperRef: RefObject<HTMLDivElement | null>) {
  useGSAP(
    () => {
      if (!wrapperRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top 10%",
          end: "+=1500",
          scrub: 1,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
        },
      });

      // Initial state: Hide elements
      // We use a slight delay or ensure selectors are correct for React Flow's internal DOM
      const nodes = ".react-flow__node";
      const edges = ".react-flow__edge-path";

      gsap.set(nodes, { opacity: 0, scale: 0.8, y: 30 });
      gsap.set(edges, { drawSVG: "0%", opacity: 0 });
      gsap.set(wrapperRef.current, { opacity: 0, scale: 0.95 });

      // 1. Reveal Wrapper
      tl.to(wrapperRef.current, { opacity: 1, scale: 1, duration: 1 });

      // 2. Reveal Business Op & Core + Edge
      tl.to(".react-flow__node[data-id='business-op'], .react-flow__node[data-id='sharpnr-core']", 
        { opacity: 1, scale: 1, y: 0, stagger: 0.3, duration: 1 }, "-=0.5");
      tl.to(".react-flow__edge[data-id='op-core'] .react-flow__edge-path", 
        { drawSVG: "100%", opacity: 1, duration: 1 }, "-=0.5");

      // 3. Reveal Marketplace + Edge
      tl.to(".react-flow__node[data-id='marketplace']", 
        { opacity: 1, scale: 1, y: 0, duration: 1 }, "-=0.3");
      tl.to(".react-flow__edge[data-id='market-core'] .react-flow__edge-path", 
        { drawSVG: "100%", opacity: 1, duration: 1 }, "-=0.7");

      // 4. Reveal Infra Group + Edge to it
      tl.to(".react-flow__node[data-id='infra-group']", 
        { opacity: 1, scale: 1, y: 0, duration: 1 }, "-=0.3");
      tl.to(".react-flow__edge[data-id='core-infra'] .react-flow__edge-path", 
        { drawSVG: "100%", opacity: 1, duration: 1 }, "-=0.7");

      // 5. Reveal Service Nodes Row 1
      const row1Nodes = [
        ".react-flow__node[data-id='svc-iam']",
        ".react-flow__node[data-id='svc-accounting']",
        ".react-flow__node[data-id='svc-hrms']",
        ".react-flow__node[data-id='svc-crm']"
      ].join(", ");
      
      const row1Edges = [
        ".react-flow__edge[data-id='core-svc-iam'] .react-flow__edge-path",
        ".react-flow__edge[data-id='core-svc-accounting'] .react-flow__edge-path",
        ".react-flow__edge[data-id='core-svc-hrms'] .react-flow__edge-path",
        ".react-flow__edge[data-id='core-svc-crm'] .react-flow__edge-path"
      ].join(", ");

      tl.to(row1Nodes, { opacity: 1, scale: 1, y: 0, stagger: 0.2, duration: 1 }, "-=0.2");
      tl.to(row1Edges, { drawSVG: "100%", opacity: 1, stagger: 0.1, duration: 1 }, "-=1");

      // 6. Reveal Service Nodes Row 2
      const row2Nodes = [
        ".react-flow__node[data-id='svc-silo']",
        ".react-flow__node[data-id='svc-cables']",
        ".react-flow__node[data-id='svc-cortex']",
        ".react-flow__node[data-id='svc-folio']"
      ].join(", ");

      const row2Edges = [
        ".react-flow__edge[data-id='core-svc-silo'] .react-flow__edge-path",
        ".react-flow__edge[data-id='core-svc-cables'] .react-flow__edge-path",
        ".react-flow__edge[data-id='core-svc-cortex'] .react-flow__edge-path",
        ".react-flow__edge[data-id='core-svc-folio'] .react-flow__edge-path"
      ].join(", ");

      tl.to(row2Nodes, { opacity: 1, scale: 1, y: 0, stagger: 0.2, duration: 1 }, "-=0.2");
      tl.to(row2Edges, { drawSVG: "100%", opacity: 1, stagger: 0.1, duration: 1 }, "-=1");

      // 7. Pulse accent edges (final touch)
      tl.to(".react-flow__edge[data-id='op-core'] path, .react-flow__edge[data-id='core-infra'] path", {
        filter: "drop-shadow(0 0 8px #e8604c)",
        duration: 0.5,
      });

      return () => {
        if (tl.scrollTrigger) tl.scrollTrigger.kill();
        tl.kill();
      };
    },
    { scope: wrapperRef }
  );
}
