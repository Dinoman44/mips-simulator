import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css'
import { Decoder, Encoder, HelpTab } from './components/decode-encode.tsx'
import Header from './components/header.tsx';
import Row from 'react-bootstrap/esm/Row';

createRoot(document.getElementById('header')!).render(
  <StrictMode>
    <Header />
  </StrictMode>,
)

createRoot(document.getElementById('main')!).render(
  <StrictMode>
    <Row xs={1} md={2} className="g-4">
      <Encoder />
      <Decoder />
    </Row>
    <HelpTab />
  </StrictMode>,
)
