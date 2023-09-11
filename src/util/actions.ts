'use server';

import { updateUserInfo } from '@/service/user';

interface FormData {
  email: string;
  fullName: string;
  password: string;
  passwordCheck: string;
  newPassword: string;
  newPasswordCheck: string;
  newsLetter?: boolean;
}

export const updateUserData = async (formData: FormData): Promise<{ result: string; error?: unknown }> => {
  try {
    const response = await updateUserInfo({
      ...formData,
    });

    console.log('[update Response]', response.data);

    return { result: 'success' };
  } catch (err) {
    return { result: 'error', error: err };
  }
};
