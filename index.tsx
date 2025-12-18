import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './src/styles/index.css';
import './src/styles/card.css';
import { Header } from './src/components/header.tsx';
import { Button, Card, Col, Row } from 'react-bootstrap';

createRoot(document.getElementById('header')!).render(
  <StrictMode>
    <Header />
  </StrictMode>,
);

createRoot(document.getElementById('main')!).render(
  <StrictMode>
    <Row>
      <Col>
        <Card>
          <Card.Body>
            <Card.Title as="h3">Encoder & Decoder</Card.Title>
            <p>Try out the MIPS instruction encoder and decoder!</p>
            <Button href="/pages/decode-encode.html" variant="primary">Go to Encoder-Decoder</Button>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card>
          <Card.Body>
            <Card.Title as="h3">MIPS Instruction List</Card.Title>
            <p>Check out the list of supported MIPS instructions!</p>
            <Button href="/pages/instruction-list.html" variant="primary">Go to Instruction List</Button>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card>
          <Card.Body>
            <Card.Title as="h3">(Beta) Simulator</Card.Title>
            <p>Try out the MIPS program simulator!</p>
            <Button href="/pages/simulator.html" variant="primary">Go to Simulator</Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </StrictMode>
);
