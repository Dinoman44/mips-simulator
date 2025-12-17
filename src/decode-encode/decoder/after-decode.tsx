import { EncodedInstruction } from "./encoded-instruction.ts";
import "../../styles/encodes.css"

class InstructionAfterDecode {
    protected _instruction: EncodedInstruction;
    protected _instructionStr: string;
    
    constructor(instruction: EncodedInstruction) {
        this._instruction = instruction;
        this._instructionStr = this._instruction.decode();
    }

    partsJsx(): React.JSX.Element {
        return (
            <>
                <label htmlFor="decoded-instruction">Decoded Instruction</label>
                <p id="decoded-instruction" className="encodes-container">
                    {this._instructionStr}
                </p>
            </>
        )
    }
}

export { InstructionAfterDecode };