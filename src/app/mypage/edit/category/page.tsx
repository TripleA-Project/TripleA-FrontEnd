import { Metadata } from 'next';
import BackButtonHeader from '@/components/Layout/Header/BackButtonHeader';
import CategoryForm from '@/components/Form/CategoryForm';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Triple A | 관심 카테고리 설정',
  description: 'Triple A 관심 카테고리 설정',
};

function EditCategoryPage() {
  return (
    <>
      <BackButtonHeader />
      <div className="box-border px-4">
        <CategoryForm />
      </div>
    </>
  );
}
export default EditCategoryPage;
