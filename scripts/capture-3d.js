const puppeteer = require("puppeteer");
const path = require("path");

async function capture() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--enable-webgl"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 960, deviceScaleFactor: 2 });

  page.on("console", (msg) => console.log("PAGE CONSOLE:", msg.type(), msg.text()));
  page.on("pageerror", (err) => console.log("PAGE ERROR:", err.message, err.stack));

  console.log("Navigating to http://localhost:3000/ ...");
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle0", timeout: 30000 });

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const outPath = path.resolve(
    "C:/Users/sanja/.gemini/antigravity/brain/f3abf111-c8ff-44a2-93ee-16d63512456d/live-preview-3d-model.png"
  );

  await page.screenshot({ path: outPath, clip: { x: 0, y: 0, width: 1440, height: 850 } });
  console.log("Screenshot saved to:", outPath);

  await browser.close();
}

capture().catch((err) => {
  console.error("Capture error:", err);
  process.exit(1);
});
