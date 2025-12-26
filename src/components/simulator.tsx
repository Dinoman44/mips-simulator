import { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { Simulator } from "../simulator/simulator";
import "../styles/form.css";
import "../styles/encodes.css";

function SimulatorComponent() {
    const [assemblyCode, setAssemblyCode] = useState("");
    const [output, setOutput] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const simulator = new Simulator(assemblyCode);
        try {
            simulator.run();
            setOutput(simulator.getRegistersState().toString());
            setError(null);
        } catch (err: any) {
            setOutput(null);
            setError(err.message || "Failed to decode instruction.");
        }
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="assemblyInput">
                    <Form.Label>Enter MIPS assembly code:</Form.Label>
                    <Form.Control as="textarea" rows={10} value={assemblyCode} onChange={e => setAssemblyCode(e.target.value)} />
                </Form.Group>
                <Button className="form-submit" type="submit">Run Simulation</Button>
            </Form>
            <br />
            {output && (
                <>
                    <h4>Program output:</h4>
                    <p className="encodes-container">{output}</p>
                </>
            )}
            {error && (
                <Alert variant="danger">{error}</Alert>
            )}
        </>
    )
}

export { SimulatorComponent };