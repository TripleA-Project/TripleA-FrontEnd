import { Metadata } from 'next';

export const revalidate = 0;

export const metadata: Metadata = {
  title: '내가 본 뉴스',
  description: 'Triple A 내가 본 뉴스페이지',
};

function ReadNewsPage() {
  return <div>ReadNewsPage</div>;
}

export default ReadNewsPage;
