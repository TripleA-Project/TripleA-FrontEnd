'use server';

import { revalidatePath } from 'next/cache';

type RevalidatePathParams = Parameters<typeof revalidatePath>;
type RevalidateActionFn = (path: RevalidatePathParams[0], type?: RevalidatePathParams[1]) => Promise<void>;

export const revalidateAction: RevalidateActionFn = async (path, type) => {
  revalidatePath(path, type);
};

export const revalidateNoticeListPage = async () => {
  revalidatePath('/notice');
  revalidatePath('/admin/notice');
};
