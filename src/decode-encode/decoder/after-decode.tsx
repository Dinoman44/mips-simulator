import { DecodedInstructionDisplay } from "../../components/decoded-instr.tsx";
import "../../styles/encodes.css"

class InstructionAfterDecode {
    private _instruction: string;
    private _fields: string[];
    private _parts: string[];
    
    constructor(instruction: string, fields: string[], parts: string[]) {
        this._instruction = instruction;
        this._fields = fields;
        this._parts = parts;
    }

    partsJsx(): React.JSX.Element {
        return (
            <>
                <DecodedInstructionDisplay
                    classes={this._fields}
                    parts={this._parts}
                    instruction={this._instruction}
                />
            </>
        )
    }
}

export { InstructionAfterDecode };