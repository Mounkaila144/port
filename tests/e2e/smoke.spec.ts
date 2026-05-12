import { test, expect } from "@playwright/test";

test.describe("locale routing & redirects", () => {
  test("/ redirects to /en or /fr by Accept-Language", async ({ request }) => {
    const res = await request.get("/", {
      headers: { "Accept-Language": "fr-FR" },
      maxRedirects: 0,
    });
    expect([301, 302, 307, 308]).toContain(res.status());
    expect(res.headers().location).toMatch(/\/(en|fr)$/);
  });

  test("/en serves with html lang=en", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("/fr serves with html lang=fr", async ({ page }) => {
    await page.goto("/fr");
    await expect(page.locator("html")).toHaveAttribute("lang", "fr");
  });

  test("locale switcher navigates to equivalent route", async ({ page }) => {
    await page.goto("/en/services");
    await page.getByRole("button", { name: /switch to french|passer en français/i }).click();
    await expect(page).toHaveURL(/\/fr\/services/);
    await expect(page.locator("html")).toHaveAttribute("lang", "fr");
  });

  test("hreflang and canonical present on home", async ({ page }) => {
    await page.goto("/en");
    const hreflangs = await page
      .locator('link[rel="alternate"][hreflang]')
      .evaluateAll((nodes) => nodes.map((n) => (n as HTMLLinkElement).hreflang));
    expect(hreflangs).toEqual(expect.arrayContaining(["en", "fr", "x-default"]));
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /agency\.ptrniger|127\.0\.0\.1/);
  });
});

test.describe("public routes", () => {
  for (const path of [
    "/en/work",
    "/fr/realisations",
    "/en/services",
    "/fr/services",
    "/en/about",
    "/fr/a-propos",
    "/en/contact",
    "/fr/contact",
    "/en/privacy",
    "/fr/confidentialite",
    "/en/case-studies/softis-pilates-jp-booking-platform",
    "/fr/etudes-de-cas/softis-pilates-jp-plateforme-reservation",
    "/sitemap.xml",
    "/robots.txt",
  ]) {
    test(`GET ${path}`, async ({ page }) => {
      const res = await page.goto(path);
      expect(res?.ok()).toBeTruthy();
    });
  }
});

test.describe("contact form", () => {
  test("submits a valid brief and shows ack", async ({ page }) => {
    await page.goto("/en/contact?type=audit&utm_source=playwright&utm_campaign=smoke");
    await page.getByLabel(/your name/i).fill("Smoke Tester");
    await page.getByLabel(/work email/i).fill("smoke@example.com");
    await page.getByLabel(/what are you trying to build/i).fill(
      "Smoke test brief that is comfortably long enough to satisfy the minimum 20-character validation rule.",
    );
    await page.getByLabel(/i agree/i).check();
    await page.getByRole("button", { name: /send brief/i }).click();
    await expect(page.getByText(/brief received/i)).toBeVisible({ timeout: 10_000 });
  });

  test("rejects too-short brief with validation error", async ({ page }) => {
    await page.goto("/en/contact");
    await page.getByLabel(/your name/i).fill("Tester");
    await page.getByLabel(/work email/i).fill("tester@example.com");
    await page.getByLabel(/what are you trying to build/i).fill("too short");
    await page.getByLabel(/i agree/i).check();
    await page.getByRole("button", { name: /send brief/i }).click();
    await expect(page.getByText(/please double-check/i)).toBeVisible({ timeout: 10_000 });
  });
});

test.describe("CSP", () => {
  test("home response has Content-Security-Policy header", async ({ request }) => {
    const res = await request.get("/en");
    expect(res.headers()["content-security-policy"]).toMatch(/default-src 'self'/);
  });
});
