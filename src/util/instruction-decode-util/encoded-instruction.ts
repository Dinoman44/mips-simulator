import { ParsedEncodedInstruction } from "./instruction-parse";
import { IFormatInstructionList, JFormatInstructionList, RFormatInstructionList, ShiftInstructionList } from "../instructionlist-util/instruction-list.ts";

abstract class EncodedInstruction {
    protected readonly parsedInstruction: ParsedEncodedInstruction;
    protected readonly line: string;
    protected readonly parts: string[];

    static makeInstruction(line: string): EncodedInstruction {
        const parsed = new ParsedEncodedInstruction(line);
        const opcode = parsed.getOpcode();
        const parts = parsed.parts();

        if (parts.length === 6) {
            return new RFormatEncodedInstruction(line, parsed);
        } else if (parts.length === 4) {
            return new IFormatEncodedInstruction(line, parsed);
        } else if (parts.length === 2) {
            return new JFormatEncodedInstruction(line, parsed);
        } else {
            throw new Error(`Opcode "${opcode}" is not a valid MIPS instruction opcode.`);
        }
    }

    constructor(line: string, parsed: ParsedEncodedInstruction) {
        this.line = line;
        this.parsedInstruction = parsed;
        this.parts = this.parsedInstruction.parts();
    }

    abstract decode(): string;
}

class RFormatEncodedInstruction extends EncodedInstruction {
    decode(): string {
        const [opcode, rs, rt, rd, shamt, funct] = this.parsedInstruction.parts();
        if (ShiftInstructionList.isValid(funct)) {
            // shift instruction: sll/srl rd, rt, shamt
            const instr = ShiftInstructionList.getInstruction(funct);
            const rdReg = null;
        }
        return "";
    }
}

class IFormatEncodedInstruction extends EncodedInstruction {}

class JFormatEncodedInstruction extends EncodedInstruction {}

export { EncodedInstruction };