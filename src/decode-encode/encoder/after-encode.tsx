import { EncodedInstructionDisplay } from "../../components/encoded-instr.tsx";
import { bin32BitToHex } from "../../util/operands/numbers.ts";

class InstructionAfterEncode {
    private _parts: string[];
    private _classes: string[];
    private _encodedBinary: string;
    private _encodedHex: string;

    constructor(classes: string[], parts: string[]) {
        this._classes = classes;
        this._parts = parts;
        this._encodedBinary = parts.join("");
        this._encodedHex = bin32BitToHex(this._encodedBinary);
    }

    partsJsx(): React.JSX.Element {
        return (
            <>
                <EncodedInstructionDisplay
                    classes={this._classes}
                    parts={this._parts}
                    binString={this._encodedBinary}
                    hexString={this._encodedHex}
                />
            </>
        )
    }
}

export { InstructionAfterEncode };