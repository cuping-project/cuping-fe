import { QueryClient, QueryClientProvider } from 'react-query';
import React from 'react';
import Router from './shared/Router';
import styles from './App.module.css';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.containerLayout}>
        <Router />
      </div>
    </QueryClientProvider>
  );
};

export default App;
