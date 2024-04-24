import { NAVIGATION_HISTORY_SESSION_KEY, NavigationHistorySession } from '@/app/_layouts/NavigationEvents';

export function possibleGotoBack() {
  if (typeof window === 'undefined') return false;

  const navigationHistorySession = sessionStorage.getItem(NAVIGATION_HISTORY_SESSION_KEY);
  if (!navigationHistorySession) return false;

  const parsed = JSON.parse(navigationHistorySession) as NavigationHistorySession;

  return parsed.length === 1 ? false : true;
}
