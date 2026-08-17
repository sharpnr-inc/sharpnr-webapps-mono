interface AnthropicLoaderProps {
  isDark?: boolean;
}

export default function SharpnrLoader({ isDark = true }: AnthropicLoaderProps) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: isDark
          ? "rgba(10, 10, 46, 0.4)"
          : "rgba(245, 245, 245, 0.4)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        zIndex: 9999,
        overflow: "hidden",
        gap: "40px",
        transition: "background-color 0.3s ease",
      }}
    >
      {/* Circular loader container */}
      <div
        style={{
          position: "relative",
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          backgroundColor: "#0a0a2e",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: isDark
            ? "0 10px 30px rgba(255,255,255,0.1)"
            : "0 10px 30px rgba(0,0,0,0.3)",
        }}
      >
        {/* Spinning ring outside */}
        <div
          style={{
            position: "absolute",
            top: "-8px",
            left: "-8px",
            right: "-8px",
            bottom: "-8px",
            border: "2px solid transparent",
            borderTopColor: isDark ? "rgba(255,255,255,0.6)" : "#1a4d8f",
            borderRightColor: isDark
              ? "rgba(255,255,255,0.3)"
              : "rgba(26,77,143,0.5)",
            borderRadius: "50%",
            animation: "spin 2s linear infinite",
          }}
        />

        {/* Counter-spinning ring */}
        <div
          style={{
            position: "absolute",
            top: "-6px",
            left: "-6px",
            right: "-6px",
            bottom: "-6px",
            border: "1.5px solid transparent",
            borderBottomColor: isDark ? "rgba(255,255,255,0.5)" : "#2563a8",
            borderLeftColor: isDark
              ? "rgba(255,255,255,0.2)"
              : "rgba(37,99,168,0.4)",
            borderRadius: "50%",
            animation: "counterSpin 3s linear infinite",
          }}
        />

        {/* Glowing rings behind triangle */}
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: `${50 + i * 10}px`,
              height: `${50 + i * 10}px`,
              borderRadius: "50%",
              background: `radial-gradient(circle, rgba(255,255,255,${
                0.08 - i * 0.02
              }) 0%, transparent 70%)`,
              animation: `glow 3s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}

        {/* Triangle logo with clean glass cutout */}
        <svg
          width="55"
          height="55"
          viewBox="0 0 200 200"
          style={{ position: "relative", zIndex: 10 }}
        >
          <defs>
            {/* Clean cutout mask with no shared edges */}
            <mask id="trapezoidMask">
              <path
                d="
                  M 100 40 
                  L 160 161 
                  L 40 161 
                  Z
                  M 85 150 
                  L 115 150 
                  L 120 159 
                  L 80 159 
                  Z
                "
                fill="white"
                fillRule="evenodd"
              />
            </mask>

            {/* Glass blur filter */}
            <filter id="glass">
              <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
              <feOffset dx="0" dy="2" result="offsetblur" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.3" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g
            style={{
              transformOrigin: "center",
              animation: "pulse 2s ease-in-out infinite",
            }}
          >
            {/* Main filled triangle with transparent cutout */}
            <path
              d="M 100 40 L 160 161 L 40 161 Z"
              fill="white"
              mask="url(#trapezoidMask)"
              filter="url(#glass)"
            />
          </g>
        </svg>
      </div>

      <p className="text-black">Fetching Policies...</p>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.7; }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes counterSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }

        @keyframes glow {
          0%, 100% { transform: scale(0.8); opacity: 0.3; }
          50% { transform: scale(1.2); opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}
