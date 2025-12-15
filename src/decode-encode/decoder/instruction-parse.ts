import { IFormatInstructionList, JFormatInstructionList, RFormatInstructionList } from "../mips-instructions/instruction-list";

class ParsedEncodedInstruction {
    private readonly _binaryEncodedInstruction: string;
    private _parts: string[];

    private static convertToBinary(encodedInstruction: string): string {
        if (/^[01]+$/.test(encodedInstruction)) {
            console.warn("Treating as binary encoded instruction.");
            if (encodedInstruction.length > 32) {
                throw new Error("Binary encoded instruction exceeds 32 bits.");
            }
            return encodedInstruction.padStart(32, "0");
        } else if (/^[0-9a-fA-F]+$/.test(encodedInstruction)) {
            console.warn("Treating as hexadecimal encoded instruction.");
            if (encodedInstruction.length > 8) {
                throw new Error("Hexadecimal encoded instruction exceeds 8 hex digits.");
            }
            const num = Number.parseInt(encodedInstruction, 16);
            return num.toString(2).padStart(32, "0");
        }
        const num: string = Number(encodedInstruction).toString(2);
        if (num.length > 32) {
            throw new Error("Encoded instruction exceeds 32 bits.");
        }
        return num.padStart(32, "0");
    }

    private parseBinaryInstruction(): string[] {
        const opcode = this.getOpcode();
        if (opcode === "000000") {
            // R-format
            const funct = this._binaryEncodedInstruction.slice(26, 32);
            if (!RFormatInstructionList.isValid(funct)) {
                throw new Error(`Funct code "${funct}" is not valid for R-format instruction.`);
            }
            const rs = this._binaryEncodedInstruction.slice(6, 11);
            const rt = this._binaryEncodedInstruction.slice(11, 16);
            const rd = this._binaryEncodedInstruction.slice(16, 21);
            const shamt = this._binaryEncodedInstruction.slice(21, 26);
            return [opcode, rs, rt, rd, shamt, funct];
        } else if (JFormatInstructionList.isValid(opcode)) {
            // J-format
            const address = this._binaryEncodedInstruction.slice(6, 32);
            return [opcode, address];
        } else if (IFormatInstructionList.isValid(opcode)) {
            // I-format
            const rs = this._binaryEncodedInstruction.slice(6, 11);
            const rt = this._binaryEncodedInstruction.slice(11, 16);
            const immediate = this._binaryEncodedInstruction.slice(16, 32);
            return [opcode, rs, rt, immediate];
        } else {
            throw new Error(`Invalid opcode "${opcode}" in encoded instruction.`);
        }
    }

    constructor(originalEncodedInstruction: string) {
        this._binaryEncodedInstruction = ParsedEncodedInstruction.convertToBinary(originalEncodedInstruction);
        this._parts = this.parseBinaryInstruction();
    }

    binaryEncodedInstruction(): string {
        return this._binaryEncodedInstruction;
    }

    getOpcode(): string {
        return this._binaryEncodedInstruction.slice(0, 6);
    }

    parts(): string[] {
        return this._parts;
    }
}

export { ParsedEncodedInstruction };