import { LiteralInstruction } from "./literal-instruction.ts";
import React from "react";
import "../../styles/encodes.css";
import "../../components/encoded-instr.tsx";
import { EncodedInstruction } from "../../components/encoded-instr.tsx";

class InstructionAfterEncode {
    protected _instruction: LiteralInstruction;
    protected _parts: string[];
    protected _encodedBinary: string;
    protected _encodedHex: string;

    constructor(instruction: LiteralInstruction, parts: string[]) {
        this._instruction = instruction;
        this._parts = parts;
        this._encodedBinary = parts.join("");
        this._encodedHex = parseInt(this._encodedBinary, 2).toString(16).padStart(8, "0");
    }

    encodedBinary(): string {
        return this._encodedBinary;
    }

    encodedHex(): string {
        return this._encodedHex;
    }

    partsJsx(): React.JSX.Element {
        return (
            <></>
        )
    }
}

class RformatAfterEncode extends InstructionAfterEncode {
    partsJsx(): React.JSX.Element {
        return (
            <>
                <EncodedInstruction
                    classes={["opcode", "rs", "rt", "rd", "shamt", "funct"]}
                    parts={this._parts}
                    binString={this.encodedBinary()}
                    hexString={this.encodedHex()}
                />
            </>
        )
    }
}

class IFormatAfterEncode extends InstructionAfterEncode {
    partsJsx(): React.JSX.Element {
        return (
            <>
                <EncodedInstruction
                    classes={["opcode", "rs", "rt", "immediate"]}
                    parts={this._parts}
                    binString={this.encodedBinary()}
                    hexString={this.encodedHex()}
                />
            </>
        )
    }
}

class JFormatAfterEncode extends InstructionAfterEncode {
    partsJsx(): React.JSX.Element {
        return (
            <>
                <EncodedInstruction
                    classes={["opcode", "address"]}
                    parts={this._parts}
                    binString={this.encodedBinary()}
                    hexString={this.encodedHex()}
                />
            </>
        )
    }
}

export { InstructionAfterEncode, RformatAfterEncode, IFormatAfterEncode, JFormatAfterEncode };