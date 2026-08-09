import { AboutSection } from "@/components/section/about-section";
import { AchievementsSection } from "@/components/section/achievements-section";
import { CertificationsSection } from "@/components/section/certifications-section";
import { ContactSection } from "@/components/section/contact-section";
import { EducationSection } from "@/components/section/education-section";
import { FreelancingSection } from "@/components/section/freelancing-section";
import { HeroSection } from "@/components/section/hero-section";
import { ProjectsSection } from "@/components/section/projects-section";
import { SkillsSection } from "@/components/section/skills-section";

export default function Page() {
  return (
    <main className="flex min-h-dvh flex-col gap-24">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <CertificationsSection />
      <AchievementsSection />
      <FreelancingSection />
      <EducationSection />
      <ContactSection />
    </main>
  );
}
