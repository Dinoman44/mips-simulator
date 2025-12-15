import { ParsedEncodedInstruction } from "./instruction-parse";
import { IFormatInstructionList, JFormatInstructionList, RFormatInstructionList, ShiftInstructionList } from "../instructionlist-util/instruction-list.ts";

abstract class EncodedInstruction {
    protected readonly parsedInstruction: ParsedEncodedInstruction;
    protected readonly line: string;

    static makeInstruction(line: string): EncodedInstruction {
        const parsed = new ParsedEncodedInstruction(line);
        const opcode = parsed.getOpcode();

        if (opcode === "000000" && parsed.parts().length === 6 && RFormatInstructionList.isValid(parsed.parts()[5])) {
            return new RFormatEncodedInstruction(line);
        } else if (IFormatInstructionList.isValid(opcode)) {
            return new IFormatEncodedInstruction(line);
        } else if (JFormatInstructionList.isValid(opcode)) {
            return new JFormatEncodedInstruction(line);
        } else {
            throw new Error(`Opcode "${opcode}" is not a valid MIPS instruction opcode.`);
        }
    }

    constructor(line: string) {
        this.line = line;
        this.parsedInstruction = new ParsedEncodedInstruction(this.line);
    }

    abstract decode(): string;
}

class RFormatEncodedInstruction extends EncodedInstruction {
    decode(): string {
        const [opcode, rs, rt, rd, shamt, funct] = this.parsedInstruction.parts();
        if (ShiftInstructionList.isValid(funct)) {
            // shift instruction: sll/srl rd, rt, shamt

        }
    }
}

class IFormatEncodedInstruction extends EncodedInstruction {}

class JFormatEncodedInstruction extends EncodedInstruction {}

export { EncodedInstruction };