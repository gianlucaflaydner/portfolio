import ProjectCard, { Project } from '@/components/projectCard';

interface ProjectsSectionProps {
  projects?: Project[];
  sectionTitle: string;
}

export default function ProjectsSection({
  projects = [],
  sectionTitle,
}: ProjectsSectionProps) {
  return (
    <section id="projects" className="w-full py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold font-robotoMono mb-12 text-center">
          {sectionTitle}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project: Project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
