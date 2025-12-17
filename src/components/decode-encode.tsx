import { LiteralInstruction } from '../decode-encode/encoder/literal-instruction.ts';
import { InstructionAfterEncode } from '../decode-encode/encoder/after-encode.tsx';
import { EncodedInstruction } from '../decode-encode/decoder/encoded-instruction.ts';
import { useState } from 'react';
import "../styles/card.css";
import "../styles/form.css";
import { Button, Card, Col, Form, Row, Tab, Tabs } from 'react-bootstrap';
import { InstructionAfterDecode } from '../decode-encode/decoder/after-decode.tsx';
import { IFormatInstructionList, JFormatInstructionList,RFormatInstructionList } from '../decode-encode/mips-instructions/instruction-list.ts';

function Decoder() {
  const [input, setInput] = useState("");
  const [decoding, setDecoding] = useState<React.JSX.Element | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const result: InstructionAfterDecode = EncodedInstruction.makeInstruction(input).decode();
      setDecoding(result.partsJsx());
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

function HelpTab() {
  const rFormatInstructions = RFormatInstructionList.getAllInstructions();
  const numRFormatInstructions = rFormatInstructions.length;
  const iFormatInstructions = IFormatInstructionList.getAllInstructions();
  const numIFormatInstructions = iFormatInstructions.length;
  const jFormatInstructions = JFormatInstructionList.getAllInstructions();
  const numJFormatInstructions = jFormatInstructions.length;
  return (
    <>
    <Row className="mb-4">
      <h2>Help & Instructions</h2>
      <Col>
        <Card className="help-card">
          <Card.Header as="h3">Registers</Card.Header>
          <Card.Body>
            <p>
              There are 32 registers in MIPS architecture, each identified by a name and a number.
              You can use either register names (e.g., <code>$t0</code>, <code>$s1</code>)
              or register numbers (e.g., <code>$8</code>).
              Make sure that <code>$</code> is included to denote a register.
              The registers <code>$1</code>(<code>$at</code>), <code>$26</code>(<code>$k0</code>), <code>$27</code>(<code>$k1</code>), <code>$28</code>(<code>$gp</code>), <code>$29</code>(<code>$sp</code>), <code>$30</code>(<code>$fp</code>), and <code>$31</code>(<code>$ra</code>) have special purposes
              and are currently not supported for encoding.
            </p>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card className="help-card">
          <Card.Header as="h3">Immediates</Card.Header>
          <Card.Body>
            <p>
              Currently only integers are supported. Word size in MIPS is 32 bits (4 bytes).
              I-type instructions can take a 16-bit signed immediate value.
              Any value entered as less than 16 bits
              is still treated as a 16-bit signed integer,
              so <code>0b101</code> is treated as the signed integer -3.
              J-type instructions can take a 26-bit address, treated as an unsigned integer.
              R-type logical shift instructions (<code>sll</code>, <code>srl</code>)
              take a 5-bit unsigned shift amount.
            </p>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card className="help-card">
          <Card.Header as="h3">Instruction formats</Card.Header>
          <Card.Body>
            <p>
              Control flow instructions like <code>beq</code>, <code>bne</code>, and <code>j</code> normally
              take labels as arguments, but for the purpose of this encoder, they will take
              an immediate value instead.
              For branch instructions (<code>beq</code>, <code>bne</code>), the immediate value
              represents the offset from the next instruction (in number of instructions).
              For jump instructions (<code>j</code>), the immediate value represents the target
              address divided by 4 (since MIPS addresses are word-aligned).
            </p>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card className="help-card">
          <Card.Header as="h3">Supported Instructions</Card.Header>
          <Card.Body>
            <p>
              <i>Most</i> integer MIPS instructions are supported. Pseudoinstructions (like <code>move</code>)
              and floating-point operations (like <code>add.s</code>, <code>mul.d</code>)
              are <strong>not</strong> supported. The full list is below:
            </p>
            <Tabs
              id="instructions-list"
              className="mb-3"
              transition={false}
            >
              <Tab eventKey="r-type" title="R-type">
                {rFormatInstructions.map((i, idx) => <><code>{i}</code>{idx < numRFormatInstructions - 1 && ", "}</>)}
              </Tab>
              <Tab eventKey="i-type" title="I-type">
                {iFormatInstructions.map((i, idx) => <><code>{i}</code>{idx < numIFormatInstructions - 1 && ", "}</>)}
              </Tab>
              <Tab eventKey="j-type" title="J-type">
                {jFormatInstructions.map((i, idx) => <><code>{i}</code>{idx < numJFormatInstructions - 1 && ", "}</>)}
              </Tab>
            </Tabs>
          </Card.Body>
        </Card>
      </Col>
    </Row>
    </>
  )
}

export { Decoder, Encoder, HelpTab };