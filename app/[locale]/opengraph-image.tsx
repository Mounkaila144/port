import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const alt = "PTR Niger Agency";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const logo = readFileSync(join(process.cwd(), "public/image/ptrniger.png"));
const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

const COPY = {
  en: {
    title: "PTR Niger Agency",
    tagline: "Web systems that ship under West-African operational constraints.",
  },
  fr: {
    title: "PTR Niger Agency",
    tagline: "Des systèmes web qui livrent, sous contraintes ouest-africaines.",
  },
} as const;

export default async function OG({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const copy = locale === "fr" ? COPY.fr : COPY.en;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#0A0E0C",
          padding: 72,
          color: "#F5F7F4",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -160,
            left: -120,
            width: 560,
            height: 560,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(31,184,204,0.45), transparent 70%)",
            filter: "blur(10px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -140,
            right: -160,
            width: 680,
            height: 680,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(232,39,62,0.35), transparent 70%)",
            filter: "blur(10px)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={150} height={98} alt="" />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "auto",
          }}
        >
          <div
            style={{
              fontSize: 84,
              fontWeight: 700,
              letterSpacing: -3,
              lineHeight: 1.02,
              color: "#F5F7F4",
            }}
          >
            {copy.title}
          </div>
          <div
            style={{
              fontSize: 34,
              color: "#C8CFCB",
              marginTop: 20,
              maxWidth: 980,
              lineHeight: 1.2,
            }}
          >
            {copy.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginTop: 44,
          }}
        >
          <div style={{ display: "flex", gap: 8 }}>
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 9999,
                background: "#E8273E",
              }}
            />
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 9999,
                background: "#1FB8CC",
              }}
            />
          </div>
          <div
            style={{
              fontSize: 22,
              color: "#9BA8A2",
              textTransform: "uppercase",
              letterSpacing: 4,
              marginLeft: 6,
            }}
          >
            agency.ptrniger.com
          </div>
        </div>
      </div>
    ),
    size,
  );
}
