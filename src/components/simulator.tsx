import { useState } from "react";
import { Alert, Button, Form, Table } from "react-bootstrap";
import { Simulator } from "../simulator/simulator";
import "../styles/form.css";
import "../styles/encodes.css";

function SimulatorComponent() {
    const [assemblyCode, setAssemblyCode] = useState("");
    const [output, setOutput] = useState<React.JSX.Element[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const simulator = new Simulator(assemblyCode);
            simulator.run();
            const registersState = simulator.getRegistersState();
            const outputLines = registersState.map(
                ([num, label, binValue, decValue, hexValue]) => (
                    <tr>
                        <td>{label}</td>
                        <td>${num}</td>
                        <td><p className="encodes-container">{binValue}</p></td>
                        <td><p className="encodes-container">{decValue}</p></td>
                        <td><p className="encodes-container">{hexValue}</p></td>
                    </tr>
                )
            );
            setOutput(outputLines);
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
            {error && (
                <Alert variant="danger">{error}</Alert>
            )}
            <Table responsive>
                <thead>
                    <tr>
                        <th>Register Number</th>
                        <th>Register Label</th>
                        <th>Register Value (binary)</th>
                        <th>Register Value (decimal)</th>
                        <th>Register Value (hexadecimal)</th>
                    </tr>
                </thead>
                <tbody>
                    {output || Simulator.blankState().map(
                        ([num, label, binValue, decValue, hexValue]) => (
                            <tr>
                                <td>{label}</td>
                                <td>${num}</td>
                                <td><p className="encodes-container">{binValue}</p></td>
                                <td><p className="encodes-container">{decValue}</p></td>
                                <td><p className="encodes-container">{hexValue}</p></td>
                            </tr>
                        )
                    )}
                </tbody>
            </Table>
        </>
    )
}

export { SimulatorComponent };