import { ListGroup, Tab, Tabs } from "react-bootstrap";
import "../styles/help.css";

function formatInfoParagraphs(info: string): React.JSX.Element[] {
    const paragraphs = info.split("\n").map((para, idx) => <p key={idx}>{para}</p>);
    const codeBlocks = paragraphs.map((p) => (
                <p key={p.key}>
                    {p.props.children.split("`").map((part: string, index: number) =>
                        index % 2 === 1 ? <code key={index}>{part}</code> : part
                    )}
                </p>
            ));
    return codeBlocks;
}

function InstructionDetailsTab(props: {titles: string[], details: [string, string, string, string, string][][]}) {
    const titles = props.titles;
    const details = props.details;
    return (
        <Tabs id="instruction-details-tab" className="mb-3" transition={false} style={{marginTop: "1rem"}}>
            {titles.map((title, index) =>
                <Tab eventKey={title} title={title} key={index}>
                    <ListGroup variant="flush">
                        {details[index].map(([instruction, usage, example, info, ctranslation], idx) =>
                            <ListGroup.Item key={idx}>
                                <h3><code><strong>{instruction}</strong></code></h3>
                                <p>Usage: <code>{usage}</code></p>
                                <>{formatInfoParagraphs(info)}</>
                                <p>Example: <code>{example}</code></p>
                                <p>Equivalent in C-like code: <code>{ctranslation}</code></p>
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                </Tab>
            )}
        </Tabs>
    )
}

export { InstructionDetailsTab };