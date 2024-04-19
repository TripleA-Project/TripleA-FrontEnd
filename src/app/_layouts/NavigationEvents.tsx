'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { uniqWith } from 'lodash';

interface NavigationHistory {
  pathname: string;
  searchParams: string;
}

export type NavigationHistorySession = NavigationHistory[];

export const NAVIGATION_HISTORY_SESSION_KEY = 'navigationHistory';

function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const navigationHistorySession = sessionStorage.getItem(NAVIGATION_HISTORY_SESSION_KEY);

    const currentNavigationHistory = {
      pathname,
      searchParams: searchParams.toString(),
    };

    if (!navigationHistorySession) {
      sessionStorage.setItem(NAVIGATION_HISTORY_SESSION_KEY, JSON.stringify([currentNavigationHistory]));

      return;
    }

    const navigationHistory = JSON.parse(navigationHistorySession) as NavigationHistorySession;

    const value = uniqWith(
      [...navigationHistory, currentNavigationHistory],
      (a, b) => a.pathname === b.pathname && a.searchParams === b.searchParams,
    );

    if (value.length > 3) value.shift();

    sessionStorage.setItem(NAVIGATION_HISTORY_SESSION_KEY, JSON.stringify(value));
  }, [pathname, searchParams]);

  return null;
}

export default NavigationEvents;
