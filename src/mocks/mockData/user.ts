import { RegisterdAppError } from '@/errors/Core';
import { SignupRequest } from '@/interfaces/Dto/Auth';
import { UpdateUserInfoRequest } from '@/interfaces/Dto/User';
import { User } from '@/interfaces/User';

interface MockUser extends User {
  password: string;
  isActive: boolean;
  profile?: string;
}

// 가입한 회원
export const userList: MockUser[] = [
  {
    email: 'kakao@gmail.com',
    password: '123456',
    fullName: 'ryan',
    emailVerified: true,
    membership: 'BASIC',
    newsLetter: false,
    isActive: true,
    profile: 'profile0',
  },
];

export const mockUserManage = {
  userList,
  create({ email, password, fullName, newsLetter }: Omit<SignupRequest, 'passwordCheck'>) {
    const existUser = this.get({ email });

    if (existUser) {
      throw new RegisterdAppError('ExistORNotFoundUser');
    }

    const profile = `profile${Math.floor(Math.random() * 5)}`;

    const user: MockUser = {
      email,
      password,
      fullName,
      membership: 'BASIC',
      profile,
      newsLetter,
      isActive: true,
    };

    this.userList.push(user);

    return user;
  },
  get({ email, password }: Pick<MockUser, 'email'> & { password?: MockUser['password'] }) {
    return this.userList.find((user) => {
      if (password) return user.email === email && user.password === password;

      return user.email === email;
    });
  },
  getAll() {
    return this.userList;
  },
  update({
    email,
    fullName,
    newPassword,
    newsLetter,
  }: Omit<UpdateUserInfoRequest, 'password' | 'passwordCheck' | 'newPasswordCheck'> & Pick<User, 'email'>) {
    const user = this.get({ email });

    if (!user) return;

    if (fullName) user.fullName = fullName;
    if (newPassword) user.password = newPassword;
    if (newsLetter) user.newsLetter = newsLetter;
  },
  softDelete({ email }: Pick<MockUser, 'email'>) {
    const user = this.userList.find((user) => user.email === email);

    if (user) user.isActive = false;
  },
};

// 구독중인 회원
export const customerList: MockUser[] = [userList[0]];

export const mockCustomerManage = {
  customerList,
};
