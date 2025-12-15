import { LiteralInstruction } from './util/instruction-encode-util/literal-instruction';
import { InstructionAfterEncode } from './util/instruction-encode-util/after-encode';
import { useState } from 'react';

function App() {
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
    <div style={{ maxWidth: 500, margin: '2rem auto', padding: '2rem', border: '1px solid #ccc', borderRadius: 8 }}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="mips-input">MIPS Instruction:</label>
        <input
          id="mips-input"
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          style={{ margin: '0 1rem', width: '60%' }}
          required
        />
        <button type="submit">Encode</button>
      </form>
      {encoding && (
        <>
          <p style={{ marginTop: '1rem', wordBreak: 'break-all' }}><strong>Encoding</strong></p>
          {encoding}
        </>
      )}
      {error && (
        <p style={{ marginTop: '1rem', color: 'red' }}>{error}</p>
      )}
    </div>
  );
}

export default App
