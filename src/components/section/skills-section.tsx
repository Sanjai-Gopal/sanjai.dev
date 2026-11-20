import BlurFade from "@/components/magicui/blur-fade";
import { SectionHeading } from "@/components/section/section-heading";
import { sanjaiProfile } from "@/data/sanjai-profile";
import type { ComponentType, SVGProps } from "react";
import {
  Activity,
  BarChart3,
  Binary,
  Bot,
  Boxes,
  Braces,
  BrainCircuit,
  Calculator,
  Camera,
  Cloud,
  Code2,
  Cpu,
  Database,
  DatabaseZap,
  Eye,
  FileCode,
  Flame,
  FlaskConical,
  GitBranch,
  Github,
  Layers,
  LineChart,
  MessageSquareCode,
  Network,
  Palette,
  PenTool,
  Play,
  Radio,
  Send,
  Server,
  Sparkles,
  Table2,
  Terminal,
  TestTube2,
  Triangle,
  Wind,
  Workflow,
  Zap,
} from "lucide-react";

const BLUR_FADE_DELAY = 0.04;

function Coffee(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M10 2v2" />
      <path d="M14 2v2" />
      <path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1" />
      <path d="M6 2v2" />
    </svg>
  );
}

function Container(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 16v-8" />
      <path d="M12 20v-8" />
      <path d="M8 16v-8" />
      <path d="M3 20h18" />
      <path d="M3 16h18" />
      <path d="M3 12h18" />
      <path d="M3 8h18" />
      <path d="M3 4h18" />
    </svg>
  );
}

const skillIcons: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  Python: Code2,
  TypeScript: FileCode,
  "C++": Braces,
  Java: Coffee,
  JavaScript: Braces,
  SQL: Database,
  React: Layers,
  "React.js": Layers,
  "Next.js": Triangle,
  "Tailwind CSS": Wind,
  Vite: Zap,
  HTML: FileCode,
  HTML5: FileCode,
  CSS: Palette,
  CSS3: Palette,
  PWA: SmartphoneIcon,
  "Web Audio API": Radio,
  "Node.js": Server,
  "Express.js": Server,
  Flask: FlaskConical,
  FastAPI: Zap,
  Streamlit: Activity,
  "REST APIs": Server,
  "Creative AI Agents": Sparkles,
  "AI Agents": BrainCircuit,
  "Artificial Intelligence (AI)": BrainCircuit,
  "Machine Learning": BrainCircuit,
  "Deep Learning": Network,
  "Generative AI": Sparkles,
  "Computer Vision": Eye,
  "Natural Language Processing (NLP)": MessageSquareCode,
  "Prompt Engineering": Sparkles,
  MLOps: Workflow,
  "Data Science": Binary,
  "Data Analysis": LineChart,
  "Data Visualization": BarChart3,
  "Pandas (Software)": Table2,
  Pandas: Table2,
  NumPy: Calculator,
  Algorithms: Binary,
  "Data Structures": Boxes,
  "Neural Networks": Network,
  LangChain: Workflow,
  TensorFlow: Layers,
  "Scikit-learn": BarChart3,
  PostgreSQL: Database,
  MongoDB: DatabaseZap,
  SQLite: Database,
  Supabase: Zap,
  "Supabase RLS": Zap,
  Firebase: Flame,
  SQLAlchemy: Database,
  Git: GitBranch,
  GitHub: Github,
  "GitHub Actions": Workflow,
  Docker: Container,
  "VS Code": Code2,
  Postman: Send,
  Vitest: TestTube2,
  Figma: PenTool,
  Vercel: Triangle,
  Render: Cloud,
  AWS: Cloud,
  "Linux/Bash": Terminal,
  OpenTelemetry: Activity,
};

function SmartphoneIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="flex min-h-0 flex-col gap-y-6">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <SectionHeading
          eyebrow="Capabilities"
          title="Technical Stack & Expertise"
          description="Demonstrated across open-source architectures, production deployments, and national technical assessments."
        />
      </BlurFade>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sanjaiProfile.skills.map((group, groupIndex) => (
          <BlurFade key={group.category} delay={BLUR_FADE_DELAY * 2 + groupIndex * 0.05}>
            <div className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
              <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => {
                  const Icon = skillIcons[skill];
                  return (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground transition-all hover:border-primary/40 hover:bg-primary/5"
                    >
                      {Icon ? <Icon className="size-3.5" aria-hidden /> : null}
                      {skill}
                    </span>
                  );
                })}
              </div>
            </div>
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
