import { setupMSWServer } from '@/util/msw';
import dayjs from 'dayjs';

function SetupServerMSW() {
  if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled' && typeof window === 'undefined') {
    console.log(`[${dayjs().format('YYYY-MM-DD HH:mm:sss')}]`);
    setupMSWServer();
  }

  return null;
}

export default SetupServerMSW;
