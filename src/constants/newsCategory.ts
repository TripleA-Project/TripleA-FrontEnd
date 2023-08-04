import { Category } from '@/interfaces/Category';

interface CategoryData extends Category {
  value: string;
  tags: string[];
}

export const newsCategory: CategoryData[] = [
  {
    categoryId: 1,
    value: 'Arts & Entertainment',
    category: '예술/문화',
    tags: [],
  },
  {
    categoryId: 2,
    value: 'Autos & Vehicles',
    category: '모빌리티',
    tags: [],
  },
  {
    categoryId: 3,
    value: 'Beauty & Fitness',
    category: '뷰티/건강',
    tags: [],
  },
  {
    categoryId: 4,
    value: 'Books & Literature',
    category: '책/공연/전시',
    tags: [],
  },
  {
    categoryId: 5,
    value: 'Business & Industrial',
    category: '비즈니스',
    tags: [],
  },
  {
    categoryId: 6,
    value: 'Computers & Electronics',
    category: '전자/정보통신',
    tags: [],
  },
  {
    categoryId: 7,
    value: 'Finance',
    category: '금융',
    tags: [],
  },
  {
    categoryId: 8,
    value: 'Food & Drink',
    category: '음식/맛집',
    tags: [],
  },
  {
    categoryId: 9,
    value: 'Games',
    category: '게임',
    tags: [],
  },
  {
    categoryId: 10,
    value: 'Health',
    category: '건강',
    tags: [],
  },
  {
    categoryId: 11,
    value: 'Hobbies & Leisure',
    category: '취미/레저',
    tags: [],
  },
  {
    categoryId: 12,
    value: 'Home & Garden',
    category: '홈/가드닝',
    tags: [],
  },
  {
    categoryId: 13,
    value: 'Internet & Telecom',
    category: '인터넷/통신',
    tags: [],
  },
  {
    categoryId: 14,
    value: 'Jobs & Education',
    category: '직업/교육',
    tags: [],
  },
  {
    categoryId: 15,
    value: 'Law & Government',
    category: '정부/법률',
    tags: [],
  },
  {
    categoryId: 16,
    value: 'News',
    category: '뉴스',
    tags: [],
  },
  {
    categoryId: 17,
    value: 'Online Communities',
    category: '커뮤니티',
    tags: [],
  },
  {
    categoryId: 18,
    value: 'People & Society',
    category: '사회 일반',
    tags: [],
  },
  {
    categoryId: 19,
    value: 'Pets & Animals',
    category: '반려동물',
    tags: [],
  },
  {
    categoryId: 20,
    value: 'Real Estate',
    category: '부동산',
    tags: [],
  },
  {
    categoryId: 21,
    value: 'Reference',
    category: '레퍼런스',
    tags: [],
  },
  {
    categoryId: 22,
    value: 'Science',
    category: '과학 일반',
    tags: [],
  },
  {
    categoryId: 23,
    value: 'Sensitive Subjects',
    category: '민감한 주제',
    tags: [],
  },
  {
    categoryId: 24,
    value: 'Shopping',
    category: '쇼핑',
    tags: [],
  },
  {
    categoryId: 25,
    value: 'Sports',
    category: '스포츠',
    tags: [],
  },
  {
    categoryId: 26,
    value: 'Travel',
    category: '여행',
    tags: [],
  },
];
