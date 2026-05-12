import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Read once at module load — Next.js prerenders this image at build time.
const logo = readFileSync(join(process.cwd(), "public/image/ptrniger.png"));
const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0A0E0C",
          borderRadius: 12,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={52} height={34} alt="" />
      </div>
    ),
    size,
  );
}
