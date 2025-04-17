import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Portfolio from './Portfolio';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Portfolio />
  </React.StrictMode>
);