// Refreshes the committed assets from a local checkout of the One Spend app repo:
// the store captures (status bar cropped, converted to WebP), the icon, the feature graphic
// and the privacy policy. Run it after updating any of them in the app, then commit.
//
//   npm run sync -- ../one-spend
import { copyFile, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const app = path.resolve(process.argv[2] ?? "../one-spend");
const site = path.resolve(import.meta.dirname, "..");
const captures = path.join(app, "tool", "store_graphics", "captures");
const outScreens = path.join(site, "public", "screens");
const outBrand = path.join(site, "public", "brand");

const screens = [
  "1-subscriptions", "2-upcoming", "3-trends", "4-categories",
  "5-detail", "6-reminders", "7-currency", "8-backup",
];
// Status bar height on the 1260x2800 captures.
const STATUS_BAR = 120;

await mkdir(outScreens, { recursive: true });
await mkdir(outBrand, { recursive: true });

for (const name of screens) {
  const img = sharp(path.join(captures, `${name}.png`));
  const { width, height } = await img.metadata();
  await img
    .extract({ left: 0, top: STATUS_BAR, width, height: height - STATUS_BAR })
    .resize({ width: 720 })
    .webp({ quality: 86 })
    .toFile(path.join(outScreens, `${name}.webp`));
}

const icon = path.join(app, "store", "play", "icon-512.png");
await sharp(icon).resize(256).png().toFile(path.join(outBrand, "icon.png"));
await sharp(icon).resize(64).png().toFile(path.join(outBrand, "favicon.png"));
await sharp(path.join(app, "store", "play", "feature-graphic.png")).png().toFile(path.join(outBrand, "og.png"));
await copyFile(path.join(app, "docs", "privacy-policy.md"), path.join(site, "content", "privacy-policy.md"));
console.log(`Synced from ${app}`);
