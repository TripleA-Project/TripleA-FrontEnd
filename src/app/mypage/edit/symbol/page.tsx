import { Metadata } from 'next';
import SymbolForm from '@/components/Form/SymbolForm';
import BackButtonHeader from '@/components/Layout/Header/BackButtonHeader';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Triple A | 관심 심볼 설정',
  description: 'Triple A 관심 심볼 설정',
};

function EditSymbolPage() {
  return (
    <>
      <BackButtonHeader />
      <div className="box-border px-4">
        <SymbolForm />
      </div>
    </>
  );
}
export default EditSymbolPage;
