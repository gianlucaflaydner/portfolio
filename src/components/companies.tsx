import Image from 'next/image';
import Link from 'next/link';
import type { Company } from '@/types/career';

interface CompaniesProps {
  companies: Company[];
}

export default function Companies(props: CompaniesProps) {
  const { companies } = props;
  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center mx-auto">
      {companies.map((company, index) => (
        <Link
          key={index}
          href={company.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${company.name}'s website`}
        >
          <Image
            src={company.logo || '/placeholder.svg'}
            alt={`${company.name} logo`}
            width={160}
            height={160}
            className="object-contain w-[160px] h-[160px] transition-transform duration-300 hover:scale-110"
          />
        </Link>
      ))}
    </div>
  );
}
