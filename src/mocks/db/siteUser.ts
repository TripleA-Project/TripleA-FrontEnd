import { SiteUser } from '@/interfaces/Dto/Admin/GetSiteUsersDto';

export const siteUser: SiteUser[] = [
  {
    id: 1,
    createAt: '2023-11-30T15:03:58.32791+09:00',
    email: 'rla7360@gmail.com',
    fullName: 'rla7360',
    newsLetter: true,
    membership: 'PREMIUM',
    memberRole: 'ADMIN',
    changeMembershipDate: null,
    freeTrial: false,
    freeTierStartDate: null,
    freeTierEndDate: null,
    memo: '',
  },
  {
    id: 2,
    createAt: '2023-12-01T13:14:09+09:00',
    email: 'test1@basic.com',
    fullName: 'test1',
    newsLetter: false,
    membership: 'BASIC',
    memberRole: 'USER',
    changeMembershipDate: null,
    freeTrial: false,
    freeTierStartDate: null,
    freeTierEndDate: null,
    memo: '',
  },
  {
    id: 3,
    createAt: '2023-12-01T13:14:01+09:00',
    email: 'test2@premium.com',
    fullName: 'test2',
    newsLetter: false,
    membership: 'PREMIUM',
    memberRole: 'USER',
    changeMembershipDate: null,
    nextPaymentDate: '2024-06-12T00:00:00',
    freeTrial: true,
    freeTierStartDate: '2024-05-12',
    freeTierEndDate: '2024-06-12',
    memo: '국민대4차',
  },
  {
    id: 4,
    createAt: '2023-12-01T13:14:01+09:00',
    email: 'test3@premium.com',
    fullName: 'test3',
    newsLetter: false,
    membership: 'PREMIUM',
    memberRole: 'USER',
    nextPaymentDate: '2024-06-14T00:00:00',
    changeMembershipDate: null,
    freeTrial: true,
    freeTierStartDate: '2024-06-01',
    freeTierEndDate: '2024-06-14',
    memo: '',
  },
  {
    id: 5,
    createAt: '2024-01-01T01:00:50+09:00',
    email: 'test4@premium.com',
    fullName: 'test4',
    newsLetter: false,
    membership: 'PREMIUM',
    memberRole: 'ADMIN',
    nextPaymentDate: '',
    changeMembershipDate: null,
    freeTrial: false,
    freeTierStartDate: '',
    freeTierEndDate: '',
    memo: '',
  },
  {
    id: 6,
    createAt: '2024-01-01T14:00:00+09:00',
    email: 'test5@basic.com',
    fullName: 'test5',
    newsLetter: false,
    membership: 'BASIC',
    memberRole: 'USER',
    nextPaymentDate: '',
    changeMembershipDate: null,
    freeTrial: false,
    freeTierStartDate: '',
    freeTierEndDate: '',
    memo: '',
  },
  {
    id: 7,
    createAt: '2024-01-10T14:00:00+09:00',
    email: 'test6@basic.com',
    fullName: '테스트',
    newsLetter: false,
    membership: 'PREMIUM',
    memberRole: 'USER',
    nextPaymentDate: '2024-06-13T00:00:00',
    changeMembershipDate: null,
    freeTrial: false,
    freeTierStartDate: '',
    freeTierEndDate: '',
    memo: '',
  },
];
