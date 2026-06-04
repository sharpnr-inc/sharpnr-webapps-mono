import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ExpoScaleEase, SlowMo } from "gsap/EasePack";
import { Draggable } from "gsap/Draggable";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { Flip } from "gsap/Flip";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { Observer } from "gsap/Observer";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { TextPlugin } from "gsap/TextPlugin";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(
  useGSAP,
  Draggable,
  DrawSVGPlugin,
  Flip,
  InertiaPlugin,
  MorphSVGPlugin,
  Observer,
  Physics2DPlugin,
  ScrollTrigger,
  ScrollSmoother,
  ScrollToPlugin,
  TextPlugin,
  ExpoScaleEase,
  SlowMo,
  SplitText,
);

export {
  gsap,
  useGSAP,
  // Eases
  ExpoScaleEase,
  SlowMo,
  // Plugins
  Draggable,
  DrawSVGPlugin,
  Flip,
  InertiaPlugin,
  MorphSVGPlugin,
  Observer,
  Physics2DPlugin,
  ScrollTrigger,
  ScrollSmoother,
  ScrollToPlugin,
  TextPlugin,
  SplitText,
};
