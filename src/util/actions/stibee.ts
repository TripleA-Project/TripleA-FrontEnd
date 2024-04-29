'use server';

import { PostStibeeAddressRequest, PostStibeeAdressResponse } from '@/interfaces/Dto/Stibee/PostStibeeAddressDto';
import { stibeeAddressApi } from '@/service/stibee';
import { AxiosError } from 'axios';

export async function stibeeAddressApiAction({
  eventOccuredBy = 'MANUAL',
  confirmEmailYN = 'N',
  subscribers,
  groupIds,
}: PostStibeeAddressRequest) {
  try {
    const res = await stibeeAddressApi({
      eventOccuredBy,
      confirmEmailYN,
      subscribers,
      groupIds,
    });

    console.log('stibee response', { res: res.data });

    return res;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error as AxiosError<PostStibeeAdressResponse>;

      console.log('stibee error', { error: response?.data });

      throw error;
    }

    console.log('stibee error', { error });
    throw error;
  }
}
