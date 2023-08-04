'use client';

import { useRouter } from 'next/navigation';
import Header from '..';
import { AppIcons } from '@/components/Icons';
import SearchForm from './SearchForm';

interface SearchHeaderProps {
  keyword?: string;
}

function SearchHeader({ keyword }: SearchHeaderProps) {
  const { back } = useRouter();

  return (
    <Header fixed headerClassName="border-b border-b-[#FD954A]" className="!w-full !justify-start">
      <AppIcons.BackArrow.Bar className="cursor-pointer" onClick={() => back()} />
      <SearchForm keyword={keyword ?? ''} />
    </Header>
  );
}

export default SearchHeader;
