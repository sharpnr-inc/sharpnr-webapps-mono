import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "../lib/utils";

// ─── Types ───────────────────────────────────────────────────────────────────

export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

export interface OpenModalOptions {
  title: string;
  description?: string;
  content: ReactNode;
  footer?: ReactNode;
  /** "sm" | "md" | "lg" | "xl" | "full"  — default "lg" */
  size?: ModalSize;
  /** Prevents closing on backdrop click or Escape key */
  preventClose?: boolean;
  /** Fired after the modal finishes closing */
  onClose?: () => void;
}

export interface ModalContextValue {
  openModal: (options: OpenModalOptions) => void;
  closeModal: () => void;
  updateModal: (partial: Partial<Omit<OpenModalOptions, "content">>) => void;
  /** Positional shorthand: showModal(title, description, content) */
  showModal: (title: string, description: string, content: ReactNode) => void;
  isOpen: boolean;
}

// ─── Size map ─────────────────────────────────────────────────────────────────

const SIZE_CLASS: Record<ModalSize, string> = {
  sm: "max-w-md",
  md: "max-w-xl",
  lg: "max-w-3xl",
  xl: "max-w-5xl",
  full: "max-w-[95vw] w-full",
};

// ─── Context ──────────────────────────────────────────────────────────────────

const ModalContext = createContext<ModalContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function ModalProvider({ children }: { children: ReactNode }) {
  const [options, setOptions] = useState<OpenModalOptions | null>(null);
  const [visible, setVisible] = useState(false); // controls CSS enter/leave
  const [mounted, setMounted] = useState(false); // controls DOM presence
  const onCloseRef = useRef<(() => void) | undefined>(undefined);
  const panelRef = useRef<HTMLDivElement>(null);

  // ── open ──────────────────────────────────────────────────────────────────
  const openModal = useCallback((opts: OpenModalOptions) => {
    onCloseRef.current = opts.onClose;
    setOptions(opts);
    setMounted(true);
    // Let the DOM paint first, then trigger the enter transition
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
  }, []);

  // ── close (starts exit animation) ─────────────────────────────────────────
  const closeModal = useCallback(() => {
    setVisible(false);
    // unmount after the CSS transition finishes (300 ms)
    setTimeout(() => {
      setMounted(false);
      setOptions(null);
      onCloseRef.current?.();
    }, 300);
  }, []);

  const updateModal = useCallback(
    (partial: Partial<Omit<OpenModalOptions, "content">>) => {
      setOptions((prev) => (prev ? { ...prev, ...partial } : prev));
    },
    [],
  );

  const showModal = useCallback(
    (title: string, description: string, content: ReactNode) => {
      openModal({ title, description, content });
    },
    [openModal],
  );

  // ── keyboard ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!mounted) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !options?.preventClose) closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mounted, options?.preventClose, closeModal]);

  // ── scroll lock ───────────────────────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = mounted ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mounted]);

  // ── backdrop click ────────────────────────────────────────────────────────
  const handleBackdrop = (e: React.MouseEvent) => {
    if (options?.preventClose) return;
    if (e.target === e.currentTarget) closeModal();
  };

  const sizeClass = SIZE_CLASS[options?.size ?? "lg"];

  return (
    <ModalContext.Provider
      value={{ openModal, closeModal, updateModal, showModal, isOpen: mounted }}
    >
      {children}

      {mounted &&
        createPortal(
          // ── Backdrop ──────────────────────────────────────────────────────
          <div
            role="dialog"
            aria-modal="true"
            aria-label={options?.title}
            onClick={handleBackdrop}
            className={cn(
              "fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8",
              "bg-black/50 backdrop-blur-[2px]",
              "transition-opacity duration-300",
              visible ? "opacity-100" : "opacity-0",
            )}
          >
            {/* ── Panel ───────────────────────────────────────────────────── */}
            <div
              ref={panelRef}
              className={cn(
                "relative flex flex-col w-full rounded-xl",
                "bg-background border border-border shadow-2xl",
                "max-h-[90vh]",
                "transition-all duration-300",
                visible
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-4 scale-[0.97]",
                sizeClass,
              )}
            >
              {/* ── Header ──────────────────────────────────────────────── */}
              <div className="flex items-start justify-between gap-4 px-7 py-5 border-b border-border shrink-0">
                <div>
                  <h2 className="text-lg font-semibold leading-snug text-foreground">
                    {options?.title}
                  </h2>
                  {options?.description && (
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {options.description}
                    </p>
                  )}
                </div>

                {!options?.preventClose && (
                  <button
                    onClick={closeModal}
                    aria-label="Close modal"
                    className={cn(
                      "shrink-0 rounded-md p-1.5 -mr-1 -mt-0.5",
                      "text-muted-foreground hover:text-foreground",
                      "hover:bg-accent transition-colors",
                    )}
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* ── Scrollable body ──────────────────────────────────────── */}
              <div className="overflow-y-auto flex-1 px-7 py-6">
                {options?.content}
              </div>

              {/* ── Footer ──────────────────────────────────────────────── */}
              {options?.footer && (
                <div
                  className={cn(
                    "shrink-0 flex items-center justify-end gap-2",
                    "px-7 py-4 border-t border-border bg-muted/30",
                  )}
                >
                  {options.footer}
                </div>
              )}
            </div>
          </div>,
          document.body,
        )}
    </ModalContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

// eslint-disable-next-line react-refresh/only-export-components
export function useModal(): ModalContextValue {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within a <ModalProvider>");
  return ctx;
}
