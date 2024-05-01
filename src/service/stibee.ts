import {
  DeleteStibeeAddressRequest,
  DeleteStibeeAddressResponse,
} from '@/interfaces/Dto/Stibee/DeleteStibeeAddressDto';
import { PostStibeeAddressRequest, PostStibeeAdressResponse } from '@/interfaces/Dto/Stibee/PostStibeeAddressDto';
import axios, { AxiosResponse } from 'axios';

/**
 * stibee 주소록 API
 *
 * @link https://help.stibee.com/hc/ko/articles/4756551371535-%EC%A3%BC%EC%86%8C%EB%A1%9D-API-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0#1-api--
 */
export async function stibeeAddressApi({
  eventOccuredBy = 'MANUAL',
  confirmEmailYN = 'N',
  groupIds,
  subscribers,
}: PostStibeeAddressRequest) {
  const body: PostStibeeAddressRequest = {
    ...(groupIds && { groupIds }),
    eventOccuredBy,
    confirmEmailYN,
    subscribers,
  };

  const res = await axios.post<any, AxiosResponse<PostStibeeAdressResponse>, PostStibeeAddressRequest>(
    `https://api.stibee.com/v1/lists/${process.env.NEXT_PUBLIC_STIBEE_ID}/subscribers`,
    {
      ...body,
    },
    {
      headers: {
        AccessToken: process.env.NEXT_PUBLIC_STIBEE_KEY,
      },
    },
  );

  return res;
}

export async function stibeeDeleteAddressApi({ deleteEmailList }: DeleteStibeeAddressRequest) {
  const res = await axios.delete<
    any,
    AxiosResponse<DeleteStibeeAddressResponse>,
    DeleteStibeeAddressRequest['deleteEmailList']
  >(`https://api.stibee.com/v1/lists/${process.env.NEXT_PUBLIC_STIBEE_ID}/subscribers`, {
    data: [...deleteEmailList],
    headers: {
      AccessToken: process.env.NEXT_PUBLIC_STIBEE_KEY,
    },
  });

  return res;
}
