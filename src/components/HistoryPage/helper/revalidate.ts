'use server';

import { revalidatePath } from 'next/cache';

export async function revalidateHistory() {
  revalidatePath('/history');
}
