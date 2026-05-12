import Image from "next/image";

// Story 1.8 — typed registry of self-hosted DevIcons (FR-NFR5).
// Add new icons by dropping the SVG into public/icons/devicons/ and
// extending this union below.
export const TECH_ICON_NAMES = [
  "html5",
  "css3",
  "php",
  "javascript",
  "typescript",
  "mysql",
  "laravel",
  "symfony",
  "react",
  "nextjs",
  "vuejs",
  "nodejs",
  "bootstrap",
  "tailwindcss",
  "sass",
  "figma",
  "postgresql",
  "mongodb",
  "linux",
  "ubuntu",
  "nginx",
  "apache",
  "gitlab",
  "jenkins",
  "git",
  "docker",
  "phpstorm",
  "webstorm",
  "vscode",
  "github",
] as const;

export type TechIconName = (typeof TECH_ICON_NAMES)[number];

interface TechIconProps {
  name: TechIconName;
  size?: number;
  className?: string;
  alt?: string;
}

export function TechIcon({ name, size = 32, className, alt }: TechIconProps) {
  return (
    <Image
      src={`/icons/devicons/${name}.svg`}
      width={size}
      height={size}
      alt={alt ?? name}
      className={className}
      unoptimized
    />
  );
}
