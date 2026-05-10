import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useFieldContext } from "../form-context";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useCountries } from "../apiservice/queries";
import { useStateStore } from "@/components/forms/store/state_store";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  CheckIcon,
  ChevronDown,
  Globe,
  Loader2,
} from "lucide-react";
import React from "react";
import type { Country } from "../apiservice/csc";

// ─── accent consistent with property form (violet) ────────────────────────────
const A = "167,139,250";

const CountrySelect = () => {
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [triggerHovered, setTriggerHovered] = React.useState(false);
  const field = useFieldContext<string>();

  const { data: countries, isLoading } = useCountries();
  const setCountryCode = useStateStore((s) => s.setCountryCode);

  const error = field.state.meta.errors?.[0];
  const selectedCountry = countries?.find(
    (c: Country) => c.name === field.state.value,
  );

  const filteredCountries = React.useMemo(() => {
    if (!countries) return [];
    if (!searchValue) return countries;
    return countries.filter((country: Country) =>
      country.name.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }, [countries, searchValue]);

  const hasValue = !!field.state.value;
  const hasError = !!error;

  return (
    <div style={{ position: "relative", width: "100%" }}>
      {/* Floating label */}
      <motion.label
        animate={{
          y: hasValue || open ? -21 : 0,
          fontSize: hasValue || open ? "0.56rem" : "0.7rem",
          color: hasError
            ? "rgba(248,113,113,0.7)"
            : hasValue || open
              ? open
                ? `rgba(${A},0.8)`
                : "rgba(255,255,255,0.3)"
              : "rgba(255,255,255,0.25)",
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        style={{
          position: "absolute",
          left: "2.4rem",
          top: "26px", // vertically centered relative to trigger height
          transform: "translateY(-50%)",
          fontFamily: "'IBM Plex Mono', monospace",
          letterSpacing: "0.08em",
          pointerEvents: "none",
          zIndex: 10,
          textTransform: "uppercase",
          whiteSpace: "nowrap",
        }}
      >
        Country
      </motion.label>

      {/* Left icon */}
      <motion.div
        animate={{
          color: hasError
            ? "rgba(248,113,113,0.6)"
            : open
              ? `rgba(${A},0.7)`
              : "rgba(255,255,255,0.2)",
        }}
        transition={{ duration: 0.2 }}
        style={{
          position: "absolute",
          left: "0.8rem",
          top: "26px",
          transform: "translateY(-50%)",
          display: "flex",
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        {isLoading ? (
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            style={{ display: "flex" }}
          >
            <Loader2 size={13} />
          </motion.span>
        ) : (
          <Globe size={13} />
        )}
      </motion.div>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          {/* Custom styled trigger — replaces shadcn Button */}
          <motion.button
            type="button"
            role="combobox"
            disabled={isLoading}
            onMouseEnter={() => setTriggerHovered(true)}
            onMouseLeave={() => setTriggerHovered(false)}
            whileTap={{ scale: 0.995 }}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "1rem 2.4rem 0.55rem 2.4rem",
              background: hasError
                ? "rgba(248,113,113,0.04)"
                : open
                  ? `rgba(${A},0.04)`
                  : triggerHovered
                    ? "rgba(255,255,255,0.03)"
                    : "rgba(255,255,255,0.02)",
              border: `1px solid ${
                hasError
                  ? "rgba(248,113,113,0.5)"
                  : open
                    ? `rgba(${A},0.45)`
                    : triggerHovered
                      ? "rgba(255,255,255,0.12)"
                      : "rgba(255,255,255,0.07)"
              }`,
              borderRadius: open ? "8px 8px 0 0" : "8px",
              color: hasValue ? "#ffffff" : "transparent", // label handles empty state
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.8rem",
              cursor: isLoading ? "not-allowed" : "pointer",
              outline: "none",
              transition:
                "border-color 0.2s, background 0.2s, box-shadow 0.2s, border-radius 0.15s",
              boxShadow: open ? `0 0 0 3px rgba(${A},0.06)` : "none",
              textAlign: "left",
              minHeight: "52px",
              boxSizing: "border-box",
            }}
          >
            {/* Selected value */}
            <AnimatePresence mode="wait">
              {selectedCountry ? (
                <motion.span
                  key={selectedCountry.name}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginTop: "8px", // offset for floating label
                  }}
                >
                  <span style={{ fontSize: "1rem", lineHeight: 1 }}>
                    {selectedCountry.emoji}
                  </span>
                  <span style={{ color: "rgba(255,255,255,0.88)" }}>
                    {selectedCountry.name}
                  </span>
                </motion.span>
              ) : (
                <span key="empty" />
              )}
            </AnimatePresence>

            {/* Chevron */}
            <motion.span
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              style={{
                display: "flex",
                color: open ? `rgba(${A},0.6)` : "rgba(255,255,255,0.2)",
                flexShrink: 0,
                transition: "color 0.2s",
              }}
            >
              <ChevronDown size={14} />
            </motion.span>
          </motion.button>
        </PopoverTrigger>

        {/* Bottom glow line — shows when open */}
        <motion.div
          animate={{ scaleX: open ? 1 : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.22 }}
          style={{
            position: "absolute",
            bottom: 0,
            left: "10%",
            right: "10%",
            height: "1px",
            background: `linear-gradient(90deg, transparent, rgba(${A},0.6), transparent)`,
            transformOrigin: "center",
            borderRadius: "1px",
            pointerEvents: "none",
            zIndex: 5,
          }}
        />

        <PopoverContent
          // Remove shadcn's default styling — take full control
          className="p-0 w-[var(--radix-popover-trigger-width)]"
          style={{
            background: "#0d1014",
            border: `1px solid rgba(${A},0.25)`,
            borderTop: "none",
            borderRadius: "0 0 8px 8px",
            boxShadow: `0 16px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(${A},0.06)`,
            overflow: "hidden",
            padding: 0,
          }}
          sideOffset={0}
        >
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <Command shouldFilter={false}>
              {/* Search input — custom styled */}
              <div
                style={{
                  padding: "0.6rem 0.75rem",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <CommandInput
                  placeholder="Search country…"
                  id={field.name}
                  value={searchValue}
                  onValueChange={setSearchValue}
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.72rem",
                    color: "#ffffff",
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    width: "100%",
                    letterSpacing: "0.04em",
                  }}
                  className={cn(
                    "h-auto py-0 border-none ring-0 focus:ring-0 bg-transparent",
                    "placeholder:text-[rgba(255,255,255,0.2)] text-white font-mono text-xs",
                  )}
                />
              </div>

              <CommandList style={{ maxHeight: "220px" }}>
                <CommandEmpty
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.65rem",
                    color: "rgba(255,255,255,0.25)",
                    padding: "1rem",
                    textAlign: "center",
                    letterSpacing: "0.06em",
                  }}
                >
                  No country found.
                </CommandEmpty>

                <CommandGroup>
                  {filteredCountries?.map((country: Country) => {
                    const isSelected = field.state.value === country.name;
                    return (
                      <CommandItem
                        key={country.iso2}
                        value={country.name}
                        onSelect={() => {
                          field.handleChange(country.name);
                          setCountryCode(country.iso2);
                          setSearchValue("");
                          setOpen(false);
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          padding: "0.5rem 0.75rem",
                          cursor: "pointer",
                          background: isSelected
                            ? `rgba(${A},0.08)`
                            : "transparent",
                          borderBottom: "1px solid rgba(255,255,255,0.03)",
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontSize: "0.72rem",
                          color: isSelected
                            ? `rgba(${A},0.9)`
                            : "rgba(255,255,255,0.55)",
                          transition: "background 0.12s, color 0.12s",
                        }}
                        className="hover:bg-[rgba(255,255,255,0.04)] hover:text-white aria-selected:bg-transparent"
                      >
                        {/* Check mark */}
                        <motion.span
                          animate={{
                            opacity: isSelected ? 1 : 0,
                            scale: isSelected ? 1 : 0.5,
                          }}
                          transition={{ duration: 0.15 }}
                          style={{
                            display: "flex",
                            color: `rgba(${A},0.8)`,
                            flexShrink: 0,
                            width: "14px",
                          }}
                        >
                          <CheckIcon size={12} />
                        </motion.span>

                        {/* Flag + name */}
                        <span
                          style={{
                            fontSize: "1rem",
                            lineHeight: 1,
                            flexShrink: 0,
                          }}
                        >
                          {country.emoji}
                        </span>
                        <span>{country.name}</span>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </motion.div>
        </PopoverContent>
      </Popover>

      {/* Error — animated, consistent with Field component */}
      <AnimatePresence>
        {hasError && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              marginTop: "0.3rem",
              paddingLeft: "0.25rem",
            }}
          >
            <AlertCircle
              size={11}
              style={{ color: "rgba(248,113,113,0.7)", flexShrink: 0 }}
            />
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.57rem",
                color: "rgba(248,113,113,0.7)",
                letterSpacing: "0.04em",
                lineHeight: 1.4,
              }}
            >
              {typeof error === "object"
                ? (error as { message: string })?.message
                : String(error)}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CountrySelect;
