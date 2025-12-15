import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css'
import { Encoder } from './decode-encode.tsx'
import Header from './components/header.tsx';
import Row from 'react-bootstrap/esm/Row';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Header />
    <Row xs={1} md={2} className="g-4">
      <Encoder />
      <Encoder />
    </Row>
  </StrictMode>,
)
