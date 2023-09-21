import React from 'react';
import CategoryChip, { type CategoryChipProps } from '@/components/UI/Chip/CategoryChip';
import { selectCategory, unSelectCategory, useCategoryList } from '@/redux/slice/categorySlice';
import { useUser } from '@/hooks/useUser';
import type { OnChipChangeResult } from '@/components/UI/Chip/SymbolChip';

interface DispatchSearchCategoryChipProps extends Omit<CategoryChipProps, 'onChange' | 'onClose' | 'selected'> {
  allowClickDispatch?: boolean;
  onDispatch?: (requiredSubscribe: boolean) => void;
}

function DispatchSearchCategoryChip({
  category,
  shadowEffect,
  closeButton,
  allowClickDispatch,
  onDispatch,
}: DispatchSearchCategoryChipProps) {
  const { dispatch, selectedCategoryMap, isLike } = useCategoryList();

  const { user } = useUser();

  const handleChange: () => Promise<OnChipChangeResult> = async () => {
    try {
      if (!category)
        return {
          status: 'error',
          type: 'unknown',
        };

      if (!isLike(category!)) {
        if (user?.membership === 'BASIC' && Object.keys(selectedCategoryMap).length >= 3) {
          onDispatch && onDispatch(true);

          return {
            status: 'error',
            type: 'like',
          };
        }

        dispatch(selectCategory({ category }));

        return {
          status: 'success',
          type: 'like',
        };
      }

      dispatch(unSelectCategory({ category }));

      return {
        status: 'success',
        type: 'unlike',
      };
    } catch (err) {
      return {
        status: 'error',
        type: 'unknown',
      };
    }
  };

  return (
    <CategoryChip
      category={category}
      selected={category ? isLike(category) : false}
      shadowEffect={shadowEffect}
      closeButton={closeButton}
      onChange={allowClickDispatch ? handleChange : undefined}
      onClose={() => category && dispatch(unSelectCategory({ category }))}
    />
  );
}

export default DispatchSearchCategoryChip;
