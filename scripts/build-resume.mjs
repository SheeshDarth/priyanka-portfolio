// Builds the résumé PDF from resume/resume.html using the locally installed Chrome.
// Links in the HTML become real, clickable PDF link annotations; text stays selectable (ATS-friendly).
//
//   npm run resume
//
import { chromium } from "@playwright/test";
import { copyFileSync, mkdirSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const html = path.join(root, "resume", "resume.html");
const out = path.join(root, "resume", "Priyanka_H_Resume.pdf");
const site = path.join(root, "public", "downloads", "Priyanka_H_Resume.pdf");

const browser = await chromium.launch({ channel: "chrome" });
try {
  const page = await browser.newPage();
  await page.goto(pathToFileURL(html).href, { waitUntil: "load" });
  await page.pdf({
    path: out,
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
    tagged: true,
    displayHeaderFooter: false,
  });
} finally {
  await browser.close();
}

mkdirSync(path.dirname(site), { recursive: true });
copyFileSync(out, site);
console.log(`Wrote ${path.relative(root, out)} and copied it to ${path.relative(root, site)}`);
