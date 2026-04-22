import {
  createContext,
  useContext,
  forwardRef,
  type ReactNode,
  type CSSProperties,
  type HTMLAttributes,
  type MouseEventHandler,
} from "react";
import {
  motion,
  AnimatePresence,
  type Variants,
  type MotionProps,
} from "framer-motion";

// ─────────────────────────────────────────────
//  Types & Enums
// ─────────────────────────────────────────────

export type CardVariant = "default" | "glass" | "outline" | "elevated" | "flat";
export type CardSize = "sm" | "md" | "lg" | "xl";
export type CardAnimation =
  | "fadeUp"
  | "fadeIn"
  | "scale"
  | "slideLeft"
  | "none";
export type CardJustify = "start" | "end" | "center" | "between";
export type GlowPosition =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left"
  | "center";

// ─────────────────────────────────────────────
//  Design Token Shapes
// ─────────────────────────────────────────────

interface VariantTokens {
  bg: string;
  border: string;
  shadow: string;
  accent: string;
}

interface SizeTokens {
  padding: string;
  radius: string;
  gap: string;
}

// ─────────────────────────────────────────────
//  Context
// ─────────────────────────────────────────────

interface CardContextValue {
  variant: CardVariant;
  size: CardSize;
  tok: VariantTokens;
  sz: SizeTokens;
}

const CardContext = createContext<CardContextValue | null>(null);

function useCard(): CardContextValue {
  const ctx = useContext(CardContext);
  if (!ctx)
    throw new Error(
      "CardBlock sub-components must be used inside <CardBlock />",
    );
  return ctx;
}

// ─────────────────────────────────────────────
//  Design Tokens
// ─────────────────────────────────────────────

const VARIANTS: Record<CardVariant, VariantTokens> = {
  default: {
    bg: "#0f0f11",
    border: "#2a2a2e",
    shadow: "0 0 0 1px #2a2a2e",
    accent: "#e8e6e1",
  },
  glass: {
    bg: "rgba(255,255,255,0.04)",
    border: "rgba(255,255,255,0.1)",
    shadow: "0 8px 32px rgba(0,0,0,0.4)",
    accent: "#c8b8ff",
  },
  outline: {
    bg: "transparent",
    border: "#3d3d42",
    shadow: "none",
    accent: "#f0ede8",
  },
  elevated: {
    bg: "#16161a",
    border: "#303038",
    shadow: "0 20px 60px rgba(0,0,0,0.6)",
    accent: "#ffdb85",
  },
  flat: {
    bg: "#1a1a1f",
    border: "transparent",
    shadow: "none",
    accent: "#80e8a0",
  },
};

const SIZES: Record<CardSize, SizeTokens> = {
  sm: { padding: "12px 16px", radius: "10px", gap: "10px" },
  md: { padding: "20px 24px", radius: "14px", gap: "16px" },
  lg: { padding: "28px 32px", radius: "18px", gap: "22px" },
  xl: { padding: "36px 40px", radius: "22px", gap: "28px" },
};

const ANIMATIONS: Record<CardAnimation, Variants> = {
  fadeUp: { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } },
  fadeIn: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  scale: {
    hidden: { opacity: 0, scale: 0.93 },
    visible: { opacity: 1, scale: 1 },
  },
  slideLeft: { hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0 } },
  none: { hidden: {}, visible: {} },
};

const JUSTIFY_MAP: Record<CardJustify, string> = {
  start: "flex-start",
  end: "flex-end",
  center: "center",
  between: "space-between",
};

// ─────────────────────────────────────────────
//  Prop Interfaces
// ─────────────────────────────────────────────

export interface CardBlockProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onClick"> {
  children?: ReactNode;
  /** Visual style preset */
  variant?: CardVariant;
  /** Padding / border-radius scale */
  size?: CardSize;
  /** Entry animation preset */
  animation?: CardAnimation;
  /** Enable hover scale + glow */
  hover?: boolean;
  /** Enable press (whileTap) */
  clickable?: boolean;
  /** Dims card and disables all interaction */
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
  style?: CSSProperties;
  /** Entrance delay in seconds */
  delay?: number;
  /** Entrance duration in seconds */
  duration?: number;
}

export interface CardBlockHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  /** Render a bottom border separator */
  divider?: boolean;
  style?: CSSProperties;
}

export interface CardBlockTitleProps
  extends HTMLAttributes<HTMLHeadingElement> {
  children?: ReactNode;
  style?: CSSProperties;
}

export interface CardBlockDescriptionProps
  extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode;
  style?: CSSProperties;
}

export interface CardBlockBodyProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  style?: CSSProperties;
}

export interface CardBlockFooterProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  /** Render a top border separator */
  divider?: boolean;
  /** Justify content alignment */
  justify?: CardJustify;
  style?: CSSProperties;
}

export interface CardBlockBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
  /** Badge accent color (hex / rgba) */
  color?: string;
  style?: CSSProperties;
}

export interface CardBlockSeparatorProps {
  style?: CSSProperties;
}

