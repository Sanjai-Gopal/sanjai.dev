import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

function generateOriginalResume(outputPath) {
  return new Promise((resolve, reject) => {
    // Standard A4: 595.28 x 841.89 points
    const doc = new PDFDocument({
      size: "A4",
      margins: { top: 32, bottom: 32, left: 38, right: 38 },
      info: {
        Title: "Sanjai — Resume",
        Author: "Sanjai",
        Subject: "AI & Data Science Student | Software Engineer",
      },
    });

    const stream = fs.createWriteStream(outputPath);
    doc.pipe(stream);

    const primaryColor = "#1a365d"; // deep navy/slate
    const secondaryColor = "#2563eb"; // blue for links
    const textColor = "#1f2937"; // dark charcoal for body
    const mutedColor = "#4b5563"; // gray-600

    const left = 38;
    const contentWidth = 595.28 - 76; // 519.28 pt

    // --- TOP HEADER ---
    const startY = 32;

    // Photo on the top right
    const photoPath = "C:/Users/sanja/.gemini/antigravity/scratch/sanjai.dev/public/me.jpg";
    const photoWidth = 72;
    const photoHeight = 84;
    const photoX = left + contentWidth - photoWidth;
    const photoY = startY;

    if (fs.existsSync(photoPath)) {
      doc.save();
      doc.roundedRect(photoX, photoY, photoWidth, photoHeight, 8).clip();
      doc.image(photoPath, photoX, photoY, { width: photoWidth, height: photoHeight });
      doc.restore();

      doc
        .roundedRect(photoX, photoY, photoWidth, photoHeight, 8)
        .lineWidth(0.8)
        .strokeColor("#94a3b8")
        .stroke();
    }

    // Name & Title on top left
    doc
      .fillColor(primaryColor)
      .font("Helvetica-Bold")
      .fontSize(22)
      .text("SANJAI", left, startY + 2);

    doc.moveDown(0.2);
    doc
      .fillColor(primaryColor)
      .font("Helvetica")
      .fontSize(9.5)
      .text("AI & Data Science Student  |  Aspiring Software / ML Engineer", left);

    doc.moveDown(0.25);
    doc
      .fillColor(mutedColor)
      .font("Helvetica")
      .fontSize(8.3)
      .text("Coimbatore, Tamil Nadu, India   |   +91 9363265552   |   sanjai.sparkmail@gmail.com", left);

    doc.moveDown(0.25);
    doc
      .font("Helvetica")
      .fontSize(8.5)
      .fillColor(secondaryColor)
      .text("GitHub", left, doc.y, { link: "https://github.com/Sanjai-Gopal", underline: true, continued: true })
      .fillColor(mutedColor)
      .text("   |   ", { underline: false, continued: true })
      .fillColor(secondaryColor)
      .text("LinkedIn", { link: "https://linkedin.com/in/sanjai-dev", underline: true, continued: true })
      .fillColor(mutedColor)
      .text("   |   ", { underline: false, continued: true })
      .fillColor(secondaryColor)
      .text("Portfolio", { link: "https://www.sanjaibuilds.cv/", underline: true });

    // --- SUMMARY BOX ---
    doc.y = startY + 92;
    const summaryBoxY = doc.y;
    const summaryText =
      "B.Tech student in Artificial Intelligence and Data Science with hands-on experience building full-stack web applications, creative AI agents, and machine learning projects. Skilled across the modern JavaScript ecosystem and Python-based AI/ML tooling, with a track record of shipping deployed, production-ready applications. Active hackathon participant and continuous learner, seeking a Software Engineering, AI/ML, or Full-Stack Development internship.";

    doc
      .fillColor(textColor)
      .font("Helvetica")
      .fontSize(8.1)
      .lineGap(1.5)
      .text(summaryText, left + 8, summaryBoxY + 6, {
        width: contentWidth - 16,
        align: "left",
      });

    const summaryBoxHeight = doc.y - summaryBoxY + 5;
    doc
      .roundedRect(left, summaryBoxY, contentWidth, summaryBoxHeight, 4)
      .lineWidth(0.8)
      .strokeColor("#94a3b8")
      .stroke();

    doc.y = summaryBoxY + summaryBoxHeight + 4;

    // Helper for Section Headers
    function renderSectionHeader(title) {
      doc.moveDown(0.4);
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

      doc.y = lineY + 3;
    }

    // --- EDUCATION ---
    renderSectionHeader("EDUCATION");

    doc
      .fillColor(textColor)
      .font("Helvetica-Bold")
      .fontSize(8.8)
      .text("Sri Krishna College of Engineering and Technology (SKCET)", left);

    doc
      .fillColor(textColor)
      .font("Helvetica")
      .fontSize(8.3)
      .text("Bachelor of Technology (B.Tech), Artificial Intelligence and Data Science", left);

    doc
      .fillColor(mutedColor)
      .font("Helvetica")
      .fontSize(8.1)
      .text("Coimbatore, Tamil Nadu  |  Expected Graduation: 2029  |  2nd Year  |  CGPA: 9.0 / 10", left);

    // --- TECHNICAL SKILLS ---
    renderSectionHeader("TECHNICAL SKILLS");

    const skills = [
      { label: "Languages:", value: "Python, C++, Java, JavaScript, SQL" },
      { label: "AI & Data Science:", value: "Machine Learning, Deep Learning, Building Creative AI Agents, TensorFlow, Scikit-learn, NumPy, Pandas, Data Analysis" },
      { label: "Frontend:", value: "React.js, Next.js, HTML5, CSS3, Tailwind CSS, Responsive Web Design" },
      { label: "Backend:", value: "Node.js, Express.js, Flask, FastAPI, REST APIs" },
      { label: "Databases:", value: "PostgreSQL, MongoDB, Firebase, Supabase" },
      { label: "Tools:", value: "Git, GitHub, Docker, Postman, VS Code, Figma, Vercel, Render" },
    ];

    skills.forEach(s => {
      doc
        .fillColor(textColor)
        .font("Helvetica-Bold")
        .fontSize(8.1)
        .text(s.label, left, doc.y, { continued: true })
        .font("Helvetica")
        .fillColor(textColor)
        .text(` ${s.value}`, { lineGap: 0.5 });
    });

    // --- PROJECTS ---
    renderSectionHeader("PROJECTS");

    function renderProject(title, links, bullets) {
      doc
        .fillColor(primaryColor)
        .font("Helvetica-Bold")
        .fontSize(8.6)
        .text(title, left, doc.y, { continued: true });

      if (links && links.length > 0) {
        doc.font("Helvetica").fillColor(mutedColor).fontSize(8).text("   |   ", { continued: true });
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

      bullets.forEach(b => {
        doc
          .fillColor(textColor)
          .font("Helvetica")
          .fontSize(7.9)
          .lineGap(0.8)
          .text(`•  ${b}`, left + 4, doc.y, { width: contentWidth - 4 });
      });
      doc.moveDown(0.15);
    }

    // 1. AQI24
    renderProject(
      "AQI24 – Air Quality Monitoring Platform",
      [
        { label: "GitHub", url: "https://github.com/Sanjai-Gopal/AQI24" },
        { label: "Live Demo", url: "https://aqi-24.vercel.app/" },
      ],
      [
        "Developed a responsive React.js frontend with an interactive dashboard to visualize real-time environmental and air quality data.",
        "Integrated external APIs for dynamic data visualization and built a clean, maintainable component architecture.",
      ]
    );

    // 2. AQI24 Backend
    renderProject(
      "AQI24 Backend",
      [
        { label: "GitHub", url: "https://github.com/Sanjai-Gopal/backend_aqi24" },
      ],
      [
        "Designed and implemented RESTful APIs to support scalable data management for the AQI24 platform.",
        "Built backend architecture with database integration, prioritizing maintainable and scalable code.",
      ]
    );

    // 3. Tattoo Studio
    renderProject(
      "Tattoo Studio Website",
      [
        { label: "GitHub", url: "https://github.com/Sanjai-Gopal/Tattoo" },
        { label: "Live Demo", url: "https://tattoo-sooty.vercel.app/" },
      ],
      [
        "Designed and built a premium, fully responsive website with modern UI/UX practices and elegant animations.",
        "Created reusable UI components and optimized the overall user experience across devices.",
      ]
    );

    // 4. BIS Smart Compliance
    renderProject(
      "BIS Smart Compliance",
      [
        { label: "GitHub", url: "https://github.com/Sanjai-Gopal" },
        { label: "3rd Prize (BIS Hackathon)", url: "https://www.sanjaibuilds.cv/#achievements" },
      ],
      [
        "Built the frontend and application workflow for a product compliance and consumer safety application, securing 3rd Prize in Intercollege Hackathon (BIS).",
        "Designed an intuitive interface and collaborated effectively within a team environment.",
      ]
    );

    // 5. CareNest AI
    renderProject(
      "CareNest AI – Healthcare Clinical Ecosystem",
      [
        { label: "GitHub", url: "https://github.com/Sanjai-Gopal/catalyst-hackathon" },
        { label: "Live Demo", url: "https://catalyst-hackathon-lime.vercel.app" },
      ],
      [
        "Engineered an autonomous clinical assistant ecosystem featuring multilingual guidance, automated symptom triage, and prescription analysis.",
      ]
    );

    // --- CERTIFICATIONS ---
    renderSectionHeader("CERTIFICATIONS");

    const certs = [
      "• Google AI Essentials Professional Certificate   • Google Data Analytics Professional Certificate",
      "• Generative AI for Web Development Specialization   • Canva Essentials Professional Certificate",
      "• Python for Data Science – NPTEL   • Getting Started with Git and GitHub – IBM",
      "• Programming for Everybody (Getting Started with Python) – University of Michigan",
    ];

    certs.forEach(c => {
      doc
        .fillColor(textColor)
        .font("Helvetica")
        .fontSize(7.9)
        .text(c, left + 4, doc.y, { lineGap: 0.5 });
    });

    // --- ACHIEVEMENTS & EXTRACURRICULAR ACTIVITIES ---
    renderSectionHeader("ACHIEVEMENTS & EXTRACURRICULAR ACTIVITIES");

    const achs = [
      "• 3rd Prize in Intercollege Hackathon (BIS)   • Participant, HackNIMA 2026",
      "• Built and deployed multiple production-ready web applications",
      "• Active in hackathons, continuous AI/ML learning, and exploration of modern web technologies",
    ];

    achs.forEach(a => {
      doc
        .fillColor(textColor)
        .font("Helvetica")
        .fontSize(7.9)
        .text(a, left + 4, doc.y, { lineGap: 0.5 });
    });

    // --- SOFT SKILLS ---
    renderSectionHeader("SOFT SKILLS");

    doc
      .fillColor(textColor)
      .font("Helvetica")
      .fontSize(8)
      .text("Problem Solving  •  Analytical Thinking  •  Team Collaboration  •  Communication  •  Quick Learner  •  Adaptability  •  Time Management", left + 4, doc.y);

    doc.end();

    stream.on("finish", () => {
      console.log(`Updated original resume generated successfully at ${outputPath}`);
      resolve();
    });
    stream.on("error", reject);
  });
}

async function run() {
  const scratchTarget = "C:/Users/sanja/.gemini/antigravity/scratch/sanjai.dev/public/resume.pdf";
  const downloadsTarget1 = "C:/Users/sanja/Downloads/resume_11zon.pdf";
  const downloadsTarget2 = "C:/Users/sanja/Downloads/resume.pdf";

  await generateOriginalResume(scratchTarget);
  fs.copyFileSync(scratchTarget, downloadsTarget1);
  fs.copyFileSync(scratchTarget, downloadsTarget2);
  console.log("All resume locations synced!");
}

run().catch(console.error);
