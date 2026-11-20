import sharp from "sharp";
import path from "path";
import fs from "fs";

const OUT_DIR = "C:/Users/sanja/.gemini/antigravity/scratch/sanjai.dev/public/projects";

async function renderSvgToPng(svgString, filename) {
  const dest = path.join(OUT_DIR, filename);
  await sharp(Buffer.from(svgString))
    .resize(1920, 1080)
    .png({ quality: 100 })
    .toFile(dest);
  const size = (fs.statSync(dest).size / 1024).toFixed(1);
  console.log(`Rendered ${filename} at 1920x1080 (${size} KB)`);
}

async function main() {
  // 1. Quizza - upscale shot_quiz.png to 1920x1080
  const shotQuiz = "C:/Users/sanja/Downloads/shot_quiz.png";
  if (fs.existsSync(shotQuiz)) {
    await sharp(shotQuiz)
      .resize(1920, 1080, { kernel: "lanczos3", fit: "cover" })
      .png({ quality: 95 })
      .toFile(path.join(OUT_DIR, "quizza.png"));
    console.log("Upscaled quizza.png to 1920x1080");
  }

  // 2. VASAW AI - 1920x1080 Premium Agent Orchestration Engine
  await renderSvgToPng(`
    <svg width="1920" height="1080" viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="v_bg" x1="0" y1="0" x2="1920" y2="1080" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#04060d" />
          <stop offset="45%" stop-color="#090f24" />
          <stop offset="100%" stop-color="#030408" />
        </linearGradient>
        <radialGradient id="v_glow1" cx="30%" cy="25%" r="65%">
          <stop offset="0%" stop-color="#6366f1" stop-opacity="0.32" />
          <stop offset="100%" stop-color="#6366f1" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="v_glow2" cx="80%" cy="70%" r="55%">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.22" />
          <stop offset="100%" stop-color="#38bdf8" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="1920" height="1080" fill="url(#v_bg)" />
      <rect width="1920" height="1080" fill="url(#v_glow1)" />
      <rect width="1920" height="1080" fill="url(#v_glow2)" />

      <!-- Window Frame -->
      <g transform="translate(96, 60)">
        <rect width="1728" height="960" rx="20" fill="#0b101e" stroke="#1e293b" stroke-width="2.5" />
        <!-- Window Titlebar -->
        <rect width="1728" height="60" rx="20" fill="#070a14" />
        <path d="M0 40 h1728 v20 h-1728 z" fill="#070a14" />
        <circle cx="36" cy="30" r="7" fill="#ef4444" />
        <circle cx="62" cy="30" r="7" fill="#f59e0b" />
        <circle cx="88" cy="30" r="7" fill="#10b981" />
        <text x="864" y="36" fill="#cbd5e1" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="600" text-anchor="middle">VASAW AI — Autonomous 6-Agent Local Business Orchestration Engine</text>
        <rect x="1560" y="16" width="136" height="28" rx="6" fill="#1e1b4b" stroke="#4338ca" />
        <text x="1628" y="35" fill="#a5b4fc" font-family="monospace" font-size="12" font-weight="bold" text-anchor="middle">v2.4 • STABLE</text>

        <!-- Top Header Stats -->
        <g transform="translate(48, 90)">
          <rect width="1632" height="96" rx="14" fill="#111827" stroke="#1f2937" stroke-width="1.5" />
          <g transform="translate(32, 24)">
            <text x="0" y="20" fill="#818cf8" font-family="monospace" font-size="12" font-weight="700">AUTONOMOUS ORCHESTRATION PIPELINE</text>
            <text x="0" y="48" fill="#f8fafc" font-family="sans-serif" font-size="20" font-weight="700">6 Synchronized Agents Running End-to-End</text>
          </g>
          <g transform="translate(760, 28)">
            <rect x="0" y="0" width="260" height="42" rx="8" fill="#1e1b4b" stroke="#3730a3" />
            <text x="130" y="26" fill="#c7d2fe" font-family="sans-serif" font-size="13" font-weight="600" text-anchor="middle">220+ Vitest Units Passed</text>
          </g>
          <g transform="translate(1040, 28)">
            <rect x="0" y="0" width="260" height="42" rx="8" fill="#064e3b" stroke="#059669" />
            <text x="130" y="26" fill="#6ee7b7" font-family="sans-serif" font-size="13" font-weight="600" text-anchor="middle">Playwright CI 4-Viewport Matrix</text>
          </g>
          <g transform="translate(1320, 28)">
            <rect x="0" y="0" width="280" height="42" rx="8" fill="#172554" stroke="#2563eb" />
            <text x="140" y="26" fill="#93c5fd" font-family="sans-serif" font-size="13" font-weight="600" text-anchor="middle">Vercel Production Deployed</text>
          </g>
        </g>

        <!-- 6 Pipeline Agents -->
        <g transform="translate(48, 214)">
          <!-- Agent 1 -->
          <g transform="translate(0, 0)">
            <rect width="256" height="340" rx="14" fill="#0f172a" stroke="#312e81" stroke-width="1.5" />
            <rect x="20" y="20" width="44" height="44" rx="10" fill="#312e81" />
            <text x="42" y="48" fill="#c7d2fe" font-family="sans-serif" font-size="18" font-weight="bold" text-anchor="middle">01</text>
            <text x="20" y="98" fill="#f8fafc" font-family="sans-serif" font-size="17" font-weight="700">Discovery Agent</text>
            <text x="20" y="126" fill="#94a3b8" font-family="sans-serif" font-size="13">Google Places &amp; Local Business Intelligence</text>
            <line x1="20" y1="150" x2="236" y2="150" stroke="#1e293b" />
            <text x="20" y="180" fill="#cbd5e1" font-family="monospace" font-size="12">Target: Coimbatore SMBs</text>
            <text x="20" y="206" fill="#cbd5e1" font-family="monospace" font-size="12">Geo Index: Active</text>
            <text x="20" y="232" fill="#cbd5e1" font-family="monospace" font-size="12">Deduplication: SHA-256</text>
            <rect x="20" y="278" width="120" height="32" rx="6" fill="#1e1b4b" stroke="#4338ca" />
            <text x="28" y="299" fill="#818cf8" font-family="sans-serif" font-size="12" font-weight="600">✓ Ingestion OK</text>
          </g>

          <!-- Agent 2 -->
          <g transform="translate(275, 0)">
            <rect width="256" height="340" rx="14" fill="#0f172a" stroke="#312e81" stroke-width="1.5" />
            <rect x="20" y="20" width="44" height="44" rx="10" fill="#312e81" />
            <text x="42" y="48" fill="#c7d2fe" font-family="sans-serif" font-size="18" font-weight="bold" text-anchor="middle">02</text>
            <text x="20" y="98" fill="#f8fafc" font-family="sans-serif" font-size="17" font-weight="700">Qualification</text>
            <text x="20" y="126" fill="#94a3b8" font-family="sans-serif" font-size="13">Gemini Pro Structured Signal Scoring</text>
            <line x1="20" y1="150" x2="236" y2="150" stroke="#1e293b" />
            <text x="20" y="180" fill="#cbd5e1" font-family="monospace" font-size="12">Model: Gemini Pro</text>
            <text x="20" y="206" fill="#cbd5e1" font-family="monospace" font-size="12">JSON Schema: Enforced</text>
            <text x="20" y="232" fill="#cbd5e1" font-family="monospace" font-size="12">Score Cutoff: ≥ 85/100</text>
            <rect x="20" y="278" width="130" height="32" rx="6" fill="#1e1b4b" stroke="#4338ca" />
            <text x="28" y="299" fill="#818cf8" font-family="sans-serif" font-size="12" font-weight="600">✓ AI Evaluated</text>
          </g>

          <!-- Agent 3 -->
          <g transform="translate(550, 0)">
            <rect width="256" height="340" rx="14" fill="#0f172a" stroke="#312e81" stroke-width="1.5" />
            <rect x="20" y="20" width="44" height="44" rx="10" fill="#312e81" />
            <text x="42" y="48" fill="#c7d2fe" font-family="sans-serif" font-size="18" font-weight="bold" text-anchor="middle">03</text>
            <text x="20" y="98" fill="#f8fafc" font-family="sans-serif" font-size="17" font-weight="700">Storage &amp; RLS</text>
            <text x="20" y="126" fill="#94a3b8" font-family="sans-serif" font-size="13">Supabase PostgreSQL Idempotent State</text>
            <line x1="20" y1="150" x2="236" y2="150" stroke="#1e293b" />
            <text x="20" y="180" fill="#cbd5e1" font-family="monospace" font-size="12">DB: Supabase PG</text>
            <text x="20" y="206" fill="#cbd5e1" font-family="monospace" font-size="12">Row-Level Security</text>
            <text x="20" y="232" fill="#cbd5e1" font-family="monospace" font-size="12">Audit Trail: Active</text>
            <rect x="20" y="278" width="120" height="32" rx="6" fill="#064e3b" stroke="#059669" />
            <text x="28" y="299" fill="#6ee7b7" font-family="sans-serif" font-size="12" font-weight="600">✓ Synced</text>
          </g>

          <!-- Agent 4 -->
          <g transform="translate(825, 0)">
            <rect width="256" height="340" rx="14" fill="#0f172a" stroke="#312e81" stroke-width="1.5" />
            <rect x="20" y="20" width="44" height="44" rx="10" fill="#312e81" />
            <text x="42" y="48" fill="#c7d2fe" font-family="sans-serif" font-size="18" font-weight="bold" text-anchor="middle">04</text>
            <text x="20" y="98" fill="#f8fafc" font-family="sans-serif" font-size="17" font-weight="700">Web Generator</text>
            <text x="20" y="126" fill="#94a3b8" font-family="sans-serif" font-size="13">Next.js Template &amp; Tailwind Architecture</text>
            <line x1="20" y1="150" x2="236" y2="150" stroke="#1e293b" />
            <text x="20" y="180" fill="#cbd5e1" font-family="monospace" font-size="12">Stack: Next.js + TS</text>
            <text x="20" y="206" fill="#cbd5e1" font-family="monospace" font-size="12">Responsive Grid</text>
            <text x="20" y="232" fill="#cbd5e1" font-family="monospace" font-size="12">SEO &amp; JSON-LD Ready</text>
            <rect x="20" y="278" width="120" height="32" rx="6" fill="#1e1b4b" stroke="#4338ca" />
            <text x="28" y="299" fill="#818cf8" font-family="sans-serif" font-size="12" font-weight="600">✓ Rendered</text>
          </g>

          <!-- Agent 5 -->
          <g transform="translate(1100, 0)">
            <rect width="256" height="340" rx="14" fill="#0f172a" stroke="#312e81" stroke-width="1.5" />
            <rect x="20" y="20" width="44" height="44" rx="10" fill="#312e81" />
            <text x="42" y="48" fill="#c7d2fe" font-family="sans-serif" font-size="18" font-weight="bold" text-anchor="middle">05</text>
            <text x="20" y="98" fill="#f8fafc" font-family="sans-serif" font-size="17" font-weight="700">Vercel Deploy</text>
            <text x="20" y="126" fill="#94a3b8" font-family="sans-serif" font-size="13">Automated Domain, SSL &amp; Edge Build</text>
            <line x1="20" y1="150" x2="236" y2="150" stroke="#1e293b" />
            <text x="20" y="180" fill="#cbd5e1" font-family="monospace" font-size="12">Provider: Vercel REST</text>
            <text x="20" y="206" fill="#cbd5e1" font-family="monospace" font-size="12">Lighthouse: 100/100</text>
            <text x="20" y="232" fill="#cbd5e1" font-family="monospace" font-size="12">SSL Provision: OK</text>
            <rect x="20" y="278" width="120" height="32" rx="6" fill="#064e3b" stroke="#059669" />
            <text x="28" y="299" fill="#6ee7b7" font-family="sans-serif" font-size="12" font-weight="600">✓ Deployed</text>
          </g>

          <!-- Agent 6 -->
          <g transform="translate(1375, 0)">
            <rect width="256" height="340" rx="14" fill="#0f172a" stroke="#312e81" stroke-width="1.5" />
            <rect x="20" y="20" width="44" height="44" rx="10" fill="#312e81" />
            <text x="42" y="48" fill="#c7d2fe" font-family="sans-serif" font-size="18" font-weight="bold" text-anchor="middle">06</text>
            <text x="20" y="98" fill="#f8fafc" font-family="sans-serif" font-size="17" font-weight="700">Outreach Agent</text>
            <text x="20" y="126" fill="#94a3b8" font-family="sans-serif" font-size="13">WhatsApp Business API &amp; Personalized Demo</text>
            <line x1="20" y1="150" x2="236" y2="150" stroke="#1e293b" />
            <text x="20" y="180" fill="#cbd5e1" font-family="monospace" font-size="12">Channel: WhatsApp API</text>
            <text x="20" y="206" fill="#cbd5e1" font-family="monospace" font-size="12">Personalized Pitch</text>
            <text x="20" y="232" fill="#cbd5e1" font-family="monospace" font-size="12">Conversion Tracking</text>
            <rect x="20" y="278" width="120" height="32" rx="6" fill="#1e1b4b" stroke="#4338ca" />
            <text x="28" y="299" fill="#818cf8" font-family="sans-serif" font-size="12" font-weight="600">✓ Dispatched</text>
          </g>
        </g>

        <!-- Bottom Terminal / Diagnostic Log -->
        <g transform="translate(48, 580)">
          <rect width="1632" height="320" rx="14" fill="#070b14" stroke="#1e293b" stroke-width="1.5" />
          <rect width="1632" height="42" rx="14" fill="#0b101c" />
          <path d="M0 28 h1632 v14 h-1632 z" fill="#0b101c" />
          <text x="24" y="26" fill="#94a3b8" font-family="monospace" font-size="13" font-weight="600">TERMINAL — TEST RUNNER &amp; RUNTIME TELEMETRY</text>

          <g transform="translate(24, 60)">
            <text x="0" y="20" fill="#10b981" font-family="monospace" font-size="14">✓ [vitest] 228 tests passed across 24 test suites (2.1s)</text>
            <text x="0" y="50" fill="#38bdf8" font-family="monospace" font-size="14">✓ [playwright] Viewports tested: iPhone 14 Pro, Pixel 7, iPad Air, 1080p Desktop — 0 visual regressions</text>
            <text x="0" y="80" fill="#818cf8" font-family="monospace" font-size="14">✓ [gemini] Lead qualification confidence: 0.96 • Model: gemini-1.5-pro • Schema validation passed</text>
            <text x="0" y="110" fill="#a78bfa" font-family="monospace" font-size="14">✓ [supabase] Migration 20261118_init.sql applied • Idempotent upserts confirmed • RLS policies active</text>
            <text x="0" y="140" fill="#34d399" font-family="monospace" font-size="14">✓ [vercel] Edge functions deployed to sin1 (Singapore) &amp; bom1 (Mumbai) • SSL provisioned • DNS active</text>
            <text x="0" y="170" fill="#facc15" font-family="monospace" font-size="14">⚡ [lighthouse] Performance: 100 • Accessibility: 100 • Best Practices: 100 • SEO: 100</text>
            <text x="0" y="200" fill="#64748b" font-family="monospace" font-size="14">Pipeline state: IDLE_MONITORING • Next run scheduled in 3600s • Memory: 142MB / 512MB</text>
          </g>
        </g>
      </g>
    </svg>
  `, "vasaw-ai.png");

  // 3. SIH 2026 - 1920x1080 Forensic Email Threat Intel & Polygon Custody
  await renderSvgToPng(`
    <svg width="1920" height="1080" viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="s_bg" x1="0" y1="0" x2="1920" y2="1080" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#050814" />
          <stop offset="50%" stop-color="#0b1226" />
          <stop offset="100%" stop-color="#04060e" />
        </linearGradient>
        <radialGradient id="s_glow" cx="65%" cy="30%" r="60%">
          <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.30" />
          <stop offset="100%" stop-color="#06b6d4" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="1920" height="1080" fill="url(#s_bg)" />
      <rect width="1920" height="1080" fill="url(#s_glow)" />

      <!-- Window Frame -->
      <g transform="translate(96, 60)">
        <rect width="1728" height="960" rx="20" fill="#0c1324" stroke="#1e293b" stroke-width="2.5" />
        <rect width="1728" height="60" rx="20" fill="#070b16" />
        <path d="M0 40 h1728 v20 h-1728 z" fill="#070b16" />
        <circle cx="36" cy="30" r="7" fill="#ef4444" />
        <circle cx="62" cy="30" r="7" fill="#f59e0b" />
        <circle cx="88" cy="30" r="7" fill="#10b981" />
        <text x="864" y="36" fill="#cbd5e1" font-family="-apple-system, sans-serif" font-size="16" font-weight="600" text-anchor="middle">Smart India Hackathon 2026 — Forensic Email Threat Intelligence Platform (Team Dino Coders • PS 261016)</text>

        <!-- Main Body -->
        <g transform="translate(48, 90)">
          <!-- Left Column: Forensic Engine -->
          <g transform="translate(0, 0)">
            <rect width="1020" height="810" rx="14" fill="#0f172a" stroke="#1e293b" stroke-width="1.5" />
            <text x="36" y="44" fill="#38bdf8" font-family="monospace" font-size="14" font-weight="700">FASTAPI FORENSIC ANALYSIS PIPELINE</text>
            <text x="36" y="76" fill="#f8fafc" font-family="sans-serif" font-size="22" font-weight="700">Automated Threat Triage &amp; Cryptographic Evidence Packaging</text>

            <!-- 3 Pipeline Cards -->
            <g transform="translate(36, 108)">
              <!-- Card 1 -->
              <g transform="translate(0, 0)">
                <rect width="948" height="100" rx="10" fill="#080e1c" stroke="#1e293b" />
                <circle cx="50" cy="50" r="22" fill="#0369a1" />
                <text x="50" y="57" fill="#ffffff" font-family="monospace" font-size="16" font-weight="bold" text-anchor="middle">01</text>
                <text x="96" y="40" fill="#f8fafc" font-family="sans-serif" font-size="17" font-weight="600">RFC 822 Header &amp; Relay Parsing</text>
                <text x="96" y="66" fill="#94a3b8" font-family="sans-serif" font-size="13">Hop-by-hop latency extraction • SPF / DKIM / DMARC cryptographic alignment checks • Sender forgery detection</text>
                <rect x="800" y="36" width="124" height="28" rx="6" fill="#064e3b" />
                <text x="862" y="55" fill="#6ee7b7" font-family="sans-serif" font-size="12" font-weight="600" text-anchor="middle">✓ Verified</text>
              </g>

              <!-- Card 2 -->
              <g transform="translate(0, 116)">
                <rect width="948" height="100" rx="10" fill="#080e1c" stroke="#1e293b" />
                <circle cx="50" cy="50" r="22" fill="#0369a1" />
                <text x="50" y="57" fill="#ffffff" font-family="monospace" font-size="16" font-weight="bold" text-anchor="middle">02</text>
                <text x="96" y="40" fill="#f8fafc" font-family="sans-serif" font-size="17" font-weight="600">IOC &amp; ASN Risk Corroboration</text>
                <text x="96" y="66" fill="#94a3b8" font-family="sans-serif" font-size="13">VirusTotal, AbuseIPDB, URLScan API feeds • Heuristic phishing engine • Suspicious attachment sandbox</text>
                <rect x="800" y="36" width="124" height="28" rx="6" fill="#064e3b" />
                <text x="862" y="55" fill="#6ee7b7" font-family="sans-serif" font-size="12" font-weight="600" text-anchor="middle">✓ Score: 94/100</text>
              </g>

              <!-- Card 3 -->
              <g transform="translate(0, 232)">
                <rect width="948" height="100" rx="10" fill="#080e1c" stroke="#1e293b" />
                <circle cx="50" cy="50" r="22" fill="#0369a1" />
                <text x="50" y="57" fill="#ffffff" font-family="monospace" font-size="16" font-weight="bold" text-anchor="middle">03</text>
                <text x="96" y="40" fill="#f8fafc" font-family="sans-serif" font-size="17" font-weight="600">Cryptographic Evidence Packaging</text>
                <text x="96" y="66" fill="#94a3b8" font-family="sans-serif" font-size="13">SHA-256 raw mail hashing • Tamper-proof case dossier generation • Chain of custody audit trail</text>
                <rect x="800" y="36" width="124" height="28" rx="6" fill="#064e3b" />
                <text x="862" y="55" fill="#6ee7b7" font-family="sans-serif" font-size="12" font-weight="600" text-anchor="middle">✓ Sealed</text>
              </g>
            </g>

            <!-- Pytest Output Panel -->
            <g transform="translate(36, 470)">
              <rect width="948" height="300" rx="10" fill="#050811" stroke="#1e293b" />
              <rect width="948" height="36" rx="10" fill="#0b101c" />
              <path d="M0 24 h948 v12 h-948 z" fill="#0b101c" />
              <text x="20" y="24" fill="#94a3b8" font-family="monospace" font-size="12">TEST AUTOMATION &amp; CODE VALIDATION</text>

              <g transform="translate(20, 56)">
                <text x="0" y="20" fill="#10b981" font-family="monospace" font-size="13">$ pytest tests/ -v --cov=app</text>
                <text x="0" y="46" fill="#94a3b8" font-family="monospace" font-size="13">tests/test_relay_parser.py::test_hop_extraction .......................... PASSED</text>
                <text x="0" y="72" fill="#94a3b8" font-family="monospace" font-size="13">tests/test_dkim_dmarc.py::test_alignment_matrix .......................... PASSED</text>
                <text x="0" y="98" fill="#94a3b8" font-family="monospace" font-size="13">tests/test_ioc_corroboration.py::test_reputation_scoring ................. PASSED</text>
                <text x="0" y="124" fill="#94a3b8" font-family="monospace" font-size="13">tests/test_evidence_hashing.py::test_sha256_canonical_hash ................ PASSED</text>
                <text x="0" y="150" fill="#38bdf8" font-family="monospace" font-size="13">contracts/test/EvidenceRegistry.test.ts::should mint immutable custody ... PASSED</text>
                <text x="0" y="180" fill="#34d399" font-family="monospace" font-size="14" font-weight="bold">==== 34 passed, 0 failed in 3.42s (100% test coverage) ====</text>
              </g>
            </g>
          </g>

          <!-- Right Column: Blockchain Registry -->
          <g transform="translate(1048, 0)">
            <rect width="584" height="810" rx="14" fill="#0f172a" stroke="#1e293b" stroke-width="1.5" />
            <text x="32" y="44" fill="#a855f7" font-family="monospace" font-size="14" font-weight="700">POLYGON AMOY TESTNET REGISTRY</text>
            <text x="32" y="76" fill="#f8fafc" font-family="sans-serif" font-size="20" font-weight="700">Smart Contract Custody Proof</text>

            <!-- Solidity Code Card -->
            <g transform="translate(32, 108)">
              <rect width="520" height="260" rx="10" fill="#080c16" stroke="#1e293b" />
              <g transform="translate(24, 30)">
                <text x="0" y="20" fill="#c084fc" font-family="monospace" font-size="13">contract EvidenceRegistry {</text>
                <text x="20" y="44" fill="#e2e8f0" font-family="monospace" font-size="12">  struct CaseRecord {</text>
                <text x="40" y="68" fill="#94a3b8" font-family="monospace" font-size="12">    bytes32 caseHash;</text>
                <text x="40" y="92" fill="#94a3b8" font-family="monospace" font-size="12">    uint256 timestamp;</text>
                <text x="40" y="116" fill="#94a3b8" font-family="monospace" font-size="12">    address investigator;</text>
                <text x="40" y="140" fill="#94a3b8" font-family="monospace" font-size="12">    string ipfsCid;</text>
                <text x="20" y="164" fill="#e2e8f0" font-family="monospace" font-size="12">  }</text>
                <text x="20" y="188" fill="#38bdf8" font-family="monospace" font-size="12">  mapping(bytes32 => CaseRecord) public cases;</text>
                <text x="0" y="212" fill="#c084fc" font-family="monospace" font-size="13">}</text>
              </g>
            </g>

            <!-- Ledger Audit Card -->
            <g transform="translate(32, 388)">
              <rect width="520" height="382" rx="10" fill="#080c16" stroke="#1e293b" />
              <text x="24" y="36" fill="#64748b" font-family="monospace" font-size="12" font-weight="700">IMMUTABLE ON-CHAIN AUDIT TRAIL</text>

              <g transform="translate(24, 60)">
                <text x="0" y="24" fill="#cbd5e1" font-family="sans-serif" font-size="13">Chain:</text>
                <text x="140" y="24" fill="#c084fc" font-family="monospace" font-size="13" font-weight="600">Polygon Amoy (80002)</text>

                <text x="0" y="56" fill="#cbd5e1" font-family="sans-serif" font-size="13">Contract Address:</text>
                <text x="140" y="56" fill="#38bdf8" font-family="monospace" font-size="12">0x742d...44e</text>

                <text x="0" y="88" fill="#cbd5e1" font-family="sans-serif" font-size="13">Gas per Record:</text>
                <text x="140" y="88" fill="#10b981" font-family="monospace" font-size="13">~42,800 gas (~$0.0001)</text>

                <text x="0" y="120" fill="#cbd5e1" font-family="sans-serif" font-size="13">Hackathon:</text>
                <text x="140" y="120" fill="#f8fafc" font-family="sans-serif" font-size="13" font-weight="600">Smart India Hackathon 2026</text>

                <text x="0" y="152" fill="#cbd5e1" font-family="sans-serif" font-size="13">Team:</text>
                <text x="140" y="152" fill="#f8fafc" font-family="sans-serif" font-size="13" font-weight="600">Dino Coders (6 Members)</text>

                <text x="0" y="184" fill="#cbd5e1" font-family="sans-serif" font-size="13">Problem ID:</text>
                <text x="140" y="184" fill="#facc15" font-family="monospace" font-size="13" font-weight="600">PS 261016</text>

                <rect x="0" y="220" width="472" height="64" rx="8" fill="#1e1b4b" stroke="#4338ca" />
                <text x="236" y="258" fill="#c7d2fe" font-family="sans-serif" font-size="15" font-weight="700" text-anchor="middle">✓ Blockchain-Verified Chain of Custody</text>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  `, "sih2026.png");

  // 4. NovaPulse AI - 1920x1080 Observability Platform
  await renderSvgToPng(`
    <svg width="1920" height="1080" viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="np_bg" x1="0" y1="0" x2="1920" y2="1080" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#0a0c16" />
          <stop offset="50%" stop-color="#0f162e" />
          <stop offset="100%" stop-color="#060810" />
        </linearGradient>
      </defs>
      <rect width="1920" height="1080" fill="url(#np_bg)" />

      <!-- Window Frame -->
      <g transform="translate(96, 60)">
        <rect width="1728" height="960" rx="20" fill="#111827" stroke="#1f2937" stroke-width="2.5" />
        <rect width="1728" height="60" rx="20" fill="#090d16" />
        <path d="M0 40 h1728 v20 h-1728 z" fill="#090d16" />
        <circle cx="36" cy="30" r="7" fill="#ef4444" />
        <circle cx="62" cy="30" r="7" fill="#f59e0b" />
        <circle cx="88" cy="30" r="7" fill="#10b981" />
        <text x="864" y="36" fill="#94a3b8" font-family="sans-serif" font-size="16" font-weight="600" text-anchor="middle">NovaPulse AI — Microservice Telemetry &amp; OpenTelemetry Tracing SaaS</text>

        <!-- Sidebar -->
        <rect x="0" y="60" width="280" height="900" fill="#090d16" />
        <text x="32" y="110" fill="#38bdf8" font-family="sans-serif" font-size="20" font-weight="bold">NOVAPULSE</text>
        <rect x="20" y="140" width="240" height="46" rx="8" fill="#1e293b" />
        <text x="48" y="169" fill="#f8fafc" font-family="sans-serif" font-size="14" font-weight="600">📊 Live Telemetry</text>
        <text x="48" y="219" fill="#94a3b8" font-family="sans-serif" font-size="14">⚡ Distributed Traces</text>
        <text x="48" y="269" fill="#94a3b8" font-family="sans-serif" font-size="14">🛡️ Error Analytics</text>
        <text x="48" y="319" fill="#94a3b8" font-family="sans-serif" font-size="14">🔔 Alerts &amp; SLAs</text>
        <text x="48" y="369" fill="#94a3b8" font-family="sans-serif" font-size="14">⚙️ OTel Exporters</text>

        <!-- Main Content -->
        <g transform="translate(320, 90)">
          <!-- Top KPI Cards -->
          <g transform="translate(0, 0)">
            <rect width="420" height="120" rx="12" fill="#1e293b" />
            <text x="24" y="40" fill="#94a3b8" font-family="sans-serif" font-size="14">P99 API LATENCY</text>
            <text x="24" y="85" fill="#38bdf8" font-family="sans-serif" font-size="36" font-weight="bold">18.4 ms</text>
            <text x="24" y="105" fill="#34d399" font-family="sans-serif" font-size="12">↓ 14% improvement vs last hr</text>
          </g>
          <g transform="translate(450, 0)">
            <rect width="420" height="120" rx="12" fill="#1e293b" />
            <text x="24" y="40" fill="#94a3b8" font-family="sans-serif" font-size="14">UPTIME SLA (30 DAYS)</text>
            <text x="24" y="85" fill="#10b981" font-family="sans-serif" font-size="36" font-weight="bold">99.98%</text>
            <text x="24" y="105" fill="#34d399" font-family="sans-serif" font-size="12">● 0 unacknowledged incidents</text>
          </g>
          <g transform="translate(900, 0)">
            <rect width="460" height="120" rx="12" fill="#1e293b" />
            <text x="24" y="40" fill="#94a3b8" font-family="sans-serif" font-size="14">THROUGHPUT</text>
            <text x="24" y="85" fill="#a855f7" font-family="sans-serif" font-size="36" font-weight="bold">4,280 rps</text>
            <text x="24" y="105" fill="#a855f7" font-family="sans-serif" font-size="12">Across 32 global edge clusters</text>
          </g>

          <!-- Waterfall Trace Table -->
          <g transform="translate(0, 150)">
            <rect width="1360" height="660" rx="14" fill="#0f172a" stroke="#1e293b" />
            <text x="32" y="46" fill="#f8fafc" font-family="sans-serif" font-size="20" font-weight="bold">Active Distributed Spans (OpenTelemetry OTLP)</text>
            <line x1="32" y1="70" x2="1328" y2="70" stroke="#1e293b" stroke-width="1.5" />

            <!-- Span Rows -->
            <g transform="translate(32, 90)">
              <rect width="1296" height="74" rx="10" fill="#1e293b" />
              <circle cx="36" cy="37" r="6" fill="#10b981" />
              <text x="60" y="43" fill="#38bdf8" font-family="monospace" font-size="16">GET /api/v1/auth/session</text>
              <text x="480" y="43" fill="#94a3b8" font-family="sans-serif" font-size="14">Next.js Edge Runtime</text>
              <rect x="740" y="27" width="360" height="20" rx="6" fill="#38bdf8" fill-opacity="0.25" />
              <rect x="740" y="27" width="90" height="20" rx="6" fill="#38bdf8" />
              <text x="1140" y="43" fill="#34d399" font-family="monospace" font-size="15">14.2 ms (200)</text>
            </g>

            <g transform="translate(32, 178)">
              <rect width="1296" height="74" rx="10" fill="#182236" />
              <circle cx="36" cy="37" r="6" fill="#10b981" />
              <text x="60" y="43" fill="#38bdf8" font-family="monospace" font-size="16">POST /api/telemetry/ingest</text>
              <text x="480" y="43" fill="#94a3b8" font-family="sans-serif" font-size="14">OTel Collector Cluster</text>
              <rect x="740" y="27" width="420" height="20" rx="6" fill="#a855f7" fill-opacity="0.25" />
              <rect x="740" y="27" width="160" height="20" rx="6" fill="#a855f7" />
              <text x="1140" y="43" fill="#34d399" font-family="monospace" font-size="15">26.1 ms (201)</text>
            </g>

            <g transform="translate(32, 266)">
              <rect width="1296" height="74" rx="10" fill="#1e293b" />
              <circle cx="36" cy="37" r="6" fill="#10b981" />
              <text x="60" y="43" fill="#38bdf8" font-family="monospace" font-size="16">QUERY supabase.rpc("aggregate")</text>
              <text x="480" y="43" fill="#94a3b8" font-family="sans-serif" font-size="14">PostgreSQL RLS Engine</text>
              <rect x="740" y="27" width="460" height="20" rx="6" fill="#10b981" fill-opacity="0.25" />
              <rect x="740" y="27" width="120" height="20" rx="6" fill="#10b981" />
              <text x="1140" y="43" fill="#34d399" font-family="monospace" font-size="15">8.9 ms (OK)</text>
            </g>

            <g transform="translate(32, 354)">
              <rect width="1296" height="74" rx="10" fill="#182236" />
              <circle cx="36" cy="37" r="6" fill="#10b981" />
              <text x="60" y="43" fill="#38bdf8" font-family="monospace" font-size="16">POST /v1/checkout/razorpay</text>
              <text x="480" y="43" fill="#94a3b8" font-family="sans-serif" font-size="14">Webhook Signature Check</text>
              <rect x="740" y="27" width="340" height="20" rx="6" fill="#f59e0b" fill-opacity="0.25" />
              <rect x="740" y="27" width="180" height="20" rx="6" fill="#f59e0b" />
              <text x="1140" y="43" fill="#34d399" font-family="monospace" font-size="15">38.4 ms (200)</text>
            </g>

            <g transform="translate(32, 442)">
              <rect width="1296" height="74" rx="10" fill="#1e293b" />
              <circle cx="36" cy="37" r="6" fill="#10b981" />
              <text x="60" y="43" fill="#38bdf8" font-family="monospace" font-size="16">SEND /alerts/dispatch</text>
              <text x="480" y="43" fill="#94a3b8" font-family="sans-serif" font-size="14">Slack &amp; PagerDuty Alert</text>
              <rect x="740" y="27" width="280" height="20" rx="6" fill="#ec4899" fill-opacity="0.25" />
              <rect x="740" y="27" width="110" height="20" rx="6" fill="#ec4899" />
              <text x="1140" y="43" fill="#34d399" font-family="monospace" font-size="15">19.5 ms (200)</text>
            </g>
          </g>
        </g>
      </g>
    </svg>
  `, "novapulse.png");

  // 5. ComplyAI - 1920x1080 Bureau of Indian Standards Smart Consumer
  await renderSvgToPng(`
    <svg width="1920" height="1080" viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="c_bg" x1="0" y1="0" x2="1920" y2="1080" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#040b17" />
          <stop offset="50%" stop-color="#071b33" />
          <stop offset="100%" stop-color="#030811" />
        </linearGradient>
      </defs>
      <rect width="1920" height="1080" fill="url(#c_bg)" />

      <!-- Window Frame -->
      <g transform="translate(96, 60)">
        <rect width="1728" height="960" rx="20" fill="#0b172a" stroke="#1e3a5f" stroke-width="2.5" />
        <rect width="1728" height="60" rx="20" fill="#060f1e" />
        <path d="M0 40 h1728 v20 h-1728 z" fill="#060f1e" />
        <circle cx="36" cy="30" r="7" fill="#ef4444" />
        <circle cx="62" cy="30" r="7" fill="#f59e0b" />
        <circle cx="88" cy="30" r="7" fill="#10b981" />
        <text x="864" y="36" fill="#cbd5e1" font-family="sans-serif" font-size="16" font-weight="600" text-anchor="middle">ComplyAI — Bureau of Indian Standards (BIS) Smart Consumer Protection Verification Platform</text>
        <rect x="1500" y="16" width="190" height="28" rx="6" fill="#854d0e" />
        <text x="1595" y="35" fill="#fef08a" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">🏆 3RD PRIZE AWARD</text>

        <!-- Main Body -->
        <g transform="translate(48, 90)">
          <!-- Top Info Banner -->
          <rect width="1632" height="96" rx="14" fill="#0c2340" stroke="#1e40af" />
          <g transform="translate(32, 24)">
            <text x="0" y="20" fill="#60a5fa" font-family="monospace" font-size="13" font-weight="700">BIS CONSUMER COMPLIANCE VERIFICATION PORTAL</text>
            <text x="0" y="48" fill="#f8fafc" font-family="sans-serif" font-size="20" font-weight="bold">AI Vision OCR for ISI Mark, Hallmark &amp; BIS Gazette Registry Cross-Referencing</text>
          </g>

          <!-- 3 Columns -->
          <g transform="translate(0, 120)">
            <!-- Left Col: Camera & OCR scan -->
            <g transform="translate(0, 0)">
              <rect width="520" height="680" rx="14" fill="#081426" stroke="#1e3a5f" />
              <text x="24" y="40" fill="#38bdf8" font-family="monospace" font-size="13" font-weight="700">MULTIMODAL VISION OCR SCANNER</text>
              <rect x="24" y="60" width="472" height="340" rx="10" fill="#020817" stroke="#3b82f6" stroke-dasharray="6 6" />
              <rect x="140" y="120" width="240" height="200" rx="8" fill="#1e293b" />
              <circle cx="260" cy="200" r="50" fill="#0284c7" />
              <text x="260" y="210" fill="#ffffff" font-family="sans-serif" font-size="32" font-weight="bold" text-anchor="middle">ISI</text>
              <text x="260" y="280" fill="#38bdf8" font-family="monospace" font-size="14" text-anchor="middle">CM/L-8400129482</text>
              <text x="260" y="300" fill="#10b981" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">✓ Bounding Box Detected (0.98)</text>

              <!-- Extracted Data -->
              <g transform="translate(24, 420)">
                <text x="0" y="24" fill="#94a3b8" font-family="sans-serif" font-size="13">Extracted Standard:</text>
                <text x="180" y="24" fill="#f8fafc" font-family="monospace" font-size="14" font-weight="600">IS 694 : 2010</text>

                <text x="0" y="56" fill="#94a3b8" font-family="sans-serif" font-size="13">Licensee Name:</text>
                <text x="180" y="56" fill="#f8fafc" font-family="sans-serif" font-size="14" font-weight="600">Havells India Ltd.</text>

                <text x="0" y="88" fill="#94a3b8" font-family="sans-serif" font-size="13">Product Class:</text>
                <text x="180" y="88" fill="#f8fafc" font-family="sans-serif" font-size="14">PVC Insulated Cables</text>

                <text x="0" y="120" fill="#94a3b8" font-family="sans-serif" font-size="13">License Validity:</text>
                <text x="180" y="120" fill="#10b981" font-family="monospace" font-size="14" font-weight="bold">ACTIVE (Valid till 2028)</text>

                <rect x="0" y="150" width="472" height="48" rx="8" fill="#064e3b" />
                <text x="236" y="180" fill="#6ee7b7" font-family="sans-serif" font-size="15" font-weight="bold" text-anchor="middle">✓ 100% Genuine BIS Certified Product</text>
              </g>
            </g>

            <!-- Middle Col: Gazette Cross-Ref -->
            <g transform="translate(550, 0)">
              <rect width="530" height="680" rx="14" fill="#081426" stroke="#1e3a5f" />
              <text x="24" y="40" fill="#38bdf8" font-family="monospace" font-size="13" font-weight="700">GAZETTE CROSS-REFERENCING ENGINE</text>
              <rect x="24" y="60" width="482" height="580" rx="10" fill="#020817" />
              <g transform="translate(48, 90)">
                <text x="0" y="24" fill="#60a5fa" font-family="monospace" font-size="14">$ bis_engine.verify_gazette(lic_id)</text>
                <text x="0" y="56" fill="#94a3b8" font-family="monospace" font-size="13">Connecting to BIS Care e-Registry API...</text>
                <text x="0" y="88" fill="#10b981" font-family="monospace" font-size="13">[HTTP 200] Record matched in Gazette database</text>
                <text x="0" y="120" fill="#94a3b8" font-family="monospace" font-size="13">Factory location: Haridwar, Uttarakhand</text>
                <text x="0" y="152" fill="#94a3b8" font-family="monospace" font-size="13">Last audited by BIS Inspector: Sep 14, 2026</text>
                <text x="0" y="184" fill="#10b981" font-family="monospace" font-size="13">Zero non-compliance violations reported</text>
                <text x="0" y="216" fill="#94a3b8" font-family="monospace" font-size="13">Hallmark HUID validation: PASSED</text>
                <text x="0" y="248" fill="#38bdf8" font-family="monospace" font-size="13">RAG Knowledge Base: 1,840 BIS standards indexed</text>
                <text x="0" y="280" fill="#a855f7" font-family="monospace" font-size="13">OCR latency: 310ms (Local ONNX Runtime)</text>
                <text x="0" y="340" fill="#facc15" font-family="monospace" font-size="13">Consumer Protection Act 2019 compliance check: OK</text>
              </g>
            </g>

            <!-- Right Col: Automated Grievance Filing -->
            <g transform="translate(1110, 0)">
              <rect width="522" height="680" rx="14" fill="#081426" stroke="#1e3a5f" />
              <text x="24" y="40" fill="#38bdf8" font-family="monospace" font-size="13" font-weight="700">AUTOMATED GRIEVANCE ASSISTANT</text>
              <g transform="translate(24, 60)">
                <rect width="474" height="260" rx="10" fill="#020817" />
                <g transform="translate(20, 24)">
                  <text x="0" y="20" fill="#f8fafc" font-family="sans-serif" font-size="16" font-weight="bold">1-Click Grievance Dispatch</text>
                  <text x="0" y="48" fill="#94a3b8" font-family="sans-serif" font-size="13">If counterfeit or expired mark is detected:</text>
                  <text x="0" y="80" fill="#cbd5e1" font-family="sans-serif" font-size="13">• Auto-formats National Consumer Helpline complaint</text>
                  <text x="0" y="108" fill="#cbd5e1" font-family="sans-serif" font-size="13">• Attaches GPS geotag &amp; store metadata</text>
                  <text x="0" y="136" fill="#cbd5e1" font-family="sans-serif" font-size="13">• Pre-populates relevant sections of BIS Act 2016</text>
                  <rect x="0" y="166" width="434" height="42" rx="6" fill="#1e293b" />
                  <text x="217" y="192" fill="#38bdf8" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle">Ready for Instant Submission</text>
                </g>

                <!-- Hackathon Award Info -->
                <rect x="0" y="280" width="474" height="280" rx="10" fill="#1e1b4b" stroke="#4338ca" />
                <g transform="translate(24, 308)">
                  <text x="0" y="20" fill="#facc15" font-family="sans-serif" font-size="18" font-weight="bold">🏆 Intercollege Hackathon</text>
                  <text x="0" y="48" fill="#f8fafc" font-family="sans-serif" font-size="15">Bureau of Indian Standards Contest</text>
                  <text x="0" y="78" fill="#c7d2fe" font-family="sans-serif" font-size="13">Award: 3rd Prize Winner</text>
                  <text x="0" y="104" fill="#c7d2fe" font-family="sans-serif" font-size="13">Domain: Smart Consumer Protection</text>
                  <text x="0" y="130" fill="#c7d2fe" font-family="sans-serif" font-size="13">Stack: Next.js + Python + OCR + RAG</text>
                  <rect x="0" y="160" width="426" height="44" rx="8" fill="#047857" />
                  <text x="213" y="188" fill="#ecfdf5" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle">Officially Recognized by BIS Officials</text>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  `, "complyai.png");

  // 6. HackHub - 1920x1080 Platform
  await renderSvgToPng(`
    <svg width="1920" height="1080" viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="hh_bg" x1="0" y1="0" x2="1920" y2="1080" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#0a0a14" />
          <stop offset="50%" stop-color="#14112e" />
          <stop offset="100%" stop-color="#06060c" />
        </linearGradient>
      </defs>
      <rect width="1920" height="1080" fill="url(#hh_bg)" />

      <!-- Window Frame -->
      <g transform="translate(96, 60)">
        <rect width="1728" height="960" rx="20" fill="#0f111c" stroke="#251f47" stroke-width="2.5" />
        <rect width="1728" height="60" rx="20" fill="#080911" />
        <path d="M0 40 h1728 v20 h-1728 z" fill="#080911" />
        <circle cx="36" cy="30" r="7" fill="#ef4444" />
        <circle cx="62" cy="30" r="7" fill="#f59e0b" />
        <circle cx="88" cy="30" r="7" fill="#10b981" />
        <text x="864" y="36" fill="#cbd5e1" font-family="sans-serif" font-size="16" font-weight="600" text-anchor="middle">HackHub — Hackathon Coordination &amp; Real-time AI Matchmaking Platform</text>

        <!-- Top Overview Bar -->
        <g transform="translate(48, 90)">
          <rect width="1632" height="100" rx="14" fill="#17152d" stroke="#2d2657" />
          <g transform="translate(32, 28)">
            <text x="0" y="20" fill="#a78bfa" font-family="monospace" font-size="13" font-weight="bold">HACKATHON MANAGEMENT PLATFORM</text>
            <text x="0" y="48" fill="#f8fafc" font-family="sans-serif" font-size="20" font-weight="bold">Team Collaboration, Realtime Chat, AI Teammate Matchmaker &amp; Automated Pitch Deck Generator</text>
          </g>
        </g>

        <!-- 3 Feature Panels -->
        <g transform="translate(48, 220)">
          <g transform="translate(0, 0)">
            <rect width="520" height="680" rx="14" fill="#121024" stroke="#251f47" />
            <text x="32" y="44" fill="#a78bfa" font-family="monospace" font-size="14" font-weight="bold">AI TEAM FORMATION MATCHMAKER</text>
            <g transform="translate(32, 70)">
              <rect width="456" height="120" rx="10" fill="#090814" />
              <text x="20" y="36" fill="#f8fafc" font-family="sans-serif" font-size="16" font-weight="600">Sanjai (Full Stack / AI)</text>
              <text x="20" y="60" fill="#38bdf8" font-family="sans-serif" font-size="13">SKCET AIDS • Python, Next.js, FastAPI</text>
              <rect x="20" y="78" width="160" height="26" rx="6" fill="#1e1b4b" />
              <text x="100" y="96" fill="#a5b4fc" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">Role: Lead Dev (98% Match)</text>
            </g>
            <g transform="translate(32, 210)">
              <rect width="456" height="120" rx="10" fill="#090814" />
              <text x="20" y="36" fill="#f8fafc" font-family="sans-serif" font-size="16" font-weight="600">Priya K (UI/UX Designer)</text>
              <text x="20" y="60" fill="#ec4899" font-family="sans-serif" font-size="13">Figma, Framer, User Research</text>
              <rect x="20" y="78" width="160" height="26" rx="6" fill="#1e1b4b" />
              <text x="100" y="96" fill="#a5b4fc" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">Role: Design Lead (94% Match)</text>
            </g>
            <g transform="translate(32, 350)">
              <rect width="456" height="120" rx="10" fill="#090814" />
              <text x="20" y="36" fill="#f8fafc" font-family="sans-serif" font-size="16" font-weight="600">Rohit M (Backend &amp; Cloud)</text>
              <text x="20" y="60" fill="#10b981" font-family="sans-serif" font-size="13">Docker, AWS, PostgreSQL, Go</text>
              <rect x="20" y="78" width="160" height="26" rx="6" fill="#1e1b4b" />
              <text x="100" y="96" fill="#a5b4fc" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">Role: Cloud Eng (96% Match)</text>
            </g>
            <g transform="translate(32, 500)">
              <rect width="456" height="140" rx="10" fill="#052e16" stroke="#059669" />
              <text x="24" y="40" fill="#34d399" font-family="sans-serif" font-size="16" font-weight="bold">✓ Team Balance Score: 96/100</text>
              <text x="24" y="68" fill="#a7f3d0" font-family="sans-serif" font-size="13">Complementary coverage across Frontend, ML &amp; Design</text>
              <text x="24" y="94" fill="#a7f3d0" font-family="sans-serif" font-size="13">Timezone sync: +0h overlap (Coimbatore)</text>
            </g>
          </g>

          <g transform="translate(556, 0)">
            <rect width="520" height="680" rx="14" fill="#121024" stroke="#251f47" />
            <text x="32" y="44" fill="#a78bfa" font-family="monospace" font-size="14" font-weight="bold">LIVE PROJECT KANBAN &amp; TASKS</text>
            <g transform="translate(32, 70)">
              <rect width="456" height="570" rx="10" fill="#090814" />
              <g transform="translate(24, 30)">
                <text x="0" y="20" fill="#f8fafc" font-family="sans-serif" font-size="15" font-weight="bold">Sprint Progress (36h Hackathon)</text>
                <rect x="0" y="40" width="408" height="20" rx="6" fill="#1e1b4b" />
                <rect x="0" y="40" width="310" height="20" rx="6" fill="#7c3aed" />
                <text x="0" y="85" fill="#cbd5e1" font-family="sans-serif" font-size="13">✓ Sprint 1: Architecture &amp; Database Design (Done)</text>
                <text x="0" y="115" fill="#cbd5e1" font-family="sans-serif" font-size="13">✓ Sprint 2: Core ML Engine &amp; API Routes (Done)</text>
                <text x="0" y="145" fill="#cbd5e1" font-family="sans-serif" font-size="13">✓ Sprint 3: Frontend Dashboard &amp; Chart.js (Done)</text>
                <text x="0" y="175" fill="#facc15" font-family="sans-serif" font-size="13">⚡ Sprint 4: Vercel Deploy &amp; Demo Video (In Progress)</text>
                <line x1="0" y1="210" x2="408" y2="210" stroke="#1f2937" />
                <text x="0" y="240" fill="#38bdf8" font-family="monospace" font-size="13">5 Upstream Commits Merged to Main</text>
                <text x="0" y="270" fill="#94a3b8" font-family="monospace" font-size="13">• Real-time WebSocket chat layer</text>
                <text x="0" y="296" fill="#94a3b8" font-family="monospace" font-size="13">• Mentor matching queue with auto-routing</text>
                <text x="0" y="322" fill="#94a3b8" font-family="monospace" font-size="13">• Mobile-first responsive navigation overhaul</text>
              </g>
            </g>
          </g>

          <g transform="translate(1112, 0)">
            <rect width="520" height="680" rx="14" fill="#121024" stroke="#251f47" />
            <text x="32" y="44" fill="#a78bfa" font-family="monospace" font-size="14" font-weight="bold">AI PITCH &amp; SUMMARY GENERATOR</text>
            <g transform="translate(32, 70)">
              <rect width="456" height="570" rx="10" fill="#090814" />
              <g transform="translate(24, 30)">
                <text x="0" y="20" fill="#c084fc" font-family="sans-serif" font-size="16" font-weight="bold">Automated 3-Minute Pitch Script</text>
                <rect x="0" y="40" width="408" height="240" rx="8" fill="#17152d" />
                <g transform="translate(16, 20)">
                  <text x="0" y="20" fill="#f8fafc" font-family="sans-serif" font-size="13" font-weight="600">Hook: "78% of hackathon teams fail to form..."</text>
                  <text x="0" y="48" fill="#cbd5e1" font-family="sans-serif" font-size="12">Problem: Skill gaps, scheduling friction, dropouts</text>
                  <text x="0" y="74" fill="#cbd5e1" font-family="sans-serif" font-size="12">Solution: AI matchmaker with verified credentials</text>
                  <text x="0" y="100" fill="#34d399" font-family="sans-serif" font-size="12">Demo: Live matching in &lt; 5 seconds with zero cold-starts</text>
                  <text x="0" y="126" fill="#38bdf8" font-family="sans-serif" font-size="12">Traction: 1,400 students registered across 12 colleges</text>
                </g>
                <rect x="0" y="310" width="408" height="60" rx="8" fill="#1e1b4b" stroke="#4338ca" />
                <text x="204" y="346" fill="#a5b4fc" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle">Export to Slides (PDF / Canva)</text>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  `, "hackhub.png");

  // 7. Sahay - 1920x1080 Cognitive Health
  await renderSvgToPng(`
    <svg width="1920" height="1080" viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sh_bg" x1="0" y1="0" x2="1920" y2="1080" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#041210" />
          <stop offset="50%" stop-color="#0a2924" />
          <stop offset="100%" stop-color="#020807" />
        </linearGradient>
      </defs>
      <rect width="1920" height="1080" fill="url(#sh_bg)" />

      <!-- Window Frame -->
      <g transform="translate(96, 60)">
        <rect width="1728" height="960" rx="20" fill="#091b17" stroke="#134e44" stroke-width="2.5" />
        <rect width="1728" height="60" rx="20" fill="#040f0d" />
        <path d="M0 40 h1728 v20 h-1728 z" fill="#040f0d" />
        <circle cx="36" cy="30" r="7" fill="#ef4444" />
        <circle cx="62" cy="30" r="7" fill="#f59e0b" />
        <circle cx="88" cy="30" r="7" fill="#10b981" />
        <text x="864" y="36" fill="#99f6e4" font-family="sans-serif" font-size="16" font-weight="600" text-anchor="middle">Sahay — Elder Cognitive Health, Remote Caregiver Oversight &amp; Safe-Zone Geofencing</text>
        <rect x="1540" y="16" width="150" height="28" rx="6" fill="#064e3b" />
        <text x="1615" y="35" fill="#6ee7b7" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">WCAG 2.1 AA</text>

        <!-- Main Body -->
        <g transform="translate(48, 90)">
          <!-- Top Caregiver Banner -->
          <rect width="1632" height="100" rx="14" fill="#0f2e28" stroke="#115e50" />
          <g transform="translate(32, 28)">
            <text x="0" y="20" fill="#2dd4bf" font-family="monospace" font-size="13" font-weight="bold">REMOTE CAREGIVER OVERSIGHT ECOSYSTEM</text>
            <text x="0" y="48" fill="#f8fafc" font-family="sans-serif" font-size="20" font-weight="bold">Multilingual Voice Companion, Daily Cognitive Recall Exercises &amp; 1-Tap SOS Emergency Dispatch</text>
          </g>

          <!-- 3 Panels -->
          <g transform="translate(0, 120)">
            <g transform="translate(0, 0)">
              <rect width="520" height="680" rx="14" fill="#0c231f" stroke="#134e44" />
              <text x="32" y="44" fill="#5eead4" font-family="monospace" font-size="14" font-weight="bold">COGNITIVE STIMULATION GAMES</text>
              <g transform="translate(32, 70)">
                <rect width="456" height="570" rx="10" fill="#061513" />
                <g transform="translate(24, 30)">
                  <text x="0" y="20" fill="#f8fafc" font-family="sans-serif" font-size="17" font-weight="bold">Daily Memory &amp; Recall Assessment</text>
                  <text x="0" y="50" fill="#99f6e4" font-family="sans-serif" font-size="13">Today's exercise: Family photo recognition</text>
                  <rect x="0" y="70" width="408" height="180" rx="8" fill="#0e302a" />
                  <circle cx="204" cy="140" r="44" fill="#14b8a6" />
                  <text x="204" y="148" fill="#042f2e" font-family="sans-serif" font-size="24" font-weight="bold" text-anchor="middle">🧠</text>
                  <text x="204" y="210" fill="#ccfbf1" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle">Cognitive Health Score: 92/100</text>
                  <text x="0" y="280" fill="#cbd5e1" font-family="sans-serif" font-size="13">• Reaction speed: 1.4s (Normal baseline)</text>
                  <text x="0" y="310" fill="#cbd5e1" font-family="sans-serif" font-size="13">• Word association test: 10/10 correct</text>
                  <text x="0" y="340" fill="#cbd5e1" font-family="sans-serif" font-size="13">• Mood sentiment: Calm &amp; Positive (Voice analyzed)</text>
                </g>
              </g>
            </g>

            <g transform="translate(556, 0)">
              <rect width="520" height="680" rx="14" fill="#0c231f" stroke="#134e44" />
              <text x="32" y="44" fill="#5eead4" font-family="monospace" font-size="14" font-weight="bold">SAFE-ZONE GEOFENCING (200m–1500m)</text>
              <g transform="translate(32, 70)">
                <rect width="456" height="570" rx="10" fill="#061513" />
                <g transform="translate(24, 30)">
                  <rect x="0" y="0" width="408" height="260" rx="10" fill="#022c22" stroke="#059669" />
                  <circle cx="204" cy="130" r="80" fill="#10b981" fill-opacity="0.15" stroke="#10b981" stroke-width="2" stroke-dasharray="4 4" />
                  <circle cx="204" cy="130" r="12" fill="#10b981" />
                  <text x="204" y="165" fill="#a7f3d0" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">Home Perimeter (400m)</text>
                  <text x="204" y="185" fill="#f8fafc" font-family="sans-serif" font-size="12" text-anchor="middle">Current Location: INSIDE SAFE ZONE</text>

                  <g transform="translate(0, 280)">
                    <text x="0" y="24" fill="#f8fafc" font-family="sans-serif" font-size="15" font-weight="bold">Live Telemetry Status</text>
                    <text x="0" y="54" fill="#99f6e4" font-family="monospace" font-size="13">GPS Fix: 8 satellites • Accuracy: ±2.4m</text>
                    <text x="0" y="80" fill="#99f6e4" font-family="monospace" font-size="13">Battery Level: 84% (Charge OK)</text>
                    <text x="0" y="106" fill="#99f6e4" font-family="monospace" font-size="13">Last Movement: 4 mins ago (Walking)</text>
                    <text x="0" y="132" fill="#34d399" font-family="monospace" font-size="13">Caregiver Notification: Normal Sync</text>
                  </g>
                </g>
              </g>
            </g>

            <g transform="translate(1112, 0)">
              <rect width="520" height="680" rx="14" fill="#0c231f" stroke="#134e44" />
              <text x="32" y="44" fill="#5eead4" font-family="monospace" font-size="14" font-weight="bold">EMERGENCY SOS &amp; VOICE AGENT</text>
              <g transform="translate(32, 70)">
                <rect width="456" height="570" rx="10" fill="#061513" />
                <g transform="translate(24, 30)">
                  <rect x="0" y="0" width="408" height="120" rx="12" fill="#7f1d1d" stroke="#ef4444" stroke-width="2" />
                  <circle cx="50" cy="60" r="24" fill="#dc2626" />
                  <text x="50" y="68" fill="#ffffff" font-family="sans-serif" font-size="20" font-weight="bold" text-anchor="middle">SOS</text>
                  <text x="96" y="50" fill="#fef2f2" font-family="sans-serif" font-size="17" font-weight="bold">1-Tap Emergency Trigger</text>
                  <text x="96" y="76" fill="#fca5a5" font-family="sans-serif" font-size="12">Instant SMS, GPS location &amp; auto-dial</text>

                  <g transform="translate(0, 150)">
                    <text x="0" y="24" fill="#f8fafc" font-family="sans-serif" font-size="15" font-weight="bold">Medicine Schedule (Auto Voice Prompts)</text>
                    <rect x="0" y="40" width="408" height="56" rx="8" fill="#0f2e28" />
                    <text x="16" y="74" fill="#ccfbf1" font-family="sans-serif" font-size="13">09:00 AM — Metformin (Taken ✓)</text>
                    <rect x="0" y="106" width="408" height="56" rx="8" fill="#0f2e28" />
                    <text x="16" y="140" fill="#fde047" font-family="sans-serif" font-size="13">01:30 PM — Vitamin D3 (Pending)</text>
                    <rect x="0" y="172" width="408" height="56" rx="8" fill="#0f2e28" />
                    <text x="16" y="206" fill="#99f6e4" font-family="sans-serif" font-size="13">08:00 PM — Atorvastatin (Scheduled)</text>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  `, "sahay.png");

  // 8. SkillSync - 1920x1080
  await renderSvgToPng(`
    <svg width="1920" height="1080" viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ss_bg" x1="0" y1="0" x2="1920" y2="1080" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#0c0a1a" />
          <stop offset="50%" stop-color="#191538" />
          <stop offset="100%" stop-color="#080612" />
        </linearGradient>
      </defs>
      <rect width="1920" height="1080" fill="url(#ss_bg)" />

      <!-- Window Frame -->
      <g transform="translate(96, 60)">
        <rect width="1728" height="960" rx="20" fill="#13102b" stroke="#2c245c" stroke-width="2.5" />
        <rect width="1728" height="60" rx="20" fill="#090717" />
        <path d="M0 40 h1728 v20 h-1728 z" fill="#090717" />
        <circle cx="36" cy="30" r="7" fill="#ef4444" />
        <circle cx="62" cy="30" r="7" fill="#f59e0b" />
        <circle cx="88" cy="30" r="7" fill="#10b981" />
        <text x="864" y="36" fill="#cbd5e1" font-family="sans-serif" font-size="16" font-weight="600" text-anchor="middle">SkillSync — Innovate India 2026 Explainable AI Hackathon Team-Matching Engine</text>

        <!-- Top Header -->
        <g transform="translate(48, 90)">
          <rect width="1632" height="100" rx="14" fill="#1e1845" stroke="#3b2f7d" />
          <g transform="translate(32, 28)">
            <text x="0" y="20" fill="#a78bfa" font-family="monospace" font-size="13" font-weight="bold">INNOVATE INDIA 2026 IDEATION SHORTLIST</text>
            <text x="0" y="48" fill="#f8fafc" font-family="sans-serif" font-size="20" font-weight="bold">Explainable AI Matchmaking: Measuring Skill Complementarity, Schedule Overlap &amp; Experience Level</text>
          </g>
        </g>

        <!-- Match Visualizer -->
        <g transform="translate(48, 220)">
          <!-- Left: Radar / Graph Analysis -->
          <g transform="translate(0, 0)">
            <rect width="800" height="680" rx="14" fill="#181339" stroke="#2c245c" />
            <text x="32" y="44" fill="#c084fc" font-family="monospace" font-size="14" font-weight="bold">MULTI-DIMENSIONAL TALENT GRAPH</text>
            <g transform="translate(40, 80)">
              <circle cx="360" cy="280" r="200" fill="#2e1065" fill-opacity="0.2" stroke="#7c3aed" stroke-width="1.5" stroke-dasharray="4 4" />
              <circle cx="360" cy="280" r="140" fill="#2e1065" fill-opacity="0.3" stroke="#7c3aed" stroke-width="1.5" stroke-dasharray="4 4" />
              <circle cx="360" cy="280" r="70" fill="#2e1065" fill-opacity="0.4" stroke="#7c3aed" stroke-width="1.5" />

              <!-- Graph axes -->
              <line x1="360" y1="80" x2="360" y2="480" stroke="#4c1d95" stroke-width="2" />
              <line x1="160" y1="280" x2="560" y2="280" stroke="#4c1d95" stroke-width="2" />

              <text x="360" y="65" fill="#f8fafc" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle">AI &amp; Algorithms (98%)</text>
              <text x="580" y="285" fill="#f8fafc" font-family="sans-serif" font-size="13" font-weight="bold">Frontend &amp; UX (92%)</text>
              <text x="360" y="510" fill="#f8fafc" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle">Backend &amp; DB (96%)</text>
              <text x="70" y="285" fill="#f8fafc" font-family="sans-serif" font-size="13" font-weight="bold">Cloud &amp; DevOps (90%)</text>

              <!-- Polygon overlap -->
              <polygon points="360,95 530,280 360,460 200,280" fill="#8b5cf6" fill-opacity="0.45" stroke="#a78bfa" stroke-width="3" />
            </g>
          </g>

          <!-- Right: Candidate Details -->
          <g transform="translate(832, 0)">
            <rect width="800" height="680" rx="14" fill="#181339" stroke="#2c245c" />
            <text x="32" y="44" fill="#c084fc" font-family="monospace" font-size="14" font-weight="bold">EXPLAINABLE MATCHING REASONING</text>
            <g transform="translate(32, 80)">
              <rect width="736" height="120" rx="10" fill="#0e0c20" />
              <g transform="translate(24, 24)">
                <text x="0" y="20" fill="#34d399" font-family="sans-serif" font-size="16" font-weight="bold">Why this match is optimal: 96% Match Confidence</text>
                <text x="0" y="48" fill="#cbd5e1" font-family="sans-serif" font-size="13">• Candidate A brings deep learning &amp; FastAPI backend expertise</text>
                <text x="0" y="72" fill="#cbd5e1" font-family="sans-serif" font-size="13">• Candidate B supplies high-fidelity React 19 &amp; Tailwind UI engineering</text>
              </g>

              <rect x="0" y="140" width="736" height="120" rx="10" fill="#0e0c20" />
              <g transform="translate(24, 24)">
                <text x="0" y="20" fill="#38bdf8" font-family="sans-serif" font-size="16" font-weight="bold">Schedule &amp; Commitment Compatibility</text>
                <text x="0" y="48" fill="#cbd5e1" font-family="sans-serif" font-size="13">• Weekend sprint availability: 100% overlap</text>
                <text x="0" y="72" fill="#cbd5e1" font-family="sans-serif" font-size="13">• Preferred track: GenAI / Social Innovation (Mutual)</text>
              </g>

              <rect x="0" y="280" width="736" height="120" rx="10" fill="#0e0c20" />
              <g transform="translate(24, 24)">
                <text x="0" y="20" fill="#facc15" font-family="sans-serif" font-size="16" font-weight="bold">Hackathon Track: Innovate India 2026</text>
                <text x="0" y="48" fill="#cbd5e1" font-family="sans-serif" font-size="13">• Shortlisted for Round 1 Ideation</text>
                <text x="0" y="72" fill="#cbd5e1" font-family="sans-serif" font-size="13">• Built with Next.js, Node.js, Express &amp; MongoDB</text>
              </g>

              <rect x="0" y="430" width="736" height="60" rx="10" fill="#1e1b4b" stroke="#6366f1" />
              <text x="368" y="468" fill="#c7d2fe" font-family="sans-serif" font-size="15" font-weight="bold" text-anchor="middle">✓ One-Click Team Formation Invite Sent</text>
            </g>
          </g>
        </g>
      </g>
    </svg>
  `, "skillsync.png");

  // 9. AQI24 Backend API - 1920x1080
  await renderSvgToPng(`
    <svg width="1920" height="1080" viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ab_bg" x1="0" y1="0" x2="1920" y2="1080" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#040914" />
          <stop offset="50%" stop-color="#08182b" />
          <stop offset="100%" stop-color="#03060c" />
        </linearGradient>
      </defs>
      <rect width="1920" height="1080" fill="url(#ab_bg)" />

      <!-- Window Frame -->
      <g transform="translate(96, 60)">
        <rect width="1728" height="960" rx="20" fill="#0a1424" stroke="#1b365d" stroke-width="2.5" />
        <rect width="1728" height="60" rx="20" fill="#060c17" />
        <path d="M0 40 h1728 v20 h-1728 z" fill="#060c17" />
        <circle cx="36" cy="30" r="7" fill="#ef4444" />
        <circle cx="62" cy="30" r="7" fill="#f59e0b" />
        <circle cx="88" cy="30" r="7" fill="#10b981" />
        <text x="864" y="36" fill="#cbd5e1" font-family="sans-serif" font-size="16" font-weight="600" text-anchor="middle">AQI24 Backend — Environmental Telemetry Ingestion &amp; Wildfire Prediction API Documentation</text>

        <!-- Main Body -->
        <g transform="translate(48, 90)">
          <!-- Left: Endpoints Table -->
          <g transform="translate(0, 0)">
            <rect width="1000" height="810" rx="14" fill="#08101c" stroke="#162947" />
            <text x="32" y="44" fill="#38bdf8" font-family="monospace" font-size="14" font-weight="bold">FASTAPI / EXPRESS ML SERVING ENDPOINTS</text>

            <g transform="translate(32, 70)">
              <!-- Row 1 -->
              <rect width="936" height="70" rx="8" fill="#0d1b30" />
              <rect x="20" y="18" width="70" height="34" rx="6" fill="#065f46" />
              <text x="55" y="40" fill="#6ee7b7" font-family="monospace" font-size="14" font-weight="bold" text-anchor="middle">GET</text>
              <text x="110" y="41" fill="#f8fafc" font-family="monospace" font-size="15" font-weight="600">/api/v1/health</text>
              <text x="560" y="41" fill="#94a3b8" font-family="sans-serif" font-size="13">Station Ingestion Health &amp; DB Sync</text>
              <text x="830" y="41" fill="#34d399" font-family="monospace" font-size="14">200 OK (4ms)</text>

              <!-- Row 2 -->
              <rect y="84" width="936" height="70" rx="8" fill="#0d1b30" />
              <rect x="20" y="102" width="70" height="34" rx="6" fill="#1e40af" />
              <text x="55" y="124" fill="#93c5fd" font-family="monospace" font-size="14" font-weight="bold" text-anchor="middle">POST</text>
              <text x="110" y="125" fill="#f8fafc" font-family="monospace" font-size="15" font-weight="600">/api/v1/predict/wildfire</text>
              <text x="560" y="125" fill="#94a3b8" font-family="sans-serif" font-size="13">LightGBM Real-time Fire Probability</text>
              <text x="830" y="125" fill="#34d399" font-family="monospace" font-size="14">200 OK (28ms)</text>

              <!-- Row 3 -->
              <rect y="168" width="936" height="70" rx="8" fill="#0d1b30" />
              <rect x="20" y="186" width="70" height="34" rx="6" fill="#1e40af" />
              <text x="55" y="208" fill="#93c5fd" font-family="monospace" font-size="14" font-weight="bold" text-anchor="middle">POST</text>
              <text x="110" y="209" fill="#f8fafc" font-family="monospace" font-size="15" font-weight="600">/api/v1/dewpoint/calculate</text>
              <text x="560" y="209" fill="#94a3b8" font-family="sans-serif" font-size="13">Thermodynamic Atmospheric Dew Point</text>
              <text x="830" y="209" fill="#34d399" font-family="monospace" font-size="14">200 OK (11ms)</text>

              <!-- Row 4 -->
              <rect y="252" width="936" height="70" rx="8" fill="#0d1b30" />
              <rect x="20" y="270" width="70" height="34" rx="6" fill="#065f46" />
              <text x="55" y="292" fill="#6ee7b7" font-family="monospace" font-size="14" font-weight="bold" text-anchor="middle">GET</text>
              <text x="110" y="293" fill="#f8fafc" font-family="monospace" font-size="15" font-weight="600">/api/v1/stations/live</text>
              <text x="560" y="293" fill="#94a3b8" font-family="sans-serif" font-size="13">Supabase Timescale Stream across India</text>
              <text x="830" y="293" fill="#34d399" font-family="monospace" font-size="14">200 OK (18ms)</text>

              <!-- Swagger / Schema Preview -->
              <g transform="translate(0, 340)">
                <rect width="936" height="360" rx="10" fill="#040812" />
                <g transform="translate(24, 28)">
                  <text x="0" y="20" fill="#38bdf8" font-family="monospace" font-size="14">// Response Payload: POST /predict/wildfire</text>
                  <text x="0" y="48" fill="#e2e8f0" font-family="monospace" font-size="13">{</text>
                  <text x="24" y="74" fill="#a5b4fc" font-family="monospace" font-size="13">"station_id": <tspan fill="#34d399">"IN_DEL_042"</tspan>,</text>
                  <text x="24" y="100" fill="#a5b4fc" font-family="monospace" font-size="13">"fire_risk_index": <tspan fill="#f59e0b">0.87</tspan>,</text>
                  <text x="24" y="126" fill="#a5b4fc" font-family="monospace" font-size="13">"severity": <tspan fill="#ef4444">"HIGH_RISK"</tspan>,</text>
                  <text x="24" y="152" fill="#a5b4fc" font-family="monospace" font-size="13">"dew_point_celsius": <tspan fill="#38bdf8">14.6</tspan>,</text>
                  <text x="24" y="178" fill="#a5b4fc" font-family="monospace" font-size="13">"model_confidence": <tspan fill="#34d399">0.94</tspan>,</text>
                  <text x="24" y="204" fill="#a5b4fc" font-family="monospace" font-size="13">"inference_latency_ms": <tspan fill="#34d399">28.4</tspan></text>
                  <text x="0" y="230" fill="#e2e8f0" font-family="monospace" font-size="13">}</text>
                  <text x="0" y="270" fill="#10b981" font-family="monospace" font-size="13">✓ Rate Limiter: 100 req/min per API key • JWT Auth Enforced</text>
                </g>
              </g>
            </g>
          </g>

          <!-- Right: Architecture Stack -->
          <g transform="translate(1030, 0)">
            <rect width="602" height="810" rx="14" fill="#08101c" stroke="#162947" />
            <text x="32" y="44" fill="#38bdf8" font-family="monospace" font-size="14" font-weight="bold">ARCHITECTURE &amp; DATA PIPELINE</text>

            <g transform="translate(32, 80)">
              <rect width="538" height="100" rx="10" fill="#0d1b30" />
              <g transform="translate(20, 24)">
                <text x="0" y="20" fill="#f8fafc" font-family="sans-serif" font-size="16" font-weight="bold">High-Throughput Ingestion</text>
                <text x="0" y="46" fill="#94a3b8" font-family="sans-serif" font-size="13">Scrapes 400+ CPCB monitoring stations hourly</text>
              </g>

              <rect y="120" width="538" height="100" rx="10" fill="#0d1b30" />
              <g transform="translate(20, 24)">
                <text x="0" y="20" fill="#f8fafc" font-family="sans-serif" font-size="16" font-weight="bold">LightGBM &amp; scikit-learn Models</text>
                <text x="0" y="46" fill="#94a3b8" font-family="sans-serif" font-size="13">4 trained models for wildfire &amp; pollutant forecasting</text>
              </g>

              <rect y="240" width="538" height="100" rx="10" fill="#0d1b30" />
              <g transform="translate(20, 24)">
                <text x="0" y="20" fill="#f8fafc" font-family="sans-serif" font-size="16" font-weight="bold">Supabase PostgreSQL + RLS</text>
                <text x="0" y="46" fill="#94a3b8" font-family="sans-serif" font-size="13">Partitioned geospatial timeseries schema</text>
              </g>

              <rect y="360" width="538" height="100" rx="10" fill="#0d1b30" />
              <g transform="translate(20, 24)">
                <text x="0" y="20" fill="#f8fafc" font-family="sans-serif" font-size="16" font-weight="bold">Dockerized Microservice</text>
                <text x="0" y="46" fill="#94a3b8" font-family="sans-serif" font-size="13">Multi-stage Alpine image with health probes</text>
              </g>

              <rect y="480" width="538" height="200" rx="10" fill="#042f2e" stroke="#059669" />
              <g transform="translate(20, 30)">
                <text x="0" y="20" fill="#34d399" font-family="sans-serif" font-size="18" font-weight="bold">Production Benchmark</text>
                <text x="0" y="50" fill="#ccfbf1" font-family="sans-serif" font-size="13">• Median latency: 12ms</text>
                <text x="0" y="76" fill="#ccfbf1" font-family="sans-serif" font-size="13">• P99 latency: 34ms</text>
                <text x="0" y="102" fill="#ccfbf1" font-family="sans-serif" font-size="13">• Zero memory leaks over 72h soak test</text>
                <text x="0" y="128" fill="#ccfbf1" font-family="sans-serif" font-size="13">• 100% automated test coverage with Pytest</text>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  `, "aqi24-backend.png");

  console.log("ALL HIGH-RESOLUTION 1920x1080 MOCKUPS RENDERED SUCCESSFULLY!");
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
