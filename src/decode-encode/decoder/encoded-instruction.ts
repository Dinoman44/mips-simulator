import { ParsedEncodedInstruction } from "./instruction-parse.ts";
import { BranchInstructionList, IFormatInstructionList, JFormatInstructionList, MemOpInstructionList, RFormatInstructionList, ShiftInstructionList } from "../mips-instructions/instruction-list.ts";
import { Register } from "../operands/register.ts";
import { Immediate } from "../operands/immediate.ts";

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
        const [_, rs, rt, rd, shamt, funct] = this.parsedInstruction.parts();

        const instr: string = RFormatInstructionList.getInstruction(funct);
        const rdReg: Register = Register.parseRegisterForLabel(parseInt(rd, 2));
        const rtReg: Register = Register.parseRegisterForLabel(parseInt(rt, 2));
        const binShamt = `0b${shamt}`;
        const shamtVal: Immediate = Immediate.makeUnsignedImmediate(binShamt, 5);

        if (ShiftInstructionList.isValid(funct)) {
            // shift instruction: sll/srl rd, rt, shamt
            return `${instr} ${rdReg.label()}, ${rtReg.label()}, ${shamtVal.value()}`;
        }

        // other r-format: instr rd, rs, rt
        const rsReg: Register = Register.parseRegisterForLabel(parseInt(rs, 2));
        return `${instr} ${rdReg.label()}, ${rsReg.label()}, ${rtReg.label()}`;
    }
}

class IFormatEncodedInstruction extends EncodedInstruction {
    decode(): string {
        const [opcode, rs, rt, immediate] = this.parsedInstruction.parts();

        const instr: string = IFormatInstructionList.getInstruction(opcode);
        const rsReg: Register = Register.parseRegisterForLabel(parseInt(rs, 2));
        const rtReg: Register = Register.parseRegisterForLabel(parseInt(rt, 2));
        const binImmediate = `0b${immediate}`;
        const immediateVal: Immediate = Immediate.makeSignedImmediate(binImmediate);

        if (MemOpInstructionList.isValid(this.parsedInstruction.getOpcode())) {
            // memory operation: memop rt, immediate(rs)
            return `${instr} ${rtReg.label()}, ${immediateVal.value()}(${rsReg.label()})`;
        } else if (BranchInstructionList.isValid(this.parsedInstruction.getOpcode())) {
            // branch instruction: branch rs, rt, immediate
            return `${instr} ${rsReg.label()}, ${rtReg.label()}, ${immediateVal.value()}`;
        } else {
            // other i-format: instr rt, rs, immediate
            return `${instr} ${rtReg.label()}, ${rsReg.label()}, ${immediateVal.value()}`;
        }
    }
}

class JFormatEncodedInstruction extends EncodedInstruction {
    decode(): string {
        const [opcode, address] = this.parsedInstruction.parts();

        const instr: string = JFormatInstructionList.getInstruction(opcode);
        const binAddress = `0b${address}`;
        const addressVal: Immediate = Immediate.makeUnsignedImmediate(binAddress, 26);

        // j-format: instr address
        return `${instr} ${addressVal.value()}`;
    }
}

export { EncodedInstruction };