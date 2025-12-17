import { RFormatInstructionList, IFormatInstructionList, JFormatInstructionList, ShiftInstructionList, MemOpInstructionList, BranchInstructionList, } from "../mips-instructions/instruction-list.ts";
import { ParsedInstruction } from "./instruction-parse.ts";
import { Register } from "../operands/register.ts";
import { Immediate } from "../operands/immediate.ts";
import { InstructionAfterEncode } from "./after-encode.tsx";

abstract class LiteralInstruction {
    protected readonly parsedInstruction: ParsedInstruction;
    protected readonly line: string;
    protected readonly instr: string;
    protected readonly operands: string[];

    static makeInstruction(line: string): LiteralInstruction {
        const parsed = new ParsedInstruction(line);
        const instr = parsed.getInstruction();

        if (RFormatInstructionList.isValid(instr)) {
            return new RformatLiteralInstruction(line);
        } else if (IFormatInstructionList.isValid(instr)) {
            return new IformatLiteralInstruction(line);
        } else if (JFormatInstructionList.isValid(instr)) {
            return new JformatLiteralInstruction(line);
        } else {
            throw new Error(`Instruction "${instr}" is not a valid MIPS instruction.`);
        }
    }

    constructor(line: string) {
        this.line = line;
        this.parsedInstruction = new ParsedInstruction(this.line);
        this.instr = this.parsedInstruction.getInstruction();
        this.operands = this.parsedInstruction.getOperands();
    }

    abstract encode(): InstructionAfterEncode;
}

class RformatLiteralInstruction extends LiteralInstruction {
    encode(): InstructionAfterEncode {
        if (ShiftInstructionList.isValid(this.instr)) {
            // shift instruction: sll/srl rd, rt, shamt
            let opcode: string = RFormatInstructionList.getOpcode(this.instr);
            let rs: string = "00000";
            let funct: string = RFormatInstructionList.getFunctCode(this.instr);

            let rt: Register = Register.parseRegisterForNumber(this.operands[1]);
            let rd: Register = Register.parseRegisterForNumber(this.operands[0]);
            let shamt: Immediate = Immediate.makeUnsignedImmediate(this.operands[2], 5);

            return new InstructionAfterEncode(
                ["opcode", "rs", "rt", "rd", "shamt", "funct"],
                [opcode, rs, rt.binaryString(), rd.binaryString(), shamt.binaryString(), funct]
            );
        } else {
            // other R-format instruction: instr rd, rs, rt
            let rs: Register = Register.parseRegisterForNumber(this.operands[1]);
            let rt: Register = Register.parseRegisterForNumber(this.operands[2]);
            let rd: Register = Register.parseRegisterForNumber(this.operands[0]);
            let opcode: string = "000000";
            let funct: string = RFormatInstructionList.getFunctCode(this.instr);
            let shamt: string = "00000";

            return new InstructionAfterEncode(
                ["opcode", "rs", "rt", "rd", "shamt", "funct"],
                [opcode, rs.binaryString(), rt.binaryString(), rd.binaryString(), shamt, funct]
            );
        }

    }
}

class IformatLiteralInstruction extends LiteralInstruction {
    encode(): InstructionAfterEncode {
        let opcode: string;
        let rs: Register;
        let rt: Register;
        let immediate: Immediate;

        if (MemOpInstructionList.isValid(this.instr)) {
            // memory operation: lw/sw rt, immediate(rs)
            opcode = IFormatInstructionList.getOpcode(this.instr);
            rt = Register.parseRegisterForNumber(this.operands[0]);
            rs = Register.parseRegisterForNumber(this.operands[2]);
            immediate = Immediate.makeSignedImmediate(this.operands[1]);
        } else if (BranchInstructionList.isValid(this.instr)) {
            // branch instruction: beq/bne rs, rt, immediate
            opcode = IFormatInstructionList.getOpcode(this.instr);
            rs = Register.parseRegisterForNumber(this.operands[0]);
            rt = Register.parseRegisterForNumber(this.operands[1]);
            immediate = Immediate.makeSignedImmediate(this.operands[2]);
        } else {
            // other I-format instruction: instr rt, rs, immediate
            opcode = IFormatInstructionList.getOpcode(this.instr);
            rt = Register.parseRegisterForNumber(this.operands[0]);
            rs = Register.parseRegisterForNumber(this.operands[1]);
            immediate = Immediate.makeSignedImmediate(this.operands[2]);
        }

        return new InstructionAfterEncode(
            ["opcode", "rs", "rt", "immediate"],
            [opcode, rs.binaryString(), rt.binaryString(), immediate.binaryString()]
        );
    }
}

class JformatLiteralInstruction extends LiteralInstruction {
    encode(): InstructionAfterEncode {
        // jump instruction: j address
        let opcode: string = JFormatInstructionList.getOpcode(this.instr);
        let address: Immediate = Immediate.makeUnsignedImmediate(this.operands[0], 26);

        return new InstructionAfterEncode(
            ["opcode", "address"],
            [opcode, address.binaryString()]
        );
    }
}

export {
    LiteralInstruction,
};