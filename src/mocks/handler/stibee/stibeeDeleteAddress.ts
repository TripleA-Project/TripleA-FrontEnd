import {
  DeleteStibeeAddressRequest,
  DeleteStibeeAddressResponse,
} from '@/interfaces/Dto/Stibee/DeleteStibeeAddressDto';
import { HttpStatusCode } from 'axios';
import { HttpResponse, http } from 'msw';

export const stibeeDeleteAddressApi = http.delete<
  { listId: string },
  DeleteStibeeAddressRequest['deleteEmailList'],
  DeleteStibeeAddressResponse
>(`https://api.stibee.com/v1/lists/:listId/subscribers`, async ({ request }) => {
  const accessToken = request.headers.get('AccessToken');
  const targetEmailList = await request.json();

  return HttpResponse.json(
    {
      Ok: true,
      Error: null,
      Value: {
        success: [...targetEmailList],
        fail: [],
      },
    },
    {
      status: HttpStatusCode.Ok,
    },
  );
});
