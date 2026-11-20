import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

function generateComprehensiveResume(outputPath) {
  return new Promise((resolve, reject) => {
    // Standard A4: 595.28 x 841.89 points
    const doc = new PDFDocument({
      size: "A4",
      margins: { top: 32, bottom: 32, left: 38, right: 38 },
      autoFirstPage: true,
      info: {
        Title: "Sanjai — Professional Resume",
        Author: "Sanjai",
        Subject: "AI & Data Science Student | Full-Stack & Creative AI Agent Engineer",
        Keywords: "Sanjai, Full Stack, AI, Machine Learning, Next.js, TypeScript, Python, SKCET",
      },
    });

    const stream = fs.createWriteStream(outputPath);
    doc.pipe(stream);

    const primaryColor = "#1a365d"; // deep navy/slate
    const secondaryColor = "#2563eb"; // blue for links
    const textColor = "#1f2937"; // dark charcoal for body
    const mutedColor = "#4b5563"; // gray-600
    const lightMuted = "#6b7280"; // gray-500

    const left = 38;
    const contentWidth = 595.28 - 76; // 519.28 pt

    // Helper for Section Headers
    function renderSectionHeader(title) {
      doc.moveDown(0.35);
      doc
        .fillColor(primaryColor)
        .font("Helvetica-Bold")
        .fontSize(9.5)
        .text(title, left);

      const lineY = doc.y + 1;
      doc
        .moveTo(left, lineY)
        .lineTo(left + contentWidth, lineY)
        .lineWidth(0.9)
        .strokeColor(primaryColor)
        .stroke();

      doc.y = lineY + 3.5;
    }

    // Helper for Footer
    function renderFooter(pageNum, totalPages) {
      const footerY = 841.89 - 24;
      doc
        .fillColor(lightMuted)
        .font("Helvetica")
        .fontSize(7.5)
        .text(`Sanjai — Curriculum Vitae  •  https://www.sanjaibuilds.cv/`, left, footerY, {
          width: contentWidth - 80,
        })
        .text(`Page ${pageNum} of ${totalPages}`, left + contentWidth - 60, footerY, {
          width: 60,
          align: "right",
        });
    }

    // ==========================================
    // PAGE 1: Core Profile, Education, Skills & Top Projects
    // ==========================================

    const startY = 32;

    // Photo on the top right
    const photoPath = "C:/Users/sanja/.gemini/antigravity/scratch/sanjai.dev/public/me.jpg";
    const photoWidth = 68;
    const photoHeight = 80;
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

    // Header Text on top left
    doc
      .fillColor(primaryColor)
      .font("Helvetica-Bold")
      .fontSize(22)
      .text("SANJAI", left, startY + 1);

    doc.moveDown(0.18);
    doc
      .fillColor(primaryColor)
      .font("Helvetica")
      .fontSize(9.5)
      .text("AI & Data Science Student  |  Full-Stack Developer & Creative AI Agent Builder", left);

    doc.moveDown(0.2);
    doc
      .fillColor(mutedColor)
      .font("Helvetica")
      .fontSize(8.3)
      .text("Coimbatore, Tamil Nadu, India   |   +91 9363265552   |   sanjai.sparkmail@gmail.com", left);

    doc.moveDown(0.2);
    doc
      .font("Helvetica")
      .fontSize(8.5)
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

    // Summary Box
    doc.y = startY + 86;
    const summaryBoxY = doc.y;
    const summaryText =
      "2nd-year B.Tech Artificial Intelligence and Data Science student at SKCET (9.0 CGPA) building production-ready web platforms, autonomous AI agents, and competitive hackathon systems. Experienced across the modern TypeScript/Next.js 16 ecosystem, Python-based AI/ML pipelines, OpenTelemetry observability, and cloud databases. Active hackathon competitor with ISRO, UNESCO, Google for Developers, and BIS with a consistent record of shipping deployed, high-impact products.";

    doc
      .fillColor(textColor)
      .font("Helvetica")
      .fontSize(8)
      .lineGap(1.4)
      .text(summaryText, left + 8, summaryBoxY + 5, {
        width: contentWidth - 16,
        align: "left",
      });

    const summaryBoxHeight = doc.y - summaryBoxY + 4;
    doc
      .roundedRect(left, summaryBoxY, contentWidth, summaryBoxHeight, 4)
      .lineWidth(0.7)
      .strokeColor("#94a3b8")
      .stroke();

    doc.y = summaryBoxY + summaryBoxHeight + 2;

    // --- EDUCATION ---
    renderSectionHeader("EDUCATION");

    doc
      .fillColor(textColor)
      .font("Helvetica-Bold")
      .fontSize(8.8)
      .text("Sri Krishna College of Engineering and Technology (SKCET)", left, doc.y, { continued: true })
      .font("Helvetica")
      .fillColor(mutedColor)
      .text("  — Coimbatore, Tamil Nadu");

    doc
      .fillColor(textColor)
      .font("Helvetica")
      .fontSize(8.3)
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
      .fontSize(7.9)
      .text("Relevant Coursework: Data Structures & Algorithms, Object-Oriented Programming (C++), Machine Learning, Database Management Systems (DBMS), Web Architecture, Discrete Mathematics.");

    // --- TECHNICAL SKILLS ---
    renderSectionHeader("TECHNICAL SKILLS");

    const skillCategories = [
      { label: "Programming Languages:", value: "Python, TypeScript, JavaScript (ES6+), SQL, C++, Java, HTML5, CSS3" },
      { label: "AI, Agents & Data Science:", value: "Creative AI Agents, Deep Learning, Neural Networks, LangChain, TensorFlow, Scikit-learn, NumPy, Pandas, Vector DBs, Prompt Engineering" },
      { label: "Frontend Architecture:", value: "Next.js 16 (App Router), React 19, Tailwind CSS v4, Vite, Shadcn UI, Motion, Responsive UI/UX, Web Audio API, PWA" },
      { label: "Backend, APIs & Databases:", value: "FastAPI, Node.js, Express.js, Flask, RESTful APIs, PostgreSQL, Supabase RLS, MongoDB, Firebase, SQLite, SQLAlchemy" },
      { label: "DevOps, Cloud & Tools:", value: "OpenTelemetry, Docker, Git, GitHub Actions, Vercel, Render, Postman, Vitest, Linux/Bash, Figma, JWT & Argon2 Security" },
    ];

    skillCategories.forEach(s => {
      doc
        .fillColor(textColor)
        .font("Helvetica-Bold")
        .fontSize(8)
        .text(s.label, left, doc.y, { continued: true })
        .font("Helvetica")
        .fillColor(textColor)
        .text(`  ${s.value}`, { lineGap: 0.5 });
    });

    // --- FEATURED PROJECTS ---
    renderSectionHeader("FEATURED ENGINEERING PROJECTS");

    function renderProjectItem(title, categoryHighlight, tech, links, bullets) {
      doc
        .fillColor(primaryColor)
        .font("Helvetica-Bold")
        .fontSize(8.6)
        .text(title, left, doc.y, { continued: true });

      if (categoryHighlight) {
        doc
          .font("Helvetica-Bold")
          .fillColor(secondaryColor)
          .fontSize(8)
          .text(`  [${categoryHighlight}]`, { continued: true });
      }

      if (links && links.length > 0) {
        doc.font("Helvetica").fillColor(mutedColor).fontSize(7.8).text("   •   ", { continued: true });
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
        .fontSize(7.8)
        .text(`Technologies: ${tech}`);

      bullets.forEach(b => {
        doc
          .fillColor(textColor)
          .font("Helvetica")
          .fontSize(7.8)
          .lineGap(0.6)
          .text(`•  ${b}`, left + 4, doc.y, { width: contentWidth - 4 });
      });
      doc.moveDown(0.2);
    }

    renderProjectItem(
      "CareNest AI — Healthcare Management Ecosystem",
      "PromptWars × Catalyst Solo Hackathon",
      "React, TypeScript, Tailwind CSS, Google for Developers, CareTech, Lighthouse 100",
      [
        { label: "Live Demo", url: "https://catalyst-hackathon-lime.vercel.app" },
        { label: "GitHub", url: "https://github.com/Sanjai-Gopal/catalyst-hackathon" },
      ],
      [
        "Engineered an autonomous clinical assistant ecosystem featuring multilingual guidance across 7 Indian regional languages, symptom triage, emergency routing, and automated appointment scheduling.",
        "Built for the Catalyst Solo Hackathon (powered by Google for Developers × Hack2Skill × MnM), achieving 100/100 Lighthouse performance and strict WCAG accessibility compliance.",
      ]
    );

    renderProjectItem(
      "Swasthya Sathi AI — National Rural Health Telemetry",
      "Bilingual Autonomous AI Agent",
      "Python, FastAPI, React, Vite, Creative AI Agents, SQLAlchemy, SQLite, REST APIs",
      [
        { label: "Live Demo", url: "https://swasthya-sathi-ai-one.vercel.app" },
        { label: "GitHub", url: "https://github.com/Sanjai-Gopal/Swasthya-Sathi-AI" },
      ],
      [
        "Architected an AI-powered healthcare workforce monitoring platform for rural clinics with an autonomous tool-calling AI agent supporting bilingual (Hindi & English) natural-language queries.",
        "Integrated automated attendance auditing, supervisor operational broadcasts, and low-bandwidth offline resilience for community primary health centers.",
      ]
    );

    renderProjectItem(
      "AQI24 & Prediction ML Engine — Environmental Intelligence",
      "Real-Time Telemetry & ML API",
      "React, TypeScript, Node.js, Express.js, PostgreSQL, Supabase, Chart.js, ML Pipelines",
      [
        { label: "Live Demo", url: "https://aqi-24.vercel.app/" },
        { label: "Frontend Repo", url: "https://github.com/Sanjai-Gopal/AQI24" },
        { label: "Backend Repo", url: "https://github.com/Sanjai-Gopal/backend_aqi24" },
      ],
      [
        "Deployed a real-time air quality intelligence platform for India with interactive geospatial telemetry mapping, pollutant trends, and automated station sensor health checks.",
        "Designed and implemented high-throughput RESTful APIs with database pooling and machine learning endpoints for dew point calculation and wildfire risk prediction.",
      ]
    );

    renderProjectItem(
      "ComplyAI — Bureau of Indian Standards (BIS) Verification",
      "3rd Prize Winner in Intercollege Hackathon (BIS)",
      "Next.js, Python, Multimodal Vision AI, OCR Parsing, RAG Knowledge Graph, Vector DB",
      [
        { label: "3rd Prize Announcement", url: "https://www.sanjaibuilds.cv/#achievements" },
        { label: "GitHub", url: "https://github.com/Sanjai-Gopal" },
      ],
      [
        "Developed a multimodal AI verification platform enabling consumers to scan ISI marks, hallmarks, and barcodes to cross-reference authenticity against official BIS national registries in real time.",
        "Awarded 3rd Prize at the Bureau of Indian Standards (BIS) Smart Consumer intercollege competition for technical design, automated fraud detection, and instant grievance filing workflows.",
      ]
    );

    renderFooter(1, 2);

    // ==========================================
    // PAGE 2: More Projects, Freelancing, Hackathons, All Certifications
    // ==========================================
    doc.addPage();

    // Page 2 Header Bar
    doc
      .fillColor(primaryColor)
      .font("Helvetica-Bold")
      .fontSize(12)
      .text("SANJAI", left, 32, { continued: true })
      .font("Helvetica")
      .fillColor(mutedColor)
      .fontSize(8.5)
      .text("   —   Professional Resume Continued  |  sanjai.sparkmail@gmail.com  |  sanjaibuilds.cv");

    doc
      .moveTo(left, 46)
      .lineTo(left + contentWidth, 46)
      .lineWidth(0.8)
      .strokeColor("#cbd5e1")
      .stroke();

    doc.y = 52;

    // --- ADDITIONAL NOTABLE PROJECTS ---
    renderSectionHeader("ADDITIONAL NOTABLE PROJECTS");

    renderProjectItem(
      "NovaPulse AI — Distributed OpenTelemetry Observability SaaS",
      "Production APM Platform",
      "React, TypeScript, OpenTelemetry OTLP, Supabase PostgreSQL RLS, Razorpay Checkout",
      [
        { label: "GitHub", url: "https://github.com/Sanjai-Gopal/novapulse-saas" },
      ],
      [
        "Engineered full-featured telemetry and API observability SaaS monitoring microservices with real-time latency ping checks (p99 18ms), automated Slack webhook alerts, and live span trace waterfalls.",
        "Built robust PostgreSQL Row-Level Security (RLS) tenant isolation and automated recurring subscription billing with Razorpay.",
      ]
    );

    renderProjectItem(
      "Quizza — High-Concurrency Real-Time Live Quiz & Polling Engine",
      "Full-Stack Web Platform",
      "Next.js 16, React 19, TypeScript, Drizzle ORM, PostgreSQL, Vitest, Docker",
      [
        { label: "GitHub", url: "https://github.com/Sanjai-Gopal/Quizza" },
      ],
      [
        "Architected a self-hosted live quiz platform featuring instant room code access, 6 interactive question types (polls, word clouds, multiple choice), server-timed scoring, reconnection recovery, and live leaderboards.",
      ]
    );

    renderProjectItem(
      "Dimsee — Drop-In MERN Authentication Package (Published on NPM)",
      "Open-Source Developer Tool",
      "NPM Package (dimsee), Node.js, Express.js, React, JWT Cookies, Argon2, Bcrypt",
      [
        { label: "NPM Package", url: "https://www.npmjs.com/package/dimsee" },
        { label: "GitHub", url: "https://github.com/Sanjai-Gopal/Dimsee" },
      ],
      [
        "Authored and published an open-source drop-in authentication package on NPM pairing single createAuthBackend() configuration with themeable React <AuthForm /> component, OAuth 2.0, and secure HTTP-only cookies.",
      ]
    );

    // --- WORK EXPERIENCE & FREELANCING ---
    renderSectionHeader("WORK EXPERIENCE & FREELANCE");

    doc
      .fillColor(primaryColor)
      .font("Helvetica-Bold")
      .fontSize(8.8)
      .text("Freelance Full-Stack & AI Systems Developer", left, doc.y, { continued: true })
      .font("Helvetica")
      .fillColor(mutedColor)
      .fontSize(8.2)
      .text("   •   Self-Employed", { continued: true })
      .fillColor(primaryColor)
      .text("   (2024 – Present)");

    doc
      .font("Helvetica-Oblique")
      .fillColor(mutedColor)
      .fontSize(7.8)
      .text("Services: Custom Web Platforms, Creative AI Agents & LLM Integrations, REST APIs, Database Optimization");

    const freelanceBullets = [
      "Designed and shipped production websites, full-stack portals, and client web applications with strict 95+ Lighthouse performance, responsive UI/UX, and SEO optimization (e.g., Tattoo Studio storefront).",
      "Integrated custom LLM agents and REST API backends using FastAPI, Express.js, and Supabase, implementing secure authentication, database schemas, and cloud deployments on Vercel and Render.",
    ];

    freelanceBullets.forEach(b => {
      doc
        .fillColor(textColor)
        .font("Helvetica")
        .fontSize(7.8)
        .lineGap(0.6)
        .text(`•  ${b}`, left + 4, doc.y, { width: contentWidth - 4 });
    });

    // --- HACKATHONS & KEY ACHIEVEMENTS ---
    renderSectionHeader("HACKATHON TRACK RECORD & MAJOR ACHIEVEMENTS");

    const achievementsList = [
      {
        title: "3rd Prize — Intercollege Hackathon (BIS)",
        org: "Bureau of Indian Standards (BIS)",
        desc: "Won 3rd Prize at the national Smart Consumer intercollege hackathon for developing ComplyAI ISI Mark & hallmark verification platform.",
      },
      {
        title: "National Rank 17 — Data Science & ML Assessment Test",
        org: "Infotact Solutions (ISO 9001:2015)",
        desc: "Secured National Rank 17 nationwide with an outstanding 96% score (95.97 / 100) in the competitive Data Science & ML Assessment.",
      },
      {
        title: "ISRO Bharatiya Antariksh Hackathon 2026",
        org: "Indian Space Research Organisation (ISRO) & Hack2Skill",
        desc: "Competed in the national space hackathon challenge, designing software workflows for space-domain telemetry problems.",
      },
      {
        title: "UNESCO Youth Hackathon 2026",
        org: "UNESCO",
        desc: "Awarded Certificate of Participation for building technology-driven software solutions addressing global youth and sustainable development goals.",
      },
      {
        title: "PromptWars × Catalyst Solo Hackathon",
        org: "Google for Developers × Hack2Skill × MnM",
        desc: "Built CareNest AI solo, engineered with 100/100 Lighthouse performance, multi-language speech, and automated symptom triage.",
      },
      {
        title: "Devfolio Hacker House Goa 2026 & SKCET HackZen ’26",
        org: "Devfolio & SKCET",
        desc: "Active competitive participant building high-velocity decentralized and full-stack software prototypes.",
      },
      {
        title: "Innovate India 2026 — SkillSync Ideation",
        org: "Innovate India",
        desc: "Selected for Round 1 Ideation with SkillSync, an explainable AI team-matching platform for hackathon talent discovery.",
      },
    ];

    achievementsList.forEach(a => {
      doc
        .fillColor(primaryColor)
        .font("Helvetica-Bold")
        .fontSize(8)
        .text(`•  ${a.title} `, left + 4, doc.y, { continued: true })
        .font("Helvetica-Bold")
        .fillColor(secondaryColor)
        .fontSize(7.8)
        .text(`[${a.org}] — `, { continued: true })
        .font("Helvetica")
        .fillColor(textColor)
        .text(a.desc, { lineGap: 0.5 });
    });

    // --- PROFESSIONAL CERTIFICATIONS ---
    renderSectionHeader("VERIFIED PROFESSIONAL CERTIFICATIONS");

    const fullCerts = [
      { name: "Neural Networks and Deep Learning Specialization", provider: "DeepLearning.AI (Andrew Ng)" },
      { name: "Improving Deep Neural Networks: Hyperparameter Tuning & TensorFlow", provider: "DeepLearning.AI (Andrew Ng)" },
      { name: "Structuring Machine Learning Projects", provider: "DeepLearning.AI (Andrew Ng)" },
      { name: "Data Science & Machine Learning Assessment (Rank 17 · 96% Score)", provider: "Infotact Solutions (ISO 9001:2015)" },
      { name: "Python for Data Science (Elite 70% Score Certification)", provider: "NPTEL IIT Madras" },
      { name: "Google AI Essentials Professional Certificate", provider: "Google (Coursera)" },
      { name: "Google Data Analytics Professional Certificate", provider: "Google (Coursera)" },
      { name: "Certificate of Cognitive Aptitude & Intelligence (Excellent IQ Rating)", provider: "IIT Bombay Alumni & AICTSD Board" },
      { name: "CS205: Building with Artificial Intelligence (92.16% Score)", provider: "Saylor Academy" },
      { name: "Generative AI for Web Development Specialization", provider: "Scrimba & Coursera" },
      { name: "Getting Started with Git and GitHub & Cloud Computing", provider: "IBM" },
      { name: "Object Oriented Programming Using C++", provider: "byteXL & SKCET" },
      { name: "Fundamentals of Computer Organization", provider: "IIIT Hyderabad" },
      { name: "Programming for Everybody (Getting Started with Python)", provider: "University of Michigan" },
      { name: "Canva Essentials Professional Certificate (13 Courses)", provider: "Canva" },
    ];

    // Render in 2 compact columns for maximum clarity and density
    const colWidth = (contentWidth - 10) / 2;
    const certStartY = doc.y;
    const half = Math.ceil(fullCerts.length / 2);

    for (let i = 0; i < half; i++) {
      const c = fullCerts[i];
      doc
        .fillColor(textColor)
        .font("Helvetica-Bold")
        .fontSize(7.5)
        .text(`•  ${c.name}`, left + 4, certStartY + i * 16, { width: colWidth - 8, lineGap: 0 })
        .font("Helvetica")
        .fillColor(mutedColor)
        .fontSize(6.9)
        .text(`   Provider: ${c.provider}`, left + 4, doc.y, { width: colWidth - 8 });
    }

    const rightColLeft = left + colWidth + 10;
    for (let i = half; i < fullCerts.length; i++) {
      const c = fullCerts[i];
      const relIdx = i - half;
      doc
        .fillColor(textColor)
        .font("Helvetica-Bold")
        .fontSize(7.5)
        .text(`•  ${c.name}`, rightColLeft, certStartY + relIdx * 16, { width: colWidth - 8, lineGap: 0 })
        .font("Helvetica")
        .fillColor(mutedColor)
        .fontSize(6.9)
        .text(`   Provider: ${c.provider}`, rightColLeft, doc.y, { width: colWidth - 8 });
    }

    doc.y = certStartY + half * 16 + 6;

    // --- SOFT SKILLS & METHODOLOGIES ---
    renderSectionHeader("CORE COMPETENCIES & METHODOLOGIES");

    doc
      .fillColor(textColor)
      .font("Helvetica")
      .fontSize(8)
      .text(
        "Autonomous AI Agents  •  Full-Stack System Architecture  •  Distributed Tracing & APM  •  RESTful API Design  •  Data Structures & Algorithms  •  Multilingual HealthTech  •  Agile & CI/CD Pipelines  •  Rapid Hackathon Prototyping  •  Technical Leadership",
        left + 4,
        doc.y,
        { width: contentWidth - 4, lineGap: 1 }
      );

    renderFooter(2, 2);

    doc.end();

    stream.on("finish", () => {
      console.log(`Comprehensive 2-page resume generated successfully at ${outputPath}`);
      resolve();
    });
    stream.on("error", reject);
  });
}

async function run() {
  const scratchTarget = "C:/Users/sanja/.gemini/antigravity/scratch/sanjai.dev/public/resume.pdf";
  const downloadsTarget1 = "C:/Users/sanja/Downloads/resume_11zon.pdf";
  const downloadsTarget2 = "C:/Users/sanja/Downloads/resume.pdf";

  await generateComprehensiveResume(scratchTarget);
  fs.copyFileSync(scratchTarget, downloadsTarget1);
  fs.copyFileSync(scratchTarget, downloadsTarget2);
  console.log("Comprehensive resume synced to all destinations!");
}

run().catch(console.error);
