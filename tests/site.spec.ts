import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = [
  "/",
  "/work",
  "/work/coorg-coffee-crafted",
  "/work/campaignos",
  "/work/verifarm",
  "/about",
  "/contact",
];
const widths = [320, 375, 390, 768, 1024, 1440, 1920];

for (const route of routes) {
  test.describe(route, () => {
    test("renders with one h1 and no console errors", async ({ page }) => {
      const errors: string[] = [];
      page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
      page.on("pageerror", (e) => errors.push(e.message));
      const res = await page.goto(route);
      expect(res?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      expect(errors).toEqual([]);
    });

    test("no horizontal scroll at any target width", async ({ page }) => {
      for (const w of widths) {
        await page.setViewportSize({ width: w, height: 900 });
        await page.goto(route);
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        );
        expect(overflow, `overflow at ${w}px on ${route}`).toBeLessThanOrEqual(0);
      }
    });

    test("axe: no serious or critical violations", async ({ page }) => {
      // Reduced motion so scroll-reveal opacity cannot skew contrast readings.
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(route);
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag22aa"]).analyze();
      const bad = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
      expect(bad.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(" | ")}`)).toEqual([]);
    });

    test("no dead or placeholder links; no private contact data", async ({ page }) => {
      await page.goto(route);
      const hrefs = await page.locator("a[href]").evaluateAll((as) => as.map((a) => a.getAttribute("href") ?? ""));
      for (const h of hrefs) {
        expect(h).not.toBe("#");
        expect(h).not.toMatch(/example\.com|ngrok/);
      }
      const html = await page.content();
      expect(html).not.toMatch(/9113618517|priyankah7468@gmail|mailto:|tel:/);
    });
  });
}

test("internal links all resolve", async ({ page, request }) => {
  const seen = new Set<string>();
  for (const route of routes) {
    await page.goto(route);
    const hrefs = await page
      .locator("a[href^='/']")
      .evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).getAttribute("href") ?? ""));
    hrefs.forEach((h) => seen.add(h.split("#")[0] || "/"));
  }
  for (const h of seen) {
    const res = await request.get(h);
    expect(res.status(), h).toBe(200);
  }
});

test("unknown route shows the custom 404", async ({ page }) => {
  const res = await page.goto("/nope");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Off the route");
});

test("journey rail: anchors work by keyboard on desktop", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const link = page.getByRole("navigation", { name: "Page sections" }).getByRole("link", { name: /Experience/ });
  await link.focus();
  await page.keyboard.press("Enter");
  await expect.poll(() => page.evaluate(() => document.getElementById("experience")!.getBoundingClientRect().top)).toBeLessThan(200);
  await expect(link).toHaveAttribute("aria-current", "location");
});

test("reduced motion: trajectory is fully drawn immediately", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const offset = await page.locator("path.trajectory").evaluate((el) => getComputedStyle(el).strokeDashoffset);
  expect(parseFloat(offset)).toBe(0);
});

test("Rev the ride guide: opens, shows a stop, rides to the next stop and across pages", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");
  const bike = page.getByRole("button", { name: /ride guide/i });
  await expect(bike).toBeVisible();
  await bike.click();
  const panel = page.getByRole("region", { name: "Ride guide" });
  await expect(panel).toContainText("Stop 1 of");
  await panel.getByRole("button", { name: /^Next:/ }).click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(300);
  await page.keyboard.press("Escape");
  await expect(panel).toHaveCount(0);
  // From the last stop of /contact the guide offers the start; from /about it moves on to Contact.
  await page.goto("/about");
  await page.getByRole("button", { name: /ride guide/i }).click();
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  const toContact = page.getByRole("region", { name: "Ride guide" }).getByRole("button", { name: /^Ride to Contact/ });
  await expect(toContact).toBeVisible();
  await toContact.click();
  await expect(page).toHaveURL(/\/contact$/);
});

test("Rev is present on every route and works on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  for (const route of routes) {
    await page.goto(route);
    await expect(page.getByRole("button", { name: /ride guide/i })).toBeVisible();
  }
});

test("résumé download link works", async ({ page, request }) => {
  await page.goto("/");
  const link = page.locator("main a[download]").first();
  await expect(link).toHaveAttribute("href", "/downloads/Priyanka_H_Resume.pdf");
  const res = await request.get("/downloads/Priyanka_H_Resume.pdf");
  expect(res.status()).toBe(200);
  expect(res.headers()["content-type"]).toContain("pdf");
});

test("Coorg case study: live site, repo, screenshots and code excerpt", async ({ page }) => {
  await page.goto("/work/coorg-coffee-crafted");
  await expect(page.locator("main a[href='https://coorgcoffees.in/']").first()).toBeVisible();
  await expect(page.locator("main a[href='https://github.com/coorgcoffee01/coorgcoffee']").first()).toBeVisible();
  const shots = page.locator("section[aria-labelledby='screens'] img");
  await expect(shots).toHaveCount(3);
  for (const img of await shots.all()) {
    expect(await img.getAttribute("alt")).toBeTruthy();
    await img.scrollIntoViewIfNeeded(); // below-the-fold images are lazy-loaded
    await expect
      .poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0))
      .toBe(true);
  }
  await expect(page.locator("pre code")).toContainText("createHmac('sha256'");
  await expect(page.locator("pre code")).not.toContainText(/rzp_|secret_[a-z0-9]{6,}/i);
});

test("CampaignOS is overview-only: no internal details anywhere on the site", async ({ page }) => {
  await page.goto("/work/campaignos");
  await expect(page.locator("#overview")).toBeVisible();
  for (const id of ["architecture", "decisions", "context", "contribution", "outcome", "screens"]) {
    await expect(page.locator(`#${id}`)).toHaveCount(0);
  }
  for (const route of routes) {
    await page.goto(route);
    const text = await page.locator("body").innerText();
    expect(text, route).not.toMatch(/SICOS|KiddyPi|FastMCP|Meta Graph|LiteLLM|OpenRouter|Instagram|Groq|WCAG 7\.5/i);
  }
});

test("only approved external links are rendered", async ({ page }) => {
  await page.goto("/work/campaignos");
  await expect(page.locator("main a[target=_blank]")).toHaveCount(0); // no approved public CampaignOS link yet
  await page.goto("/work/coorg-coffee-crafted");
  await expect(page.locator("a[href='https://coorgcoffees.in/']").first()).toBeVisible();
});
