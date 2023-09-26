'use client';

import React from 'react';
import Link from 'next/link';
import Button from '@/components/Button/Button';
import { AppIcons } from '@/components/Icons';
import CategoryChip from '@/components/UI/Chip/CategoryChip';
import FormTitleHighLightText from '../../FormTitleHighLightText';
import type { CategoryResultList } from '@/hooks/useCategoryAsyncMutation';
import type { Category } from '@/interfaces/Category';

interface FailResultProps {
  categoryResults: {
    success: CategoryResultList;
    fail: CategoryResultList;
  };
  onClose: () => void;
}

function FailCategoryResult({ categoryResults, onClose }: FailResultProps) {
  const serializeResult = (category: Category) => {
    return <CategoryChip key={category.category} category={category} />;
  };

  const Results = ({ title, categories }: { title: string; categories: Category[] }) => {
    return categories?.length ? (
      <div className="space-y-2 overflow-auto scrollbar-none">
        <h3 className="text-sm font-bold text-[#565759] underline underline-offset-2">{title}</h3>
        <div className="flex h-14 w-full gap-4 overflow-auto scrollbar-none">
          {categories.map((categoryName) => serializeResult(categoryName))}
        </div>
      </div>
    ) : null;
  };

  const renderSymbols = {
    success: {
      like: <Results title="관심심볼생성 성공" categories={categoryResults.success.like} />,
      unlike: <Results title="관심심볼삭제 성공" categories={categoryResults.success.unlike} />,
    },
    fail: {
      like: <Results title="관심심볼생성 실패" categories={categoryResults.fail.like} />,
      unlike: <Results title="관심심볼삭제 실패" categories={categoryResults.fail.unlike} />,
    },
  };

  return (
    <div>
      {/* header */}
      <div className="absolute right-4 top-4">
        <button
          onClick={() => {
            onClose();
          }}
        >
          <AppIcons.CloseFill.Orange />
        </button>
      </div>
      <div className="mt-8 flex flex-col items-center gap-7">
        <div className="mb-3 text-center">
          <FormTitleHighLightText content={'관심카테고리 설정'} />
        </div>
      </div>
      {/* content */}
      {renderSymbols.success.like}
      {renderSymbols.success.unlike}
      {renderSymbols.fail.like}
      {renderSymbols.fail.unlike}
      <Link href="/" className="mt-10 block">
        <Button bgColorTheme="orange" textColorTheme="white" className={`mx-auto h-fit w-fit px-8 py-2`}>
          홈으로
        </Button>
      </Link>
    </div>
  );
}

export default FailCategoryResult;
