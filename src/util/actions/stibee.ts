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
  'use server';

  try {
    const res = await stibeeAddressApi({
      eventOccuredBy,
      confirmEmailYN,
      subscribers,
      groupIds,
    });

    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error as AxiosError<PostStibeeAdressResponse>;

      console.log('stibee error', { error: response?.data });

      return response?.data;
    }

    console.log('stibee error', { error });
    return error;
  }
}
