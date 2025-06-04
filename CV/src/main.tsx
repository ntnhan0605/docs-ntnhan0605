import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { CV } from './CV.tsx';
import './main.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CV />
  </StrictMode>
);
