import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

// 使用新的 Root API
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);