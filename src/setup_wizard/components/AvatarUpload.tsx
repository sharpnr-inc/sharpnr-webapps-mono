import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";

// ─── Avatar Upload ────────────────────────────────────────────────────────────
export function AvatarUpload() {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    const url = URL.createObjectURL(file);
    setPreview(url);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.75rem",
        marginBottom: "0.5rem",
      }}
    >
      <motion.div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          const file = e.dataTransfer.files[0];
          if (file) handleFile(file);
        }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        style={{
          width: "88px",
          height: "88px",
          borderRadius: "50%",
          border: `1px dashed ${dragging ? "#63d6ff" : "rgba(99,214,255,0.3)"}`,
          background: dragging
            ? "rgba(99,214,255,0.08)"
            : "rgba(255,255,255,0.03)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          overflow: "hidden",
          position: "relative",
          transition: "border-color 0.2s, background 0.2s",
          boxShadow: dragging ? "0 0 20px rgba(99,214,255,0.15)" : "none",
        }}
      >
        {preview ? (
          <img
            src={preview}
            alt="avatar"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div style={{ textAlign: "center", color: "rgba(99,214,255,0.5)" }}>
            <Upload size={18} />
          </div>
        )}
      </motion.div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />

      <p
        style={{
          margin: 0,
          fontSize: "0.6rem",
          fontFamily: "'IBM Plex Mono', monospace",
          color: "rgba(255,255,255,0.25)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        Photo (optional)
      </p>
    </div>
  );
}
