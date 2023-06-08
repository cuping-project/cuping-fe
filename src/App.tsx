import { QueryClient, QueryClientProvider } from 'react-query';
import React from 'react';
import Router from './shared/Router';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex justify-center w-full m-auto h-full">
        <Router />
      </div>
    </QueryClientProvider>
  );
};

export default App;
