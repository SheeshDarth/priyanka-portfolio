import { test } from "@playwright/test";

const pages: [string, string][] = [
  ["home", "/"],
  ["work", "/work"],
  ["coorg", "/work/coorg-coffee-crafted"],
  ["campaignos", "/work/campaignos"],
  ["verifarm", "/work/verifarm"],
  ["about", "/about"],
  ["contact", "/contact"],
  ["404", "/nope"],
];
const sizes = [
  { tag: "mobile-390", width: 390, height: 844 },
  { tag: "desktop-1440", width: 1440, height: 900 },
];

for (const [name, path] of pages) {
  for (const s of sizes) {
    test(`shot ${name} ${s.tag}`, async ({ page }) => {
      await page.setViewportSize({ width: s.width, height: s.height });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(path);
      await page.waitForTimeout(400);
      await page.screenshot({ path: `docs/qa/${name}-${s.tag}.png`, fullPage: true });
    });
  }
}
