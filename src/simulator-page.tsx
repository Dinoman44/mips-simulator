import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css'
import { SimulatorComponent } from './components/simulator.tsx';
import { Header } from './components/header.tsx';

createRoot(document.getElementById('header')!).render(
  <StrictMode>
    <Header />
  </StrictMode>,
)

createRoot(document.getElementById('main')!).render(
  <StrictMode>
    <h1>MIPS Simulator<sup>Beta</sup></h1>
    <SimulatorComponent />
  </StrictMode>,
)
