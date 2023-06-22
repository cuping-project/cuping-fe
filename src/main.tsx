import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import React from 'react';
import App from './App';
import './index.css';
import favicon from './assets/img/favicon.ico';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
);
