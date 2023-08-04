'use client';

import { useRouter } from 'next/navigation';
import ServiceModal from '../Form/TermsForm/ServiceTermModal';

function TermsPage() {
  const { back } = useRouter();

  return <ServiceModal onClose={() => back()} />;
}

export default TermsPage;
