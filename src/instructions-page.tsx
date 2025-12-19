import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css'
import { Header } from './components/header.tsx';
import { InstructionDetailsTab } from './components/instruction-details-tab.tsx';
import { RFormatInstructionDetails, IFormatInstructionDetails, JFormatInstructionDetails } from './util/instructions/instructions-details.ts';

createRoot(document.getElementById('header')!).render(
  <StrictMode>
    <Header />
  </StrictMode>,
)

createRoot(document.getElementById('main')!).render(
  <StrictMode>
    <InstructionDetailsTab
        titles={["R-Format Instructions", "I-Format Instructions", "J-Format Instructions"]}
        details={[
          RFormatInstructionDetails.getDetails(),
          IFormatInstructionDetails.getDetails(),
          JFormatInstructionDetails.getDetails()
        ]}
    />
  </StrictMode>,
)