export interface CardBlockGlowProps {
  /** Glow color (hex / rgba) */
  color?: string;
  /** Opacity of the glow layer */
  opacity?: number;
  /** Absolute position anchor */
  position?: GlowPosition;
  style?: CSSProperties;
}

export interface CardBlockCollapseProps {
  /** Controls open/closed state */
  open: boolean;
  children?: ReactNode;
}

export interface CardBlockImageProps extends HTMLAttributes<HTMLDivElement> {
  src: string;
  alt?: string;
  /** Image height in px */
  height?: number;
  style?: CSSProperties;
}

// ─────────────────────────────────────────────
//  Root — CardBlock
// ─────────────────────────────────────────────

const CardBlockRoot = forwardRef<HTMLDivElement, CardBlockProps>(
  (
    {
      children,
      variant = "default",
      size = "md",
      animation = "fadeUp",
      hover = true,
      clickable = false,
      disabled = false,
      onClick,
      className = "",
      style = {},
      delay = 0,
      duration = 0.45,
      ...props
    },
    ref,
  ) => {
    const tok = VARIANTS[variant] ?? VARIANTS.default;
    const sz = SIZES[size] ?? SIZES.md;
    const anim = ANIMATIONS[animation] ?? ANIMATIONS.fadeUp;

    const hoverMotion: Partial<MotionProps> =
      hover && !disabled
        ? {
            whileHover: {
              scale: 1.012,
              boxShadow: `0 0 0 1px ${tok.accent}33, ${tok.shadow}`,
            },
            whileTap: clickable ? { scale: 0.985 } : undefined,
          }
        : {};

    return (
      <CardContext.Provider value={{ variant, size, tok, sz }}>
        <motion.div
          ref={ref}
          variants={anim}
          initial="hidden"
          animate="visible"
          transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
          {...hoverMotion}
          onClick={!disabled ? onClick : undefined}
          className={className}
          style={{
            background: tok.bg,
            border: `1px solid ${tok.border}`,
            boxShadow: tok.shadow,
            borderRadius: sz.radius,
            display: "flex",
            flexDirection: "column",
            gap: sz.gap,
            cursor: clickable && !disabled ? "pointer" : "default",
            opacity: disabled ? 0.45 : 1,
            backdropFilter: variant === "glass" ? "blur(20px)" : undefined,
            WebkitBackdropFilter:
              variant === "glass" ? "blur(20px)" : undefined,
            overflow: "hidden",
            position: "relative",
            transition: "box-shadow 0.2s",
            ...style,
          }}
          {...(props as MotionProps)}
        >
          {children}
        </motion.div>
      </CardContext.Provider>
    );
  },
);
CardBlockRoot.displayName = "CardBlock";

// ─────────────────────────────────────────────
//  CardBlock.Header
// ─────────────────────────────────────────────

