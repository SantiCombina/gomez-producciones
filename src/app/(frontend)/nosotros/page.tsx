import { AboutHeader } from '@/components/nosotros/about-header';
import { CompanyHistory } from '@/components/nosotros/company-history';
import { OwnerProfile } from '@/components/nosotros/owner-profile';

export default async function AboutPage() {
  return (
    <div className="min-h-dvh">
      <div className="container py-12 space-y-16">
        <AboutHeader />
        <CompanyHistory />
        <OwnerProfile />
      </div>
    </div>
  );
}
