import sharp from "sharp";
import fs from "fs";
import path from "path";

const OUT_DIR = "C:/Users/sanja/.gemini/antigravity/scratch/sanjai.dev/public/projects";

// Helper to render SVG to 1280x720 PNG
async function renderSvgToPng(svgString, filename) {
  const dest = path.join(OUT_DIR, filename);
  await sharp(Buffer.from(svgString))
    .resize(1280, 720)
    .png({ quality: 95 })
    .toFile(dest);
  console.log(`Rendered ${filename}`);
}

async function main() {
  // 1. CareNest AI: crop top of dashboard-dark
  const carenestSrc = "C:/Users/sanja/Downloads/catalyst-hackathon/dist/assets/dashboard-dark-XXx_X8s4.png";
  if (fs.existsSync(carenestSrc)) {
    await sharp(carenestSrc)
      .extract({ left: 0, top: 0, width: 1818, height: 1022 }) // 16:9 crop
      .resize(1280, 720)
      .png({ quality: 95 })
      .toFile(path.join(OUT_DIR, "carenest.png"));
    console.log("Processed carenest.png");
  }

  // 2. Swasthya Sathi AI: from thumbnail.png
  const swasthyaSrc = "C:/Users/sanja/Downloads/Swasthya-Sathi-AI/assets/thumbnail.png";
  if (fs.existsSync(swasthyaSrc)) {
    await sharp(swasthyaSrc)
      .resize(1280, 720, { fit: "cover" })
      .png({ quality: 95 })
      .toFile(path.join(OUT_DIR, "swasthya-sathi.png"));
    console.log("Processed swasthya-sathi.png");
  }

  // 3. Quizza: from shot_quiz.png
  const quizzaSrc = "C:/Users/sanja/Downloads/shot_quiz.png";
  if (fs.existsSync(quizzaSrc)) {
    await sharp(quizzaSrc)
      .resize(1280, 720, { fit: "cover" })
      .png({ quality: 95 })
      .toFile(path.join(OUT_DIR, "quizza.png"));
    console.log("Processed quizza.png");
  }

  // 4. pipOS: from og-preview.png
  const piposSrc = "C:/Users/sanja/Downloads/pipOS/assets/og-preview.png";
  if (fs.existsSync(piposSrc)) {
    await sharp(piposSrc)
      .resize(1280, 720, { fit: "cover" })
      .png({ quality: 95 })
      .toFile(path.join(OUT_DIR, "pipos.png"));
    console.log("Processed pipos.png");
  }

  // 5. Forge: from forge.png
  const forgeSrc = path.join(OUT_DIR, "forge.png");
  if (fs.existsSync(forgeSrc)) {
    const tmp = path.join(OUT_DIR, "forge_tmp.png");
    await sharp(forgeSrc)
      .resize(1280, 720, { fit: "cover" })
      .png({ quality: 95 })
      .toFile(tmp);
    fs.renameSync(tmp, forgeSrc);
    console.log("Processed forge.png");
  }

  // 6. NovaPulse AI - Observability SaaS Mockup
  await renderSvgToPng(`
    <svg width="1280" height="720" viewBox="0 0 1280 720" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1280" y2="720" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#0a0c14" />
          <stop offset="50%" stop-color="#0f1424" />
          <stop offset="100%" stop-color="#07090e" />
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.25" />
          <stop offset="100%" stop-color="#3b82f6" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="1280" height="720" fill="url(#bg)" />
      <rect width="1280" height="720" fill="url(#glow)" />
      
      <!-- Window Frame -->
      <g transform="translate(64, 44)">
        <rect width="1152" height="632" rx="16" fill="#111625" stroke="#252f4a" stroke-width="2" />
        <!-- Window Header -->
        <rect width="1152" height="48" rx="16" fill="#0d111c" />
        <path d="M0 32 h1152 v16 h-1152 z" fill="#0d111c" />
        <circle cx="28" cy="24" r="6" fill="#ef4444" />
        <circle cx="48" cy="24" r="6" fill="#f59e0b" />
        <circle cx="68" cy="24" r="6" fill="#10b981" />
        <text x="576" y="29" fill="#94a3b8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="500" text-anchor="middle">NovaPulse AI — Distributed OpenTelemetry Observability Platform</text>
        
        <!-- Sidebar -->
        <rect x="0" y="48" width="220" height="584" fill="#090d16" />
        <line x1="220" y1="48" x2="220" y2="632" stroke="#1f293d" stroke-width="1" />
        
        <text x="24" y="90" fill="#38bdf8" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="15" font-weight="700">NOVAPULSE</text>
        <rect x="16" y="112" width="188" height="36" rx="8" fill="#1e293b" />
        <text x="48" y="135" fill="#f8fafc" font-family="sans-serif" font-size="13" font-weight="600">📊 Live Metrics</text>
        <text x="48" y="175" fill="#94a3b8" font-family="sans-serif" font-size="13">⚡ Distributed Traces</text>
        <text x="48" y="215" fill="#94a3b8" font-family="sans-serif" font-size="13">🛡️ Error Analytics</text>
        <text x="48" y="255" fill="#94a3b8" font-family="sans-serif" font-size="13">🔔 Alerts &amp; SLAs</text>
        <text x="48" y="295" fill="#94a3b8" font-family="sans-serif" font-size="13">⚙️ OTel Collectors</text>

        <!-- Main Dashboard View -->
        <!-- Stats Cards -->
        <g transform="translate(244, 72)">
          <rect width="200" height="96" rx="10" fill="#161e31" stroke="#2a3853" stroke-width="1" />
          <text x="16" y="32" fill="#94a3b8" font-family="sans-serif" font-size="12">P99 LATENCY</text>
          <text x="16" y="68" fill="#38bdf8" font-family="sans-serif" font-size="28" font-weight="700">18.4 ms</text>
          <text x="16" y="86" fill="#34d399" font-family="sans-serif" font-size="11">↓ 14% vs last hr</text>
        </g>
        <g transform="translate(460, 72)">
          <rect width="200" height="96" rx="10" fill="#161e31" stroke="#2a3853" stroke-width="1" />
          <text x="16" y="32" fill="#94a3b8" font-family="sans-serif" font-size="12">UPTIME SLA</text>
          <text x="16" y="68" fill="#10b981" font-family="sans-serif" font-size="28" font-weight="700">99.98%</text>
          <text x="16" y="86" fill="#34d399" font-family="sans-serif" font-size="11">● Active Monitoring</text>
        </g>
        <g transform="translate(676, 72)">
          <rect width="200" height="96" rx="10" fill="#161e31" stroke="#2a3853" stroke-width="1" />
          <text x="16" y="32" fill="#94a3b8" font-family="sans-serif" font-size="12">THROUGHPUT</text>
          <text x="16" y="68" fill="#a855f7" font-family="sans-serif" font-size="28" font-weight="700">4,280 rps</text>
          <text x="16" y="86" fill="#a855f7" font-family="sans-serif" font-size="11">32 edge clusters</text>
        </g>

        <!-- Traces Waterfall Area -->
        <g transform="translate(244, 188)">
          <rect width="880" height="420" rx="12" fill="#131929" stroke="#25324b" stroke-width="1" />
          <text x="24" y="36" fill="#f8fafc" font-family="sans-serif" font-size="16" font-weight="600">Active Span Traces — OpenTelemetry OTLP</text>
          <line x1="24" y1="52" x2="856" y2="52" stroke="#1f2c42" />
          
          <!-- Trace Rows -->
          <!-- Row 1 -->
          <rect x="24" y="68" width="832" height="48" rx="8" fill="#1a2238" />
          <circle cx="44" cy="92" r="4" fill="#10b981" />
          <text x="60" y="96" fill="#38bdf8" font-family="monospace" font-size="13">GET /api/v1/auth/session</text>
          <text x="320" y="96" fill="#94a3b8" font-family="sans-serif" font-size="12">Next.js Edge</text>
          <rect x="440" y="84" width="220" height="16" rx="4" fill="#3b82f6" fill-opacity="0.3" />
          <rect x="440" y="84" width="60" height="16" rx="4" fill="#38bdf8" />
          <text x="760" y="96" fill="#34d399" font-family="monospace" font-size="12">14.2 ms (200)</text>

          <!-- Row 2 -->
          <rect x="24" y="126" width="832" height="48" rx="8" fill="#182033" />
          <circle cx="44" cy="150" r="4" fill="#10b981" />
          <text x="60" y="154" fill="#38bdf8" font-family="monospace" font-size="13">POST /api/telemetry/ingest</text>
          <text x="320" y="154" fill="#94a3b8" font-family="sans-serif" font-size="12">OTel Ingestion</text>
          <rect x="440" y="142" width="280" height="16" rx="4" fill="#a855f7" fill-opacity="0.3" />
          <rect x="440" y="142" width="110" height="16" rx="4" fill="#a855f7" />
          <text x="760" y="154" fill="#34d399" font-family="monospace" font-size="12">26.1 ms (201)</text>

          <!-- Row 3 -->
          <rect x="24" y="184" width="832" height="48" rx="8" fill="#1a2238" />
          <circle cx="44" cy="208" r="4" fill="#10b981" />
          <text x="60" y="212" fill="#38bdf8" font-family="monospace" font-size="13">QUERY supabase.rpc("aggregate")</text>
          <text x="320" y="212" fill="#94a3b8" font-family="sans-serif" font-size="12">PostgreSQL</text>
          <rect x="440" y="200" width="310" height="16" rx="4" fill="#10b981" fill-opacity="0.3" />
          <rect x="440" y="200" width="90" height="16" rx="4" fill="#10b981" />
          <text x="760" y="212" fill="#34d399" font-family="monospace" font-size="12">8.9 ms (OK)</text>

          <!-- Row 4 -->
          <rect x="24" y="242" width="832" height="48" rx="8" fill="#182033" />
          <circle cx="44" cy="266" r="4" fill="#10b981" />
          <text x="60" y="270" fill="#38bdf8" font-family="monospace" font-size="13">GET /api/v1/metrics/timeseries</text>
          <text x="320" y="270" fill="#94a3b8" font-family="sans-serif" font-size="12">TimescaleDB</text>
          <rect x="440" y="258" width="240" height="16" rx="4" fill="#f59e0b" fill-opacity="0.3" />
          <rect x="440" y="258" width="130" height="16" rx="4" fill="#f59e0b" />
          <text x="760" y="270" fill="#34d399" font-family="monospace" font-size="12">31.4 ms (200)</text>

          <!-- Row 5 -->
          <rect x="24" y="300" width="832" height="48" rx="8" fill="#1a2238" />
          <circle cx="44" cy="324" r="4" fill="#10b981" />
          <text x="60" y="328" fill="#38bdf8" font-family="monospace" font-size="13">POST /v1/alerts/webhook</text>
          <text x="320" y="328" fill="#94a3b8" font-family="sans-serif" font-size="12">Slack Dispatcher</text>
          <rect x="440" y="316" width="180" height="16" rx="4" fill="#ec4899" fill-opacity="0.3" />
          <rect x="440" y="316" width="70" height="16" rx="4" fill="#ec4899" />
          <text x="760" y="328" fill="#34d399" font-family="monospace" font-size="12">18.0 ms (200)</text>
        </g>
      </g>
    </svg>
  `, "novapulse.png");

  // 7. AlgoShelf - DSA Library & Tree Visualizer Mockup
  await renderSvgToPng(`
    <svg width="1280" height="720" viewBox="0 0 1280 720" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="as-bg" x1="0" y1="0" x2="1280" y2="720" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#0b1329" />
          <stop offset="100%" stop-color="#050a18" />
        </linearGradient>
        <radialGradient id="as-glow" cx="60%" cy="40%" r="50%">
          <stop offset="0%" stop-color="#6366f1" stop-opacity="0.3" />
          <stop offset="100%" stop-color="#6366f1" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="1280" height="720" fill="url(#as-bg)" />
      <rect width="1280" height="720" fill="url(#as-glow)" />

      <!-- Window Frame -->
      <g transform="translate(64, 44)">
        <rect width="1152" height="632" rx="16" fill="#0f172a" stroke="#312e81" stroke-width="2" />
        <rect width="1152" height="48" rx="16" fill="#090d16" />
        <path d="M0 32 h1152 v16 h-1152 z" fill="#090d16" />
        <circle cx="28" cy="24" r="6" fill="#ef4444" />
        <circle cx="48" cy="24" r="6" fill="#f59e0b" />
        <circle cx="68" cy="24" r="6" fill="#10b981" />
        <text x="576" y="29" fill="#a5b4fc" font-family="-apple-system, sans-serif" font-size="13" font-weight="500" text-anchor="middle">AlgoShelf — Interactive Data Structures &amp; Algorithms Workbench</text>

        <!-- Left Nav Panel -->
        <rect x="0" y="48" width="240" height="584" fill="#090e1d" />
        <line x1="240" y1="48" x2="240" y2="632" stroke="#1e293b" />
        <text x="24" y="90" fill="#818cf8" font-family="sans-serif" font-size="15" font-weight="700">ALGOSHELF.DEV</text>
        
        <rect x="16" y="112" width="208" height="34" rx="6" fill="#1e1b4b" />
        <text x="32" y="134" fill="#e0e7ff" font-family="sans-serif" font-size="13" font-weight="600">🌲 Red-Black Balanced Tree</text>
        <text x="32" y="174" fill="#94a3b8" font-family="sans-serif" font-size="13">🕸️ Dijkstra's Shortest Path</text>
        <text x="32" y="214" fill="#94a3b8" font-family="sans-serif" font-size="13">⚡ LRU Cache Mechanics</text>
        <text x="32" y="254" fill="#94a3b8" font-family="sans-serif" font-size="13">📊 Dynamic Programming</text>
        <text x="32" y="294" fill="#94a3b8" font-family="sans-serif" font-size="13">🧮 Fast Fourier Transform</text>

        <!-- Visual Canvas Area -->
        <g transform="translate(260, 72)">
          <!-- Top Bar -->
          <rect width="868" height="52" rx="8" fill="#1e293b" />
          <text x="20" y="32" fill="#f8fafc" font-family="sans-serif" font-size="15" font-weight="600">Active Visualization: Self-Balancing Red-Black Search Tree</text>
          <rect x="580" y="12" width="120" height="28" rx="6" fill="#312e81" />
          <text x="640" y="30" fill="#c7d2fe" font-family="monospace" font-size="12" text-anchor="middle">O(log n) Time</text>
          <rect x="716" y="12" width="136" height="28" rx="6" fill="#065f46" />
          <text x="784" y="30" fill="#6ee7b7" font-family="monospace" font-size="12" text-anchor="middle">Balanced State</text>

          <!-- Tree Visualizer Graphic -->
          <g transform="translate(60, 90)">
            <!-- Root (50) -->
            <line x1="380" y1="40" x2="220" y2="120" stroke="#6366f1" stroke-width="3" />
            <line x1="380" y1="40" x2="540" y2="120" stroke="#6366f1" stroke-width="3" />
            <circle cx="380" cy="40" r="28" fill="#1e1b4b" stroke="#818cf8" stroke-width="3" />
            <text x="380" y="46" fill="#ffffff" font-family="monospace" font-size="16" font-weight="700" text-anchor="middle">50</text>

            <!-- Level 1 (25, 75) -->
            <line x1="220" y1="120" x2="130" y2="200" stroke="#6366f1" stroke-width="2" />
            <line x1="220" y1="120" x2="310" y2="200" stroke="#6366f1" stroke-width="2" />
            <circle cx="220" cy="120" r="24" fill="#ef4444" stroke="#fca5a5" stroke-width="2" />
            <text x="220" y="126" fill="#ffffff" font-family="monospace" font-size="14" font-weight="700" text-anchor="middle">25</text>

            <line x1="540" y1="120" x2="450" y2="200" stroke="#6366f1" stroke-width="2" />
            <line x1="540" y1="120" x2="630" y2="200" stroke="#6366f1" stroke-width="2" />
            <circle cx="540" cy="120" r="24" fill="#0f172a" stroke="#818cf8" stroke-width="2" />
            <text x="540" y="126" fill="#ffffff" font-family="monospace" font-size="14" font-weight="700" text-anchor="middle">75</text>

            <!-- Level 2 (10, 35, 60, 90) -->
            <circle cx="130" cy="200" r="20" fill="#0f172a" stroke="#818cf8" stroke-width="2" />
            <text x="130" y="205" fill="#ffffff" font-family="monospace" font-size="13" font-weight="700" text-anchor="middle">10</text>

            <circle cx="310" cy="200" r="20" fill="#0f172a" stroke="#818cf8" stroke-width="2" />
            <text x="310" y="205" fill="#ffffff" font-family="monospace" font-size="13" font-weight="700" text-anchor="middle">35</text>

            <circle cx="450" cy="200" r="20" fill="#ef4444" stroke="#fca5a5" stroke-width="2" />
            <text x="450" y="205" fill="#ffffff" font-family="monospace" font-size="13" font-weight="700" text-anchor="middle">60</text>

            <circle cx="630" cy="200" r="20" fill="#ef4444" stroke="#fca5a5" stroke-width="2" />
            <text x="630" y="205" fill="#ffffff" font-family="monospace" font-size="13" font-weight="700" text-anchor="middle">90</text>
          </g>

          <!-- Array state bar below -->
          <g transform="translate(40, 360)">
            <rect width="788" height="68" rx="8" fill="#131b2e" stroke="#253556" stroke-width="1" />
            <text x="24" y="28" fill="#94a3b8" font-family="sans-serif" font-size="12">IN-ORDER TRAVERSAL (SORTED STREAM)</text>
            <text x="24" y="52" fill="#38bdf8" font-family="monospace" font-size="16" font-weight="700">[ 10, 25, 35, 50, 60, 75, 90 ] — Zero Inversion Violations</text>
          </g>
        </g>
      </g>
    </svg>
  `, "algoshelf.png");

  // 8. ComplyAI - BIS Smart Consumer AI Hackathon 3rd Prize Project
  await renderSvgToPng(`
    <svg width="1280" height="720" viewBox="0 0 1280 720" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="comply-bg" x1="0" y1="0" x2="1280" y2="720" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#0a121e" />
          <stop offset="100%" stop-color="#050a11" />
        </linearGradient>
        <radialGradient id="comply-glow" cx="50%" cy="30%" r="50%">
          <stop offset="0%" stop-color="#10b981" stop-opacity="0.2" />
          <stop offset="100%" stop-color="#10b981" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="1280" height="720" fill="url(#comply-bg)" />
      <rect width="1280" height="720" fill="url(#comply-glow)" />

      <!-- Window Frame -->
      <g transform="translate(64, 44)">
        <rect width="1152" height="632" rx="16" fill="#0d1522" stroke="#1e2e42" stroke-width="2" />
        <rect width="1152" height="48" rx="16" fill="#080e18" />
        <path d="M0 32 h1152 v16 h-1152 z" fill="#080e18" />
        <circle cx="28" cy="24" r="6" fill="#ef4444" />
        <circle cx="48" cy="24" r="6" fill="#f59e0b" />
        <circle cx="68" cy="24" r="6" fill="#10b981" />
        <text x="576" y="29" fill="#94a3b8" font-family="-apple-system, sans-serif" font-size="13" font-weight="500" text-anchor="middle">ComplyAI — Bureau of Indian Standards (BIS) Smart Consumer Verification Platform</text>

        <!-- Main Banner -->
        <g transform="translate(48, 68)">
          <rect width="1056" height="84" rx="12" fill="#132236" stroke="#10b981" stroke-width="1.5" />
          <circle cx="48" cy="42" r="22" fill="#064e3b" stroke="#10b981" stroke-width="2" />
          <text x="48" y="48" fill="#34d399" font-family="sans-serif" font-size="20" font-weight="bold" text-anchor="middle">✓</text>
          <text x="86" y="36" fill="#f8fafc" font-family="sans-serif" font-size="18" font-weight="700">BIS ISI Mark &amp; Hallmark Authentic Verification System</text>
          <text x="86" y="60" fill="#94a3b8" font-family="sans-serif" font-size="13">3rd Prize in Intercollege Hackathon (BIS) • Multimodal Vision AI + Real-Time RAG Registry</text>
          <rect x="910" y="24" width="120" height="36" rx="8" fill="#10b981" />
          <text x="970" y="47" fill="#022c22" font-family="sans-serif" font-size="12" font-weight="700" text-anchor="middle">VERIFIED SAFE</text>
        </g>

        <!-- 2 Column Inspection View -->
        <g transform="translate(48, 172)">
          <!-- Left: Product Inspection -->
          <rect width="508" height="420" rx="12" fill="#0f1a2a" stroke="#1e2c3e" stroke-width="1" />
          <text x="24" y="36" fill="#f8fafc" font-family="sans-serif" font-size="15" font-weight="600">Product Scanning &amp; Multimodal OCR Pipeline</text>
          
          <rect x="24" y="56" width="460" height="180" rx="8" fill="#152438" />
          <rect x="44" y="76" width="120" height="140" rx="6" fill="#0c1724" stroke="#38bdf8" stroke-dasharray="4 4" stroke-width="2" />
          <text x="104" y="145" fill="#38bdf8" font-family="sans-serif" font-size="12" text-anchor="middle">ISI MARK [Scan]</text>
          <text x="180" y="96" fill="#f8fafc" font-family="sans-serif" font-size="14" font-weight="600">IS 1293:2019 Certified</text>
          <text x="180" y="122" fill="#94a3b8" font-family="sans-serif" font-size="12">License No: CM/L-8472910</text>
          <text x="180" y="146" fill="#94a3b8" font-family="sans-serif" font-size="12">Category: Plugs &amp; Socket Outlets</text>
          <text x="180" y="170" fill="#94a3b8" font-family="sans-serif" font-size="12">Manufacturer: Anchor Electricals</text>
          <text x="180" y="196" fill="#34d399" font-family="sans-serif" font-size="12" font-weight="600">Status: Active &amp; Valid through 2027</text>

          <!-- Audit Metrics -->
          <g transform="translate(24, 256)">
            <rect width="220" height="70" rx="6" fill="#152438" />
            <text x="16" y="26" fill="#94a3b8" font-family="sans-serif" font-size="11">AI CONFIDENCE</text>
            <text x="16" y="54" fill="#38bdf8" font-family="sans-serif" font-size="20" font-weight="700">99.4%</text>
          </g>
          <g transform="translate(264, 256)">
            <rect width="220" height="70" rx="6" fill="#152438" />
            <text x="16" y="26" fill="#94a3b8" font-family="sans-serif" font-size="11">REGISTRY LATENCY</text>
            <text x="16" y="54" fill="#34d399" font-family="sans-serif" font-size="20" font-weight="700">42 ms</text>
          </g>
        </g>

        <!-- Right: Real-time Compliance Stream -->
        <g transform="translate(580, 172)">
          <rect width="524" height="420" rx="12" fill="#0f1a2a" stroke="#1e2c3e" stroke-width="1" />
          <text x="24" y="36" fill="#f8fafc" font-family="sans-serif" font-size="15" font-weight="600">Live Indian Standard (IS) Cross-Reference</text>
          
          <rect x="24" y="56" width="476" height="64" rx="6" fill="#132338" />
          <text x="40" y="82" fill="#38bdf8" font-family="monospace" font-size="13">IS 14534:1998 — Recycled Plastics</text>
          <text x="40" y="104" fill="#94a3b8" font-family="sans-serif" font-size="12">Cross-check: Standard compliance verified against gazette rules</text>

          <rect x="24" y="132" width="476" height="64" rx="6" fill="#132338" />
          <text x="40" y="158" fill="#38bdf8" font-family="monospace" font-size="13">IS 15410:2003 — Mineral Water Containers</text>
          <text x="40" y="180" fill="#94a3b8" font-family="sans-serif" font-size="12">BPA-free chemical migration testing certificate matched</text>

          <rect x="24" y="208" width="476" height="64" rx="6" fill="#132338" />
          <text x="40" y="234" fill="#38bdf8" font-family="monospace" font-size="13">IS 302-2-3:2014 — Safety of Household Appliances</text>
          <text x="40" y="256" fill="#94a3b8" font-family="sans-serif" font-size="12">Dielectric insulation &amp; thermal runaway protection verified</text>

          <rect x="24" y="284" width="476" height="110" rx="6" fill="#0d1b2b" stroke="#1e2f47" />
          <text x="40" y="312" fill="#34d399" font-family="sans-serif" font-size="13" font-weight="600">🛡️ Consumer Protection Assurance</text>
          <text x="40" y="336" fill="#94a3b8" font-family="sans-serif" font-size="12">Real-time fraud reporting directly integrated with National Consumer Helpline (NCH).</text>
          <text x="40" y="358" fill="#94a3b8" font-family="sans-serif" font-size="12">Zero fake certificates detected across 1,400+ scanned SKUs.</text>
        </g>
      </g>
    </svg>
  `, "complyai.png");

  // 9. SkillSync - Career Intelligence & Skill Gap Analyzer Mockup
  await renderSvgToPng(`
    <svg width="1280" height="720" viewBox="0 0 1280 720" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ss-bg" x1="0" y1="0" x2="1280" y2="720" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#0f0c1b" />
          <stop offset="100%" stop-color="#07050e" />
        </linearGradient>
        <radialGradient id="ss-glow" cx="50%" cy="30%" r="50%">
          <stop offset="0%" stop-color="#a855f7" stop-opacity="0.25" />
          <stop offset="100%" stop-color="#a855f7" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="1280" height="720" fill="url(#ss-bg)" />
      <rect width="1280" height="720" fill="url(#ss-glow)" />

      <!-- Window Frame -->
      <g transform="translate(64, 44)">
        <rect width="1152" height="632" rx="16" fill="#131024" stroke="#2b2046" stroke-width="2" />
        <rect width="1152" height="48" rx="16" fill="#0a0814" />
        <path d="M0 32 h1152 v16 h-1152 z" fill="#0a0814" />
        <circle cx="28" cy="24" r="6" fill="#ef4444" />
        <circle cx="48" cy="24" r="6" fill="#f59e0b" />
        <circle cx="68" cy="24" r="6" fill="#10b981" />
        <text x="576" y="29" fill="#c084fc" font-family="-apple-system, sans-serif" font-size="13" font-weight="500" text-anchor="middle">SkillSync — AI Career Pathway &amp; Skill Gap Matrix Platform</text>

        <!-- Top Profile Bar -->
        <g transform="translate(48, 68)">
          <rect width="1056" height="76" rx="10" fill="#1a1532" stroke="#3b2d5a" stroke-width="1" />
          <text x="24" y="34" fill="#f8fafc" font-family="sans-serif" font-size="16" font-weight="700">Target Role: Senior AI &amp; Full-Stack Systems Engineer</text>
          <text x="24" y="58" fill="#c084fc" font-family="sans-serif" font-size="13">Candidate Assessment Score: 94% Alignment • 8/9 Core Competencies Matched</text>
          <rect x="910" y="20" width="122" height="36" rx="6" fill="#9333ea" />
          <text x="971" y="43" fill="#ffffff" font-family="sans-serif" font-size="12" font-weight="700" text-anchor="middle">TOP 3% TIER</text>
        </g>

        <!-- Left: Radar / Competency Breakdown -->
        <g transform="translate(48, 164)">
          <rect width="510" height="430" rx="12" fill="#151128" stroke="#251c3d" stroke-width="1" />
          <text x="24" y="36" fill="#f8fafc" font-family="sans-serif" font-size="15" font-weight="600">Core Competency Matrix</text>

          <!-- Skill 1 -->
          <text x="24" y="80" fill="#e9d5ff" font-family="sans-serif" font-size="13">Autonomous AI Agents (LangChain, OTel)</text>
          <rect x="24" y="90" width="462" height="12" rx="6" fill="#2d224b" />
          <rect x="24" y="90" width="440" height="12" rx="6" fill="#a855f7" />
          <text x="450" y="80" fill="#c084fc" font-family="monospace" font-size="12">96%</text>

          <!-- Skill 2 -->
          <text x="24" y="135" fill="#e9d5ff" font-family="sans-serif" font-size="13">Full-Stack Architecture (Next.js 16, TypeScript)</text>
          <rect x="24" y="145" width="462" height="12" rx="6" fill="#2d224b" />
          <rect x="24" y="145" width="430" height="12" rx="6" fill="#a855f7" />
          <text x="450" y="135" fill="#c084fc" font-family="monospace" font-size="12">94%</text>

          <!-- Skill 3 -->
          <text x="24" y="190" fill="#e9d5ff" font-family="sans-serif" font-size="13">High-Performance APIs (Express, FastAPI)</text>
          <rect x="24" y="200" width="462" height="12" rx="6" fill="#2d224b" />
          <rect x="24" y="200" width="410" height="12" rx="6" fill="#a855f7" />
          <text x="450" y="190" fill="#c084fc" font-family="monospace" font-size="12">90%</text>

          <!-- Skill 4 -->
          <text x="24" y="245" fill="#e9d5ff" font-family="sans-serif" font-size="13">Distributed DBs &amp; Vector Stores (Supabase, Pinecone)</text>
          <rect x="24" y="255" width="462" height="12" rx="6" fill="#2d224b" />
          <rect x="24" y="255" width="400" height="12" rx="6" fill="#a855f7" />
          <text x="450" y="245" fill="#c084fc" font-family="monospace" font-size="12">88%</text>

          <!-- Skill 5 -->
          <text x="24" y="300" fill="#e9d5ff" font-family="sans-serif" font-size="13">DevOps &amp; Docker Production Containers</text>
          <rect x="24" y="310" width="462" height="12" rx="6" fill="#2d224b" />
          <rect x="24" y="310" width="390" height="12" rx="6" fill="#a855f7" />
          <text x="450" y="300" fill="#c084fc" font-family="monospace" font-size="12">86%</text>
        </g>

        <!-- Right: Personalized Growth Roadmap -->
        <g transform="translate(580, 164)">
          <rect width="524" height="430" rx="12" fill="#151128" stroke="#251c3d" stroke-width="1" />
          <text x="24" y="36" fill="#f8fafc" font-family="sans-serif" font-size="15" font-weight="600">Personalized Step-by-Step Pathway</text>

          <g transform="translate(24, 60)">
            <rect width="476" height="74" rx="8" fill="#1d1637" />
            <circle cx="28" cy="37" r="14" fill="#10b981" />
            <text x="28" y="42" fill="#ffffff" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">✓</text>
            <text x="56" y="28" fill="#f8fafc" font-family="sans-serif" font-size="13" font-weight="600">Advanced Agentic Workflows (CoT &amp; Swarms)</text>
            <text x="56" y="52" fill="#c084fc" font-family="sans-serif" font-size="12">Completed with CareNest AI &amp; Swasthya Sathi</text>
          </g>

          <g transform="translate(24, 150)">
            <rect width="476" height="74" rx="8" fill="#1d1637" />
            <circle cx="28" cy="37" r="14" fill="#10b981" />
            <text x="28" y="42" fill="#ffffff" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">✓</text>
            <text x="56" y="28" fill="#f8fafc" font-family="sans-serif" font-size="13" font-weight="600">API Observability &amp; Distributed Tracing</text>
            <text x="56" y="52" fill="#c084fc" font-family="sans-serif" font-size="12">Production implementation in NovaPulse AI SaaS</text>
          </g>

          <g transform="translate(24, 240)">
            <rect width="476" height="74" rx="8" fill="#1d1637" />
            <circle cx="28" cy="37" r="14" fill="#3b82f6" />
            <text x="28" y="42" fill="#ffffff" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">→</text>
            <text x="56" y="28" fill="#f8fafc" font-family="sans-serif" font-size="13" font-weight="600">Kubernetes High-Availability Orchestration</text>
            <text x="56" y="52" fill="#c084fc" font-family="sans-serif" font-size="12">In Progress: Multi-node cluster deployment</text>
          </g>
        </g>
      </g>
    </svg>
  `, "skillsync.png");

  // 10. HackHub - Hackathon Management Platform Mockup
  await renderSvgToPng(`
    <svg width="1280" height="720" viewBox="0 0 1280 720" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="hh-bg" x1="0" y1="0" x2="1280" y2="720" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#180e05" />
          <stop offset="100%" stop-color="#0a0502" />
        </linearGradient>
        <radialGradient id="hh-glow" cx="50%" cy="30%" r="50%">
          <stop offset="0%" stop-color="#f97316" stop-opacity="0.25" />
          <stop offset="100%" stop-color="#f97316" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="1280" height="720" fill="url(#hh-bg)" />
      <rect width="1280" height="720" fill="url(#hh-glow)" />

      <!-- Window Frame -->
      <g transform="translate(64, 44)">
        <rect width="1152" height="632" rx="16" fill="#1a120c" stroke="#3f2615" stroke-width="2" />
        <rect width="1152" height="48" rx="16" fill="#0f0a06" />
        <path d="M0 32 h1152 v16 h-1152 z" fill="#0f0a06" />
        <circle cx="28" cy="24" r="6" fill="#ef4444" />
        <circle cx="48" cy="24" r="6" fill="#f59e0b" />
        <circle cx="68" cy="24" r="6" fill="#10b981" />
        <text x="576" y="29" fill="#fdba74" font-family="-apple-system, sans-serif" font-size="13" font-weight="500" text-anchor="middle">HackHub — Hackathon Portal, Team Matchmaking &amp; Real-Time Submissions</text>

        <!-- Live Hackathon Header -->
        <g transform="translate(48, 68)">
          <rect width="1056" height="84" rx="10" fill="#24170d" stroke="#f97316" stroke-width="1.5" />
          <text x="24" y="36" fill="#fed7aa" font-family="sans-serif" font-size="20" font-weight="700">🚀 NATIONAL INNOVENTURE HACKATHON 2026</text>
          <text x="24" y="62" fill="#fb923c" font-family="sans-serif" font-size="13">Live Event • 1,240 Participants • 320 Teams • $25,000 Prize Pool</text>
          <rect x="860" y="22" width="172" height="40" rx="8" fill="#ea580c" />
          <text x="946" y="47" fill="#ffffff" font-family="monospace" font-size="14" font-weight="700" text-anchor="middle">08h : 42m : 19s LEFT</text>
        </g>

        <!-- 3 Cards Layout -->
        <g transform="translate(48, 172)">
          <!-- Card 1: Team Matchmaker -->
          <rect width="336" height="420" rx="10" fill="#22150b" stroke="#3d2412" stroke-width="1" />
          <text x="20" y="36" fill="#fed7aa" font-family="sans-serif" font-size="15" font-weight="600">🤝 Team Finder</text>
          <rect x="20" y="56" width="296" height="96" rx="6" fill="#170e07" />
          <text x="36" y="86" fill="#ffffff" font-family="sans-serif" font-size="14" font-weight="600">Team Catalyst (3/4)</text>
          <text x="36" y="110" fill="#fdba74" font-family="sans-serif" font-size="12">Looking for: AI/ML Engineer</text>
          <text x="36" y="132" fill="#34d399" font-family="sans-serif" font-size="11">● Active Invite Sent</text>

          <rect x="20" y="164" width="296" height="96" rx="6" fill="#170e07" />
          <text x="36" y="194" fill="#ffffff" font-family="sans-serif" font-size="14" font-weight="600">Team DeepBlue (2/4)</text>
          <text x="36" y="218" fill="#fdba74" font-family="sans-serif" font-size="12">Looking for: Full-Stack Dev</text>
          <text x="36" y="240" fill="#f59e0b" font-family="sans-serif" font-size="11">● 2 Pending Requests</text>

          <!-- Card 2: Submission Portal -->
          <g transform="translate(360, 0)">
            <rect width="336" height="420" rx="10" fill="#22150b" stroke="#3d2412" stroke-width="1" />
            <text x="20" y="36" fill="#fed7aa" font-family="sans-serif" font-size="15" font-weight="600">📦 Project Submission</text>
            <rect x="20" y="56" width="296" height="48" rx="6" fill="#170e07" />
            <text x="36" y="86" fill="#38bdf8" font-family="monospace" font-size="12">github.com/Sanjai-Gopal/repo</text>
            <rect x="20" y="114" width="296" height="48" rx="6" fill="#170e07" />
            <text x="36" y="144" fill="#34d399" font-family="monospace" font-size="12">https://demo-app.vercel.app</text>
            
            <rect x="20" y="176" width="296" height="120" rx="6" fill="#170e07" />
            <text x="36" y="204" fill="#fed7aa" font-family="sans-serif" font-size="12" font-weight="600">Evaluation Criteria:</text>
            <text x="36" y="228" fill="#94a3b8" font-family="sans-serif" font-size="11">✓ Innovation &amp; Impact (40%)</text>
            <text x="36" y="250" fill="#94a3b8" font-family="sans-serif" font-size="11">✓ Technical Execution (30%)</text>
            <text x="36" y="272" fill="#94a3b8" font-family="sans-serif" font-size="11">✓ UI/UX Polish (30%)</text>
          </g>

          <!-- Card 3: Live Leaderboard -->
          <g transform="translate(720, 0)">
            <rect width="336" height="420" rx="10" fill="#22150b" stroke="#3d2412" stroke-width="1" />
            <text x="20" y="36" fill="#fed7aa" font-family="sans-serif" font-size="15" font-weight="600">🏆 Top Track Rankings</text>

            <rect x="20" y="56" width="296" height="56" rx="6" fill="#2b1a0d" />
            <text x="36" y="90" fill="#eab308" font-family="sans-serif" font-size="14" font-weight="700">#1 CareNest AI (98.6)</text>
            
            <rect x="20" y="122" width="296" height="56" rx="6" fill="#26170c" />
            <text x="36" y="156" fill="#94a3b8" font-family="sans-serif" font-size="14" font-weight="700">#2 Swasthya Sathi (97.4)</text>

            <rect x="20" y="188" width="296" height="56" rx="6" fill="#26170c" />
            <text x="36" y="222" fill="#b45309" font-family="sans-serif" font-size="14" font-weight="700">#3 ComplyAI BIS (96.8)</text>
          </g>
        </g>
      </g>
    </svg>
  `, "hackhub.png");

  // 11. Sahay Cognitive Care - AI Eldercare Companion Mockup
  await renderSvgToPng(`
    <svg width="1280" height="720" viewBox="0 0 1280 720" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sahay-bg" x1="0" y1="0" x2="1280" y2="720" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#05141c" />
          <stop offset="100%" stop-color="#030a0e" />
        </linearGradient>
        <radialGradient id="sahay-glow" cx="50%" cy="30%" r="50%">
          <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.2" />
          <stop offset="100%" stop-color="#06b6d4" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="1280" height="720" fill="url(#sahay-bg)" />
      <rect width="1280" height="720" fill="url(#sahay-glow)" />

      <!-- Window Frame -->
      <g transform="translate(64, 44)">
        <rect width="1152" height="632" rx="16" fill="#081b24" stroke="#133648" stroke-width="2" />
        <rect width="1152" height="48" rx="16" fill="#041017" />
        <path d="M0 32 h1152 v16 h-1152 z" fill="#041017" />
        <circle cx="28" cy="24" r="6" fill="#ef4444" />
        <circle cx="48" cy="24" r="6" fill="#f59e0b" />
        <circle cx="68" cy="24" r="6" fill="#10b981" />
        <text x="576" y="29" fill="#67e8f9" font-family="-apple-system, sans-serif" font-size="13" font-weight="500" text-anchor="middle">Sahay — AI Cognitive Care Companion for Elderly Well-Being &amp; Geofencing</text>

        <!-- Top Overview -->
        <g transform="translate(48, 68)">
          <rect width="1056" height="84" rx="10" fill="#0c2532" stroke="#0891b2" stroke-width="1.5" />
          <circle cx="48" cy="42" r="22" fill="#155e75" stroke="#22d3ee" stroke-width="2" />
          <text x="48" y="47" fill="#ffffff" font-family="sans-serif" font-size="18" text-anchor="middle">🧠</text>
          <text x="86" y="36" fill="#f8fafc" font-family="sans-serif" font-size="18" font-weight="700">Elder Patient Cognitive Monitoring &amp; Memory Assistance</text>
          <text x="86" y="60" fill="#a5f3fc" font-family="sans-serif" font-size="13">Continuous conversational AI companion with voice analysis, reminiscence games, and instant SOS alerts</text>
          <rect x="910" y="24" width="122" height="36" rx="8" fill="#06b6d4" />
          <text x="971" y="47" fill="#082f49" font-family="sans-serif" font-size="12" font-weight="700" text-anchor="middle">GEOFENCE SAFE</text>
        </g>

        <!-- 3 Dashboard Panels -->
        <g transform="translate(48, 172)">
          <!-- Panel 1: Daily Cognitive Metrics -->
          <rect width="336" height="420" rx="10" fill="#0a202b" stroke="#153e52" stroke-width="1" />
          <text x="20" y="36" fill="#a5f3fc" font-family="sans-serif" font-size="15" font-weight="600">Cognitive Wellness Score</text>
          
          <g transform="translate(20, 60)">
            <circle cx="148" cy="80" r="60" fill="none" stroke="#164e63" stroke-width="12" />
            <circle cx="148" cy="80" r="60" fill="none" stroke="#22d3ee" stroke-width="12" stroke-dasharray="377" stroke-dashoffset="60" stroke-linecap="round" />
            <text x="148" y="86" fill="#f8fafc" font-family="sans-serif" font-size="28" font-weight="700" text-anchor="middle">84 / 100</text>
            <text x="148" y="106" fill="#67e8f9" font-family="sans-serif" font-size="11" text-anchor="middle">High Recall Rate</text>
          </g>

          <rect x="20" y="220" width="296" height="52" rx="6" fill="#0f2b3a" />
          <text x="36" y="250" fill="#f8fafc" font-family="sans-serif" font-size="13">Speech Coherence Index: 92%</text>

          <rect x="20" y="284" width="296" height="52" rx="6" fill="#0f2b3a" />
          <text x="36" y="314" fill="#f8fafc" font-family="sans-serif" font-size="13">Medication Schedule: 3/3 Taken</text>

          <!-- Panel 2: Memory Exercises -->
          <g transform="translate(360, 0)">
            <rect width="336" height="420" rx="10" fill="#0a202b" stroke="#153e52" stroke-width="1" />
            <text x="20" y="36" fill="#a5f3fc" font-family="sans-serif" font-size="15" font-weight="600">Reminiscence &amp; Voice Sessions</text>

            <rect x="20" y="56" width="296" height="68" rx="6" fill="#0e2a39" />
            <text x="36" y="84" fill="#38bdf8" font-family="sans-serif" font-size="13" font-weight="600">Family Photo Identification</text>
            <text x="36" y="106" fill="#94a3b8" font-family="sans-serif" font-size="11">Score: 5/5 Correct • Latency 2.1s</text>

            <rect x="20" y="136" width="296" height="68" rx="6" fill="#0e2a39" />
            <text x="36" y="164" fill="#38bdf8" font-family="sans-serif" font-size="13" font-weight="600">Daily Orientation Assessment</text>
            <text x="36" y="186" fill="#94a3b8" font-family="sans-serif" font-size="11">Date, place &amp; season identified accurately</text>

            <rect x="20" y="216" width="296" height="68" rx="6" fill="#0e2a39" />
            <text x="36" y="244" fill="#38bdf8" font-family="sans-serif" font-size="13" font-weight="600">Story Recall Audio Interaction</text>
            <text x="36" y="266" fill="#94a3b8" font-family="sans-serif" font-size="11">Expressive response with positive mood</text>
          </g>

          <!-- Panel 3: Geofencing & Safety -->
          <g transform="translate(720, 0)">
            <rect width="336" height="420" rx="10" fill="#0a202b" stroke="#153e52" stroke-width="1" />
            <text x="20" y="36" fill="#a5f3fc" font-family="sans-serif" font-size="15" font-weight="600">Live GPS &amp; Safe Zone Boundary</text>

            <rect x="20" y="56" width="296" height="180" rx="8" fill="#061720" stroke="#0891b2" stroke-width="1" />
            <circle cx="168" cy="146" r="48" fill="#0891b2" fill-opacity="0.2" stroke="#22d3ee" stroke-width="2" stroke-dasharray="4 4" />
            <circle cx="168" cy="146" r="6" fill="#10b981" />
            <text x="168" y="140" fill="#f8fafc" font-family="sans-serif" font-size="11" text-anchor="middle">Current Location</text>
            <text x="168" y="172" fill="#67e8f9" font-family="sans-serif" font-size="10" text-anchor="middle">Home Safe Zone (500m radius)</text>

            <rect x="20" y="250" width="296" height="52" rx="6" fill="#0f2b3a" />
            <text x="36" y="280" fill="#34d399" font-family="sans-serif" font-size="12">● Caretaker SMS/Phone alerts armed</text>
          </g>
        </g>
      </g>
    </svg>
  `, "sahay.png");

  // 12. Dimsee - NPM Drop-in Auth Package Mockup
  await renderSvgToPng(`
    <svg width="1280" height="720" viewBox="0 0 1280 720" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="dim-bg" x1="0" y1="0" x2="1280" y2="720" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#120817" />
          <stop offset="100%" stop-color="#07030a" />
        </linearGradient>
        <radialGradient id="dim-glow" cx="50%" cy="30%" r="50%">
          <stop offset="0%" stop-color="#d946ef" stop-opacity="0.25" />
          <stop offset="100%" stop-color="#d946ef" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="1280" height="720" fill="url(#dim-bg)" />
      <rect width="1280" height="720" fill="url(#dim-glow)" />

      <!-- Window Frame -->
      <g transform="translate(64, 44)">
        <rect width="1152" height="632" rx="16" fill="#150a1b" stroke="#3d164d" stroke-width="2" />
        <rect width="1152" height="48" rx="16" fill="#0c0510" />
        <path d="M0 32 h1152 v16 h-1152 z" fill="#0c0510" />
        <circle cx="28" cy="24" r="6" fill="#ef4444" />
        <circle cx="48" cy="24" r="6" fill="#f59e0b" />
        <circle cx="68" cy="24" r="6" fill="#10b981" />
        <text x="576" y="29" fill="#f0abfc" font-family="-apple-system, sans-serif" font-size="13" font-weight="500" text-anchor="middle">dimsee — Drop-in Full-Stack Auth for MERN &amp; Next.js (Published on NPM)</text>

        <!-- Top Package Header -->
        <g transform="translate(48, 68)">
          <rect width="1056" height="76" rx="10" fill="#200d2a" stroke="#d946ef" stroke-width="1.5" />
          <text x="24" y="34" fill="#fdf4ff" font-family="monospace" font-size="18" font-weight="bold">$ npm install dimsee</text>
          <text x="24" y="58" fill="#e879f9" font-family="sans-serif" font-size="13">Zero-Boilerplate Authentication: JWT Cookies, Argon2 Password Hashing, CSRF Tokens &amp; React Auth Hooks</text>
          <rect x="890" y="20" width="142" height="36" rx="8" fill="#c026d3" />
          <text x="961" y="43" fill="#ffffff" font-family="monospace" font-size="13" font-weight="700" text-anchor="middle">npm v1.0.4</text>
        </g>

        <!-- 2 Panels: Code Editor and Flow Diagram -->
        <g transform="translate(48, 164)">
          <!-- Left: Code Snippet -->
          <rect width="520" height="430" rx="12" fill="#100615" stroke="#2d113a" stroke-width="1" />
          <text x="24" y="36" fill="#f5d0fe" font-family="sans-serif" font-size="14" font-weight="600">server.ts — 3-Line Drop-in Setup</text>
          
          <g transform="translate(24, 60)">
            <text x="0" y="20" fill="#a855f7" font-family="monospace" font-size="13">import <tspan fill="#f43f5e">{ createAuthBackend }</tspan> from <tspan fill="#34d399">"dimsee"</tspan>;</text>
            <text x="0" y="44" fill="#a855f7" font-family="monospace" font-size="13">import <tspan fill="#f8fafc">express</tspan> from <tspan fill="#34d399">"express"</tspan>;</text>
            <text x="0" y="80" fill="#a855f7" font-family="monospace" font-size="13">const <tspan fill="#f8fafc">app</tspan> = <tspan fill="#60a5fa">express()</tspan>;</text>
            <text x="0" y="116" fill="#94a3b8" font-family="monospace" font-size="13">// Automatically mounts /login, /register, /refresh, /me</text>
            <text x="0" y="140" fill="#f8fafc" font-family="monospace" font-size="13"><tspan fill="#f43f5e">createAuthBackend</tspan>(app, {</text>
            <text x="24" y="164" fill="#f8fafc" font-family="monospace" font-size="13">jwtSecret: process.env.JWT_SECRET,</text>
            <text x="24" y="188" fill="#f8fafc" font-family="monospace" font-size="13">mongoUri: process.env.MONGO_URI,</text>
            <text x="24" y="212" fill="#f8fafc" font-family="monospace" font-size="13">cookieDomain: <tspan fill="#34d399">".sanjaibuilds.cv"</tspan>,</text>
            <text x="24" y="236" fill="#f8fafc" font-family="monospace" font-size="13">secure: <tspan fill="#f59e0b">true</tspan></text>
            <text x="0" y="260" fill="#f8fafc" font-family="monospace" font-size="13">});</text>
            <text x="0" y="296" fill="#a855f7" font-family="monospace" font-size="13">app.<tspan fill="#60a5fa">listen</tspan>(<tspan fill="#f59e0b">5000</tspan>);</text>
          </g>

          <!-- Right: Security Architecture -->
          <g transform="translate(544, 0)">
            <rect width="490" height="430" rx="12" fill="#100615" stroke="#2d113a" stroke-width="1" />
            <text x="24" y="36" fill="#f5d0fe" font-family="sans-serif" font-size="14" font-weight="600">Built-in Security Safeguards</text>

            <rect x="24" y="56" width="442" height="64" rx="8" fill="#1f0c29" />
            <text x="40" y="82" fill="#38bdf8" font-family="monospace" font-size="13">🔒 HttpOnly &amp; SameSite Strict Cookies</text>
            <text x="40" y="104" fill="#94a3b8" font-family="sans-serif" font-size="12">Immune to XSS token theft in browsers</text>

            <rect x="24" y="132" width="442" height="64" rx="8" fill="#1f0c29" />
            <text x="40" y="158" fill="#38bdf8" font-family="monospace" font-size="13">🔑 Argon2id Cryptographic Hashing</text>
            <text x="40" y="180" fill="#94a3b8" font-family="sans-serif" font-size="12">Memory-hard password protection against GPU brute force</text>

            <rect x="24" y="208" width="442" height="64" rx="8" fill="#1f0c29" />
            <text x="40" y="234" fill="#38bdf8" font-family="monospace" font-size="13">⚡ Automated JWT Refresh Flow</text>
            <text x="40" y="256" fill="#94a3b8" font-family="sans-serif" font-size="12">Seamless session persistence without logging users out</text>

            <rect x="24" y="284" width="442" height="110" rx="8" fill="#1a0a22" stroke="#4a1a60" />
            <text x="40" y="312" fill="#e879f9" font-family="sans-serif" font-size="13" font-weight="600">⚛️ React Drop-in Hook Included</text>
            <text x="40" y="336" fill="#f8fafc" font-family="monospace" font-size="12">const { user, login, logout, isLoading } = useAuth();</text>
            <text x="40" y="360" fill="#34d399" font-family="sans-serif" font-size="12">✓ Zero state boilerplate • Type-safe autocomplete</text>
          </g>
        </g>
      </g>
    </svg>
  `, "dimsee.png");

  console.log("ALL PROJECT IMAGES GENERATED AT ULTRA-HIGH 1280x720 RESOLUTION!");
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
