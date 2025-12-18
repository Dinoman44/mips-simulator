import { ListGroup, Tab, Tabs } from "react-bootstrap";
import "../styles/help.css";

function InstructionDetailsTab(props: {titles: string[], details: [string, string, string][][]}) {
    const titles = props.titles;
    const details = props.details;
    return (
        <Tabs id="instruction-details-tab" className="mb-3" transition={false} style={{marginTop: "1rem"}}>
            {titles.map((title, index) =>
                <Tab eventKey={title} title={title} key={index}>
                    <ListGroup variant="flush">
                        {details[index].map(([instruction, usage, example], idx) =>
                            <ListGroup.Item key={idx}>
                                <h3><code><strong>{instruction}</strong></code></h3>
                                <p>Usage: <code>{usage}</code></p>
                                <p>Example: <code>{example}</code></p>
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                </Tab>
            )}
        </Tabs>
    )
}

export { InstructionDetailsTab };