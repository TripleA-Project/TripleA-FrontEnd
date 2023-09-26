import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '../store';
import { type Category } from '@/interfaces/Category';

interface CategoryMap {
  [key: string]: Category;
}

type CategoryState = {
  // State 타입
  likedCategoryMap: CategoryMap;
  requestLikeCategoryMap: CategoryMap;
  requestUnLikeCategoryMap: CategoryMap;
  selectedCategoryMap: CategoryMap;
};

type InitLikedCategoryPayload = {
  categories: Category[];
};

type CategoryPayload = {
  category: Category;
};

const initialState: CategoryState = {
  likedCategoryMap: {},
  requestLikeCategoryMap: {},
  requestUnLikeCategoryMap: {},
  selectedCategoryMap: {},
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    initLikedCategoryMap: (state: CategoryState, action: PayloadAction<InitLikedCategoryPayload>) => {
      if (!action.payload?.categories) {
        state.likedCategoryMap = { ...initialState.likedCategoryMap };

        return;
      }

      if (!Array.isArray(action.payload.categories) || !action.payload.categories.length) {
        state.likedCategoryMap = { ...initialState.likedCategoryMap };

        return;
      }

      for (const categoryPayload of action.payload.categories) {
        const { categoryId, category } = categoryPayload;

        const likedCategories = { ...state.likedCategoryMap, [category]: { categoryId, category } };

        state.likedCategoryMap = likedCategories;
      }
    },
    initSelectedCategoryMap: (state: CategoryState) => {
      state.selectedCategoryMap = { ...state.likedCategoryMap };
    },
    selectCategory: (state: CategoryState, action: PayloadAction<CategoryPayload>) => {
      const { categoryId, category } = action.payload.category;

      const isLikedCategory = !!state.likedCategoryMap[category];
      const isUnlikedCategory = !!state.requestUnLikeCategoryMap[category];

      if (!isLikedCategory) {
        const requestCategories = { ...state.requestLikeCategoryMap, [category]: { categoryId, category } };

        state.requestLikeCategoryMap = requestCategories;

        state.selectedCategoryMap = { ...state.selectedCategoryMap, [category]: { categoryId, category } };

        return;
      }

      if (isUnlikedCategory) {
        state.selectedCategoryMap = { ...state.selectedCategoryMap, [category]: { categoryId, category } };

        const requestUnlikeCategory = {} as CategoryMap;

        Array.from(Object.entries(state.requestUnLikeCategoryMap))
          .filter(([key, _]) => key !== category)
          .forEach(([key, value]) => (requestUnlikeCategory[key] = value));

        state.requestUnLikeCategoryMap = { ...requestUnlikeCategory };

        return;
      }
    },
    unSelectCategory: (state: CategoryState, action: PayloadAction<CategoryPayload>) => {
      const { categoryId, category } = action.payload.category;

      const isLikedCategory = !!state.likedCategoryMap[category];
      const isRequestLikeCategory = !!state.requestLikeCategoryMap[category];

      const selectedCategory = {} as CategoryMap;

      if (isLikedCategory) {
        const target = state.likedCategoryMap[category];
        const requestUnLikeCategories = {
          ...state.requestUnLikeCategoryMap,
          [category]: { categoryId: target.categoryId, category },
        };

        state.requestUnLikeCategoryMap = { ...requestUnLikeCategories };
      }

      if (isRequestLikeCategory) {
        const requestLikeCategories = {} as CategoryMap;

        Array.from(Object.entries(state.requestLikeCategoryMap))
          .filter(([key, _]) => key !== category)
          .forEach(([key, value]) => (requestLikeCategories[key] = value));

        state.requestLikeCategoryMap = { ...requestLikeCategories };
      }

      Array.from(Object.entries(state.selectedCategoryMap))
        .filter(([key, _]) => key !== category)
        .forEach(([key, value]) => (selectedCategory[key] = value));

      state.selectedCategoryMap = { ...selectedCategory };
    },
    reset: (state: CategoryState) => {
      state.likedCategoryMap = {};
      state.requestLikeCategoryMap = {};
      state.requestUnLikeCategoryMap = {};
    },
  },
});

export const { initLikedCategoryMap, initSelectedCategoryMap, selectCategory, unSelectCategory, reset } =
  categorySlice.actions;

// 커스텀 훅 형태로 만들어주기 (Hooks 폴더로 따로 빼도 됨)
export function useCategoryList() {
  const categoryList = useSelector((state: RootState) => state.category);
  const dispatch = useDispatch();

  const isLike = (category: Category) => {
    // return !!categoryList.selectedCategoryMap[category.categoryId];
    return !!Object.values(categoryList.selectedCategoryMap).find(
      (selectedCategory) => category.category === selectedCategory.category,
    );
  };

  return {
    ...categoryList,
    dispatch,
    isLike,
  };
}

export default categorySlice.reducer;
