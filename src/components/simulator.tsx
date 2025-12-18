import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "../styles/form.css";

function Simulator() {
    const [assemblyCode, setAssemblyCode] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulation logic would go here
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
        </>
    )
}

export { Simulator };