import { LiteralInstruction } from '../decode-encode/encoder/literal-instruction.ts';
import { InstructionAfterEncode } from '../decode-encode/encoder/after-encode.tsx';
import { EncodedInstruction } from '../decode-encode/decoder/encoded-instruction.ts';
import { useState } from 'react';
import "../styles/card.css";
import "../styles/form.css";
import { Button, Card, Col, Form } from 'react-bootstrap';

function Decoder() {
  const [input, setInput] = useState("");
  const [decoding, setDecoding] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const res = EncodedInstruction.makeInstruction(input);
      setDecoding(res.decode());
    } catch (err: any) {
      setDecoding(null);
      setError(err.message || "Failed to decode instruction.");
    }
  };

  return (
    <Col>
      <Card>
        <Card.Header as="h3">MIPS Instruction Decoder</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="mipsInput">
              <Form.Label>MIPS Instruction (in bin/hex):</Form.Label>
              <Form.Control
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                required
                size="lg"
              />
            </Form.Group>
            <Button className="form-submit" type="submit">Decode</Button>
          </Form>
          <hr/>
          {decoding && decoding}
          {error && (
            <p className="error">{error}</p>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
}

function Encoder() {
  const [input, setInput] = useState("");
  const [encoding, setEncoding] = useState<React.JSX.Element | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const result: InstructionAfterEncode = LiteralInstruction.makeInstruction(input).encode();
      setEncoding(result.partsJsx());
    } catch (err: any) {
      setEncoding(null);
      setError(err.message || "Failed to encode instruction.");
    }
  };

  return (
    <Col>
      <Card>
        <Card.Header as="h3">MIPS Instruction Encoder</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="mipsInput">
              <Form.Label>MIPS Instruction:</Form.Label>
              <Form.Control
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                required
                size="lg"
              />
            </Form.Group>
            <Button className="form-submit" type="submit">Encode</Button>
          </Form>
          <hr/>
          {encoding && encoding}
          {error && (
            <p className="error">{error}</p>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
}

export { Decoder, Encoder };