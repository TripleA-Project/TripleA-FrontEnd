import { setupWorker } from 'msw';
import { mswHandler } from './handler';

export const worker = setupWorker(...mswHandler);
