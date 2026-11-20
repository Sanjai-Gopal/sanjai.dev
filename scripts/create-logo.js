const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// 1. High-resolution master SVG for Favicons & App Icons (512x512)
const masterSquircleSvg = `<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Obsidian Dark Background with rounded squircle -->
  <rect width="512" height="512" rx="120" fill="#09090b"/>
  <rect x="2" y="2" width="508" height="508" rx="118" stroke="rgba(255,255,255,0.12)" stroke-width="4"/>
  
  <defs>
    <linearGradient id="monogramGrad" x1="120" y1="110" x2="390" y2="400" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#d4d4d8"/>
    </linearGradient>
    <linearGradient id="emeraldGlow" x1="330" y1="120" x2="380" y2="170" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#34d399"/>
      <stop offset="100%" stop-color="#10b981"/>
    </linearGradient>
    <filter id="subtleShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="6" stdDeviation="12" flood-color="#000000" flood-opacity="0.4"/>
    </filter>
  </defs>

  <!-- Architectural S Monogram Geometry -->
  <g filter="url(#subtleShadow)">
    <path
      d="M366 160H200C164.654 160 136 188.654 136 224C136 259.346 164.654 288 200 288H312C347.346 288 376 316.654 376 352C376 387.346 347.346 416 312 416H146"
      stroke="url(#monogramGrad)"
      stroke-width="46"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <!-- Emerald Intelligence Node (Representing AI/Systems) -->
    <circle cx="366" cy="160" r="15" fill="url(#emeraldGlow)"/>
  </g>
</svg>`;

// 2. Inline Transparent Monogram SVG (for navbar and component icons)
const inlineMonogramSvg = `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path
    d="M23.5 9H12.5C10.0147 9 8 11.0147 8 13.5C8 15.9853 10.0147 18 12.5 18H19.5C21.9853 18 24 20.0147 24 22.5C24 24.9853 21.9853 27 19.5 27H8.5"
    stroke="currentColor"
    stroke-width="3"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <circle cx="23.5" cy="9" r="1.5" fill="#10b981" />
</svg>`;

async function main() {
  const root = path.resolve(__dirname, '..');
  const publicDir = path.join(root, 'public');
  const appDir = path.join(root, 'src', 'app');
  
  // Write SVG files
  fs.writeFileSync(path.join(publicDir, 'sanjai-logo.svg'), masterSquircleSvg);
  fs.writeFileSync(path.join(appDir, 'icon.svg'), masterSquircleSvg);
  
  // Generate PNG icons using sharp
  const svgBuffer = Buffer.from(masterSquircleSvg);
  
  // 192x192 favicon (for Google Search and modern browsers)
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'sanjai-favicon.png'));
  console.log('Generated sanjai-favicon.png (192x192)');
  
  // 180x180 apple touch icon
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('Generated apple-touch-icon.png (180x180)');
  
  // 32x32 favicon
  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, 'favicon-32x32.png'));
  console.log('Generated favicon-32x32.png (32x32)');

  // 48x48 Google search desktop icon
  await sharp(svgBuffer)
    .resize(48, 48)
    .png()
    .toFile(path.join(publicDir, 'favicon-48x48.png'));
  console.log('Generated favicon-48x48.png (48x48)');
  
  // 512x512 PWA / web app icon
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'sanjai-icon-512.png'));
  console.log('Generated sanjai-icon-512.png (512x512)');
}

main().catch(console.error);
