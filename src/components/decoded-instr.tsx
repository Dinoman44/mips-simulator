import "../styles/encodes.css";

function DecodedInstructionDisplay(props: { classes: string[]; parts: string[]; instruction: string }): React.JSX.Element {
    return (
        <>
            <label htmlFor="decoded-instruction">Decoded Instruction:</label>
            <br/>
            <p id="decoded-instruction" className="encodes-container">
                {props.instruction}
            </p>
            <label htmlFor="decoded-instruction-parts">Instruction Parts:</label>
            <p className="encodes-container">
                {props.classes.map((c, i) => (
                    <>
                        {c !== "" && <span key={i} className={c}>{c}</span>}
                        {c !== "" && i < props.classes.length - 1 && <span> | </span>}
                    </>
                ))}
                <br/>
                {props.parts.map((part, i) => (
                    <>
                        {props.classes[i] !== "" && <span key={i} className={props.classes[i]}>{part}</span>}
                        {props.classes[i] !== "" && i < props.classes.length - 1 && <span> | </span>}
                    </>
                ))}
            </p>
        </>
    )
}

export { DecodedInstructionDisplay };