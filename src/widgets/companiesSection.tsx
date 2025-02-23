import type { Company } from '@/types/career';
import Companies from '@/components/companies';

interface CompaniesSectionProps {
  companies: Company[];
  companiesSectionTitle: string;
}

export default function CompaniesSection(props: CompaniesSectionProps) {
  const { companies, companiesSectionTitle } = props;

  return (
    <section className="container mx-auto px-4 py-4">
      <h2 className="text-2xl font-semibold tracking-tight mb-12 text-center">
        {companiesSectionTitle}
      </h2>

      <Companies companies={companies} />
    </section>
  );
}
