'use client';

import { useState } from 'react';
import { QueryClientProvider, QueryClient, QueryClientConfig } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

interface ReactQueryProviderProps {
  options?: QueryClientConfig;
  children: React.ReactNode;
}

function ReactQueryProvider({ options, children }: ReactQueryProviderProps) {
  const queryClientOptions: QueryClientConfig = {
    defaultOptions: { queries: { refetchInterval: false } },
    ...options,
  };

  const [client] = useState(() => new QueryClient(queryClientOptions));

  return (
    <QueryClientProvider client={client}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}

export default ReactQueryProvider;