const Header = forwardRef<HTMLDivElement, CardBlockHeaderProps>(
  ({ children, divider = false, style = {}, ...props }, ref) => {
    const { tok, sz } = useCard();
    return (
      <div
        ref={ref}
        style={{
          padding: sz.padding,
          paddingBottom: divider ? sz.gap : sz.padding.split(" ")[0],
          borderBottom: divider ? `1px solid ${tok.border}` : "none",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  },
);
Header.displayName = "CardBlock.Header";

// ─────────────────────────────────────────────
//  CardBlock.Title
// ─────────────────────────────────────────────

const Title = forwardRef<HTMLHeadingElement, CardBlockTitleProps>(
  ({ children, style = {}, ...props }, ref) => {
    const { tok } = useCard();
    return (
      <h3
        ref={ref}
        style={{
          margin: 0,
          color: tok.accent,
          fontSize: "1.05rem",
          fontWeight: 600,
          letterSpacing: "-0.01em",
          fontFamily: "'DM Sans', 'Syne', sans-serif",
          lineHeight: 1.3,
          ...style,
        }}
        {...props}
      >
        {children}
      </h3>
    );
  },
);
Title.displayName = "CardBlock.Title";

// ─────────────────────────────────────────────
//  CardBlock.Description
// ─────────────────────────────────────────────

const Description = forwardRef<HTMLParagraphElement, CardBlockDescriptionProps>(
  ({ children, style = {}, ...props }, ref) => (
    <p
      ref={ref}
      style={{
        margin: 0,
        color: "rgba(200,200,210,0.55)",
        fontSize: "0.82rem",
        lineHeight: 1.55,
        fontFamily: "'DM Sans', sans-serif",
        ...style,
      }}
      {...props}
    >
      {children}
    </p>
  ),
);
Description.displayName = "CardBlock.Description";

// ─────────────────────────────────────────────
//  CardBlock.Body
// ─────────────────────────────────────────────

const Body = forwardRef<HTMLDivElement, CardBlockBodyProps>(
  ({ children, style = {}, ...props }, ref) => {
    const { sz } = useCard();
    return (
      <div
        ref={ref}
        style={{
          padding: `0 ${sz.padding.split(" ")[1]}`,
          flex: 1,
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  },
);
Body.displayName = "CardBlock.Body";

// ─────────────────────────────────────────────
//  CardBlock.Footer
// ─────────────────────────────────────────────

const Footer = forwardRef<HTMLDivElement, CardBlockFooterProps>(
  (
    { children, divider = true, justify = "end", style = {}, ...props },
    ref,
  ) => {
    const { tok, sz } = useCard();
    return (
      <div
        ref={ref}
        style={{
          padding: sz.padding,
          paddingTop: divider ? sz.gap : sz.padding.split(" ")[0],
          borderTop: divider ? `1px solid ${tok.border}` : "none",
          display: "flex",
          alignItems: "center",
          justifyContent: JUSTIFY_MAP[justify],
          gap: "10px",
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  },
);
Footer.displayName = "CardBlock.Footer";

// ─────────────────────────────────────────────
//  CardBlock.Badge
// ─────────────────────────────────────────────

const Badge = forwardRef<HTMLSpanElement, CardBlockBadgeProps>(
  ({ children, color = "#e8e6e1", style = {}, ...props }, ref) => (
    <span
      ref={ref}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        padding: "2px 9px",
        borderRadius: "999px",
        fontSize: "0.7rem",
        fontWeight: 600,
        letterSpacing: "0.03em",
        textTransform: "uppercase",
        background: `${color}18`,
        color,
        border: `1px solid ${color}33`,
        fontFamily: "'DM Mono', monospace",
        ...style,
      }}
      {...props}
    >
      {children}
    </span>
  ),
);
Badge.displayName = "CardBlock.Badge";

// ─────────────────────────────────────────────
//  CardBlock.Separator
// ─────────────────────────────────────────────

function Separator({ style = {} }: CardBlockSeparatorProps) {
  const { tok, sz } = useCard();
  return (
    <hr
      style={{
        margin: `0 ${sz.padding.split(" ")[1]}`,
        border: "none",
        borderTop: `1px solid ${tok.border}`,
        ...style,
      }}
    />
  );
}
Separator.displayName = "CardBlock.Separator";

// ─────────────────────────────────────────────
//  CardBlock.Glow
// ─────────────────────────────────────────────

const GLOW_POSITIONS: Record<GlowPosition, CSSProperties> = {
  "top-right": { top: "-40px", right: "-40px" },
  "top-left": { top: "-40px", left: "-40px" },
  "bottom-right": { bottom: "-40px", right: "-40px" },
  "bottom-left": { bottom: "-40px", left: "-40px" },
  center: { top: "50%", left: "50%", transform: "translate(-50%,-50%)" },
};

function Glow({
  color = "#c8b8ff",
  opacity = 0.18,
  position = "top-right",
  style = {},
}: CardBlockGlowProps) {
  return (
    <div
      style={{
        position: "absolute",
        width: "160px",
        height: "160px",
        borderRadius: "50%",
        background: color,
        filter: "blur(60px)",
        opacity,
        pointerEvents: "none",
        zIndex: 0,
        ...GLOW_POSITIONS[position],
        ...style,
      }}
    />
  );
}
Glow.displayName = "CardBlock.Glow";

// ─────────────────────────────────────────────
//  CardBlock.Collapse
// ─────────────────────────────────────────────

function Collapse({ open, children }: CardBlockCollapseProps) {
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          key="collapse-content"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          style={{ overflow: "hidden" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
Collapse.displayName = "CardBlock.Collapse";

// ─────────────────────────────────────────────
//  CardBlock.Image
// ─────────────────────────────────────────────

const Image = forwardRef<HTMLDivElement, CardBlockImageProps>(
  ({ src, alt = "", height = 180, style = {}, ...props }, ref) => (
    <div
      ref={ref}
      style={{
        overflow: "hidden",
        borderRadius: "inherit",
        margin: "-1px -1px 0",
        ...style,
      }}
      {...props}
    >
      <img
        src={src}
        alt={alt}
        style={{ width: "100%", height, objectFit: "cover", display: "block" }}
      />
    </div>
  ),
);
Image.displayName = "CardBlock.Image";

// ─────────────────────────────────────────────
//  Compound Export
// ─────────────────────────────────────────────

/**
 * CardBlock — shadcn-style compound card component with Framer Motion.
 *
 * @example
 * <CardBlock variant="glass" size="lg" animation="scale" hover>
 *   <CardBlock.Header divider>
 *     <CardBlock.Title>Hello</CardBlock.Title>
 *     <CardBlock.Description>A description</CardBlock.Description>
 *   </CardBlock.Header>
 *   <CardBlock.Body>
 *     <div>your content</div>
 *   </CardBlock.Body>
 *   <CardBlock.Footer justify="between">
 *     <CardBlock.Badge color="#c8b8ff">New</CardBlock.Badge>
 *     <button>Action</button>
 *   </CardBlock.Footer>
 * </CardBlock>
 */
export const CardBlock = Object.assign(CardBlockRoot, {
  Header: Header,
  Title: Title,
  Description: Description,
  Body: Body,
  Footer: Footer,
  Badge: Badge,
  Separator: Separator,
  Glow: Glow,
  Collapse: Collapse,
  Image: Image,
});

export default CardBlock;
