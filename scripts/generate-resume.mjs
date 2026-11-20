import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

function generateResume(outputPath) {
  return new Promise((resolve, reject) => {
    // Standard A4: 595.28 x 841.89 points
    const doc = new PDFDocument({
      size: "A4",
      margins: { top: 32, bottom: 32, left: 36, right: 36 },
      info: {
        Title: "Sanjai — AI & Full Stack Systems Engineer Resume",
        Author: "Sanjai",
        Subject: "Professional Software Engineering Resume",
        Keywords: "Sanjai, Full Stack, AI, Machine Learning, Next.js, TypeScript, Python",
      },
    });

    const stream = fs.createWriteStream(outputPath);
    doc.pipe(stream);

    const primaryColor = "#0f172a"; // slate-900
    const secondaryColor = "#2563eb"; // blue-600
    const textColor = "#1e293b"; // slate-800
    const mutedColor = "#475569"; // slate-600
    const lightMuted = "#64748b"; // slate-500
    const dividerColor = "#cbd5e1"; // slate-300

    const contentWidth = 595.28 - 72; // 523.28 pt

    // --- HEADER ---
    doc
      .fillColor(primaryColor)
      .font("Helvetica-Bold")
      .fontSize(22)
      .text("SANJAI", { characterSpacing: 1.5 });

    doc
      .fillColor(secondaryColor)
      .font("Helvetica-Bold")
      .fontSize(10.5)
      .text("AI & DATA SCIENCE ENGINEER | FULL-STACK SYSTEMS & AUTONOMOUS AI AGENT BUILDER", {
        characterSpacing: 0.5,
      });

    doc.moveDown(0.2);

    // Contact info line 1
    doc
      .fillColor(mutedColor)
      .font("Helvetica")
      .fontSize(9)
      .text("Coimbatore, Tamil Nadu, India  •  +91 9363265552  •  ", { continued: true })
      .fillColor(secondaryColor)
      .text("sanjai.sparkmail@gmail.com", { link: "mailto:sanjai.sparkmail@gmail.com", underline: false });

    // Contact info line 2 (Links)
    doc
      .fillColor(mutedColor)
      .font("Helvetica")
      .fontSize(9)
      .text("Portfolio: ", { continued: true })
      .fillColor(secondaryColor)
      .text("sanjaibuilds.cv", { link: "https://www.sanjaibuilds.cv/", continued: true })
      .fillColor(mutedColor)
      .text("  •  GitHub: ", { continued: true })
      .fillColor(secondaryColor)
      .text("github.com/Sanjai-Gopal", { link: "https://github.com/Sanjai-Gopal", continued: true })
      .fillColor(mutedColor)
      .text("  •  LinkedIn: ", { continued: true })
      .fillColor(secondaryColor)
      .text("linkedin.com/in/sanjai-dev", { link: "https://linkedin.com/in/sanjai-dev" });

    // Section helper
    function renderSectionHeader(title) {
      doc.moveDown(0.4);
      const y = doc.y;
      doc
        .fillColor(primaryColor)
        .font("Helvetica-Bold")
        .fontSize(10.5)
        .text(title.toUpperCase(), { characterSpacing: 0.8 });
      
      doc
        .strokeColor(secondaryColor)
        .lineWidth(1.2)
        .moveTo(36, doc.y + 1)
        .lineTo(36 + contentWidth, doc.y + 1)
        .stroke();
      doc.moveDown(0.3);
    }

    // --- SUMMARY ---
    renderSectionHeader("Professional Summary");
    doc
      .fillColor(textColor)
      .font("Helvetica")
      .fontSize(8.7)
      .lineGap(1.2)
      .text(
        "2nd-year B.Tech AI & Data Science student at SKCET (9.0 CGPA) building production-grade web platforms, autonomous AI agents, and competitive hackathon systems. Proficient across Next.js 16, TypeScript, Python AI/ML pipelines, OpenTelemetry observability, and cloud architectures with a proven track record of shipping deployed, high-impact applications."
      );

    // --- EDUCATION ---
    renderSectionHeader("Education");
    doc
      .fillColor(primaryColor)
      .font("Helvetica-Bold")
      .fontSize(9.5)
      .text("Sri Krishna College of Engineering and Technology (SKCET)", 36, doc.y, { continued: true })
      .font("Helvetica")
      .fillColor(mutedColor)
      .text("  — Coimbatore, Tamil Nadu", { align: "left" });

    doc
      .fillColor(textColor)
      .font("Helvetica-Bold")
      .fontSize(8.8)
      .text("Bachelor of Technology (B.Tech), Artificial Intelligence and Data Science", { continued: true })
      .font("Helvetica")
      .fillColor(secondaryColor)
      .text("  •  CGPA: 9.0 / 10", { continued: true })
      .fillColor(mutedColor)
      .text("  •  Expected Graduation: 2029 (2nd Year)");

    doc
      .fillColor(mutedColor)
      .font("Helvetica")
      .fontSize(8.2)
      .text("Relevant Coursework: Data Structures & Algorithms, Object-Oriented Programming, Machine Learning, Database Management Systems, Web Architecture.");

    // --- TECHNICAL SKILLS ---
    renderSectionHeader("Technical Skills");
    const skillCategories = [
      { label: "Languages", value: "Python, TypeScript, JavaScript, SQL, C++, Java" },
      { label: "AI & Data Science", value: "Autonomous Agents, Machine Learning, Deep Learning, LangChain, TensorFlow, Scikit-learn, Vector DBs, Pandas" },
      { label: "Frontend", value: "Next.js 16 (App Router), React 19, Tailwind CSS v4, HTML5/CSS3, Shadcn UI, Motion, Responsive Design" },
      { label: "Backend & Systems", value: "Node.js, Express.js, FastAPI, REST APIs, Supabase, PostgreSQL, MongoDB, Docker, Git, CI/CD, Postman, Vercel" },
      { label: "Tools & Practices", value: "OpenTelemetry, Vitest, Git/GitHub, Linux/Bash, JWT & Argon2 Security, Agile, Figma, Vercel Edge Runtime" },
    ];

    skillCategories.forEach(cat => {
      doc
        .font("Helvetica-Bold")
        .fillColor(primaryColor)
        .fontSize(8.6)
        .text(`${cat.label}: `, { continued: true })
        .font("Helvetica")
        .fillColor(textColor)
        .text(cat.value, { lineGap: 1 });
    });

    // --- FEATURED PROJECTS ---
    renderSectionHeader("Featured Projects");

    function renderProject(title, tech, roleHighlight, bullets, links) {
      // Title row
      doc
        .font("Helvetica-Bold")
        .fillColor(primaryColor)
        .fontSize(9.3)
        .text(title, { continued: true });

      if (roleHighlight) {
        doc
          .font("Helvetica-Bold")
          .fillColor(secondaryColor)
          .fontSize(8.5)
          .text(`  [${roleHighlight}]`, { continued: true });
      }

      if (links && links.length > 0) {
        doc.font("Helvetica").fontSize(8.2).fillColor(mutedColor).text("  •  ", { continued: true });
        links.forEach((l, idx) => {
          doc
            .fillColor(secondaryColor)
            .text(l.label, { link: l.url, underline: true, continued: idx < links.length - 1 });
          if (idx < links.length - 1) {
            doc.fillColor(mutedColor).text(" | ", { continued: true });
          }
        });
      } else {
        doc.text("");
      }

      // Tech Stack
      doc
        .font("Helvetica-Oblique")
        .fillColor(mutedColor)
        .fontSize(8.2)
        .text(`Tech: ${tech}`);

      // Bullets
      bullets.forEach(b => {
        doc
          .font("Helvetica")
          .fillColor(textColor)
          .fontSize(8.4)
          .lineGap(1)
          .text(`•  ${b}`, { indent: 8 });
      });
      doc.moveDown(0.2);
    }

    renderProject(
      "CareNest AI — Healthcare Management Ecosystem",
      "Next.js 16, React 19, Creative AI Agents, TypeScript, Tailwind CSS, Vercel",
      "Comprehensive Clinical Platform",
      [
        "Engineered an autonomous clinical assistant ecosystem featuring multilingual patient guidance, symptom triage, emergency routing, and automated appointment scheduling.",
        "Integrated multi-model AI agent workflows for automated prescription parsing, patient record security, and localized emergency alerts across 7 Indian regional languages.",
      ],
      [
        { label: "Live Demo", url: "https://catalyst-hackathon-lime.vercel.app" },
        { label: "GitHub", url: "https://github.com/Sanjai-Gopal/catalyst-hackathon" },
      ]
    );

    renderProject(
      "Swasthya Sathi AI — National Rural Health Telemetry",
      "React 19, AI Autonomous Agents, Real-Time Telemetry, Supabase, Vercel",
      "Rural Healthcare Coordination",
      [
        "Architected an AI-driven rural medical coordination portal facilitating rapid medical advisory, multi-district clinic triage, and automated emergency dispatch.",
        "Implemented low-bandwidth offline resilience and real-time state synchronization for community health centers.",
      ],
      [
        { label: "Live Demo", url: "https://swasthya-sathi-ai-one.vercel.app" },
        { label: "GitHub", url: "https://github.com/Sanjai-Gopal/Swasthya-Sathi-AI" },
      ]
    );

    renderProject(
      "NovaPulse AI — Distributed Observability SaaS",
      "React, TypeScript, OpenTelemetry OTLP, Supabase RLS, Razorpay Subscriptions",
      "Production APM Platform",
      [
        "Developed full-featured telemetry & API observability SaaS monitoring distributed microservices with real-time latency ping checks (p99 18ms) and incident alerting.",
        "Implemented PostgreSQL Row-Level Security (RLS) data isolation, Razorpay subscription checkout, and live OTel span trace waterfalls.",
      ],
      [
        { label: "GitHub", url: "https://github.com/Sanjai-Gopal/novapulse-saas" },
      ]
    );

    renderProject(
      "ComplyAI — Bureau of Indian Standards (BIS) Verification",
      "Next.js, Python, Multimodal Vision AI, RAG Knowledge Graph, Vector DB",
      "3rd Prize Winner (BIS Hackathon)",
      [
        "Built a multimodal AI verification engine enabling consumers to scan ISI marks, hallmarks, and barcodes to cross-reference against official BIS national registries in real time.",
        "Awarded 3rd Prize in Intercollege Hackathon (BIS) for technical architecture, consumer impact, and automated fraud reporting.",
      ],
      [
        { label: "GitHub", url: "https://github.com/Sanjai-Gopal" },
      ]
    );

    renderProject(
      "AQI24 & Prediction ML Engine — Environmental Intelligence",
      "Node.js, Express.js, PostgreSQL, Supabase, REST APIs, Machine Learning",
      "Live Platform & API",
      [
        "Deployed a real-time air quality intelligence platform with interactive station heatmaps and a dedicated Wildfire Risk & Dew Point Prediction ML API.",
      ],
      [
        { label: "Live Demo", url: "https://aqi-24.vercel.app/" },
        { label: "GitHub", url: "https://github.com/Sanjai-Gopal/AQI24" },
      ]
    );

    // --- ACHIEVEMENTS & CERTIFICATIONS ---
    renderSectionHeader("Achievements & Certifications");

    const achievements = [
      "3rd Prize in Intercollege Hackathon (BIS) — Awarded by Bureau of Indian Standards for ComplyAI smart consumer verification platform.",
      "Rank 17 (Top 4%) — Departmental Competitive Programming & Data Structures Hackathon at SKCET.",
      "Published Open-Source Package (dimsee) — Authored and published drop-in full-stack auth npm package with Argon2 and JWT cookie security.",
      "Google AI Essentials & Google Data Analytics Professional Certificates (Coursera).",
      "Generative AI for Web Development Specialization • Python for Data Science (NPTEL) • Getting Started with Git & GitHub (IBM).",
    ];

    achievements.forEach(ach => {
      doc
        .font("Helvetica")
        .fillColor(textColor)
        .fontSize(8.3)
        .lineGap(1)
        .text(`•  ${ach}`, { indent: 8 });
    });

    doc.end();

    stream.on("finish", () => {
      console.log(`Resume generated successfully at ${outputPath}`);
      resolve();
    });
    stream.on("error", reject);
  });
}

async function run() {
  const scratchTarget = "C:/Users/sanja/.gemini/antigravity/scratch/sanjai.dev/public/resume.pdf";
  const downloadsTarget1 = "C:/Users/sanja/Downloads/resume_11zon.pdf";
  const downloadsTarget2 = "C:/Users/sanja/Downloads/resume.pdf";

  await generateResume(scratchTarget);
  fs.copyFileSync(scratchTarget, downloadsTarget1);
  fs.copyFileSync(scratchTarget, downloadsTarget2);
  console.log("Copied resume to Downloads folder for instant editor update!");
}

run().catch(console.error);
