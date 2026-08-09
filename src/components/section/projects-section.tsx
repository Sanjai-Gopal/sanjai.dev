import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section/section-heading";
import { sanjaiProfile } from "@/data/sanjai-profile";

const BLUR_FADE_DELAY = 0.04;

export function ProjectsSection() {
  return (
    <section id="projects" className="flex min-h-0 flex-col gap-y-8">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <SectionHeading
          eyebrow="Projects"
          title="Things I've built"
          description="Projects I've designed, built, and deployed — from data dashboards to full websites."
        />
      </BlurFade>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {sanjaiProfile.projects.map((project, id) => (
          <BlurFade
            key={project.title}
            delay={BLUR_FADE_DELAY * 2 + id * 0.05}
            className="h-full"
          >
            <ProjectCard
              title={project.title}
              description={project.description}
              tags={project.technologies}
              github={project.github}
              live={project.live}
              image={project.image}
              imageAlt={project.imageAlt}
            />
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
