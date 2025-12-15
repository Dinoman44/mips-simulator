import { LiteralInstruction } from './util/instruction-encode-util/literal-instruction';
import { InstructionAfterEncode } from './util/instruction-encode-util/after-encode';
import { useState } from 'react';
import "./styles/card.css";
import "./styles/form.css";
import { Button, Card, Col, Form } from 'react-bootstrap';

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

export { Encoder };