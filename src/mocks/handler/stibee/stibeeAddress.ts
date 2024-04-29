import { PostStibeeAddressRequest, PostStibeeAdressResponse } from '@/interfaces/Dto/Stibee/PostStibeeAddressDto';
import { HttpStatusCode } from 'axios';
import { HttpResponse, http } from 'msw';

export const stibeeAddressApi = http.post<{ listId: string }, PostStibeeAddressRequest, PostStibeeAdressResponse>(
  `https://api.stibee.com/v1/lists/:listId/subscribers`,
  async ({ request }) => {
    const accessToken = request.headers.get('AccessToken');
    const { eventOccuredBy, confirmEmailYN, subscribers, groupIds } = await request.json();

    return HttpResponse.json(
      {
        Ok: true,
        Error: null,
        Value: {
          failDuplicatedEmail: [],
          failDuplicatedPhone: [],
          failExistEmail: [],
          failExistPhone: [],
          failNoEmail: [],
          failUnknown: [],
          failWrongEmail: [],
          failWrongPhone: [],
          update: [],
          success: [...subscribers],
        },
      },
      {
        status: HttpStatusCode.Ok,
      },
    );
  },
);
