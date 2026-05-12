import { cookies } from "next/headers";

export type Theme = "light" | "dark";

export const THEME_COOKIE = "NEXT_THEME";

export async function getServerTheme(): Promise<Theme> {
  const store = await cookies();
  const value = store.get(THEME_COOKIE)?.value;
  return value === "light" ? "light" : "dark";
}
