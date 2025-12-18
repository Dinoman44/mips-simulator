import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './src/styles/index.css'
import { Header } from './src/components/header.tsx';

createRoot(document.getElementById('header')!).render(
  <StrictMode>
    <Header />
  </StrictMode>,
);
