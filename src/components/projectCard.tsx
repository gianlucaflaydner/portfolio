import Image from 'next/image';
import { FaGithub } from 'react-icons/fa';

export interface Project {
  id: number;
  image: string;
  name: string;
  description: string;
  repo: string;
}

export default function ProjectCard({
  id,
  name,
  image,
  repo,
  description,
}: Project) {
  return (
    <>
      <div
        className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:cursor-pointer"
        key={id}
        onClick={() => window.open(repo, '_blank')}
      >
        <div className="relative h-48 md:h-64">
          <Image
            src={image}
            alt={name}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300"
          />
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-3">{name}</h3>
          <div className="h-40 overflow-y-auto mb-4">
            <p className="text-gray-600 ">{description}</p>
          </div>
          <a
            href={repo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <FaGithub size={18} />
            Ver Repositório
          </a>
        </div>
      </div>
    </>
  );
}
