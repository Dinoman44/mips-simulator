import { Form } from "react-bootstrap";

function FancyInput(props: any) {
    return (
        <div className="input-container">
            <Form.Control {...props} />
        </div>
    )
}

export { FancyInput };