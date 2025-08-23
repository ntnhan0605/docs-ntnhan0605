import * as react from 'react';
import * as client from 'react-dom/client';
import { CV } from './CV.tsx';
import './main.scss';
import TasselWaveFirework from './Firework.tsx';

client.createRoot(document.getElementById('root')!).render(
  <react.StrictMode>
    <CV />
    <TasselWaveFirework />
  </react.StrictMode>
);
