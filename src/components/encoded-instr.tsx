function EncodedInstruction(props: { classes: string[]; parts: string[]; binString: string; hexString: string; }): React.JSX.Element {
    return (
        <>
            <label htmlFor="binary">Binary: </label>
            <p id="binary" className="encodes-container">
                {`0b${props.binString}`}
            </p>
            <label htmlFor="fields">Fields: </label>
            <p className="encodes-container">
                {props.classes.map((className, index) => (
                    <>
                        <span key={index} className={className}>
                            {className}
                        </span>
                        {index < props.classes.length - 1 && <span> | </span>}
                    </>
                ))}
                <br/>
                {props.parts.map((part, index) => (
                    <>
                        <span key={index} className={props.classes[index]}>
                            {part}
                        </span>
                        {index < props.classes.length - 1 && <span> | </span>}
                    </>
                ))}
            </p>
            <label htmlFor="hex">Hexadecimal: </label>
            <p id="hex" className="encodes-container">
                {`0x${props.hexString}`}
            </p>
        </>
    );
}

export { EncodedInstruction };