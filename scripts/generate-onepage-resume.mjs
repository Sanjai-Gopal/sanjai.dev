import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

function generateOnePageResume(outputPath) {
  return new Promise((resolve, reject) => {
    // Standard A4: 595.28 x 841.89 points
    const doc = new PDFDocument({
      size: "A4",
      margins: { top: 26, bottom: 20, left: 36, right: 36 },
      bufferPages: true,
      info: {
        Title: "Sanjai — Professional Resume",
        Author: "Sanjai",
        Subject: "AI & Data Science Student | Full-Stack Systems & Creative AI Agent Builder",
      },
    });

    const stream = fs.createWriteStream(outputPath);
    doc.pipe(stream);

    const primaryColor = "#1a365d"; // deep navy
    const secondaryColor = "#2563eb"; // vibrant blue for links
    const textColor = "#1f2937"; // dark charcoal for body
    const mutedColor = "#4b5563"; // gray-600

    const left = 36;
    const contentWidth = 595.28 - 72; // 523.28 pt

    function renderSectionHeader(title) {
      doc.moveDown(0.22);
      doc
        .fillColor(primaryColor)
        .font("Helvetica-Bold")
        .fontSize(9)
        .text(title, left);

      const lineY = doc.y + 1;
      doc
        .moveTo(left, lineY)
        .lineTo(left + contentWidth, lineY)
        .lineWidth(0.8)
        .strokeColor(primaryColor)
        .stroke();

      doc.y = lineY + 3;
    }

    // --- TOP HEADER ---
    const startY = 26;

    // Photo on the top right
    const photoPath = "C:/Users/sanja/.gemini/antigravity/scratch/sanjai.dev/public/me.jpg";
    const photoWidth = 62;
    const photoHeight = 74;
    const photoX = left + contentWidth - photoWidth;
    const photoY = startY;

    if (fs.existsSync(photoPath)) {
      doc.save();
      doc.roundedRect(photoX, photoY, photoWidth, photoHeight, 6).clip();
      doc.image(photoPath, photoX, photoY, { width: photoWidth, height: photoHeight });
      doc.restore();

      doc
        .roundedRect(photoX, photoY, photoWidth, photoHeight, 6)
        .lineWidth(0.8)
        .strokeColor("#94a3b8")
        .stroke();
    }

    // Name & Title on top left
    doc
      .fillColor(primaryColor)
      .font("Helvetica-Bold")
      .fontSize(21)
      .text("SANJAI", left, startY + 1);

    doc.moveDown(0.12);
    doc
      .fillColor(primaryColor)
      .font("Helvetica")
      .fontSize(9.2)
      .text("AI & Data Science Student  |  Full-Stack Developer & Creative AI Agent Builder", left);

    doc.moveDown(0.15);
    doc
      .fillColor(mutedColor)
      .font("Helvetica")
      .fontSize(8.1)
      .text("Coimbatore, Tamil Nadu, India   |   +91 9363265552   |   sanjai.sparkmail@gmail.com", left);

    doc.moveDown(0.15);
    doc
      .font("Helvetica")
      .fontSize(8.3)
      .fillColor(secondaryColor)
      .text("GitHub", left, doc.y, { link: "https://github.com/Sanjai-Gopal", underline: true, continued: true })
      .fillColor(mutedColor)
      .text("   |   ", { underline: false, continued: true })
      .fillColor(secondaryColor)
      .text("LinkedIn", { link: "https://www.linkedin.com/in/sanjai2306/", underline: true, continued: true })
      .fillColor(mutedColor)
      .text("   |   ", { underline: false, continued: true })
      .fillColor(secondaryColor)
      .text("Portfolio (sanjaibuilds.cv)", { link: "https://www.sanjaibuilds.cv/", underline: true });

    // --- SUMMARY BOX ---
    doc.y = startY + 79;
    const summaryBoxY = doc.y;
    const summaryText =
      "2nd-year B.Tech Artificial Intelligence and Data Science student at SKCET (9.0 CGPA) building production-ready web platforms, autonomous AI agents, and competitive hackathon systems. Experienced across the modern TypeScript/Next.js 16 ecosystem, Python-based AI/ML pipelines, OpenTelemetry observability, and cloud databases. Active hackathon competitor with ISRO, UNESCO, Google for Developers, and BIS with a consistent record of shipping deployed, high-impact products.";

    doc
      .fillColor(textColor)
      .font("Helvetica")
      .fontSize(7.7)
      .lineGap(1.2)
      .text(summaryText, left + 8, summaryBoxY + 4.5, {
        width: contentWidth - 16,
        align: "left",
      });

    const summaryBoxHeight = doc.y - summaryBoxY + 3.5;
    doc
      .roundedRect(left, summaryBoxY, contentWidth, summaryBoxHeight, 4)
      .lineWidth(0.7)
      .strokeColor("#94a3b8")
      .stroke();

    doc.y = summaryBoxY + summaryBoxHeight + 1.5;

    // --- EDUCATION ---
    renderSectionHeader("EDUCATION");

    doc
      .fillColor(textColor)
      .font("Helvetica-Bold")
      .fontSize(8.4)
      .text("Sri Krishna College of Engineering and Technology (SKCET)", left, doc.y, { continued: true })
      .font("Helvetica")
      .fillColor(mutedColor)
      .text("  — Coimbatore, Tamil Nadu");

    doc
      .fillColor(textColor)
      .font("Helvetica")
      .fontSize(7.9)
      .text("Bachelor of Technology (B.Tech), Artificial Intelligence and Data Science", left, doc.y, { continued: true })
      .font("Helvetica-Bold")
      .fillColor(primaryColor)
      .text("   •   CGPA: 9.0 / 10", { continued: true })
      .font("Helvetica")
      .fillColor(mutedColor)
      .text("   •   Expected Graduation: 2029 (2nd Year)");

    doc
      .fillColor(mutedColor)
      .font("Helvetica")
      .fontSize(7.4)
      .text("Relevant Coursework: Data Structures & Algorithms, Object-Oriented Programming (C++), Machine Learning, Database Management Systems (DBMS), Web Architecture, Discrete Mathematics.");

    // --- TECHNICAL SKILLS ---
    renderSectionHeader("TECHNICAL SKILLS");

    const skills = [
      { label: "Programming Languages:", value: "Python, TypeScript, JavaScript (ES6+), SQL, C++, Java, HTML5, CSS3" },
      { label: "AI, Agents & Data Science:", value: "Creative AI Agents, Deep Learning, Neural Networks, LangChain, TensorFlow, Scikit-learn, NumPy, Pandas, Vector DBs, Prompt Engineering" },
      { label: "Full-Stack & Frontend:", value: "Next.js 16 (App Router), React 19, Tailwind CSS v4, Vite, REST APIs, Supabase RLS, PostgreSQL, MongoDB, Docker" },
      { label: "Tools, DevOps & Practices:", value: "OpenTelemetry, Git/GitHub Actions, Vercel, Render, Postman, Vitest, Linux/Bash, Figma, JWT & Argon2 Security" },
    ];

    skills.forEach(s => {
      doc
        .fillColor(textColor)
        .font("Helvetica-Bold")
        .fontSize(7.7)
        .text(s.label, left, doc.y, { continued: true })
        .font("Helvetica")
        .fillColor(textColor)
        .text(`  ${s.value}`, { lineGap: 0.3 });
    });

    // --- PROJECTS ---
    renderSectionHeader("KEY PROJECTS");

    function renderProject(title, highlight, tech, links, bullets) {
      doc
        .fillColor(primaryColor)
        .font("Helvetica-Bold")
        .fontSize(8.2)
        .text(title, left, doc.y, { continued: true });

      if (highlight) {
        doc
          .font("Helvetica-Bold")
          .fillColor(secondaryColor)
          .fontSize(7.6)
          .text(`  [${highlight}]`, { continued: true });
      }

      if (links && links.length > 0) {
        doc.font("Helvetica").fillColor(mutedColor).fontSize(7.4).text("   •   ", { continued: true });
        links.forEach((l, idx) => {
          doc
            .fillColor(secondaryColor)
            .text(l.label, { link: l.url, underline: true, continued: idx < links.length - 1 });
          if (idx < links.length - 1) {
            doc.fillColor(mutedColor).text("   |   ", { underline: false, continued: true });
          }
        });
      } else {
        doc.text("");
      }

      doc
        .font("Helvetica-Oblique")
        .fillColor(mutedColor)
        .fontSize(7.3)
        .text(`Technologies: ${tech}`);

      bullets.forEach(b => {
        doc
          .fillColor(textColor)
          .font("Helvetica")
          .fontSize(7.5)
          .lineGap(0.4)
          .text(`•  ${b}`, left + 4, doc.y, { width: contentWidth - 4 });
      });
      doc.moveDown(0.08);
    }

    renderProject(
      "CareNest AI — Healthcare Management Ecosystem",
      "PromptWars × Catalyst Solo Hackathon",
      "React, TypeScript, Tailwind CSS, Google for Developers, CareTech, Lighthouse 100",
      [
        { label: "Live Demo", url: "https://catalyst-hackathon-lime.vercel.app" },
        { label: "GitHub", url: "https://github.com/Sanjai-Gopal/catalyst-hackathon" },
      ],
      [
        "Engineered an autonomous clinical assistant ecosystem featuring multilingual guidance across 7 regional languages, symptom triage, emergency routing, and automated appointment scheduling.",
        "Built for Catalyst Solo Hackathon (powered by Google for Developers × Hack2Skill × MnM), achieving 100/100 Lighthouse performance and strict WCAG accessibility compliance.",
      ]
    );

    renderProject(
      "Swasthya Sathi AI — National Rural Health Telemetry",
      "Bilingual Autonomous AI Agent",
      "Python, FastAPI, React, Vite, Creative AI Agents, SQLAlchemy, SQLite, REST APIs",
      [
        { label: "Live Demo", url: "https://swasthya-sathi-ai-one.vercel.app" },
        { label: "GitHub", url: "https://github.com/Sanjai-Gopal/Swasthya-Sathi-AI" },
      ],
      [
        "Architected an AI-powered healthcare workforce monitoring platform for rural clinics with an autonomous tool-calling AI agent supporting bilingual (Hindi & English) natural-language queries.",
        "Integrated automated attendance auditing, supervisor operational broadcasts, and low-bandwidth offline resilience for community health centers.",
      ]
    );

    renderProject(
      "ComplyAI — Bureau of Indian Standards (BIS) Verification",
      "3rd Prize Winner in Intercollege Hackathon (BIS)",
      "Next.js, Python, Multimodal Vision AI, OCR Parsing, RAG Knowledge Graph, Vector DB",
      [
        { label: "3rd Prize Announcement", url: "https://www.sanjaibuilds.cv/#achievements" },
        { label: "GitHub", url: "https://github.com/Sanjai-Gopal" },
      ],
      [
        "Developed a multimodal AI verification platform enabling consumers to scan ISI marks, hallmarks, and barcodes to cross-reference authenticity against official BIS national registries in real time.",
        "Awarded 3rd Prize at the Bureau of Indian Standards (BIS) Smart Consumer intercollege competition for technical design and automated fraud detection.",
      ]
    );

    renderProject(
      "AQI24 & Prediction ML Engine — Environmental Intelligence",
      "Real-Time Telemetry & ML API",
      "React, TypeScript, Node.js, Express.js, PostgreSQL, Supabase, Chart.js, ML Pipelines",
      [
        { label: "Live Demo", url: "https://aqi-24.vercel.app/" },
        { label: "Frontend", url: "https://github.com/Sanjai-Gopal/AQI24" },
        { label: "Backend", url: "https://github.com/Sanjai-Gopal/backend_aqi24" },
      ],
      [
        "Deployed a real-time air quality intelligence platform for India with interactive geospatial telemetry mapping, pollutant trends, and automated station sensor health checks.",
        "Designed and implemented high-throughput RESTful APIs with database pooling and machine learning endpoints for wildfire risk forecasting.",
      ]
    );

    // --- ACHIEVEMENTS & HACKATHONS ---
    renderSectionHeader("ACHIEVEMENTS & HACKATHON TRACK RECORD");

    const achievements = [
      "• 3rd Prize in Intercollege Hackathon (BIS) [Bureau of Indian Standards] — Awarded for ComplyAI smart consumer verification platform.",
      "• National Rank 17 (96% Score / 95.97 out of 100) — Data Science & Machine Learning Assessment Test by Infotact Solutions (ISO 9001:2015).",
      "• ISRO Bharatiya Antariksh Hackathon 2026 & UNESCO Youth Hackathon 2026 — Competed across national space-domain and global innovation challenges.",
      "• Published Open-Source NPM Package (dimsee) — Authored and released drop-in MERN authentication package with JWT cookies and Argon2 security.",
      "• PromptWars × Catalyst Solo Hackathon (Google for Developers) & Hacker House Goa 2026 — Active competitive builder shipping deployed products.",
    ];

    achievements.forEach(a => {
      doc
        .fillColor(textColor)
        .font("Helvetica")
        .fontSize(7.4)
        .text(a, left + 4, doc.y, { lineGap: 0.3 });
    });

    // --- CERTIFICATIONS ---
    renderSectionHeader("VERIFIED PROFESSIONAL CERTIFICATIONS");

    const certs = [
      "• DeepLearning.AI (Andrew Ng) Deep Learning Specialization (Neural Networks, Hyperparameter Tuning & ML Projects)",
      "• NPTEL IIT Madras: Python for Data Science (Elite 70% Score Certification)   • Saylor Academy: CS205 Building with AI (92.16%)",
      "• Google AI Essentials & Google Data Analytics Professional Certificates   • Scrimba: Generative AI for Web Development",
      "• IBM: Getting Started with Git & GitHub, Cloud Computing   • IIT Bombay Alumni & AICTSD: Certificate of Cognitive Aptitude (Excellent IQ)",
    ];

    certs.forEach(c => {
      doc
        .fillColor(textColor)
        .font("Helvetica")
        .fontSize(7.4)
        .text(c, left + 4, doc.y, { lineGap: 0.3 });
    });

    // Footer at exact bottom without triggering new page
    const range = doc.bufferedPageRange();
    console.log(`Document has ${range.count} pages.`);

    doc.end();

    stream.on("finish", () => {
      console.log(`One-page professional resume generated at ${outputPath}`);
      resolve(range.count);
    });
    stream.on("error", reject);
  });
}

async function run() {
  const scratchTarget = "C:/Users/sanja/.gemini/antigravity/scratch/sanjai.dev/public/resume.pdf";
  const downloadsTarget1 = "C:/Users/sanja/Downloads/resume_11zon.pdf";
  const downloadsTarget2 = "C:/Users/sanja/Downloads/resume.pdf";

  const count = await generateOnePageResume(scratchTarget);
  fs.copyFileSync(scratchTarget, downloadsTarget1);
  fs.copyFileSync(scratchTarget, downloadsTarget2);
  console.log(`Synced 1-page resume (${count} pages) to Downloads!`);
}

run().catch(console.error);
