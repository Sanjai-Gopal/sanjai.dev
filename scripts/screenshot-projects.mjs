import puppeteer from "puppeteer";
import path from "path";
import fs from "fs";

const OUT_DIR = "C:/Users/sanja/.gemini/antigravity/scratch/sanjai.dev/public/projects";

// All projects with their live URLs for screenshotting
const liveProjects = [
  { name: "carenest", url: "https://catalyst-hackathon-lime.vercel.app", wait: 3000 },
  { name: "swasthya-sathi", url: "https://swasthya-sathi-ai-one.vercel.app", wait: 3000 },
  { name: "aqi24", url: "https://aqi-24.vercel.app/", wait: 4000 },
  { name: "algoshelf", url: "https://algo-shelf.vercel.app", wait: 3000 },
  { name: "tattoo-studio", url: "https://tattoo-sooty.vercel.app/", wait: 3000 },
  { name: "dimsee", url: "https://www.npmjs.com/package/dimsee", wait: 3000 },
];

async function main() {
  console.log("Launching browser...");
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: { width: 1920, height: 1080 },
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
  });

  for (const project of liveProjects) {
    const outFile = path.join(OUT_DIR, `${project.name}.png`);
    console.log(`Screenshotting ${project.name} from ${project.url}...`);
    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 1920, height: 1080 });
      await page.goto(project.url, { waitUntil: "networkidle2", timeout: 30000 });
      await new Promise((r) => setTimeout(r, project.wait));
      await page.screenshot({ path: outFile, type: "png", fullPage: false });
      console.log(`  ✓ Saved ${project.name}.png (${fs.statSync(outFile).size} bytes)`);
      await page.close();
    } catch (err) {
      console.error(`  ✗ Failed ${project.name}: ${err.message}`);
    }
  }

  await browser.close();
  console.log("\nDone! All screenshots captured.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
