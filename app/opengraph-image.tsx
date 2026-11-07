import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Free Nusuk Referral Codes - NusukKey";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          background: "linear-gradient(135deg, #072412 0%, #0d3b1f 50%, #14532D 100%)",
          padding: "60px 72px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "480px",
            height: "480px",
            opacity: 0.08,
            border: "80px solid white",
            borderRadius: "50%",
            transform: "translate(140px, -140px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "80px",
            right: "200px",
            width: "280px",
            height: "280px",
            opacity: 0.06,
            border: "50px solid white",
            borderRadius: "50%",
          }}
        />

        {/* Brand badge */}
        <div
          style={{
            position: "absolute",
            top: "52px",
            left: "72px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "10px",
              background: "rgba(255,255,255,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
            }}
          >
            🗝️
          </div>
          <span
            style={{
              color: "rgba(255,255,255,0.9)",
              fontSize: "24px",
              fontWeight: "700",
              letterSpacing: "-0.5px",
            }}
          >
            NusukKey
          </span>
        </div>

        {/* Main heading */}
        <h1
          style={{
            color: "white",
            fontSize: "68px",
            fontWeight: "800",
            lineHeight: "1.08",
            letterSpacing: "-2px",
            margin: "0 0 20px 0",
            maxWidth: "760px",
          }}
        >
          Free Nusuk
          <br />
          Referral Codes
        </h1>

        {/* Subtitle */}
        <p
          style={{
            color: "rgba(167, 243, 208, 0.9)",
            fontSize: "28px",
            fontWeight: "400",
            margin: "0 0 40px 0",
            maxWidth: "680px",
            lineHeight: "1.4",
          }}
        >
          Fair rotation · Instant copy · EN / AR · Community-run
        </p>

        {/* Stats pills */}
        <div style={{ display: "flex", gap: "16px" }}>
          <div
            style={{
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "12px",
              padding: "12px 24px",
              color: "white",
              fontSize: "18px",
              fontWeight: "600",
            }}
          >
            🌐 nusuk-keys.vercel.app
          </div>
          <div
            style={{
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "12px",
              padding: "12px 24px",
              color: "rgba(167, 243, 208, 0.95)",
              fontSize: "18px",
              fontWeight: "600",
            }}
          >
            Nusuk Free Umrah Competition
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
