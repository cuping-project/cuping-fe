import { QueryClient, QueryClientProvider } from 'react-query';
import React from 'react';
import Router from './shared/Router';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
};

export default App;
