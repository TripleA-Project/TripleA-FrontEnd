import React from 'react';
import CategoryChip from '@/components/UI/Chip/CategoryChip';

function AllCategoriesLoading() {
  return (
    <div className="animate__animated animate__fadeIn flex flex-wrap justify-center gap-5">
      {Array.from({ length: 6 }).map((_, idx) => (
        <CategoryChip key={`loading-category-${idx}`} loading />
      ))}
    </div>
  );
}

export default AllCategoriesLoading;
